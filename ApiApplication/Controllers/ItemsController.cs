using System.Collections.Generic;
using System.Linq;
using ApiApplication.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiApplication.Controllers
{
    [Route("api/items")]
    public class ItemsController : Controller
    {
        private ItemsContext _context;
        public ItemsController(ItemsContext context)
        {
            _context = context;
        }

        // GET api/items
        [HttpGet]
        public IEnumerable<Item> Get()
        {
            return _context.Items.ToList();
        }

        // GET api/items/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Item item = _context.Items.FirstOrDefault(x => x.Id == id);
            if (item == null)
                return NotFound();
            return new ObjectResult(item);
        }

        // POST api/items
        [HttpPost]
        public IActionResult Post([FromBody] Item item)
        {
            if (item == null)
            {
                return BadRequest();
            }
            _context.Items.Add(item);
            _context.SaveChanges();

            return Ok(item);
        }

        // PUT api/items/5
        [HttpPut]
        public IActionResult Put([FromBody]Item item)
        {
            if (item == null)
            {
                return BadRequest();
            }
            if (!_context.Items.Any(x => x.Id == item.Id))
            {
                return NotFound();
            }
            _context.Update(item);
            _context.SaveChanges();

            return Ok(item);
        }

        // DELETE api/items/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Item item = _context.Items.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Items.Remove(item);
            _context.SaveChanges();
            return Ok(item);
        }
    }
}
