import React, { Component } from 'react';
import NewsItem from './NewsItem';
import propTypes from 'prop-types';
import { Outlet, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";


export class NewsContainer extends Component {

    constructor() {
        super();
        this.state = {
            isLoaded: true,
            apiData: [],
            page: 1,
            totalResults: 0
        };
    }
    giveLink = (page) => {
        if (this.props.endPoint === "top") {
            return `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=5`
        } else {
            return `https://newsapi.org/v2/everything?q=india&apiKey=${this.props.apiKey}&page=${page}&pageSize=5`
        }
    }

    updateNews = (page) => {
        this.props.setProgress(20)
        this.setState({ isLoaded: true })

        fetch(this.giveLink(page))

            .then((data) => data.json())

            .then((getData) => {
                this.setState({ totalResults: getData.totalResults });
                return getData.articles
            })

            .then(
                (artArray) => {
                    this.props.setProgress(100)
                    this.setState({
                        apiData: artArray,
                        isLoaded: false,
                        page: page
                    });
                })

    }

    componentDidMount() {
        this.props.setProgress(10)
        this.updateNews(this.state.page)
    }

    fetchMoreData = () => {
        fetch(this.giveLink(this.state.page + 1))

            .then(data => data.json()).then(getData => {
                this.setState({ totalResults: getData.totalResults });
                return getData.articles
            })

            .then(
                (artArray) => {
                    this.setState({
                        apiData: this.state.apiData.concat(artArray),
                        page: this.state.page + 1
                    });
                })
    }

    render() {
        return (
            <div>
                <Link className={`btn btn-info mx-2`} aria-current="page" to="/">Top-Headlines</Link>
                <Link className={`btn btn-info mx-2`} aria-current="page" to="/everything">Everything</Link>

                <h1 className="text-center">{this.props.endPoint === "top" ? "top-headlines" : "everything"}</h1>

                <div className="text-center align-middle">
                    {this.state.isLoaded && <img src="Rhombus.gif" alt="Loading.gif" />}
                </div>

                <InfiniteScroll
                    dataLength={this.state.apiData.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.apiData.length !== (this.state.totalResults < 100 ? this.state.totalResults : 100)}
                    loader={<div className="text-center align-middle"><img src="Rhombus.gif" alt="Loading.gif" /></div>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>}
                >
                    <div className="container">

                        <div className="row">
                            {
                                !this.state.isLoaded && this.state.apiData.map((Ele) => {
                                    return (
                                        <div key={Ele.url} className="col-md-4 my-2">
                                            <NewsItem title={Ele.title && Ele.title} description={Ele.description} imgUrl={Ele.urlToImage} url={Ele.url} publishedAt={new Date(Ele.publishedAt).toString()} author={Ele.author} source={Ele.source.name} />
                                        </div>

                                    )

                                })
                            }
                        </div>
                    </div>

                </InfiniteScroll>

                <Outlet />
            </div>
        )
    }

}
NewsContainer.defaultProps = {
    category: 'sports'
}
NewsContainer.propTypes = {
    category: propTypes.string,
}

export default NewsContainer
