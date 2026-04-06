package com.example.springapp.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.Skill;
import com.example.springapp.service.SkillService;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public ResponseEntity<Skill> addSkill(@RequestBody Skill skill, Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(skillService.addSkill(skill, getAuthenticatedEmail(principal)));
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getSkills(Principal principal) {
        return ResponseEntity.ok(skillService.getMySkills(getAuthenticatedEmail(principal)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteSkill(@PathVariable Long id, Principal principal) {
        skillService.deleteSkill(id, getAuthenticatedEmail(principal));
        return ResponseEntity.ok(Map.of("message", "Skill deleted successfully"));
    }

    private String getAuthenticatedEmail(Principal principal) {
        if (principal == null || principal.getName() == null || principal.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }
        return principal.getName();
    }
}
