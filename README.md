# International Payments Portal

A secure customer portal for international payments, built with React, Node.js/Express, and MongoDB.

## Password Security

The system implements industry-standard password security mechanisms to
protect user credentials and prevent unauthorised access.

### Password Complexity
Passwords are validated using a regular expression that enforces:
- Minimum length of 8 characters
- Uppercase and lowercase letters
- Numeric characters
- Special characters

This reduces susceptibility to brute-force and dictionary attacks.

### Password Hashing and Salting
All passwords are hashed using the bcrypt algorithm before being stored.
Bcrypt automatically applies salting, ensuring that identical passwords
produce different hashes and protecting against rainbow table attacks.

A configurable salt cost factor is used to increase computational effort
required for password cracking.

### Secure Authentication
During login, user-submitted passwords are compared to stored hashes using
bcrypt’s secure comparison method. Plaintext passwords are never stored,
logged, or transmitted.

### Static User Seeding
Preconfigured customer and employee accounts are seeded using bcrypt-hashed
passwords, ensuring that no plaintext credentials exist within the database.

This approach ensures confidentiality, integrity, and resilience against
common authentication-based attacks.

## DevSecOps Pipeline

This project implements a DevSecOps pipeline using CircleCI to ensure that
security checks are automatically executed on every code push.

### Pipeline Overview
The CI pipeline is triggered whenever code is pushed to the repository.
It enforces security and quality controls before the application is allowed
to proceed.

### Security Measures Implemented

**Static Application Security Testing (SAST):**
SonarQube configuration is used to analyse the codebase for potential
security vulnerabilities, code smells, and maintainability issues.

**Software Composition Analysis (SCA):**
Dependency vulnerabilities are detected using `npm audit`, ensuring that
third-party libraries with known security issues are identified early.

**API Security and Availability Testing:**
The backend application is started within the CI pipeline and a health
endpoint is tested to verify that the API is running correctly and securely.

**Fail-Fast Principle:**
If any security or dependency checks fail, the pipeline stops immediately,
preventing insecure code from progressing further.

This DevSecOps approach ensures that security is integrated throughout the
development lifecycle rather than being addressed after deployment.

## Setup
1. Install Node.js, MongoDB, and Git.
2. Run `.net ` for the backend.
3. Run `cd frontend && npm install && npm start` for the frontend.
4. Update `.env` with MongoDB URI.

## Video Demo
https://youtu.be/A5QENa4mW5I