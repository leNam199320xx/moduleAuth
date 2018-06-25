using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AuthenLib.Lib;
using AuthenLib.Models;

namespace angular6DotnetCore.Controllers
{
    [Route("api/account")]

    public class AccountController : Controller
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody]Account account)
        {
            var result = Authen.VerifyAccount(account);
            if (result.Pass)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.Code = 400);
            }
        }

        [HttpPost("api/register")]
        public IActionResult Register([FromBody]Account account)
        {
            var result = Authen.VerifyAccount(account);
            if (result.Pass)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.Code = 400);
            }
        }

        [HttpPost("api/logout")]
        public IActionResult Logout([FromBody]Account account)
        {
            account.Logged = false;
            var result = Authen.VerifyAccount(account);
            if (result.Pass)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.Code = 400);
            }
        }

        [HttpPost("api/confirm")]
        public IActionResult Confirm([FromBody]Account account)
        {
            var result = Authen.VerifyAccount(account);
            if (result.Pass)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.Code = 400);
            }
        }
    }
}