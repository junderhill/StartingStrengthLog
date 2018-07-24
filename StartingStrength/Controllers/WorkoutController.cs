using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage.Blob.Protocol;
using StartingStrength.Data;

namespace StartingStrength.Controllers
{
    [Route("api/[controller]")]
    public class WorkoutController : Controller
    {
        [HttpPost("[action]")]
        public ActionResult Log([FromBody]Workout workout)
        {

            return Ok();
        }
    }
}
