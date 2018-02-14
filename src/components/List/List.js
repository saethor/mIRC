import React from 'react';
import PropTypes from 'prop-types';

const List = ({children, className}) => {
    return (<ul className={className}>{children}</ul>)
};

List.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default List;