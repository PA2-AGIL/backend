import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileUploadService {
  async upload(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: `${process.env.AWS_PUBLIC_BUCKET_NAME}`,
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    return { filename: uploadResult.Key, url: uploadResult.Location };
  }
}
