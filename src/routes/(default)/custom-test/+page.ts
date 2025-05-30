export const load = async () => {
  // We're only providing the recommendations, the questions will be loaded from the user's uploaded CSV
  return {
    recommendations: {
      intj: ['Artificial Intelligence', 'Data Science', 'Algorithms', 'Systems Architecture'],
      intp: [
        'Theoretical Computer Science',
        'Research',
        'Programming language design',
        'Machine Learning'
      ],
      entj: [
        'IT Project Management',
        'Enterprise Architecture',
        'Systems Analysis',
        'Business Intelligence'
      ],
      entp: [
        'Innovation Research',
        'Technology Entrepreneurship',
        'Systems Design',
        'Emerging Technologies'
      ],
      infj: ['Digital Ethics', 'Information Science', 'UX Research', 'Educational Technology'],
      infp: ['UI/UX design', 'Human-Computer Interaction', 'Game Development', 'Digital media'],
      enfj: [
        'Information Systems Management',
        'Technology Training',
        'Digital Marketing',
        'Knowledge Management'
      ],
      enfp: [
        'Creative Technology',
        'Digital Content Creation',
        'User Experience',
        'Interactive Media'
      ],
      istj: ['Cybersecurity', 'Database Administration', 'Software QA', 'Systems Administration'],
      isfj: ['Data Management', 'IT support', 'Technical Documentation', 'Digital Librarianship'],
      estj: [
        'IT Operations Management',
        'Information Systems Security',
        'Enterprise Systems',
        'Technical Project Management'
      ],
      esfj: [
        'Customer Relationship Management Systems',
        'IT Service Management',
        'Technical Account Management',
        'Digital Communication'
      ],
      istp: ['Network Engineering', 'Hardware Development', 'Penetration testing', 'Robotics'],
      isfp: ['Digital Design', 'Web Development', 'Multimedia', 'Mobile App Development'],
      estp: [
        'Technical Sales',
        'Technology Implementation',
        'IT Consultancy',
        'Systems Integration'
      ],
      esfp: [
        'Technology Demonstration',
        'Technical Support',
        'Social Media Technology',
        'Digital Marketing Systems'
      ]
    },
    questions: [] // Empty array as we'll be using user-uploaded questions
  };
};
