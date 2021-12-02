import React, { Component } from 'react'
import NavBar from './component/NavBar'
import NewsContainer from './component/NewsContainer'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  
  apiKey = process.env.REACT_APP_NEWS_API1
 

  constructor(){
    super()
    this.state= {
      progress: 0
    }
  }

  setProgress = (p)=>{
    this.setState({
      progress: p
    })
  }

  render() {
    return (
      <div id="mainPage">
         <BrowserRouter>
        <NavBar />
        <div className="container my-5">

        <LoadingBar height={3} color='#f11946' progress={this.state.progress} onLoaderFinished={() => this.setProgress(0)}/>

        <Routes>
          <Route  exact path="/" element={<NewsContainer apiKey={this.apiKey}setProgress={this.setProgress}  key="general"  endPoint="top" category="general"/>} />
          <Route  exact path="/business" element={<NewsContainer apiKey={this.apiKey}setProgress={this.setProgress}  key="business" endPoint="top" category="business"/>} />
          <Route  exact path="/entertainment" element={<NewsContainer apiKey={this.apiKey}setProgress={this.setProgress}  key="entertainment" endPoint="top" category="entertainment"/>} />
          <Route  exact path="/health" element={<NewsContainer apiKey={this.apiKey}setProgress={this.setProgress}  key="health" endPoint="top" category="health"/>} />
          <Route  exact path="/science" element={<NewsContainer apiKey={this.apiKey}setProgress={this.setProgress}  key="science" endPoint="top" category="science"/>} />
          <Route exact path="/sports" element={<NewsContainer apiKey={this.apiKey}setProgress={this.setProgress}  key="sports"  endPoint="top" category="sports"/>} />
          <Route  exact path="/technology" element={<NewsContainer apiKey={this.apiKey}setProgress={this.setProgress}  key="technology" endPoint="top" category="technology"/>} />
          <Route  exact path="/everything" element={<NewsContainer apiKey={this.apiKey}setProgress={this.setProgress}  key="every" endPoint="every"/>} />
          </Routes>
        </div>
        </BrowserRouter>
      </div>
    )
  }
}


