
import { ToastContainer} from 'react-toastify';
import React from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';

export default class App extends React.Component {
  state = { 
    searchQuery: '', 
  }

 

  handleFormSubmit = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [] 
    });

  }

  render() {

    // if (status === 'idle') {
    //   return (<div>Введите что-нибудь в строку поиска</div>,
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

    return ( 
        
        <AppStyle>     
          <Searchbar onSubmit={this.handleFormSubmit} searchQuery={this.state.searchQuery}/>          
        <ImageGallery searchQuery={this.state.searchQuery} />
          <ToastContainer autoClose={3000} />      
       </AppStyle>
     )
    }  
   };

