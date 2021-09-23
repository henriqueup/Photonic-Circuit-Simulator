using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using PHCSim.Domain.Repositories;
using PHCSim.Domain.Services;

namespace PHCSim.UnitTests.Domain.Services.Circuit
{
    [TestClass]
    public class CreateCircuitTest
    {
        private readonly Mock<ICircuitRepository> circuitRepository = new Mock<ICircuitRepository>();

        private CircuitService circuitService;

        [TestInitialize]
        public void Initialize()
        {
            circuitService = new CircuitService(circuitRepository.Object);
        }

        [TestCleanup]
        public void Cleanup()
        {
            circuitRepository.VerifyNoOtherCalls();
        }

        [TestMethod]
        public void CreateCircuit_Success()
        {
            circuitService.Create("test 1");

            circuitRepository.Verify(m => m.Create("test 1"), Times.Once);
        }
    }
}
