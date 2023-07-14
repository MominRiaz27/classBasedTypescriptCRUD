export interface CreatePermissionDto {
    permission_name:string,
  }

  export type PatchPermissionDto = Partial<CreatePermissionDto>;
  
  export interface PermissionInfoDTO extends CreatePermissionDto {
    id: number;
    createdAt: Date;
  }