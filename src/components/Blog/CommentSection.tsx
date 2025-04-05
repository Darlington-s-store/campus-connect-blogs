
import { useState } from 'react';
import { Comment, Post, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { useBlog } from '@/contexts/BlogContext';
import { Heart, Trash2 } from 'lucide-react';

interface CommentSectionProps {
  post: Post;
}

const CommentSection = ({ post }: CommentSectionProps) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { addComment, deleteComment } = useBlog();
  const comments = [...post.comments].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    await addComment(post.id, comment);
    setComment('');
    setIsSubmitting(false);
  };

  const handleDelete = async (commentId: string) => {
    await deleteComment(post.id, commentId);
  };

  const canDeleteComment = (comment: Comment) => {
    if (!user) return false;
    return user.id === comment.authorId || user.id === post.authorId || user.role === 'admin';
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-4">Comments ({comments.length})</h3>
      
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-2"
            rows={3}
          />
          <Button 
            type="submit" 
            disabled={!comment.trim() || isSubmitting}
            className="ml-auto block"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>
      ) : (
        <div className="bg-secondary p-4 rounded-lg mb-8 text-center">
          <p>Please <Button variant="link" asChild><a href="/login">log in</a></Button> to leave a comment.</p>
        </div>
      )}

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-secondary/50 p-4 rounded-lg">
              <div className="flex justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author?.avatar} alt={comment.author?.name} />
                    <AvatarFallback>{comment.author?.name.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{comment.author?.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                {canDeleteComment(comment) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(comment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                )}
              </div>
              <p className="mt-2">{comment.content}</p>
              <div className="flex items-center gap-1 mt-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Heart className="h-4 w-4 mr-1" />
                  {comment.likes}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
