namespace GamebookCihullick.Server.Models
{
    public class LocationConnection
    {
        public int LocationID { get; set; } // Foreign Key to Source Location
        public Location Location { get; set; } // Navigation Property

        public int ConnectedLocationID { get; set; } // Foreign Key to Target Location
        public Location ConnectedLocation { get; set; } // Navigation Property

        public bool IsBlocked { get; set; } // Indicates whether the connection is blocked
    }
}
