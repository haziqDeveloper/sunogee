import { useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';

import { DateRange } from 'react-date-range';

import format from 'date-fns/format';
import { addDays } from 'date-fns';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangeComp = ({ rangedate , startDate , endDate , label = '有効期間' }) => {
  // date state
  const [range, setRange] = useState(
    {
      startDate: startDate||new Date(),
      endDate: endDate||addDays(new Date(), 7),
      key: 'selection',
    },
  );


  useEffect(() => {
		const newDate = {...range};
		 newDate.startDate =new Date(startDate);
		 newDate.endDate = new Date(endDate);
		 setRange({...newDate});
	},[startDate,endDate])

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="DoubleDateGrid">
      <TextField
        label={label}
        value={`${format(range.startDate, 'MM/dd/yyyy')} ~ ${format(range.endDate, 'MM/dd/yyyy')}`}
        readOnly
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne} className="DoubleDateCalender">
        {open && (
          <DateRange
            onChange={(item) => {
              setRange(item.selection);
              rangedate(item.selection);
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={[range]}
            months={1}
            direction="horizontal"
          />
        )}
      </div>
    </div>
  );
};

export default DateRangeComp;