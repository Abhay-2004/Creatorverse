import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    fetchCreators();
  }, []);

  async function fetchCreators() {
    const { data, error } = await supabase
      .from('creators')
      .select('*');
    
    if (error) console.log('Error fetching creators:', error);
    else setCreators(data);
  }

  return (
    <div>
      <h1>All Creators</h1>
      {creators.length === 0 ? (
        <p>No creators found. Add some!</p>
      ) : (
        creators.map(creator => (
          <Link to={`/creator/${creator.id}`} key={creator.id}>
            <CreatorCard creator={creator} />
          </Link>
        ))
      )}
      <Link to="/add">Add New Creator</Link>
    </div>
  );
};

export default ShowCreators;