export const initialCV = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main Street, City, Country',
    website: 'johndoeportfolio.com',
    summary: 'Experienced software developer with 5+ years in web application development. Passionate about creating efficient, scalable solutions and continuous learning.'
  },
  education: [
    {
      id: 1,
      school: 'Stanford University',
      degree: 'Master of Science in Computer Science',
      startDate: '2015-09',
      endDate: '2017-06',
      description: 'Specialized in Artificial Intelligence and Machine Learning. Graduated with honors.'
    },
    {
      id: 2,
      school: 'MIT',
      degree: 'Bachelor of Science in Software Engineering',
      startDate: '2011-09',
      endDate: '2015-06',
      description: 'Minor in Mathematics. President of Computer Science Club.'
    }
  ],
  experience: [
    {
      id: 1,
      company: 'Tech Innovations Inc.',
      position: 'Senior Software Engineer',
      startDate: '2020-03',
      endDate: 'Present',
      description: 'Lead development of cloud-based SaaS platform. Manage team of 5 developers. Implemented microservices architecture reducing latency by 40%.'
    },
    {
      id: 2,
      company: 'Digital Solutions LLC',
      position: 'Full Stack Developer',
      startDate: '2017-07',
      endDate: '2020-02',
      description: 'Developed and maintained multiple web applications using React and Node.js. Improved application performance by 60%.'
    },
    {
      id: 3,
      company: 'StartUp XYZ',
      position: 'Junior Web Developer',
      startDate: '2015-07',
      endDate: '2017-06',
      description: 'Built responsive websites and implemented new features. Collaborated with design team to create user-friendly interfaces.'
    }
  ],
  skills: [
    { id: 1, name: 'JavaScript', level: 90 },
    { id: 2, name: 'React', level: 85 },
    { id: 3, name: 'Node.js', level: 80 },
    { id: 4, name: 'Python', level: 75 },
    { id: 5, name: 'AWS', level: 70 },
    { id: 6, name: 'Docker', level: 65 },
    { id: 7, name: 'MongoDB', level: 80 },
    { id: 8, name: 'Git', level: 90 }
  ]
};

export const emptyCV = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    summary: ''
  },
  education: [],
  experience: [],
  skills: []
};
