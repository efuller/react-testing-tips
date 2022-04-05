import PropTypes from 'prop-types';

export const PostList = ( { posts = [] }) => {
	if (posts.length < 1) {
		return null;
	}

	return (
		<div className="bg-white shadow shadow-gray-400 overflow-hidden sm:rounded-md">
			<ul role="list" className="divide-y divide-gray-200 border-gray-200">
				{posts.map((post, i) => (
					<li key={i} className="border-gray-500">
						<div className="px-4 py-4 flex items-center sm:px-6">
							<div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
								<div className="truncate">
									<div className="flex text-sm">
										<p className="flex-shrink-0 font-bold text-indigo-600 text-2xl">{post.title}</p>
									</div>
									<div className="mt-2 flex">
										<div className="flex items-center text-lg text-gray-500">
											<p>{post.content}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

PostList.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			content: PropTypes.string,
		})
	)
}
