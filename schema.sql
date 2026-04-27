-- SkillLink Database Schema
-- Course: Database Management Systems (21CSC205P)
-- SRM Institute of Science and Technology

CREATE DATABASE IF NOT EXISTS skill_link;
USE skill_link;

-- ─────────────────────────────────────────────
-- Table 1: users
-- ─────────────────────────────────────────────
CREATE TABLE users (
  user_id            INT PRIMARY KEY AUTO_INCREMENT,
  name               VARCHAR(100)   NOT NULL,
  bio                TEXT,
  rating             DECIMAL(2, 1)  NOT NULL DEFAULT 0.0,
  sessions_completed INT            NOT NULL DEFAULT 0,
  avatar_url         VARCHAR(255)
);

-- ─────────────────────────────────────────────
-- Table 2: skills
-- ─────────────────────────────────────────────
CREATE TABLE skills (
  skill_id   INT PRIMARY KEY AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  category   VARCHAR(50)  NOT NULL
);

-- ─────────────────────────────────────────────
-- Table 3: skill_offers  (who teaches what)
-- ─────────────────────────────────────────────
CREATE TABLE skill_offers (
  offer_id   INT PRIMARY KEY AUTO_INCREMENT,
  user_id    INT NOT NULL,
  skill_id   INT NOT NULL,
  FOREIGN KEY (user_id)  REFERENCES users(user_id)  ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────
-- Table 4: skill_requests  (who wants to learn what)
-- ─────────────────────────────────────────────
CREATE TABLE skill_requests (
  request_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id    INT NOT NULL,
  skill_id   INT NOT NULL,
  FOREIGN KEY (user_id)  REFERENCES users(user_id)  ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────
-- Table 5: sessions
-- ─────────────────────────────────────────────
CREATE TABLE sessions (
  session_id     INT PRIMARY KEY AUTO_INCREMENT,
  teacher_id     INT NOT NULL,
  learner_id     INT NOT NULL,
  skill_name     VARCHAR(100) NOT NULL,
  session_date   DATE         NOT NULL,
  session_time   VARCHAR(20)  NOT NULL,
  duration_mins  INT          NOT NULL,
  status         ENUM('upcoming', 'completed', 'cancelled') NOT NULL DEFAULT 'upcoming',
  FOREIGN KEY (teacher_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (learner_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────
-- Table 6: matches
-- ─────────────────────────────────────────────
CREATE TABLE matches (
  match_id         INT PRIMARY KEY AUTO_INCREMENT,
  user1_id         INT          NOT NULL,
  user2_id         INT          NOT NULL,
  matched_on_skill VARCHAR(100) NOT NULL,
  created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user1_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (user2_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ═════════════════════════════════════════════
-- SAMPLE DATA
-- ═════════════════════════════════════════════

INSERT INTO users (name, bio, rating, sessions_completed, avatar_url) VALUES
  ('Jordan Lee',   'Frontend dev & design nerd. Love teaching web skills and learning creative arts.', 4.8, 17, 'https://api.dicebear.com/9.x/avataaars/svg?seed=jordan'),
  ('Alex Chen',    'CS student passionate about AI and teaching others data science fundamentals.',     4.9, 42, 'https://api.dicebear.com/9.x/avataaars/svg?seed=alex'),
  ('Maria Santos', 'Native Spanish speaker from São Paulo. Teaches conversational Spanish.',            5.0, 28, 'https://api.dicebear.com/9.x/avataaars/svg?seed=maria'),
  ('Dev Patel',    'Musician and engineer. Playing guitar for 12 years, loves sharing music.',         4.7, 31, 'https://api.dicebear.com/9.x/avataaars/svg?seed=dev'),
  ('Priya Nair',   'Visual storyteller. Teaches composition, lighting, and post-processing.',          4.8, 19, 'https://api.dicebear.com/9.x/avataaars/svg?seed=priya'),
  ('Sam Rivera',   'Composer and producer. Started on classical piano, now makes electronic music.',   4.6, 11, 'https://api.dicebear.com/9.x/avataaars/svg?seed=sam'),
  ('Yuki Tanaka',  'Product designer at a startup. Helps developers understand design principles.',    4.9, 35, 'https://api.dicebear.com/9.x/avataaars/svg?seed=yuki');

INSERT INTO skills (name, category) VALUES
  ('JavaScript',      'Programming'),
  ('React',           'Programming'),
  ('Web Design',      'Design'),
  ('Python',          'Programming'),
  ('Machine Learning','Programming'),
  ('Data Science',    'Programming'),
  ('Guitar',          'Music'),
  ('Spanish',         'Languages'),
  ('Photography',     'Photography'),
  ('Piano',           'Music'),
  ('Music Theory',    'Music'),
  ('Songwriting',     'Music'),
  ('UI Design',       'Design'),
  ('Figma',           'Design'),
  ('Design Systems',  'Design'),
  ('Portuguese',      'Languages'),
  ('Cooking',         'Cooking'),
  ('TypeScript',      'Programming'),
  ('Video Editing',   'Photography'),
  ('Lightroom',       'Photography'),
  ('Music Production','Music'),
  ('Ableton',         'Music');

-- skill_offers: Jordan teaches JS(1), React(2), Web Design(3)
INSERT INTO skill_offers (user_id, skill_id) VALUES
  (1, 1), (1, 2), (1, 3),   -- Jordan
  (2, 4), (2, 5), (2, 6),   -- Alex
  (3, 8), (3, 16),(3, 17),  -- Maria
  (4, 7), (4, 11),(4, 12),  -- Dev
  (5, 9), (5, 19),(5, 20),  -- Priya
  (6, 10),(6, 21),(6, 22),  -- Sam
  (7, 13),(7, 14),(7, 15);  -- Yuki

-- skill_requests: Jordan wants Piano(10), Spanish(8), Photography(9)
INSERT INTO skill_requests (user_id, skill_id) VALUES
  (1, 10),(1, 8), (1, 9),   -- Jordan
  (2, 7), (2, 8), (2, 9),   -- Alex
  (3, 4), (3, 2), (3, 13),  -- Maria
  (4, 5), (4, 18),(4, 6),   -- Dev
  (5, 7), (5, 17),(5, 10),  -- Priya
  (6, 8), (6, 9), (6, 3),   -- Sam
  (7, 4), (7, 2), (7, 5);   -- Yuki

INSERT INTO sessions (teacher_id, learner_id, skill_name, session_date, session_time, duration_mins, status) VALUES
  (3, 1, 'Spanish Conversation',    '2026-04-25', '4:00 PM', 60, 'upcoming'),
  (4, 1, 'Guitar Basics',           '2026-04-27', '6:00 PM', 45, 'upcoming'),
  (2, 1, 'Python Fundamentals',     '2026-04-15', '3:00 PM', 60, 'completed'),
  (5, 1, 'Photography Composition', '2026-04-10', '1:00 PM', 60, 'completed');

INSERT INTO matches (user1_id, user2_id, matched_on_skill, created_at) VALUES
  (1, 3, 'Spanish',         '2026-04-01 10:00:00'),
  (1, 4, 'Guitar',          '2026-04-02 11:30:00'),
  (1, 5, 'Photography',     '2026-04-03 09:15:00'),
  (1, 6, 'Piano',           '2026-04-04 14:00:00'),
  (2, 4, 'Guitar',          '2026-04-05 16:00:00'),
  (3, 1, 'React',           '2026-04-06 13:00:00'),
  (4, 2, 'Machine Learning','2026-04-07 10:45:00'),
  (5, 3, 'Cooking',         '2026-04-08 12:00:00'),
  (6, 1, 'Web Design',      '2026-04-09 15:30:00'),
  (7, 2, 'Python',          '2026-04-10 11:00:00');
