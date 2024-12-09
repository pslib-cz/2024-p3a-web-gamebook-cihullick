namespace GamebookCihullick.Server.Models
{
    public class Item
    {
        public int ItemID { get; set; } // Primary Key
        public string Name { get; set; } // Name of the item
        public decimal Price { get; set; } // Price of the item
        public string Description { get; set; } // Description of the item
        public string Category { get; set; } // Category of the item (e.g., "food", "unlock")
        public byte[] Image { get; set; }

        // Navigation Property for Inventory
        public ICollection<Inventory> Inventories { get; set; }
    }
}
