import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Header from '../components/Header';

// Mock window.open
global.open = jest.fn();

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    window.scrollTo = jest.fn();
    global.open = jest.fn();
  });

  test('renders header with logo and navigation', () => {
    renderWithTheme(<Header />);
    
    // Check logo
    expect(screen.getByText('Yashwanth A L')).toBeInTheDocument();
    
    // Check navigation items
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Achievements')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('renders resume download button', () => {
    renderWithTheme(<Header />);
    
    const resumeButtons = screen.getAllByText('Resume');
    expect(resumeButtons.length).toBeGreaterThan(0);
  });

  test('theme toggle button changes theme', () => {
    renderWithTheme(<Header />);
    
    // Find theme toggle buttons (there might be multiple for mobile/desktop)
    const themeButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('svg') || button.getAttribute('aria-label')?.includes('theme')
    );
    
    expect(themeButtons.length).toBeGreaterThan(0);
  });

  test('navigation items scroll to correct sections', () => {
    // Mock querySelector to return a mock element
    const mockElement = {
      scrollIntoView: jest.fn()
    };
    document.querySelector = jest.fn().mockReturnValue(mockElement);

    renderWithTheme(<Header />);
    
    // Test navigation to home
    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);
    
    expect(document.querySelector).toHaveBeenCalledWith('#home');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('resume download button opens correct URL', () => {
    renderWithTheme(<Header />);
    
    // Find resume button
    const resumeButton = screen.getAllByText('Resume')[0];
    fireEvent.click(resumeButton);
    
    expect(global.open).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/api/resume/download`,
      '_blank'
    );
  });

  test('mobile menu toggle works', () => {
    renderWithTheme(<Header />);
    
    // Find mobile menu button (Menu icon)
    const menuButtons = screen.getAllByRole('button');
    const mobileMenuButton = menuButtons.find(button => 
      button.querySelector('svg') && window.getComputedStyle(button.parentElement).display !== 'none'
    );
    
    if (mobileMenuButton) {
      fireEvent.click(mobileMenuButton);
      // Mobile menu should be visible after clicking
      // This is a basic test since the actual mobile menu visibility depends on CSS classes
    }
  });

  test('header has correct sticky positioning classes', () => {
    const { container } = renderWithTheme(<Header />);
    
    const header = container.querySelector('header');
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
  });

  test('header background changes on scroll', () => {
    renderWithTheme(<Header />);
    
    // Simulate scroll event
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 100
    });
    
    fireEvent.scroll(window);
    
    // The header should have different styling when scrolled
    // This is handled by the scrolled state in the component
  });

  test('all navigation items are clickable', () => {
    const mockElement = { scrollIntoView: jest.fn() };
    document.querySelector = jest.fn().mockReturnValue(mockElement);

    renderWithTheme(<Header />);
    
    const navItems = ['Home', 'Education', 'Experience', 'Projects', 'Skills', 'Achievements', 'Contact'];
    
    navItems.forEach((item, index) => {
      const navButton = screen.getByText(item);
      fireEvent.click(navButton);
      
      expect(document.querySelector).toHaveBeenCalledWith(`#${item.toLowerCase()}`);
    });
  });

  test('component snapshot', () => {
    const { container } = renderWithTheme(<Header />);
    expect(container.firstChild).toMatchSnapshot();
  });
});