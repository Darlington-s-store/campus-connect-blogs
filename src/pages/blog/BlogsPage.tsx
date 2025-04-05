
import { useState, useEffect } from 'react';
import { useBlog } from '@/contexts/BlogContext';
import BlogGrid from '@/components/Blog/BlogGrid';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Post } from '@/types';
import { categories, tags } from '@/lib/mock-data';
import { Search } from 'lucide-react';

const BlogsPage = () => {
  const { posts, isLoading } = useBlog();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...posts].filter(post => post.isPublished);

      // Apply search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          post =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            post.author?.name.toLowerCase().includes(query)
        );
      }

      // Apply category filter
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(post => post.category === selectedCategory);
      }

      // Apply tag filter
      if (selectedTag !== 'all') {
        filtered = filtered.filter(post => post.tags.includes(selectedTag));
      }

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.publishedAt || a.createdAt).getTime() - new Date(b.publishedAt || b.createdAt).getTime());
          break;
        case 'popular':
          filtered.sort((a, b) => b.likes - a.likes);
          break;
        case 'commented':
          filtered.sort((a, b) => b.comments.length - a.comments.length);
          break;
      }

      setFilteredPosts(filtered);
    };

    applyFilters();
  }, [posts, searchQuery, selectedCategory, selectedTag, sortBy]);

  // Group posts by author role for tabs
  const educatorPosts = filteredPosts.filter(post => post.author?.role === 'educator');
  const studentPosts = filteredPosts.filter(post => post.author?.role === 'student');

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-secondary rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 w-full bg-secondary rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:w-2/3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.name}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Liked</SelectItem>
                <SelectItem value="commented">Most Commented</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Posts ({filteredPosts.length})</TabsTrigger>
            <TabsTrigger value="educators">By Educators ({educatorPosts.length})</TabsTrigger>
            <TabsTrigger value="students">By Students ({studentPosts.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <BlogGrid 
              posts={filteredPosts}
              emptyMessage={
                searchQuery || selectedCategory !== 'all' || selectedTag !== 'all'
                  ? 'No posts match your filters. Try adjusting your search criteria.'
                  : 'No posts available.'
              }
            />
          </TabsContent>
          
          <TabsContent value="educators">
            <BlogGrid 
              posts={educatorPosts}
              emptyMessage="No educator posts available."
            />
          </TabsContent>
          
          <TabsContent value="students">
            <BlogGrid 
              posts={studentPosts}
              emptyMessage="No student posts available."
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default BlogsPage;
