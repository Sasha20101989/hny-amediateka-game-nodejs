import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { MIN_LENGTH_PASSWORD, MAX_LENGTH_PASSWORD } from '../../game/game.const.js';

export default class LoginUserDto {
  public id?: string;

  @IsNotEmpty({ message: 'Password are required' })
  @MinLength(MIN_LENGTH_PASSWORD, { message: `Minimum password length must be ${MIN_LENGTH_PASSWORD}` })
  @MaxLength(MAX_LENGTH_PASSWORD, { message: `Maximum password length must be ${MAX_LENGTH_PASSWORD}` })
  public password!: string;
}
