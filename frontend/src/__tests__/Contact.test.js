import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Contact from '../components/Contact';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

// Mock the personalInfo data
jest.mock('../data/mock', () => ({
  personalInfo: {
    email: 'yashwanthal2004@gmail.com',
    phone: '9844955914',
    socialLinks: {
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/in/test',
      leetcode: 'https://leetcode.com/test'
    }
  }
}));

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Contact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders contact form with all fields', () => {
    renderWithTheme(<Contact />);
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  test('displays contact information correctly', () => {
    renderWithTheme(<Contact />);
    
    expect(screen.getByText('yashwanthal2004@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('9844955914')).toBeInTheDocument();
  });

  test('form submission works with valid data', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { success: true, message: 'Message sent successfully', id: '123' }
    });

    renderWithTheme(<Contact />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello, this is a test message!' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('Send Message'));

    // Check loading state
    expect(screen.getByText('Sending...')).toBeInTheDocument();

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/Thank you! Your message has been sent successfully/)).toBeInTheDocument();
    });

    // Verify API call
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/api/contact`,
      {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, this is a test message!'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  });

  test('displays error message on form submission failure', async () => {
    mockedAxios.post.mockRejectedValue({
      response: { data: { detail: 'Validation error' }, status: 422 }
    });

    renderWithTheme(<Contact />);
    
    // Fill out and submit form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' }
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Test message' }
    });

    fireEvent.click(screen.getByText('Send Message'));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Validation error')).toBeInTheDocument();
    });
  });

  test('form fields are required', () => {
    renderWithTheme(<Contact />);
    
    const nameField = screen.getByLabelText(/name/i);
    const emailField = screen.getByLabelText(/email/i);
    const messageField = screen.getByLabelText(/message/i);

    expect(nameField).toBeRequired();
    expect(emailField).toBeRequired();
    expect(messageField).toBeRequired();
  });

  test('email field has correct type', () => {
    renderWithTheme(<Contact />);
    
    const emailField = screen.getByLabelText(/email/i);
    expect(emailField).toHaveAttribute('type', 'email');
  });

  test('form clears after successful submission', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { success: true, message: 'Message sent successfully', id: '123' }
    });

    renderWithTheme(<Contact />);
    
    const nameField = screen.getByLabelText(/name/i);
    const emailField = screen.getByLabelText(/email/i);
    const messageField = screen.getByLabelText(/message/i);

    // Fill out the form
    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'john@example.com' } });
    fireEvent.change(messageField, { target: { value: 'Test message' } });

    // Submit the form
    fireEvent.click(screen.getByText('Send Message'));

    // Wait for form to clear
    await waitFor(() => {
      expect(nameField.value).toBe('');
      expect(emailField.value).toBe('');
      expect(messageField.value).toBe('');
    });
  });

  test('renders social media links', () => {
    renderWithTheme(<Contact />);
    
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThan(0);
    
    // Check if links have correct attributes
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test('component snapshot', () => {
    const { container } = renderWithTheme(<Contact />);
    expect(container.firstChild).toMatchSnapshot();
  });
});