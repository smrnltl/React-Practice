using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using sc.react.core.Controllers;

using sc.user;

namespace sc.react.core.Areas.UserManagement.Controllers
{
    [Area("UserManagement")]
    [Route("[Area]/api/")]
    public class UserManagementApiController : BaseApiController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserDbContext _userDbContext;

        public UserManagementApiController(UserManager<ApplicationUser> userManager, IUserDbContext userDbContext) : base(userManager)
        {
            _userManager = userManager;
            _userDbContext = userDbContext;
        }

        [HttpGet]
        [Route("getcurrentuser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            return Ok(await this._userManager.GetUserAsync(HttpContext.User));
        }

        [HttpGet]
        [Route("getfiltereduser")]
        public async Task<IActionResult> GetFilteredUser(string userId)
        {
            return Ok(await this._userManager.FindByIdAsync(userId));
        }

        [HttpGet]
        [Route("getuserbyid")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            if (string.IsNullOrEmpty(userId))
                return Ok();
            var user = await this._userDbContext.GetUserById(userId);
            return Ok(user);
        }

        [HttpGet]
        [Route("getusers")]
        public async Task<IActionResult> GetUsers(string userName, string email, string phoneNumber, int pageNo, int itemsPerPage, int pagePerDisplay)
        {
            if (string.IsNullOrEmpty(userName))
                userName = string.Empty;
            if (string.IsNullOrEmpty(email))
                email = string.Empty;
            if (string.IsNullOrEmpty(phoneNumber))
                phoneNumber = string.Empty;

            var dt = await this._userDbContext.GetUsers(userName, email, phoneNumber, pageNo, itemsPerPage, pagePerDisplay);
            return Ok(dt);
        }

        [HttpPost]
        [Route("saveuser")]
        public async Task<IActionResult> SaveUser(UserInfo user)
        {
            var obj = await _userManager.FindByIdAsync(user.UserId);


            var result = new IdentityResult();

            if (obj == null)
            {
                var userObj = new ApplicationUser
                {
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber
                };

                result = await _userManager.CreateAsync(userObj, user.Password);

                if (result.Succeeded)
                {
                    result = await _userManager.AddToRoleAsync(userObj, string.IsNullOrEmpty(user.RoleName) ? user.RoleName : "anonymous");
                }
            }
            return Ok(result);
        }
        [HttpPost]
        [Route("updateuser")]
        public async Task<IActionResult> UpdateUser(UserInfo user)
        {
            var obj = await _userManager.FindByIdAsync(user.UserId);

            if (obj != null)
            {

                var result = new IdentityResult();

                obj.PasswordHash = string.IsNullOrEmpty(user.Password) ? obj.PasswordHash : this._userManager.PasswordHasher.HashPassword(obj, user.Password);
                obj.UserName = user.UserName;
                obj.FirstName = user.FirstName;
                obj.LastName = user.LastName;
                obj.Email = user.Email;
                obj.PhoneNumber = user.PhoneNumber;

              
                result = await _userManager.UpdateAsync(obj);

                if (result.Succeeded)
                {
                    var oldRoles = await _userManager.GetRolesAsync(obj);
                    var oldRoleName = "";
                    if (oldRoles.Count > 0)
                    {
                        oldRoleName = oldRoles.First();

                        if (oldRoleName != user.RoleName)
                        {
                            await _userManager.RemoveFromRoleAsync(obj, oldRoleName);

                        }
                    }

                    await _userManager.AddToRoleAsync(obj, string.IsNullOrEmpty(user.RoleName) ? "anonymous" : user.RoleName);
                }


                return Ok(result);
            }
            else
                return NoContent();
        }

        [HttpGet]
        [Route("deleteuser")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return null;
            }
            else
            {
                return Ok(await _userDbContext.DeleteUser(userId));
            }
        }
    }
}