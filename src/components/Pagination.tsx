interface Props {
  currentPage: number,
  itemsPerPage: number,
  paginate: Function,
  totalItems: number,
}

export const Pagination = ( {currentPage, itemsPerPage, paginate, totalItems}: Props ) => {
  const pageNumbers = [];
  const numPages = Math.ceil(totalItems/itemsPerPage);
  for( let i = 1; i <= numPages; i++ ) {
    if (i <= 5 || i == numPages || Math.abs(currentPage - i) <= 1){
      pageNumbers.push(i);
    }
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-item">
                <button onClick={() => paginate(number)} className={'page-link ' + (currentPage === number ? 'active' : '') }>
                  {number}
                </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
