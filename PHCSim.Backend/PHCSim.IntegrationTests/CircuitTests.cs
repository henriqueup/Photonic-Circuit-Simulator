using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PHCSim.WebApi;
using System.Threading.Tasks;

namespace PHCSim.IntegrationTests
{
    [TestClass]
    public class CircuitTests
    {
        private const string routePrefix = "/api/v1/";

        private static readonly WebApplicationFactory<Startup> webApplicationFactory = new WebApplicationFactory<Startup>();

        [TestMethod]
        public async Task GetAll_ReturnsSuccessAndEmptyList()
        {
            var client = webApplicationFactory.CreateClient();

            var response = await client.GetAsync($"{routePrefix}circuits");

            response.EnsureSuccessStatusCode();
        }
    }
}
