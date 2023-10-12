import React, { Component } from 'react';
import './App.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import CustomLoader from './Loader/Loader'; 
import Modal from './Modal/Modal';

const API_KEY = '38986046-b9c5577e52cca94c56fe7a79b';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: true,
    loadMore: true,
    selectedImage: null,
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page || this.state.query !== prevState.query) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page, images } = this.state;
    this.setState({ loading: true });

    const response = await fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = await response.json();
    const { hits, totalHits } = data;

    this.setState((prev) => ({
      images: [...prev.images, ...hits],
      loadMore: prev.page < Math.ceil(totalHits / 12),
      loading: false,
    }));
  };

  handleSearch = (query) => {
    this.setState({ query, page: 1, images: [] }, this.fetchImages);
  };

  handleLoadMore = () => {
    this.setState((prev) => ({ page: prev.page + 1 }), this.fetchImages);
  };

  handleImageClick = (image) => {
    this.setState({ selectedImage: image });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { query, images, loading, loadMore, selectedImage } = this.state;
    console.log('Loading:', loading);

    return (
      <div className="App">
        <Searchbar onSearch={this.handleSearch} />
        {loading && <CustomLoader />} {/* Display the loader when loading is true */}
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loadMore && <Button onClick={this.handleLoadMore} />}
        {selectedImage && <Modal image={selectedImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

export default App;
