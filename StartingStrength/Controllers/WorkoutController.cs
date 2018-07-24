using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage.Blob.Protocol;

namespace StartingStrength.Controllers
{
    [Route("api/[controller]")]
    public class WorkoutController : Controller
    {
        [HttpPost("[action]")]
        public ActionResult Log([FromBody]LogData data)
        {

            return Ok();
        }
    }

    public class LogData
    {
        public string Exercise { get; set; }
        public decimal Weight { get; set; }
        public int[] Reps { get; set; }
    }
}
