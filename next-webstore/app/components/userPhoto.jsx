import React, { useState } from "react";

const userPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileUpload(event) {
    setSelectedFile(event.target.files[0]);
    console.log("Photo: ", event.target.files[0]);
  }

  const handleSubmitPhoto = () => {
      //TODO: handle photo upload
  }

  return (
    <>
      <img src={selectedFile ? selectedFile.webkitRelativePath : "./niccage.png"} alt="User profile picture" />
      <label htmlFor="file-upload">Change your profile photo?</label>
      <input id="file-upload" type="file" accept=".jpg,.png,.gif" onChange={handleFileUpload} />
        <button type="submit" className="btn btn-primary user-button" onClick={handleSubmitPhoto}>
            Update Photo
        </button>
    </>
  );
};

export default userPhoto;
