
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBlog } from '@/contexts/BlogContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { users, posts } from '@/lib/mock-data';
import { User } from '@/types';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { AlertCircle, BarChart as BarChartIcon, Filter, Users, FileText } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const { posts: blogPosts } = useBlog();
  const navigate = useNavigate();
  
  // Check if user is authorized to view dashboard
  if (!user || (user.role !== 'admin' && user.role !== 'educator')) {
    navigate('/');
    return null;
  }
  
  // Prepare analytics data
  const postsByDate = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      posts: Math.floor(Math.random() * 5) + 1, // Random data for demo
      comments: Math.floor(Math.random() * 10) + 1, // Random data for demo
    };
  });
  
  const usersByRole = [
    { name: 'Students', value: users.filter(u => u.role === 'student').length },
    { name: 'Educators', value: users.filter(u => u.role === 'educator').length },
    { name: 'Admins', value: users.filter(u => u.role === 'admin').length },
  ];
  
  const topCategories = [
    { name: 'Computer Science', posts: blogPosts.filter(p => p.category === 'Computer Science').length },
    { name: 'Environmental Science', posts: blogPosts.filter(p => p.category === 'Environmental Science').length },
    { name: 'Physics', posts: blogPosts.filter(p => p.category === 'Physics').length },
    { name: 'Mathematics', posts: blogPosts.filter(p => p.category === 'Mathematics').length },
    { name: 'Research Methodology', posts: blogPosts.filter(p => p.category === 'Research Methodology').length },
  ].sort((a, b) => b.posts - a.posts);
  
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              {blogPosts.filter(p => p.isPublished).length} published, {blogPosts.filter(p => !p.isPublished).length} drafts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter(u => u.role === 'student').length} students, {users.filter(u => u.role === 'educator').length} educators
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {blogPosts.reduce((sum, post) => sum + post.comments.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Average {(blogPosts.reduce((sum, post) => sum + post.comments.length, 0) / Math.max(blogPosts.length, 1)).toFixed(1)} per post
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {blogPosts.reduce((sum, post) => sum + post.likes, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Average {(blogPosts.reduce((sum, post) => sum + post.likes, 0) / Math.max(blogPosts.length, 1)).toFixed(1)} per post
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={postsByDate}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="posts" stroke="#8884d8" name="Posts" />
                    <Line type="monotone" dataKey="comments" stroke="#82ca9d" name="Comments" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Users by Role</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={usersByRole}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Users" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topCategories}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="posts" fill="#82ca9d" name="Posts" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Post Status</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-[300px] justify-center items-center">
                <div className="text-center text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                  <p>Advanced analytics will be available in a future update.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] flex flex-col justify-center items-center">
              <div className="text-center text-muted-foreground max-w-md">
                <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                <p className="mb-2">Advanced analytics features will be available in a future update.</p>
                <p className="text-sm">This will include user engagement metrics, content performance analytics, and personalized recommendations.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
