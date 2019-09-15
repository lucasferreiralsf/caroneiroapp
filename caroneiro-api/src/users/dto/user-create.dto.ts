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

  @ValidateIf(o => o.googleId && o.facebookId)
  @IsNotEmpty()
  password?: string;

  @IsEmpty()
  emailIsVerified?: boolean;

  @IsEmpty()
  primaryPhoneNumberIsVerified?: boolean;

  @IsEmpty()
  googleId?: string;

  @IsEmpty()
  facebookId?: string;

  @IsEmpty()
  emailToken?: string;

  @IsOptional()
  @IsArray()
  ownerTravels?: Array<{ id: string }>;

  @IsOptional()
  @IsArray()
  travelsAsPassenger?: Array<{ id: string }>;
}
