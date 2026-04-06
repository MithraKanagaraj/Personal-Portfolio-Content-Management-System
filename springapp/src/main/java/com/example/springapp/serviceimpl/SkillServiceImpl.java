package com.example.springapp.serviceimpl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.Skill;
import com.example.springapp.entity.User;
import com.example.springapp.repository.SkillRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.SkillService;

@Service
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    public SkillServiceImpl(SkillRepository skillRepository, UserRepository userRepository) {
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Skill addSkill(Skill skill, String email) {
        if (skill == null || !StringUtils.hasText(skill.getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Skill name is required");
        }

        User user = getUserByEmail(email);
        skill.setId(null);
        skill.setUser(user);
        skill.setName(skill.getName().trim());
        skill.setLevel(trimToNull(skill.getLevel()));
        return skillRepository.save(skill);
    }

    @Override
    public List<Skill> getMySkills(String email) {
        User user = getUserByEmail(email);
        return skillRepository.findByUser(user);
    }

    @Override
    public void deleteSkill(Long id, String email) {
        User user = getUserByEmail(email);
        Skill skill = skillRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill not found for this user"));
        skillRepository.delete(skill);
    }

    private User getUserByEmail(String email) {
        if (!StringUtils.hasText(email)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private String trimToNull(String value) {
        if (!StringUtils.hasText(value)) {
            return null;
        }
        return value.trim();
    }
}
