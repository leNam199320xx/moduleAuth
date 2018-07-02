using angular6DotnetCore.Areas.Identity.Pages.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using static angular6DotnetCore.Areas.Identity.Pages.Account.LoginModel;

namespace angular6DotnetCore.Controllers
{
    [Route("api/[controller]")]

    public class AccountController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<LoginModel> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        public AccountController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, ILogger<LoginModel> logger)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
        }
        [HttpPost("getLoginInfo")]
        public IActionResult GetLoginInfo()
        {
            return Ok();
        }

        [HttpPost("register")]
        public IActionResult Register()
        {
            return Ok();
        }
        [HttpPost("login")]
        public async Task<object> Login([FromBody] InputModel account)
        {
            //returnUrl = returnUrl ?? Url.Content("~/");

            bool results = _signInManager.IsSignedIn(User);

            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(account.Email, account.Password, account.RememberMe, lockoutOnFailure: true);
                if (result.Succeeded)
                {
                    var user = await _userManager.GetUserAsync(User);
                    _logger.LogInformation("User logged in.");
                    return Ok(new
                    {
                        returnUrl = account.ReturnUrl,
                        succeeded = result.Succeeded,
                        email = account.Email,
                        message = "User logged in."
                    });
                }
                //if (result.RequiresTwoFactor)
                //{
                //    return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, RememberMe = account.RememberMe });
                //}
                //if (result.IsLockedOut)
                //{
                //    _logger.LogWarning("User account locked out.");
                //    return RedirectToPage("./Lockout");
                //}
                //else
                //{
                //    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                //    return Page();
                //}
            }

            // If we got this far, something failed, redisplay form
            //return Page();
            return Ok(new
            {
                succeeded = false,
                message = "login fail"
            });
        }

    }
}