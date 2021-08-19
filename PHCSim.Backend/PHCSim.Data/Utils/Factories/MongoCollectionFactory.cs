using MongoDB.Driver;
using static PHCSim.Shared.AppSettings;

namespace PHCSim.Data.Utils.Factories
{
    public static class MongoCollectionFactory
    {
        public static IMongoCollection<T> CreateCollection<T>(MongoDBSettings mongoSettings, string collectionName)
        {
            var connectionString = $"mongodb://{mongoSettings.User}:{mongoSettings.Password}@{mongoSettings.Host}/{mongoSettings.Database}";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(mongoSettings.Database);

            return database.GetCollection<T>(collectionName);
        }
    }
}
