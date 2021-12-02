import React, { useState } from 'react'
import NavBar from './component/NavBar'
import NewsContainer from './component/NewsContainer'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  
  const apiKey = "c330693b628c4373a040d2dec3bea938"
 
  const [progres, setProgres] = useState(0)

  const setProgress = (p)=>{
    setProgres(p)
  }

  
    return (
      <div id="mainPage">
         <BrowserRouter>
        <NavBar />
        <div className="container" style={{marginTop:"80px"}}>

        <LoadingBar height={3} color='#f11946' progress={progres} onLoaderFinished={() => setProgress(0)}/>

        <Routes>
          <Route  exact path="/" element={<NewsContainer apiKey={apiKey}setProgress={setProgress}  key="general"  endPoint="top" category="general"/>} />
          <Route  exact path="/business" element={<NewsContainer apiKey={apiKey}setProgress={setProgress}  key="business" endPoint="top" category="business"/>} />
          <Route  exact path="/entertainment" element={<NewsContainer apiKey={apiKey}setProgress={setProgress}  key="entertainment" endPoint="top" category="entertainment"/>} />
          <Route  exact path="/health" element={<NewsContainer apiKey={apiKey}setProgress={setProgress}  key="health" endPoint="top" category="health"/>} />
          <Route  exact path="/science" element={<NewsContainer apiKey={apiKey}setProgress={setProgress}  key="science" endPoint="top" category="science"/>} />
          <Route exact path="/sports" element={<NewsContainer apiKey={apiKey}setProgress={setProgress}  key="sports"  endPoint="top" category="sports"/>} />
          <Route  exact path="/technology" element={<NewsContainer apiKey={apiKey}setProgress={setProgress}  key="technology" endPoint="top" category="technology"/>} />
          <Route  exact path="/everything" element={<NewsContainer apiKey={apiKey}setProgress={setProgress}  key="every" endPoint="every"/>} />
          </Routes>
        </div>
        </BrowserRouter>
      </div>
    )
  
}

export default App
