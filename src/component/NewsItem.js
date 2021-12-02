import React from 'react'

 const NewsItem = (props)=> {
        let { title, description, imgUrl, url, publishedAt, author,source} =  props
        return (
            <div>
                <div className="card">
                    <img src={imgUrl ? imgUrl : "ErrorImg.png"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "85%"}}>{source}</span>
                        <h5 className="card-title">{title}</h5><span className="badge bg-success">by {author ? author : "Unkonwn"}</span>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">Last updated {publishedAt}</small></p>
                        <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-info">Read More</a>
                    </div>
                </div>
            </div>
        ) 
}

export default NewsItem