using System.Collections.Generic;

namespace PHCSim.Domain.Entities
{
    public abstract class CircuitComponent
    {
        public string Id { get; set; }
        public string Label { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public List<Port> Inputs { get; set; }
        public List<Port> Outputs { get; set; }
    }
}
