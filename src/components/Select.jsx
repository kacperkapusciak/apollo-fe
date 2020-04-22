import React from 'react';
import ReactSelect from 'react-select';

import theme from 'styles/theme';

const styles = {
  control: base => ({
    ...base,
    height: '40px',
    background: theme.colors.primary[100],
    borderRadius: '10px',
    boxShadow: theme.shadow,
    border: 'none',
    cursor: 'pointer',
    color: theme.colors.neutral[700],
  }),
  menu: base => ({
    ...base,
    padding: 0,
    borderRadius: '10px',
    zIndex: 1,
    border: 'none',
    boxShadow: theme.shadow,
  }),
  indicatorSeparator: base => ({
    ...base,
    display: 'none',
  }),
  dropdownIndicator: base => ({
    ...base,
    svg: {
      color: theme.colors.neutral[700],
    },
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? theme.colors.primary[100] : (isFocused ? theme.colors.accent[100] : 'none'),
    cursor: 'pointer',
    color: theme.colors.neutral[700],
    '&:first-of-type': {
      'border-radius': '10px 10px 0 0'
    },
    '&:last-child': {
      'border-radius': '0 0 10px 10px'
    }
  }),
};

function Select(props) {
  const { options, field, form, isSearchable = false } = props;

  return (
    <ReactSelect
      options={options}
      name={field.name}
      styles={styles}
      value={options ? options.find(option => option.value === field.value) : ''}
      onChange={(option) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
      isSearchable={isSearchable}
    />
  )
}

export default Select
