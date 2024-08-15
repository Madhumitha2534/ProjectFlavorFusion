package com.example.flavorfusion.service;

public interface PdfService {
    byte[] generatePdf(String contestName, String email);
}
