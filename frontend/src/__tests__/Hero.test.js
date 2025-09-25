import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Hero from '../components/Hero';

// Mock the personalInfo data
jest.mock('../data/mock', () => ({
  personalInfo: {
    name: 'Yashwanth A L',
    tagline: 'Computer Science Engineer | Problem Solver | Full-Stack Developer',
    email: 'yashwanthal2004@gmail.com',
    phone: '9844955914',
    profileImage: 'https://example.com/profile.jpg',
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

describe('Hero Component', () => {
  beforeEach(() => {
    // Reset scroll mock before each test
    window.scrollTo = jest.fn();
  });

  test('renders hero section with correct content', () => {
    renderWithTheme(<Hero />);
    
    // Check if main elements are present
    expect(screen.getByText("Hi, I'm")).toBeInTheDocument();
    expect(screen.getByText('Yashwanth A L')).toBeInTheDocument();
    expect(screen.getByText('Computer Science Engineer | Problem Solver | Full-Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('9844955914')).toBeInTheDocument();
    expect(screen.getByText('yashwanthal2004@gmail.com')).toBeInTheDocument();
  });

  test('renders profile image with correct attributes', () => {
    renderWithTheme(<Hero />);
    
    const profileImage = screen.getByAltText('Yashwanth A L');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', 'https://example.com/profile.jpg');
  });

  test('renders social media links', () => {
    renderWithTheme(<Hero />);
    
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks).toHaveLength(3); // GitHub, LinkedIn, LeetCode
    
    // Check if links have correct attributes
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test('get in touch button scrolls to contact section', () => {
    // Mock querySelector to return a mock element
    const mockElement = {
      scrollIntoView: jest.fn()
    };
    document.querySelector = jest.fn().mockReturnValue(mockElement);

    renderWithTheme(<Hero />);
    
    const getInTouchButton = screen.getByText('Get In Touch');
    expect(getInTouchButton).toBeInTheDocument();
    
    fireEvent.click(getInTouchButton);
    
    expect(document.querySelector).toHaveBeenCalledWith('#contact');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('hero section has correct CSS classes for styling', () => {
    const { container } = renderWithTheme(<Hero />);
    
    const heroSection = container.querySelector('#home');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass('min-h-screen');
  });

  test('contact information is displayed correctly', () => {
    renderWithTheme(<Hero />);
    
    // Check phone number
    expect(screen.getByText('9844955914')).toBeInTheDocument();
    
    // Check email
    expect(screen.getByText('yashwanthal2004@gmail.com')).toBeInTheDocument();
  });

  test('renders call-to-action message', () => {
    renderWithTheme(<Hero />);
    
    expect(screen.getByText("Let's build something amazing together!")).toBeInTheDocument();
  });

  test('component snapshot', () => {
    const { container } = renderWithTheme(<Hero />);
    expect(container.firstChild).toMatchSnapshot();
  });
});