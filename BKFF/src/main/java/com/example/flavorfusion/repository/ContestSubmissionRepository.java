package com.example.flavorfusion.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.flavorfusion.model.ContestSubmission;

public interface ContestSubmissionRepository extends JpaRepository<ContestSubmission, Long> {
    // Custom query to check if the participant has already registered for the contest
    boolean existsByContestNameAndParticipantNameAndPhoneNumber(String contestName, String participantName, String phoneNumber);
}
