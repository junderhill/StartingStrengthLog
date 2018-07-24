using System;
using System.Collections.Generic;
using System.Text;

namespace StartingStrength.Data
{
    public class Workout
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Exercise { get; set; }
        public decimal Weight { get; set; }
        public int[] Reps { get; set; }
    }
}
