const CustomInput = (props) => {
  const { type, label, i_id, i_class, value, onChange, name } = props;

  return (
      <div className="form-floating">
          <input
              type={type}
              className={`form-control ${i_class} input`}
              id={i_id}
              name={name}  
              placeholder={label}
              value={value}  
              onChange={onChange} 
          />
          <label htmlFor={i_id}>{label}</label>
      </div>
  );
};

export default CustomInput;
