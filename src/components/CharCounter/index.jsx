import PropTypes from 'prop-types';

export const CharCounter = ( { characterCount }) => (
	<div className="flex">
		<div
			className="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-400 group"
		>
			<span data-testid="characterCount" className="text-sm text-gray-500 group-hover:text-gray-600 italic">
				{
					characterCount ?
						`${characterCount} characters` :
						'Start typing...'
				}
			</span>
		</div>
	</div>
);

CharCounter.defaultProps = {
	characterCount: 0,
}

CharCounter.propTypes = {
	characterCount: PropTypes.number.isRequired,
};
