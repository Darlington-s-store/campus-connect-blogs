
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';
import FeaturedBlogs from '@/components/Blog/FeaturedBlogs';
import BlogCard from '@/components/Blog/BlogCard';
import { categories, tags } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { featuredPosts, posts, isLoading } = useBlog();
  const { isAuthenticated } = useAuth();
  
  // Get recent posts
  const recentPosts = [...posts]
    .filter(post => post.isPublished)
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4 md:py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Campus Connect</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            A platform where educators and students connect, share knowledge, and build academic communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/blogs">Explore Blogs</Link>
            </Button>
            {!isAuthenticated && (
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">Join Now</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="container mx-auto py-12">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-40 bg-secondary rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-secondary rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : (
          <FeaturedBlogs featuredPosts={featuredPosts} />
        )}
      </section>

      {/* Recent Posts Section */}
      <section className="container mx-auto py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Recent Posts</h2>
          <Button variant="outline" asChild>
            <Link to="/blogs">View All</Link>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-secondary rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Explore by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/blogs?category=${encodeURIComponent(category.name)}`}
                className="bg-card hover:bg-accent transition-colors p-4 rounded-lg shadow-sm"
              >
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tags Section */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6">Popular Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag.id} to={`/blogs?tag=${encodeURIComponent(tag.name)}`}>
              <Badge variant="secondary" className="text-sm py-1 px-3">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Community?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Create an account to share your knowledge, connect with peers, and engage with the academic community.
          </p>
          {isAuthenticated ? (
            <Button size="lg" asChild>
              <Link to="/create-post">Create Your First Post</Link>
            </Button>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Log In</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
