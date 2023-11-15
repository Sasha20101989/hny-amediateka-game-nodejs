import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from '../game.const.js';

export default class NoGameDto {
  @IsNotEmpty({ message: 'Password are required' })
  @MinLength(MIN_LENGTH_PASSWORD, { message: `Minimum password length must be ${MIN_LENGTH_PASSWORD}` })
  @MaxLength(MAX_LENGTH_PASSWORD, { message: `Maximum password length must be ${MAX_LENGTH_PASSWORD}` })
  public password!: string;
}
