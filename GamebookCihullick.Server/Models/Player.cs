namespace GamebookCihullick.Server.Models
{
    public class Player
    {
        public int PlayerID { get; set; } // Primary Key
        public int LocationID { get; set; } // Foreign Key to Location
        public Location CurrentLocation { get; set; } // Navigation Property

        public decimal Money { get; set; }
        public int Hunger { get; set; }
        public int CurrentDay { get; set; }
        public int CurrentLevel { get; set; }
        public int CurrentDifficulty { get; set; }
        public bool HasWashingMachine { get; set; }

        // Navigation Property for Inventory
        public ICollection<Inventory> Inventory { get; set; }
    }
}
