using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using PHCSim.Domain.Repositories;
using PHCSim.Domain.Services;

namespace PHCSim.UnitTests.Domain.Services.CircuitTests
{
    [TestClass]
    public class CreateTest
    {
        private readonly Mock<ICircuitRepository> circuitRepository = new Mock<ICircuitRepository>();

        private CircuitService circuitService;
        private const string mockedId = "1";

        [TestInitialize]
        public void Initialize()
        {
            circuitService = new CircuitService(circuitRepository.Object);

            circuitRepository.Setup(m => m.Create(It.IsAny<string>())).Returns(mockedId);
        }

        [TestCleanup]
        public void Cleanup()
        {
            circuitRepository.VerifyNoOtherCalls();
        }

        [TestMethod]
        public void Create_Success()
        {
            var id = circuitService.Create("test 1");

            Assert.AreEqual(mockedId, id);

            circuitRepository.Verify(m => m.Create("test 1"), Times.Once);
        }
    }
}
