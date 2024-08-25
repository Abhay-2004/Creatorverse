import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import styles from './ViewCreator.module.css';

function ViewCreator() {
  const [creator, setCreator] = useState(null);
  const { id } = useParams();

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
      setCreator(data);
    } catch (error) {
      console.error('Error fetching creator:', error);
    }
  }

  if (!creator) {
    return <div className={styles.loading}>Loading creator details...</div>;
  }

  return (
    <div className={styles.viewCreator}>
      <div className={styles.header}>
        {creator.imageURL && (
          <img src={creator.imageURL} alt={creator.name} className={styles.creatorImage} />
        )}
        <h1 className={styles.creatorName}>{creator.name}</h1>
      </div>
      <div className={styles.content}>
        <a href={creator.url} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
          Visit Channel
        </a>
        <p className={styles.creatorDescription}>{creator.description}</p>
      </div>
      <div className={styles.actions}>
        <Link to={`/edit/${creator.id}`} className={styles.editButton}>Edit</Link>
        <Link to="/" className={styles.backButton}>Back to All Creators</Link>
      </div>
    </div>
  );
}

export default ViewCreator;