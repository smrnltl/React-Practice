using sc.data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace sc.module
{
    public interface IModuleDbContext
    {
        Task<IEnumerable<ModuleInfo>> GetAllModules();
        Task<IEnumerable<ModuleInfoList>> GetRoles();
        Task<IEnumerable<ModuleInfoList>> GetRolePermission(string roleId);
        Task<DbResult> SaveRolePermission(string rolePermissiona);
    }
}
