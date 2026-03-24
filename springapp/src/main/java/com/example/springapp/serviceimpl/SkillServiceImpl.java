package com.example.springapp.serviceimpl;



import com.example.springapp.entity.Skill;
import com.example.springapp.entity.User;
import com.example.springapp.repository.SkillRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.SkillService;

import org.springframework.stereotype.Service;

import java.util.List;

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
        User user = userRepository.findByEmail(email).orElseThrow();
        skill.setUser(user);
        return skillRepository.save(skill);
    }

    @Override
    public List<Skill> getMySkills(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return skillRepository.findByUser(user);
    }

    @Override
    public void deleteSkill(Long id, String email) {
        skillRepository.deleteById(id);
    }
}