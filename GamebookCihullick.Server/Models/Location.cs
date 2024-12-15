namespace GamebookCihullick.Server.Models
{
    public class Location
    {
        public int LocationID { get; set; } // Primary Key
        public string? Name { get; set; }
        public string? Description { get; set; }

        // Image Data
        public byte[]? Image { get; set; } // Stores the image as a byte array

        // Navigation Property for Connections to Other Locations
        public ICollection<LocationConnection>? Connections { get; set; }
    }
}
