import React, { useState, useCallback, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import searchServiceInstance from '../../services/SearchService';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [searchType, setSearchType] = useState('default');
    const searchContainerRef = useRef(null);

    const handleSearch = useCallback(async () => {
        if (!query.trim()) {
            setShowResults(false);
            return;
        }

        setLoading(true);

        try {
            let data;
            if (searchType === 'titles') {
                data = await searchServiceInstance.searchTitle(query);
            } else if (searchType === 'celebs') {
                data = await searchServiceInstance.searchName(query);
            } else {
                data = await searchServiceInstance.search(query);
            }

            setResults(data);
            setShowResults(true);
        } catch (error) {
            console.error('Error during search:', error);
        } finally {
            setLoading(false);
        }
    }, [query, searchType]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleOutsideClick = (e) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
            setShowResults(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <div className="input-group">
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {searchType === 'titles' ? 'Titles' : 'Default'}
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

                    {(showResults || loading) && (
                        <div
                            ref={searchContainerRef}
                            className="list-group mb-3"
                            style={{
                                maxHeight: '150px',
                                overflow: 'auto',
                                position: 'absolute',
                                width: '28rem',
                            }}
                        >
                            {loading ? (
                                <div className="d-flex justify-content-center align-items-center py-3">
                                    <Spinner animation="border" variant="light">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            ) : results.length > 0 ? (
                                results.map((result, index) => (
                                    <div key={index} className="list-group-item">
                                        <div className="row align-items-center">
                                            {result.title?.poster &&            
                                            <div className="col-auto">
                                                <img
                                                    src={result.title?.poster}
                                                    alt={result.title?.primaryTitle}
                                                    style={{ width: 'auto', height: '75px' }}
                                                />
                                            </div>
}
                                            <div className="col">
                                                <a
                                                    href={result.title?.url}
                                                    className="text-decoration-none"
                                                >
                                                    {result.title?.primaryTitle}
                                                </a>
                                            </div>
                                        </div>
                                            <>
                                            {searchType === 'titles' && (
                                                <p>{result.title}</p>
                                            )}
                                              {searchType === 'celebs' && (
                                                <p>{result.actorName}</p>
                                            )}
                                            </>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-2">No results found.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
