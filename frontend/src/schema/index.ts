import { z } from 'zod';

// Define Line Type
const LineSchema = z.object({
  waiting: z.number(),
  elapsed: z.number()
});

// Define Office Type
export const OfficeSchema = z.object({
  id: z.number(),
  name: z.string(),
  online: z.boolean(),
  lines: z.array(LineSchema)
});

// Define Offices Type
export const ResponseOfficesSchema = z.array(OfficeSchema);