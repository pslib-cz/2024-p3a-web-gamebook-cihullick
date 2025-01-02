namespace GamebookCihullick.Server.Models
{
    public class Item
    {
        public int ItemID { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? IsEdible { get; set; }
        public int? NutritionalValue { get; set; }
        public byte[]? Image { get; set; }

    }
}
