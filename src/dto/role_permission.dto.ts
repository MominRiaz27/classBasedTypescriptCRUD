export interface CreateRolePermissionDto {
    user_type_id:number,
    permission_id:number,
    route:string
  }
  
  export type PatchRolePermissionDto = Partial<CreateRolePermissionDto>;
  
  export interface RolePermissionInfoDTO extends CreateRolePermissionDto {
    id: number;
    createdAt: Date;
  }
  
