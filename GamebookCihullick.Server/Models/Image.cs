using SQLitePCL;

namespace GamebookCihullick.Server.Models
{
    public class Image
    {
        public int ImageID { get; set; }
        public string? Name { get; set; }
        public string? PathToFile { get ; set; }
    }
}