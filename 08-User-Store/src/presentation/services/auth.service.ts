import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthService {
  constructor() {}

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

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { user: { ...userEntity }, token: "ABC" };
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
    const token = await JwtAdapter.generateToken({
      id: user.id,
      email: user.email,
    });
    if (!token) throw CustomError.internalServer("Error while creating JWT");
    return {
      user: userEntity,
      token: token,
    };
  };
}
