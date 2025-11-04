package sv.udb.edu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.udb.edu.model.Project;
import sv.udb.edu.repository.ProjectRepository;

import java.util.List;


@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepo;

    @GetMapping
    public ResponseEntity<List<Project>> all() {
        return ResponseEntity.ok(projectRepo.findAll());
    }

    @PostMapping
    public ResponseEntity<Project> create(@RequestBody Project p) {
        return ResponseEntity.ok(projectRepo.save(p));
    }
}
