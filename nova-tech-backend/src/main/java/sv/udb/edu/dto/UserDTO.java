package sv.udb.edu.dto;

import sv.udb.edu.model.Role;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class UserDTO {
    private Long id;
    private String username;
    private List<String> roles;

    public UserDTO(Long id, String username, Set<Role> roles) {
        this.id = id;
        this.username = username;
        this.roles = roles.stream().map(Enum::name).collect(Collectors.toList());
    }

    // getters y setters
}
