import Pagination from 'react-bootstrap/Pagination';

const Paginator = ({numberOfPages, chosenPage, onPageChange}) => {

  return (
    <Pagination style={{marginTop: '1rem'}}>

      {chosenPage !== 0 && <Pagination.Prev linkStyle={{backgroundColor: 'black'}}onClick={() => onPageChange(chosenPage-1)} />}
      {chosenPage !== 0 && <Pagination.Item linkStyle={{backgroundColor: 'black'}} onClick={() => onPageChange(0)}>{1}</Pagination.Item>}
      {chosenPage > 2 && <Pagination.Ellipsis  linkStyle={{backgroundColor: 'black'}}/>}

      {chosenPage > 1 && <Pagination.Item  linkStyle={{backgroundColor: 'black'}} onClick={() => onPageChange(chosenPage-1)}>{chosenPage}</Pagination.Item>}
      <Pagination.Item  linkStyle={{backgroundColor: 'black'}}active>{chosenPage+1}</Pagination.Item>
      {chosenPage < numberOfPages - 2 && <Pagination.Item linkStyle={{backgroundColor: 'black'}} onClick={() => onPageChange(chosenPage+1)}>{chosenPage + 2}</Pagination.Item>}

      {chosenPage < numberOfPages - 3 && <Pagination.Ellipsis linkStyle={{backgroundColor: 'black'}} />}
      {chosenPage !== numberOfPages-1 && <Pagination.Item linkStyle={{backgroundColor: 'black'}} onClick={() => onPageChange(numberOfPages-1)}>{numberOfPages}</Pagination.Item>}
      {chosenPage !== numberOfPages-1 && <Pagination.Next linkStyle={{backgroundColor: 'black'}} onClick={() => onPageChange(chosenPage+1)} />}
    </Pagination>
  
  );
}

export default Paginator;