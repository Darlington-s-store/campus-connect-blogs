
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';
import BlogForm from '@/components/Blog/BlogForm';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EditPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPostById } = useBlog();
  const { user } = useAuth();
  const [post, setPost] = useState(id ? getPostById(id) : undefined);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchedPost = getPostById(id);
      setPost(fetchedPost);
      
      if (fetchedPost) {
        // Check if user has permission to edit
        if (user?.id !== fetchedPost.authorId && user?.role !== 'admin') {
          setError("You don't have permission to edit this post");
        }
      } else {
        setError("Post not found");
      }
    }
  }, [id, getPostById, user]);

  if (error) {
    return (
      <div className="py-12 text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-secondary rounded mx-auto mb-8"></div>
          <div className="h-64 max-w-2xl mx-auto bg-secondary rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <BlogForm post={post} mode="edit" />
    </div>
  );
};

export default EditPostPage;
