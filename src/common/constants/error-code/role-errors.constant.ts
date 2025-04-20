import { ErrorCode } from '@common/constants/error-code/index';

export const RoleErrorCode: Record<string, string> = {
  [ErrorCode.ROLE_NAME_EXIST]: 'role.error.role_name_exist',
  [ErrorCode.ROLE_NOT_FOUND]: 'role.error.role_not_found',
};
