import { z } from 'zod';

export const createRole = z.object({
  body: z.object({
    type:z.string(),
  }),
});

export const updateRole = z.object({
  body: z.object({
    id:z.number(),
    type:z.string()
}
  )
  ,
});
