import { BooleanFieldOptional } from '@common/decorators/field.decorators';
import { PageOptionsDto } from '@common/dto/offset-pagination/page-options.dto';
import { Expose } from 'class-transformer';

@Expose()
export class RoleFilterDto extends PageOptionsDto {
  @BooleanFieldOptional({ name: 'include_deleted', default: false })
  @Expose({ name: 'include_deleted' })
  includeDeleted: boolean;
}
