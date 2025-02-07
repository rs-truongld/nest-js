import { IsNotEmpty } from 'class-validator';
export class CreateCompanyDto {
  @IsNotEmpty({ message: 'Name khong duoc empty!', })
  name: string;

  @IsNotEmpty({ message: "Address khong duoc empty!", })
  address: string;

  @IsNotEmpty({ message: 'Description khong duoc empty!', })
  description: string;
}
