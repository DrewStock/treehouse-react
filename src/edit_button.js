import React from 'react';
import PropTypes from 'prop-types';

const EditButton = props => {

    if(props.isEditing) {
        return (
            <button>save</button>
        )   
    }
    
    return (
        <button>edit</button>
    )
}
EditButton.propTypes = {
    isEditing: PropTypes.bool.isRequired,
}

export default EditButton;