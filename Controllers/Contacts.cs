using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using DivingIntoAngular.Models;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.Logging;
using AutoMapper;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DivingIntoAngular.Controllers
{
    [Route("api/[controller]")]
    public class Contacts : Controller
    {
        private ContactListContext _contactList;
        private ILogger<Contacts> _logger;

        public Contacts(ContactListContext context, ILogger<Contacts> logger)
        {
            _contactList = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Contact>> Get()
        {
            return await _contactList.Contacts
            .ToListAsync();
        }

        [HttpGet("{contactId:int}")]
        public async Task<IActionResult> GetContact(Int32 contactId)
        {
            Contact existingContact = null;

            existingContact = await _contactList.Contacts
               .SingleOrDefaultAsync(c => c.ContactId == contactId);

            if (existingContact == null)
            {
                return HttpNotFound();
            }

            return new ObjectResult(existingContact);
        }

        [HttpPost()]
        public async Task<IActionResult> AddContact([FromBody] Contact contact)
        {
            _logger.LogInformation(JsonConvert.SerializeObject(contact));

            _contactList.Contacts.Add(contact);
            await _contactList.SaveChangesAsync();

            return Created(
                Url.Action(nameof(GetContact), new { contactId = contact.ContactId }),
                contact
            );
        }

        [HttpPut("{contactId:int}")]
        public async Task<IActionResult> UpdateContact(Int32 contactId, [FromBody] Contact contact)
        {
            Contact existingContact = null;

            existingContact = await _contactList.Contacts
               .SingleOrDefaultAsync(c => c.ContactId == contactId);

            if (existingContact == null)
            {
                return HttpNotFound();
            }

            Mapper.Map(contact, existingContact);

            await _contactList.SaveChangesAsync();

            return new ObjectResult(existingContact);
        }

        [HttpDeleteAttribute("{contactId:int}")]
        public async Task<IActionResult> DeleteContact(Int32 contactId)
        {
            Contact existingContact = null;

            existingContact = await _contactList.Contacts
               .SingleOrDefaultAsync(c => c.ContactId == contactId);

            if (existingContact == null)
            {
                return new ObjectResult(null);
            }

            _contactList.Contacts.Remove(existingContact);

            await _contactList.SaveChangesAsync();

            return new ObjectResult(existingContact);
        }

        [HttpGet("{contactId:int}/notes")]
        public async Task<IEnumerable<ContactNote>> GetContactNotes(Int32 contactId)
        {
            return await (from cn in _contactList.ContactNotes
                          where cn.ContactId == contactId
                          select cn).ToListAsync();
        }

        [HttpGet("{contactId:int}/notes/{contactNoteId:int}")]
        public async Task<IEnumerable<ContactNote>> GetContactNote(Int32 contactId, Int32 contactNoteId)
        {
            return await (from cn in _contactList.ContactNotes
                          where cn.ContactId == contactId &&
                                cn.ContactNoteId == contactNoteId
                          select cn).ToListAsync();
        }

        [HttpPost("{contactId:int}/notes")]
        public async Task<IActionResult> AddContactNote(Int32 contactId, [FromBody] ContactNoteViewModel contactNote)
        {
            Contact existingContact = null;

            existingContact = await _contactList.Contacts
               .SingleOrDefaultAsync(c => c.ContactId == contactId);

            if (existingContact == null)
            {
                return new ObjectResult(null);
            }

            var newNote = new ContactNote()
            {
                ContactId = existingContact.ContactId,
                Created = DateTime.UtcNow,
                Note = contactNote.Note
            };

            _contactList.ContactNotes.Add(newNote);

            await _contactList.SaveChangesAsync();

            return CreatedAtAction(
               nameof(GetContactNote),
               new
               {
                   contactId = newNote.ContactId,
                   contactNoteId = newNote.ContactNoteId
               },
               newNote);
        }
        
        [HttpPut("{contactId:int}/notes/{contactNoteId:int}")]
        public async Task<IActionResult> UpdateContactNote(Int32 contactId, Int32 contactNoteId, [FromBody] ContactNoteViewModel contactNote)
        {
            ContactNote existingNote = null;

            existingNote = await _contactList.ContactNotes
               .SingleOrDefaultAsync(cn => cn.ContactId == contactId && cn.ContactNoteId == contactNoteId);

            if (existingNote == null)
            {
                return new ObjectResult(null);
            }

            existingNote.Note = contactNote.Note;
            
            return new ObjectResult(existingNote);
        }
        
        
        [HttpDelete("{contactId:int}/notes/{contactNoteId:int}")]
        public async Task<IActionResult> DeleteContactNote(Int32 contactId, Int32 contactNoteId)
        {
            ContactNote existingNote = null;

            existingNote = await _contactList.ContactNotes
               .SingleOrDefaultAsync(cn => cn.ContactId == contactId && cn.ContactNoteId == contactNoteId);

            if (existingNote == null)
            {
                return new ObjectResult(null);
            }

            _contactList.Remove(existingNote);
            
            await _contactList.SaveChangesAsync();
            
            return new ObjectResult(existingNote);
        }
    }
    
    public class ContactNoteViewModel {
       public string Note { get; set; }
    }
}
