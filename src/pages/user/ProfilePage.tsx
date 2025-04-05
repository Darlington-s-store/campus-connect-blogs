
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, AlertCircle } from 'lucide-react';
import BlogGrid from '@/components/Blog/BlogGrid';
import { users } from '@/lib/mock-data';
import { User } from '@/types';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const { getUserPosts } = useBlog();
  
  // If no ID is provided, show the current user's profile
  const userId = id || currentUser?.id;
  
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const loadUser = () => {
      setTimeout(() => {
        if (userId) {
          const foundUser = users.find(u => u.id === userId);
          setUser(foundUser);
        }
        setLoading(false);
      }, 500);
    };
    
    loadUser();
  }, [userId]);
  
  const userPosts = userId ? getUserPosts(userId) : [];
  const publishedPosts = userPosts.filter(post => post.isPublished);
  
  const isOwnProfile = currentUser && currentUser.id === userId;
  
  if (loading) {
    return (
      <div className="py-12">
        <div className="animate-pulse">
          <div className="flex items-center mb-6">
            <div className="h-24 w-24 rounded-full bg-secondary mr-6"></div>
            <div className="space-y-2">
              <div className="h-8 w-48 bg-secondary rounded"></div>
              <div className="h-4 w-24 bg-secondary rounded"></div>
            </div>
          </div>
          <div className="h-32 bg-secondary rounded-lg mb-6"></div>
          <div className="h-8 w-32 bg-secondary rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-secondary rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="py-12 text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
        <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
        <p className="text-muted-foreground mb-6">The user profile you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        <div className="w-full md:w-1/3 bg-card rounded-lg p-6 shadow">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <Badge className="my-2 capitalize">{user.role}</Badge>
            <p className="text-muted-foreground mb-4">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
            {isOwnProfile && (
              <Button asChild className="w-full">
                <Link to="/profile/edit">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {user.bio || "This user hasn't added a bio yet."}
            </p>
            
            {user.interests && user.interests.length > 0 && (
              <>
                <h3 className="font-semibold mb-2">Interests</h3>
                <div className="flex flex-wrap gap-1">
                  {user.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between mb-2">
              <span>Following</span>
              <span className="font-medium">{user.following?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Followers</span>
              <span className="font-medium">{user.followers?.length || 0}</span>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="posts">
            <TabsList className="mb-6">
              <TabsTrigger value="posts">Posts ({publishedPosts.length})</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts">
              <BlogGrid 
                posts={publishedPosts}
                emptyMessage={
                  isOwnProfile
                    ? "You haven't published any posts yet."
                    : `${user.name} hasn't published any posts yet.`
                }
              />
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="bg-card rounded-lg p-6 text-center">
                <p className="text-muted-foreground">
                  Activity tracking will be available in a future update.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
