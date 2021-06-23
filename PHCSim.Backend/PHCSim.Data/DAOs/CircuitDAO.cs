using System;
using PHCSim.Domain.Entities;

namespace PHCSim.Data.DAOs
{
    public class CircuitDAO
    {
        public string Id { get; set; }
        public string Label { get; set; }

        public Circuit ConvertToEntity()
        {
            return new Circuit
            {
                Id = new Guid(Id),
                Label = Label
            };
        }
    }
}
