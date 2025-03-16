using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GamebookCihullick.Server.Data;
using GamebookCihullick.Server.Models;

namespace GamebookCihullick.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InventoriesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Inventories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetInventories()
        {
            var inventories = await _context.Inventories.Include(i => i.Image).Include(i => i.Location).Select(i => new {
                    i.InventoryID,
                    i.Name,
                    i.Type,
                    i.ImageID,
                    Image = i.Image != null ? new {
                        i.Image.ImageID,
                        i.Image.Name,
                        i.Image.PathToFile
                    } : null,
                    i.LocationID,
                    Location = i.Location != null ? new {
                        i.Location.LocationID,
                        i.Location.Name
                    } : null
                }).ToListAsync();

            return Ok(inventories);
        }


        // GET: api/Inventories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetInventory(int id)
        {
            var inventory = await _context.Inventories.Include(i => i.Image).Include(i => i.Location).Where(i => i.InventoryID == id).Select(i => new {
                    i.InventoryID,
                    i.Name,
                    i.Type,
                    i.ImageID,

                    Image = i.Image != null ? new {
                        i.Image.ImageID,
                        i.Image.Name,
                        i.Image.PathToFile
                    } : null,
                    i.LocationID,

                    Location = i.Location != null ? new {
                        i.Location.LocationID,
                        i.Location.Name
                    } : null
                }).FirstOrDefaultAsync();

            if (inventory == null)
            {
                return NotFound();
            }

            return Ok(inventory);
        }


        // PUT: api/Inventories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventory(int id, Inventory inventory)
        {
            if (id != inventory.InventoryID)
            {
                return BadRequest();
            }

            _context.Entry(inventory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InventoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Inventories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Inventory>> PostInventory(Inventory inventory)
        {
            _context.Inventories.Add(inventory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInventory", new { id = inventory.InventoryID }, inventory);
        }

        // DELETE: api/Inventories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventory(int id)
        {
            var inventory = await _context.Inventories.FindAsync(id);
            if (inventory == null)
            {
                return NotFound();
            }

            _context.Inventories.Remove(inventory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InventoryExists(int id)
        {
            return _context.Inventories.Any(e => e.InventoryID == id);
        }
    }
}
