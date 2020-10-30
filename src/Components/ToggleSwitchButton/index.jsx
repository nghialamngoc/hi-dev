import "./ToggleSwitchButton.scss";

function ToggleSwitchButton() {
  return (
    <div>
      <label className="switch switch-large">
        <input type="checkbox" />
        <span className="slider round">
          <span className="night-mode">
            <span>night</span>
            <span>mode</span>
          </span>
        </span>
      </label>
    </div>
  );
}

export default ToggleSwitchButton;
