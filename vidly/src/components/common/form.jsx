import { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Checkbox from './checkbox';

class Form extends Component {
  state = {
    data: { },
    errors: { }
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error }  = Joi.validate(this.state.data, this.schema, options);
    
    if (!error) return null;

    const errors = { };
    error.details.forEach(item => {
      errors[item.path[0]] = item.message;
    })
    return errors;
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  }

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  }

  doSubmit() {
    throw new Error("You must implement the method doSubmit in form child class");
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = {...this.state.data};
    data[input.name] = input.value;
    this.setState({ data, errors });
  }

  renderButton(label) {
    return (<button disabled={this.validate()} 
                    className="btn btn-primary">{label}</button>);
  }

  renderInput(name, label, type='text', other={}) {
    const { data, errors } = this.state;
    
    return (<Input type={type}
                   name={name} 
                   label={label} 
                   value={data[name]}
                   error={errors[name]}
                   onChange={this.handleChange}
                   {...other} />)
  }

  renderCheckBox(name, label, options, other={}) {
    const { data, errors } = this.state;

    return (<Checkbox name={name}
                      label={label}
                      options={options}
                      value={data[name]}
                      error={errors[name]} 
                      onChange={this.handleChange} 
                      {...other} />);
    // return (
    //   <div className="form-group">
    //     <label htmlFor={name} className="control-label">{label}</label>
    //     <div>
    //       <select className="form-control" id={name} name={name} value={data[name]} onChange={e => this.handleChange(e)}>
    //         {options && options.map(option => (
    //           <option key={option.value} value={option.value}>{option.name}</option>  
    //         ))}
    //       </select>
    //     </div>
    //     {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
    //   </div>
    // );
  }
}
 
export default Form;