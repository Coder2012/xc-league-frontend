import React from 'react';

const Select = props => {
  const { options, ...select } = props;

  const renderOptions = options => {
    return options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  };

  return <select {...select}>{renderOptions(options)}</select>;
};

export default Select;
