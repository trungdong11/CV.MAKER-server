import {
  EmailField,
  PasswordField,
  StringFieldOptional,
} from '@common/decorators/field.decorators';
import { PASSWORD_FORMAT } from '@common/constants/app.constant';
import { Matches } from 'class-validator';

import { MatchPassword } from '@common/decorators/validators/match-password.decorator';

export class RegisterReqDto {
  @EmailField()
  email!: string;

  @StringFieldOptional()
  name: string;

  @PasswordField()
  @Matches(PASSWORD_FORMAT, {
      message:
        'Password must contain only letters, numbers, and at least one special character (!@#$%^&*(),.?":{}|<>)',
    })
  password!: string;

  @PasswordField()
  @MatchPassword('password')
  confirm_password!: string;
}
