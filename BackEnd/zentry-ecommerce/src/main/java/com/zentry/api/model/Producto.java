package com.zentry.api.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "productos")
public class Producto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_producto")
	private Long id;	
	@ManyToOne
	@JoinColumn(name = "id_subcategoria")
	private SubCategoria subCategoria;
	@ManyToOne
	@JoinColumn(name = "id_estado")
	private EstadoProducto estadoProducto;
	private String nombre;
	private String descripcion;
	private BigDecimal precio;
	@Column(name = "fecha_creacion")
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaCreacion;
	//
	@OneToMany(mappedBy = "producto")
	private List<ProductoVariante> productoVariantes;
	@OneToMany(mappedBy = "producto")
	private List<ImagenProducto> imagenProductos;
	@OneToMany(mappedBy = "producto")
	private List<ComentarioProducto> comentarioProductos;
	
	
}
