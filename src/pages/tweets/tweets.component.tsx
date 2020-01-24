import * as React from 'react';
import './tweets.styles.css'
import { Collection } from '../../components/collection/collection.component';
import { Pagination } from '../../components/pagination/pagination.component';

export interface Tweet {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export class Tweets extends React.Component<any, any> {
    totalPageCount: number = 50;

    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.updateCollection(1);
    }

    onPageSelected = (pageNumber: number) => {
        this.updateCollection(pageNumber);
    }

    updateState = (data: Tweet[]) => {
        const collectionData = data.map((tweet: Tweet) => {
            return {
                id: tweet.id,
                body: tweet.body
            };
        });
        this.setState({ data: collectionData });
    }

    updateCollection = (pageNumber: number)  => {
        this.fetchTweets(pageNumber)
        .then((response) => response.json())
        .then((response: Tweet[]) => {
            this.updateState(response);
        })
        .catch((error) => console.log(error));
    }

    fetchTweets = (pageNumber: number) => {
        return fetch(`http://jsonplaceholder.typicode.com/posts/1/comments?_page=${pageNumber}`);
    }

    render() {
        const { data } = this.state;
        return (
            <div className="tweets-page">
                <div className="tweets-page--collection">
                    <Collection data={data}></Collection>
                </div>
                <div className="tweets-page--pagination">
                <Pagination
                    totalPageCount={this.totalPageCount}
                    onPageChange={this.onPageSelected} />
                </div>
            </div>

        );
    }
}
