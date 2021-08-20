using PHCSim.Domain.Entities;
using System.Collections.Generic;

namespace PHCSim.Domain.Repositories
{
    public interface ICircuitRepository
    {
        List<Circuit> GetCircuits();
        string CreateCircuit(string label);
    }
}
