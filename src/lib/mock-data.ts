import { Post, Comment, User, UserRole } from '../types';
import { mockAuth } from './mock-auth';

// Export the auth service
export const auth = mockAuth;

// Use existing data from mockAuth
export const users = mockAuth.getAllUsers();
export const currentUser = users.find(u => u.email === 'emma.smith@campus.edu');

// Generate mock posts
export const posts: Post[] = [
  {
    id: '1',
    title: 'Introduction to Campus Connect',
    content: '<p>Welcome to Campus Connect! This platform is designed to...</p>',
    excerpt: 'Welcome to Campus Connect! This platform is designed to...',
    authorId: '2', // Alex Johnson (educator)
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
    publishedAt: new Date('2024-03-15'),
    isDraft: false,
    tags: ['welcome', 'introduction'],
    category: 'Announcements',
    likes: 15,
    comments: [],
    isPublished: true,
  },
  {
    id: '2',
    title: 'Tips for Effective Studying',
    content: '<p>Studying can be challenging, but with the right strategies...</p>',
    excerpt: 'Studying can be challenging, but with the right strategies...',
    authorId: '2', // Alex Johnson
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    publishedAt: new Date('2024-03-10'),
    isDraft: false,
    tags: ['study', 'tips', 'education'],
    category: 'Academics',
    likes: 22,
    comments: [],
    isPublished: true,
  },
  {
    id: '3',
    title: 'The Importance of Collaboration in Research',
    content: '<p>Collaboration is key to successful research projects...</p>',
    excerpt: 'Collaboration is key to successful research projects...',
    authorId: '3', // Admin User
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
    publishedAt: new Date('2024-03-05'),
    isDraft: false,
    tags: ['research', 'collaboration', 'academics'],
    category: 'Research',
    likes: 8,
    comments: [],
    isPublished: true,
  },
  {
    id: '4',
    title: 'New Campus Connect Features',
    content: '<p>We are excited to announce several new features on Campus Connect...</p>',
    excerpt: 'We are excited to announce several new features on Campus Connect...',
    authorId: '3', // Admin User
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-02-28'),
    publishedAt: new Date('2024-02-28'),
    isDraft: false,
    tags: ['updates', 'features', 'platform'],
    category: 'Announcements',
    likes: 19,
    comments: [],
    isPublished: true,
  },
  {
    id: '5',
    title: 'How to Write a Great Essay',
    content: '<p>Writing essays can be daunting, but here are some tips to help...</p>',
    excerpt: 'Writing essays can be daunting, but here are some tips to help...',
    authorId: '2', // Alex Johnson
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    publishedAt: new Date('2024-02-20'),
    isDraft: false,
    tags: ['essay', 'writing', 'education'],
    category: 'Academics',
    likes: 25,
    comments: [],
    isPublished: true,
  },
];

// Add comments to posts
const comments: Comment[] = [
  {
    id: '101',
    content: 'This is really helpful information!',
    authorId: '1', // Emma Smith
    postId: '1',
    createdAt: new Date('2024-03-16'),
    updatedAt: new Date('2024-03-16'),
    likes: 3,
  },
  {
    id: '102',
    content: 'I have a question about this topic...',
    authorId: '1', // Emma Smith
    postId: '2',
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-03-12'),
    likes: 1,
  },
  {
    id: '103',
    content: 'Thank you for sharing this!',
    authorId: '2', // Alex Johnson
    postId: '3',
    createdAt: new Date('2024-03-07'),
    updatedAt: new Date('2024-03-07'),
    likes: 5,
  },
  {
    id: '104',
    content: 'Great to see these new features!',
    authorId: '1', // Emma Smith
    postId: '4',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    likes: 2,
  },
  {
    id: '105',
    content: 'I will definitely use these tips for my next essay.',
    authorId: '1', // Emma Smith
    postId: '5',
    createdAt: new Date('2024-02-22'),
    updatedAt: new Date('2024-02-22'),
    likes: 4,
  },
];

// Attach comments to their respective posts
posts.forEach(post => {
  post.comments = comments.filter(comment => comment.postId === post.id);
  
  // Attach authors to comments
  post.comments.forEach(comment => {
    comment.author = users.find(user => user.id === comment.authorId);
  });
  
  // Attach author to post
  post.author = users.find(user => user.id === post.authorId);
});

// Export the populated posts (posts already have authors and comments attached)
export const populatedPosts = posts;

export const categories = [
  'Technology',
  'Science',
  'Programming',
  'Education',
  'Campus Life',
  'Events'
];

export const tags = [
  'React',
  'JavaScript',
  'TypeScript',
  'Web Development',
  'Student Life',
  'Learning',
  'Career',
  'Tutorials'
];

export default auth;
