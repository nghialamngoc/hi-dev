import { useState } from 'react';
import './ToggleSwitchButton.scss';
import classNames from 'classnames';
import React from 'react';

function ToggleSwitchButton() {
  const [state, setState] = useState(false);

  const handleChange = () => {
    setState((state) => {
      return !state
    });
  }

  return (
    <div>
      <label className={classNames('switch', '--large', !state ? '--night': '--day')}>
        <input type="checkbox" checked={state} onChange={handleChange}/>
        <span className="slider round">
          {
            state === false ?
            <span className="slider-label">
              <span>night</span>
              <span>mode</span>
            </span> :
            <span className="slider-label">
              <span>day</span>
              <span>mode</span>
            </span>
          }
        </span>
      </label>
    </div>
  );
}

export default ToggleSwitchButton;
