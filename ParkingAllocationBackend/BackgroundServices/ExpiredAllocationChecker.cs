
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ParkingAllocationBackend.Services.Interfaces;

namespace ParkingAllocationBackend.BackgroundServices
{
    public class ExpiredAllocationChecker : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<ExpiredAllocationChecker> _logger;

        public ExpiredAllocationChecker(IServiceProvider serviceProvider, ILogger<ExpiredAllocationChecker> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("ExpiredAllocationChecker service started.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var allocationService = scope.ServiceProvider.GetRequiredService<IParkingAllocationService>();

                        _logger.LogInformation("Checking for expired allocations at {Time}", DateTime.UtcNow);
                        await allocationService.UpdateExpiredAllocationsAsync();
                        _logger.LogInformation("Expired allocations updated.");
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while checking expired allocations.");
                }

                
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }

            _logger.LogInformation("ExpiredAllocationChecker service stopped.");
        }
    }
}
