// npm installs
import { BrowserRouter } from 'react-router';
import { render, screen } from '@testing-library/react';

// project imports
import App from '../App';
import { CreateExercise, CreateUser, ExercisesList } from '../components/__index.js';

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  post: jest.fn(),
}));


/* ---------------------------------------------------------------------------
 *    Unit tests for Rendering App.js
/* ------------------------------------------------------------------------- */ 
describe('|--------------------- App.test.js render ---------------------|', () => {
  
  // -- Render Page and check if the title is on the screen.
  test('renders default page', () => {
    render(<App />);

    expect(screen.getByText(/ExcerTracker/i)).toBeInTheDocument();
  });

  // -- Render List of Exercises component and check if it exists based on its header title. 
  test('renders exercise list', () => {
    const pathname = '/';

    const { getByTestId } = render(
        <BrowserRouter>
          <ExercisesList location = {{pathname}}/>
        </BrowserRouter> );

    expect(getByTestId('dashboard-display')).toHaveTextContent('All Exercises Posted ');
  });

  // -- Render List of Create Exercise page and check if it exists based on its header title.
  test('renders create exercise', () => {
    const pathname = '/create';

    const { getByTestId } = render(
        <BrowserRouter>
          <CreateExercise location = {{pathname}}/>
        </BrowserRouter> );

    expect(getByTestId('createExercise-display')).toHaveTextContent('Create New Exercise Log');
  });

  // -- Render List of Create User page and check if it exists based on its header title. 
  test('renders create user', () => {
    const pathname = '/create';

    const { getByTestId } = render(
        <BrowserRouter>
          <CreateUser location = {{pathname}}/>
        </BrowserRouter> );

    expect(getByTestId('createUser-display')).toHaveTextContent('Create New User');
  });
});

