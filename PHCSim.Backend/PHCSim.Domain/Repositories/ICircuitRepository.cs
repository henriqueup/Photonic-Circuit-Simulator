using PHCSim.Domain.Entities;
using System.Collections.Generic;

namespace PHCSim.Domain.Repositories
{
    public interface ICircuitRepository
    {
        List<Circuit> GetAll();
        string Create(string label);
        void Delete(string id);
    }
}
