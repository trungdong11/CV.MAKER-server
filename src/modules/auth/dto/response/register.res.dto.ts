import { StringField } from '@common/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RegisterResDto {
  @Expose()
  @StringField({ name: 'user_id' })
  userId!: string;
}
