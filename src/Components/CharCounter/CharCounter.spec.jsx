import { screen, render } from '@testing-library/react';
import { CharCounter } from './index';

describe('<CharCounter />', () => {
	it.only('should display default text if no character count is passed in', () => {
		render(<CharCounter />);

		expect(screen.getByText(/start typing/i)).toBeInTheDocument();
	});
	it.todo('should display character count text if passed in')
});
