import React from 'react';

const Time = props => {
  return (
    <select title="Select Time" name="time" id="Time" {...props}>
      <option value="0700">0700</option>
      <option value="0800">0800</option>
      <option value="0900">0900</option>
      <option value="1000">1000</option>
      <option value="1100">1100</option>
      <option value="1200">1200</option>
      <option value="1300">1300</option>
      <option value="1400">1400</option>
      <option value="1500">1500</option>
      <option value="1600">1600</option>
      <option value="1700">1700</option>
      <option value="1800">1800</option>
      <option value="1900">1900</option>
    </select>
  );
};

export default Time;
