import React, { Component } from 'react';

interface ImageProps {
    url?:string,
    alt?:string,
    className?:string
    width?:number,
}

export class Image extends Component<ImageProps> {

    constructor(props:ImageProps){
        super(props);
    }

    render() {
        return (
            <div>
                <div className="d-flex" >
                    <img 
                    src={this.props.url} 
                    alt={this.props.alt} 
                    className={`${this.props.className} img-fluid img-${this.props.width || 120} mr-2 blur-up lazyloaded`}
                />
                </div>
            </div>
        )
    }
}

export default Image
