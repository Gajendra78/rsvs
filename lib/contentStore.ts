export interface Topic {
  id: string;
  title: string;
  type: 'Video' | 'PDF';
  duration: string;
  completed?: boolean;
  videoUrl?: string;
  description?: string;
  lectureBy?: string;
  postedDate?: string;
  isActive?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  title: string;
  exam: string; // Added exam field
  progress?: number;
  chapters: Chapter[];
}

export const INITIAL_DATA: Subject[] = [
  {
    id: 's1',
    title: 'General Studies',
    exam: 'UKSSSC', // Associated Exam
    progress: 45,
    chapters: [
      {
        id: 'c1',
        title: 'Indian History',
        topics: [
          { 
            id: 't1', 
            title: 'Indus Valley Civilization', 
            type: 'Video', 
            duration: '45m', 
            completed: true, 
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'A detailed overview of the Indus Valley Civilization.',
            lectureBy: 'Dr. Sharma',
            postedDate: '2025-10-15',
            isActive: true
          },
          { 
            id: 't2', 
            title: 'Vedic Period', 
            type: 'PDF', 
            duration: '15m', 
            completed: true,
            description: 'Comprehensive notes on the Vedic Period.',
            lectureBy: 'Prof. Verma',
            postedDate: '2025-10-18',
            isActive: true
          },
          { 
            id: 't3', 
            title: 'Mauryan Empire', 
            type: 'Video', 
            duration: '50m', 
            completed: false,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'In-depth analysis of the Mauryan Empire.',
            lectureBy: 'Dr. Sharma',
            postedDate: '2025-10-20',
            isActive: true
          },
        ]
      },
      {
        id: 'c2',
        title: 'Geography',
        topics: [
          { 
            id: 't4', 
            title: 'Physical Geography', 
            type: 'Video', 
            duration: '60m', 
            completed: false,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Introduction to Physical Geography.',
            lectureBy: 'Ms. Gupta',
            postedDate: '2025-11-01',
            isActive: false
          },
        ]
      }
    ]
  },
  {
    id: 's2',
    title: 'Uttarakhand GK',
    exam: 'UKPSC', // Associated Exam
    progress: 10,
    chapters: []
  }
];
