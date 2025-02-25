namespace GamebookCihullick.Server.Models
{
    public class Cutscene
    {
        public int CutsceneID { get; set; }
        public int ImageID { get; set; }
        public Image? Image { get; set; }
        public string? Name { get; set; }
        public string? Text { get; set; }
        public int NextCutsceneID { get; set; }
    }
}
