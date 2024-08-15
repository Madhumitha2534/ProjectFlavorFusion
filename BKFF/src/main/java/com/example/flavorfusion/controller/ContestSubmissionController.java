package com.example.flavorfusion.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.flavorfusion.model.ContestSubmission;
import com.example.flavorfusion.service.ContestSubmissionService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/registrations")
public class ContestSubmissionController {

    @Autowired
    private ContestSubmissionService service;

    @GetMapping("/check")
    public ResponseEntity<?> checkRegistration(
            @RequestParam String contestName,
            @RequestParam String participantName,
            @RequestParam String phoneNumber) {

        boolean exists = service.checkIfRegistered(contestName, participantName, phoneNumber);
        return ResponseEntity.ok().body(Map.of("exists", exists));
    }

    @PostMapping
    public ResponseEntity<ContestSubmission> submitRegistration(@RequestBody ContestSubmission submission) {
        ContestSubmission savedSubmission = service.saveSubmission(submission);
        return ResponseEntity.ok(savedSubmission);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ContestSubmission>> getAllSubmissions() {
        List<ContestSubmission> submissions = service.getAllSubmissions();
        return ResponseEntity.ok(submissions);
    }

    // New endpoint to delete a submission by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubmission(@PathVariable Long id) {
        service.deleteSubmission(id);
        return ResponseEntity.noContent().build();
    }
}
