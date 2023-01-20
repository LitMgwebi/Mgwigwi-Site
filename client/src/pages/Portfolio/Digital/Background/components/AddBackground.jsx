import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


function AddBackground() {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [photo, setPhoto] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('photo', photo);

        const data = {
            title: title,
            photo: photo,
        }

        axios({
            method: 'POST',
            url: 'http://localhost:1500/background/add',
            data: data,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            setError(null);
        }).catch((error) => {
            setError(error.response.data.error);
            console.error(error.response.data.error);
        });

        window.location.reload(false)
    }
    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <h3>Add</h3>
            <div className="cardForm">
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        required
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Piece:</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="photo"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        required
                    />
                </div>
            </div>
            <div className="controls">

                {error && <div className="error">{error}</div>}
                <div className="button-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/"><button>Cancel</button></Link>
                </div>
            </div>


        </form>
    )
}

export default AddBackground;