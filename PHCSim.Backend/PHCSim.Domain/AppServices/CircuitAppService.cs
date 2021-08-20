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

        public List<Circuit> GetAll()
        {
            return circuitService.GetAll();
        }

        public string Create(string label)
        {
            return circuitService.Create(label);
        }

        public void Delete(string id)
        {
            circuitService.Delete(id);
        }
    }
}
