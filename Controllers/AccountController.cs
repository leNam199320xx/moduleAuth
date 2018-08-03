using angular6DotnetCore.Areas.Identity.Pages.Account;
using System.Threading.Tasks;
using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using angular6DotnetCore.Models;

namespace angular6DotnetCore.Controllers
{
    [Route("api/[controller]")]

    public class AccountController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<LoginModel> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly IHostingEnvironment _env;
        //[BindProperty]
        public RegisterInputEmail Input { get; set; }
        [TempData]
        public string ErrorMessage { get; set; }

        public string LoginProvider { get; set; }

        public string ReturnUrl { get; set; }

        public System.Web.HttpUtility http { get; }

        public AccountController(
            IHostingEnvironment env,
            SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager,
            ILogger<LoginModel> logger, IEmailSender emailSender)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
            _emailSender = emailSender;
            _env = env;
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
        public async Task<IActionResult> Register([FromBody] RegisterInput account)
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
        public async Task<object> Login([FromBody] LoginInput account)
        {
            //returnUrl = returnUrl ?? Url.Content("~/");

            if (ModelState.IsValid)
            {
                var user = _userManager.GetUserName(User);

                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(account.Email, account.Password, account.RememberMe, lockoutOnFailure: true);

                if (result.Succeeded)
                {
                    _logger.LogInformation("User logged in.");
                    return Ok(new Models.ViewModels.MessageModel
                    {
                        ReturnUrl = account.ReturnUrl,
                        IsSignedIn = result.Succeeded,
                        Succeeded = result.Succeeded,
                        Email = account.Email,
                        Message = "User logged in."
                    });
                }
            }

            return BadRequest(new Models.ViewModels.MessageModel
            {
                ReturnUrl = account.ReturnUrl,
                Email = account.Email,
                Message = "login fail"
            });
        }

        [HttpGet("sociallogin")]
        public IActionResult LoginWithSocial([FromQuery]string Provider, [FromQuery]string ReturnUrl)
        {
            ReturnUrl = ReturnUrl ?? "";
            return new ChallengeResult(Provider, _signInManager.ConfigureExternalAuthenticationProperties(
                    Provider, CreateUrl("api/account/socialcallback", $"returnUrl={Uri.EscapeDataString(ReturnUrl)}")));
        }

        [HttpGet("socialcallback")]
        public async Task<IActionResult> SocialCallbackAsync(string returnUrl = null, string remoteError = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/login");
            if (remoteError != null)
            {
                ErrorMessage = $"Error from external provider: {remoteError}";
                return BadRequest(new Models.ViewModels.MessageModel
                {
                    Message = ErrorMessage,
                    ReturnUrl = returnUrl
                });
            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                ErrorMessage = "Error loading external login information.";
                return BadRequest(new Models.ViewModels.MessageModel
                {
                    Message = ErrorMessage,
                    ReturnUrl = returnUrl
                });
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
            if (result.Succeeded)
            {
                _logger.LogInformation("{Name} logged in with {LoginProvider} provider.", info.Principal.Identity.Name, info.LoginProvider);
                return BadRequest(new Models.ViewModels.MessageModel
                {
                    Message = info.Principal.Identity.Name + "logged in with" + info.LoginProvider,
                    ReturnUrl = returnUrl
                });
            }
            if (result.IsLockedOut)
            {
                return BadRequest(new Models.ViewModels.MessageModel
                {
                    Message = "logout",
                    ReturnUrl = returnUrl
                });
            }
            else
            {
                // If the user does not have an account, then ask the user to create an account.
                ReturnUrl = returnUrl;
                LoginProvider = info.LoginProvider;
                if (info.Principal.HasClaim(c => c.Type == ClaimTypes.Email))
                {
                    Input = new RegisterInputEmail
                    {
                        Email = info.Principal.FindFirstValue(ClaimTypes.Email)
                    };
                }
                return Ok(new Models.ViewModels.MessageModel
                {
                    IsSignedIn = true,
                    Succeeded = true,
                    Message = "login with facebook account",
                    ReturnUrl = returnUrl,
                    Email = Input.Email
                });
            }
        }
        [HttpPost("socialconfirm")]
        public async Task<IActionResult> SocialConfirmationAsync(string returnUrl = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");
            // Get the information about the user from the external login provider
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                ErrorMessage = "Error loading external login information during confirmation.";
                return RedirectToPage("./Login", new { ReturnUrl = returnUrl });
            }

            if (ModelState.IsValid)
            {
                var user = new IdentityUser { UserName = Input.Email, Email = Input.Email };
                var result = await _userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await _userManager.AddLoginAsync(user, info);
                    if (result.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        _logger.LogInformation("User created an account using {Name} provider.", info.LoginProvider);
                        return LocalRedirect(returnUrl);
                    }
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            LoginProvider = info.LoginProvider;
            ReturnUrl = returnUrl;
            return Ok(new
            {
                message = "confirm",
                returnUrl
            });
        }

        private string CreateUrl(string path, string query)
        {
            var uriBuilder = new UriBuilder
            {
                Scheme = Request.IsHttps ? Uri.UriSchemeHttps : Uri.UriSchemeHttp,
                Host = Request.Host.Host,
                Port = -1,
                Path = $"{Request.PathBase}/{path ?? string.Empty}",
                Query = query ?? string.Empty
            };

            if (_env.IsDevelopment())
            {
                uriBuilder.Port = Request.Host.Port ?? -1;
            }

            return uriBuilder.Uri.AbsoluteUri;
        }
    }
}