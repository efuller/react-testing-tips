import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreatePost } from './index';
import { savePost as mockSavePost } from '../../services';

jest.mock('../../services');

describe('<CreatePost />', () => {
	it('should display an error if the form is submitted with no title', async () => {
		render(<CreatePost />);

		// Get the submit button and submit the form.
		const button = screen.getByRole('button');
		fireEvent.submit(button);

		// Find the alert element.
		const alert = await screen.findAllByRole('alert');

		// Assertions.
		expect(alert.length).toBe(1);
		expect(alert[0]).toHaveTextContent(/title/i);
	});

	it('should hide error once title has been entered', async () => {
		render(<CreatePost />);

		// Get the submit button and submit the form.
		const button = screen.getByRole('button');
		fireEvent.submit(button);

		// Find the alert element.
		const alert = await screen.findAllByRole('alert');

		// Assert that the alert is present.
		expect(alert.length).toBe(1);

		// Get the title input and type a value in it.
		const titleInput = await screen.getByLabelText(/title/i);
		await userEvent.type(titleInput, 'T');

		// Assert that the alert eventually goes away.
		await waitFor(() => {
			expect(screen.queryAllByRole('alert').length).toBe(0);
		});
	});

	it('should display the content character count text after entering content', async () => {
		const content = 'This is some very interesting post content.';

		render(<CreatePost />);

		// Get the content input and add some content to it.
		const contentInput = await screen.getByLabelText(/content/i);
		await userEvent.type(contentInput, content);

		// Get the character count element.
		const characterCount = screen.getByTestId('characterCount');

		// Assert that the character count text eventually displays.
		await waitFor(() => {
			expect(characterCount).toHaveTextContent(`${content.length} characters`);
		});
	});

	it('should call createPost with the correct correct data and disable button while submitting', async () => {
		const title = 'This is a blog post title';
		const content = 'This is some very interesting post content.';

		// Mock the resolved response of savePost.
		mockSavePost.mockResolvedValueOnce(true);

		render(<CreatePost />);

		// Get the title input and add content to it.
		const titleInput = await screen.getByLabelText(/title/i);
		await userEvent.type(titleInput, title);

		// Get the content input and add content to it.
		const contentInput = await screen.getByLabelText(/content/i);
		await userEvent.type(contentInput, content);

		// Get the submit button and submit the form.
		const button = screen.getByRole('button');
		fireEvent.submit(button);

		// Assert that the button will eventually be disabled while in a loading state.
		await waitFor(() => {
			expect(button).toBeDisabled();
		});

		// Assert that savePost is called with the correct data.
		expect(mockSavePost).toHaveBeenCalledWith({ title, content });

		// Assert that the button is eventually not disabled.
		await waitFor(() => {
			expect(button).not.toBeDisabled();
		});
	});
});
