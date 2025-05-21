package com.zentry.api.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
	@ManyToOne
	@JoinColumn(name = "id_rol")
	private Rol rol;
	
	private String nombre;
	private String apellido;
	private String correo_electronico;
	private String contraseña;
	private String telefono;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaCreacion;
	
	@ManyToOne
	@JoinColumn(name = "id_direccion")
	private Direccion direccion;
	
}
