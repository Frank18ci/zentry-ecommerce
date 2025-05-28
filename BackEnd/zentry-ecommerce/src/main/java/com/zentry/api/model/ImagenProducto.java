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
@Table(name = "imagenes_productos")
public class ImagenProducto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_imagen")
	private Long id;
	@ManyToOne
	@JoinColumn(name = "id_producto")
	private Producto producto;
	@Column(name = "url_imagen")
	private String urlImagen; // {id_producto}_{nombre_sin_espacios}_{color}_{talla}.webp formato estandar
	@Column(name = "es_principal")
	private boolean principal;
	//
}
