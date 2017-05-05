import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Actions from './actions'

class MyFilesDemo extends Component {
  componentDidMount() {
    console.log("going to fetch datasets...")
    this.props.dispatch(Actions.fetchFiles())
  }

  render() {
    const { currentUser, datasets } = this.props
    const datasetNames = Object.keys(datasets)

    if (!currentUser) {
      return (
        <div>
          <h3>You need to sign up to upload datasets</h3>
          <Link to="/signup">Sign up</Link>
        </div>
      )
    }

    return (
      <div className="my-datasets-demo">
        <h1>Uploaded Datasets</h1>
        { datasetNames.length > 0 ? datasetNames.map((datasetName, idx) =>
            <div key={idx}>
              <h4>Dataset Name: {datasetName}</h4>
              { Object.keys(datasets[datasetName].raw).map(fileKey => {
                  const file = datasets[datasetName].raw[fileKey]
                  return (
                    <ul key={fileKey}>
                      <li><b>Name:</b> {file.name}</li>
                      <li><b>Type:</b> {file.type}</li>
                      <li><b>Size:</b> {file.size}</li>
                      <li><b>Url:</b> {file.url}</li>
                      <li><img src={file.url} alt="" /></li>
                    </ul>
                  )
                })
              }
            </div>
          ) : (
            <div>
              <h5>You haven't uploaded any files</h5>
              <Link to="/uploader">Start uploading</Link>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.UserSignUpDemo.currentUser,
    datasets: state.MyFilesDemo.datasets,
  }
}

export default connect(
  mapStateToProps,
  null,
)(MyFilesDemo)
