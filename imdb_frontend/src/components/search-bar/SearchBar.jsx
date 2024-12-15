import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import searchServiceInstance from '../../services/Search/SearchService';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(); 
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('default');
  const searchContainerRef = useRef(null);
  const { loggedInUser } = useUserContext();

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      return;
    }

    setLoading(true);

    try {
      let data;

      if (loggedInUser) {
        if (searchType === 'titles') {
          data = await searchServiceInstance.loginSearchTitle(
            loggedInUser.userId,
            query,
            loggedInUser.token
          );
        } else if (searchType === 'celebs') {
          data = await searchServiceInstance.loginSearchName(
            loggedInUser.userId,
            query,
            loggedInUser.token
          );
        } else if (searchType === 'exact') {
          data = await searchServiceInstance.searchExact(query);
        } else {
          data = await searchServiceInstance.search(query);
        }
      } else {
        if (searchType === 'titles') {
          data = await searchServiceInstance.searchTitle(query);
        } else if (searchType === 'celebs') {
          data = await searchServiceInstance.searchName(query);
        } else if (searchType === 'exact') {
          data = await searchServiceInstance.searchExact(query);
        } else {
          data = await searchServiceInstance.search(query);
        }
      }

      setResults(data); 
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false);
    }
  }, [loggedInUser, query, searchType]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleOutsideClick = (e) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target)
    ) {
	  setResults(null);
	}
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setResults(null);
  }, [searchType]);

  const renderSearchResults = () => {
    if (!results) return null; 

    if (searchType === 'titles' || searchType === 'celebs') {

      return (
        <div>
          {results.map((result, index) => {
            let id = '';
            let content = null;
            if (searchType === 'titles') {
              id = result?.url?.split('/').pop();
              content = (
                <a href={`/title/${id}`} className="text-decoration-none">
                  {result?.title }
                </a>
              );
            } else if (searchType === 'celebs') {
              id = result?.url?.split('/').pop();
              content = (
                <a href={`/person/${id}`} className="text-decoration-none">
                  {result?.actorName}
                </a>
              );
            }

            return (
              <div key={index} className="list-group-item">
                <div className="row align-items-center">
                  {result?.poster && (
                    <div className="col-auto">
                      <img
                        src={result?.poster}
                        alt={result?.title || result?.actorName || 'Poster'}
                        style={{ width: 'auto', height: '75px' }}
                      />
                    </div>
                  )}
                  <div className="col">{content}</div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    const { persons, titles } = results;

    return (
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>

        {persons && persons.length > 0 && (
           <div style={{backgroundColor: 'white', color: 'black'}}>
            <h5 style={{padding:'1rem'}}>Persons</h5>
            {persons.map((person, index) => (
            <div key={index} className="list-group-item">
                <div className="row align-items-center">
                <a
                  href={`/person/${person?.person?.url?.split('/').pop()}`}
                  className="text-decoration-none"
                >
                  {person?.person?.primaryName || 'No Name Available'}
                </a>
              </div>
			  </div>
            ))}
          </div>
        )}


        {titles && titles.length > 0 && (
          <div style={{backgroundColor: 'white', color: 'black'}}>
            <h5 style={{padding:'1rem'}}>Titles</h5>
            {titles.map((title, index) => (
      		<div key={index} className="list-group-item">
                <div className="row align-items-center">
                <a
                  href={`/title/${title?.title?.url?.split('/').pop()}`}
                  className="text-decoration-none"
                >
                  {title?.title?.primaryTitle || 'No Title Available'}
                </a>
              </div>
			  </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div className="input-group">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {searchType === 'titles'
                  ? 'Titles'
                  : searchType === 'celebs'
                  ? 'Celebs'
                  : searchType === 'exact'
                  ? 'Exact'
                  : 'Default'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSearchType('default')}>
                  Default Search
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSearchType('titles')}>
                  Titles
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSearchType('celebs')}>
                  Celebs
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSearchType('exact')}>
                  Exact Search
                </Dropdown.Item>
                <Dropdown.Item onClick={() => (window.location.href = '/advanced-search')}>
                  Advanced Search
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <input
              className="form-control border-end-0 border"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search..."
            />

            <Button variant="outline-light" type="button" onClick={handleSearch}>
              Search
            </Button>
          </div>

		  {loading ? (
  <div className="d-flex justify-content-center align-items-center py-3">
    <Spinner animation="border" variant="light">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
) : (
  <div
    ref={searchContainerRef}
    className="list-group mb-3"
    style={{
      maxHeight: '300px',
      overflow: 'auto',
      position: 'absolute',
      width: '28rem',
      zIndex: '99',
    }}
  >
    {results && (
      <>
        {(results.persons?.length === 0 && results.titles?.length === 0) ? (
          <div className="text-center py-2">No results found.</div> 
        ) : (
          renderSearchResults()
        )}
      </>
    )}
  </div>
)}


        </div>
      </div>
    </div>
  );
};

export default SearchBar;
