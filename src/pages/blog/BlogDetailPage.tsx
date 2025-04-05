
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageSquare, 
  Share,
  Edit, 
  Trash2,
  AlertCircle,
  Calendar
} from 'lucide-react';
import CommentSection from '@/components/Blog/CommentSection';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from '@/components/ui/card';

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPostById, likePost, deletePost } = useBlog();
  const { user } = useAuth();
  const [post, setPost] = useState(id ? getPostById(id) : undefined);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setPost(getPostById(id));
    }
  }, [id, getPostById]);

  const handleLike = async () => {
    if (!id || !user) return;
    
    setIsLiking(true);
    await likePost(id);
    setIsLiking(false);
    
    // Update post with latest data
    setPost(getPostById(id));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const handleDelete = async () => {
    if (!id) return;
    
    setIsDeleting(true);
    const success = await deletePost(id);
    
    if (success) {
      navigate('/blogs');
      toast.success('Post deleted successfully');
    }
    
    setIsDeleting(false);
  };

  const canEditPost = user && post && (user.id === post.authorId || user.role === 'admin');

  if (!post) {
    return (
      <div className="py-12 text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
        <h2 className="text-2xl font-bold mb-2">Post Not Found</h2>
        <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/blogs">Back to Blogs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Post Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={post.author?.avatar} alt={post.author?.name} />
              <AvatarFallback>{post.author?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author?.name}</p>
              <div className="text-sm text-muted-foreground flex items-center">
                <span className="capitalize">{post.author?.role}</span>
                <span className="inline-block mx-1">•</span>
                <Calendar className="h-3 w-3 inline mr-1" />
                <span>{post.publishedAt ? format(new Date(post.publishedAt), 'MMM d, yyyy') : 'Draft'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {canEditPost && (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/edit-post/${post.id}`}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this post
                        and all associated comments.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground"
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Featured Image */}
      {post.imageUrl && (
        <div className="mb-8">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-auto max-h-[500px] object-cover rounded-lg"
          />
        </div>
      )}
      
      {/* Post Content */}
      <div 
        className="blog-content prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {/* Post Actions */}
      <Card className="mb-8">
        <CardContent className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLike} 
              disabled={!user || isLiking}
              className="flex items-center"
            >
              <Heart className={`h-4 w-4 mr-1 ${user ? 'text-destructive' : ''}`} />
              <span>{post.likes} Likes</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{post.comments.length} Comments</span>
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShare}
            className="flex items-center"
          >
            <Share className="h-4 w-4 mr-1" />
            <span>Share</span>
          </Button>
        </CardContent>
      </Card>
      
      {/* Author Bio */}
      {post.author && (
        <div className="bg-secondary rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg">About {post.author.name}</h3>
              <p className="text-sm text-muted-foreground mb-2 capitalize">{post.author.role}</p>
              <p>{post.author.bio || `${post.author.name} is a member of the Campus Connect community.`}</p>
              <Button variant="link" asChild className="p-0 mt-2">
                <Link to={`/profile/${post.author.id}`}>View Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Comments Section */}
      <div id="comments">
        <CommentSection post={post} />
      </div>
    </div>
  );
};

export default BlogDetailPage;
