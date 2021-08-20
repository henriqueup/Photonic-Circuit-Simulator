using PHCSim.Domain.Entities;
using System.Collections.Generic;

namespace PHCSim.Domain.AppServices.Interfaces
{
    public interface ICircuitAppService
    {
        List<Circuit> GetAll();
        string Create(string label);
        void Delete(string id);
    }
}
