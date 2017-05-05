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
      // 1. raw: uid/dataset_name/raw/1.jpg, 2.jpg…
      // 2. labeled: uid/dataset_name/labeled/dog/1.jpg, 2.jpg...
      //             uid/dataset_name/labeled/cat/1.jpg, 2.jpg...
      datasetName: '',
      uploadProgress: 0,
      downloadURL: '',
    }
  }

  // React Dropzone expects these two arguments
  onDrop = (acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach(file => {
      const filePath = `${this.props.currentUser.uid}/${this.state.datasetName}/raw/${file.name}`
      this.uploadFile(filePath, file)
    })
  }

  onDatasetNameChange = (event) => {
    this.setState({ datasetName: event.target.value })
  }

  uploadFile = (filePath, file) => {
    const storageRef = firebase.storage().ref()
    const uploadTask = storageRef.child(filePath).put(file)

    uploadTask.on('state_changed', (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({ uploadProgress })
    }, (error) => {
      console.log("UPLOAD FAILED", error)
    }, () => {
      // NOTE: Firebase doesnt have an API to retrieve file URLs from a folder ref
      // We need to store download URLs in Database
      const downloadURL = uploadTask.snapshot.downloadURL
      this.setState({ downloadURL })
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
