import React from 'react';

const Location = props => {
  return (
    <select name="location" title="Select Parameter" id="Param" {...props}>
      <option value="nope1">Soundings</option>
      <option value="sounding1">
        #1: Exeter
      </option>
      <option value="sounding2">
        #2: Fairford
      </option>
      <option value="sounding3">
        #3: Herstmonceux
      </option>
      <option value="sounding4">
        #4: Newtown (mid-Wales)
      </option>
      <option value="sounding5">
        #5: Cambridge
      </option>
      <option value="sounding6">
        #6: Nottingham
      </option>
      <option value="sounding7">
        #7: Cheviots
      </option>
      <option value="sounding8">
        #8: Callander
      </option>
      <option value="sounding9">
        #9: Aboyne
      </option>
      <option value="sounding10">
        #10: Buckingham
      </option>
      <option value="sounding11">
        #11: Larkhill
      </option>
      <option value="sounding12">
        #12: Leeds
      </option>
      <option value="sounding13">
        #13: Carrickmore-NI
      </option>
      <option value="sounding14">
        #14: Castor Bay-NI
      </option>
      <option value="sounding15">
        #15: Talgarth
      </option>
      <option value="sounding16">
        #16: Camphill
      </option>
    </select>
  );
};

export default Location;
