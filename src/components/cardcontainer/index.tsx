import React, { Children, JSX } from "react";

interface Props {
    children?: JSX.Element
}

const CardContainer = (props: Props) => {
    return (
        <div className="row w-75 justify-content-around">
            {props.children}
        </div>
    )
}

export default CardContainer;