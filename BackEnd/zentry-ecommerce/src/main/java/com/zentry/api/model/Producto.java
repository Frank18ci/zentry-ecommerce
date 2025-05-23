package com.zentry.api.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
