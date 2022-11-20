import ReactPaginate from 'react-paginate';

let setStateOfSelectPage;

const Paginate = (props) => {
  const { listLength, displayCount, setStateInfoAction } = props;
  setStateOfSelectPage = setStateInfoAction;

  return (
    <>
      <ReactPaginate
        style={{ marginTop: 10, marginBottom: 100 }}
        pageCount={pageCountCalc(listLength, displayCount)}
        marginPagesDisplayed={5}
        pageRangeDisplayed={10}
        onPageChange={handlePageClick}
        containerClassName='pagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        activeClassName='active'
        previousLabel='<'
        nextLabel='>'
        previousClassName='page-item'
        nextClassName='page-item'
        previousLinkClassName='page-link'
        nextLinkClassName='page-link'
        disabledClassName='disabled'
        breakLabel='...'
        breakClassName='page-item'
        breakLinkClassName='page-link'
      />
    </>
  );
}

const handlePageClick = page => {
  setStateOfSelectPage(page.selected, 'selectPage');
  window.scrollTo(0, 50);
};

const pageCountCalc = (len, count) => {
  if (len < count) {
    return 1;
  }
  return Math.ceil(len / count);
};

export default Paginate;
