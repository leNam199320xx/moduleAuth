using System;
using System.Collections.Generic;
using System.Text;

namespace SendMailLib
{
    public static class SendMail
    {
        public static void Send(Mail mail)
        {

        }
    }

    public class Mail
    {
        public string From { get; set; }
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
