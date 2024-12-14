import React, { useState, useCallback, useEffect} from 'react';
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import searchServiceInstance from '../../services/Search/SearchService';
import style from './AdvancedSearch.module.css';

const AdvancedSearch = () => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('titles');
    const [searchType, setSearchType] = useState('');
    const [results, setResults] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);

    const handleSearchTitle = useCallback(() => {
        const params = {};
        setLoading(true);
        const titleMovie = document.querySelector('input[name="titleMovie"]').value;
        const moviePlot = document.querySelector('input[name="moviePlot"]').value;
        const titleCharacters = document.querySelector('input[name="titleCharacters"]').value;
        const personName = document.querySelector('input[name="personName"]').value;
    
        if (titleMovie) params.titleMovie = titleMovie;
        if (moviePlot) params.moviePlot = moviePlot;
        if (titleCharacters) params.titleCharacters = titleCharacters;
        if (personName) params.personName = personName;
    
    
        searchServiceInstance.searchTitleWithParams(params).then(data => {
            setResults(data);
            setLoading(false);
        }).catch(error => {
            console.error('Error during search:', error);
        });
    }, []);
    

    const handleSearchCelebs = useCallback(() => {
        const params = {};
        setLoading(true);
        const titleMovie = document.querySelector('input[name="titleNameCelebs"]').value;
        const moviePlot = document.querySelector('input[name="moviePlotCelebs"]').value;
        const titleCharacters = document.querySelector('input[name="titleCharactersCelebs"]').value;
        const personName = document.querySelector('input[name="personNameCelebs"]').value;
    
        if (titleMovie) params.titleMovie = titleMovie;
        if (moviePlot) params.moviePlot = moviePlot;
        if (titleCharacters) params.titleCharacters = titleCharacters;
        if (personName) params.personName = personName;
    
    
        searchServiceInstance.searchActorsWithParams(params).then(data => {
            setResults(data);
            setLoading(false);
        }).catch(error => {
            console.error('Error during search:', error);
        });
    }, []);
    

    const sortedResults = useCallback(() => {
        if (searchType === 'atoz') {
            return [...results].sort((a, b) => (activeTab === 'titles' ? a.title.localeCompare(b.title) : a.actorName.localeCompare(b.actorName)));
        }
        if (searchType === 'ztoa') {
            return [...results].sort((a, b) => (activeTab === 'titles' ? b.title.localeCompare(a.title) : b.actorName.localeCompare(a.actorName)));
        }
        return results;
    }, [results, searchType, activeTab]);
    

    useEffect(() => {
        setResults([]);
    }, [activeTab]);
    return (
        <>
        <div className={style.advancedContainer}>
            <h1>Advanced Search</h1>
            <p>
                Discover IMDb's robust title search. Mix and match info to refine your searches. Looking for 1970s Canadian horror 
                films rated above 6 by at least 100 users? Find them here. All fields below are optional, but at least one is needed 
                for a search. For ranges (release date, votes), use 'min' for larger/after and 'max' for smaller/before. You can also 
                press 'Enter' after checking a box or focusing on a field. To learn more, please visit our help site and FAQs.
            </p>
            <div className={[style.tabContainer]}>
            <Nav 
                fill 
                variant="tabs" 
                activeKey={activeTab} 
                onSelect={(selectedKey) => setActiveTab(selectedKey)}
            >
                <Nav.Item >
                    <Nav.Link className={[style.navItem]} eventKey="titles"><i className="bi bi-film"></i> Titles</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={[style.navItem]}  eventKey="celebs"><i className="bi bi-person-heart"></i> Celebs</Nav.Link>
                </Nav.Item>
            </Nav>
            </div>

            <div>
                {activeTab === 'titles' && (
                    <div>
                        <h2 className={[style.tabName]}>Search Titles</h2>
                        <p>Use the form below to search for movie or TV titles with advanced filters.</p>

                        <div className={[style.accordions]}>
 
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className={[style.accordionItem]}>
                        <Accordion.Header>Movie Title</Accordion.Header>
                        <Accordion.Body>
                            <label htmlFor="titleMovie"></label>
                        <input type="text" name="titleMovie" placeholder="Enter title name" />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Accordion>
                    <Accordion.Item eventKey="1" className={[style.accordionItem]}>
                        <Accordion.Header>Movie Plot</Accordion.Header>
                        <Accordion.Body>
                        <label htmlFor="moviePlot"></label>
                        <input type="textarea" name="moviePlot" placeholder="Enter movie plot" />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Accordion>
                    <Accordion.Item eventKey="2" className={[style.accordionItem]}>
                        <Accordion.Header>Title Characters</Accordion.Header>
                        <Accordion.Body>
                        <label htmlFor="titleCharacters"></label>
                        <input type="text" name="titleCharacters" placeholder="Enter character name" />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Accordion>
                    <Accordion.Item eventKey="3" className={[style.accordionItem]}>
                        <Accordion.Header>Celeb name</Accordion.Header>
                        <Accordion.Body>
                        <label htmlFor="personName"></label>
                        <input type="text" name="personName" placeholder="Enter celeb name" />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

    
                </div>
    
                <div className={style.submitButtonContainer}>
                <Button variant="outline-light" type="button" onClick={handleSearchTitle}>
                            See results
                        </Button>
                    </div>
                    </div>
             
                )}
                {activeTab === 'celebs' && (
                    <div>
                    <h2 className={[style.tabName]}>Search Celebs</h2>
                    <p>Use the form below to search for a celebrity with advanced filters.</p>

            <div className={[style.accordions]}>
              
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" className={[style.accordionItem]}>
                    <Accordion.Header>Movie Title</Accordion.Header>
                    <Accordion.Body>
                        <label htmlFor="titleNameCelebs"></label>
                    <input type="text" name="titleNameCelebs" placeholder="Enter title name" />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Accordion>
                <Accordion.Item eventKey="1" className={[style.accordionItem]}>
                    <Accordion.Header>Movie Plot</Accordion.Header>
                    <Accordion.Body>
                    <label htmlFor="moviePlotCelebs"></label>
                    <input type="text" name="moviePlotCelebs" placeholder="Enter movie plot" />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Accordion>
                <Accordion.Item eventKey="2" className={[style.accordionItem]}>
                    <Accordion.Header>Title Characters</Accordion.Header>
                    <Accordion.Body>
                    <label htmlFor="titleCharactersCelebs"></label>
                    <input type="text" name="titleCharactersCelebs" placeholder="Enter character name" />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Accordion>
                <Accordion.Item eventKey="3" className={[style.accordionItem]}>
                    <Accordion.Header>Celeb name</Accordion.Header>
                    <Accordion.Body>
                    <label htmlFor="personNameCelebs"></label>
                    <input type="text" name="personNameCelebs" placeholder="Enter celeb name" />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

       
            </div>
     
        <div className={style.submitButtonContainer}>
            <Button variant="outline-light" type="button"  onClick={handleSearchCelebs}>
                        See results
                    </Button>
                </div>
                </div>
                )}
            </div>
        </div>


            {results.length > 0  && !loading && (
                <>
                <div className={style.filterContainer}>
            <h4>Total results: {results.length}</h4>
            <Dropdown >
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                Sort by
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setSearchType('atoz')}>
                                   A to Z
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSearchType('ztoa')}>
                                  Z-A
                                </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
            </div>
            <div className={style.resultsContainer}>
        {(searchType ? sortedResults() : results).slice(0, visibleCount).map((result, index) => {
        const id = result?.url?.split('/').pop();
        return (
            <Card style={{ width: '18rem' }} key={index}>
                <Card.Body>
                    {activeTab === 'titles' && (
                        <>
                            <Card.Title>{result.title}</Card.Title>
                            <Card.Link href={`/title/${id}`}>See title  <i className="bi bi-arrow-right"></i></Card.Link>
                        </>
                    )}
                    {activeTab === 'celebs' && (
                        <>
                            <Card.Title>{result.actorName}</Card.Title>
                            <Card.Link href={`/name/${id}`}>See celeb</Card.Link>
                        </>
                    )}
                </Card.Body>
            </Card>
        );
    })}
</div>

    {visibleCount < results.length && (
        <div className={style.seeMoreContainer}>
           <Button variant="outline-info" type="button" 
                className={style.seeMoreButton}
                onClick={() => setVisibleCount((prevCount) => prevCount + 10)}
            >
                See More <i className="bi bi-arrow-down"></i>
            </Button>
        </div>
    )}        </>
            )}
  
        </>

    );
};

export default AdvancedSearch;
