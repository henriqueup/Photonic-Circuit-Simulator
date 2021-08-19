using MongoDB.Driver;
using PHCSim.Data.DAOs;
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
            var mongoSettings = appSettings.MongoDB;

            var connectionString = $"mongodb://{mongoSettings.User}:{mongoSettings.Password}@{mongoSettings.Host}/{mongoSettings.Database}";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(mongoSettings.Database);

            circuitCollection = database.GetCollection<CircuitDAO>(CIRCUIT_COLLECTION);
        }

        public List<Circuit> GetCircuits()
        {
            var circuitDAOs = circuitCollection.Find(circuit => true).ToList();

            return ConvertDAOsToEntities(circuitDAOs);
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
