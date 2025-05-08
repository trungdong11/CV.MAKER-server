import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;
  private readonly iv: Buffer;

  constructor(private configService: ConfigService) {
    // Lấy encryption key từ environment variable
    const encryptionKey = this.configService.get<string>('ENCRYPTION_KEY');
    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY is not defined in environment variables');
    }

    // Tạo key và iv từ encryption key
    this.key = crypto.scryptSync(encryptionKey, 'salt', 32);
    this.iv = crypto.scryptSync(encryptionKey, 'iv', 16);
  }

  /**
   * Mã hóa một chuỗi
   * @param text Chuỗi cần mã hóa
   * @returns Chuỗi đã mã hóa dạng base64
   */
  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  /**
   * Giải mã một chuỗi đã mã hóa
   * @param encryptedText Chuỗi đã mã hóa dạng base64
   * @returns Chuỗi đã giải mã
   */
  decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  /**
   * Mã hóa một object
   * @param obj Object cần mã hóa
   * @returns Object đã mã hóa các trường nhạy cảm
   */
  encryptObject(obj: any, sensitiveFields: string[]): any {
    const encryptedObj = { ...obj };
    for (const field of sensitiveFields) {
      if (obj[field] && typeof obj[field] === 'string') {
        encryptedObj[field] = this.encrypt(obj[field]);
      }
    }
    return encryptedObj;
  }

  /**
   * Giải mã một object
   * @param obj Object cần giải mã
   * @returns Object đã giải mã các trường nhạy cảm
   */
  decryptObject(obj: any, sensitiveFields: string[]): any {
    const decryptedObj = { ...obj };
    for (const field of sensitiveFields) {
      if (obj[field] && typeof obj[field] === 'string') {
        decryptedObj[field] = this.decrypt(obj[field]);
      }
    }
    return decryptedObj;
  }
} 