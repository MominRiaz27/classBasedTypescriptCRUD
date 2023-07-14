import { z } from 'zod';

export const createPermission = z.object({
  body: z.object({
    permission_name:z.string(),
  }),
});

export const updatePermission = z.object({
  body: z.object({
    id:z.number(),
    permission_name:z.string()
}
  )
  ,
});
