using AuthenLib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuthenLib.Lib
{
    public class Authen
    {
        public Config ConfigGeneral { get; set; }
        public ConfigPassword ConfigPassword { get; set; }
        public string ConfigDB { get; set; }

        public static MessageExt VerifyAccount(Account account)
        {
            MessageExt mes = new MessageExt();
            if (account == null)
            {
                mes.Pass = false;
                mes.Message += "Your account is null ";
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

        public static MessageExt VerifyPassword(string Password)
        {
            MessageExt mes = new MessageExt();
            return mes;
        }

        public static MessageExt ChangePassword (string Password, string NewPassword, string Code)
        {
            
            MessageExt mes = new MessageExt();
            if (ConfigCode.Verify(Code))
            {

            }
            return mes;
        }

        public static MessageExt Logout(string Password)
        {
            MessageExt mes = new MessageExt();
            return mes;
        }

        public static void SendCode()
        {
            var mail = new SendMailLib.Mail();
            mail.Body.Replace("$ConfigCode", configCode.Render());
            SendMailLib.SendMail.Send(mail);
        }
        
    }
}
