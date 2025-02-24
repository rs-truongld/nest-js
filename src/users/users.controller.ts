import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from '@/decorator/customize';
import { IUser } from './user.interface';

@Controller('users') // => /user
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ResponseMessage("Create a New User")
  @Public()
  @Post()
    async create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
      let newUser = await this.usersService.create(createUserDto, user);
      return { 
        _id: newUser?.id, 
        createAt: newUser?.createdAt 
      }
    }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ResponseMessage("Update a User")
  @Patch()
  async update( @Body() updateUserDto: UpdateUserDto, @User() user: IUser)
  {
    let updateUser = await this.usersService.update(updateUserDto, user);
    return updateUser;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
