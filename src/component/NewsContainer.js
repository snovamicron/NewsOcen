import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import propTypes from 'prop-types';
import { Outlet, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";


const NewsContainer = (props) => {
    const [isLoaded, setIsLoaded] = useState(true)
    const [apiData, setApiData] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const giveLink = (page) => {
        if (props.endPoint === "top") {
            return `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=5`
        } else {
            return `https://newsapi.org/v2/everything?q=india&apiKey=${props.apiKey}&page=${page}&pageSize=5`
        }
    }

    const updateNews = (page) => {
        props.setProgress(20)
        setIsLoaded(true)

        fetch(giveLink(page))

            .then((data) => data.json())

            .then((getData) => {
                setTotalResults(getData.totalResults)
                return getData.articles
            })

            .then(
                (artArray) => {
                    props.setProgress(100)
                    setApiData(artArray)
                    setIsLoaded(false)
                    setPage(page)
                })

    }

    const fetchMoreData = () => {
        fetch(giveLink(page + 1))

            .then(data => data.json()).then(getData => {
                setTotalResults(getData.totalResults)
                return getData.articles
            })

            .then(
                (artArray) => {
                    setApiData(apiData.concat(artArray))
                    setPage(page + 1)
                })
    }

    useEffect(() => {
        updateNews(page)
    }, [])
    return (
        <div>
            <Link className={`btn btn-info mx-2`} aria-current="page" to="/">Top-Headlines</Link>
            <Link className={`btn btn-info mx-2`} aria-current="page" to="/everything">Everything</Link>

            <h1 className="text-center">{props.endPoint === "top" ? "top-headlines" : "everything"}</h1>

            <div className="text-center align-middle">
                {isLoaded && <img src="Rhombus.gif" alt="Loading.gif" />}
            </div>

            <InfiniteScroll
                dataLength={apiData.length}
                next={fetchMoreData}
                hasMore={apiData.length !== (totalResults < 100 ? totalResults : 100)}
                loader={<div className="text-center align-middle"><img src="Rhombus.gif" alt="Loading.gif" /></div>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>}
            >
                <div className="container">

                    <div className="row">
                        {
                            !isLoaded && apiData.map((Ele) => {
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
NewsContainer.defaultProps = {
    category: 'sports'
}
NewsContainer.propTypes = {
    category: propTypes.string,
}

export default NewsContainer
