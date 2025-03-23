import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  async login(@Body() data: any) {
    return this.appService.handleLogin(data);
  }

  @Post('/create-user')
  async createUser(@Body() data: any) {
    return await this.appService.createUser(data);
  }

  @Post('/order')
  async createNewOrder(@Body() data: any) {
    return this.appService.createNewProuduct(data);
  }

  @Post('/create-product')
  async createNewProduct(@Body() data: any) {
    return await this.appService.createNewProuduct(data);
  }

  @Get('/products')
  async getAllProducts() {
    return await this.appService.getAllProducts();
  }

  @Get('/quotes')
  async getAllQuotes() {
    return await this.appService.getAllQuotes();
  }

  @Post('/approve-quote')
  async approveQuote(@Body() data: any) {
    return await this.appService.approveQuote(data.id);
  }

  @Post('/reject-quote')
  async rejectQuote(@Body() data: any) {
    return await this.appService.rejectQuote(data.id);
  }
  @Post('/create-quote')
  async createQuote(@Body() data: any) {
    console.log(data);
    
    return await this.appService.createQuote(data, data.supplierId);
  }
}
