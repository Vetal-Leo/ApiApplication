using Microsoft.EntityFrameworkCore;

namespace ApiApplication.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public string ItemType { get; set; }
    }

    public class Statistic
    {
        public string ItemType { get; set; }
        public int Count { get; set; }
    }

    public class ItemsContext : DbContext
    {
        public DbSet<Item> Items { get; set; }
        public ItemsContext(DbContextOptions<ItemsContext> options)
            : base(options)
        { }
    }
}
