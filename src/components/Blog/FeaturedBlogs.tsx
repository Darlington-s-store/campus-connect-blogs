
import { FC } from 'react';
import { Post } from '@/types';
import BlogCard from './BlogCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FeaturedBlogsProps {
  featuredPosts: Post[];
}

const FeaturedBlogs: FC<FeaturedBlogsProps> = ({ featuredPosts }) => {
  // Group posts by category
  const postsByCategory: Record<string, Post[]> = {};
  
  featuredPosts.forEach(post => {
    if (!postsByCategory[post.category]) {
      postsByCategory[post.category] = [];
    }
    postsByCategory[post.category].push(post);
  });
  
  const categories = Object.keys(postsByCategory);
  
  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6">Featured Content</h2>
      
      {categories.length > 1 ? (
        <Tabs defaultValue={categories[0]}>
          <TabsList className="mb-4">
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {postsByCategory[category].map((post, index) => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    variant={index === 0 ? 'featured' : 'default'} 
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              variant={index === 0 ? 'featured' : 'default'} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedBlogs;
