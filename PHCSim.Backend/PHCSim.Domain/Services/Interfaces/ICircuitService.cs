using PHCSim.Domain.Entities;
using System.Collections.Generic;

namespace PHCSim.Domain.Services.Interfaces
{
    public interface ICircuitService
    {
        List<Circuit> GetAll();
        string Create(string label);
        void Delete(string id);
    }
}
