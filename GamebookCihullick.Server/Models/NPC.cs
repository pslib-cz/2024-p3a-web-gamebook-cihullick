namespace GamebookCihullick.Server.Models
{
    public class NPC
    {
        public int NPCID { get; set; }
        public string? Name { get; set; }
        public int LocationID { get; set; }
        public Location? Location { get; set; }

        public int LocationConnectionID { get; set; }
        public LocationConnection? LocationConnection { get; set; }

        public int RequiredItemID { get; set; }
        public Item? RequiredItem { get; set; }
        public string? Dialog { get; set; }
        public byte[]? Image { get; set; }
    }
}
