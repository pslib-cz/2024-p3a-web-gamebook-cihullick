namespace GamebookCihullick.Server.Models
{
    public class Item
    {
        public int ItemID { get; set; }
        public int ImageID { get; set; }
        public Image? Image { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }
        public bool? ShowsInInventory { get; set; }
        public int Cost { get; set; }
        public bool? IsEdible { get; set; }
        public int? NutritionalValue { get; set; }

    }
}
