# Decision Log

This file records architectural and implementation decisions...

*
## Database Schema

[2025-04-30 07:12:03] - # Initial Supabase Schema Design (Physics App)

```mermaid
erDiagram
    users ||--o{ profiles : "has one"
    profiles ||--o{ user_progress : "tracks"
    profiles ||--o{ quiz_attempts : "takes"

    topics ||--o{ lessons : "contains"
    topics ||--o{ flashcards : "contains"
    topics ||--o{ quizzes : "contains"

    lessons ||--o{ user_progress : "is tracked in"
    quizzes ||--o{ questions : "contains"
    quizzes ||--o{ quiz_attempts : "is attempted in"
    quizzes ||--o{ user_progress : "is tracked in"

    questions ||--o{ answers : "has"
    questions ||--o{ quiz_attempt_answers : "is answered in"

    answers ||--o{ quiz_attempt_answers : "is selected in"

    quiz_attempts ||--o{ quiz_attempt_answers : "records"


    users {
        UUID id PK "Auth User ID"
        -- other auth fields --
    }

    profiles {
        UUID id PK "References auth.users.id"
        TEXT username
        TEXT avatar_url
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }

    topics {
        UUID id PK
        TEXT name "e.g., Classical Mechanics"
        TEXT description
        TEXT slug UK "e.g., classical-mechanics"
        TIMESTAMPTZ created_at
    }

    lessons {
        UUID id PK
        UUID topic_id FK "References topics.id"
        TEXT title
        TEXT content "Could be markdown or JSON"
        INT order "Optional ordering within topic"
        TIMESTAMPTZ created_at
    }

    flashcards {
        UUID id PK
        UUID topic_id FK "References topics.id"
        TEXT front_content "Question/Term"
        TEXT back_content "Answer/Definition"
        TIMESTAMPTZ created_at
    }

    quizzes {
        UUID id PK
        UUID topic_id FK "References topics.id"
        TEXT title
        TEXT description
        TIMESTAMPTZ created_at
    }

    questions {
        UUID id PK
        UUID quiz_id FK "References quizzes.id"
        TEXT question_text
        TEXT question_type "e.g., multiple_choice, true_false"
        JSONB metadata "Optional: hints, explanations"
        TIMESTAMPTZ created_at
    }

    answers {
        UUID id PK
        UUID question_id FK "References questions.id"
        TEXT answer_text
        BOOLEAN is_correct
        TIMESTAMPTZ created_at
    }

    quiz_attempts {
        UUID id PK
        UUID user_id FK "References profiles.id"
        UUID quiz_id FK "References quizzes.id"
        INT score "Calculated score"
        TIMESTAMPTZ started_at
        TIMESTAMPTZ completed_at
        TIMESTAMPTZ created_at
    }

    quiz_attempt_answers {
        UUID id PK
        UUID attempt_id FK "References quiz_attempts.id"
        UUID question_id FK "References questions.id"
        UUID selected_answer_id FK "References answers.id (nullable if no answer given)"
        BOOLEAN is_correct "Denormalized for easier querying"
        TIMESTAMPTZ created_at
    }

    user_progress {
        UUID id PK
        UUID user_id FK "References profiles.id"
        UUID content_id "FK to lessons.id or quizzes.id"
        TEXT content_type "'lesson' or 'quiz'"
        TEXT status "'not_started', 'in_progress', 'completed'"
        JSONB metadata "Optional: score for quiz, last viewed timestamp"
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }

```

**Notes:**

*   Requires trigger/function for `profiles` creation on user signup.
*   `user_progress` uses polymorphic association.
*   `quiz_attempt_answers.is_correct` is denormalized.
*   Requires RLS policies and indexes on FKs.

[2025-04-30 08:26:43] - Refactored Supabase server client creation (`lib/supabase/server.ts`) to accept `cookieStore` as an argument instead of importing `cookies` directly. Updated call sites (`app/page.tsx`, `app/auth/callback/route.ts`, `app/profile/page.tsx`) to pass the `cookieStore` obtained from `next/headers`.
