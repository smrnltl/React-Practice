using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using sc.react.core.Controllers;
using sc.module;

namespace sc.react.core.Areas.ModuleManagement.Controllers
{
    [Area("ModuleManagement")]
    [Route("[Area]/api/")]
    [ApiController]
    public class ModuleManagementApiController : BaseApiController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IModuleDbContext _moduleDbContext;

        public ModuleManagementApiController(UserManager<ApplicationUser> userManager, IModuleDbContext moduleDbContext) : base(userManager)
        {
            _userManager = userManager;
            _moduleDbContext = moduleDbContext;
        }

        [HttpGet]
        [Route("getallmodules")]
        public async Task<IActionResult> GetAllModules()
        {
            var modules = await _moduleDbContext.GetAllModules();
            return Ok(modules);
        }

        [HttpGet]
        [Route("GetRolePermission")]
        public async Task<IActionResult> GetRolePermission(string roleId)
        {
            var modules = await _moduleDbContext.GetRolePermission(roleId);
            return Ok(modules);
        }

        [HttpGet]
        [Route("GetRoles")]
        public async Task<IActionResult> GetRoles()
        {
            var modules = await _moduleDbContext.GetRoles();
            return Ok(modules);
        }

        [HttpPost]
        [Route("SaveRolePermission")]
        public async Task<IActionResult> SaveRolePermission(RolePer role)
        {            
            var modules = await _moduleDbContext.SaveRolePermission(role.RolePermissions);
            return Ok(modules);
        }
    }
    public class RolePer
    {
        public string RolePermissions { get; set; }
    }
}