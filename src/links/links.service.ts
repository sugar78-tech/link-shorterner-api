import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  async create(createLinkDto: CreateLinkDto) {
    const findedLink = await this.linkRepository.findOne({
      where: { shortedUrl: createLinkDto.shortedUrl },
    });
    if (findedLink) {
      throw new HttpException('Link already exists', HttpStatus.BAD_REQUEST);
    }
    return this.linkRepository.save({
      ...createLinkDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findAll(page = 1, limit = 10) {
    return this.linkRepository.find({
      order: {
        createdAt: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: string) {
    return this.linkRepository.findOne({ where: { id } });
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    const findedLink = await this.linkRepository.findOne({
      where: { id },
    });
    if (!findedLink) {
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }
    return this.linkRepository.update(id, updateLinkDto);
  }

  async remove(id: string) {
    const findedLink = await this.linkRepository.findOne({
      where: { id },
    });
    if (!findedLink) {
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }
    return this.linkRepository.delete(id);
  }
}
