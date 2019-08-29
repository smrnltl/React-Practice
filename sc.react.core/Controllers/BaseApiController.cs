using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace sc.react.core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class BaseApiController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public BaseApiController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<string> GetCurrentUserId()
        {
            ApplicationUser usr = await GetCurrentUserAsync();
            return usr?.Id;
        }

        [HttpGet]
        public async Task<string> GetCurrentUserName()
        {
            ApplicationUser usr = await GetCurrentUserAsync();
            return usr?.UserName;
        }

        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

    }
}