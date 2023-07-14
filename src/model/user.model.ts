import { PatchUserDto } from './../dto/user.dto';
import { CreateUserDto } from '../dto/user.dto';
import QueryDB from '../provider/db.provider';
import bcrypt from 'bcrypt';
//import { EncryptPass } from '../decorator/encryptPass.decorator';


class UserModel {

  //@EncryptPass()
  public async createUser(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 13);
    console.log(`INSERT into users (${Object.keys(user).join(',')}) values(${Array.from({ length: Object.keys(user).length }).map(() => '?')})`,
    [...Object.values(user)]);
    return await QueryDB(
      `INSERT into users (${Object.keys(user).join(',')}) values(${Array.from({ length: Object.keys(user).length }).map(() => '?')})`,
      [...Object.values(user)],
    );
  }
  public async updateUser(user: PatchUserDto, id: string) {
    const query = `Update users set ${Object.entries(user).map(([key, val]) => key + '=' + `"${val}"`)} where id = ?`;
    return await QueryDB(query, [id]);
  }

  public async getUser(userid: string) {
    console.log("inside get model");
    return QueryDB('Select * from users where id = ?', [userid]);
  }
  public async getAllUsers() {
    return QueryDB('Select * from users');
  }

  public async deleteUser(userid: string) {
    return QueryDB('Delete from users where id = ?', [userid]);
  }
}

export default new UserModel();
