import { BcryptAdapter, JwtAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { EmailService } from "./email.service";

interface TokenProps {
  id: string;
  email: string;
}
export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public registerUser = async (registerUserDto: RegisterUserDto) => {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModel(registerUserDto);

      // Encriptar la contraseña
      user.password = BcryptAdapter.hash(registerUserDto.password);
      await user.save();
      // JWT <--- para mantener la autenticación del usuario

      // Email de confirmación
      this.sendEmailValidationLink(user.email);

      const { password, ...userEntity } = UserEntity.fromObject(user);
      const token = await this.generateToken(userEntity);

      return { user: { ...userEntity }, token: token };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  };

  public loginUser = async (loginUserDto: LoginUserDto) => {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest("Email does not exist");

    const validPassword = BcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );
    if (!validPassword) throw CustomError.badRequest("Passwords do not match");

    const { password, ...userEntity } = UserEntity.fromObject(user);
    const token = await this.generateToken(userEntity);
    if (!token) throw CustomError.internalServer("Error while creating JWT");
    return {
      user: { ...userEntity },
      token: token,
    };
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorized("Invalid token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer("Email not in token");

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.internalServer("Email not exists");

    user.emailValidated = true;
    await user.save();

    return true;
  };

  public generateToken = async ({ id, email }: TokenProps) => {
    return await JwtAdapter.generateToken({
      id: id,
      email: email,
    });
  };

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer("Error getting token");

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) throw CustomError.internalServer("Error sending email");
    return true;
  };
}
