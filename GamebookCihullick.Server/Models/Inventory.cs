namespace GamebookCihullick.Server.Models
{
    public class Inventory
    {
        public int InventoryID { get; set; }
        public string? Name { get; set; }
        public int Type { get; set; }
        public int ImageID { get; set; }
        public Image? Image { get; set; }
        public int LocationID { get; set; }
        public Location? Location { get; set; }
    }
}
