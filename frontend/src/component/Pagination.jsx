function Pagination({page, setPage, totalPages}) {

    return (
      <nav aria-label="Page">
        <ul className="pagination pagination-sm p-0 pb-1 justify-content-end">
          {/* Prev Button */}
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link text-dark border-secondary"
              onClick={() => setPage(page - 1)} >
              Prev
            </button>
          </li>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <li key={num} className={`page-item ${page === num ? "active" : ""}`}>
              <button className={`page-link ${
                  page === num 
                    ? "bg-dark text-light border-dark"  // active page
                    : "bg-light text-dark border-secondary"   // normal pages
                }`}
                onClick={() => setPage(num)} >
                {num}
              </button>
            </li>
          ))}

          {/* Next Button */}
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button  className="page-link text-dark border-secondary"
              onClick={() => setPage(page + 1)} >
              Next
            </button>
          </li>
        </ul>
      </nav>
    )
};

export default Pagination;