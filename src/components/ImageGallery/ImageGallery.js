import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import { ToastContainer, toast } from 'react-toastify';
import API from '../imagesApi';
import Button from '../Button/Button';
import { Loader } from '../Loader/Loader';
import Modal from '../Modal/Modal'
import { ImageGalleryStyle } from './ImageGallery.styled';

export default class ImageGallery extends React.Component  {
    state = {
    images: [],
    loading: false,
    currentPage: 1,
    error: null,
    largeImageURL: '',
    modalAlt: '',
    showModal: false
    }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.searchQuery;
        const nextName = this.props.searchQuery;

        if (prevName !== nextName) {
          this.fetchImages();
             }
        }
    
    fetchImages = () => {
        
        const { searchQuery } = this.props;

        this.setState({ loading: true, images: [], currentPage: 1 });
        
      API.fetchImages(searchQuery,  1)
        .then((data) => {
          this.setState(
        
            {
              images: [...data.hits],
              currentPageImages: [...data.hits],
              error: ''
            }
          );
          if (data.hits.length === 0) {
            toast.warn(`Sorry, there are no images matching ${searchQuery}. Please try again.`);
          }   
        }
                )
                .catch(error => this.setState({ error }))
                .finally(() => this.setState({ loading: false }));
    }
    
    
    
    handleLoadMore = () => {
        const {searchQuery} = this.props;
        const { currentPage } = this.state;
        this.setState({ loading: true, currentPage: currentPage + 1 });
        API.fetchImages(searchQuery, currentPage + 1)
                .then((data) => this.setState(({ images }) => (
                    {
                        images: [...images, ...data.hits],              
                    })))
                .finally(() => this.setState({ loading: false }));

    }
 
   handleLargeImage = (image) => {
    this.setState({
      largeImageURL: image,
      showModal: true
    })
    
  }
  closeModal = () => {
    this.setState({
      showModal: false
    })
  }
    // if (status === 'idle') {
    //   return (<div>?????????????? ??????-???????????? ?? ???????????? ????????????</div>,
    //   <ToastContainer autoClose={3000}/>)
    // }
    // if (status === 'pending') {
    //   return <Loader />
    // }
    // if (status === 'rejected') {
    //   return <h2>{error.message}</h2>
    // }
    // if (status === 'resolved') {
    //      return (
    //   <Searchbar onSubmit={this.handleFormSubmit} searchQuery={searchQuery}/>,
    //   <ImageGallery images={images} />,
    // <Loader/>
    //      )

 
      render() {
          const { loading, error, images, showModal, largeImageURL, currentPageImages } = this.state;
          const { searchQuery } = this.props;
    return (
      <div>
        {error && <p>{error.message}</p>}
    
        {loading && <Loader />}
            <ToastContainer autoClose={3000} />
            
        {images && <ImageGalleryStyle>
            {images.map(({ id, webformatURL, largeImageURL}) => (
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    alt={searchQuery}
                    onClick={this.handleLargeImage} />))}
                </ImageGalleryStyle>}

        {showModal && <Modal largeImageURL={largeImageURL} onClose={this.closeModal}/>}
        {images.length > 0 && !(currentPageImages.length < 12) && <Button onClick={this.handleLoadMore} />}
       </div>
           
            
            );
}
}
