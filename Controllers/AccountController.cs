using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular6DotnetCore.Models;
namespace angular6DotnetCore.Controllers
{
    [Route("api/account")]

    public class AccountController : Controller
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody]Account account)
        {
            var result = VerifyAccount(account);
            if (result.Pass)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.Code = 400);
            }
        }

        public MessageExt VerifyAccount(Account account)
        {
            MessageExt mes = new MessageExt();
            if (account == null)
            {
                throw new ArgumentNullException(nameof(account));
            }
            if (account.Password != account.ConfirmPassword)
            {
                mes.Pass = false;
                mes.Message += "Password or Confirm password invalid; ";
            }

            if (account.Username == null || account.Username == "")
            {
                mes.Pass = false;
                mes.Message += "Username invalid; ";
            }
            return mes;
        }
    }
}