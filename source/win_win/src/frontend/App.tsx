// export default App;
import React from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "@container/header/header";
import Home from "@container/home/home";
import FooterContainer from "@container/footer/footer";
import Create from "@container/create/create";
import DetailContainer from "@container/detail/deatil";
import ModalChallenge from "@container/modal/modal.challenge.tsx";
import ModalFinish from "@container/modal/modal.finish.tsx";

import background from "@assets/img/backgrounds/background.png";
declare global {
  interface Window {
    ic: any;
  }
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path={"*"} element={<Home/>}/>
          <Route path={"/create"} element={<Create/>}/>
          <Route path={"/detail"} element={<DetailContainer/>}/>
        </Routes>
        <FooterContainer />
        <ModalChallenge />
        <ModalFinish />
      </BrowserRouter>
    </div>
  )
}

export default () => (
    <App />
)
