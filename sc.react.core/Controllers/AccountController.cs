using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using sc.react.core.Models;

namespace sc.react.core.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;


        //private readonly signInManager<IdentityUser> _signInManager;
        //private readonly userManager<IdentityUser> _userManager;

        //public AccountController(userManager<ApplicationUser> userManager, signInManager<ApplicationUser> signInManager)
        //{
        //    userManager = userManager;
        //}


        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
        }
        public async Task<ApplicationUser> GetUser()
        {
            return await this.userManager.GetUserAsync(HttpContext.User);
        }

        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            if (signInManager.IsSignedIn(HttpContext.User))
                return RedirectToAction("Dashboard", "Admin");

            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result = await signInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, lockoutOnFailure: false);

            
            if(result == Microsoft.AspNetCore.Identity.SignInResult.Success)
                return RedirectToLocal(returnUrl);
            else if (result == Microsoft.AspNetCore.Identity.SignInResult.LockedOut)
                return View("Lockout");
            else if(result == Microsoft.AspNetCore.Identity.SignInResult.Failed)
            {
                ModelState.AddModelError("", "Invalid login attempt.");
                return View(model);
            }
            return View(model);
        }

        //
        // GET: /Account/VerifyCode
        //[AllowAnonymous]
        //public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        //{
        //    // Require that the user has already logged in via username/password or external login
        //    if (!await signInManager.HasBeenVerifiedAsync())
        //    {
        //        return View("Error");
        //    }
        //    return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        //}

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes. 
            // If a user enters incorrect codes for a specified amount of time then the user account 
            // will be locked out for a specified amount of time. 
            // You can configure the account lockout settings in IdentityConfig
            var result = await signInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent: model.RememberMe, rememberClient: model.RememberBrowser);

            if (result == Microsoft.AspNetCore.Identity.SignInResult.Success)
                return RedirectToLocal(model.ReturnUrl);
            else if (result == Microsoft.AspNetCore.Identity.SignInResult.LockedOut)
                return View("Lockout");
            else if (result == Microsoft.AspNetCore.Identity.SignInResult.Failed)
            {
                ModelState.AddModelError("", "Invalid Code.");
                return View(model);
            }
            return View(model);
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.UserName, FirstName = model.FirstName, LastName = model.LastName, Email = model.Email };
                var result = await userManager.CreateAsync(user, model.Password);
                
                if (result.Succeeded)
                {
                    result = await userManager.AddToRoleAsync(user, "admin");
                    await signInManager.SignInAsync(user, isPersistent: false);

                    // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                    // Send an email with this link
                    // string code = await userManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    // var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    // await userManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

                    return RedirectToAction("Index", "Home");
                }
                AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpGet]
        [Authorize]
        [Route("Account/Profile")]
        public async Task<ActionResult> GetProfile()
        {
            var user = await this.userManager.GetUserAsync(User);

            if (user != null)
            {
                var uvm = new UpdateViewModel();

                uvm.Email = user.Email;
                uvm.FirstName = user.FirstName;
                uvm.LastName = user.LastName;
                uvm.PhoneNumber = user.PhoneNumber;
                return View(uvm);
            }

            return View();
        }

        [HttpPost]
        [Authorize]
        [Route("Account/Profile")]
        public async Task<ActionResult> UpdateUser(UpdateViewModel createUserModel)
        {
            string message = "";

            //if (string.IsNullOrEmpty(createUserModel.Password))
            //{
            //    message = "Please enter your current password";
            //}

            //if (!ModelState.IsValid)
            //{
            //    message = "Invalid login attempt";
            //}

            var user = await this.userManager.FindByIdAsync(createUserModel.Id);

            if (user == null)
            {
                message = "Unauthorized";
            }

            var isValidPwd = await userManager.CheckPasswordAsync(user, createUserModel.Password);

            if (isValidPwd)
            {

                user.FirstName = createUserModel.FirstName;
                user.LastName = createUserModel.LastName;
                user.Email = createUserModel.Email;
                user.PhoneNumber = createUserModel.PhoneNumber;
                //user.PasswordHash = string.IsNullOrEmpty(createUserModel.Password) ? user.PasswordHash : this.userManager.PasswordHasher.HashPassword(createUserModel.Password);

                var result = await this.userManager.UpdateAsync(user);

                if (result.Succeeded)
                    message = "User details updated successfully";

                ViewBag.MsgType = result.Succeeded ? "success" : "error";
                ViewBag.Msg = message;
            }
            else
            {
                ViewBag.MsgType = "error";
                ViewBag.Msg = "Incorrect Current Password";
            }

            //Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));
            //return Created(locationHeader, this.ModelFactory.Create(user));
            return View("GetProfile");
        }

        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string email, string code)
        {
            if (email == null || code == null)
            {
                return View("Error");
            }

            var user = await userManager.FindByEmailAsync(email);

            var result = await userManager.ConfirmEmailAsync(user, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                if (user == null /*|| !(await userManager.IsEmailConfirmedAsync(user.Id))*/)
                {
                    ModelState.AddModelError("", "User does not exist for this email");
                    return View(model);
                }

                // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                // Send an email with this link
                string code = await userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: Request.Scheme);

                //EmailHelper.SendEmail("Attic Group: Password Recovery", "Reset password with this link <a href=\"" + callbackUrl + "\">here</a>", user.Email, null, "", "", true);
                //await userManager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + callbackUrl + "\">here</a>");
                return RedirectToAction("ForgotPasswordConfirmation", "Account");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                ModelState.AddModelError("", "User does not exist for this email");
                return View(model);
                //return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("Account/LogOff")]
        public async Task<ActionResult> LogOff()
        {
            await signInManager.SignOutAsync();
            return RedirectToAction("Login", "Account");
        }


        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description.ToString());
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            if(User.IsInRole("admin"))
                return RedirectToAction("Index", "Admin");
            else
                return RedirectToAction("Index", "Home");
        }

        #endregion
    }
}