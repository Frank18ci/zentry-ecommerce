package com.zentry.api.model;


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
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Builder
//@Entity
//@AllArgsConstructor
//@NoArgsConstructor
//@Data
//@Table(name = "carritos")
public class Carrito {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "id_carrito")
//	private Long id;
//	@ManyToOne
//	@JoinColumn(name = "id_usuario")
//	private Usuario usuario;
//	@ManyToOne
//	@JoinColumn(name = "id_estado")
//	private EstadoCarrito estadoCarrito;
//
//	@Temporal(TemporalType.TIMESTAMP)
//	private Date fechaCreacion;
//	//private LocalDateTime fechaCreacion;
//	//
//	@OneToMany(mappedBy = "carrito")
//	private List<CarritoItems> carritoItems;
}
