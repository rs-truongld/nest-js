import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsEmail({}, { message: 'Email khong hop le!' })
  @IsNotEmpty({ message: 'Email khong duoc empty!' })
  email: string;

  @IsNotEmpty({ message: "Password khong duoc empty!" })
  password: string;
  name: string;
  address: string;
}
