using System.Collections.Generic;
using System.Linq;
using ApiApplication.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiApplication.Controllers
{

    [Route("api/statistic")]
    public class StatisticController : Controller
    {
        private ItemsContext _context;
        public StatisticController(ItemsContext context)
        {
            _context = context;
        }

        // GET api/statistic
        [HttpGet]
        public IEnumerable<Statistic> Get()
        {

            return GetStatistic();
        }

        private List<Statistic> GetStatistic()
        {
            var result = new List<Statistic>();
            var typelist = _context.Items.Select(t => t.ItemType).Distinct().ToList();
            var items = _context.Items.ToList();
            if (typelist == null || items == null)
            {
                result[0].ItemType = "No data in the database.";
                result[0].Count = 0;
                return result;
            }
            else
            {
                Statistic statistic;
                foreach (string type in typelist)
                {
                    statistic = new Statistic
                    {
                        ItemType = type,
                        Count = GetElementAmount(type, items)
                    };
                    result.Add(statistic);
                }

                return result;
            }
        }

        private static int GetElementAmount(string type, List<Item> items)
        {
            return items.Where(t => t.ItemType == type).Count();
        }
    }
}
