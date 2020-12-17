import React from 'react'
import './CircleButton.css'
import PropTypes from 'prop-types';

export default function CircleButton(props) {
  const { tag, className, children, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

CircleButton.defaultProps ={
  tag: 'a',
}

CircleButton.propTypes = {
  tag: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.array,
  otherProps: PropTypes.array,
};
