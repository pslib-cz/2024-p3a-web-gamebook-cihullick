using System.ComponentModel.DataAnnotations.Schema;

namespace GamebookCihullick.Server.Models
{
    public class Inventory
    {
        public int PlayerID { get; set; }
        public Player Player { get; set; }

        public int ItemID { get; set; }
        public Item Item { get; set; }

        public int Quantity { get; set; }
    }
}
