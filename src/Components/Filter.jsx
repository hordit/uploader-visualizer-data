import PropTypes from 'prop-types';
import { ContainerInput, StyledInput } from './Filter.styled';

const Filter = ({value, onChange}) => {
    return (
        <ContainerInput>
            <label>
                Fined by:
                <StyledInput 
                type="text" 
                name="" value={value} 
                onChange={onChange}  />
            </label>
        </ContainerInput>
    );
};

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Filter;