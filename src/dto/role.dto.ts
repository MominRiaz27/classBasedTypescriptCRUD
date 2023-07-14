export interface CreateRoleDto {
    type:string,
  }
  
  export type PatchRoleDto = Partial<CreateRoleDto>;
  
  export interface RoleInfoDTO extends CreateRoleDto {
    id: number;
    createdAt: Date;
  }
  
