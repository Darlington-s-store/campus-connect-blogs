
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Edit, Eye, Trash2, Plus } from 'lucide-react';
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

const MyPostsPage = () => {
  const { user } = useAuth();
  const { getUserPosts, deletePost, publishPost, unpublishPost } = useBlog();
  const [activePosts, setActivePosts] = useState<string>('published');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  
  const userPosts = user ? getUserPosts(user.id) : [];
  const publishedPosts = userPosts.filter(post => post.isPublished);
  const draftPosts = userPosts.filter(post => !post.isPublished);
  
  const handleDeletePost = async (id: string) => {
    setIsDeleting(id);
    await deletePost(id);
    setIsDeleting(null);
  };
  
  const handlePublishToggle = async (id: string, currentStatus: boolean) => {
    setIsUpdating(id);
    if (currentStatus) {
      await unpublishPost(id);
    } else {
      await publishPost(id);
    }
    setIsUpdating(null);
  };

  if (!user) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">You need to be logged in</h2>
        <p className="text-muted-foreground mb-6">Please log in to view your posts.</p>
        <Button asChild>
          <Link to="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  const renderPostList = (posts: typeof userPosts) => {
    if (posts.length === 0) {
      return (
        <div className="text-center p-8">
          <p className="text-muted-foreground mb-6">
            {activePosts === 'published'
              ? "You haven't published any posts yet."
              : "You don't have any draft posts."}
          </p>
          <Button asChild>
            <Link to="/create-post">
              <Plus className="h-4 w-4 mr-1" />
              Create New Post
            </Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {post.publishedAt
                      ? `Published ${formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}`
                      : `Last updated ${formatDistanceToNow(new Date(post.updatedAt), { addSuffix: true })}`}
                  </p>
                </div>
                <div className="flex space-x-1">
                  {post.isPublished ? (
                    <Badge>Published</Badge>
                  ) : (
                    <Badge variant="outline">Draft</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-1 mb-2">
                {post.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="line-clamp-2">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="flex items-center text-sm">
                <span className="mr-4">{post.likes} likes</span>
                <span>{post.comments.length} comments</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/blogs/${post.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/edit-post/${post.id}`}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant={post.isPublished ? "outline" : "default"}
                  onClick={() => handlePublishToggle(post.id, post.isPublished)}
                  disabled={isUpdating === post.id}
                >
                  {isUpdating === post.id
                    ? 'Updating...'
                    : post.isPublished
                    ? 'Unpublish'
                    : 'Publish'}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your post
                        and all associated comments.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-destructive text-destructive-foreground"
                      >
                        {isDeleting === post.id ? 'Deleting...' : 'Delete'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Button asChild>
          <Link to="/create-post">
            <Plus className="h-4 w-4 mr-1" />
            Create New Post
          </Link>
        </Button>
      </div>

      <Tabs value={activePosts} onValueChange={setActivePosts}>
        <TabsList className="mb-4">
          <TabsTrigger value="published">Published ({publishedPosts.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({draftPosts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="mt-0">
          {renderPostList(publishedPosts)}
        </TabsContent>

        <TabsContent value="drafts" className="mt-0">
          {renderPostList(draftPosts)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyPostsPage;
