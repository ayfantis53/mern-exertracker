// npm installs
import axios from 'axios';
import { act, render, screen } from '@testing-library/react';

// project imports
import { ExercisesList } from '../../components/__index.js';


// mock axios.
jest.mock('axios', () => ({
  ...jest.requireActual("axios"),
  get: jest.fn(), 
}));

/** ----------------------------------------------------------------------------------------
 *  Validate ExercisesList Component rendering
 * ---------------------------------------------------------------------------------------- */
describe('|--------------------- exercise-list.test.js render ---------------------|', () => {
    
  // -- Hook to render page before each test.
    beforeEach(() => {
        // render page.
        render(<ExercisesList />);
    });

    // -- Validate inputs are empty.
    test('Inputs Initially empty', async () => {
      await act(async () => {
        expect(screen.getByTestId('dashboard-display')).toHaveTextContent('All Exercises Posted ');
      });
    });
});

/** ----------------------------------------------------------------------------------------
 *  Validate ExercisesList Component functionality
 * ---------------------------------------------------------------------------------------- */
describe('|--------------------- exercise-list.test.js api ---------------------|', () => {
  
  // -- Hook to render page before each test.
  beforeEach(() => {
      render(<ExercisesList />);
  });

  // -- Validate onSubmit button POST api is working.
  test('Validate api functionality when page is loaded', async () => {

    await act(async () => {
      // Make our mock axios call to check if we sent the right data.
      expect(axios.get).toHaveBeenCalledWith('/api/exercises');
    });
  });
});