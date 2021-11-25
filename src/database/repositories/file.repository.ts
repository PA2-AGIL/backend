import { EntityRepository, Repository } from 'typeorm';
import { File } from '../entities/file/file';
import { CreateFileDTO } from './dtos/createFileDTO.interface';

@EntityRepository(File)
export class FileRepository extends Repository<File> {
  async createFile(createFileDTO: CreateFileDTO) {
    const { fileName, url } = createFileDTO;

    const file = new File();

    file.fileName = fileName;
    file.url = url;

    await file.save();

    return file;
  }
}
