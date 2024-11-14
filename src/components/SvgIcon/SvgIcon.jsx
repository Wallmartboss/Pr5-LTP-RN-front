import sprite from '../../icons/icons.svg';

const SvgIcon = ({ id, className = '', ...props }) => {
  return (
    <svg className={`icon ${className}`} {...props}>
      <use xlinkHref={`${sprite}#${id}`} />
    </svg>
  );
};

export default SvgIcon;