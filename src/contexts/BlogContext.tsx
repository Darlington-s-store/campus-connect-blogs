
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post, Comment, User } from '../types';
import { populatedPosts } from '../lib/mock-data';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

interface BlogContextType {
  posts: Post[];
  featuredPosts: Post[];
  getPostById: (id: string) => Post | undefined;
  getUserPosts: (userId: string) => Post[];
  createPost: (postData: Partial<Post>) => Promise<Post | null>;
  updatePost: (id: string, postData: Partial<Post>) => Promise<Post | null>;
  deletePost: (id: string) => Promise<boolean>;
  publishPost: (id: string) => Promise<Post | null>;
  unpublishPost: (id: string) => Promise<Post | null>;
  likePost: (id: string) => Promise<boolean>;
  addComment: (postId: string, content: string) => Promise<Comment | null>;
  deleteComment: (postId: string, commentId: string) => Promise<boolean>;
  isLoading: boolean;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate loading posts from API
    const loadPosts = () => {
      setTimeout(() => {
        setPosts(populatedPosts);
        setIsLoading(false);
      }, 1000);
    };

    loadPosts();
  }, []);

  const featuredPosts = posts
    .filter(post => post.isPublished)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const getUserPosts = (userId: string) => {
    return posts.filter(post => post.authorId === userId);
  };

  const createPost = async (postData: Partial<Post>): Promise<Post | null> => {
    if (!user) {
      toast.error('You must be logged in to create a post');
      return null;
    }

    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPost: Post = {
        id: `${posts.length + 1}`,
        title: postData.title || 'Untitled Post',
        content: postData.content || '',
        excerpt: postData.excerpt || postData.content?.substring(0, 150) || '',
        authorId: user.id,
        author: user,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDraft: postData.isDraft !== undefined ? postData.isDraft : true,
        tags: postData.tags || [],
        category: postData.category || 'Uncategorized',
        imageUrl: postData.imageUrl || undefined,
        likes: 0,
        comments: [],
        isPublished: postData.isPublished !== undefined ? postData.isPublished : false,
        publishedAt: postData.isPublished ? new Date() : undefined
      };

      setPosts(prevPosts => [...prevPosts, newPost]);
      toast.success('Post created successfully');
      return newPost;
    } catch (error) {
      toast.error('Failed to create post');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (id: string, postData: Partial<Post>): Promise<Post | null> => {
    if (!user) {
      toast.error('You must be logged in to update a post');
      return null;
    }

    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const postIndex = posts.findIndex(post => post.id === id);
      if (postIndex === -1) {
        toast.error('Post not found');
        return null;
      }

      const post = posts[postIndex];
      // Check if user is authorized
      if (user.id !== post.authorId && user.role !== 'admin') {
        toast.error('You are not authorized to update this post');
        return null;
      }

      const updatedPost = {
        ...post,
        ...postData,
        updatedAt: new Date()
      };

      const newPosts = [...posts];
      newPosts[postIndex] = updatedPost;
      setPosts(newPosts);

      toast.success('Post updated successfully');
      return updatedPost;
    } catch (error) {
      toast.error('Failed to update post');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    if (!user) {
      toast.error('You must be logged in to delete a post');
      return false;
    }

    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const post = posts.find(post => post.id === id);
      if (!post) {
        toast.error('Post not found');
        return false;
      }

      // Check if user is authorized
      if (user.id !== post.authorId && user.role !== 'admin') {
        toast.error('You are not authorized to delete this post');
        return false;
      }

      setPosts(posts.filter(post => post.id !== id));
      toast.success('Post deleted successfully');
      return true;
    } catch (error) {
      toast.error('Failed to delete post');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const publishPost = async (id: string): Promise<Post | null> => {
    if (!user) {
      toast.error('You must be logged in to publish a post');
      return null;
    }

    return updatePost(id, { isPublished: true, publishedAt: new Date() });
  };

  const unpublishPost = async (id: string): Promise<Post | null> => {
    if (!user) {
      toast.error('You must be logged in to unpublish a post');
      return null;
    }

    return updatePost(id, { isPublished: false });
  };

  const likePost = async (id: string): Promise<boolean> => {
    if (!user) {
      toast.error('You must be logged in to like a post');
      return false;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const postIndex = posts.findIndex(post => post.id === id);
      if (postIndex === -1) {
        return false;
      }

      const newPosts = [...posts];
      newPosts[postIndex] = {
        ...newPosts[postIndex],
        likes: newPosts[postIndex].likes + 1
      };

      setPosts(newPosts);
      return true;
    } catch (error) {
      return false;
    }
  };

  const addComment = async (postId: string, content: string): Promise<Comment | null> => {
    if (!user) {
      toast.error('You must be logged in to comment');
      return null;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const postIndex = posts.findIndex(post => post.id === postId);
      if (postIndex === -1) {
        toast.error('Post not found');
        return null;
      }

      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        content,
        authorId: user.id,
        author: user,
        postId,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0
      };

      const newPosts = [...posts];
      newPosts[postIndex] = {
        ...newPosts[postIndex],
        comments: [...newPosts[postIndex].comments, newComment]
      };

      setPosts(newPosts);
      toast.success('Comment added');
      return newComment;
    } catch (error) {
      toast.error('Failed to add comment');
      return null;
    }
  };

  const deleteComment = async (postId: string, commentId: string): Promise<boolean> => {
    if (!user) {
      toast.error('You must be logged in to delete a comment');
      return false;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const postIndex = posts.findIndex(post => post.id === postId);
      if (postIndex === -1) {
        toast.error('Post not found');
        return false;
      }

      const post = posts[postIndex];
      const comment = post.comments.find(c => c.id === commentId);

      if (!comment) {
        toast.error('Comment not found');
        return false;
      }

      // Check if user is authorized
      if (user.id !== comment.authorId && user.id !== post.authorId && user.role !== 'admin') {
        toast.error('You are not authorized to delete this comment');
        return false;
      }

      const newPosts = [...posts];
      newPosts[postIndex] = {
        ...newPosts[postIndex],
        comments: newPosts[postIndex].comments.filter(c => c.id !== commentId)
      };

      setPosts(newPosts);
      toast.success('Comment deleted');
      return true;
    } catch (error) {
      toast.error('Failed to delete comment');
      return false;
    }
  };

  return (
    <BlogContext.Provider value={{
      posts,
      featuredPosts,
      getPostById,
      getUserPosts,
      createPost,
      updatePost,
      deletePost,
      publishPost,
      unpublishPost,
      likePost,
      addComment,
      deleteComment,
      isLoading
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
