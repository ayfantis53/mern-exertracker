// npm installs
import axios     from 'axios';
import userEvent from '@testing-library/user-event';
import { act, render, screen, fireEvent } from '@testing-library/react';

// project imports
import { CreateExercise } from '../../components/__index.js';


// mock axios.
jest.mock('axios', () => ({
  ...jest.requireActual("axios"),
  post: jest.fn(), 
}));

/** ----------------------------------------------------------------------------------------
 *  Validate CreateExercise Component rendering
 * ---------------------------------------------------------------------------------------- */
describe('|--------------------- create-exercise.test.js render ---------------------|', () => {
    
  // -- Hook to render page before each test.
    beforeEach(async () => {
        // Set world time to 0.
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('0'));

        // render page.
        render(<CreateExercise />);

        /** provide an empty implementation for window.alert. */
        // remember the jsdom alert.
        jsdomAlert = window.alert; 
        window.alert = () => {}; 
    });

    // -- Hook to reset settings after each test.
    afterEach(() => {
      // Reset fake timers.
      jest.useRealTimers();
      // restore the jsdom alert.
      window.alert = jsdomAlert;
    });

    // -- Validate inputs are empty.
    test('Inputs Initially empty', () => {
        // Find input fields.
        const descriptionInputElement = screen.getByPlaceholderText('Description...');
        const durationInputElement    = screen.getByPlaceholderText(0);
        const datePickerInputElement  = screen.getByLabelText('Date:');

        // Verify inputs are empty or properly initialized.
        expect(descriptionInputElement.value).toBe("");
        expect(durationInputElement.value).toBe("");
        expect(datePickerInputElement.value).toBe("01/01/2000");
      });

      // -- Validate input "description" populates correctly.
      test('Input populate correctly "Description"', () => {
        // Find Description field.
        const descriptionInputElement = screen.getByPlaceholderText('Description...');
        // Enter in a text.
        userEvent.type(descriptionInputElement, "Added a Description");
        // Verify that text showed up in input textbox.
        expect(descriptionInputElement.value).toBe("Added a Description");
      });

      // -- Validate input "duration" populates correctly.
      test('Input populate correctly "Duration"', () => {
        // Find Duration field.
        const durationInputElement = screen.getByPlaceholderText(0);
        // Enter in a text.
        userEvent.type(durationInputElement, "100");
        // Verify that text showed up in input textbox.
        expect(durationInputElement.value).toBe("100");
      });

      // -- Validate input "duration" populates correctly.
      test('Input populate correctly "Date"', () => {
        // Find Duration field.
        const datePickerInputElement = screen.getByLabelText('Date:');
        // Clear field and Enter in a text.
        userEvent.clear(datePickerInputElement);
        userEvent.type(datePickerInputElement, "02/02/2025");
        // Verify that text showed up in input textbox.
        expect(datePickerInputElement.value).toBe("02/02/2025");
      });

      // -- onSubmit button is responsive.
      test('Validate OnSubmit button is being called when pressed', () => {
        // Mock onSubmit button
        const handleOnSubmitMock = jest.fn();
        screen.getByTestId('exercise-form').onsubmit = handleOnSubmitMock;

        // Select button.
        fireEvent.click(screen.getByRole("button", { name: "Create Exercise Log" }));

        // Verify that button calls onsubmit.
        expect(handleOnSubmitMock).toHaveBeenCalled();
      });
});

/** ----------------------------------------------------------------------------------------
 *  Validate CreateExercise Component functionality
 * ---------------------------------------------------------------------------------------- */
describe('|--------------------- create-exercise.test.js api ---------------------|', () => {

  // -- Hook to render page before each test.
  beforeEach( async () => {
    // Set world time to 0.
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('0'));

    // render page.
    render(<CreateExercise />);
    
    /** provide an empty implementation for window.alert. */
    // remember the jsdom alert.
    jsdomAlert = window.alert; 
    window.alert = () => {}; 
  });

  // -- Hook to render page after each test.
  afterEach(() => {
    // restore the jsdom alert.
    window.alert = jsdomAlert;
    // Reset fake timers.
    jest.useRealTimers();
  });

  // -- Validate onSubmit button POST api is working.
  test('Validate api functionality when OnSubmit is called', async () => {

      await act(async () => {
        /** Fill out form.  */
        // Fill in text fields.
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test' } });
        fireEvent.change(screen.getByLabelText('Duration (in minutes):'), { target: { value: 5 } });

        // Clear Datepicker value and fill in field.
        fireEvent.reset(screen.getByLabelText('Date:'));
        fireEvent.change(screen.getByLabelText('Date:'), { target: { value : '01/01/2025' } });

        /** Submit form. */
        // Click submit button.
        fireEvent.click(screen.getByRole("button", { name: "Create Exercise Log" }));
      });

      /** Test. */
      // Make our mock axios call to check if we sent the right data.
      expect(axios.post).toHaveBeenCalledWith('/api/exercises/add',
                                               { username:    '',
                                                 description: 'Test', 
                                                 duration:    "5",  
                                                 date:        new Date('2025-01-01T07:00:00.000Z')});
  });
});
