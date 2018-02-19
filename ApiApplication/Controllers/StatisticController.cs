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
            var items = _context.Items.ToList();
            if (items == null)
            {
                result[0].ItemType = "No data in the database.";
                result[0].Count = 0;
                return result;
            }
            else
            {
                Statistic statistic;
                foreach (var item in items)
                {
                    statistic = new Statistic
                    {
                        ItemType = item.ItemType,
                        Count = GetElementAmount(item.ItemType, items),
                        Visibility = MaxVisibilityForThisType(item.ItemType, result) + 1
                    };

                    if (statistic.Visibility <= 9) result.Add(statistic);
                }

                return result;
            }

        }

        private static int GetElementAmount(string type, List<Item> items)
        {
            return items.Where(t => t.ItemType == type).Count();
        }

        private int MaxVisibilityForThisType(string type, List<Statistic> templist)
        {
            int maxiAmount = 0;
            foreach (var element in templist)
            {
                if (element.ItemType == type && maxiAmount < element.Visibility)
                {
                    maxiAmount = element.Visibility;
                }
            }

            return maxiAmount;
        }

    }
}
