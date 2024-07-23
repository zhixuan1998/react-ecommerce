import './CustomButton.scss';

function CustomButton({
  children,
  style = {},
  color = 'primary',
  disabled = false,
  onClick = () => {}
}) {
  return (
    <button
      className={`custom-button ${color}`}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

export default CustomButton;
