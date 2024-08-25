import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { supabase } from './client';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import './index.css';

function App() {
  const [creators, setCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, []);

  async function fetchCreators() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setCreators(data);
    } catch (error) {
      console.error('Error fetching creators:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1 className="title-text">Creatorverse</h1>
          <nav id="navbar">
            <ul>
              <li><Link to="/" role="button">View All Creators</Link></li>
              <li><Link to="/new" role="button">Add Creator</Link></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<ShowCreators creators={creators} isLoading={isLoading} />} />
          <Route path="/creator/:id" element={<ViewCreator />} />
          <Route path="/new" element={<AddCreator />} />
          <Route path="/edit/:id" element={<EditCreator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;