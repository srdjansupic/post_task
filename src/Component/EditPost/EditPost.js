import React, { useState } from 'react'
import { connect } from "react-redux";
import store from '../../redux/store';
import * as actionCreators from "../../redux/actionCreators";
import "./edit.css";
import { Link } from "react-router-dom";

function EditPost(props) {

    const [view, setView] = useState(props.post.data.find(x => x.id === props.view));

    var name = (view.firstName == null) ? view.owner.firstName : view.firstName;
    var lastN = (view.lastName == null) ? view.owner.lastName : view.lastName;

    const [postData, setPostData] = useState({
        id: view.id,
        image: view.image,
        publishDate: view.publishDate,
        text: view.text,
        firstName: name,
        lastName: lastN,
        owner: {
            firstName: view.owner.firstName,
            lastName: view.owner.lastName,
            picture: view.owner.picture
        },
        tags: view.tags
    })

    const changePost = (e) => {
        let allData = { ...postData };
        allData[e.target.id] = e.target.value;
        setPostData(allData);
    }


    const editPost = () => {
        store.dispatch(actionCreators.EDIT_POST(postData));
        setView(props.post.data.find(x => x.id === props.view));
    }


    return (
        <div className="editPost">
            <span id="headingEP">Post id - {view.id}</span>
            <div className="firstName input">
                <span>Author post first name:</span>
                <input type="text" id="firstName" value={postData.firstName} onChange={changePost} />
            </div>
            <div className="lastName input">
                <span>Author post last name:</span>
                <input type="text" id="lastName" value={postData.lastName} onChange={changePost} />
            </div>
            <div className="publishDate input">
                <span>Publish date:</span>
                <input type="text" id="publishDate" value={postData.publishDate} onChange={changePost} />
            </div>
            <div className="textE input">
                <span>Text post:</span>
                <textarea id="text" value={postData.text} onChange={changePost}></textarea>
            </div>
            <Link to="/" onClick={editPost}>Save edit</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    let news = state.postData;
    return {
        loading: news.loading,
        post: news.post,
        error: news.error
    }
}


export default connect(mapStateToProps)(EditPost);
