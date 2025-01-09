namespace GamebookCihullick.Server.Models
{
    public class Location
    {
        public int LocationID { get; set; }
        public int ImageID { get; set; }
        public Image? Image { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public ICollection<LocationConnection>? Connections { get; set; }
    }
}
