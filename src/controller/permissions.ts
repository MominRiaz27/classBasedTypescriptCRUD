//import { EncryptPass } from '../decorator/encryptPass.decorator';
import { NextFunction, Request, Response, Router } from 'express';
import ResponseStatus from '../responses/response';
import permissionModel from '../model/permission.model';

class Permissions {
  //@EncryptPass()
  public async createpermission (req: Request, res: Response, next: NextFunction): Promise<Response>{
    try {
        console.log("inside create");
        const permission = req.body;
        const result = await permissionModel.createPermission(permission);
        const [getUser] = await permissionModel.getPermission(result?.insertId);
        console.log("before decorator");
        return res.status(ResponseStatus.CREATED).json({
          status: 'success',
          user: getUser,
        });
      } catch (er: any) {
        return res.status(ResponseStatus.SERVER_ERROR).json({
          status: 'failed',
          error: er.message,
        });
      }
  }

  public async getpermissionbyid(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user = await permissionModel.getPermission(req.body.id);
      console.log('user', user);
      if (!user || user.length === 0)
        return res.status(ResponseStatus.NOT_FOUND).json({
          status: 'not found',
          message: 'User not found',
        });

      return res.status(ResponseStatus.OK).json({
        status: 'success',
        user,
      });
    } catch (er: any) {
      return res.status(ResponseStatus.SERVER_ERROR).json({
        status: 'failed',
        error: er.message,
      });
    }
  }
  public async getallpermission(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("inside get all");
      const users = await permissionModel.getAllPermission();
      return res.status(ResponseStatus.OK).json({
        status: 'success',
        users: users,
      });
    } catch (er: any) {
      return res.status(ResponseStatus.SERVER_ERROR).json({
        status: 'failed',
        error: er.message,
      });
    }
  }
  
  public async updatepermission(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("inside update");
      const permission = req.body;
      const result = await permissionModel.updatePermission(permission, permission.id);
      console.log('result', result);
      const [getUser] = await permissionModel.getPermission(permission.id);
      return res.status(ResponseStatus.OK).json({
        status: 'success',
        user: getUser,
      });
    } catch (er: any) {
      return res.status(ResponseStatus.SERVER_ERROR).json({
        status: 'failed',
        error: er.message,
      });
    }
  }

  public async deletepermission(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("inside delete");
      const result = await permissionModel.deletePermission(req.body.id);
      if (result.affectedRows > 0)
        return res.status(ResponseStatus.OK).json({
          status: 'success',
          message: 'Record deleted successfully',
        });

      return res.status(ResponseStatus.NOT_FOUND).json({
        status: 'not found',
        message: 'No User found against this id',
      });
    } catch (er: any) {
      return res.status(ResponseStatus.SERVER_ERROR).json({
        status: 'failed',
        error: er.message,
      });
    }
  }
}

export default new Permissions();
