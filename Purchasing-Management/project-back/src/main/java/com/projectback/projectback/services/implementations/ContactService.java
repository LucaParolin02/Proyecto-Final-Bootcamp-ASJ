package com.projectback.projectback.services.implementations;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.models.ContactModel;
import com.projectback.projectback.repositories.ContactRepository;
import com.projectback.projectback.services.IContactService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ContactService implements IContactService{
	  
	@Autowired
	ContactRepository contactRepository;
	
	@Override
	public ContactModel getContactById(Integer id) {
		Optional<ContactModel> contact = contactRepository.findById(id);
		if (contact.isPresent()) {
			return contact.get();
		}
		throw new EntityNotFoundException("Contact with ID " + id + " not found");
	}
	
	@Override
	public ContactModel postContact(ContactModel contact) {
		contact.setCreated(Timestamp.from(Instant.now()));
		contact.setUpdated(Timestamp.from(Instant.now()));
		return contactRepository.save(contact);
	}
	
	@Override
	public ContactModel editContact(Integer id, ContactModel updatedContact) {
		ContactModel existingContact = getContactById(id);
        existingContact.setName(updatedContact.getName());
        existingContact.setLastName(updatedContact.getLastName());
        existingContact.setPhone(updatedContact.getPhone());
        existingContact.setEmail(updatedContact.getEmail());
        existingContact.setRole(updatedContact.getRole());
        existingContact.setUpdated(Timestamp.from(Instant.now()));
        return contactRepository.save(existingContact);	
	}
}
