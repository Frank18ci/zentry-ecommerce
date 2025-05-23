package com.zentry.api.model;

import java.sql.Date;
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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "ordenes")
public class Orden {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_orden")
	private Long id;
	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;
	@ManyToOne
	@JoinColumn(name = "id_estado")
	private EstadoOrden estadoOrden;
	private Double total;
	@Column(name = "fecha_orden")
	private Date fechaOrden;
	@Column(name = "direccion_envio")
	private String direccionEmvio;
	//
	@OneToMany(mappedBy = "orden")
	private List<Pago> pagos;
	@OneToMany(mappedBy = "orden")
	private List<OrdenItem> ordenItems;
}
