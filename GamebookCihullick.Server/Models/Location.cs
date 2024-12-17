namespace GamebookCihullick.Server.Models
{
    public class Location
    {
        public int LocationID { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public byte[]? Image { get; set; }

        public ICollection<LocationConnection>? Connections { get; set; }
    }
}
