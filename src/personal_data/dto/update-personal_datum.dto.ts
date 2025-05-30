import { PartialType } from '@nestjs/swagger';
import { CreatePersonalDatumDto } from './create-personal_datum.dto';

export class UpdatePersonalDatumDto extends PartialType(CreatePersonalDatumDto) {
    // This is already correct - PartialType makes all properties optional
}
