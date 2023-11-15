import PropTypes from 'prop-types';

const Filter = ({value, onChange}) => {
    return (
        <div>
            <label>
                Search by Name, Age, or Salary:
                <input type="text" name="" value={value} onChange={onChange} />
            </label>
        </div>
    );
};

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Filter;