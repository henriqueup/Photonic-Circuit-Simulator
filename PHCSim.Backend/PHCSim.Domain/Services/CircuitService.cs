using PHCSim.Domain.Entities;
using PHCSim.Domain.Repositories;
using PHCSim.Domain.Services.Interfaces;
using System.Collections.Generic;

namespace PHCSim.Domain.Services
{
    public class CircuitService : ICircuitService
    {
        private readonly ICircuitRepository circuitRepository;

        public CircuitService(ICircuitRepository circuitRepository)
        {
            this.circuitRepository = circuitRepository;
        }

        public List<Circuit> GetCircuits()
        {
            return circuitRepository.GetCircuits();
        }
    }
}
