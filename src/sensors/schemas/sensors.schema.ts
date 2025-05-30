import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SensorDataDocument = SensorData & Document;

@Schema()
export class Sensors {
    @Prop({ type: Number })
    skintemp: number;

    @Prop({ type: [Number] })
    eda: number[];

    @Prop({ type: [Number] })
    ppg: number[];
}

const SensorsSchema = SchemaFactory.createForClass(Sensors);

@Schema({ collection: 'sensor_readings', timestamps: true })
export class SensorData {
    @Prop({ required: true })
    topic: string;

    @Prop({ required: true })
    device_id: string;

    @Prop({ required: true })
    timestamp: number;

    @Prop({ type: Date, default: Date.now })
    received_at: Date;

    @Prop({ type: SensorsSchema })
    sensors: Sensors;
}

export const SensorDataSchema = SchemaFactory.createForClass(SensorData);