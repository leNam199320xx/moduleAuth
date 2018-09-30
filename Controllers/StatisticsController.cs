using angular6DotnetCore.Logic;
using angular6DotnetCore.Models;
using angular6DotnetCore.Models.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Pages.Account.Internal;
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
            Console.WriteLine("statistic started");
        }
        public async Task<bool> CrawlerExcute()
        {
            Console.WriteLine("get full socials info");
            InfoPeople infoPeople = new InfoPeople();
            return await infoPeople.CrawlFull(_context);
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
        [HttpGet("getFullSocials")]
        public async Task<IActionResult> GetFullSocials()
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel();
            message.IsSignedIn = isSignedIn;
            return Ok(await _context.Socials.AsNoTracking().Select(m => new Social
            {
                Id = m.Id,
                Index = m.Index,
                Name = m.Name,
                UpdatedDate = m.UpdatedDate,
                CreatedDate = m.CreatedDate,
                Enabled = m.Enabled
            }).OrderBy(m => m.Index).ToListAsync());
        }

        [HttpGet("getSocials")]
        public async Task<IActionResult> GetSocials()
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel();
            message.IsSignedIn = isSignedIn;
            return Ok(await _context.Socials.AsNoTracking().OrderBy(m => m.Index).Select(m => new
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
            List<PeopleSocialsTotal> peopleSocials = await _context.PeopleSocials.AsNoTracking().Select(
                m => new PeopleSocialsTotal
                {
                    Id = m.Id,
                    PeopleId = m.PeopleId,
                    SocialId = m.SocialId,
                    Share = m.Share,
                    View = m.View,
                    Like = m.Like,
                    Follow = m.Follow,
                    Total = m.Like ?? 0 + m.Share ?? 0 + m.View ?? 0 + m.Follow ?? 0
                }).OrderByDescending(m => m.Total).ToListAsync();
            List<Career> careers = await _context.Careers.OrderBy(m => m.Index).AsNoTracking().Select(m => new Career
            {
                Id = m.Id,
                Name = m.Name,
                Index = m.Index
            }).ToListAsync();
            var socials = await _context.Socials.OrderBy(m => m.Index).AsNoTracking().Select(m => new Social
            {
                Id = m.Id,
                Name = m.Name,
                Index = m.Index
            }).ToListAsync();
            var peoples = await _context.Peoples.Select(m => new People
            {
                Id = m.Id,
                Index = m.Index,
                FullName = m.FullName,
                ShortName = m.ShortName,
                Avatar = m.Avatar,
                ImagesUrl = m.ImagesUrl,
                Url = m.Url,
                Message = m.Message,
                CountryCode = m.CountryCode,
                CareerId = m.CareerId
            }).OrderBy(m => m.CountryCode).ThenBy(m => m.CareerId).ToListAsync();
            return Ok(socials.Select(m => new
            {
                m.Id,
                m.Name,
                m.Index,
                careers = GetPeopleBySocialId(m.Id, careers, peopleSocials, peoples)
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
                return Ok(await _context.Careers.AsNoTracking().OrderBy(m => m.Index).ToListAsync());
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
            var careers = await _context.Careers.AsNoTracking().OrderBy(m => m.Index).Select(
                m => new Career
                {
                    Id = m.Id,
                    Index = m.Index,
                    Name = m.Name
                }
                ).ToListAsync();
            List<PeopleSocialsTotal> peopleSocials = await _context.PeopleSocials.AsNoTracking().Select(
                m => new PeopleSocialsTotal
                {
                    Id = m.Id,
                    PeopleId = m.PeopleId,
                    SocialId = m.SocialId,
                    Share = m.Share,
                    View = m.View,
                    Like = m.Like,
                    Follow = m.Follow,
                    Total = m.Like ?? 0 + m.Share ?? 0 + m.View ?? 0 + m.Follow ?? 0
                }).OrderByDescending(m => m.Total).ToListAsync();
            //var peoples = await _context.PeopleSocials.AsNoTracking().OrderBy(m => m.Index)
            //    .ThenByDescending(m => new
            //    {
            //        Total = m.Like + m.Share + m.View + m.Follow,
            //        m.Like,
            //        m.Share,
            //        m.View,
            //        m.Follow,
            //        m.Index,
            //        m.Id
            //    })
            //    .ToListAsync();
            var peoples = await _context.Peoples.AsNoTracking().Select(m => new People
            {
                Id = m.Id,
                Index = m.Index,
                FullName = m.FullName,
                ShortName = m.ShortName,
                Avatar = m.Avatar,
                ImagesUrl = m.ImagesUrl,
                Url = m.Url,
                Message = m.Message,
                CountryCode = m.CountryCode,
                CareerId = m.CareerId
            }).ToListAsync();
            var message = new MessageModel
            {
                IsSignedIn = isSignedIn,
                Results = GetFullPeople(careers, peopleSocials, peoples)
            };
            return Ok(message);
        }

        public List<object> GetFullPeople(List<Career> careers, List<PeopleSocialsTotal> peopleSocials, List<People> peoples)
        {
            List<object> listData = new List<object>();
            List<PeopleSocialsTotal> peopleSocialsTotal = peopleSocials.ToList();
            careers.ForEach(e =>
            {
                object career = new object();
                var resultPeoples = peoples.Where(m => m.CareerId == e.Id).Select(m => new
                {
                    m.Id,
                    m.Index,
                    m.Avatar,
                    m.FullName,
                    m.ShortName,
                    m.ImagesUrl,
                    m.Url,
                    socials = peopleSocialsTotal.Where(x => x.PeopleId == m.Id).Select(n => new
                    {
                        n.Id,
                        n.SocialId,
                        n.PeopleId,
                        n.Like,
                        n.Share,
                        n.Follow,
                        n.View,
                        n.Total
                    }).OrderByDescending(t => t.Total)
                }).ToList();

                career = new
                {
                    id = e.Id,
                    name = e.Name,
                    peoples = resultPeoples.Where(m => m.socials.Count() > 0)
                };

                if (resultPeoples != null && resultPeoples.Count > 0)
                {
                    listData.Add(career);
                }
            });
            return listData;
        }

        public List<object> GetPeopleBySocialId(int socialId, List<Career> careers, List<PeopleSocialsTotal> peopleSocials, List<People> peoples)
        {
            List<object> listData = new List<object>();
            List<PeopleSocialsTotal> peopleSocialsTotal = peopleSocials.Where(m => m.SocialId == socialId).ToList();
            careers.ForEach(e =>
            {
                object career = new object();
                var resultPeoples = peoples.Where(m => m.CareerId == e.Id).Select(m => new
                {
                    m.Id,
                    m.Index,
                    m.Avatar,
                    m.FullName,
                    m.ShortName,
                    m.ImagesUrl,
                    m.Url,
                    socials = peopleSocialsTotal.Where(x => x.PeopleId == m.Id).Select(n => new
                    {
                        n.Id,
                        n.SocialId,
                        n.PeopleId,
                        n.Like,
                        n.Share,
                        n.Follow,
                        n.View,
                        n.Total
                    }).OrderByDescending(t => t.Total)
                }).ToList();

                career = new
                {
                    id = e.Id,
                    name = e.Name,
                    peoples = resultPeoples.Where(m => m.socials.Count() > 0)
                };

                if (resultPeoples != null && resultPeoples.Count > 0)
                {
                    listData.Add(career);
                }
            });
            return listData;
        }

        public long setTotal(PeopleSocials n)
        {
            long like = n.Like ?? 0;
            long follow = n.Follow ?? 0;
            long view = n.View ?? 0;
            long share = n.Share ?? 0;
            return like + share + follow + view;
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
                    var results = await _context.PeopleSocials.AsNoTracking().Where(m => m.PeopleId == peopleId).Select(n => new
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
                    //var px = info.GetInfo(DateTime.Now.Ticks.ToString(), p.Url);
                    //var pupdate = await _context.PeopleSocials.FindAsync(p.Id);
                    //pupdate.Like = px.Like;
                    //pupdate.Follow = px.Follow;
                    //pupdate.View = px.View;
                    //pupdate.Share = px.Share;
                    //_context.Entry(pupdate).State = EntityState.Modified;
                    //var num = await _context.SaveChangesAsync();
                    var item = await info.UpdateUser(_context, p);
                    if (item != null)
                    {
                        return Ok(new
                        {
                            like = item.Like,
                            view = item.View,
                            share = item.Share,
                            follow = item.Follow
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

        [HttpPost("updateSocial")]
        public async Task<IActionResult> UpdateSocial([FromBody] Social social)
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
                    var updatedSocial = await _context.Socials.FindAsync(social.Id);
                    updatedSocial.Name = social.Name;
                    updatedSocial.Index = social.Index;
                    updatedSocial.Enabled = social.Enabled;
                    updatedSocial.UpdatedDate = DateTime.Now;
                    _context.Entry(updatedSocial).State = EntityState.Modified;
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

        [HttpPost("deleteSocialOfPeople")]
        public async Task<IActionResult> DeleteSocialOfPeople([FromBody]PeopleSocials peopleSocials)
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
                    peopleSocials = await _context.PeopleSocials.FindAsync(peopleSocials.Id);
                    _context.Entry(peopleSocials).State = EntityState.Deleted;
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

        [HttpPost("runCrawler")]
        public async Task<IActionResult> RunCrawler()
        {
            return Ok(new
            {
                value = await CrawlerExcute()
            });
        }

        [HttpGet("getAllSocialInfoByPeopleId")]
        public async Task<IActionResult> GetAllSocialInfoByPeopleId([FromQuery]int peopleId)
        {
            var socials = await _context.PeopleSocials.Where(m => m.PeopleId == peopleId).Select(m => m.Id).ToListAsync();
            var socValues = await _context.PeopleSocialsByDates.Where(m => socials.Contains(m.PeopleSocialsId)).Select(m => new PeopleSocialsByDate
            {
                Id = m.Id,
                Like = m.Like,
                Share = m.Share,
                View = m.View,
                Follow = m.Follow,
                CreatedDate = m.CreatedDate,
                PeopleSocialsId = m.PeopleSocialsId
            }).OrderByDescending(m => m.CreatedDate).ToListAsync();
            List<PeopleSocials> results = new List<PeopleSocials>();
            for (var i = 0; i < socials.Count; i++)
            {
                var soc = new PeopleSocials
                {
                    Id = socials[i]
                };
                var values = new List<PeopleSocialsByDate>();
                for (var j = 0; j < socValues.Count; j++)
                {
                    if (socValues[j].PeopleSocialsId == socials[i])
                    {
                        values.Add(new PeopleSocialsByDate
                        {
                            Id = socValues[j].Id,
                            Like = socValues[j].Like,
                            Share = socValues[j].Share,
                            View = socValues[j].View,
                            Follow = socValues[j].Follow,
                            CreatedDate = socValues[j].CreatedDate
                        });
                    }
                }
                soc.PeopleSocialsByDates = values;
                results.Add(soc);
            }
            return Ok(results);
        }
    }
}