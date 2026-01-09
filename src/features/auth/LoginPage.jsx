import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, validators } from '../../hooks/useForm';
import { useAuth } from './AuthProvider';
import { storage } from '../../utils/storage';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Checkbox from '../../components/ui/Checkbox';
import { FiMail, FiLock, FiUser, FiPhone, FiBook, FiEye, FiEyeOff } from 'react-icons/fi';

// Role-specific form fields and hints
const ROLE_FIELDS = {
  user: [
    { 
      id: 'name', 
      label: 'Full Name', 
      type: 'text',
      icon: <FiUser className="text-gray-400" />,
      placeholder: 'John Doe',
      required: true,
      validate: validators.required
    },
  ],
  admin: [
    {
      id: 'adminCode',
      label: 'Admin Code',
      type: 'password',
      icon: <FiLock className="text-gray-400" />,
      placeholder: 'Enter admin access code',
      required: true,
      validate: validators.required
    }
  ],
  client: [
    { 
      id: 'institution', 
      label: 'Institution Name', 
      type: 'text',
      icon: <FiBook className="text-gray-400" />,
      placeholder: 'Institution Name',
      required: true,
      validate: validators.required
    },
    { 
      id: 'phone', 
      label: 'Contact Number', 
      type: 'tel',
      icon: <FiPhone className="text-gray-400" />,
      placeholder: '+1 (555) 123-4567',
      required: true,
      validate: (value) => {
        if (!value) return 'Contact number is required';
        if (!/^\+?[\d\s-()]{10,}$/.test(value)) return 'Please enter a valid phone number';
        return '';
      }
    },
  ]
};\n
// Role-specific welcome messages
const ROLE_WELCOME = {
  user: 'Welcome back! Sign in to continue your learning journey.',
  admin: 'Administrator Access - Secure Login Required',
  client: 'Institution Portal - Manage your organization\'s learning programs'
};

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Get the redirect location or default to role-based dashboard
  const from = location.state?.from?.pathname || '/';
  
  // Form validation
  const validate = (values) => {
    const errors = {};
    
    // Common validations
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    // Role-specific validations
    if (isSignUp) {
      if (!values.role) {
        errors.role = 'Please select a role';
      } else if (ROLE_FIELDS[values.role]) {
        ROLE_FIELDS[values.role].forEach(field => {
          if (field.required && !values[field.id]) {
            errors[field.id] = `${field.label} is required`;
          } else if (field.validate) {
            const error = field.validate(values[field.id], values);
            if (error) errors[field.id] = error;
          }
        });
      }
      
      // Password confirmation
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    return errors;
  };
  
  // Initialize form with remember me
  const initialValues = {
    email: storage.get('remembered_email') || '',
    password: '',
    role: 'user',
    rememberMe: !!storage.get('remembered_email'),
    // Initialize role-specific fields
    ...Object.values(ROLE_FIELDS).reduce((acc, fields) => {
      fields.forEach(field => {
        if (field.id) acc[field.id] = '';
      });
      return acc;
    }, {})
  };
  
  const {
    values,
    errors,
    handleChange,
    handleSubmit: submitForm,
    setValues
  } = useForm(initialValues, validate);
  
  // Handle login/signup form submission
  const handleSubmit = async (formValues) => {
    setError('');
    setIsSubmitting(true);
    
    try {
      if (isSignUp) {
        // Handle signup logic
        const { confirmPassword, rememberMe, role, ...userData } = formValues;
        
        // In a real app, this would be an API call to register the user
        console.log('Signing up with:', userData);
        
        // Auto-login after signup
        const result = await login({
          email: userData.email,
          role: userData.role,
          name: userData.name || 'New User',
          institution: userData.institution || null
        });
        
        if (result.success) {
          // Handle remember me
          if (formValues.rememberMe) {
            storage.set('remembered_email', formValues.email, 30 * 24 * 60 * 60); // 30 days
          } else {
            storage.remove('remembered_email');
          }
          
          // Redirect to the appropriate dashboard
          navigate(from, { replace: true });
        } else {
          setError(result.error || 'Signup failed. Please try again.');
        }
      } else {
        // Handle login logic
        const result = await login({
          email: formValues.email,
          role: formValues.role,
          name: formValues.name || 'User',
        });
        
        if (result.success) {
          // Handle remember me
          if (formValues.rememberMe) {
            storage.set('remembered_email', formValues.email, 30 * 24 * 60 * 60); // 30 days
          } else {
            storage.remove('remembered_email');
          }
          
          // Redirect to the appropriate dashboard
          navigate(from, { replace: true });
        } else {
          setError(result.error || 'Invalid email or password');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Toggle between login and signup
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };
  
  // If already authenticated, redirect to the appropriate dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);
  
  // Get role-specific fields for the current role
  const roleFields = ROLE_FIELDS[values.role] || [];
  
  return (
    <AuthLayout 
      title={isSignUp ? 'Create an Account' : 'Welcome Back'}
      subtitle={isSignUp ? 'Join our learning community' : ROLE_WELCOME[values.role] || 'Sign in to continue'}
    >
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={submitForm(handleSubmit)} className="space-y-4">
        {isSignUp && (
          <Select
            id="role"
            label="I am a"
            value={values.role}
            onChange={handleChange}
            error={errors.role}
            className="w-full"
            disabled={isSubmitting}
          >
            <option value="user">Student</option>
            <option value="admin">Administrator</option>
            <option value="client">Institution</option>
          </Select>
        )}
        
        {isSignUp && roleFields.map((field) => (
          <Input
            key={field.id}
            id={field.id}
            name={field.id}
            type={field.type || 'text'}
            label={field.label}
            placeholder={field.placeholder}
            value={values[field.id] || ''}
            onChange={handleChange}
            error={errors[field.id]}
            leftIcon={field.icon}
            disabled={isSubmitting}
            required={field.required}
          />
        ))}
        
        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="your@email.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          leftIcon={<FiMail className="text-gray-400" />}
          disabled={isSubmitting}
          required
        />
        
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label={isSignUp ? 'Create Password' : 'Password'}
            placeholder={isSignUp ? 'At least 8 characters' : '••••••••'}
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            leftIcon={<FiLock className="text-gray-400" />}
            rightIcon={
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            }
            disabled={isSubmitting}
            required
          />
          {isSignUp && (
            <p className="mt-1 text-xs text-gray-500">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
          )}
        </div>
        
        {isSignUp && (
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            value={values.confirmPassword || ''}
            onChange={handleChange}
            error={errors.confirmPassword}
            leftIcon={<FiLock className="text-gray-400" />}
            disabled={isSubmitting}
            required
          />
        )}
        
        <div className="flex items-center justify-between">
          <Checkbox
            id="rememberMe"
            name="rememberMe"
            label="Remember me"
            checked={values.rememberMe}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          
          {!isSignUp && (
            <Link 
              to="/forgot-password" 
              className="text-sm font-medium text-brand-600 hover:text-brand-500"
            >
              Forgot password?
            </Link>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full justify-center"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSignUp ? 'Create Account' : 'Sign In'}
        </Button>
        
        <div className="mt-4 text-center text-sm">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            onClick={toggleAuthMode}
            className="font-medium text-brand-600 hover:text-brand-500 focus:outline-none"
            disabled={isSubmitting}
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </form>
      
      {!isSignUp && (
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              <span className="sr-only">Sign in with Google</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </button>
            
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              <span className="sr-only">Sign in with Microsoft</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 21 21">
                <path d="M1 1h9v9H1V1zm0 10h9v9H1v-9zm10 0h9v9h-9v-9zm0-10h9v9h-9V1z" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center text-xs text-gray-500">
        By {isSignUp ? 'creating an account' : 'signing in'}, you agree to our
        <a href="#" className="text-brand-600 hover:text-brand-500"> Terms of Service</a> and
        <a href="#" className="text-brand-600 hover:text-brand-500"> Privacy Policy</a>.
      </div>
    </AuthLayout>
  );
}
