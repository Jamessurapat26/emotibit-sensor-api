import { IsIn, IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
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
    @ApiProperty({ example: 'male' })
    gender: string;

    @IsIn(['Type1', 'Type2', 'Type3', 'Type4', 'Type5'], {
        message: 'Skin type must be one of the following: Type1, Type2, Type3, Type4, or Type5'
    })
    @IsNotEmpty()
    @ApiProperty({ example: 'Type1' })
    skinType: string;

    @IsIn(['6 - 8 hours', 'Less than 8 hours', 'More than 8 hours'], {
        message: 'Time to sleep must be one of the following: "6 - 8 hours", "Less than 8 hours", or "More than 8 hours"'
    })
    @IsNotEmpty()
    @ApiProperty({ example: '6 - 8 hours' })
    timeToSleep: string;

    // @Type(() => Date)
    // @IsDate({ message: 'timestamp must be a valid date' })
    // @ApiProperty({ default: new Date() })
    // timestamp: Date = new Date();
}
