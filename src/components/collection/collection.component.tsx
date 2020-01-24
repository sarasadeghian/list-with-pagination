import * as React from "react";
import './collection.styles.css';
import { CollectionItem } from "../collection-item/collection-item.component";

export interface Item {
    id: number;
    body: string;
}
export interface CollectionProps { data: Item[] }

export const Collection = (props: CollectionProps) => (
    <div className="collection">
        {
            props.data.map((item: Item) => {
                return (
                    <div className="collection--item" key={item.id}>
                        <CollectionItem message={item.body} />
                    </div>
                )
            })
        }
    </div>
);
