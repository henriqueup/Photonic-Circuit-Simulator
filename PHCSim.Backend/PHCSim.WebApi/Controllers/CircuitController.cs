using Microsoft.AspNetCore.Mvc;
using PHCSim.Domain.AppServices.Interfaces;
using PHCSim.WebApi.Models;

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
            var circuits = circuitAppService.GetAll();

            return Ok(circuits);
        }

        [HttpPost("circuits")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult CreateCircuit([FromBody] CircuitModel model)
        {
            model.Id = circuitAppService.Create(model.Label);

            return Ok(model);
        }

        [HttpDelete("circuits/{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult DeleteCircuit([FromRoute] string id)
        {
            circuitAppService.Delete(id);

            return Ok();
        }
    }
}
