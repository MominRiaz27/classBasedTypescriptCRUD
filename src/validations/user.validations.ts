import { z } from 'zod';

export const createUser = z.object({
  body: z.object({
    name:z.string(),
    email: z.string().email(),
    password:z.string(),
    user_type_id:z.number()
    // password: z.string().min(6),
    // first_name: z.string().min(2).max(30),
    // last_name: z.string().min(3).max(30),
  }),
});

export const updateUser = z.object({
  body: z.object({
    id:z.number(),
    name:z.string().optional(),
    email: z.string().email().optional(),
    password:z.string().optional(),
    user_type_id:z.number().optional()
    // password: z.string().max(25).optional(),
    // first_name: z.string().max(30).optional(),
    // last_name: z.string().max(30).optional(),
  // }),
  // params: z.object({
  //   id: z.string(),
 
}
  )
  ,
});
