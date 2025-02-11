import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schema/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '@/users/user.interface';
import { use } from 'passport';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { isEmpty } from 'class-validator';

@Injectable()
export class CompaniesService {

  constructor(
      @InjectModel(Company.name)
      private companyModel: SoftDeleteModel<CompanyDocument>
    ) { }

  create(companyDto: CreateCompanyDto, user: IUser) {
      return this.companyModel.create({
        ...companyDto, 
        createBy: {
          _id: user._id,
          email: user.email
        }
      })
  }


  async findAll(currentPage: string, limit: string, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.page;
    delete filter.limit;
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.companyModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    
    const result = await this.companyModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    // @ts-ignore: Unreachable code error
    .sort(sort as any)
    .populate(population)
    .exec()

    return { 
      meta: {
        current: currentPage, // trang hien tai
        pageSize: limit,      // so luong ban ghi da lay
        pages: totalPages,    // tong so trang voi dieu kien query
        total: totalItems     // tong so phan tu (so ban ghi)
      },
      result
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    return await this.companyModel.updateOne({_id: id}, 
       {...updateCompanyDto, updateBy: {
      _id: user._id,
      email: user.email
    }});
  }

  async remove(id: string, user: IUser) {
    await this.companyModel.updateOne({_id: id}, 
      {
        deleteBy: {
          _id: user._id,
          email: user.email,
        }
      })
    return this.companyModel.softDelete({_id: id})
  }

}
