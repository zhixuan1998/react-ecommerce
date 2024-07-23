import './CustomSeparator.scss';

function CustomSeparator({ fully = false, text = '' }) {
  return (
    <div
      className={`separator ${fully ? 'fully' : ''}`}
      style={{ marginBottom: text ? '-18px' : 0 }}
    >
      <div className="left"></div>
      {text && <div className="text">{text}</div>}
      <div className="right"></div>
    </div>
  );
}

export default CustomSeparator;
