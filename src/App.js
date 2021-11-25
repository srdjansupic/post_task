import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from './redux/store';
import * as actionCreators from "./redux/actionCreators";
import AllPost from "./Component/AllPost/AllPost";
import ViewPost from "./Component/ViewPost/ViewPost";
import CreateNewPost from "./Component/CreateNewPost/CreateNewPost";
import { Provider } from 'react-redux';
import EditPost from './Component/EditPost/EditPost';
import "./style.css";

function App() {

    useEffect(() => {
        store.dispatch(actionCreators.FETCH_POST());
        store.dispatch(actionCreators.START());
    }, []);

    const [view,setView] = useState();
    const vPost = (e) =>{
        setView(e);
    }

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AllPost vPost={vPost} />} />
                    <Route path="/:id" element={<ViewPost view={view}/>} />
                    <Route path="/:id/edit" element={<EditPost view={view}/>} />
                    <Route path="/create" element={<CreateNewPost />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}


export default App;
