using System;
using System.Collections.Generic;
using System.Text;

namespace AuthenLib.Models
{
    public class Config
    {
        public static string Type = "login";
        public static string Secret = "secret";
    }

    public class ConfigPassword
    {
        public static int MinLength = 6;
        public static int MaxLength = 15;
    }

    public class ConfigCode
    {
        protected CodeLength Length = CodeLength.Min;
        protected Config Config { get; set; }
        protected bool HasAlphabet = false;
        protected bool IsImage = false;
        protected string Value { get; set; }
        protected int ExpiredIn = 60 * 3;

        public string Render()
        {
            return Value;
        }

        public static bool Verify(string Code)
        {
            return true;
        }
    }

    public enum CodeLength
    {
        Min = 6,
        Max = 20
    }
}
