import React from 'react'
import ReactSelect from 'react-select'

function Select(props) {
  const { options, field, form, isSearchable = false } = props;

  return (
    <ReactSelect
      options={options}
      name={field.name}
      value={options ? options.find(option => option.value === field.value) : ''}
      onChange={(option) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
      isSearchable={isSearchable}
    />
  )
};

export default Select
