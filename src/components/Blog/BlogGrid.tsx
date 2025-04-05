
import { FC } from 'react';
import { Post } from '@/types';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: Post[];
  emptyMessage?: string;
}

const BlogGrid: FC<BlogGridProps> = ({ posts, emptyMessage = 'No posts found.' }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogGrid;
