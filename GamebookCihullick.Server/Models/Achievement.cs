namespace GamebookCihullick.Server.Models
{
    public class Achievement
    {
        public int AchievementID { get; set; }
        public int ImageID { get; set; }
        public Image? Image { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

    }
}
