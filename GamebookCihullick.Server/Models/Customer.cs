namespace GamebookCihullick.Server.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }
        public string? Name { get; set; }
        public int Budget { get; set; }
        public int ImageID { get; set; }
        public Image? Image { get; set; }

    }
}
