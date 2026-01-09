import { useState, useCallback } from 'react';

export const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback((onSubmit) => async (e) => {
    e.preventDefault();
    
    // Run validation if provided
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }
    
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors(prev => ({
        ...prev,
        form: error.message || 'An error occurred. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  }, [validate, values]);

  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
  }, [initialState]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  };
};

// Validation helper
export const validators = {
  required: (value) => (!value ? 'This field is required' : ''),
  email: (value) => 
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) 
      ? 'Invalid email address' 
      : '',
  minLength: (min) => (value) => 
    value && value.length < min 
      ? `Must be at least ${min} characters` 
      : '',
  maxLength: (max) => (value) =>
    value && value.length > max
      ? `Must be less than ${max} characters`
      : '',
  match: (fieldName) => (value, allValues) =>
    value !== allValues[fieldName] ? 'Passwords do not match' : '',
};

// Helper to combine multiple validators
export const combineValidators = (validators) => (value, values) => {
  return validators.reduce((error, validator) => {
    return error || validator(value, values);
  }, '');
};
