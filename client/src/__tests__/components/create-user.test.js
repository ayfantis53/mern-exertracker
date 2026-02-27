// npm installs
import axios     from 'axios';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';

// project imports
import { CreateUser } from '../../components/__index.js';


// mock axios.
jest.mock('axios', () => ({
  ...jest.requireActual("axios"),
  post: jest.fn(),
}));

/** ----------------------------------------------------------------------------------------
 *  Validate CreateUser Component rendering
 * ---------------------------------------------------------------------------------------- */ 
describe('|--------------------- create-user.test.js render ---------------------|', () => {
    
  // -- Hook to render page before each test.
  beforeEach(() => {
      render(<CreateUser />);

      // provide an empty implementation for window.alert.
      // remember the jsdom alert.
      jsdomAlert = window.alert; 
      window.alert = () => {}; 
  });

  // -- Hook to reset settings after each test.
  afterEach(() => {
    // restore the jsdom alert.
    window.alert = jsdomAlert;
  });

  // -- Validate inputs are empty.
  test('Inputs Initially empty', () => {
      // Find Username field.
      const createUserElement = screen.getByPlaceholderText('Username...');
      // Verify input is empty.
      expect(createUserElement.value).toBe("");
  });

  // -- Validate input "Username" populates correctly.
  test('Inputs populate correctly', () => {
    // Find Username field.
    const createUserElement = screen.getByPlaceholderText('Username...');
    // Enter in a text.
    userEvent.type(createUserElement, "Mike Andrew");
    // Verify that text showed up in input textbox.
    expect(createUserElement.value).toBe("Mike Andrew");
  });

  // -- onSubmit button is responsive.
  test('Validate OnSubmit button is being called when pressed', () => {
    // Mock onSubmit button.
    const handleOnSubmitMock = jest.fn();
    screen.getByTestId('user-form').onsubmit = handleOnSubmitMock;

    // Select button.
    fireEvent.click(screen.getByRole("button", { name: "Create New User" }));

    // Verify that button calls onsubmit.
    expect(handleOnSubmitMock).toHaveBeenCalled();
  });
});

/** ----------------------------------------------------------------------------------------
 *  Validate CreateUser Component functionality
 * ---------------------------------------------------------------------------------------- */
describe('|--------------------- create-user.test.js api ---------------------|', () => {
  
  // -- Hook to render page before each test.
  beforeEach(() => {
      render(<CreateUser />);

      // provide an empty implementation for window.alert.
      // remember the jsdom alert.
      jsdomAlert = window.alert; 
      window.alert = () => {}; 
  });

  // -- Hook to render page after each test.
  afterEach(() => {
    // restore the jsdom alert.
    window.alert = jsdomAlert;
  });

  // -- Validate onSubmit button POST api is working.
  test('Validate api functionality when OnSubmit is called', () => {
      fireEvent.change(screen.getByPlaceholderText(/Username.../i), { target: { value: 'Andrew' } });
      fireEvent.click(screen.getByRole("button", { name: "Create New User" }));

      // Make our mock axios call to check if we sent the right data.
      expect(axios.post).toHaveBeenCalledWith('/api/users/add', { username: 'Andrew' });
  });
});