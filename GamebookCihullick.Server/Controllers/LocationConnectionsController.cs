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
    public class LocationConnectionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LocationConnectionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/LocationConnections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationConnection>>> GetLocationConnections()
        {
            return await _context.LocationConnections.ToListAsync();
        }

        // GET: api/LocationConnections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LocationConnection>> GetLocationConnection(int id)
        {
            var locationConnection = await _context.LocationConnections.FindAsync(id);

            if (locationConnection == null)
            {
                return NotFound();
            }

            return locationConnection;
        }

        // PUT: api/LocationConnections/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocationConnection(int id, LocationConnection locationConnection)
        {
            if (id != locationConnection.LocationID)
            {
                return BadRequest();
            }

            _context.Entry(locationConnection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationConnectionExists(id))
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

        // POST: api/LocationConnections
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LocationConnection>> PostLocationConnection(LocationConnection locationConnection)
        {
            _context.LocationConnections.Add(locationConnection);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LocationConnectionExists(locationConnection.LocationID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLocationConnection", new { id = locationConnection.LocationID }, locationConnection);
        }

        // DELETE: api/LocationConnections/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocationConnection(int id)
        {
            var locationConnection = await _context.LocationConnections.FindAsync(id);
            if (locationConnection == null)
            {
                return NotFound();
            }

            _context.LocationConnections.Remove(locationConnection);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LocationConnectionExists(int id)
        {
            return _context.LocationConnections.Any(e => e.LocationID == id);
        }
    }
}
