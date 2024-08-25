import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import styles from './CreatorForm.module.css';

function EditCreator() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCreator();
  }, [id]);

  async function fetchCreator() {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setName(data.name);
      setUrl(data.url);
      setDescription(data.description);
      setImageURL(data.imageURL || '');
    } catch (error) {
      console.error('Error fetching creator:', error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('creators')
        .update({ name, url, description, imageURL })
        .eq('id', id);
      
      if (error) throw error;
      alert('Creator updated successfully!');
      navigate('/');
    } catch (error) {
      alert('Error updating creator');
      console.error('Error:', error);
    }
  }

  async function handleDelete() {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      try {
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        alert('Creator deleted successfully!');
        navigate('/');
      } catch (error) {
        alert('Error deleting creator');
        console.error('Error:', error);
      }
    }
  }

  return (
    <div className={styles.formContainer}>
      <h2>Edit Creator</h2>
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
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>Update Creator</button>
          <button type="button" onClick={handleDelete} className={styles.deleteButton}>Delete Creator</button>
        </div>
      </form>
    </div>
  );
}

export default EditCreator;