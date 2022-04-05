import { CharCounter } from '../CharCounter';

export const CreatePost = () => (
	<form action="#" className="relative">
		<div className="border border-gray-300 mb-5 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
			<label htmlFor="title" className="sr-only">
				Post Title
			</label>
			<input
				type="text"
				name="title"
				id="title"
				className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
				placeholder="Title"
			/>
			<label htmlFor="content" className="sr-only">
				Post Content
			</label>
			<textarea
				rows={2}
				name="content"
				id="content"
				className="block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
				placeholder="Write post content here..."
				defaultValue={''}
			/>

			{/* Spacer element to match the height of the toolbar */}
			<div aria-hidden="true">
				<div className="py-2">
					<div className="h-9" />
				</div>
				<div className="h-px" />
				<div className="py-2">
					<div className="py-px">
						<div className="h-9" />
					</div>
				</div>
			</div>
			<div className="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
				<CharCounter />
				<div className="flex-shrink-0">
					<button
						type="submit"
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Create
					</button>
				</div>
			</div>
		</div>
	</form>
);
