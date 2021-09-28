using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using PHCSim.Domain.Repositories;
using PHCSim.Domain.Services;

namespace PHCSim.UnitTests.Domain.Services.CircuitTests
{
    [TestClass]
    public class DeleteTest
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
        public void Create_Success()
        {
            circuitService.Delete("1");

            circuitRepository.Verify(m => m.Delete("1"), Times.Once);
        }
    }
}
