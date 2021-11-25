import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./post.css";

function AllPost(props) {

    const viewPost = (e) => {
        props.vPost(e);
    }

    return (
        <>
            <Link id="createNewP" to="/create">Create new post</Link>
            <div id="allPost">
                {props.post.data === undefined ? null : props.post.data.map(x => {
                    return (
                        <Link key={x.id} className="post" to={`/${x.id}`} onClick={() => { viewPost(x.id) }} >
                            <div className="owner">
                                <div className="owner-img" style={{ backgroundImage: `url(${x.owner.picture})` }}>

                                </div>
                                <div className="owner-des">
                                    <div className="owner-name">
                                        <p className="firstName">{x.firstName == null ? x.owner.firstName : x.firstName}</p>
                                        <p>{x.lastName == undefined ? x.owner.lastName : x.lastName}</p>
                                    </div>
                                    <div className="owner-publishDate">
                                        <p>{x.publishDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="main-post">
                                <div className="img-post">
                                    <img src={x.image} alt="imgPost"></img>
                                </div>
                                <div className="post-description">
                                    <div className="post-PD">
                                        <p>{x.publishDate}</p>
                                    </div>
                                    <div className="post-text">
                                        <p>{x.text}</p>
                                    </div>
                                    <div className="post-tags">
                                        {x.tags.map(x => <span key={x}>{x}</span>)}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
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


export default connect(mapStateToProps)(AllPost);
