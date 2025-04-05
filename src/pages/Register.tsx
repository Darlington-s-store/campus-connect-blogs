import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserRole } from '@/types';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [indexNumber, setIndexNumber] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const success = await register(name, email, password, role, indexNumber);
    
    if (success) {
      navigate('/');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Create an Account</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="space-y-2">
              <Label htmlFor="indexNumber">Index Number</Label>
              <Input
                id="indexNumber"
                type="text"
                placeholder="Index Number"
                value={indexNumber}
                onChange={(e) => setIndexNumber(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>I am a...</Label>
              <RadioGroup 
                value={role} 
                onValueChange={(value) => setRole(value as UserRole)}
                className="flex flex-col space-y-1 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="cursor-pointer">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="educator" id="educator" />
                  <Label htmlFor="educator" className="cursor-pointer">Educator</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
