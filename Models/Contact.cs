using System;
using Microsoft.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace DivingIntoAngular.Models
{
    public class ContactListContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<ContactNote> ContactNotes { get; set; }
    }

    public class Contact
    {
        public Int32 ContactId { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String City { get; set; }
        public String Twitter { get; set; }
        public virtual ICollection<ContactNote> Notes { get; set; }
    }

    public class ContactNote
    {
        public Int32 ContactNoteId { get; set; }
        public String Note { get; set; }
        public DateTime Created { get; set; }

        public Int32 ContactId { get; set; }
        [JsonIgnore]
        public Contact Contact { get; set; }
    }
}