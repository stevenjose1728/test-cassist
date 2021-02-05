import React, {ReactDOM} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Icon } from 'components';
import $ from 'jquery';

interface ModalProps {
	visible?: boolean,
	size?:"lg" | "sm" | "xl" | undefined,
	title?:string,
	className?:string,
	isLoading?:boolean,
	footerActions?:boolean,
	onClose:Function,
	onSubmit?: () => void,
	onShow?:() => void,
	footerDisabled?: boolean,
	typeInputSave?:string,
}

class _Modal extends React.Component<ModalProps> {

	constructor(props: ModalProps){
		super(props);
    }

	render() {
		return (
			<Modal 
				tabIndex="0"
				size={this.props.size || 'lg'}
				className={ this.props.className }
				show={ this.props.visible }
				onHide={ () => this.props.onClose() }
				onShow={ () => this.props?.onShow ? this.props.onShow() : null }
			>
				<Modal.Header closeButton>
				  <Modal.Title>{ this.props.title }</Modal.Title>
				</Modal.Header>
				<Modal.Body>{ this.props.children }</Modal.Body>
				{
					this.props.footerActions && (
						<Modal.Footer>
							<Button
								variant="default"
								onClick={ () => this.props.onClose() }
							>
								Cerrar
							</Button>
							<Button
								type={this.props.typeInputSave || 'button'}
								disabled={this.props.footerDisabled}
								onClick={this.props.onSubmit}
							>
								<Icon name="check" className="mr-1" />Guardar
							</Button>
						</Modal.Footer>
					)
				}				
			</Modal>
		)
	}
}

export default _Modal;