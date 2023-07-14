//import { EncryptPass } from '../decorator/encryptPass.decorator';
import { NextFunction, Request, Response, Router } from 'express';
import userModel from '../model/user.model';
import ResponseStatus from '../responses/response';

class User {
  //@EncryptPass()
  public async createuser (req: Request, res: Response, next: NextFunction): Promise<Response>{
    try {
        console.log("inside create");
        const user = req.body;
        const result = await userModel.createUser(user);
        const [getUser] = await userModel.getUser(result?.insertId);
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

  public async getuserbyid(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user = await userModel.getUser(req.body.id);
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
  public async getallusers(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("inside get all");
      const users = await userModel.getAllUsers();
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
  
  public async updateuser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("inside update");
      const user = req.body;
      const result = await userModel.updateUser(user, user.id);
      console.log('result', result);
      const [getUser] = await userModel.getUser(user.id);
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

  public async deleteuser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      console.log("inside delete");
      const result = await userModel.deleteUser(req.body.id);
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

export default new User();
