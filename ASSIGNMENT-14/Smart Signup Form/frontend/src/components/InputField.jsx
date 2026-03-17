import { motion } from 'framer-motion';

function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon,
  rightElement,
  autoComplete
}) {
  return (
    <div className="field-wrap">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <motion.div
        className={`input-shell ${error ? 'has-error' : ''}`}
        animate={error ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.25 }}
      >
        {icon ? <span className="input-icon">{icon}</span> : null}
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          className="text-input"
        />
        {rightElement ? <div className="input-right">{rightElement}</div> : null}
      </motion.div>
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  );
}

export default InputField;
