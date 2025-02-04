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
    public class NPCsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NPCsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/NPCs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetNPCs()
        {
            var npcs = await _context.NPCs
                .Include(npc => npc.Image)
                .Include(npc => npc.RequiredItem)
                .ThenInclude(ri => ri.Image)
                .Include(npc => npc.Location)
                .Include(npc => npc.BlockedLocation)
                .Select(npc => new
                {
                    npc.NPCID,
                    npc.Name,
                    npc.LocationID,
                    npc.Type,
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
                    } : null,
                    Dialog = npc.Dialog
                })
                .ToListAsync();

            return Ok(npcs);
        }




        // GET: api/NPCs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetNPC(int id)
        {
            var npc = await _context.NPCs
                .Include(npc => npc.Image)
                .Include(npc => npc.RequiredItem)
                .ThenInclude(ri => ri.Image)
                .Include(npc => npc.Location)
                .Include(npc => npc.BlockedLocation)
                .Where(npc => npc.NPCID == id)
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
                    } : null,
                    Dialog = npc.Dialog
                })
                .FirstOrDefaultAsync();

            if (npc == null)
            {
                return NotFound();
            }

            return Ok(npc);
        }



        [HttpGet("blocked-locations")]
        public IActionResult GetBlockedLocations()
        {
            var blockedLocations = _context.NPCs
                .Where(npc => npc.BlockedLocationID != null)
                .Select(npc => new
                {
                    BlockedLocationID = npc.BlockedLocationID,
                    Name = npc.Name
                })
                .ToList();

            return Ok(blockedLocations);
        }


        // PUT: api/NPCs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNPC(int id, NPC nPC)
        {
            if (id != nPC.NPCID)
            {
                return BadRequest();
            }

            _context.Entry(nPC).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NPCExists(id))
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

        // POST: api/NPCs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NPC>> PostNPC(NPC nPC)
        {
            _context.NPCs.Add(nPC);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNPC", new { id = nPC.NPCID }, nPC);
        }

        // DELETE: api/NPCs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNPC(int id)
        {
            var nPC = await _context.NPCs.FindAsync(id);
            if (nPC == null)
            {
                return NotFound();
            }

            _context.NPCs.Remove(nPC);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NPCExists(int id)
        {
            return _context.NPCs.Any(e => e.NPCID == id);
        }
    }
}
