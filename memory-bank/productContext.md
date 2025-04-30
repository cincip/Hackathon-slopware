# Product Context

This file provides a high-level overview...

*
## System Design

[2025-04-30 07:11:39] - # Initial Backend Requirements & Schema Design (Physics App)

## Backend Requirements:

*   **User Authentication & Profiles:** Supabase Auth, user profiles (username, avatar).
*   **Content Management:** Topics, Lessons (text/markdown), Flashcards (front/back), Quizzes, Questions (text, type, answers), Correct Answers.
*   **Quiz Functionality:** Record attempts, store selected answers, calculate scores.
*   **Progress Tracking:** Lesson completion, quiz performance.
*   **Data Relationships:** Link users, topics, lessons, flashcards, quizzes, questions.

## Potential Edge Functions:

*   `calculate_quiz_score`: On quiz completion.
*   `update_user_progress`: On lesson/quiz completion.
