import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from './product.schema';
import { Model } from 'mongoose';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}
  async create(
    name: string,
    price: number,
    description: string,
  ): Promise<ProductDocument> {
    const newProduct = new this.productModel({ name, price, description });
    return newProduct.save();
  }
  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }
  async find(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    newName: string,
    newPrice: number,
    newDescription: string,
  ): Promise<ProductDocument> {
    const existingProduct = await this.find(id);
    existingProduct.name = newName ?? existingProduct.name;
    existingProduct.price = newPrice ?? existingProduct.price;
    existingProduct.description = newDescription ?? existingProduct.description;

    return existingProduct.save();
  }
  async delete(id: string) {
    return this.productModel.deleteOne({ _id: id }).exec();
  }
}
