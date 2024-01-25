package com.projectback.projectback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.CountryModel;

@Repository
public interface CountryRepository extends JpaRepository<CountryModel, Integer>{

}
