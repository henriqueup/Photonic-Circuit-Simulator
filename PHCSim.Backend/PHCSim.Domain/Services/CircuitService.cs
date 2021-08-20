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

        public List<Circuit> GetAll()
        {
            return circuitRepository.GetAll();
        }

        public string Create(string label)
        {
            return circuitRepository.Create(label);
        }

        public void Delete(string id)
        {
            circuitRepository.Delete(id);
        }
    }
}
