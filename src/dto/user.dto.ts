export interface CreateUserDto {
    name:string,
    email: string;
    password: string;
  }
  
  export type PatchUserDto = Partial<CreateUserDto>;
  
  export interface UserInfoDTO extends CreateUserDto {
    id: number;
    createdAt: Date;
  }
  