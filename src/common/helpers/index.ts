import { ROLE } from '@common/constants/entity.enum';
import * as process from 'process';

export const getEnvFilePath = (): string => {
  const ENV = process.env.NODE_ENV;
  if (ENV === 'development') return '.env.development';
  if (ENV === 'production') return '.env.production';

  return '.env';
};

export const convertCamelToSnake = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => convertCamelToSnake(item));
  } else if (data instanceof Date) {
    return data;
  } else if (data !== null && typeof data === 'object') {
    const newObj = {};
    Object.keys(data).forEach((key) => {
      const snakeKey = camelToSnake(key);
      newObj[snakeKey] = convertCamelToSnake(data[key]);
    });
    return newObj;
  }
  return data;
};

export const camelToSnake = (key: string): string => {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
};

export const convertSnakeToCamel = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => convertSnakeToCamel(item));
  } else if (data instanceof Date) {
    return data;
  } else if (data !== null && typeof data === 'object') {
    const newObj = {};
    Object.keys(data).forEach((key) => {
      const camelKey = snakeToCamel(key);
      newObj[camelKey] = convertSnakeToCamel(data[key]);
    });
    return newObj;
  }
  return data;
};

export const snakeToCamel = (key: string): string => {
  return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const isRoleCoreSystem = (key: string) => {
  // @ts-ignore
  return Object.values(ROLE).includes(key);
};
