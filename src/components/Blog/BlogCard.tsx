
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface BlogCardProps {
  post: Post;
  variant?: 'default' | 'featured';
}

const BlogCard: FC<BlogCardProps> = ({ post, variant = 'default' }) => {
  const isFeatured = variant === 'featured';
  const formattedDate = post.publishedAt 
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })
    : '';

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${isFeatured ? 'border-primary/20' : ''}`}>
      <Link to={`/blogs/${post.id}`}>
        {post.imageUrl && (
          <div className={`w-full ${isFeatured ? 'h-64' : 'h-48'} overflow-hidden`}>
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {post.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
          <h3 className={`font-bold ${isFeatured ? 'text-2xl' : 'text-xl'} mb-2 line-clamp-2`}>{post.title}</h3>
          <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
        </CardHeader>
      </Link>
      <CardContent className="p-4 pt-0">
        <Link to={`/profile/${post.authorId}`} className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.author?.avatar} alt={post.author?.name} />
            <AvatarFallback>{post.author?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{post.author?.name}</span>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{formattedDate}</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Heart className="h-4 w-4" />
            <span className="text-xs">{post.likes}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">{post.comments.length}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
