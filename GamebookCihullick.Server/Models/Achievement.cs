using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GamebookCihullick.Server.Models
{
    

    [Table("Achievements")]
    public class Achievement
    {
        public int AchievementID { get; set; }
        public int ImageID { get; set; }
        public Image Image { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}