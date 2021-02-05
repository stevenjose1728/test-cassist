import ReactLoading from 'react-loading';
import React from "react";

type LoadingOption = {
    type?:'blank' | 'balls' | 'bars' | 'bubbles' | 'cubes' | 'cylon' | 'spin' | 'spinningBubbles' | 'spokes',
    color?:string,
    delay?:number,
    height?:number | string,
    wigth?:number | string,
    className?:string
}

function Loading(op:LoadingOption){
    return <ReactLoading type={op.type} color={op.color} height={op.height || '20%'} width={op.wigth || '20%'} />
}

export default Loading;
