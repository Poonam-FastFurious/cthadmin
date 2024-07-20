/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

const Reusetable = ({ headers, data, onEdit, onDelete }) => {
  return (
    <div className="table-responsive table-card mt-3 mb-1">
      <table className="table align-middle table-nowrap" id="customerTable">
        <thead className="table-light">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="sort"
                data-sort={header.dataSort}
                style={header.style}
              >
                {header.content}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="list form-check-all">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th scope="row"></th>
              <td className="customer_name">
                <div className="flex-shrink-0 me-2">
                  <img src={row.image} alt="" className="avatar-sm p-2" />
                </div>
              </td>
              <td className="email">{row.title}</td>
              <td className="phone">{row.place}</td>
              <td className="date">{row.link}</td>
              <td className="status">
                <span className={`badge ${row.statusClass}`}>{row.status}</span>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <div className="edit">
                    <button
                      className="btn btn-sm btn-success edit-item-btn"
                      onClick={() => onEdit(row.id)}
                      data-bs-toggle="modal"
                      data-bs-target="#EditshowModal"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="remove">
                    <button
                      className="btn btn-sm btn-danger remove-item-btn"
                      onClick={() => onDelete(row.id)}
                      data-bs-toggle="modal"
                      data-bs-target="#deleteRecordModal"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="noresult">
          <div className="text-center">
            <lord-icon
              src="../../../msoeawqm.json"
              trigger="loop"
              colors="primary:#121331,secondary:#08a88a"
              style={{ width: "75px", height: "75px" }}
            ></lord-icon>
            <h5 className="mt-2">Sorry! No Result Found</h5>
            <p className="text-muted mb-0">
              We've searched more than 150+ Orders We did not find any orders
              for your search.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reusetable;
