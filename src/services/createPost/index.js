import axios from 'axios';

export const createPost = ({ title, content = '' }) => {
	return axios.post('https://jsonplaceholder.typicode.com/posts', {
		title,
		body: content,
	});
}
