using MongoDB.Driver;
using PHCSim.Data.DAOs;
using PHCSim.Data.Utils.Factories;
using PHCSim.Domain.Entities;
using PHCSim.Domain.Repositories;
using PHCSim.Shared;
using System.Collections.Generic;

namespace PHCSim.Data.Repositories
{
    public class CircuitRepository : ICircuitRepository
    {
        private readonly static string CIRCUIT_COLLECTION = "Circuits";

        private readonly IMongoCollection<CircuitDAO> circuitCollection;

        public CircuitRepository(AppSettings appSettings)
        {
            circuitCollection = MongoCollectionFactory.CreateCollection<CircuitDAO>(appSettings.MongoDB, CIRCUIT_COLLECTION);
        }

        public List<Circuit> GetCircuits()
        {
            var circuitDAOs = circuitCollection.Find(circuit => true).ToList();

            return ConvertDAOsToEntities(circuitDAOs);
        }

        public string CreateCircuit(string label)
        {
            var newCircuit = new CircuitDAO
            {
                Label = label
            };

            circuitCollection.InsertOne(newCircuit);

            return newCircuit.Id;
        }

        private List<Circuit> ConvertDAOsToEntities(List<CircuitDAO> circuitDAOs)
        {
            var circuits = new List<Circuit>();

            foreach(var circuitDAO in circuitDAOs)
            {
                circuits.Add(circuitDAO.ConvertToEntity());
            }

            return circuits;
        }
    }
}
