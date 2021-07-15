namespace PHCSim.Shared
{
    public class AppSettings
    {
        public MongoDBSettings MongoDB { get; set; }

        public class MongoDBSettings
        {
            public string Host { get; set; }
            public string Database { get; set; }
            public string User { get; set; }
            public string Password { get; set; }
            public string CircuitCollection { get; set; }
        }
    }
}
