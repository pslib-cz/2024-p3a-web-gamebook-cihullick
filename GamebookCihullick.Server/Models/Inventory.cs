using System.ComponentModel.DataAnnotations.Schema;

namespace GamebookCihullick.Server.Models
{
    public class Inventory
    {
        public int PlayerID { get; set; } // Composite Key (with ItemID)
        public Player Player { get; set; } // Navigation Property

        public int ItemID { get; set; } // Composite Key (with PlayerID)
        public Item Item { get; set; } // Navigation Property

        public int Quantity { get; set; }
    }
}
