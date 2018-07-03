using angular6DotnetCore.Areas.Identity.Pages.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using static angular6DotnetCore.Areas.Identity.Pages.Account.LoginModel;
using System.Web;
using System;
using System.Security.Claims;
using System.Threading;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.Text.Encodings.Web;

namespace angular6DotnetCore.Controllers
{
    [Route("api/[controller]")]

    public class AccountController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<LoginModel> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IEmailSender _emailSender;
        public AccountController(
            SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager,
            ILogger<LoginModel> logger, IEmailSender emailSender)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
            _emailSender = emailSender;
        }
        [HttpPost("checkLogin")]
        public IActionResult checkLogin()
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var email = _userManager.GetUserName(User);
            return Ok(new
            {
                isSignedIn,
                email
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] angular6DotnetCore.Areas.Identity.Pages.Account.RegisterModel.InputModel account)
        {

            if (ModelState.IsValid)
            {
                var user = new IdentityUser { UserName = account.Email, Email = account.Email };
                var result = await _userManager.CreateAsync(user, account.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password.");

                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var callbackUrl = Url.Page(
                        "/Account/ConfirmEmail",
                        pageHandler: null,
                        values: new { userId = user.Id, code = code },
                        protocol: Request.Scheme);

                    await _emailSender.SendEmailAsync(account.Email, "Confirm your email",
                        $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                    // await _signInManager.SignInAsync(user, isPersistent: false);
                    return Ok(new
                    {
                        message = "Register Succeeded!"
                    });
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }
            // If we got this far, something failed, redisplay form
            return BadRequest(new
            {
                message = ModelState.Values
            });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(
                new
                {
                    isSignedIn = false
                });
        }

        [HttpPost("login")]
        public async Task<object> Login([FromBody] angular6DotnetCore.Areas.Identity.Pages.Account.LoginModel.InputModel account)
        {
            //returnUrl = returnUrl ?? Url.Content("~/");

            var user = _userManager.GetUserName(User);

            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(account.Email, account.Password, account.RememberMe, lockoutOnFailure: true);

                if (result.Succeeded)
                {
                    _logger.LogInformation("User logged in.");
                    return Ok(new
                    {
                        returnUrl = account.ReturnUrl,
                        isSignedIn = result.Succeeded,
                        email = account.Email,
                        message = "User logged in."
                    });
                }
            }

            return Ok(new
            {
                isSignedIn = false,
                message = "login fail"
            });
        }

    }
}