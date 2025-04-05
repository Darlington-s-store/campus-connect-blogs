
export type UserRole = 'admin' | 'educator' | 'student' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  interests?: string[];
  following?: string[];
  followers?: string[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  author?: User;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  isDraft: boolean;
  tags: string[];
  category: string;
  imageUrl?: string;
  likes: number;
  comments: Comment[];
  isPublished: boolean;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author?: User;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
}
