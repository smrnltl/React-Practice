using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using sc.data;

namespace sc.module
{
    public class ModuleDbContext : DbContext, IModuleDbContext
    {
        public ModuleDbContext() : base("DefaultConnection") { }

        public Task<IEnumerable<ModuleInfo>> GetAllModules()
        {
            return this.ExecuteAsListAsync<ModuleInfo>("dbo.usp_sc_modules_get");
        }

        public Task<IEnumerable<ModuleInfoList>> GetRolePermission(string roleId)
        {
            var p = new Parameters();
            p.Add("@RoleId", roleId);
            return this.ExecuteAsListAsync<ModuleInfoList>("dbo.usp_sc_role_permission_getById", p);
        }

        public async Task<IEnumerable<ModuleInfoList>> GetRoles()
        {
            return await this.ExecuteAsListAsync<ModuleInfoList>("dbo.usp_sc_roles_get");
        }

        public async Task<DbResult> SaveRolePermission(string rolePermission)
        {
            var p = new Parameters();
            p.Add("@Json", rolePermission);
            return await this.ExecuteDbResultAsync("dbo.usp_sc_save_role_permissions", p);
        }
    }
}
