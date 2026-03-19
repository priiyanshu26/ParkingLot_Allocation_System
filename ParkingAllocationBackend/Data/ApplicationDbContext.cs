using Microsoft.EntityFrameworkCore;
using ParkingAllocationBackend.Models;

namespace ParkingAllocationBackend.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        

        public DbSet<User> users { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<ParkingSpace> ParkingSpaces { get; set; }
        public DbSet<ParkingAllocation> parkingAllocations { get; set; }

  
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Vehicles)
                .WithOne(v => v.User)
                .HasForeignKey(v => v.UserId)
                .OnDelete(DeleteBehavior.Cascade);

           
            modelBuilder.Entity<ParkingAllocation>()
                .HasOne(pa => pa.User)
                .WithMany()
                .HasForeignKey(pa => pa.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ParkingAllocation>()
                .HasOne(pa => pa.Vehicle)
                .WithMany()
                .HasForeignKey(pa => pa.VehicleId)
                .OnDelete(DeleteBehavior.Restrict); 

          
            modelBuilder.Entity<ParkingAllocation>()
                .HasOne(pa => pa.ParkingSpace)
                .WithMany()
                .HasForeignKey(pa => pa.ParkingSpaceId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
