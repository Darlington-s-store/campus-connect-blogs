
import BlogForm from '@/components/Blog/BlogForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardHeader } from '@/components/ui/card';

const CreatePostPage = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="text-muted-foreground">Share your knowledge with the academic community</p>
        </CardHeader>
        <BlogForm mode="create" />
      </Card>
    </div>
  );
};

export default CreatePostPage;
