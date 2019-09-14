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

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  primaryPhoneNumber?: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  secondaryPhoneNumber?: string;

  @IsEmpty()
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
