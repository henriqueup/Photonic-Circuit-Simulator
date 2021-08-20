using PHCSim.Domain.AppServices.Interfaces;
using PHCSim.Domain.Entities;
using PHCSim.Domain.Services.Interfaces;
using System.Collections.Generic;

namespace PHCSim.Domain.AppServices
{
    public class CircuitAppService : ICircuitAppService
    {
        private readonly ICircuitService circuitService;

        public CircuitAppService(ICircuitService circuitService)
        {
            this.circuitService = circuitService;
        }

        public List<Circuit> GetCircuits()
        {
            return circuitService.GetCircuits();
        }

        public string CreateCircuit(string label)
        {
            return circuitService.CreateCircuit(label);
        }
    }
}
