
const FormSpinnerWrapper = ({ loading, children }) => {
  return (
    <div className="position-relative d-flex justify-content-center">
      <div className="w-100">{children}</div>

        {loading && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-opacity-25" style={{ zIndex: 1055 }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>
        )}
    </div>
  );
};

export default FormSpinnerWrapper;
