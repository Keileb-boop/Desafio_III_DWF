package sv.udb.edu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sv.udb.edu.model.Role;
import sv.udb.edu.model.User;
import sv.udb.edu.repository.UserRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        List<User> allUsers = userRepo.findAll();

        // Log para ver todos los usuarios de la BD
        System.out.println("=== Todos los usuarios en BD ===");
        allUsers.forEach(u -> System.out.println("Usuario: " + u.getUsername() + ", Roles: " + u.getRoles()));

        // Filtra solo usuarios normales
        List<UserDTO> normalUsers = allUsers.stream()
                .filter(u -> u.getRoles().stream()
                        .anyMatch(r -> r == Role.ROLE_USER))
                .map(u -> new UserDTO(u.getId(), u.getUsername(), u.getRoles()))
                .collect(Collectors.toList());

        // Log para ver los usuarios normales que se retornarán
        System.out.println("=== Usuarios normales retornados ===");
        normalUsers.forEach(u -> System.out.println("Normal: " + u.username() + ", Roles: " + u.roles()));

        return normalUsers;
    }

    // DTO simple para no exponer passwords
    public record UserDTO(Long id, String username, Set<Role> roles) {}
}
