import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { timeStamp } from 'console';
import { IUser } from './user.interface';


@Injectable()
export class UsersService implements OnModuleInit {

  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
    private configService: ConfigService
  ) { }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async create(userDto: CreateUserDto, user: IUser) {
    const {name, email, password, age, gender, address, role, company } = userDto
    const isExit = await this.userModel.findOne({email})

    if (isExit) {
      throw new BadRequestException(`Email: ${email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác.`)
    }
    const hashPassword = this.getHashPassword(password);

    let newUser = await this.userModel.create({
      name, 
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role,
      company,
      createBy: {
        _id: user?._id,
        email: user?.email
      }
    });
    return newUser;
  }

  async regiter(registerUserDto: RegisterUserDto) {

    const {name, email, password, age, gender, address } = registerUserDto
    const isExit = await this.userModel.findOne({email})

    if (isExit) {
      throw new BadRequestException(`Email: ${email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác.`)
    }
    const hashPassword = this.getHashPassword(password);

      let user = await this.userModel.create({
        name,
        email,
        password: hashPassword,
        age,
        gender,
        address,
        role: "USER"
      });
      return user;
  }


  async onModuleInit() {
    const count = await this.userModel.count();
    if (count === 0) {
      const salt = genSaltSync(10);
      const hash = hashSync(this.configService.get<string>("INIT_USER_PASSWORD"), salt);
      await this.userModel.insertMany([
        {
          name: "Eric",
          email: "admin@gmail.com",
          password: hash
        },
        {
          name: "User",
          email: "user@gmail.com",
          password: hash
        },
        {
          name: "User 1",
          email: "user1@gmail.com",
          password: hash
        },
        {
          name: "User 2",
          email: "user2@gmail.com",
          password: hash
        },
        {
          name: "User 3",
          email: "user3@gmail.com",
          password: hash
        }
      ])
    }
  }


  async findAll() {
    return await this.userModel.find({});
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  checkPassword(hash: string, plain: string) {
    return compareSync(hash, plain);
  }

  isValidPassword(password: string, hash: string) {
    return compareSync ( password,  hash ) ;
  }

  remove(id : string) {
    if(!mongoose.Types.ObjectId.isValid(id))
      return 'not found user';

    return this.userModel.softDelete({
      _id: id
    })
  }
  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return "Not found User!";
    }

    return this.userModel.findOne({
      _id: id,
    });
  }

  async update(updateUserDto: UpdateUserDto, user: IUser) {

    const updateUser = await this.userModel.updateOne(
      {_id: updateUserDto._id}, 
      {
                ... updateUserDto,
                updatedBy: {
                  _id: user._id,
                  email: user.email
              }
              });
    return updateUser;
  }

}
