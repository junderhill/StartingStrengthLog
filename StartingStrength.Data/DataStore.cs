using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace StartingStrength.Data
{
    public interface IDataStore
    {
        void SaveWorkout(Workout workout);
    }

    public class DataStore : IDataStore
    {
        public void SaveWorkout(Workout workout)
        {
            using (StreamWriter file = File.AppendText("App_Data\\workouts.csv"))
            {
                workout.Timestamp = DateTime.UtcNow;
                file.WriteLine(@"'{0}','{1}','{2}','{3}'", workout.Timestamp, workout.Exercise, workout.Weight, workout.Reps.FormatForCsv());
            }
        }
    }

    public static class IntArrayExtension
    {
        public static string FormatForCsv(this int[] obj)
        {
            if (obj.Length > 1)
            {
                StringBuilder sBuilder = new StringBuilder();
                for (int i = 0; i < obj.Length; i++)
                {
                    sBuilder.Append(obj[i].ToString());
                    if (i < obj.Length - 1)
                        sBuilder.Append(",");
                }

                return sBuilder.ToString();
            }

            return obj.Length == 1 ? obj[0].ToString() : "";
        }
    }
}
