using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using sc.data;

namespace sc.organization
{
    public class OrganizationDbContext : DbContext, IOrganizationDbContext
    {
        public OrganizationDbContext(): base("DefaultConnection") { }

        public async Task<PagedData<OrganizationReturnInfo>> GetOrganizations(int pageNo, int itemsPerPage, int pagePerDisplay)
        {
            try
            {
                Parameters p = new Parameters();
                p.Add("@PageNo", pageNo);
                p.Add("@ItemsPerPage", itemsPerPage);
                p.Add("@PagePerDisplay", pagePerDisplay);

                var data = await this.ExecuteMultipleAsync("[dbo].[usp_sc_settings_organization_get_all]", p);

                return new PagedData<OrganizationReturnInfo>
                {
                    Data = data.ReadAsList<OrganizationReturnInfo>(),
                    Pager = data.ReadAsObject<Pager>()
                };
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }

        public async Task<DbResult> DeleteOrganization(int id, string username)
        {
            try
            {
                Parameters p = new Parameters();
                p.Add("@Id", id);
                p.Add("@Username", username);

                return await this.ExecuteDbResultAsync("[dbo].[usp_sc_settings_organization_delete]", p);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<OrganizationReturnInfo> GetOrganizationById(int id)
        {
            try
            {
                Parameters p = new Parameters();
                p.Add("@Id", id);

                return await this.ExecuteAsObjectAsync<OrganizationReturnInfo>("[dbo].[usp_sc_settings_organization_get_by_id]", p);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DbResult> SaveOrganization(OrganizationInfo org)
        {
            try
            {
                Parameters p = new Parameters();
                p.Add("@Id", org.Id);
                p.Add("@CompanyCode", org.CompanyCode);
                p.Add("@CompanyName", org.CompanyName);
                p.Add("@CountryCode", org.CountryCode);
                p.Add("@StateCode", org.StateCode);
                p.Add("@DistrictCode", org.DistrictCode);
                p.Add("@LocalUnitCode", org.LocalUnitCode);
                p.Add("@Address", org.Address);
                p.Add("@PhoneNo", org.PhoneNo);
                p.Add("@Fax", org.Fax);
                p.Add("@Email", org.Email);
                p.Add("@PAN", org.PAN);
                p.Add("@Username", org.Username);

                return await this.ExecuteDbResultAsync("[dbo].[usp_sc_settings_organization_save]", p);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
