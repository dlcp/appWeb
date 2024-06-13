import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get('query')
    rutaQuery(@Query() query) {
        return `El dato query.x ha recibido el valor ${query.x} ye le dato querry.y ha recibido el valor de ${query.y} `;
    }
    //@Get('cars')
    //carsQuery(@Query('count') carCount: number) {
      ///   return `La cuenta en carCount es de : ${carCount}`;
    //}
    @Get('cars')
    carsQuery(@Query('count', ParseIntPipe) carCount: number) {
    return `La cuenta en carCount es de : ${carCount}`;
}
}
//http://localhost:3000/users/query?x=24&y=xxx
//http://localhost:3000/cars?count=3