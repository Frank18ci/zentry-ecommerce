package com.zentry.api.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "orden_items")
public class OrdenItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_item")
	private Long id;
	@ManyToOne
	@JoinColumn(name = "id_orden")
	private Orden orden;
	@ManyToOne
	@JoinColumn(name = "id_variante")
	private ProductoVariante productoVariante;
	private int cantidad;
	@Column(name = "precio_unitario")
	private double precioUnitario;
}
