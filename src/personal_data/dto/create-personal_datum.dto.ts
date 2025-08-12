import { IsIn, IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonalDatumDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Emotibit01' })
    device_id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'John' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Doe' })
    surname: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 30 })
    age: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 70 })
    weight: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 175 })
    height: number;

    @IsString()
    @ApiProperty()
    CD: string;

    @IsString()
    @IsIn(['Male', 'Female'], {
        message: 'Gender must be one of the following: Male, Female'
    })
    @IsNotEmpty()
    @ApiProperty({ example: 'Male' })
    gender: string;

    @IsIn(['Type 2', 'Type 3', 'Type 4', 'Type 5'], {
        message: 'Skin type must be one of the following: Type 2, Type 3, Type 4, or Type 5'
    })
    @IsNotEmpty()
    @ApiProperty({ example: 'Type 2' })
    skinType: string;

    @IsIn(['6 - 8 hours', 'Less than 8 hours', 'More than 8 hours'], {
        message: 'Time to sleep must be one of the following: "6 - 8 hours", "Less than 8 hours", or "More than 8 hours"'
    })
    @IsNotEmpty()
    @ApiProperty({ example: '6 - 8 hours' })
    timeToSleep: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'A' })
    ward: string;

    @IsNotEmpty()
    @ApiProperty({ example: '1' })
    bed: number;

    // @Type(() => Date)
    // @IsDate({ message: 'timestamp must be a valid date' })
    // @ApiProperty({ default: new Date() })
    // timestamp: Date = new Date();
}
