using PHCSim.Data.DAOs;
using PHCSim.Domain.Entities;
using PHCSim.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace PHCSim.Data.Repositories
{
    public class CircuitRepository : ICircuitRepository
    {
        public CircuitRepository() { }

        public List<Circuit> GetCircuits()
        {
            var circuitDAO = new CircuitDAO
            {
                Id = Guid.NewGuid().ToString(),
                Label = "Circuit 1"
            };

            return new List<Circuit> { circuitDAO.ConvertToEntity() };
        }
    }
}
