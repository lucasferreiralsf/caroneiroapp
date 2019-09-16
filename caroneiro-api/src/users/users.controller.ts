import {
  Controller,
  Get,
  Query,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join, resolve } from 'path';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(@Query('page') page?, @Query('perPage') perPage?) {
    return await this.usersService.getAll(page, perPage);
  }

  @Post(':id/avatar')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './tmp/upload/avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadPhoto(@UploadedFile() picture, @Param('id') id: string) {
    console.log(picture);
    return this.usersService.uploadPhoto(picture, id);
  }

  @Get('avatars/:fileId')
  async serveAvatar(
    @Param('fileId') fileId,
    @Res() res: Response,
  ): Promise<any> {
    res.sendFile(fileId, { root: 'tmp/upload/avatars' });
  }
}
