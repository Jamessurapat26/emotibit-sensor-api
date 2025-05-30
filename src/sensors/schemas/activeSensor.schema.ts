import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActiveSensorDocument = ActiveSensor & Document;

@Schema({
    collection: 'device_status',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
})
export class ActiveSensor {
    @Prop({ required: true, index: true }) // Add index for faster queries
    device_id: string;

    @Prop({ required: true, enum: ['active', 'inactive'] }) // Add enum for validation
    status: string;

    @Prop({ required: true })
    timestamp: number;

    @Prop({ type: Date, required: true })
    datetime: Date;

    // These will be handled by the timestamps option above
    // created_at and updated_at don't need explicit props
}

export const ActiveSensorSchema = SchemaFactory.createForClass(ActiveSensor);
