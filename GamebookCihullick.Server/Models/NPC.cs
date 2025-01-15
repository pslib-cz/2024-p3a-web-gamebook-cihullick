namespace GamebookCihullick.Server.Models
{
    public class NPC
    {
        public int NPCID { get; set; }
        public int ImageID { get; set; }
        public Image? Image { get; set; }
        public string? Name { get; set; }
        public int LocationID { get; set; }
        public Location? Location { get; set; }
        public int? BlockedLocationID { get; set; }
        public Location? BlockedLocation { get; set; }
        public int? RequiredItemID { get; set; }
        public Item? RequiredItem { get; set; }
        public string? Dialog { get; set; }
    }
}
