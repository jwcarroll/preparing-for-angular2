using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.InMemory;
using Microsoft.Framework.DependencyInjection;
using System.Collections.Generic;

namespace DivingIntoAngular.Models
{
	public static class ContactListInitializer{
		
		public static void InitializeSampleData(IServiceProvider services){
			using(var context = services.GetService<ContactListContext>()){
            
            context.Contacts.AddRange(CreateContacts());
            
            context.SaveChanges();
            
            var contact = context.Contacts.First(c => c.FirstName == "Josh" && c.LastName == "Carroll");
            
				context.ContactNotes.AddRange(CreateNotesForContact(contact));
            
            context.SaveChanges();
			}
		}
      
      private static IEnumerable<Contact> CreateContacts(){
         yield return new Contact(){FirstName = "Josh", LastName = "Carroll", Twitter = "jwcarroll", City = "Knoxville"};
         yield return new Contact(){FirstName = "Jeremy", LastName = "Likness", Twitter = "jeremylikness", City = "Atlanta"};
         yield return new Contact(){FirstName = "Todd", LastName = "Motto", Twitter = "toddmotto", City = "London"};
      }
      
      private static IEnumerable<ContactNote> CreateNotesForContact(Contact contact){
         yield return new ContactNote(){
            ContactId = contact.ContactId,
            Created = DateTime.UtcNow,
            Note = 
            @"
###Food Preferences
- Pizza  
- Coffee  

_That's pretty much it_
            "};
      }
	}
}