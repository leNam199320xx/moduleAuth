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
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace angular6DotnetCore.Controllers
{
    [Route("api/[controller]")]

    public class AdminController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<LoginModel> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly UserDbContext _context;
        private IHostingEnvironment _hostingEnvironment;
        public AdminController(
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


        [HttpGet("getCategories")]
        public IActionResult GetCategories(string category)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel();
            message.IsSignedIn = isSignedIn;
            if (isSignedIn)
            {

                var types = category != null
                    ? _context.Types.Where(m => m.Class == category).ToList()
                    : _context.Types.ToList();
                message.Results = types;
                message.Message = "get categories succeeded";

                return Ok(message);
            }
            else
            {
                message.Message = "get categories failed";
                return BadRequest(message);
            }
        }


        [HttpGet("getCategory")]
        public IActionResult GetCategory(string Id)
        {
            return Ok();
        }

        [HttpPost("saveCategory")]
        public async Task<IActionResult> SaveCategory([FromBody]Models.Type category)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel();
            message.IsSignedIn = isSignedIn;
            if (!isSignedIn)
            {
                message.Message = "you need login to continue";
                return BadRequest(message);
            }
            category.CreatedDate = category.CreatedDate != null ? category.CreatedDate : DateTime.Now;
            category.Class = category.Class != null ? category.Class : "Category";
            category.Activated = category.Activated == false ? false : true;
            if (category.Activated)
            {
                category.ActivatedDate = category.ActivatedDate != null ? category.ActivatedDate : DateTime.Now;
            }

            if (ModelState.IsValid)
            {

                try
                {
                    var cateOld = await _context.Types.FindAsync(category.Id);
                    if (cateOld != null)
                    {
                        cateOld.ImageUrl = category.ImageUrl;
                        cateOld.Name = category.Name;
                        cateOld.ThumbUrl = category.ThumbUrl;
                        cateOld.TopIndex = category.TopIndex;
                        cateOld.UploadedDate = DateTime.Now;
                        cateOld.TypeParentId = category.TypeParentId;
                        cateOld.Url = category.Url;
                        cateOld.Activated = category.Activated;
                        cateOld.ActivatedDate = category.ActivatedDate;
                        cateOld.Class = category.Class;
                        _context.Entry(cateOld).State = EntityState.Modified;
                    }
                    else
                    {
                        _context.Types.Add(category);
                    }
                    var saveResult = await _context.SaveChangesAsync();
                    if (saveResult > 0)
                    {
                        message.Message = "save this category succeeded";
                        return Ok(message);
                    }
                    else
                    {
                        message.Message = "save this category failed";
                        return BadRequest(message);
                    }
                }
                catch (Exception ex)
                {
                    message.Message = "save this category failed, " + ex.Message;
                    return BadRequest(message);
                }
            }
            else
            {
                message.Message = "get categories failed";
                return BadRequest(message);

            }
        }

        [HttpPost("blockCategory")]
        public async Task<IActionResult> BlockCategory([FromBody]int id)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel();
            message.IsSignedIn = isSignedIn;
            if (!isSignedIn)
            {
                message.Message = "you need login to continue";
                return BadRequest(message);
            }
            var category = await _context.Types.FindAsync(id);
            category.Activated = false;
            category.UploadedDate = DateTime.Now;
            _context.Entry(category).State = EntityState.Modified;
            var saveResult = await _context.SaveChangesAsync();
            if (saveResult > 0)
            {
                message.Message = "save this category succeeded";
                return Ok(message);
            }
            else
            {
                message.Message = "save this category failed";
                return BadRequest(message);
            }
        }

        [HttpPost("deleteCategory")]
        public async Task<IActionResult> DeleteCategory([FromBody]int id)
        {
            var isSignedIn = _signInManager.IsSignedIn(User);
            var message = new MessageModel();
            message.IsSignedIn = isSignedIn;
            if (!isSignedIn)
            {
                message.Message = "you need login to continue";
                return BadRequest(message);
            }
            var category = await _context.Types.FindAsync(id);
            _context.Types.Remove(category);
            var saveResult = await _context.SaveChangesAsync();
            if (saveResult > 0)
            {
                message.Message = "delete this category succeeded " + saveResult;
                return Ok(message);
            }
            else
            {
                message.Message = "delete this category failed " + saveResult;
                return BadRequest(message);
            }
        }


        [HttpPost("UploadFiles")]
        public async Task<IActionResult> UploadFiles()
        {
            var files = Request.Form.Files;
            long size = files.Sum(f => f.Length);
            // full path to file in temp location
            //var filePath = Path.GetTempFileName();

            string folderName = "UploadTemp";
            string webRootPath = _hostingEnvironment.WebRootPath;
            string newPath = Path.Combine(webRootPath, folderName);
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }

            foreach (var formFile in files)
            {

                if (formFile.Length > 0)
                {
                    using (var stream = new FileStream(newPath + "\\" + formFile.FileName, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }

            // process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new { count = files.Count, size, newPath });
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
    }
}