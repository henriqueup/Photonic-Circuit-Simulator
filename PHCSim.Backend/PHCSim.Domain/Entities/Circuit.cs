using System.Collections.Generic;

namespace PHCSim.Domain.Entities
{
    public class Circuit
    {
        public string Id { get; set; }
        public string Label { get; set; }
        public List<CircuitComponent> Components { get; set; }
    }
}
