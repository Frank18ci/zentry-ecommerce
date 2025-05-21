package com.zentry.api.dto;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.model.Usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UsuarioDto {
	private Long id;
	private RolDto rol;
	private String nombre;
	private String apellido;
	private String correoElectronico;
	private String contraseña;
	private String telefono;
	private Date fechaCreacion;
	private DireccionDto direccion;
	
	public static UsuarioDto usuarioToUsuarioDto(Usuario usuario) {
		return UsuarioDto.builder()
				.id(usuario.getId())
				.rol(RolDto.rolToRolDto(usuario.getRol()))
				.nombre(usuario.getNombre())
				.apellido(usuario.getApellido())
				.correoElectronico(usuario.getCorreoElectronico())
				.contraseña(usuario.getContraseña())
				.telefono(usuario.getTelefono())
				.fechaCreacion(usuario.getFechaCreacion())
				.direccion(DireccionDto.direccionToDireccionDto(usuario.getDireccion()))
				.build();
	}
	public static List<UsuarioDto> listUsuarioToListUsuarioDto(List<Usuario> usuarios){
		return usuarios.stream().map(UsuarioDto::usuarioToUsuarioDto).collect(Collectors.toList());
	}
}
