using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using sc.react.core.Controllers;

using sc.organization;

namespace sc.react.core.Areas.OrganizationManagement.Controllers
{
    [Area("OrganizationManagement")]
    [Route("[Area]/api/")]
    public class OrganizationManagementApiController : BaseApiController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IOrganizationDbContext _organizationDbContext;

        public OrganizationManagementApiController(UserManager<ApplicationUser> userManager, IOrganizationDbContext organizationDbContext): base(userManager)
        {
            _userManager = userManager;
            _organizationDbContext = organizationDbContext;
        }

        [HttpGet]
        [Route("getorganizationbyid")]
        public async Task<IActionResult> GetOrganizationById(int id)
        {
            var organization = await this._organizationDbContext.GetOrganizationById(id);
            return Ok(organization);
        }

        [HttpGet]
        [Route("getorganizations")]
        public async Task<IActionResult> GetOrganizations(int pageNo, int itemsPerPage, int pagePerDisplay)
        {
            var dt = await this._organizationDbContext.GetOrganizations(pageNo, itemsPerPage, pagePerDisplay);
            return Ok(dt);
        }

        [HttpPost]
        [Route("saveorganization")]
        public async Task<IActionResult> SaveOrganization(OrganizationInfo org)
        {
            org.Username = await GetCurrentUserName();
            var result = await _organizationDbContext.SaveOrganization(org);
           
            return Ok(result);
        }
        
        [HttpGet]
        [Route("deleteorganization")]
        public async Task<IActionResult> DeleteOrganization(int id)
        {
            string username = await GetCurrentUserName();
            return Ok(await _organizationDbContext.DeleteOrganization(id, username));
        }
    }
}