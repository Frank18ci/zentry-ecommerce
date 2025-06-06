package com.zentry.api.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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
				  .authorities(
					        usuario.getRol().stream()
					            .map(r -> new SimpleGrantedAuthority("ROLE_" + r.getNombre().toUpperCase()))
					            .collect(Collectors.toList())
					    )
				.build();
	}

	public UsuarioDto findByUsernameCorreo(String usernameCorreo) {
		Usuario usuario = usuarioRepository.findUsuarioByCorreoElectronico(usernameCorreo)
				.orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado " + usernameCorreo));
		return UsuarioDto.usuarioToUsuarioDto(usuario);
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
	public UsuarioDto save(UsuarioDto usuarioDto) {
		Usuario usuario = UsuarioDto.usuarioDtoToUsuario(usuarioDto);
		usuario.setFechaCreacion(new Date());
		Usuario usuarioSaved = usuarioRepository.save(usuario);
		return UsuarioDto.usuarioToUsuarioDto(usuarioSaved);
	}

	@Override
	public UsuarioDto saveCliente(UsuarioDto usuarioDto) {
		Usuario usuario = UsuarioDto.usuarioDtoToUsuario(usuarioDto);
		usuario.setRol(List.of(Rol.builder().id(1L).build()));
		usuario.setFechaCreacion(new Date());

		Usuario usuarioSaved = usuarioRepository.save(usuario);
		return UsuarioDto.usuarioToUsuarioDto(usuarioSaved);
	}

	@Override
	public UsuarioDto saveAdmin(UsuarioDto usuarioDto) {
		Usuario usuario = UsuarioDto.usuarioDtoToUsuario(usuarioDto);
		usuario.setRol(List.of(Rol.builder().id(1L).build(), Rol.builder().id(2L).build()));
		usuario.setFechaCreacion(new Date());

		Usuario usuarioSaved = usuarioRepository.save(usuario);
		return UsuarioDto.usuarioToUsuarioDto(usuarioSaved);
	}

	@Override
	public UsuarioDto update(UsuarioDto usuarioDto) {
		Usuario usuarioFound = usuarioRepository.findById(usuarioDto.getId()).orElseThrow(() -> new ResourceNotFound("Usuario no encontrado " + usuarioDto.getId()));

		usuarioFound.setRol(RolDto.listRolDTOToListRol(usuarioDto.getRol()));
		usuarioFound.setApellido(usuarioDto.getApellido());
		usuarioFound.setCorreoElectronico(usuarioDto.getCorreoElectronico());
		usuarioFound.setContraseña(usuarioDto.getContraseña());
		usuarioFound.setTelefono(usuarioDto.getTelefono());
		usuarioFound.setDireccion(DireccionDto.direccionDtoToDireccion(usuarioDto.getDireccion()));

		Usuario usuarioSaved = usuarioRepository.save(usuarioFound);
		return UsuarioDto.usuarioToUsuarioDto(usuarioSaved);
	}

	@Override
	public String delete(Long id) {
		if(id == null){
			throw new BadRequestParam("Falta el dato id");
		}
		usuarioRepository.deleteById(id);
		return "Usuario Eliminado";
	}

}
