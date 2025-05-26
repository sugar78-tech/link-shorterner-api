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
      where: { shortedUrl: createLinkDto.shortedUrl, isDeleted: false },
    });
    if (findedLink) {
      throw new HttpException('Link already exists', HttpStatus.BAD_REQUEST);
    }
    return this.linkRepository.save({
      ...createLinkDto,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findAll(page = 1, limit = 10) {
    return this.linkRepository.find({
      where: { isDeleted: false },
      order: {
        createdAt: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.linkRepository.findOne({ where: { id, isDeleted: false } });
  }

  async update(id: number, updateLinkDto: UpdateLinkDto) {
    const findedLink = await this.linkRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!findedLink) {
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }
    return this.linkRepository.update(id, updateLinkDto);
  }

  async remove(id: number) {
    const findedLink = await this.linkRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!findedLink) {
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }
    return this.linkRepository.update(id, { isDeleted: true });
  }
}
