import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import * as firebase from 'firebase'
import * as Actions from './actions'
import './uploader-demo.css'

class UploaderDemo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // NOTE: we will use the following file structure on firebase
      // 1. raw:     datasets/uid/dataset_name/raw/1.jpg, 2.jpg…
      // 2. labeled: datasets/uid/dataset_name/labeled/dog/1.jpg, 2.jpg...
      //             datasets/uid/dataset_name/labeled/cat/1.jpg, 2.jpg...
      datasetName: '',
      uploadProgress: 0,
      downloadURL: '',
    }
  }

  // React Dropzone expects these two arguments
  onDrop = (acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach(file => {
      const folderPath = `datasets/${this.props.currentUser.uid}/${this.state.datasetName}/raw/`
      this.uploadFile(folderPath, file)
    })
  }

  onDatasetNameChange = (event) => {
    this.setState({ datasetName: event.target.value })
  }

  uploadFile = (folderPath, file) => {
    const storageRef = firebase.storage().ref()
    const dbRef = firebase.database().ref()
    const uploadTask = storageRef.child(folderPath + file.name).put(file)

    uploadTask.on('state_changed', (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({ uploadProgress })
    }, (error) => {
      console.log("UPLOAD FAILED", error)
    }, () => {
      const downloadURL = uploadTask.snapshot.downloadURL
      this.setState({ downloadURL })

      // NOTE: Firebase doesnt have an API to retrieve file URLs from a folder ref
      // We need to store download URLs in Database
      // https://firebase.google.com/docs/database/web/lists-of-data
      const newFileRef = dbRef.child(folderPath).push()
      newFileRef.set({
        url: downloadURL,
        type: file.type,
        size: file.size,
        name: file.name,
      })
    })
  }

  render() {
    const { currentUser } = this.props
    const { datasetName, uploadProgress, downloadURL } = this.state

    if (!currentUser) {
      return (
        <div>
          <h3>You need to sign up to upload files</h3>
          <Link to="/signup">Sign up</Link>
        </div>
      )
    }

    return (
      <div className="uploader-demo">
        <h5>Hey {currentUser.email}, ready to upload some files?</h5>

        <div className="uploader-demo__dataset-name">
          <label>1. What is your datasetName?</label>
          <div>
            <input
              onChange={this.onDatasetNameChange}
              value={this.state.datasetName}
            />
          </div>
        </div>
        { datasetName.length > 0 &&
          <div className="uploader-demo__dropzone-container">
            <div>
              <label>2. Choose an image to upload</label>
            </div>
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
        }

        { uploadProgress > 0 &&
          <div className="uploader-demo__progress">
            <div>
              <label>3. {downloadURL ? 'Uploaded' : 'Uploading...' }</label>
            </div>
            <div>
              { downloadURL ? <img src={downloadURL} /> : <span>{uploadProgress}%</span> }
            </div>
          </div>
        }

        <Link to='/'>Back</Link>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // NOTE: it's okay to access a variable stored in other reducers.
    // ex) I'm accessing UserSignUpDemo reducer from within UploaderDemo scope
    currentUser: state.UserSignUpDemo.currentUser,
  }
}

export default connect(
  mapStateToProps,
  null,
)(UploaderDemo)
