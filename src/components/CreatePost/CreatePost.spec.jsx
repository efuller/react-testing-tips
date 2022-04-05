import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreatePost } from './index';

describe('<CreatePost />', () => {
	it('should display an error if the form is submitted with no title', async () => {
		render(<CreatePost />);

		const button = screen.getByRole('button');
		fireEvent.submit(button);

		const alert = await screen.findAllByRole('alert');
		expect(alert.length).toBe(1);
		expect(alert[0]).toHaveTextContent(/title/i);
	});

	it.only('should hide error once title has been entered', async () => {
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

	it.todo('should display the content character count text after entering content');
	it.todo('should call createPost with the correct correct data');
	it.todo('should disable create button while submitting new post');
})
