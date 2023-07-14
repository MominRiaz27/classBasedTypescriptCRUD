
import { CreatePermissionDto, PatchPermissionDto } from '../dto/permission.dto';
import QueryDB from '../provider/db.provider';
import bcrypt from 'bcrypt';
//import { EncryptPass } from '../decorator/encryptPass.decorator';


class PermissionModel {
  //@EncryptPass()
  public async createPermission(permission: CreatePermissionDto) {
    console.log(`INSERT into permissions (${Object.keys(permission).join(',')}) values(${Array.from({ length: Object.keys(permission).length }).map(() => '?')})`,
    [...Object.values(permission)]);
    return await QueryDB(
      `INSERT into permissions (${Object.keys(permission).join(',')}) values(${Array.from({ length: Object.keys(permission).length }).map(() => '?')})`,
      [...Object.values(permission)],
    );
  }

  public async updatePermission(user: PatchPermissionDto, id: string) {
    const query = `Update permissions set ${Object.entries(user).map(([key, val]) => key + '=' + `"${val}"`)} where id = ?`;
    return await QueryDB(query, [id]);
  }

  public async getPermission(permissionid: string) {
    console.log("inside get model");
    return QueryDB('Select * from permissions where id = ?', [permissionid]);
  }
  public async getAllPermission() {
    return QueryDB('Select * from permissions');
  }

  public async deletePermission(permissionid: string) {
    return QueryDB('Delete from permissions where id = ?', [permissionid]);
  }
}

export default new PermissionModel();
