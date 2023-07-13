import { CreateUserDto } from '../dto/user.dto';
import { NextFunction, Request, Response } from 'express';

export function EncryptPass(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      // Access req data and modify it
      console.log('Data before modofocation :', req.body);

      const modifiedReqData = { ...req.body, name: 'Jahazz' };
      console.log('Modified req data:', modifiedReqData);

      // Call the original method with the modified req data
      const result = await originalMethod.call(this, modifiedReqData, res, next);
      return result;
    };

    return descriptor;
  };
}
