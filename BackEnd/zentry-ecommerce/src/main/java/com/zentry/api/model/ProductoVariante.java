package com.zentry.api.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "producto_variantes")
public class ProductoVariante {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_variante")
	private Long id;
	@ManyToOne
	@JoinColumn(name = "id_producto")
	private Producto producto;
	@ManyToOne
	@JoinColumn(name = "id_talla")
	private Talla talla;
	@ManyToOne
	@JoinColumn(name = "id_color")
	private Color color;
	private int stock;
	//
	@OneToMany(mappedBy = "productoVariante")
	private List<OrdenItem> ordenItems;
	@OneToMany(mappedBy = "productoVariante")
	private List<CarritoItems> carritoItems;
	
}
