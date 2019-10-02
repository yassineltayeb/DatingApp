using datingapp.APi.Properties.Models;
using Microsoft.EntityFrameworkCore;

namespace datingapp.APi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) :base (options) {}

        public DbSet<Value> Values { get; set; }    
    }
}