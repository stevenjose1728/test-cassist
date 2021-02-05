const Title = (props: {
	name: string,
	right: boolean,
}) => (
	<h2 className="title-component">
		{ props.name }
		{ props.right && <div className="title-component-right">
			{ props.right }
		</div> }
	</h2>
)

export default Title;