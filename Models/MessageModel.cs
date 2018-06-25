namespace angular6DotnetCore.Models
{
    public class MessageExt
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public bool Pass { get; set; }
        public MessageExt()
        {
            Pass = true;
            Code = 200;
            Message = "";
        }
    }
}