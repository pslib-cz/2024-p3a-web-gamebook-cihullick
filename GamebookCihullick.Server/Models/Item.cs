namespace GamebookCihullick.Server.Models
{
    public class Item
    {
        public int ItemID { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public byte[] Image { get; set; }

        public ICollection<Inventory> Inventories { get; set; }
    }
}
