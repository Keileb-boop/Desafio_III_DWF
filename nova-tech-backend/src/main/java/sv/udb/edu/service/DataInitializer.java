package sv.udb.edu.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import sv.udb.edu.model.*;
import sv.udb.edu.model.Role;
import sv.udb.edu.repository.ProjectRepository;
import sv.udb.edu.repository.UserRepository;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepo;
    private final ProjectRepository projectRepo;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepo, ProjectRepository projectRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.projectRepo = projectRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Usuario admin
        if (userRepo.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("Admin123!"));
            admin.setRoles(Set.of(Role.ROLE_ADMIN));
            userRepo.save(admin);
        }

        // Usuario calebp con rol de usuario normal
        if (userRepo.findByUsername("calebp").isEmpty()) {
            User caleb = new User();
            caleb.setUsername("calebp");
            caleb.setPassword(passwordEncoder.encode("lamejorcontrasenadelmundo"));
            caleb.setRoles(Set.of(Role.ROLE_USER)); // o ROLE_USER según tu enum
            userRepo.save(caleb);
        }

        //y aqui voy a insertar usuarios con roles de usuario normal
        if (userRepo.findByUsername("Camila Castillo").isEmpty()) {
            User camila = new User();
            camila.setUsername("Camila Castillo");
            camila.setPassword(passwordEncoder.encode("Camila1234"));
            camila.setRoles(Set.of(Role.ROLE_USER)); // o ROLE_USER según tu enum
            userRepo.save(camila);
        }
        //usuario de camila

        //segundo usuario normal
        if (userRepo.findByUsername("Miguel Alejandro").isEmpty()) {
            User miguel = new User();
            miguel.setUsername("Miguel Alejandro");
            miguel.setPassword(passwordEncoder.encode("Miguel1234"));
            miguel.setRoles(Set.of(Role.ROLE_USER)); // o ROLE_USER según tu enum
            userRepo.save(miguel);
        }

        // Proyecto inicial
        if (projectRepo.count() == 0) {
            Project p = new Project();
            p.setName("Proyecto Inicial");
            p.setDescription("Proyecto de ejemplo para probar API protegida");
            projectRepo.save(p);
        }
    }
}
