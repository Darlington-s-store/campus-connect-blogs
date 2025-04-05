
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlogGrid from '@/components/Blog/BlogGrid';
import { users } from '@/lib/mock-data';
import { Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Post, User } from '@/types';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  const { posts, isLoading } = useBlog();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    posts: Post[];
    users: User[];
  }>({
    posts: [],
    users: [],
  });

  // Extract query parameter from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('q') || '';
    setQuery(queryParam);
    
    // If there's a query param, perform search automatically
    if (queryParam) {
      performSearch(queryParam);
    }
  }, [location.search]);

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults({ posts: [], users: [] });
      return;
    }

    const query = searchQuery.toLowerCase();

    // Search in posts
    const matchingPosts = posts.filter(
      (post) =>
        post.isPublished &&
        (post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          post.category.toLowerCase().includes(query) ||
          post.author?.name.toLowerCase().includes(query))
    );

    // Search in users
    const matchingUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        (user.bio && user.bio.toLowerCase().includes(query)) ||
        (user.interests && user.interests.some((interest) => interest.toLowerCase().includes(query)))
    );

    setSearchResults({
      posts: matchingPosts,
      users: matchingUsers,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
    
    // Update URL
    const searchParams = new URLSearchParams();
    if (query.trim()) {
      searchParams.set('q', query);
    }
    
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-secondary rounded mb-8"></div>
          <div className="h-12 w-full max-w-2xl bg-secondary rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 w-full bg-secondary rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">Search</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Input
              type="search"
              placeholder="Search posts, users, tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>

      {query ? (
        <div>
          <div className="mb-4">
            <p className="text-muted-foreground">
              Found {searchResults.posts.length} posts and {searchResults.users.length} users 
              for "{query}"
            </p>
          </div>

          <Tabs defaultValue="posts">
            <TabsList className="mb-6">
              <TabsTrigger value="posts">Posts ({searchResults.posts.length})</TabsTrigger>
              <TabsTrigger value="users">Users ({searchResults.users.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts">
              <BlogGrid 
                posts={searchResults.posts} 
                emptyMessage="No posts match your search query." 
              />
            </TabsContent>
            
            <TabsContent value="users">
              {searchResults.users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.users.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="p-6">
                        <Link to={`/profile/${user.id}`} className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <Badge className="capitalize mt-1">{user.role}</Badge>
                          </div>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                          {user.bio || `${user.name} is a member of the Campus Connect community.`}
                        </p>
                        {user.interests && user.interests.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {user.interests.slice(0, 3).map((interest, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                            {user.interests.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{user.interests.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">No users match your search query.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Start Searching</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Enter keywords to search for posts, users, topics, or categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
