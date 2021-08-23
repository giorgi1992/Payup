import { useEffect, useState } from "react";

const Profile = () => {
    const [image, setImage] = useState(null)
    const [response, setResponse] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [createObjectURL, setCreateObjectURL] = useState(null)

    const items = JSON.parse(localStorage.getItem('items'))

    useEffect(() => {
        getImage()
    }, [])

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0]

            setImage(image)
            setCreateObjectURL(URL.createObjectURL(image))
        }
    }

    const uploadToServer = async (event) => {
        const myHeaders = new Headers()
        const formdata = new FormData()

        myHeaders.append("Authorization", `Bearer ${items.token}`);
        formdata.append("avatar", image)

        fetch("https://api-nodejs-todolist.herokuapp.com/user/me/avatar", {
            method: 'POST',
            headers: myHeaders,
            body: formdata
        })
            .then(response => response.json())
            .then(result => setResponse(result))
    }

    const getImage = () => {
        fetch(`https://api-nodejs-todolist.herokuapp.com/user/${items.user._id}/avatar`, {
            method: 'GET',
        })
            .then(response => response.ok ? setAvatar(response.url) : '')
    }

    return (
        <div className="container">
            <div>
                <img src={createObjectURL ? createObjectURL : avatar ? avatar : 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'} width={60} height={60} alt="default avatar" title="avatar" />
                <h4 className="upload">Upload Image</h4>
                <input type="file" name="myImage" onChange={uploadToClient} />
                <button className="btn btn-primary" type="submit" onClick={uploadToServer}>Upload</button>
            </div>
            <div className="uploadSuccess">
                {response &&
                    <div>Image uploaded successfully</div>
                }
            </div>
        </div>
    );
}

export default Profile