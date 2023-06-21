import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ROLE } from '../constants/role.constant';

export const Role = (...args: ROLE[]): CustomDecorator =>
  SetMetadata('role', args);
