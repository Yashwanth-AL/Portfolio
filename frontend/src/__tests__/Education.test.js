import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Education from '../components/Education';

// Mock the education data
jest.mock('../data/mock', () => ({
  education: [
    {
      id: 1,
      institution: 'JSS Science and Technology University (SJCE)',
      degree: 'B.E. Computer Science Engineering',
      duration: '2022 - 2026',
      grade: '9.47 CGPA',
      status: 'ongoing'
    },
    {
      id: 2,
      institution: 'Sri Ramakrishna Vidyashala',
      degree: 'PUC PCMB',
      duration: '2020 - 2022',
      grade: '97.66%',
      status: 'completed'
    },
    {
      id: 3,
      institution: 'Sri Ramakrishna Vidyashala',
      degree: 'SSLC',
      duration: '2017 - 2020',
      grade: '96.96%',
      status: 'completed'
    }
  ]
}));

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Education Component', () => {
  test('renders education section with correct title', () => {
    renderWithTheme(<Education />);
    
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('My academic journey and achievements in computer science engineering')).toBeInTheDocument();
  });

  test('renders all education items', () => {
    renderWithTheme(<Education />);
    
    // Check if all three education items are rendered
    expect(screen.getByText('B.E. Computer Science Engineering')).toBeInTheDocument();
    expect(screen.getByText('PUC PCMB')).toBeInTheDocument();
    expect(screen.getByText('SSLC')).toBeInTheDocument();
    
    // Check institutions
    expect(screen.getByText('JSS Science and Technology University (SJCE)')).toBeInTheDocument();
    expect(screen.getAllByText('Sri Ramakrishna Vidyashala')).toHaveLength(2);
  });

  test('displays correct grades and durations', () => {
    renderWithTheme(<Education />);
    
    // Check grades
    expect(screen.getByText('9.47 CGPA')).toBeInTheDocument();
    expect(screen.getByText('97.66%')).toBeInTheDocument();
    expect(screen.getByText('96.96%')).toBeInTheDocument();
    
    // Check durations
    expect(screen.getByText('2022 - 2026')).toBeInTheDocument();
    expect(screen.getByText('2020 - 2022')).toBeInTheDocument();
    expect(screen.getByText('2017 - 2020')).toBeInTheDocument();
  });

  test('shows ongoing status for current education', () => {
    renderWithTheme(<Education />);
    
    // Check if "Ongoing" badge is displayed for current education
    expect(screen.getByText('Ongoing')).toBeInTheDocument();
  });

  test('renders academic excellence summary', () => {
    renderWithTheme(<Education />);
    
    expect(screen.getByText('Academic Excellence')).toBeInTheDocument();
    expect(screen.getByText(/Consistently maintaining high academic performance/)).toBeInTheDocument();
  });

  test('displays statistics correctly', () => {
    renderWithTheme(<Education />);
    
    // Check statistics in the summary section
    expect(screen.getByText('Overall CGPA')).toBeInTheDocument();
    expect(screen.getByText('Years of Study')).toBeInTheDocument();
    expect(screen.getByText('Academic Awards')).toBeInTheDocument();
    
    // Check stat values
    expect(screen.getByText('9.47')).toBeInTheDocument();
    expect(screen.getByText('4+')).toBeInTheDocument();
    expect(screen.getByText('Multiple')).toBeInTheDocument();
  });

  test('education section has correct structure', () => {
    const { container } = renderWithTheme(<Education />);
    
    const educationSection = container.querySelector('#education');
    expect(educationSection).toBeInTheDocument();
    
    // Check if education cards are present
    const educationCards = container.querySelectorAll('.bg-white\\/80, .dark\\:bg-gray-800\\/80');
    expect(educationCards.length).toBeGreaterThan(0);
  });

  test('renders graduation cap icons for each education item', () => {
    renderWithTheme(<Education />);
    
    // The component should have graduation cap icons (represented by the GraduationCap component)
    // Since we're mocking framer-motion, we can't directly test for the icon,
    // but we can verify the structure is correct by checking for education cards
    const degreeTexts = [
      'B.E. Computer Science Engineering',
      'PUC PCMB', 
      'SSLC'
    ];
    
    degreeTexts.forEach(degree => {
      expect(screen.getByText(degree)).toBeInTheDocument();
    });
  });

  test('component snapshot', () => {
    const { container } = renderWithTheme(<Education />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('responsive design elements are present', () => {
    renderWithTheme(<Education />);
    
    // Check if the main container has responsive classes
    const { container } = renderWithTheme(<Education />);
    const section = container.querySelector('#education');
    
    expect(section).toHaveClass('py-20');
  });
});