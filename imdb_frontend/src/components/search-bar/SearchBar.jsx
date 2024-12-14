import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import searchServiceInstance from '../../services/Search/SearchService';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [searchType, setSearchType] = useState('default');
    const searchContainerRef = useRef(null);
	const { loggedInUser } = useUserContext();

    const handleSearch = useCallback(async () => {
        if (!query.trim()) {
            setShowResults(false);
            return;
        }

        setLoading(true);

        try {
            let data;

            if (loggedInUser) {
                if (searchType === 'titles') {
                    data = await searchServiceInstance.loginSearchTitle(3, query, loggedInUser);
                } else if (searchType === 'celebs') {
                    data = await searchServiceInstance.loginSearchName(3, query, loggedInUser);
                } else {
                    data = await searchServiceInstance.search(query);
                }
            } else {
                if (searchType === 'titles') {
                    data = await searchServiceInstance.searchTitle(query);
                } else if (searchType === 'celebs') {
                    data = await searchServiceInstance.searchName(query);
                } else {
                    data = await searchServiceInstance.search(query);
                }
            }

            setResults(data);
            setShowResults(true);
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

    useEffect(() => {
        setResults([]); 
    }, [searchType]);
    

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <div className="input-group">
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {searchType === 'titles' ? 'Titles' : searchType === 'celebs' ? 'Celebs' : 'Default'}
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
        
                                <Dropdown.Item onClick={() => window.location.href = '/advanced-search'}>
                                Advanced Search <i className="bi bi-arrow-right"></i>
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
                                maxHeight: '300px',
                                overflow: 'auto',
                                position: 'absolute',
                                width: '28rem',
                                zIndex:'99'
                            }}
                        >
                            {loading ? (
                                <div className="d-flex justify-content-center align-items-center py-3">
                                    <Spinner animation="border" variant="light">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            ) : results.length > 0 ? (
                                results.map((result, index) => {
                                    let id = '';
                                    let titleId = '';
                                    let titleCelebsId = '';
                                    let content = null;
                                
                                    if (searchType === 'titles') {
                                        titleId = result?.url?.split('/').pop();
                                        content = (
                                            <>
                                                <a href={`/title/${titleId}`} className="text-decoration-none">
                                                    {result?.title}
                                                </a>
                                            </>
                                        );
                                    } else if (searchType === 'celebs') {
                                        titleCelebsId = result?.url?.split('/').pop();
                                        content = (
                                            <>
                                                <a href={`/person/${titleCelebsId}`} className="text-decoration-none">
                                                    {result?.actorName}
                                                </a>
                                            </>
                                        );
                                    } else {
                                        id = result?.title?.url?.split('/').pop();
                                        content = (
                                            <>
                                                <a href={`/title/${id}`} className="text-decoration-none">
                                                    {result.title?.primaryTitle}
                                                </a>
                                            </>
                                        );
                                    }
                                
                                    return (
                                        <div key={index} className="list-group-item">
                                            <div className="row align-items-center">
                                                {result?.title?.poster && (
                                                    <div className="col-auto">
                                                        <img
                                                            src={result.title.poster}
                                                            alt={result.title.primaryTitle || 'Poster'}
                                                            style={{ width: 'auto', height: '75px' }}
                                                        />
                                                    </div>
                                                )}
                                                <div className="col">{content}</div>
                                            </div>
                                        </div>
                                    );
                                })                                
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
