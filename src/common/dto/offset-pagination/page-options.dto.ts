import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_LIMIT,
  Order,
} from '@common/constants/app.constant';
import {
  EnumFieldOptional,
  NumberFieldOptional,
  StringFieldOptional,
} from '@common/decorators/field.decorators';

export class PageOptionsDto {
  @NumberFieldOptional({
    minimum: 1,
    default: DEFAULT_PAGE_LIMIT,
    int: true,
  })
  readonly limit?: number = DEFAULT_PAGE_LIMIT;

  @NumberFieldOptional({
    minimum: 1,
    default: DEFAULT_CURRENT_PAGE,
    int: true,
  })
  readonly page?: number = DEFAULT_CURRENT_PAGE;

  @StringFieldOptional()
  readonly keywords?: string;

  @EnumFieldOptional(() => Order, { default: Order.DESC })
  readonly order?: Order = Order.DESC;

  get offset(): number {
    return this.page ? (this.page - 1) * this.limit : 0;
  }
}
