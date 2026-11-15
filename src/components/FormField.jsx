// A labelled form control (input, textarea or select) with an error message.
// The label is tied to the control with htmlFor/id, and errors are linked with aria-describedby.
function FormField({
  id, label, value, onChange, onBlur, error, hint, as = 'input', type = 'text',
  options = [], required = false, ...rest
}) {
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined
  const common = {
    id, name: id, value, onChange, onBlur, required,
    'aria-invalid': error ? 'true' : undefined, 'aria-describedby': describedBy, ...rest,
  }

  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}>{label}{required ? '' : ' (optional)'}</label>
      {as === 'select' ? (
        <select {...common}>
          <option value="">Select…</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : as === 'textarea' ? (
        <textarea rows={3} {...common} />
      ) : (
        <input type={type} {...common} />
      )}
      {hint && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="field__error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}

export default FormField
