import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export default class LoginUserDto {
  public id?: string;

  @IsNotEmpty({ message: 'Password are required' })
  @MinLength(6, { message: 'Minimum password length must be 6' })
  @MaxLength(12, { message: 'Maximum password length must be 12' })
  public password!: string;
}
