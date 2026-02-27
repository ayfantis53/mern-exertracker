// npm installs
import { BrowserRouter  } from "react-router";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// project imports
import { Navbar } from '../../components/__index.js';


/** ----------------------------------------------------------------------------------------
 *  Validate NavBar Component functionality
 * ---------------------------------------------------------------------------------------- */ 
describe('|--------------------- navbar.test.js render ---------------------|', () => {

    // -- Hook to render Navbar before each test.
    beforeEach(() => {
        render(<BrowserRouter>
                  <Navbar />
               </BrowserRouter>);
    });

    // -- Validate "ExcerTracker" Link button exists.
    test('ExcerTracker title link exists', () => {
       // Find ExcerTracker link field.
        const linkTitle = screen.getByRole('link', { name: "ExcerTracker" });
        // Verify it exists.
        expect(linkTitle).toBeInTheDocument();
    });

    // -- Validate "Exercise" Link button exists.
    test('Exercises link exists', () => {
       // Find Exercises link field.
        const linkExercises = screen.getByRole('link', { name: "Exercises" });
        // Verify it exists.
        expect(linkExercises).toBeInTheDocument();
    });

    // -- Validate "Create Exercises Log" Link button exists.
    test('Exercises link exists', () => {
       // Find Create Exercises Log link field.
        const linkCreateExercises = screen.getByRole('link', { name: "Create Exercises Log" });
        // Verify it exists.
        expect(linkCreateExercises).toBeInTheDocument();
    });

    // -- Validate "Create User" Link button exists.
    test('Exercises link exists', () => {
       // Find Create User link field.
        const linkCreateUser = screen.getByRole('link', { name: "Create User" });
        // Verify it exists.
        expect(linkCreateUser).toBeInTheDocument();
    });
});

/** ----------------------------------------------------------------------------------------
 *  Validate NavBar Component functionality
 * ---------------------------------------------------------------------------------------- */ 
describe('|--------------------- navbar.test.js links ---------------------|', () => {

    // -- Hook to render Navbar before each test.
    beforeEach(() => {
        render(<BrowserRouter>
                  <Navbar />
               </BrowserRouter>);
    });

    // -- Validate "ExcerTracker" link works.
    test('Validate ExcerTracker link navigates correctly', () => {
        // Find ExcerTracker link field.
        const linkTitle = screen.getByRole('link', { name: "ExcerTracker" });
        // Click on link.
        userEvent.click(linkTitle);
        // Make sure its path is correct.
        expect(window.location.pathname).toBe('/');
    });

    // -- Validate "Exercises" link works.
    test('Validate Exercises link navigates correctly', () => {
        // Find Exercises link field.
        const linkExercises = screen.getByRole('link', { name: "Exercises" });
        // Click on link.
        userEvent.click(linkExercises);
        // Make sure its path is correct.
        expect(window.location.pathname).toBe('/');
    });

    // -- Validate "Create Exercises Log" link works.
    test('Validate Exercises link navigates correctly', () => {
        // Find Create Exercises link field.
        const linkCreateExercises = screen.getByRole('link', { name: "Create Exercises Log" });
        // Click on link.
        userEvent.click(linkCreateExercises);
        // Make sure its path is correct.
        expect(window.location.pathname).toBe('/create');
    });

    // -- Validate "Create User" link works.
    test('Validate Create User link navigates correctly', () => {
        // Find Create User link field.
        const linkCreateUser = screen.getByRole('link', { name: "Create User" });
        // Click on link.
        userEvent.click(linkCreateUser);
        // Make sure its path is correct.
        expect(window.location.pathname).toBe('/user');
    });
});
