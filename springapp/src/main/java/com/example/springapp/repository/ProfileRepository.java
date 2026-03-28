package com.example.springapp.repository;




import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springapp.entity.Profile;
import com.example.springapp.entity.User;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUser(User user);
    Optional<Profile> findByUserUsername(String username);
}
// package com.example.springapp.repository;

// import com.example.springapp.entity.Profile;
// import com.example.springapp.entity.User;
// import org.springframework.data.jpa.repository.JpaRepository;

// import java.util.Optional;

// public interface ProfileRepository extends JpaRepository<Profile, Long> {
//     Optional<Profile> findByUser(User user);
// }