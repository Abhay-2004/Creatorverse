import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import styles from './CreatorForm.module.css';

function AddCreator() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('creators')
        .insert([{ name, url, description, imageURL }]);
      
      if (error) throw error;
      alert('Creator added successfully!');
      navigate('/');
    } catch (error) {
      alert('Error adding creator');
      console.error('Error:', error);
    }
  }

  return (
    <div className={styles.formContainer}>
      <h2>Add New Creator</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="url">URL:</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="imageURL">Image URL (optional):</label>
          <input
            type="url"
            id="imageURL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Add Creator</button>
      </form>
    </div>
  );
}

export default AddCreator;