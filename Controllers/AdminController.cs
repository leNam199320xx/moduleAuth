using angular6DotnetCore.Areas.Identity.Pages.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace angular6DotnetCore.Controllers
{
    [Route("api/[controller]")]

    public class AdminController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<LoginModel> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IEmailSender _emailSender;
        public AdminController(
            SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager,
            ILogger<LoginModel> logger, IEmailSender emailSender)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
            _emailSender = emailSender;
        }
        [HttpGet("getCurrencyUnit")]
        public IActionResult GetCurrencyUnit()
        {
            return Ok();
        }
        [HttpPost("saveCurrencyUnit")]
        public IActionResult SaveCurrencyUnit()
        {
            return Ok();
        }
    }
}