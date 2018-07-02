using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular6DotnetCore.Models.ViewModels;
using angular6DotnetCore.Models;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace angular6DotnetCore.Controllers
{
    [Route("api/[controller]")]

    public class AccountController : Controller
    {
        public AccountController()
        {
        }
        [HttpPost("getLoginInfo")]
        public IActionResult GetLoginInfo()
        {
            return Ok();
        }

    }
}