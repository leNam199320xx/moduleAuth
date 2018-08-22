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
            return Ok(await _context.Socials.Select(m => new
            {
                m.Id,
                m.Name
            }).ToListAsync());
        }
        [HttpGet("getSocialsWithPeoples")]
        public async Task<IActionResult> GetSocialsWidthPeoples()
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel
            {
                IsSignedIn = isSignedIn
            };
            var peoples = await _context.PeopleSocials.ToListAsync();
            var careers = await _context.Careers.ToListAsync();
            var socials = await _context.Socials.Select(m => new
            {
                m.Id,
                m.Name
            }).ToListAsync();
            return Ok(socials.Select(m => new
            {
                m.Id,
                m.Name,
                careers = GetPeopleBySocialId(m.Id, careers, peoples)
            }).ToList());
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
        public async Task<IActionResult> GetPeoples([FromQuery] int socialId)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var careers = await _context.Careers.ToListAsync();
            var peoples = await _context.PeopleSocials.ToListAsync();
            var message = new MessageModel
            {
                IsSignedIn = isSignedIn,
                Results = GetFullPeople(careers, peoples)
            };
            return Ok(message);
        }

        public List<object> GetFullPeople(List<Career> careers, List<PeopleSocials> peoples)
        {
            List<object> listData = new List<object>();
            List<PeopleSocials> peopleSocials = peoples.ToList();

            careers.ForEach(e =>
            {
                object career = new object();
                var listPeople = _context.Peoples.Where(p => p.CareerId == e.Id).Select(m => new
                {
                    m.Id,
                    //m.Index,
                    m.Avatar,
                    m.FullName,
                    m.ShortName,
                    m.ImagesUrl,
                    m.Url,
                    //m.CreatedDate,
                    //m.UpdatedDate,
                    //m.Message,
                    //m.Enabled,
                    socials = peopleSocials.Where(x => x.PeopleId == m.Id).Select(n => new
                    {
                        n.Id,
                        n.SocialId,
                        n.PeopleId,
                        n.Like,
                        n.Share,
                        n.Follow
                    })
                }).ToListAsync().Result;
                career = new
                {
                    id = e.Id,
                    name = e.Name,
                    peoples = listPeople
                };
                if (listPeople != null && listPeople.Count > 0)
                {
                    listData.Add(career);
                }
            });
            return listData;
        }

        public List<object> GetPeopleBySocialId(int socialId, List<Career> careers, List<PeopleSocials> peoples)
        {
            List<object> listData = new List<object>();
            List<PeopleSocials> peopleSocials = peoples.Where(m => m.SocialId == socialId).ToList();
            careers.ForEach(e =>
            {
                object career = new object();
                var listPeople = _context.Peoples.Where(p => p.CareerId == e.Id).Select(m => new
                {
                    m.Id,
                    //m.Index,
                    m.Avatar,
                    m.FullName,
                    m.ShortName,
                    m.ImagesUrl,
                    m.Url,
                    //m.CreatedDate,
                    //m.UpdatedDate,
                    //m.Message,
                    //m.Enabled,
                    socials = peopleSocials.Where(x => x.PeopleId == m.Id && x.SocialId == socialId).Select(n => new
                    {
                        n.Id,
                        n.SocialId,
                        n.PeopleId,
                        n.Like,
                        n.Share,
                        n.Follow
                    })
                }).ToListAsync().Result;
                career = new
                {
                    id = e.Id,
                    name = e.Name,
                    peoples = listPeople.Where(m => m.socials.Count() > 0)
                };
                if (listPeople != null && listPeople.Count > 0)
                {
                    listData.Add(career);
                }
            });
            return listData;
        }

        [HttpGet("GetSocialsByPeopleId")]
        public async Task<IActionResult> GetSocialsByPeopleId([FromQuery] int peopleId)
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
                    var results = await _context.PeopleSocials.Where(m => m.PeopleId == peopleId).Select(n => new
                    {
                        socialName = n.Social.Name,
                        socialId = n.SocialId,
                        share = n.Share,
                        like = n.Like,
                        follow = n.Follow,
                        index = n.Index,
                        view = n.View,
                        url = n.Url,
                        id = n.Id
                    }).ToListAsync();
                    return Ok(results);
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

        [HttpPost("GetDataFromFacebook")]
        public async Task<IActionResult> GetDataFromFacebook([FromBody] PeopleSocials p)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel
            {
                IsSignedIn = isSignedIn
            };
            InfoPeople info = new InfoPeople();
            if (isSignedIn)
            {
                try
                {
                    var px = info.GetInfo(DateTime.Now.Ticks.ToString(), p.Url);
                    var pupdate = await _context.PeopleSocials.FindAsync(p.Id);
                    pupdate.Like = px.Like;
                    pupdate.Follow = px.Follow;
                    _context.Entry(pupdate).State = EntityState.Modified;
                    var num = await _context.SaveChangesAsync();
                    if (num > 0)
                    {
                        return Ok(new
                        {
                            like = px.Like,
                            follow = px.Follow
                        });
                    }
                    message.Succeeded = false;
                    message.Message = "Data or Url is invalid";
                    return BadRequest(message);
                }
                catch (Exception ex)
                {
                    message.Message += ex.Message;
                    return BadRequest(message);
                }
            }
            else
            {
                message.Message += "you need login to excute this function";
                return BadRequest(message);
            }
        }

        [HttpPost("SaveSocialForPeople")]
        public async Task<IActionResult> SaveSocialForPeople([FromBody] PeopleSocials psocial)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel
            {
                IsSignedIn = isSignedIn
            };
            if (isSignedIn)
            {
                var item = await _context.PeopleSocials.FindAsync(psocial.Id);
                if (item != null)
                {
                    item.UpdatedDate = DateTime.Now;
                    item.PeopleId = psocial.PeopleId;
                    item.SocialId = psocial.SocialId;
                    item.Share = psocial.Share;
                    item.Like = psocial.Like;
                    item.Follow = psocial.Follow;
                    item.Index = psocial.Index;
                    item.View = psocial.View;
                    item.Url = psocial.Url;
                    _context.Entry(item).State = EntityState.Modified;
                }
                else
                {
                    psocial.CreatedDate = DateTime.Now;
                    _context.PeopleSocials.Add(psocial);
                }
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