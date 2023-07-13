import { Router } from 'express';

export interface IController {
  userRoutes: string;
  permissionRoutes: string;
  rolePermissionRoutes: string;
  roleRoutes: string;

  router:Router;
}
