import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/in/create-product.dto';
import { UpdateProductDto } from './dto/in/update-product.dto';
import { PrismaService } from '../prisma.service';
import { PaginationDto } from '../common/dto/in/pagination.dto';

@Injectable()
export class ProductsService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });

    return product;
  }

  public async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.prisma.product.count({
      where: { available: true },
    });

    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true },
      }),

      meta: {
        total: totalPages,
        page,
        lastPage,
      },
    };
  }

  public async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
        available: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    return product;
  }

  public async update(id: number, updateProductDto: UpdateProductDto) {
    const { id: _, ...data } = updateProductDto;

    await this.findOne(id);

    const product = await this.prisma.product.update({
      where: { id },
      data,
    });

    return product;
  }

  public async remove(id: number) {
    await this.findOne(id);

    //return this.prisma.product.delete({
    //  where: {
    //    id,
    //  },
    //});

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        available: false,
      },
    });
    return product;
  }
}
