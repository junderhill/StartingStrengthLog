using System;
using System.Collections.Generic;
using System.Text;
using LiteDB;

namespace StartingStrength.Data
{
    public class DataStore
    {
        public void SaveWorkout(Workout workout)
        {
            workout.Timestamp = DateTime.UtcNow;
            workout.Id = Guid.NewGuid();

            using (LiteDatabase db = new LiteDatabase(@"App_Data\StartingStrength.db"))
            {
                var workoutCollection = db.GetCollection<Workout>("workouts");
                workoutCollection.Insert(workout.Id, workout);
            }
        }
    }
}
