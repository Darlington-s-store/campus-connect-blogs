import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Login = () => {
  const [username, setUsername] = useState(''); // Can be email or index number
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { login, setNewPassword: setNewPasswordAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      return;
    }
    
    setIsSubmitting(true);
    const success = await login(username, password);
    
    if (success) {
      navigate('/');
    }
    
    setIsSubmitting(false);
  };

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username) {
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }
    
    setIsSubmitting(true);
    const success = await setNewPasswordAuth(username, newPassword);
    
    if (success) {
      // Switch back to login tab after setting password
      setIsSettingPassword(false);
    }
    
    setIsSubmitting(false);
  };

  // For demo purposes, provide some test credentials
  const demoUsers = [
    { role: 'Student', credential: '12345 (index)' },
    { role: 'Student', credential: 'emma.smith@campus.edu' },
    { role: 'Educator', credential: 'alex.johnson@campus.edu' },
    { role: 'Admin', credential: 'admin@campus.edu' },
  ];

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription>Access your account</CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 mx-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="set-password">New Student</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Email or Index Number</Label>
                  <Input
                    id="username"
                    placeholder="Email or Student Index Number"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <p>For demo, use any password with these credentials:</p>
                  <ul className="mt-1 space-y-1">
                    {demoUsers.map((user, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{user.role}:</span>
                        <span className="font-mono">{user.credential}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:underline">
                    Create one here
                  </Link>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="set-password">
            <form onSubmit={handleSetNewPassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Student Index Number</Label>
                  <Input
                    id="username"
                    placeholder="Enter your index number"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.replace(/[^0-9]/g, ''))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {passwordError && (
                    <p className="text-sm text-destructive">{passwordError}</p>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  <p>If you're a new student, use your assigned index number to set your password for the first time.</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Setting password...' : 'Set Password'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
