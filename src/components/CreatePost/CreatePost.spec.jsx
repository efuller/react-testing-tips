import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreatePost } from './index';
import { savePost as mockSavePost } from '../../services';

jest.mock('../../services');

describe('<CreatePost />', () => {
	it('should display an error if the form is submitted with no title', async () => {
		render(<CreatePost />);

		const button = screen.getByRole('button');
		fireEvent.submit(button);

		const alert = await screen.findAllByRole('alert');
		expect(alert.length).toBe(1);
		expect(alert[0]).toHaveTextContent(/title/i);
	});

	it('should hide error once title has been entered', async () => {
		render(<CreatePost />);

		const button = screen.getByRole('button');
		fireEvent.submit(button);

		const alert = await screen.findAllByRole('alert');
		expect(alert.length).toBe(1);

		const titleInput = await screen.getByLabelText(/title/i);
		await userEvent.type(titleInput, 'T');

		await waitFor(() => {
			expect(screen.queryAllByRole('alert').length).toBe(0);
		})
	});

	it('should display the content character count text after entering content', async () => {
		const content = 'This is some very interesting post content.';

		render(<CreatePost />);

		const contentInput = await screen.getByLabelText(/content/i);
		await userEvent.type(contentInput, content);

		const characterCount = screen.getByTestId('characterCount');

		await waitFor(() => {
			expect(characterCount).toHaveTextContent(`${content.length} characters`);
		});
	});

	it('should call createPost with the correct correct data and disable button while submitting', async () => {
		const title = 'This is a blog post title';
		const content = 'This is some very interesting post content.';

		mockSavePost.mockResolvedValueOnce(true);

		render(<CreatePost />);

		const contentInput = await screen.getByLabelText(/content/i);
		await userEvent.type(contentInput, content);

		const titleInput = await screen.getByLabelText(/title/i);
		await userEvent.type(titleInput, title);

		const button = screen.getByRole('button');
		fireEvent.submit(button);

		await waitFor(() => {
			expect(button).toBeDisabled();
		});

		expect(mockSavePost).toHaveBeenCalledWith({ title, content });

		await waitFor(() => {
			expect(button).not.toBeDisabled();
		});
	});
});
