using angular6DotnetCore.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace angular6DotnetCore.Logic
{
    public class InfoPeople
    {
        public PeopleSocials GetInfo(string code, string url)
        {
            if (url.ToLower().IndexOf(".facebook.") > -1)
            {
                return GetFacebookInfo(code, url);
            }
            else if (url.ToLower().IndexOf(".youtube.") > -1)
            {
                return GetYoutubeInfo(code, url);
            }
            else if (url.ToLower().IndexOf(".twitter.") > -1)
            {
                return GetYoutubeInfo(code, url);
            }
            else if (url.ToLower().IndexOf(".instagram.") > -1)
            {
                return GetInstagramInfo(code, url);
            }
            return null;
        }
        public PeopleSocials GetYoutubeInfo(string code, string url)
        {
            string pathString = @"logs\Yu_" + code + ".html";
            string pathPeople = url;

            var client = new WebClient();
            client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36");
            client.Headers.Add("cache-control", "max-age=0");
            client.Headers.Add("upgrade-insecure-requests", "1");
            var text = client.DownloadString(pathPeople);
            var inx = text.IndexOf("lượt xem");
            var inx2 = text.IndexOf("người đăng ký");
            int ?number1 = null;
            int ?number2 = null;
            if (inx > -1)
            {
                var result1 = text.Substring(inx - 50, 50).Split('"').Reverse().ToList();
                number1 = int.Parse(Regex.Replace(result1[6], "[^0-9]", ""));
            }

            if (inx2 > -1)
            {
                var result2 = text.Substring(inx2 - 50, 50).Split('"').Reverse().ToList();
                number2 = int.Parse(Regex.Replace(result2[6], "[^0-9]", ""));
            }
            string results = number1 + "-" + number2;
            File.WriteAllText(pathString, text);
            File.WriteAllText(pathString.Replace("html", "txt"), results);
            return new PeopleSocials
            {
                View = (number1),
                Follow = (number2),
            };
        }

        public PeopleSocials GetTwitterInfo(string code, string url)
        {
            string pathString = @"logs\tw_" + code + ".html";
            string pathPeople = url;

            var client = new WebClient();
            client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36");
            client.Headers.Add("cache-control", "max-age=0");
            client.Headers.Add("upgrade-insecure-requests", "1");
            var text = client.DownloadString(pathPeople);

            File.WriteAllText(pathString, text);
            var peNew = new PeopleSocials();
            return peNew;
        }
        public PeopleSocials GetInstagramInfo(string code, string url)
        {
            string pathString = @"logs\Ins_" + code + ".html";
            string pathPeople = url;

            var client = new WebClient();
            client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36");
            client.Headers.Add("cache-control", "max-age=0");
            client.Headers.Add("upgrade-insecure-requests", "1");
            var text = client.DownloadString(pathPeople);
            var inx = text.IndexOf("edge_followed_by");

            var result1 = text.Substring(inx, 50).Split('"');
            var number1 = int.Parse(Regex.Replace(result1[3], "[^0-9]", ""));
            var results = number1.ToString();
            File.WriteAllText(pathString.Replace("html", "txt"), results);

            File.WriteAllText(pathString, text);
            var peNew = new PeopleSocials();
            peNew.Follow = number1;
            return peNew;
        }
        public PeopleSocials GetFacebookInfo(string code, string url)
        {
            string pathString = @"logs\Fa_" + code + ".html";
            string pathPeople = url;
            var client = new WebClient();
            client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36");
            client.Headers.Add("cache-control", "max-age=0");
            client.Headers.Add("upgrade-insecure-requests", "1");
            client.Headers.Add("Cookie", "sb=13pIW1H1n6alxnE7BmkXqfTV; datr=13pIW9QsQNH_Auc49X3mnIo4; c_user=100003769616733; xs=42%3AdAo5V7ozR8mGEg%3A2%3A1532077699%3A14692%3A6398; pl=n; fr=0ZG3Tp6CB4wuFtu1P.AWUfp4zzXkQEhJAlCOZiLlBChLM.BbSHrX.Kd.AAA.0.0.BbdRvd.AWX9g1pZ; spin=r.4216319_b.trunk_t.1534401513_s.1_v.2_; wd=1536x754; act=1534403351540%2F10; dpr=1.25; presence=EDvF3EtimeF1534403821EuserFA21B03769616733A2EstateFDt3F_5b_5dEutc3F1534403351555G534403821697CEchFDp_5f1B03769616733F2CC");

            var text = client.DownloadString(pathPeople);
            var inx = text.IndexOf("người thích trang này");
            var inx2 = text.IndexOf("người theo dõi trang này");

            var result1 = text.Substring(inx - 20, 20).Split(">");
            var number1 = int.Parse(Regex.Replace(result1[result1.Length - 1], "[^0-9]", ""));
            var result2 = text.Substring(inx2 - 20, 20).Split(">");
            var number2 = int.Parse(Regex.Replace(result2[result2.Length - 1], "[^0-9]", ""));
            var results = number1 + "-" + number2;
            File.WriteAllText(pathString, text);
            File.WriteAllText(pathString.Replace("html", "txt"), results);
            return new PeopleSocials
            {
                Like = (number1),
                Follow = (number2),
            };
        }

    }
}
