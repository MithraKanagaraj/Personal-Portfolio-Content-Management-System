
package com.example.springapp.controller;

import com.example.springapp.entity.Skill;
import com.example.springapp.service.SkillService;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin("*")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public Skill addSkill(@RequestBody Skill skill, Principal principal) {
        return skillService.addSkill(skill, principal.getName());
    }

    @GetMapping
    public List<Skill> getSkills(Principal principal) {
        return skillService.getMySkills(principal.getName());
    }

    @DeleteMapping("/{id}")
    public String deleteSkill(@PathVariable Long id, Principal principal) {
        skillService.deleteSkill(id, principal.getName());
        return "Deleted";
    }
}