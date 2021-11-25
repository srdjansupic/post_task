import React, { useState } from 'react';
import { connect } from "react-redux";
import "./view.css";
import { Link } from "react-router-dom";
import store from '../../redux/store';
import * as actionCreators from "../../redux/actionCreators";

function ViewPost(props) {

    const [view, setView] = useState(props.post.data.find(x => x.id === props.view));
    const [comment, setComment] = useState([]);

   
    const addComm = () => {
        let valueComm = document.querySelector("#comm");
        setComment([...comment, valueComm.value]);
        let com = (view.comm === undefined) ? comment : view.comm;
        store.dispatch(actionCreators.ADD_COMM({ ...view, comm: [...com, valueComm.value] }));
        setView(props.post.data.find(x => x.id === props.view));
        valueComm.value = '';
    }
   

    return (
        <>
            <div className="viewPost">
                <div className="ownerVP">
                    <div className="ownerVP-img" style={{ backgroundImage: `url(${view.owner.picture})` }}></div>
                    <div className="ownerVP-txt">
                        <div className="name">
                            <span className="firstName">{view.firstName == null ? view.owner.firstName : view.firstName}</span>
                            <span>{view.lastName == null ? view.owner.lastName : view.lastName}</span>
                        </div>
                        <div className="publishDate">
                            {view.publishDate}
                        </div>
                    </div>
                </div>
                <div className="mainVP">
                    <div className="imageVP">
                        <img src={view.image} alt="imgVP"></img>
                    </div>
                    <div className="desVP">
                        <div className="pbTime">{view.publishDate}</div>
                        <div className="text">{view.text}</div>
                        <div className="tags">{view.tags.map(x => <span key={x}>{x}</span>)}</div>
                    </div>
                </div>
                <Link className="Epost" to={`/${view.id}/edit`} >Edit post</Link>

            </div>
            <div className="comment">
                <p>Add comment</p>
                <div>
                    <input id="comm" type="text" placeholder="Comment" />
                    <button className="sendCom" onClick={addComm}>Send</button>
                </div>
            </div>
            <div id="commentSection">
                <div className="viewCom"><p>{view.comm == null ? null : "Comments"}</p></div>
                {view.comm == null ? null : view.comm.map((x, index) => <span className="allComm" key={x}><p>Comment {index + 1}: {x}</p></span>)}
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.postData.loading,
        post: state.postData.post,
        error: state.postData.error
    }
}


export default connect(mapStateToProps)(ViewPost);
