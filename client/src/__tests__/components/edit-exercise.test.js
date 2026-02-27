// npm installs
import axios     from 'axios';
import userEvent from '@testing-library/user-event';
import { act, render, screen, fireEvent } from '@testing-library/react';

// project imports
import { EditExercise } from '../../components/__index.js';


// mock axios.
jest.mock('axios', () => ({
  ...jest.requireActual("axios"),
  put: jest.fn(), 
}));

/** ----------------------------------------------------------------------------------------
 *  Validate EditExercise Component rendering
 * ---------------------------------------------------------------------------------------- */
describe('|--------------------- edit-exercise.test.js render ---------------------|', () => {
    
  // -- Hook to render page before each test.
    beforeEach(() => {
        // Set world time to 0.
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('0'));

        // render page.
        render(<EditExercise />);
    });

    // -- Hook to reset settings after each test.
    afterEach(() => {
      // Reset fake timers.
      jest.useRealTimers();
    });

    // -- Validate inputs are empty.
    test('Inputs have Initial values', () => {
        // Find input fields.
        const descriptionInputElement = screen.getByLabelText('Description');
        const durationInputElement    = screen.getByLabelText('Duration (in minutes):');
        const datePickerInputElement  = screen.getByLabelText('Date:');

        // Verify inputs are empty or properly initialized.
        expect(descriptionInputElement.value).toBe("");
        expect(durationInputElement.value).toBe("0");
        expect(datePickerInputElement.value).toBe("01/01/2000");
      });

      // -- Validate input "description" populates correctly.
      test('Input populate correctly "Description"', () => {
        // Find Description field.
        const descriptionInputElement = screen.getByLabelText('Description');
        // Enter in a text.
        userEvent.type(descriptionInputElement, "Added a Description");
        // Verify that text showed up in input textbox.
        expect(descriptionInputElement.value).toBe("Added a Description");
      });

      // -- Validate input "duration" populates correctly.
      test('Input populate correctly "Duration"', () => {
        // Find Duration field.
        const durationInputElement = screen.getByLabelText('Duration (in minutes):');
        // Enter in a text.
        userEvent.clear(durationInputElement);
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
});

/** ----------------------------------------------------------------------------------------
 *  Validate CreateUser Component functionality
 * ---------------------------------------------------------------------------------------- */
describe('|--------------------- edit-exercise.test.js api ---------------------|', () => {

  // -- Hook to render page before each test.
  beforeEach( async () => {
    // Set world time to 0.
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('0'));

    // render page.
    render(<EditExercise />);
    
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
        fireEvent.click(screen.getByRole("button", { name: "Edit Exercise Log" }));
      });

      /** Test. */
      // Make our mock axios call to check if we sent the right data.
      // undefined in route because there is supposed to be an id there.
      expect(axios.put).toHaveBeenCalledWith('/api/exercises/update/undefined',
                                               { username:    '',
                                                 description: 'Test', 
                                                 duration:    "5",  
                                                 date:        new Date('2025-01-01T07:00:00.000Z')});
  });
});