import { ErrorCode } from '@common/constants/error-code/index';

export const PermissionErrorCode: Record<string, string> = {
  [ErrorCode.PERMISSION_INVALID]: 'permission.error.permission_invalid',
  [ErrorCode.PERMISSION_ALREADY_EXISTS_IN_ROLE]:
    'permission.error.permission_already_exists_in_role',
};
