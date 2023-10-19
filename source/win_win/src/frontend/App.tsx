// export default App;
import React from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "@container/header/header";
import Home from "@container/home/home";
import FooterContainer from "@container/footer/footer";
import Create from "@container/create/create";
import Detail from "@container/detail/deatil";
import ModalChallenge from "@container/modal/modal.challenge";
import ModalFinish from "@container/modal/modal.finish";
import LoadingModal from "@container/modal/modal.loading";
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
          <Route path={"/detail/:id"} element={<Detail/>}/>
        </Routes>
        <FooterContainer />
        <ModalChallenge />
        <ModalFinish />
        <LoadingModal />
      </BrowserRouter>
    </div>
  )
}

export default () => (
    <App />
)
