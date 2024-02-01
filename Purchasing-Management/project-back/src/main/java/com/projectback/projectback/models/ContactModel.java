package com.projectback.projectback.models;

import java.sql.Timestamp;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "contacts")
public class ContactModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "contact_id")
	private Integer id;
	@NotNull(message = "First name is required")
	@NotBlank(message = "First name must be complete")
	@Column(name = "first_name", nullable = false, length = 40)
	@Size(max = 40, message = "First name must be less than {max} characters")
	private String name;
	@NotNull(message = "Last name is required")
    @NotBlank(message = "Last name must be complete")
	@Size(max = 40, message = "Last name must be less than {max} characters")
    @Column(name = "last_name", nullable = false, length = 40)
	private String lastName;
	@NotNull(message = "Phone number is required")
    @NotBlank(message = "Phone number must be complete")
    @Column(name = "phone_number", nullable = false,length = 40)
	@Pattern(regexp = "\\d+", message = "Phone must contain only numbers")
	@Size(max = 40, message = "Phone must be less than {max} digits")
	private String phone;
	@NotNull(message = "Email is required")
    @NotBlank(message = "Email must be complete")
    @Email(message = "Email must be valid")
    @Column(name = "email", nullable = false,length = 70)
	@Size(max = 70, message = "Email must be less than {max} characters")
	private String email;
	@NotNull(message = "Role is required")
    @NotBlank(message = "Role must be complete")
    @Column(name = "role", nullable = false,length = 40)
	@Size(max = 40, message = "Email must be less than {max} characters")
    private String role;
	@Column(name = "created_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp created;
	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp updated;
	
	public ContactModel() {
	}

	public ContactModel(Integer id,String name,String lastName,String phone,String email,String role,
			Timestamp created, Timestamp updated) {
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.phone = phone;
		this.email = email;
		this.role = role;
		this.created = Timestamp.from(Instant.now());;
		this.updated = this.created;
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Timestamp getCreated() {
		return created;
	}

	public void setCreated(Timestamp created) {
		this.created = created;
	}

	public Timestamp getUpdated() {
		return updated;
	}

	public void setUpdated(Timestamp updated) {
		this.updated = updated;
	}
	
}
