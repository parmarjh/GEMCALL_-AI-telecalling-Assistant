import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('renders the Auth component when not logged in', () => {
        render(<App />);
        // Check for the "Welcome Back" heading which is present in the Auth component by default
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
        // Check for Sign In buttons (Tab and Submit)
        const signInButtons = screen.getAllByRole('button', { name: /sign in/i });
        expect(signInButtons).toHaveLength(2);
    });
});
