// Data structured as flat database table rows — mirrors schema.sql exactly

export const DB_TABLES = {
  users: {
    columns: ['user_id', 'name', 'bio', 'rating', 'sessions_completed', 'avatar_url'],
    rows: [
      [1, 'Jordan Lee',   'Frontend dev & design nerd. Love teaching web skills and learning creative arts.', 4.8, 17, 'https://api.dicebear.com/9.x/avataaars/svg?seed=jordan'],
      [2, 'Alex Chen',    'CS student passionate about AI and teaching others data science fundamentals.',    4.9, 42, 'https://api.dicebear.com/9.x/avataaars/svg?seed=alex'],
      [3, 'Maria Santos', 'Native Spanish speaker from São Paulo. Teaches conversational Spanish.',           5.0, 28, 'https://api.dicebear.com/9.x/avataaars/svg?seed=maria'],
      [4, 'Dev Patel',    'Musician and engineer. Playing guitar for 12 years, loves sharing music.',        4.7, 31, 'https://api.dicebear.com/9.x/avataaars/svg?seed=dev'],
      [5, 'Priya Nair',   'Visual storyteller. Teaches composition, lighting, and post-processing.',         4.8, 19, 'https://api.dicebear.com/9.x/avataaars/svg?seed=priya'],
      [6, 'Sam Rivera',   'Composer and producer. Started on classical piano, now makes electronic music.',  4.6, 11, 'https://api.dicebear.com/9.x/avataaars/svg?seed=sam'],
      [7, 'Yuki Tanaka',  'Product designer at a startup. Helps developers understand design principles.',   4.9, 35, 'https://api.dicebear.com/9.x/avataaars/svg?seed=yuki'],
    ],
  },

  skills: {
    columns: ['skill_id', 'name', 'category'],
    rows: [
      [1,  'JavaScript',       'Programming'],
      [2,  'React',            'Programming'],
      [3,  'Web Design',       'Design'],
      [4,  'Python',           'Programming'],
      [5,  'Machine Learning', 'Programming'],
      [6,  'Data Science',     'Programming'],
      [7,  'Guitar',           'Music'],
      [8,  'Spanish',          'Languages'],
      [9,  'Photography',      'Photography'],
      [10, 'Piano',            'Music'],
      [11, 'Music Theory',     'Music'],
      [12, 'Songwriting',      'Music'],
      [13, 'UI Design',        'Design'],
      [14, 'Figma',            'Design'],
      [15, 'Design Systems',   'Design'],
      [16, 'Portuguese',       'Languages'],
      [17, 'Cooking',          'Cooking'],
      [18, 'TypeScript',       'Programming'],
      [19, 'Video Editing',    'Photography'],
      [20, 'Lightroom',        'Photography'],
      [21, 'Music Production', 'Music'],
      [22, 'Ableton',          'Music'],
    ],
  },

  skill_offers: {
    columns: ['offer_id', 'user_id', 'skill_id'],
    rows: [
      [1,  1, 1],  [2,  1, 2],  [3,  1, 3],
      [4,  2, 4],  [5,  2, 5],  [6,  2, 6],
      [7,  3, 8],  [8,  3, 16], [9,  3, 17],
      [10, 4, 7],  [11, 4, 11], [12, 4, 12],
      [13, 5, 9],  [14, 5, 19], [15, 5, 20],
      [16, 6, 10], [17, 6, 21], [18, 6, 22],
      [19, 7, 13], [20, 7, 14], [21, 7, 15],
    ],
  },

  skill_requests: {
    columns: ['request_id', 'user_id', 'skill_id'],
    rows: [
      [1,  1, 10], [2,  1, 8],  [3,  1, 9],
      [4,  2, 7],  [5,  2, 8],  [6,  2, 9],
      [7,  3, 4],  [8,  3, 2],  [9,  3, 13],
      [10, 4, 5],  [11, 4, 18], [12, 4, 6],
      [13, 5, 7],  [14, 5, 17], [15, 5, 10],
      [16, 6, 8],  [17, 6, 9],  [18, 6, 3],
      [19, 7, 4],  [20, 7, 2],  [21, 7, 5],
    ],
  },

  sessions: {
    columns: ['session_id', 'teacher_id', 'learner_id', 'skill_name', 'session_date', 'session_time', 'duration_mins', 'status'],
    rows: [
      [1, 3, 1, 'Spanish Conversation',    '2026-04-25', '4:00 PM', 60, 'upcoming'],
      [2, 4, 1, 'Guitar Basics',           '2026-04-27', '6:00 PM', 45, 'upcoming'],
      [3, 2, 1, 'Python Fundamentals',     '2026-04-15', '3:00 PM', 60, 'completed'],
      [4, 5, 1, 'Photography Composition', '2026-04-10', '1:00 PM', 60, 'completed'],
    ],
  },

  matches: {
    columns: ['match_id', 'user1_id', 'user2_id', 'matched_on_skill', 'created_at'],
    rows: [
      [1,  1, 3, 'Spanish',          '2026-04-01 10:00:00'],
      [2,  1, 4, 'Guitar',           '2026-04-02 11:30:00'],
      [3,  1, 5, 'Photography',      '2026-04-03 09:15:00'],
      [4,  1, 6, 'Piano',            '2026-04-04 14:00:00'],
      [5,  2, 4, 'Guitar',           '2026-04-05 16:00:00'],
      [6,  3, 1, 'React',            '2026-04-06 13:00:00'],
      [7,  4, 2, 'Machine Learning', '2026-04-07 10:45:00'],
      [8,  5, 3, 'Cooking',          '2026-04-08 12:00:00'],
      [9,  6, 1, 'Web Design',       '2026-04-09 15:30:00'],
      [10, 7, 2, 'Python',           '2026-04-10 11:00:00'],
    ],
  },
}

export const TABLE_DESCRIPTIONS = {
  users:          'Stores all registered students on the platform.',
  skills:         'Master list of all skills available for teaching or learning.',
  skill_offers:   'Maps which user teaches which skill (many-to-many).',
  skill_requests: 'Maps which user wants to learn which skill (many-to-many).',
  sessions:       'Records all scheduled and completed learning sessions.',
  matches:        'Pairs of users matched for a mutual skill exchange.',
}
