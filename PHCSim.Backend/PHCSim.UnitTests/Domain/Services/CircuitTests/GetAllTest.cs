using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using PHCSim.Domain.Repositories;
using PHCSim.Domain.Services;
using PHCSim.Domain.Entities;
using System.Collections.Generic;

namespace PHCSim.UnitTests.Domain.Services.CircuitTests
{
    [TestClass]
    public class GetAllTest
    {
        private readonly Mock<ICircuitRepository> circuitRepository = new Mock<ICircuitRepository>();

        private CircuitService circuitService;

        private readonly List<Circuit> mockedCircuits = new List<Circuit>
        {
            new Circuit
            {
                Id = "1",
                Label = "test 1",
            },
            new Circuit
            {
                Id = "2",
                Label = "test 2",
            }
        };

        [TestInitialize]
        public void Initialize()
        {
            circuitService = new CircuitService(circuitRepository.Object);

            circuitRepository.Setup(m => m.GetAll()).Returns(mockedCircuits);
        }

        [TestCleanup]
        public void Cleanup()
        {
            circuitRepository.VerifyNoOtherCalls();
        }

        [TestMethod]
        public void GetAll_Success()
        {
            var circuits = circuitService.GetAll();

            Assert.AreEqual(2, circuits.Count);

            Assert.AreEqual(mockedCircuits[0].Id, circuits[0].Id);
            Assert.AreEqual(mockedCircuits[0].Label, circuits[0].Label);

            Assert.AreEqual(mockedCircuits[1].Id, circuits[1].Id);
            Assert.AreEqual(mockedCircuits[1].Label, circuits[1].Label);

            circuitRepository.Verify(m => m.GetAll(), Times.Once);
        }
    }
}
