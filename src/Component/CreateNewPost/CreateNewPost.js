import React, { useState } from 'react'
import "./create.css";
import store from '../../redux/store';
import * as actionCreators from "../../redux/actionCreators";
import { Link } from "react-router-dom";

function CreateNewPost() {

    const [img, setImg] = useState({
        postImg: 'https://customercare.igloosoftware.com/.api2/api/v1/communities/10068556/previews/thumbnails/4fc20722-5368-e911-80d5-b82a72db46f2?width=680&height=680&crop=False'
    });

    const [imgOwner, setImgOwner] = useState({
        profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    });

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg({ postImg: reader.result })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    };

    const imageOwnerHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImgOwner({ profileImg: reader.result })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    };


    const newpo = () => {
        let firstName = document.querySelector('.firstName #first').value;
        let lastName = document.querySelector('.lastName #last').value;
        let publishDate = document.querySelector('.publishD  #date').value;
        let tags1 = document.querySelector('#tags1').value;
        let tags2 = document.querySelector('#tags2').value;
        let tags3 = document.querySelector('#tags3').value;
        let text = document.querySelector('.text #text').value;
        let newP = {
            id: (Math.random() + 1).toString(36).substring(3),
            owner: {
                picture: imgOwner.profileImg,
                firstName: firstName,
                lastName: lastName,
            },
            tags: [tags1, tags2, tags3],
            publishDate: publishDate,
            text: text,
            image: img.postImg
        };

        store.dispatch(actionCreators.ADD_NEW_POST(newP));
    }


    return (
        <div id="createPage">
            <div className="firstName fields finput">
                <p>Enter your name:</p>
                <input id="first" type="text" placeholder="Enter name..." />
            </div>
            <div className="lastName fields finput">
                <p>Enter your lastname:</p>
                <input id="last" type="text" placeholder="Enter lastname..." />
            </div>

            <div className="ownerImage fields">
                <div className="img-div">
                    <p className="heading-img">Add your Image:</p>
                    <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageOwnerHandler} />
                </div>
                <div className="img-holder">
                    <img src={imgOwner.profileImg} alt="" id="img" className="img" />
                </div>
            </div>

            <div className="publishD fields finput">
                <p>Enter publish date post:</p>
                <input id="date" type="text" placeholder="Enter publish date..." />
            </div>
            <div className="text fields finput">
                <p>Enter text:</p>
                <textarea id="text" placeholder="Enter text.." />
            </div>
            <div className="tags fields finput">
                <p>Insert tags:</p>
                <input id="tags1" type="text" placeholder="Enter tags one.." />
                <input id="tags2" type="text" placeholder="Enter tags second.." />
                <input id="tags3" type="text" placeholder="Enter tags third.." />
            </div>

            <div className="AddImage fields">
                <div className="img-div">
                    <p className="heading-img">Add image post:</p>
                    <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} />
                </div>
                <div className="img-holder">
                    <img src={img.postImg} alt="" id="img" className="img" />
                </div>
            </div>

            <Link id="saveNewP" to="/" onClick={newpo}>Save new post</Link>
        </div>
    )
}

export default CreateNewPost;
