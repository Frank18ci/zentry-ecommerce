package com.zentry.api.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "usuarios")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuario")
	private Long id;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
	        name = "usuario_roles",
	        joinColumns = @JoinColumn(name = "id_usuario"),
	        inverseJoinColumns = @JoinColumn(name = "id_rol")
	    )
	private List<Rol> rol;
	
	private String nombre;
	private String apellido;
	@Column(name = "correo_electronico", unique = true)
	private String correoElectronico;
	private String contraseña;
	private String telefono;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaCreacion;
	
	@ManyToOne
	@JoinColumn(name = "id_direccion")
	private Direccion direccion;
	
}
