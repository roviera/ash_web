import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../actions/animalActions';
import InfoPerfil from '../components/animals/InfoPerfil';
import ImagesGallery from '../components/animals/ImagesGallery';
import AddGalleryButton from '../components/animals/AddGalleryButton';
import EditAnimalButton from '../components/animals/EditAnimalButton';
import AddEventButton from '../components/animals/events/AddEventButton';
import '../styles/animal-perfil.scss';
import { toastr } from 'react-redux-toastr';
import '../styles/animal-form.scss';

class AnimalPerfilPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      loading_gallery: true,
      image_page: 1,
      more_page: true,
      edit_gallery: false
    };

    this.loading = this.loading.bind(this);
    this.onMoreImages = this.onMoreImages.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.editGallery = this.editGallery.bind(this);
  }

  componentWillMount() {
    this.props.animalActions.showPerfilAnimal(this.props.routeParams.id);
  }

  componentWillReceiveProps(nextProps) {
    const { edit_gallery, image_page } = this.state;
    if (nextProps.animal.name) {
      this.setState({ loading: false });
    }
    if (nextProps.animal.images) {
      let moreImages = edit_gallery || (nextProps.animal.images.length >= (15 * image_page));
      this.setState({ loading_gallery: false, more_page: moreImages });
    }
    if (nextProps.animal.uplaodImages) {
      this.setState({ loading_gallery: true, image_page: 1 });
    }
    if (nextProps.animal.removeImages) {
      this.setState({ loading_gallery: false });
    }
    if (nextProps.animal.error) {
      toastr.error('ERROR', nextProps.animal.error);
      this.setState({ loading_gallery: true });
    }
  }

  loading() {
    this.setState({ loading: true });
  }

  editGallery() {
    const { edit_gallery } = this.state;
    this.setState({ edit_gallery: !edit_gallery });
  }

  onRemoveImage(image) {
    this.props.animalActions.removePerfilAnimalImages(this.props.animal.id, image.id);
    this.setState({ loading_gallery: true });
  }

  onMoreImages() {
    const { image_page } = this.state;
    let newPage = image_page+1;
    this.props.animalActions.showPerfilAnimalImages(this.props.animal.id, newPage);
    this.setState({ image_page: newPage });
  }

  onDropProfile(img) {
    const reader = new FileReader();
    const file = img[0];
    this.setState({ profilePic: file });
    reader.readAsDataURL(file);
    reader.onload = (upload) => {
      let animal = this.state.animal;
      animal["profile_image"] = upload.target.result;
      this.setState({ animal });
    };
  }

  render() {
    const showButton = this.props.user.permissions === 'animals_edit' || 'super_user';
    const { animal } = this.props;
    const { loading, loading_gallery, edit_gallery } = this.state;
    return (
      <div className="profile-page-flex">
        <div className="perfil-div">
          <InfoPerfil styleClass="info-div profile-section"
                        loading={loading}
                        animal={animal}/>
          <EditAnimalButton loading={this.loading} animal={animal} route_id={this.props.routeParams.id}/>
        </div>
        <div className="events-gallery-section">
          <div className="event-div">
            <p className="section-title">EVENTOS</p>
            <AddEventButton animalId={this.props.routeParams.id} />
          </div>
          <div className="gallery-div">
            <div className="gallery-buttons">
              <p className="section-title center">GALERÍA</p>
              <AddGalleryButton animalId={this.props.routeParams.id} disabled={edit_gallery}/>
              { showButton &&
              <button className={edit_gallery ? 'button-edit-galery active' : 'button-edit-galery'} onClick={this.editGallery}>
                <i className="material-icons">mode_edit</i>
              </button>
              }
            </div>
            { animal.images &&
            <ImagesGallery images={animal.images}
                            styleClass="slick-container"
                            onMoreImages={this.onMoreImages}
                            moreImages={this.state.more_page}
                            loading={loading_gallery}
                            edit={edit_gallery}
                            onChangeRemove={this.onRemoveImage}
                            />
            }
          </div>
        </div>
      </div>
    );
  }
}

const { object } = PropTypes;

AnimalPerfilPage.propTypes = {
  animal: object.isRequired,
  user: object.isRequired,
  animalActions: object.isRequired,
  routeParams: object.isRequired
};

AnimalPerfilPage.contextTypes = {
  router: object
};

const mapState = (state) => {
  return {
    animal: state.animal,
    user: state.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    animalActions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalPerfilPage);
