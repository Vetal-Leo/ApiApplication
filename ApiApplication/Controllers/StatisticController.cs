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

        // This is getting statistics from the database.
        private List<Statistic> GetStatistic()
        {
            var result = new List<Statistic>();

            //This is the ejection of all data into a sheet, to work with them.
            var items = _context.Items.ToList();
            if (items == null)
            {
                result[0].ItemType = "No data in the database.";
                result[0].Count = 0;
                return result;
            }
            else
            {
                //This is the formation of a new statistics table.
                Statistic statistic;
                foreach (var item in items)
                {
                    statistic = new Statistic
                    {
                        // This is the data to display.
                        ItemType = item.ItemType,
                        Count = GetElementAmount(item.ItemType, items),

                        //The maximum Visibiliti increases by one.
                        Visibility = MaxVisibilityForThisType(item.ItemType, result) + 1
                    };

                    // If the maximum Visibiliti reached nine, the data is no longer output.
                    if (statistic.Visibility <= 9) result.Add(statistic);
                }

                //As a result, the number of identical ItemType does not exceed 9 on the screen.
                return result;
            }
        }

        //This is the amount of elements in the database by type.
        private static int GetElementAmount(string type, List<Item> items)
        {
            return items.Where(t => t.ItemType == type).Count();
        }
        
        //This is the obtaining of maximum Visibility in a List for a given type
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
