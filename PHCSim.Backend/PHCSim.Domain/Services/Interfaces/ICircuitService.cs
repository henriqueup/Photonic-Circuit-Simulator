using PHCSim.Domain.Entities;
using System.Collections.Generic;

namespace PHCSim.Domain.Services.Interfaces
{
    public interface ICircuitService
    {
        List<Circuit> GetCircuits();
        string CreateCircuit(string label);
        void Delete(string id);
    }
}
