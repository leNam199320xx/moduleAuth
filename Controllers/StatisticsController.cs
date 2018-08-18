using angular6DotnetCore.Areas.Identity.Pages.Account;
using angular6DotnetCore.Logic;
using angular6DotnetCore.Models;
using angular6DotnetCore.Models.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace angular6DotnetCore.Controllers
{
    [Route("api/[controller]")]

    public class StatisticsController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<LoginModel> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly UserDbContext _context;
        private IHostingEnvironment _hostingEnvironment;
        public StatisticsController(
            SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager,
            ILogger<LoginModel> logger,
            IEmailSender emailSender,
            UserDbContext context,
            IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
            _emailSender = emailSender;
            _hostingEnvironment = hostingEnvironment;

        }

        [HttpPost("GetDataOnePeople")]
        public IActionResult GetDataOnePeople()
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            if (isSignedIn)
            {
                //_context.Peoples.ToList().ForEach(p =>
                //{
                //    p.
                //    var info = new InfoPeople();
                //    info.GetInfo(user, "");
                //});
            }
            return Ok(new { res = "get Ok!" });
        }

        [HttpPost("SaveSocialToPeople")]
        public async Task<IActionResult> SaveSocialToPeople([FromBody] PeopleSocials social)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel
            {
                IsSignedIn = isSignedIn
            };
            if (isSignedIn)
            {
                _context.PeopleSocials.Add(social);
                await _context.SaveChangesAsync();
                message.Message = "Success!";
                return Ok(message);
            }
            else
            {
                message.Message += "you need login to excute this function";
                return BadRequest(message);
            }
        }

        public async Task<IActionResult> SaveUpdatedSocial([FromBody] PeopleSocials social)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel();
            message.IsSignedIn = isSignedIn;
            if (isSignedIn)
            {
                _context.Entry(social).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                message.Message = "Success!";
                return Ok(message);
            }
            else
            {
                message.Message += "you need login to excute this function";
                return BadRequest(message);
            }
        }

        [HttpGet("getSocials")]
        public async Task<IActionResult> GetSocials()
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel();
            message.IsSignedIn = isSignedIn;
            if (isSignedIn)
            {
                return Ok(await _context.Socials.ToListAsync());
            }
            else
            {
                message.Message += "you need login to excute this function";
                return BadRequest(message);
            }
        }

        [HttpGet("getCareers")]
        public async Task<IActionResult> GetCareers()
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel();
            message.IsSignedIn = isSignedIn;
            if (isSignedIn)
            {
                return Ok(await _context.Careers.ToListAsync());
            }
            else
            {
                message.Message += "you need login to excute this function";
                return BadRequest(message);
            }
        }

        [HttpGet("getPeoples")]
        public async Task<IActionResult> GetPeoples()
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel();
            message.IsSignedIn = isSignedIn;
            List<object> listData = new List<object>();
            //if (isSignedIn)
            //{
                var careers = await _context.Careers.ToListAsync();
                careers.ForEach(e =>
                {
                    object data = new object();
                    var listPeople = _context.Peoples.Where(p => p.CareerId == e.Id).Select(m => new People
                    {
                        Id = m.Id,
                        Index = m.Index,
                        Avatar = m.Avatar,
                        FullName = m.FullName,
                        ShortName = m.ShortName,
                        ImagesUrl = m.ImagesUrl,
                        Url = m.Url,
                        CreatedDate = m.CreatedDate,
                        UpdatedDate = m.UpdatedDate,
                        Message = m.Message,
                        Enabled = m.Enabled
                    }).ToListAsync().Result;
                    data = new
                    {
                        id = e.Id,
                        name = e.Name,
                        data = listPeople
                    };
                    listData.Add(data);
                });
                message.Results = listData;
                return Ok(message);
            //}
            //else
            //{
            //    message.Message += "you need login to excute this function";
            //    return BadRequest(message);
            //}
        }

        [HttpPost("saveSocial")]
        public async Task<IActionResult> SaveSocial([FromBody] Social social)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel
            {
                IsSignedIn = isSignedIn
            };
            if (isSignedIn)
            {
                try
                {
                    social.CreatedDate = DateTime.Now;
                    await _context.Socials.AddAsync(social);
                    await _context.SaveChangesAsync();
                    return Ok(message);
                }
                catch (Exception ex)
                {
                    message.Message += " " + ex.Message;
                    return BadRequest(message);
                }
            }
            else
            {
                message.Message += "you need login to excute this function";
                return BadRequest(message);
            }
        }

        [HttpPost("saveCareer")]
        public async Task<IActionResult> SaveCareer([FromBody] Career career)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel
            {
                IsSignedIn = isSignedIn
            };
            if (isSignedIn)
            {
                try
                {
                    career.CreatedDate = DateTime.Now;
                    await _context.Careers.AddAsync(career);
                    await _context.SaveChangesAsync();
                    return Ok(message);
                }
                catch (Exception ex)
                {
                    message.Message += " " + ex.Message;
                    return BadRequest(message);
                }
            }
            else
            {
                message.Message += "you need login to excute this function";
                return BadRequest(message);
            }
        }

        [HttpPost("savePeople")]
        public async Task<IActionResult> SavePeople([FromBody] People people)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel
            {
                IsSignedIn = isSignedIn
            };
            if (isSignedIn)
            {
                try
                {
                    people.CreatedDate = DateTime.Now;
                    await _context.Peoples.AddAsync(people);
                    int value = await _context.SaveChangesAsync();
                    message.Succeeded = value > 0;
                    return Ok(message);
                }
                catch (Exception ex)
                {
                    message.Message += " " + ex.Message;
                    return BadRequest(message);
                }
            }
            else
            {
                message.Message += "you need login to excute this function";
                return BadRequest(message);
            }
        }

        [HttpPost("saveUpdatedPeople")]
        public async Task<IActionResult> SaveUpdatedPeople([FromBody] People people)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel
            {
                IsSignedIn = isSignedIn
            };
            if (isSignedIn)
            {
                try
                {
                    people.UpdatedDate = DateTime.Now;
                    _context.Entry(people).State = EntityState.Modified;
                    int value = await _context.SaveChangesAsync();
                    message.Succeeded = value > 0;
                    return Ok(message);
                }
                catch (Exception ex)
                {
                    message.Message += " " + ex.Message;
                    return BadRequest(message);
                }
            }
            else
            {
                message.Message += "you need login to excute this function";
                return BadRequest(message);
            }
        }
    }
}