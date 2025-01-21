using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GamebookCihullick.Server.Data;
using GamebookCihullick.Server.Models;

namespace GamebookCihullick.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LocationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Locations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetLocations()
        {
            var locations = await _context.Locations
                .Include(l => l.Image)
                .Select(l => new
                {
                    l.LocationID,
                    l.Name,
                    l.Description,
                    Image = l.Image != null ? new
                    {
                        l.Image.ImageID,
                        l.Image.Name,
                        l.Image.PathToFile
                    } : null
                })
                .ToListAsync();

            return Ok(locations);
        }


        // GET: api/Locations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetLocation(int id)
        {
            var location = await _context.Locations
                .Include(l => l.Image)
                .Where(l => l.LocationID == id)
                .Select(l => new
                {
                    l.LocationID,
                    l.Name,
                    l.Description,
                    Image = l.Image != null ? new
                    {
                        l.Image.ImageID,
                        l.Image.Name,
                        l.Image.PathToFile
                    } : null
                })
                .FirstOrDefaultAsync();

            if (location == null)
            {
                return NotFound();
            }

            return Ok(location);
        }


        [HttpGet("{id}/connections")]
        public IActionResult GetConnectedLocations(int id)
        {
            var connections = _context.LocationConnections
                .Where(lc => lc.LocationID == id)
                .Include(lc => lc.ConnectedLocation)
                .ThenInclude(cl => cl.Image)
                .Select(lc => new
                {
                    lc.ConnectedLocationID,
                    lc.ConnectedLocation.Name,
                    lc.ConnectedLocation.Description,
                    ImagePath = lc.ConnectedLocation.Image != null ? lc.ConnectedLocation.Image.PathToFile : null
                })
                .ToList();

            return Ok(connections);
        }


        // PUT: api/Locations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocation(int id, Location location)
        {
            if (id != location.LocationID)
            {
                return BadRequest();
            }

            _context.Entry(location).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationExists(id))
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

        [HttpGet("{id}/npcs")]
        public async Task<ActionResult<IEnumerable<object>>> GetNPCsForLocation(int id)
        {
            var npcs = await _context.NPCs
                .Where(npc => npc.LocationID == id)
                .Include(npc => npc.Image)
                .Include(npc => npc.BlockedLocation)
                .Include(npc => npc.RequiredItem)
                .ThenInclude(ri => ri.Image)
                .Select(npc => new
                {
                    npc.NPCID,
                    npc.Name,
                    npc.LocationID,
                    Location = npc.Location != null ? new
                    {
                        npc.Location.LocationID,
                        npc.Location.Name
                    } : null,
                    npc.BlockedLocationID,
                    BlockedLocation = npc.BlockedLocation != null ? new
                    {
                        npc.BlockedLocation.LocationID,
                        npc.BlockedLocation.Name
                    } : null,
                    npc.RequiredItemID,
                    RequiredItem = npc.RequiredItem != null ? new
                    {
                        npc.RequiredItem.ItemID,
                        npc.RequiredItem.Name,
                        Image = npc.RequiredItem.Image != null ? new
                        {
                            npc.RequiredItem.Image.ImageID,
                            npc.RequiredItem.Image.PathToFile
                        } : null
                    } : null,
                    Image = npc.Image != null ? new
                    {
                        npc.Image.ImageID,
                        npc.Image.Name,
                        npc.Image.PathToFile
                    } : null
                })
                .ToListAsync();

            if (!npcs.Any())
            {
                return NotFound();
            }

            return Ok(npcs);
        }







        [HttpGet("{id}/inventories")]
        public async Task<ActionResult<IEnumerable<object>>> GetInventoriesForLocation(int id)
        {
            var inventories = await _context.Inventories
                .Where(inv => inv.LocationID == id)
                .Include(inv => inv.Image)
                .Select(inv => new
                {
                    inv.InventoryID,
                    inv.Name,
                    inv.Type,
                    Image = inv.Image != null ? new
                    {
                        inv.Image.ImageID,
                        inv.Image.Name,
                        inv.Image.PathToFile
                    } : null
                })
                .ToListAsync();

            if (inventories == null || inventories.Count == 0)
            {
                return NotFound();
            }

            return Ok(inventories);
        }



        // POST: api/Locations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("default")]
        public async Task<ActionResult<Location>> PostLocation(Location location)
        {
            _context.Locations.Add(location);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLocation", new { id = location.LocationID }, location);
        }

        [HttpPost("simple")]
        public async Task<IActionResult> CreateSimpleLocation([FromBody] Location location)
        {
            if (location == null)
            {
                return BadRequest("Location data is null.");
            }

            location.LocationID = 0;

            _context.Locations.Add(location);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return CreatedAtAction(nameof(CreateSimpleLocation), new { id = location.LocationID }, location);
        }



        // DELETE: api/Locations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null)
            {
                return NotFound();
            }

            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LocationExists(int id)
        {
            return _context.Locations.Any(e => e.LocationID == id);
        }
    }
}
