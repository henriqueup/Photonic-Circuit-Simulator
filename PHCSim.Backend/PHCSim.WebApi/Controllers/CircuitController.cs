using Microsoft.AspNetCore.Mvc;
using PHCSim.Domain.AppServices.Interfaces;

namespace PHCSim.WebApi.Controllers
{
    [ApiController]
    [Route("api/v1")]
    public class CircuitController : ControllerBase
    {
        private readonly ICircuitAppService circuitAppService;

        public CircuitController(ICircuitAppService circuitAppService)
        {
            this.circuitAppService = circuitAppService;
        }

        [HttpGet("circuits")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult GetCircuits()
        {
            var circuits = circuitAppService.GetCircuits();

            return Ok(circuits);
        }
    }
}
