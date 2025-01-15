namespace GamebookCihullick.Server.Models
{
    public class LocationConnection
    {
        public int LocationID { get; set; }
        public int ConnectedLocationID { get; set; }
        public Location? Location { get; set; }
        public Location? ConnectedLocation { get; set; }
    }

}
