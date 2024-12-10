namespace GamebookCihullick.Server.Models
{
    public class Player
    {
        public int PlayerID { get; set; }
        public int LocationID { get; set; }
        public Location CurrentLocation { get; set; }

        public decimal Money { get; set; }
        public int Hunger { get; set; }
        public int CurrentDay { get; set; }
        public int CurrentLevel { get; set; }
        public int CurrentDifficulty { get; set; }
        public bool HasWashingMachine { get; set; }

        public ICollection<Inventory> Inventory { get; set; }
    }
}
