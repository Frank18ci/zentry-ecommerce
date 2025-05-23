package com.zentry.api.model;

import java.sql.Date;


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
@Table(name = "pagos")
public class Pago {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pago")
	private Long id;
	@ManyToOne
	@JoinColumn(name = "id_orden")
	private Orden orden;
	@ManyToOne
	@JoinColumn(name = "id_metodo")
	private MetodoPago metodoPago;
	@ManyToOne
	@JoinColumn(name = "id_estado")
	private EstadoPago estadoPago;
	
	private double monto;
	@Column(name = "fecha_pago")
	private Date fechaPago; 
}
