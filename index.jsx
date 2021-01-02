import React from 'react';
import { render } from 'react-dom';
import { Form, Field } from 'react-final-form';
import swal from 'sweetalert';
const { SNOWPACK_PUBLIC_PORT } = import.meta.env;

const MyForm = () => {
  const onSubmit = async values => {
    try {
      const response = await fetch(`http://localhost:${SNOWPACK_PUBLIC_PORT || 2001}/api/zestimate`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      });
      const {amount, text} = await response.json();
      if (!amount) {
        swal({
          title: 'Error',
          text: `${text}`,
          icon: 'error'
        });
      } else {
        const {city, state, street, zip} = values;
        swal({
          title: `${amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
          text: `${street},
          ${city}, ${state} ${zip}`,
          icon: 'info'
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={onSubmit} render={({handleSubmit}) => (
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <Field name='street' component='input' type='text' placeholder='Street' required/>
          <Field name='city' component='input' type='text' placeholder='City' required/>
          <Field name='state' component='select' required>
            <option value='' hidden>State</option>
            <option value='AL'>Alabama</option>
            <option value='AK'>Alaska</option>
            <option value='AZ'>Arizona</option>
            <option value='AR'>Arkansas</option>
            <option value='CA'>California</option>
            <option value='CO'>Colorado</option>
            <option value='CT'>Connecticut</option>
            <option value='DE'>Delaware</option>
            <option value='DC'>District Of Columbia</option>
            <option value='FL'>Florida</option>
            <option value='GA'>Georgia</option>
            <option value='HI'>Hawaii</option>
            <option value='ID'>Idaho</option>
            <option value='IL'>Illinois</option>
            <option value='IN'>Indiana</option>
            <option value='IA'>Iowa</option>
            <option value='KS'>Kansas</option>
            <option value='KY'>Kentucky</option>
            <option value='LA'>Louisiana</option>
            <option value='ME'>Maine</option>
            <option value='MD'>Maryland</option>
            <option value='MA'>Massachusetts</option>
            <option value='MI'>Michigan</option>
            <option value='MN'>Minnesota</option>
            <option value='MS'>Mississippi</option>
            <option value='MO'>Missouri</option>
            <option value='MT'>Montana</option>
            <option value='NE'>Nebraska</option>
            <option value='NV'>Nevada</option>
            <option value='NH'>New Hampshire</option>
            <option value='NJ'>New Jersey</option>
            <option value='NM'>New Mexico</option>
            <option value='NY'>New York</option>
            <option value='NC'>North Carolina</option>
            <option value='ND'>North Dakota</option>
            <option value='OH'>Ohio</option>
            <option value='OK'>Oklahoma</option>
            <option value='OR'>Oregon</option>
            <option value='PA'>Pennsylvania</option>
            <option value='RI'>Rhode Island</option>
            <option value='SC'>South Carolina</option>
            <option value='SD'>South Dakota</option>
            <option value='TN'>Tennessee</option>
            <option value='TX'>Texas</option>
            <option value='UT'>Utah</option>
            <option value='VT'>Vermont</option>
            <option value='VA'>Virginia</option>
            <option value='WA'>Washington</option>
            <option value='WV'>West Virginia</option>
            <option value='WI'>Wisconsin</option>
            <option value='WY'>Wyoming</option>
          </Field>
          <Field name='zip' component='input' type='text' placeholder='Zip' required/>
          <button type='submit'>Get Zestimate</button>
        </div>
      </form>
    )}/>
  );
};

render(<MyForm />, document.getElementById('root'));
