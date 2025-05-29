package com.zentry.api.model;

import java.time.LocalDateTime;

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
@Table(name = "comentarios_productos")
public class ComentarioProducto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_comentario")
	private Long id;
	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;
	@ManyToOne
	@JoinColumn(name = "id_producto")
	private Producto producto;
	private int calificacion;
	private String comentario;
	private LocalDateTime fecha;
}
