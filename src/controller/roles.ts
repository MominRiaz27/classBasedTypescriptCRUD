//import { EncryptPass } from '../decorator/encryptPass.decorator';
import { NextFunction, Request, Response, Router } from 'express';
import ResponseStatus from '../responses/response';
import RolesModel from '../model/roles.model';

class Roles {
  //@EncryptPass()
  public async createroles (req: Request, res: Response, next: NextFunction): Promise<Response>{
    try {
        console.log("inside create");
        const roles = req.body;
        const result = await RolesModel.createRoles(roles);
        const [getUser] = await RolesModel.getRoles(result?.insertId);
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

  public async getrolesbyid(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user = await RolesModel.getRoles(req.body.id);
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
  public async getallroles(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("inside get all");
      const users = await RolesModel.getAllRoles();
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
  
  public async updateroles(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("inside update");
      const roles = req.body;
      const result = await RolesModel.updateRoles(roles, roles.id);
      console.log('result', result);
      const [getUser] = await RolesModel.getRoles(roles.id);
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

  public async deleteroles(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("inside delete");
      const result = await RolesModel.deleteRoles(req.body.id);
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

export default new Roles();
