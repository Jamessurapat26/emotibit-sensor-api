import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorDto } from './create-sensor.dto';

export class UpdateSensorDto extends PartialType(CreateSensorDto) {
    readonly topic: string;
    readonly device_id: string;
    readonly timestamp: number;
    readonly received_at: Date;
    readonly sensors: {
        skintemp: number;
        eda: number[];
        ppg: number[];
    };
}
