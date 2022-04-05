import { render } from '@testing-library/react';
import { CreatePost } from './index';

// Mock the savePost service function.

describe('<CreatePost />', () => {
	it('should display an error if the form is submitted with no title', async () => {
		render(<CreatePost />);

		// Get the submit button and submit the form.

		// Find the alert element.

		// Assert that there is one alert displaying.
		// Assert that the alert has the text 'title' in it.
	});

	it('should hide error once title has been entered', async () => {
		render(<CreatePost />);

		// Get the submit button and submit the form.

		// Find the alert element.

		// Assert that the alert is present.

		// Get the title input and type a value in it.

		// Assert that the alert eventually goes away.
	});

	it('should display the content character count text after entering content', async () => {
		const content = 'This is some very interesting post content.';

		render(<CreatePost />);

		// Get the content input and add some content to it.

		// Get the character count element using a test id.

		// Assert that the character count text eventually displays.
	});

	it('should call createPost with the correct correct data and disable button while submitting', async () => {
		const title = 'This is a blog post title';
		const content = 'This is some very interesting post content.';

		// Mock the resolved response of savePost.

		render(<CreatePost />);

		// Get the title input and add content to it.

		// Get the content input and add content to it.

		// Get the submit button and submit the form.

		// Assert that the button will eventually be disabled while in a loading state.

		// Assert that savePost is called with the correct data.

		// Assert that the button is eventually not disabled.
	});
});
