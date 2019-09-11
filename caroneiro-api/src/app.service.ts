import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // private isAuthEnabled: boolean;
  getHello(): string {
    return 'Hello World!';
  }
}
