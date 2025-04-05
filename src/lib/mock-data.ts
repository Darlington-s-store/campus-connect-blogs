
import { User, Post, Comment, Category, Tag, UserRole } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Dr. Alex Johnson',
    email: 'alex.johnson@campus.edu',
    role: 'educator',
    avatar: 'https://i.pravatar.cc/150?img=11',
    bio: 'Professor of Computer Science with 15 years of experience in AI and machine learning.',
    createdAt: new Date('2023-01-01'),
    interests: ['AI', 'Machine Learning', 'Education Technology'],
    following: ['2', '4'],
    followers: ['2', '3', '5']
  },
  {
    id: '2',
    name: 'Emma Smith',
    email: 'emma.smith@campus.edu',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Third-year Computer Science student passionate about web development and UX design.',
    createdAt: new Date('2023-02-15'),
    interests: ['Web Development', 'UX Design', 'Programming'],
    following: ['1', '3'],
    followers: ['1', '4']
  },
  {
    id: '3',
    name: 'Prof. Samantha Lee',
    email: 'samantha.lee@campus.edu',
    role: 'educator',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: 'Department Chair of Environmental Science, researching sustainable urban development.',
    createdAt: new Date('2022-12-10'),
    interests: ['Environmental Science', 'Sustainability', 'Urban Planning'],
    following: ['1'],
    followers: ['2', '5']
  },
  {
    id: '4',
    name: 'Marcus Chen',
    email: 'marcus.chen@campus.edu',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Graduate student in Physics, focusing on quantum computing applications.',
    createdAt: new Date('2023-03-20'),
    interests: ['Physics', 'Quantum Computing', 'Mathematics'],
    following: ['1', '5'],
    followers: ['2']
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@campus.edu',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'System administrator and moderator for Campus Connect.',
    createdAt: new Date('2022-01-01'),
    interests: ['System Administration', 'Education Technology'],
    following: ['3'],
    followers: ['1', '4']
  }
];

// Mock Categories
export const categories: Category[] = [
  { id: '1', name: 'Computer Science', description: 'All topics related to computing and programming' },
  { id: '2', name: 'Environmental Science', description: 'Studies focused on the environment and sustainability' },
  { id: '3', name: 'Physics', description: 'Exploring the fundamental laws of the universe' },
  { id: '4', name: 'Mathematics', description: 'Pure and applied mathematical concepts' },
  { id: '5', name: 'Literature', description: 'Analysis and discussions of literary works' },
  { id: '6', name: 'Research Methodology', description: 'Best practices in academic research' }
];

// Mock Tags
export const tags: Tag[] = [
  { id: '1', name: 'AI' },
  { id: '2', name: 'Machine Learning' },
  { id: '3', name: 'Sustainability' },
  { id: '4', name: 'Quantum Computing' },
  { id: '5', name: 'Programming' },
  { id: '6', name: 'Research' },
  { id: '7', name: 'Education' },
  { id: '8', name: 'Web Development' },
  { id: '9', name: 'Climate Change' },
  { id: '10', name: 'Data Science' },
  { id: '11', name: 'Ethics' },
  { id: '12', name: 'Technology' }
];

// Mock Comments
export const comments: Comment[] = [
  {
    id: '1',
    content: 'This is a fascinating perspective on AI ethics. I\'d love to see more research in this area.',
    authorId: '2',
    postId: '1',
    createdAt: new Date('2023-06-15T14:24:00'),
    updatedAt: new Date('2023-06-15T14:24:00'),
    likes: 5
  },
  {
    id: '2',
    content: 'Have you considered the implications of quantum computing on current encryption methods? This could be a great follow-up topic.',
    authorId: '4',
    postId: '1',
    createdAt: new Date('2023-06-16T09:12:00'),
    updatedAt: new Date('2023-06-16T09:42:00'),
    likes: 3
  },
  {
    id: '3',
    content: 'Your explanation of urban sustainability metrics really helped clarify my understanding. Thank you!',
    authorId: '2',
    postId: '2',
    createdAt: new Date('2023-06-17T16:05:00'),
    updatedAt: new Date('2023-06-17T16:05:00'),
    likes: 7
  },
  {
    id: '4',
    content: 'I\'m applying some of these techniques in my own research. Would love to discuss methodology further.',
    authorId: '1',
    postId: '3',
    createdAt: new Date('2023-06-18T11:30:00'),
    updatedAt: new Date('2023-06-18T11:30:00'),
    likes: 4
  },
  {
    id: '5',
    content: 'This connects really well with the paper we discussed in last week\'s seminar. Great insights!',
    authorId: '3',
    postId: '4',
    createdAt: new Date('2023-06-19T15:45:00'),
    updatedAt: new Date('2023-06-19T15:45:00'),
    likes: 6
  }
];

// Mock Posts
export const posts: Post[] = [
  {
    id: '1',
    title: 'The Future of AI in Education',
    content: `
      <h1>The Future of AI in Education</h1>
      <p>Artificial intelligence is transforming how we teach and learn in higher education. This post explores current trends and future possibilities.</p>
      <h2>Current Applications</h2>
      <p>AI is already being used in various educational contexts:</p>
      <ul>
        <li>Personalized learning paths</li>
        <li>Automated grading systems</li>
        <li>Student performance analytics</li>
        <li>Intelligent tutoring systems</li>
      </ul>
      <h2>Ethical Considerations</h2>
      <p>As we implement these technologies, we must consider:</p>
      <ol>
        <li>Data privacy concerns</li>
        <li>Algorithmic bias and fairness</li>
        <li>The changing role of educators</li>
        <li>Accessibility and digital divide issues</li>
      </ol>
      <h2>Future Directions</h2>
      <p>Looking ahead, we can anticipate AI's role in:</p>
      <ul>
        <li>Creating more immersive learning experiences</li>
        <li>Democratizing access to quality education</li>
        <li>Supporting lifelong learning models</li>
        <li>Enabling more collaborative learning environments</li>
      </ul>
      <blockquote>
        <p>"The true power of AI in education lies not in replacing teachers, but in amplifying their capabilities and fostering more meaningful human connections in learning."</p>
      </blockquote>
      <p>What are your thoughts on AI's role in education? How do you see it changing your learning or teaching experience?</p>
    `,
    excerpt: 'Artificial intelligence is transforming how we teach and learn in higher education. This post explores current trends and future possibilities.',
    authorId: '1',
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-12'),
    publishedAt: new Date('2023-06-12'),
    isDraft: false,
    tags: ['AI', 'Education', 'Technology', 'Ethics'],
    category: 'Computer Science',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800',
    likes: 42,
    comments: [],
    isPublished: true
  },
  {
    id: '2',
    title: 'Sustainable Urban Development: Case Studies',
    content: `
      <h1>Sustainable Urban Development: Case Studies</h1>
      <p>This post examines successful sustainable urban development projects and extracts key principles that can be applied to future planning.</p>
      <h2>Copenhagen: A Model for Urban Sustainability</h2>
      <p>Copenhagen has implemented numerous initiatives that have transformed it into one of the world's most sustainable cities:</p>
      <ul>
        <li>Comprehensive cycling infrastructure</li>
        <li>Integrated renewable energy systems</li>
        <li>Green roof policies</li>
        <li>Efficient waste management</li>
      </ul>
      <h2>Singapore: Urban Greenery Integration</h2>
      <p>Singapore demonstrates how dense urban environments can incorporate natural elements:</p>
      <ul>
        <li>Gardens by the Bay urban park</li>
        <li>Vertical gardens on high-rise buildings</li>
        <li>ABC Waters Programme for water management</li>
      </ul>
      <h2>Key Principles for Implementation</h2>
      <ol>
        <li>Integrated policy approaches</li>
        <li>Public-private partnerships</li>
        <li>Community engagement and education</li>
        <li>Long-term planning with short-term action items</li>
        <li>Measurable sustainability metrics</li>
      </ol>
      <p>The case studies presented demonstrate that sustainable urban development requires comprehensive planning, strong policy frameworks, and community buy-in.</p>
    `,
    excerpt: 'This post examines successful sustainable urban development projects and extracts key principles that can be applied to future planning.',
    authorId: '3',
    createdAt: new Date('2023-06-05'),
    updatedAt: new Date('2023-06-08'),
    publishedAt: new Date('2023-06-08'),
    isDraft: false,
    tags: ['Sustainability', 'Urban Planning', 'Climate Change', 'Research'],
    category: 'Environmental Science',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800',
    likes: 37,
    comments: [],
    isPublished: true
  },
  {
    id: '3',
    title: 'Introduction to Quantum Computing Principles',
    content: `
      <h1>Introduction to Quantum Computing Principles</h1>
      <p>This post provides an accessible introduction to quantum computing concepts for computer science students.</p>
      <h2>Quantum Bits (Qubits)</h2>
      <p>Unlike classical bits, quantum bits or "qubits" can exist in multiple states simultaneously due to superposition:</p>
      <ul>
        <li>Classical bit: Either 0 or 1</li>
        <li>Qubit: Can be 0, 1, or a superposition of both states</li>
      </ul>
      <h2>Quantum Entanglement</h2>
      <p>Entanglement allows qubits to be correlated in ways that have no classical equivalent. When qubits are entangled, the state of one qubit can depend on the state of another, regardless of the distance between them.</p>
      <h2>Quantum Algorithms</h2>
      <p>Several quantum algorithms demonstrate potential advantages over classical algorithms:</p>
      <ul>
        <li>Shor's algorithm: Efficiently factors large numbers</li>
        <li>Grover's algorithm: Provides quadratic speedup for search problems</li>
        <li>Quantum Fourier Transform: Foundation for many quantum algorithms</li>
      </ul>
      <h2>Current Challenges</h2>
      <p>Despite progress, significant challenges remain:</p>
      <ul>
        <li>Quantum decoherence</li>
        <li>Error correction</li>
        <li>Scaling to useful qubit counts</li>
      </ul>
      <p>Next week, we'll explore potential applications of quantum computing in cryptography and drug discovery.</p>
    `,
    excerpt: 'This post provides an accessible introduction to quantum computing concepts for computer science students.',
    authorId: '4',
    createdAt: new Date('2023-06-14'),
    updatedAt: new Date('2023-06-14'),
    publishedAt: new Date('2023-06-14'),
    isDraft: false,
    tags: ['Quantum Computing', 'Physics', 'Computer Science', 'Technology'],
    category: 'Physics',
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800',
    likes: 29,
    comments: [],
    isPublished: true
  },
  {
    id: '4',
    title: 'Effective Research Methods for Undergraduate Students',
    content: `
      <h1>Effective Research Methods for Undergraduate Students</h1>
      <p>This guide aims to help undergraduate students develop strong research skills applicable across various disciplines.</p>
      <h2>Defining Your Research Question</h2>
      <p>A well-crafted research question is fundamental to successful research:</p>
      <ul>
        <li>Specific and focused</li>
        <li>Answerable within your constraints</li>
        <li>Relevant to your field</li>
        <li>Interesting to you and your audience</li>
      </ul>
      <h2>Literature Review Strategies</h2>
      <ol>
        <li>Start with review articles and meta-analyses</li>
        <li>Use academic databases effectively (Google Scholar, JSTOR, etc.)</li>
        <li>Track citations forward and backward</li>
        <li>Organize your findings systematically</li>
      </ol>
      <h2>Data Collection Methods</h2>
      <p>Choose appropriate methods based on your research question:</p>
      <ul>
        <li>Surveys and questionnaires</li>
        <li>Interviews and focus groups</li>
        <li>Experimental designs</li>
        <li>Observational studies</li>
        <li>Secondary data analysis</li>
      </ul>
      <h2>Analysis and Interpretation</h2>
      <p>Different types of data require different analytical approaches:</p>
      <ul>
        <li>Quantitative: Statistical analysis tools and techniques</li>
        <li>Qualitative: Thematic analysis, coding, and interpretation</li>
        <li>Mixed methods: Integrating both approaches</li>
      </ul>
      <h2>Academic Integrity</h2>
      <p>Always maintain ethical standards in your research:</p>
      <ul>
        <li>Proper citation of sources</li>
        <li>Honest reporting of methods and results</li>
        <li>Appropriate handling of research subjects and data</li>
      </ul>
      <p>Remember, developing strong research skills takes time. Start with smaller projects and build your capabilities gradually.</p>
    `,
    excerpt: 'This guide aims to help undergraduate students develop strong research skills applicable across various disciplines.',
    authorId: '1',
    createdAt: new Date('2023-05-28'),
    updatedAt: new Date('2023-05-30'),
    publishedAt: new Date('2023-05-30'),
    isDraft: false,
    tags: ['Research', 'Education', 'Academic Writing', 'Research Methodology'],
    category: 'Research Methodology',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800',
    likes: 51,
    comments: [],
    isPublished: true
  },
  {
    id: '5',
    title: 'Web Development Trends for 2023',
    content: `
      <h1>Web Development Trends for 2023</h1>
      <p>An exploration of emerging trends and technologies that are shaping web development in 2023.</p>
      <h2>Progressive Web Applications (PWAs)</h2>
      <p>PWAs continue to gain popularity by offering an app-like experience on the web:</p>
      <ul>
        <li>Offline functionality</li>
        <li>Push notifications</li>
        <li>Home screen installation</li>
        <li>Fast loading times</li>
      </ul>
      <h2>WebAssembly (Wasm)</h2>
      <p>WebAssembly is opening new possibilities for high-performance web applications:</p>
      <ul>
        <li>Running languages like C, C++, and Rust in browsers</li>
        <li>Performance-intensive applications like games and CAD software</li>
        <li>Image and video editing capabilities</li>
      </ul>
      <h2>API-First Development</h2>
      <p>More developers are adopting an API-first approach:</p>
      <ul>
        <li>Building APIs as primary application components</li>
        <li>Microservices architecture</li>
        <li>Enabling omnichannel experiences</li>
      </ul>
      <h2>Jamstack Architecture</h2>
      <p>The Jamstack (JavaScript, APIs, and Markup) continues to evolve:</p>
      <ul>
        <li>Pre-rendered content</li>
        <li>Decoupled front-end and back-end</li>
        <li>Enhanced security and performance</li>
      </ul>
      <h2>AI-Driven Development</h2>
      <p>AI tools are transforming how developers work:</p>
      <ul>
        <li>Code generation and completion</li>
        <li>Bug prediction and prevention</li>
        <li>Automated testing and optimization</li>
      </ul>
      <p>As a student studying web development, which of these trends are you most excited about exploring?</p>
    `,
    excerpt: 'An exploration of emerging trends and technologies that are shaping web development in 2023.',
    authorId: '2',
    createdAt: new Date('2023-06-02'),
    updatedAt: new Date('2023-06-03'),
    publishedAt: new Date('2023-06-03'),
    isDraft: false,
    tags: ['Web Development', 'Programming', 'Technology', 'JavaScript'],
    category: 'Computer Science',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800',
    likes: 34,
    comments: [],
    isPublished: true
  },
  {
    id: '6',
    title: 'Building Resilient Academic Communities Post-Pandemic',
    content: 'Draft content about building academic communities...',
    excerpt: 'Examining strategies for rebuilding and strengthening academic communities after the disruptions of the pandemic.',
    authorId: '3',
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2023-06-20'),
    publishedAt: undefined,
    isDraft: true,
    tags: ['Education', 'Community', 'Academic Life', 'Post-Pandemic'],
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800',
    likes: 0,
    comments: [],
    isPublished: false
  }
];

// Populate posts with comments
export const populatedPosts: Post[] = posts.map(post => {
  const postComments = comments.filter(comment => comment.postId === post.id);
  
  // Populate comments with author
  const populatedComments = postComments.map(comment => {
    const author = users.find(user => user.id === comment.authorId);
    return { ...comment, author };
  });
  
  // Populate post with author and comments
  const author = users.find(user => user.id === post.authorId);
  return { ...post, author, comments: populatedComments };
});

// Current user (for demo purposes)
export const currentUser: User | null = users[1]; // Emma Smith (student)

// Authentication utilities for mock system
export const auth = {
  login: (email: string, password: string): User | null => {
    // For demo purposes, any combo with matching user email works
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    return user || null;
  },
  register: (name: string, email: string, password: string, role: UserRole): User => {
    // This would normally validate and create a user in a real system
    const newUser: User = {
      id: `${users.length + 1}`,
      name,
      email,
      role,
      createdAt: new Date(),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    };
    // In a real app we'd add the user to the database
    // users.push(newUser);
    return newUser;
  },
  logout: () => {
    // This would clear auth state
    return true;
  }
};
