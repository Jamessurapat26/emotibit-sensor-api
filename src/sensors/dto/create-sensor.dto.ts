export class CreateSensorDto {
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
