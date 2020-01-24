import * as React from 'react';
import './pagination.styles.css';

export interface PaginationProps {
    totalPageCount: number;
    onPageChange: (pageNumber: number) => void;
}

export interface PaginationControl {
    showFirstDots: boolean;
    showLastDots: boolean;
    isPreviousDisabled: boolean;
    isNextDisabled: boolean;
}

export class Pagination extends React.Component<PaginationProps, any> {
    firstPage: number;
    lastPage: number;

    constructor(props: any) {
        super(props);
        this.firstPage = 1;
        this.lastPage = this.props.totalPageCount;
        this.state = {
            selectedPage: 1,
            startPage: 2,
            finishPage: 7,
            paginationControl: {
                showFirstDots: false,
                showLastDots: true,
                isPreviousDisabled: true,
                isNextDisabled: false
            }
        }

    }

    onPageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        let currentPage = parseInt(event.currentTarget.value);
        this.updatePaginationView(currentPage);
        this.props.onPageChange(currentPage);
    }

    onPreviousClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        let currentPage = this.state.selectedPage - 1;
        this.updatePaginationView(currentPage);
        this.props.onPageChange(currentPage);
    }

    onNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        let currentPage = this.state.selectedPage + 1;
        this.updatePaginationView(currentPage);
        this.props.onPageChange(currentPage);
    }

    updatePaginationView = (currentPage: number) => {
        const fromStart = currentPage - this.firstPage;
        const fromEnd = this.lastPage - currentPage;

        if (fromStart <= 3) {
            this.updateState(currentPage, this.firstPage + 1, this.firstPage + 6);
        }
        else if (fromEnd <= 3) {
            this.updateState(currentPage, this.lastPage - 6, this.lastPage - 1)
        }
        else if (fromStart > 3 && fromEnd > 3) {
            this.updateState(currentPage, currentPage - 3, currentPage + 3);
        }
    }

    sequenceGenerator = (start: number, stop: number, step: number) => {
        return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
    }

    updateState = (selectedPage: number, startPage: number, finishPage: number) => {
        this.setState({
            selectedPage: selectedPage,
            startPage: startPage,
            finishPage: finishPage,
            paginationControl: {
                showFirstDots: (selectedPage - this.firstPage) > 4,
                showLastDots: (this.lastPage - selectedPage) > 4,
                isPreviousDisabled: selectedPage === this.firstPage,
                isNextDisabled: selectedPage === this.lastPage
            }
        });
    }

    render() {
        const { startPage, finishPage, paginationControl } = this.state;
        const pageList = this.sequenceGenerator(startPage, finishPage, 1);
        return (
            <div className="pagination-container">
                <ul>
                    <li className={this.state.selectedPage === this.firstPage ? 'disabled-button': undefined }>
                        <button onClick={this.onPreviousClick} disabled={paginationControl.isPreviousDisabled}>&lt;</button>
                    </li>
                    <li className={this.state.selectedPage === this.firstPage ? 'active' : undefined}>
                        <button onClick={this.onPageClick} value={this.firstPage}>{this.firstPage}</button>
                    </li>
                    {(paginationControl.showFirstDots) ? <li className="pagination-dots"><button>..</button></li> : null}
                    {
                        pageList.map((num: number, index: number) => {
                            return (
                                <li key={index} className={this.state.selectedPage === num ? 'active' : undefined}>
                                    <button onClick={this.onPageClick} value={num}>{num}</button>
                                </li>
                            )
                        })
                    }
                    {(paginationControl.showLastDots) ? <li className="pagination-dots"><button>..</button></li> : null}
                    <li className={this.state.selectedPage === this.lastPage ? 'active' : undefined}>
                        <button onClick={this.onPageClick} value={this.lastPage}>{this.lastPage}</button>
                    </li>
                    <li className={this.state.selectedPage === this.lastPage ? 'disabled-button': undefined }>
                        <button 
                        className="previous-next-button" 
                        onClick={this.onNextClick} 
                        disabled={paginationControl.isNextDisabled} >&gt;</button>
                    </li>
                </ul>
            </div>
        );
    }
}