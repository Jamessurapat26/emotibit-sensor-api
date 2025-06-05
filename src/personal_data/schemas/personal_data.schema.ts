import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type PersonalDataDocument = PersonalData & Document;

@Schema({
    collection: 'personal_data',
    timestamps: true,
})
export class PersonalData {

    @Prop({ required: true })
    device_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    surname: string;

    @Prop({ required: true })
    age: number;

    @Prop({ required: true })
    weight: number;

    @Prop({ required: true })
    height: number;

    @Prop()
    CD: string;

    @Prop({
        required: true,
        enum: ['Male', 'Female']
    })
    gender: string;

    @Prop({
        required: true,
        enum: ['Type 2', 'Type 3', 'Type 4', 'Type 5']
    })
    skinType: string;

    @Prop({
        required: true,
        enum: ['6 - 8 hours', 'Less than 8 hours', 'More than 8 hours']
    })
    timeToSleep: string;
}

export const PersonalDataSchema = SchemaFactory.createForClass(PersonalData);