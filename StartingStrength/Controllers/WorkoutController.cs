using Microsoft.AspNetCore.Mvc;
using StartingStrength.Data;

namespace StartingStrength.Controllers
{
    [Route("api/[controller]")]
    public class WorkoutController : Controller
    {
        private readonly IDataStore _dataStore;

        public WorkoutController(IDataStore dataStore)
        {
            _dataStore = dataStore;
        }

        [HttpPost("[action]")]
        public ActionResult Log([FromBody]Workout workout)
        {
            _dataStore.SaveWorkout(workout);
            return Ok();
        }
    }
}
