using sc.data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sc.organization
{
    public interface IOrganizationDbContext
    {
        Task<PagedData<OrganizationReturnInfo>> GetOrganizations(int pageNo, int itemsPerPage, int pagePerDisplay);

        Task<OrganizationReturnInfo> GetOrganizationById(int id);

        Task<DbResult> DeleteOrganization(int id, string username);

        Task<DbResult> SaveOrganization(OrganizationInfo org);
    }
}
