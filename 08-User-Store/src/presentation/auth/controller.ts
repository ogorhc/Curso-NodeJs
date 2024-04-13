import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  registerUser = (req: Request, res: Response) => {
    const body = req.body;
    const [error, registerUserDto] = RegisterUserDto.create(body);
    if (error) return res.status(400).json({ error });
    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.json({ message: user }));
  };
  loginUser = (req: Request, res: Response) => {
    res.json("login user");
  };
  validateEmail = (req: Request, res: Response) => {
    res.json("validate user");
  };
}
