package com.projectback.projectback.services;

import com.projectback.projectback.models.ContactModel;

public interface IContactService {

	ContactModel getContactById(Integer id);
	ContactModel postContact(ContactModel contact);
	ContactModel editContact(Integer id, ContactModel contact);
	
}
