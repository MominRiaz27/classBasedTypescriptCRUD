import { NextFunction, Request, Response, Router } from 'express';
import { IController } from '../interface/controller.interface';
import userModel from '../model/user.model';
import ResponseStatus from '../responses/response';
import { validate } from '../middleware/validate.middleware';
import { createUser as validateUser, updateUser } from '../validations/user.validations';
import { createPermission as validatePermission, updatePermission } from '../validations/permission.validation';
import { createRole as validateRole, updateRole } from '../validations/roles.validation';
import { createRolePermission as validateRolePermission, updateRolePermission } from '../validations/rolepermission.validation';

import { SendEmail } from '../decorator/sendEmail.decorator';
import User from "./users"
import Permissions from "./permissions"
import Roles from "./roles"
import RolesPermission from "./rolesPermission"


export default class UserController implements IController {
  
  public userRoutes = '/users';
  public permissionRoutes= '/permissions';
  public rolePermissionRoutes= '/rolePermissions';
  public roleRoutes= '/roles';
  
  public router = Router();

  constructor() {
    this.initializeUsersRoutes();
    this.initializePermissionsRoutes();
    this.initializeRolesRoutes();
    this.initializeRolesPermissionsRoutes();
  }

  private initializeUsersRoutes(): void {
    this.router.get(`${this.userRoutes}/get`, this.getAllUsers);
    this.router.get(`${this.userRoutes}/getById`, this.getUserById);
    this.router.post(`${this.userRoutes}/create`, validate(validateUser), this.createUser);
    this.router.patch(`${this.userRoutes}/update`, validate(updateUser), this.updateUser);
    this.router.delete(`${this.userRoutes}/delete`, this.deleteUser);
  }

  private initializePermissionsRoutes(): void {
    this.router.get(`${this.permissionRoutes}/get`, this.getAllPermission);
    this.router.get(`${this.permissionRoutes}/:id`, this.getPermissionById);
    this.router.post(`${this.permissionRoutes}/create`, validate(validatePermission), this.createPermission);
    this.router.patch(`${this.permissionRoutes}/update`, validate(updatePermission), this.updatePermission);
    this.router.delete(`${this.permissionRoutes}/delete`, this.deletePermission);
  }

  private initializeRolesPermissionsRoutes(): void {
    this.router.get(`${this.rolePermissionRoutes}/get`, this.getAllRolesPermission);
    this.router.get(`${this.rolePermissionRoutes}/:id`, this.getRolesPermissionById);
    this.router.post(`${this.rolePermissionRoutes}/create`, validate(validateRolePermission), this.createRolesPermission);
    this.router.patch(`${this.rolePermissionRoutes}/update`, validate(updateRolePermission), this.updateRolesPermission);
    this.router.delete(`${this.rolePermissionRoutes}/delete`, this.deleteRolesPermission);
  }

  private initializeRolesRoutes(): void {
    this.router.get(`${this.roleRoutes}/get`, this.getAllRoles);
    this.router.get(`${this.roleRoutes}/:id`, this.getRolesById);
    this.router.post(`${this.roleRoutes}/create`, validate(validateRole), this.createRoles);
    this.router.patch(`${this.roleRoutes}/update`, validate(updateRole), this.updateRoles);
    this.router.delete(`${this.roleRoutes}/delete`, this.deleteRoles);
  }

  //users routes

  @SendEmail()
  private async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
      const result = await User.createuser( req, res, next);
  return result;
  }
  private async getUserById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await User.getuserbyid( req, res, next);
  return result;
  }
  private async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.log("route is : ", req.originalUrl);
    const result = await User.getallusers( req, res, next);
  return result;
  }
  private async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await User.updateuser( req, res, next);
  return result;
  }
  private async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await User.deleteuser( req, res, next);
  return result;
  }

// permissions routes

  private async createPermission(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await Permissions.createpermission( req, res, next);
  return result;
  }
  private async getPermissionById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await Permissions.getpermissionbyid( req, res, next);
  return result;
  }
  private async getAllPermission(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await Permissions.getallpermission( req, res, next);
  return result;
  }
  private async updatePermission(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await Permissions.updatepermission( req, res, next);
  return result;
  }
  private async deletePermission(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await Permissions.deletepermission( req, res, next);
  return result;
  }


  // roles routes

  private async createRoles(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.log("inside create roles");
    const result = await Roles.createroles( req, res, next);
  return result;
  }
  private async getRolesById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await Roles.getrolesbyid( req, res, next);
  return result;
  }
  private async getAllRoles(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await Roles.getallroles( req, res, next);
  return result;
  }
  private async updateRoles(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await Roles.updateroles( req, res, next);
  return result;
  }
  private async deleteRoles(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await Roles.deleteroles( req, res, next);
  return result;
  }

  // rolesPermission routes

  private async createRolesPermission(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await RolesPermission.createrolespermissions( req, res, next);
  return result;
  }
  private async getRolesPermissionById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await RolesPermission.getrolespermissionsbyid( req, res, next);
  return result;
  }
  private async getAllRolesPermission(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await RolesPermission.getallrolespermissions( req, res, next);
  return result;
  }
  private async updateRolesPermission(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await RolesPermission.updaterolespermissions( req, res, next);
  return result;
  }
  private async deleteRolesPermission(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const result = await RolesPermission.deleterolespermissions( req, res, next);
  return result;
  }
}
