import React, { useEffect, useState } from 'react';
import './Linkedin.css';

function Linkedin() {

    const [name, setName] = useState('')
    const [prefLocal, setPrefLocal] = useState('')
    const [prefLocalLang, setPrefLocalLang] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    let linkedInInfo = '';
    let url = "https://media.licdn.com/dms/image/"+ imgUrl + "/profile-displayphoto-shrink_100_100/0/1679965373775?e=1691020800&v=beta&t=tCI-bG5MDjq-z6Ve6-sj8aoY5cgdIxldt6RDfcLdm4U";
    let subStringImageUrl = ''
    let flag = "https://www.countryflagicons.com/FLAT/32/" + prefLocal +  ".png";
    let accessTokenVar = '';

    const [accessTokenAPI, setAccessTokenAPI ] = useState({
        "accessToken": ''
    })

    const onChangeHandle = (event) => {
        accessTokenVar = document.getElementById('userTokenInput').value;
        setAccessTokenAPI({ ...accessTokenAPI, accessToken: accessTokenVar });
    }

    useEffect(() => {
        fetch("http://localhost:8080/")
            .then((res) => res.json())
            .then((data) => {
                setName(data.localizedFirstName + " " + data.localizedLastName);
                setPrefLocal(data.firstName.preferredLocale.country)
            
        }, [])
        .catch((err) => null)
        

        fetch("http://localhost:8080/profile")
            .then((res) => res.json())
            .then((data) => {
                setImgUrl("https://media.licdn.com/dms/image/" + data.profilePicture.displayImage.substring(25, 44) + "/profile-displayphoto-shrink_100_100/0/1679965373775?e=1691020800&v=beta&t=tCI-bG5MDjq-z6Ve6-sj8aoY5cgdIxldt6RDfcLdm4U");
            })
        .catch((err) => null)
        

    }, [])

    const postLinkedinProfile = (e) => {
        e.preventDefault();
        //console.log(document.getElementById('userTokenInput').value)
        fetch("http://localhost:8080/accessToken")
            .then(res => res.json())
            .then(data => {
                data = accessTokenAPI;
            })
            .then(
                fetch("http://localhost:8080/accessToken", {
                    method: "POST",
                    headers: { "Content-Type": "application/JSON" },
                    body: JSON.stringify(accessTokenAPI)
                })
                .catch((err) => null)
            )
            .then(

                fetch("http://localhost:8080/")
                    .then((res) => res.json())
                    .then((data) => {
                        setName(data.localizedFirstName + " " + data.localizedLastName);
                        setPrefLocal(data.firstName.preferredLocale.country)
                })
                .catch((err) => null)
            ).then(
                fetch("http://localhost:8080/profile")
                    .then((res) => res.json())
                    .then((data) => {
                        setImgUrl("https://media.licdn.com/dms/image/" + data.profilePicture.displayImage.substring(25, 44) + "/profile-displayphoto-shrink_100_100/0/1679965373775?e=1691020800&v=beta&t=tCI-bG5MDjq-z6Ve6-sj8aoY5cgdIxldt6RDfcLdm4U");
                })
                .catch((err) => null)
            )
    }

        

  return (
    <div>
        <div className="navbar">
            <h1 className='title'>Linkedin</h1>
            <div className="search">
                    <input type="text" placeholder='Enter user access token' id='userTokenInput' onChange={onChangeHandle}/>
                    <button className='searchBtn' onClick={postLinkedinProfile}>Search</button>
            </div>
        </div>
        
        <div className="main__content">
            <p>LINKEDIN PROFILE INFORMATION:</p><br />
            <br />
            <div id="name">
                {name != "undefined undefined" ? (
                    <h1>{name}</h1>
                ) : (
                    <h1>Please Enter Your Access Token For Linkedin Information</h1>
                )
                }   
            </div>
            {name != "undefined undefined" ? (
                <p><i>{prefLocal} {prefLocalLang}</i></p>
            ): (
                <p></p>
            )}
            {name != "undefined undefined" ? (
                <img src={flag} />
            ) : (
                <img src="" />
            )}
            <br />
            {name != "undefined undefined" ? (
                <img src={imgUrl} id='profilePic' width="300px"/>
            ) : (
                <img src="" id='profilePic' width="300px"/> 
            )
            }

        </div>

    </div>

    
  )
}

export default Linkedin