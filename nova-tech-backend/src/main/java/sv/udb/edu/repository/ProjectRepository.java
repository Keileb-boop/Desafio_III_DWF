package sv.udb.edu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sv.udb.edu.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {}
