import { PatchUserDto } from './../dto/user.dto';
import { CreateRolePermissionDto, PatchRolePermissionDto } from '../dto/role_permission.dto';
import QueryDB from '../provider/db.provider';
import bcrypt from 'bcrypt';
//import { EncryptPass } from '../decorator/encryptPass.decorator';


class RolesPermissionModel {
  //@EncryptPass()
  public async createRolesPermission(rolepermission: CreateRolePermissionDto) {
    console.log(`INSERT into roles_permission (${Object.keys(rolepermission).join(',')}) values(${Array.from({ length: Object.keys(rolepermission).length }).map(() => '?')})`,
    [...Object.values(rolepermission)]);
    return await QueryDB(
      `INSERT into roles_permission (${Object.keys(rolepermission).join(',')}) values(${Array.from({ length: Object.keys(rolepermission).length }).map(() => '?')})`,
      [...Object.values(rolepermission)],
    );
  }

  public async updateRolesPermission(rolepermission: PatchRolePermissionDto, id: string) {
    const query = `Update roles_permission set ${Object.entries(rolepermission).map(([key, val]) => key + '=' + `"${val}"`)} where id = ?`;
    return await QueryDB(query, [id]);
  }

  public async getRolesPermission(rolepermissionid: string) {
    console.log("inside get model");
    return QueryDB('Select * from roles_permission where id = ?', [rolepermissionid]);
  }
  public async getAllRolesPermission() {
    console.log("inside get all role permission");
    return QueryDB('Select * from roles_permission');
  }

  public async deleteRolesPermission(rolepermissionid: string) {
    return QueryDB('Delete from roles_permission where id = ?', [rolepermissionid]);
  }
}

export default new RolesPermissionModel();
