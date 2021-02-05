import { HexBase64BinaryEncoding } from "crypto";

const Avatar = (props: {
	size: number | string,
	source: string | HexBase64BinaryEncoding
}) => (
	<img className="img-avatar" style={
		{
			width: props.size,
			height: props.size,
			borderRadius: `calc(${ props.size } * 2)`
		}
	} src={ props.source } />
)

export default Avatar;