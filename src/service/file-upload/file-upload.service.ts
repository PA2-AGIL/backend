import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import sharp from 'sharp';

@Injectable()
export class FileUploadService {
  async upload(dataBuffer: Buffer, filename: string) {
    const resized = await sharp(dataBuffer)
      .resize({
        width: 500,
        height: 500,
      })
      .toFormat('jpeg')
      .toBuffer()
      .then((o) => o);

    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: `${process.env.AWS_PUBLIC_BUCKET_NAME}`,
        Body: resized,
        Key: `${uuid()}-${filename}`,
        ContentType: `image/jpg`,
      })
      .promise();

    return uploadResult.Location;
    // return {
    //   fileName: uploadResult.Key,
    //   url: uploadResult.Location,
    // };
  }

  async uploadPictureProfile(dataBuffer: Buffer, filename: string) {
    const resized = await sharp(dataBuffer)
      .resize({
        width: 500,
        height: 500,
      })
      .toFormat('jpeg')
      .toBuffer()
      .then((o) => o);

    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: `${process.env.AWS_PUBLIC_BUCKET_NAME}`,
        Body: resized,
        Key: `${uuid()}-${filename}`,
        ContentType: `image/jpg`,
      })
      .promise();

    return { url: uploadResult.Location };
  }
}
