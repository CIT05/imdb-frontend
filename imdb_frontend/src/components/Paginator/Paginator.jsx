// @ts-nocheck
import Pagination from 'react-bootstrap/Pagination';

const Paginator = ({numberOfPages, chosenPage, onPageChange}) => {


  return (
    <Pagination>

      {chosenPage !== 0 && <Pagination.Prev onClick={() => onPageChange(chosenPage-1)} />}
      {chosenPage !== 0 && <Pagination.Item onClick={() => onPageChange(0)}>{1}</Pagination.Item>}
      {chosenPage > 2 && <Pagination.Ellipsis />}

      {chosenPage > 1 && <Pagination.Item onClick={() => onPageChange(chosenPage-1)}>{chosenPage}</Pagination.Item>}
      <Pagination.Item active>{chosenPage+1}</Pagination.Item>
      {chosenPage < numberOfPages - 2 && <Pagination.Item onClick={() => onPageChange(chosenPage+1)}>{chosenPage + 2}</Pagination.Item>}

      {chosenPage < numberOfPages - 3 && <Pagination.Ellipsis />}
      {chosenPage !== numberOfPages-1 && <Pagination.Item onClick={() => onPageChange(numberOfPages-1)}>{numberOfPages}</Pagination.Item>}
      {chosenPage !== numberOfPages-1 && <Pagination.Next onClick={() => onPageChange(chosenPage+1)} />}
    </Pagination>
  
  );
}

export default Paginator;