import {
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateIf,
  IsArray,
  IsEmail,
  IsPhoneNumber,
  IsEmpty,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  primaryPhoneNumber?: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  secondaryPhoneNumber?: string;

  @ValidateIf(o => o.googleId.length === 0 && o.facebookId.length === 0)
  @IsNotEmpty()
  password?: string;

  @IsEmpty()
  emailIsVerified?: boolean;

  @IsEmpty()
  primaryPhoneNumberIsVerified?: boolean;

  @IsOptional()
  @IsString()
  googleId?: string;

  @IsOptional()
  @IsString()
  facebookId?: string;

  @IsOptional()
  @IsArray()
  ownerTravels?: Array<{ id: string }>;

  @IsOptional()
  @IsArray()
  travelsAsPassenger?: Array<{ id: string }>;

  @IsEmpty()
  emailToken?: string;
}
