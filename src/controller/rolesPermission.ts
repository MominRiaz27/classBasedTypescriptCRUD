//import { EncryptPass } from '../decorator/encryptPass.decorator';
import { NextFunction, Request, Response, Router } from 'express';
import ResponseStatus from '../responses/response';
import RolesPermissionModel from '../model/rolespermission.model';

class RolesPermission {
  //@EncryptPass()
  public async createrolespermissions (req: Request, res: Response, next: NextFunction): Promise<Response>{
    try {
        console.log("inside create");
        const rolespermission = req.body;
        const result = await RolesPermissionModel.createRolesPermission(rolespermission);
        const [getUser] = await RolesPermissionModel.getRolesPermission(result?.insertId);
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

  public async getrolespermissionsbyid(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user = await RolesPermissionModel.getRolesPermission(req.body.id);
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
  public async getallrolespermissions(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("inside get all roles permission");
      const users = await RolesPermissionModel.getAllRolesPermission();
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
  
  public async updaterolespermissions(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("inside update");
      const rolespermission = req.body;
      const result = await RolesPermissionModel.updateRolesPermission(rolespermission, rolespermission.id);
      console.log('result', result);
      const [getUser] = await RolesPermissionModel.getRolesPermission(rolespermission.id);
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

  public async deleterolespermissions(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("inside delete");
      const result = await RolesPermissionModel.deleteRolesPermission(req.body.id);
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

export default new RolesPermission();
