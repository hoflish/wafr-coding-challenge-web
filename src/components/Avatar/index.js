import React from "react";
import PropTypes from "prop-types";

const DIMENSIONS = [16, 24, 32, 48, 64, 96, 128];

const Avatar = ({ photoUrl, size }) => {
  let sizeClass =
    Number.isInteger(size) && DIMENSIONS.indexOf(size) >= 0
      ? `is-${size}x${size}`
      : "is-32x32";
  return (
    <figure className={`image ${sizeClass}`}>
      <img className="is-rounded" src={photoUrl} />
    </figure>
  );
};

Avatar.propTypes = {
  photoUrl: PropTypes.string,
  size: PropTypes.number
};

Avatar.defaultProps = {
  photoUrl: require("../../images/avatar-placeholder.png")
};

export default Avatar;
