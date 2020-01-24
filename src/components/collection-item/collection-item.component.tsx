import * as React from "react";
import './collection-item.styles.css';

export interface CollectionItemProps {
    message: string;
}
export const CollectionItem = (props: CollectionItemProps) => (
    <div className="test">
        <p>{props.message}</p>
    </div>
)