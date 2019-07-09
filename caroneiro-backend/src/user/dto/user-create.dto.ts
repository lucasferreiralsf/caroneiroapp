import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  readonly firstName: string;

  @ApiModelProperty()
  readonly lastName: string;

  @ApiModelProperty()
  readonly primaryPhoneNumber: number;

  @ApiModelProperty()
  readonly secondaryPhoneNumber?: number;

  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly emailIsVerified?: boolean;

  @ApiModelProperty()
  readonly primaryPhoneNumberIsVerified?: boolean;

  @ApiModelProperty()
  readonly googleId?: string;

  @ApiModelProperty()
  readonly facebookId?: string;
}
