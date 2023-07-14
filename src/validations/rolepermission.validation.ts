import { z } from 'zod';

export const createRolePermission = z.object({
  body: z.object({
    user_type_id:z.number(),
    permission_id:z.number(),
    route:z.string()
  }),
});

export const updateRolePermission = z.object({
  body: z.object({
    id:z.number(),
    user_type_id:z.number().optional(),
    permission_id:z.number().optional(),
    route:z.string().optional()
}
  )
  ,
});
