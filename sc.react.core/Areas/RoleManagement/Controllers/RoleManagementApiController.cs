using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using sc.react.core.Controllers;

namespace sc.react.core.Areas.RoleManagement.Controllers
{
    [Area("RoleManagement")]
    [Route("[Area]/api/")]
    [ApiController]
    public class RoleManagementApiController : BaseApiController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleManagementApiController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager) : base(userManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpGet]
        [Route("getroles")]
        public IActionResult GetRoles()
        {
            var roles = _roleManager.Roles;
            return Ok(roles);
        }

        [HttpGet]
        [Route("getrolebyid")]
        public async Task<IActionResult> GetRoleById(string roleId)
        {
            try
            {
                if (string.IsNullOrEmpty(roleId))
                    return Ok();

                var role = await _roleManager.FindByIdAsync(roleId);
                return Ok(role);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("saverole")]
        public async Task<IActionResult> SaveRole(IdentityRole role)
        {
            IdentityRole identityRole = new IdentityRole
            {
                Name = role.Name
            };

            IdentityResult result = await _roleManager.CreateAsync(identityRole);
            return Ok(result);
        }

        [HttpPost]
        [Route("updaterole")]
        public async Task<IActionResult> UpdateRole(IdentityRole role)
        {
            var obj = await _roleManager.FindByIdAsync(role.Id);

            if (obj != null)
            {

                var result = new IdentityResult();

                obj.Name = role.Name;


                result = await _roleManager.UpdateAsync(obj);

                return Ok(result);
            }
            else
                return NoContent();
        }

        [HttpGet]
        [Route("deleterole")]
        public async Task<IActionResult> DeleteRole(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return null;
            }
            else
            {
                var obj = await _roleManager.FindByIdAsync(id);

                var result = await _roleManager.DeleteAsync(obj);

                return Ok(result);
            }
        }
    }
}