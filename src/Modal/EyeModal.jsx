import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EyeModal = ({ show, handleClose, movie }) => {
  if (!movie) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header >
         <Modal.Title><img src={movie.Poster} alt={movie.Title} className='modalimg w-[500px] h-[350px] ' /></Modal.Title>
       </Modal.Header>
       <Modal.Body className='modalp'>
         <p className='text-red-600 text-[26px] font-semibold'>{movie.Title}</p>
         <p>Year: {movie.Year}</p>
         <p>Rating: {movie.imdbRating}</p>
         <p>Released: {movie.Released}</p>
         <p>Runtime: {movie.Runtime}</p>
        <p>Genre: {movie.Genre}</p>
         <p>Director: {movie.Director}</p>
         <p>Plot: {movie.Plot}...</p>
       </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={handleClose} className='modalclosebutton'>
           Close
         </Button>
       </Modal.Footer>
    </Modal>
  );
};

export default EyeModal;

