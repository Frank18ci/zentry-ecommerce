package com.zentry.api.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.zentry.api.dto.DireccionDto;
import com.zentry.api.dto.RolDto;
import com.zentry.api.dto.UsuarioDto;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.Rol;
import com.zentry.api.model.Usuario;
import com.zentry.api.repository.UsuarioRepository;
import com.zentry.api.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService, UserDetailsService {

	private final UsuarioRepository usuarioRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository.findUsuarioByCorreoElectronico(username)
				.orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado " + username));
		return User.builder().username(usuario.getCorreoElectronico()).password(usuario.getContraseña())
				.authorities(List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().stream().map(r -> r.getNombre().toUpperCase())))).build();
	}

	@Override
	public List<UsuarioDto> list() {
		return UsuarioDto.listUsuarioToListUsuarioDto(usuarioRepository.findAll());
	}

	@Override
	public UsuarioDto find(Long id) {
		return UsuarioDto.usuarioToUsuarioDto(usuarioRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Usuario no encontrado " + id)));
	}

	@Override
	public UsuarioDto saveCliente(UsuarioDto usuarioDto) {
		Usuario usuario = Usuario.builder()
				// Cambiar a un filtrado mas adelante
				.rol(List.of(Rol.builder().id(1L).build()))
				.nombre(usuarioDto.getNombre())
				.apellido(usuarioDto.getApellido())
				.correoElectronico(usuarioDto.getCorreoElectronico())
				.contraseña(usuarioDto.getContraseña())
				.telefono(usuarioDto.getTelefono()).fechaCreacion(new Date())
				.direccion(DireccionDto.direccionDtoToDireccion(usuarioDto.getDireccion())).build();
		Usuario usuarioSaved = usuarioRepository.save(usuario);
		return UsuarioDto.usuarioToUsuarioDto(usuarioSaved);
	}

	@Override
	public UsuarioDto saveAdmin(UsuarioDto usuarioDto) {
		Usuario usuario = Usuario.builder()
				// Cambiar a un filtrado mas adelante
				.rol(List.of(Rol.builder().id(1L).build(),Rol.builder().id(2L).build()))
				.nombre(usuarioDto.getNombre())
				.apellido(usuarioDto.getApellido())
				.correoElectronico(usuarioDto.getCorreoElectronico())
				.contraseña(usuarioDto.getContraseña())
				.telefono(usuarioDto.getTelefono())
				.fechaCreacion(new Date())
				.direccion(DireccionDto.direccionDtoToDireccion(usuarioDto.getDireccion())).build();
		Usuario usuarioSaved = usuarioRepository.save(usuario);
		return UsuarioDto.usuarioToUsuarioDto(usuarioSaved);
	}

	@Override
	public UsuarioDto update(UsuarioDto usuarioDto) {
		if(Objects.isNull(usuarioDto.getId())) {
			throw new BadRequestParam("Falta el paremetro id");
		}
		Usuario usuario = Usuario.builder()
				.rol(RolDto.listRolDTOToListRol(usuarioDto.getRol()))
				.nombre(usuarioDto.getNombre())
				.apellido(usuarioDto.getApellido())
				.correoElectronico(usuarioDto.getCorreoElectronico())
				.contraseña(usuarioDto.getContraseña())
				.telefono(usuarioDto.getTelefono())
				.fechaCreacion(new Date())
				.direccion(DireccionDto.direccionDtoToDireccion(usuarioDto.getDireccion())).build();
		Usuario usuarioSaved = usuarioRepository.save(usuario);
		return UsuarioDto.usuarioToUsuarioDto(usuarioSaved);
	}

	@Override
	public String delete(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
