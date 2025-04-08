using Microsoft.Extensions.Options;
using MongoDB.Driver;
using product_catalog.Model;

namespace product_catalog
{
    public class MongoDBContext
    {
        private readonly IMongoDatabase _database;
        private readonly MongoDBSettings _settings;

        public MongoDBContext(IOptions<MongoDBSettings> settings)
        {
            _settings = settings.Value;
            var client = new MongoClient(_settings.ConnectionString);
            _database = client.GetDatabase(_settings.DatabaseName);
        }

        public IMongoCollection<Product> Products => _database.GetCollection<Product>(_settings.ProductsCollectionName);
    }

    public class MongoDBSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string ProductsCollectionName { get; set; }
    }
}
