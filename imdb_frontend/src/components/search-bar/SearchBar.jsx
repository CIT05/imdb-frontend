import React, { useState, useCallback, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import SearchService from '../../services/SearchService';
import Spinner from 'react-bootstrap/Spinner';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchContainerRef = useRef(null); 

    const handleSearch = useCallback(async () => {
        if (!query.trim()) {
            setShowResults(false);
            return;
        }
        setLoading(true);
        const searchService = new SearchService();
        try {
            const data = await searchService.search(query);
            setResults(data);
            setLoading(false);
            setShowResults(true);
        } catch (error) {
            setLoading(false);
            setShowResults(false);
            console.error(error);
        }
    }, [query]);

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
                        <input
                            className="form-control border-end-0 border"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Search..."
                        />
                        <Button
                            variant="outline-light"
                            type="button"
                            onClick={() => {
                                handleSearch();
                            }}
                        >
                            Search
                        </Button>
                    </div>
                    {loading && (
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <Spinner animation="border" variant="light">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                    {showResults && results && (
                        <div
                            ref={searchContainerRef} 
                            className="list-group mb-3"
                            style={{ maxHeight: '150px', overflow: 'auto' }}
                        >
                        {results.map((result, index) => (
                        <div key={index} className="list-group-item">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <img 
                                        src={result.title.poster} 
                                        alt={result.title.primaryTitle} 
                                        style={{ width: 'auto', height: '75px' }} 
                                    />
                                </div>
                                <div className="col">
                                    <a href={result.title.url} className="text-decoration-none">
                                        {result.title.primaryTitle}
                                    </a>
                                </div>
                            </div>
                        </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;