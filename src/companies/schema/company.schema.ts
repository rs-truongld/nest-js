import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({timestamps: true})
export class Company {
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    description: string;

    @Prop()
    createAt: Date;

    @Prop({type: Object})
    createBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };

    @Prop({type: Object})
    updateBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };

    @Prop({type: Object})
    deleteBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };

    @Prop()
    updateAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deleteAt: Date;

}

export const CompanySchema = SchemaFactory.createForClass(Company);
