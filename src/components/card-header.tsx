import React from "react";

const CardHeader = (props:any) => (
    <div className="card-header">
        <h4>{ props.children }</h4>
    </div>
)

export default CardHeader;
