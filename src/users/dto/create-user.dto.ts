import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

export class CreateUserDto {

  @IsNotEmpty({ message: "Name khong duoc empty!" })
  name: string;

  @IsEmail({}, { message: 'Email khong hop le!' })
  @IsNotEmpty({ message: 'Email khong duoc empty!' })
  email: string;

  @IsNotEmpty({ message: "Password khong duoc empty!" })
  password: string;

  @IsNotEmpty({ message: "Age khong duoc empty!" })
  age: number;

  @IsNotEmpty({ message: "Gender khong duoc empty!" })
  gender: string;

  @IsNotEmpty({ message: "Address khong duoc empty!" })
  address: string;

  @IsNotEmpty({ message: "Address khong duoc empty!" })
  role: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class RegisterUserDto {

  @IsNotEmpty({ message: "Name khong duoc empty!" })
  name: string;

  @IsEmail({}, { message: 'Email khong hop le!' })
  @IsNotEmpty({ message: 'Email khong duoc empty!' })
  email: string;

  @IsNotEmpty({ message: "Password khong duoc empty!" })
  password: string;

  @IsNotEmpty({ message: "Age khong duoc empty!" })
  age: number;

  @IsNotEmpty({ message: "Gender khong duoc empty!" })
  gender: string;

  @IsNotEmpty({ message: "Address khong duoc empty!" })
  address: string;
  
}
