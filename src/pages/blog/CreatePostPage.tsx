
import BlogForm from '@/components/Blog/BlogForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardHeader, CardDescription } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const CreatePostPage = () => {
  const { isAuthenticated, user } = useAuth();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">Create New Post</h1>
              <CardDescription>
                Share your knowledge with the academic community
              </CardDescription>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Tips
                </Button>
              </TooltipTrigger>
              <TooltipContent className="w-80 p-4">
                <p className="mb-2 font-medium">Tips for creating a great post:</p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Add a compelling title that clearly states the topic</li>
                  <li>Include relevant tags to help others find your content</li>
                  <li>Add an image to make your post stand out</li>
                  <li>Format your content with headings and lists for readability</li>
                  <li>Proofread before publishing to catch any errors</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </div>
          
          {user?.role === 'student' && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Note for Students</AlertTitle>
              <AlertDescription>
                Your post will be reviewed by educators before being published to ensure it meets community guidelines.
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <BlogForm mode="create" />
      </Card>
    </div>
  );
};

export default CreatePostPage;
