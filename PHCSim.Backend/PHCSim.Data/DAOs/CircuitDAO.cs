using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using PHCSim.Domain.Entities;

namespace PHCSim.Data.DAOs
{
    public class CircuitDAO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Label { get; set; }

        public Circuit ConvertToEntity()
        {
            return new Circuit
            {
                Id = Id,
                Label = Label
            };
        }
    }
}
