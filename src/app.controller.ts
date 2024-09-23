import { Controller, Get, Render, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(@Query('bgColor') bgColor: string = 'white') {
    return {
      bgColor: bgColor,
      message: this.appService.getHello()
    };
  }

  #books = [
    {
      title: 'The Lord of the Rings',
      isbn: '1234-1111-1',
    },
    {
      title: 'The art of war',
      isbn: '1234-1111-2'
    },
    {
      title: 'Metro',
      isbn: '1234-1111-3'
    }
  ]

  @Get('books')
  @Render('booklist')
  getBooks(){
    return {books: this.#books}
  }

  @Get('books')
  @Render('booklist')
  getSearch(@Query('search') search: string= ''){
    let books = []
    this.#books.forEach(b =>{
      if(b.title.includes(search)){
        books.push(b)
      }
    })
    console.log(books)
    return books
  }

  @Get('books/:isbn')
  @Render('book')
  getBookByIsbn(@Param('isbn') isbn: string){
    return {
      book: this.#books.find(b => b.isbn === isbn)
    }
  }
  
}
