using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace angular6DotnetCore.Logic
{
    public class InfoPeople
    {
        public async Task GetInfo()
        {
            string pathString = @"logs\LogData.html";
            string pathPeople = @"https://www.facebook.com/PewPewHoang";
            try
            {
                //using (HttpClient httpClient = new HttpClient())
                //{
                //    httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36");
                //    httpClient.DefaultRequestHeaders.Add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
                //    httpClient.DefaultRequestHeaders.Add("accept-encoding", "gzip, deflate, br");
                //    httpClient.DefaultRequestHeaders.Add("accept-language", "en-US,en;q=0.9");
                //    httpClient.DefaultRequestHeaders.Add("cache-control", "max-age=0");
                //    httpClient.DefaultRequestHeaders.Add("upgrade-insecure-requests", "1");
                //    httpClient.DefaultRequestHeaders.Add("Cookie", "sb=13pIW1H1n6alxnE7BmkXqfTV; datr=13pIW9QsQNH_Auc49X3mnIo4; c_user=100003769616733; xs=42%3AdAo5V7ozR8mGEg%3A2%3A1532077699%3A14692%3A6398; pl=n; fr=0ZG3Tp6CB4wuFtu1P.AWUfp4zzXkQEhJAlCOZiLlBChLM.BbSHrX.Kd.AAA.0.0.BbdRvd.AWX9g1pZ; spin=r.4216319_b.trunk_t.1534401513_s.1_v.2_; wd=1536x754; act=1534403351540%2F10; dpr=1.25; presence=EDvF3EtimeF1534403821EuserFA21B03769616733A2EstateFDt3F_5b_5dEutc3F1534403351555G534403821697CEchFDp_5f1B03769616733F2CC");
                //    var res = await httpClient.GetByteArrayAsync(pathPeople);
                //    var text = Encoding.UTF8.GetString(res);
                //    File.WriteAllText(pathString, text);
                //}
                var client = new WebClient();
                client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36");
                client.Headers.Add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
                client.Headers.Add("accept-encoding", "gzip, deflate, br");
                client.Headers.Add("accept-language", "en-US,en;q=0.9");
                client.Headers.Add("cache-control", "max-age=0");
                client.Headers.Add("upgrade-insecure-requests", "1");
                client.Headers.Add("Cookie", "sb=13pIW1H1n6alxnE7BmkXqfTV; datr=13pIW9QsQNH_Auc49X3mnIo4; c_user=100003769616733; xs=42%3AdAo5V7ozR8mGEg%3A2%3A1532077699%3A14692%3A6398; pl=n; fr=0ZG3Tp6CB4wuFtu1P.AWUfp4zzXkQEhJAlCOZiLlBChLM.BbSHrX.Kd.AAA.0.0.BbdRvd.AWX9g1pZ; spin=r.4216319_b.trunk_t.1534401513_s.1_v.2_; wd=1536x754; act=1534403351540%2F10; dpr=1.25; presence=EDvF3EtimeF1534403821EuserFA21B03769616733A2EstateFDt3F_5b_5dEutc3F1534403351555G534403821697CEchFDp_5f1B03769616733F2CC");

                var text = client.DownloadString(pathPeople);
                File.WriteAllText(pathString, text);
            }
            catch (Exception ex)
            {
                var e = ex;
            }
        }
    }
}
