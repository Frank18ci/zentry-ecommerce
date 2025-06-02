package com.zentry.api.dto;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.model.Direccion;
import com.zentry.api.model.Rol;
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
	private List<RolDto> rol;
	private String nombre;
	private String apellido;
	private String correoElectronico;
	private String contraseña;
	private String telefono;
	private DireccionDto direccion;
	private Date fechaCreacion;

	public static UsuarioDto usuarioToUsuarioDto(Usuario usuario) {
		return UsuarioDto.builder()
				.id(usuario.getId())
				.rol(RolDto.listRolToListRolDto(usuario.getRol() != null ? usuario.getRol(): List.of() ))
				.nombre(usuario.getNombre())
				.apellido(usuario.getApellido())
				.correoElectronico(usuario.getCorreoElectronico())
				.contraseña(usuario.getContraseña())
				.telefono(usuario.getTelefono())
				.fechaCreacion(usuario.getFechaCreacion())
				.direccion(DireccionDto.direccionToDireccionDto(usuario.getDireccion() != null ? usuario.getDireccion() : Direccion.builder().build()))
				.build();
	}
	public static List<UsuarioDto> listUsuarioToListUsuarioDto(List<Usuario> usuarios){
		return usuarios.stream().map(UsuarioDto::usuarioToUsuarioDto).collect(Collectors.toList());
	}
	public static Usuario usuarioDtoToUsuario(UsuarioDto usuarioDto) {
		Usuario usuario = Usuario.builder()
				.id(usuarioDto.getId())
				.rol(RolDto.listRolDTOToListRol(usuarioDto.getRol() != null ? usuarioDto.getRol(): List.of()))
				.nombre(usuarioDto.getNombre())
				.apellido(usuarioDto.getApellido())
				.correoElectronico(usuarioDto.getCorreoElectronico())
				.contraseña(usuarioDto.getContraseña())
				.telefono(usuarioDto.getTelefono())
				.fechaCreacion(usuarioDto.getFechaCreacion())
				.build();
		if (usuarioDto.getDireccion() != null && usuarioDto.getDireccion().getId() != null) {
			usuario.setDireccion(DireccionDto.direccionDtoToDireccion(usuarioDto.getDireccion()));
		}
		return usuario;
	}
}
