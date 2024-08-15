package com.example.flavorfusion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.flavorfusion.model.ContestSubmission;
import com.example.flavorfusion.repository.ContestSubmissionRepository;

@Service
public class ContestSubmissionService {

    @Autowired
    private ContestSubmissionRepository repository;

    public boolean checkIfRegistered(String contestName, String participantName, String phoneNumber) {
        return repository.existsByContestNameAndParticipantNameAndPhoneNumber(contestName, participantName, phoneNumber);
    }

    public ContestSubmission saveSubmission(ContestSubmission submission) {
        return repository.save(submission);
    }

    public List<ContestSubmission> getAllSubmissions() {
        return repository.findAll();
    }

    // New method to delete a submission by ID
    public void deleteSubmission(Long id) {
        repository.deleteById(id);
    }
}
