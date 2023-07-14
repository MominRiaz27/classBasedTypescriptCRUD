
import { CreateRoleDto,PatchRoleDto } from '../dto/role.dto';
import QueryDB from '../provider/db.provider';
import bcrypt from 'bcrypt';
//import { EncryptPass } from '../decorator/encryptPass.decorator';


class RolesModel {
  //@EncryptPass()
  public async createRoles(role: CreateRoleDto) {
    console.log(`INSERT into user_types (${Object.keys(role).join(',')}) values(${Array.from({ length: Object.keys(role).length }).map(() => '?')})`,
    [...Object.values(role)]);
    return await QueryDB(
      `INSERT into user_types (${Object.keys(role).join(',')}) values(${Array.from({ length: Object.keys(role).length }).map(() => '?')})`,
      [...Object.values(role)],
    );
  }

  public async updateRoles(role: PatchRoleDto, id: string) {
    const query = `Update user_types set ${Object.entries(role).map(([key, val]) => key + '=' + `"${val}"`)} where id = ?`;
    return await QueryDB(query, [id]);
  }

  public async getRoles(rolesid: string) {
    console.log("inside get model");
    return QueryDB('Select * from user_types where id = ?', [rolesid]);
  }
  public async getAllRoles() {
    return QueryDB('Select * from user_types');
  }

  public async deleteRoles(rolesid: string) {
    return QueryDB('Delete from user_types where id = ?', [rolesid]);
  }
}

export default new RolesModel();
