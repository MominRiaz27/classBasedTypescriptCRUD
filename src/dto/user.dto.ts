export interface CreateUserDto {
    name:string,
    email: string;
    password: string;
    user_type_id: number
  }
  
  export type PatchUserDto = Partial<CreateUserDto>;
  
  export interface UserInfoDTO extends CreateUserDto {
    id: number;
    createdAt: Date;
  }
  

  