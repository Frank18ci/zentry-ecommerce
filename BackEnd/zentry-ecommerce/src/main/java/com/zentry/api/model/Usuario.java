package com.zentry.api.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.query.Order;

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

	@OneToMany(mappedBy = "usuario")
	private List<ComentarioProducto> comentarioProductos;
	@OneToMany(mappedBy = "usuario")
	private List<Orden> ordenes;
	
}
