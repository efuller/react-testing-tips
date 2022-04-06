/**
 * This component will require some changes.
 *
 * - it should take a characterCount prop
 * - if there is no character count passed in, it should show some default text
 * - if there is a character count prop passed in, then display text using the count
 */
export const CharCounter = () => (
	<div className="flex">
		<div
			className="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-400 group"
		>
			<span data-testid="characterCount" className="text-sm text-gray-500 group-hover:text-gray-600 italic">
				24 characters
			</span>
		</div>
	</div>
);
