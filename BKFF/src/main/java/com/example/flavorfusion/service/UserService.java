//package com.example.flavorfusion.service;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.example.flavorfusion.model.User;
//import com.example.flavorfusion.repository.UserRepository;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    public User postData(User data) {
//        return userRepository.save(data);
//    }
//
//    public Optional<User> login(String email, String password) {
//        return userRepository.findByEmailAndPassword(email, password);
//    }
//
//    public Optional<User> getUserByEmail(String email) {
//        return userRepository.findByEmail(email);
//    }
////    public Optional<User> getUserById(Long id) {
////        return userRepository.findById(id);
////    }
////    public Optional<User> getUserById(Long userId) {
////        return userRepository.findById(userId);
////    }
//
//}

package com.example.flavorfusion.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.flavorfusion.model.User;
import com.example.flavorfusion.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User postData(User data) {
        return userRepository.save(data);
    }

    public Optional<User> login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll(); // Assuming you have a UserRepository that extends JpaRepository
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

