package com.zentry.api.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.model.Rol;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RolDto {
	private Long id;
	private String nombre;
	public static RolDto rolToRolDto(Rol rol) {
		return RolDto.builder()
				.id(rol.getId())
				.nombre(rol.getNombre())
				.build();
	}
	public static List<RolDto> listRolToListRolDto(List<Rol> roles){
		return roles.stream().map(RolDto::rolToRolDto).collect(Collectors.toList());
	}
	public static List<Rol> listRolDTOToListRol(List<RolDto> rolesDto){
		return rolesDto.stream().map(RolDto::rolDtoToRol).collect(Collectors.toList());
	}
	public static Rol rolDtoToRol(RolDto rolDto) {
		return Rol.builder()
				.id(rolDto.getId())
				.nombre(rolDto.getNombre())
				.build();
	}
}
