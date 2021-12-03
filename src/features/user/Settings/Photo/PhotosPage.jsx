import React, {useState, useEffect, Fragment} from 'react';
import {Segment, Header, Divider, Grid, Button} from 'semantic-ui-react';
import CropperInput from './CropperInput';
import DropzoneInput from './DropzoneInput';
import {connect} from 'react-redux'
import {updateProfileImage, deletePhoto, setMainPhoto} from '../../userAction'
import { toastr } from 'react-redux-toastr';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import UserPhoto from './UserPhoto';


const query = ({auth}) => {
    return [
        {
            collection: 'Users',
            doc: auth.uid,
            subcollections: [{collection: 'photos'}],
            storeAs: 'photos'
        }
    ]
}

const actions = {
    updateProfileImage,
    deletePhoto,
    setMainPhoto
}
const mapState = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos ? state.firestore.ordered.photos : [],
    loading: state.async.loading
})
const PhotosPage = ({updateProfileImage, profile, photos, deletePhoto, history, setMainPhoto, loading}) => {
    const [files, setFiles] = useState([])
    const [images, setImages] = useState(null)
    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    },[files])


    const handleUploadImage = async () => {
        try {
            await updateProfileImage(images, files[0].name)
            handleCancelCrop()
            toastr.success('Success!', 'Photo has been uploaded')
        } catch (error) {
            console.log(error)
            toastr.error('Oops!', 'Something went wrong!')
        }
    }
    const handleCancelCrop = () => {
        setFiles([])
        setImages(null)
    }
    const handleSetMainPhoto = async (photo) => {
        try {
            await setMainPhoto(photo)
        } catch (error) {
            console.log(error)
            toastr.error('Oops!', error.message)
        }
    }
    const handleDeletePhoto = async (photo) => {
        console.log(photo)
        try {
            await deletePhoto(photo)
            history.push('/settings/photos')

        } catch (error) {
            console.log(error)
            toastr.error('Opp!', error.message)
        }
    }
      return (
        <Segment>
            <Header dividing size='large' content='Your Photos' />
            <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo'/>
                    <DropzoneInput setFiles={setFiles}/>
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 2 - Resize image' />
                    {files.length > 0 && 
                        <CropperInput setImages={setImages} imagePreview={files[0].preview} />
                    }
                    
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 3 - Preview & Upload' />
                    {files.length > 0 && 
                        (
                        <Fragment>
                            <div 
                                className='img-preview'
                                style={{minHeight: '200px', minWidth:'200px', overflow: 'hidden'}}
                            />
                            <Button.Group> 
                                <Button 
                                    loading ={loading}
                                    onClick={handleUploadImage} 
                                    style={{width: '100px'}}
                                    positive
                                    icon='check'
                                />

                                <Button
                                    loading={loading} 
                                    onClick={handleCancelCrop} 
                                    style={{width: '100px'}} 
                                    icon='close'
                                />
                            </Button.Group>
                            
                        </Fragment>

                    )}
                </Grid.Column>

            </Grid>

            <Divider/>
            <UserPhoto 
                profile={profile} 
                photos={photos} 
                deletePhoto={handleDeletePhoto}
                setMainPhoto={handleSetMainPhoto}
            />
        </Segment>
      )

}


export default compose(
    connect(mapState, actions),
    firestoreConnect(auth => query(auth))
)(PhotosPage)
