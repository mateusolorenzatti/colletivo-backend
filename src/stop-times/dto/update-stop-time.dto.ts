import { PartialType } from '@nestjs/swagger';
import { CreateStopTimeDto } from './create-stop-time.dto';

export class UpdateStopTimeDto extends PartialType(CreateStopTimeDto) {}
