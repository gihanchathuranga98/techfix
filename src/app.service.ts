import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Quote } from './entities/quote.entity';
import { QuoteStatusEnum } from './quote-status.enum';
import { QuoteItem } from './entities/quote-item.entity';
import { UserTypesEnum } from './enums/user-types.enum';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Quote) private readonly quoteRepo: Repository<Quote>,
    @InjectRepository(QuoteItem)
    private readonly quoteItemRepo: Repository<QuoteItem>,
    @InjectRepository(Inventory)
    private readonly inventoryRepo: Repository<Inventory>,
  ) {}
  async createNewProuduct(data: any) {
    const product = new Inventory();
    product.productName = data.name;
    product.description = data?.description;
    product.availableQty = data?.availableQty;
    product.discount = data?.discount;
    product.price = data.price;

    return await this.inventoryRepo.save(product);
  }

  async deleteProduct(data: any) {
    return await this.inventoryRepo.update(
      { isActive: false },
      { id: data.id },
    );
  }

  async editProduct(data: any, id: number) {
    const inventory = new Inventory();
    if (data.name) inventory.productName = data.name;
    if (data.description) inventory.description = data.description;
    if (data.price) inventory.price = data.price;
    if (data.discount) inventory.discount = data.discount;
    if (data.availableQty) inventory.availableQty = data.availableQty;

    return await this.inventoryRepo.update(inventory, { id });
  }

  async getAllProducts() {
    return await this.inventoryRepo.find({ where: { isActive: true } });
  }

  async handleLogin(data: any) {
    const user = await this.userRepo.findOne({
      where: { email: data.email, password: data.pwd, isActive: true },
    });

    if (user) {
      return { name: user.name, id: user.id, type: user.type };
    } else {
      throw new NotFoundException('User Not Found');
    }
  }

  // quotations

  async createQuote(data: any, supplierId: number) {
    const quote = new Quote();
    quote.title = data.title;
    quote.supplier = supplierId;
    quote.discount = data.discount;
    quote.status = QuoteStatusEnum.PENDING;

    // Ensure quote is saved before adding items
    const newquote = await this.quoteRepo.save(quote);

    for (const item of data.items) {
      const quoteItem = new QuoteItem();
      quoteItem.itemId = item.itemId;
      quoteItem.quantity = item.quantity;
      quoteItem.unitPrice = item.unitPrice;
      quoteItem.quoteId = newquote.id;

      await this.quoteItemRepo.save(quoteItem);
    }

    return { success: true };
  }

  async approveQuote(quoteId: number) {
    return await this.quoteRepo.update(
      { id: quoteId },
      { status: QuoteStatusEnum.APPROVED },
    );
  }

  async rejectQuote(quoteId: number) {
    return await this.quoteRepo.update(
      { id: quoteId },
      { status: QuoteStatusEnum.REJECTED },
    );
  }

  async getAllQuotes() {
    const quotes: any = await this.quoteRepo.find();

    for (const quote of quotes) {
      const supplier = await this.userRepo.findOne({
        where: { id: quote.supplier },
      });

      const items = await this.quoteItemRepo.find({
        where: { quoteId: quote.id },
      });

      quote.items = items;
      quote.supplierName = supplier.name;
    }

    return quotes;
  }

  // user

  async createUser(data: any) {
    const user = new User();

    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.type = data.type as UserTypesEnum;
    user.isActive = true;

    return await this.userRepo.save(user);
  }

  async deleteUser(id: number) {
    return await this.userRepo.update({ isActive: false }, { id });
  }
}
