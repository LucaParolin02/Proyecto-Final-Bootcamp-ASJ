package com.projectback.projectback.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.ContactModel;

@Repository
public interface ContactRepository extends JpaRepository<ContactModel, Integer> {

}
