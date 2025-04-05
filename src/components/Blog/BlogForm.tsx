
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Post } from '@/types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { categories, tags } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from './RichTextEditor';

interface BlogFormProps {
  post?: Post;
  mode: 'create' | 'edit';
}

const BlogForm = ({ post, mode }: BlogFormProps) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  const [category, setCategory] = useState(post?.category || categories[0].name);
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags || []);
  const [isPublished, setIsPublished] = useState(post?.isPublished || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createPost, updatePost } = useBlog();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Handle tag selection
  const handleTagToggle = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter(t => t !== tagName));
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, tagName]);
      } else {
        toast({
          title: "Maximum tags reached",
          description: "You can select up to 5 tags",
          variant: "destructive"
        });
      }
    }
  };

  // Auto-generate excerpt from content when typing if excerpt is empty
  const updateExcerptFromContent = (newContent: string) => {
    setContent(newContent);
    
    if (!excerpt.trim()) {
      // Strip HTML and limit to 150 characters for auto excerpt
      const textContent = newContent.replace(/<[^>]*>?/gm, '');
      if (textContent.length > 0) {
        const shortenedContent = textContent.substring(0, 150);
        setExcerpt(shortenedContent + (textContent.length > 150 ? '...' : ''));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing required fields",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const postData = {
        title,
        content,
        excerpt: excerpt || content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
        imageUrl,
        category,
        tags: selectedTags,
        isPublished,
        isDraft: !isPublished
      };
      
      let result;
      
      if (mode === 'create') {
        result = await createPost(postData);
        if (result) {
          toast({
            title: "Post created",
            description: "Your post has been created successfully"
          });
          navigate(`/blogs/${result.id}`);
        }
      } else if (post) {
        result = await updatePost(post.id, postData);
        if (result) {
          toast({
            title: "Post updated",
            description: "Your post has been updated successfully"
          });
          navigate(`/blogs/${post.id}`);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your post",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your post title"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={category} 
              onValueChange={setCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Featured Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Add an image URL (optional)"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Tags (up to 5)</Label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Button
                key={tag.id}
                type="button"
                variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                size="sm"
                onClick={() => handleTagToggle(tag.name)}
                className="mb-2"
              >
                {tag.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt (optional)</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief summary of your post (will use beginning of content if left empty)"
            rows={2}
          />
        </div>
        
        <RichTextEditor 
          label="Content *" 
          value={content} 
          onChange={updateExcerptFromContent}
          placeholder="Write your post content here..."
        />
        
        <div className="flex items-center space-x-2 pt-4">
          <Switch
            id="publish"
            checked={isPublished}
            onCheckedChange={setIsPublished}
          />
          <Label htmlFor="publish">Publish immediately</Label>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Update Post'}
        </Button>
      </CardFooter>
    </form>
  );
};

export default BlogForm;
