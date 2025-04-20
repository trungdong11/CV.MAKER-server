export const IS_PUBLIC = 'isPublic';
export const IS_AUTH_OPTIONAL = 'isAuthOptional';

export enum Environment {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test',
}

export enum LogService {
  CONSOLE = 'console',
  GOOGLE_LOGGING = 'google_logging',
  AWS_CLOUDWATCH = 'aws_cloudwatch',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

// Redact value of these paths from logs
export const loggingRedactPaths = [
  'req.headers.authorization',
  'req.body.token',
  'req.body.refreshToken',
  'req.body.email',
  'req.body.password',
  'req.body.oldPassword',
];

export const DEFAULT_PAGE_LIMIT = 20;
export const DEFAULT_CURRENT_PAGE = 1;
export const SYSTEM_USER_ID = 'system';
export const SUCCESS = 'success';
export const FAILURE = 'failure';

export const PASSWORD_FORMAT =
  /^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$/;
export const PHONE_NUMBER_FORMAT = /^\+?[0-9]\d{1,14}$/;
export const PIN_CODE_FORMAT = /^\d{6}$/;

export const GOOGLE_URL =
  'https://www.googleapis.com/oauth2/v1/userinfo?access_token=';

export enum ResourceList {
  USER = 'user',
  ROLE = 'role',
  PERMISSION = 'permission',
}

export enum ActionList {
  CREATE = 'create',
  READ = 'read',
  READ_ALL = 'readAll',
  UPDATE = 'update',
  UPDATE_ANY = 'updateAny',
  DELETE = 'delete',
}
