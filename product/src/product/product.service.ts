import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repository/productRepostiry';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/category-dto';
import { CategoryRepository } from './repository/categoryRepository';
import { UpdateProductDto } from './dto/update-product.dto';
import { RabbitmqService } from 'src/config/rabbitmq/rabbitmq.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepositroy: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  async create(
    productData: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<Product> {
    const product = await this.productRepositroy.createProduct(
      productData,
      file,
    );
    return product;
  }

  async getCategory(): Promise<Category[]> {
    return await this.categoryRepository.getCategory();
  }
  async findAllProduct() {
    return await this.productRepositroy.findAllProduct();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepositroy.findProductById(id);
    return product;
  }

  async updateProduct(
    id: string,
    updatedata: UpdateProductDto,
  ): Promise<Product> {
    return await this.productRepositroy.update(id, updatedata);
  }

  async deleteProduct(id: string) {
    return await this.productRepositroy.deleteProduct(id);
  }

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.createCategory(categoryData);
  }

  async findAllWithSubcategories(): Promise<Category[]> {
    return await this.categoryRepository.findAllWithSubcategories();
  }

  async updateProductQuantity(data: { productId: string; quantity: number }) {
    return await this.productRepositroy.updateProductQuantity(data);
  }
}
