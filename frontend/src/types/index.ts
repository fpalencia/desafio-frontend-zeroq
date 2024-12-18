import { z } from 'zod';
import { OfficeSchema } from '../schema/index';

// Define Offices Type
export type Offices = z.infer<typeof OfficeSchema>;