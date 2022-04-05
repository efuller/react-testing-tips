import { render } from '@testing-library/react';
import { CharCounter } from './index';

describe('<CharCounter />', () => {
	it('should display default text if no character count is passed in', () => {
		render(<CharCounter />);

		// Assert that the default character count text is displaying.
	});

	it('should display character count text if passed in', () => {
		render(<CharCounter characterCount={32} />);

		// Assert that the character count text is displaying.
	});
});
