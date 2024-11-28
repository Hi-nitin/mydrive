import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import signupMap from '../maping/signup'
import { postapi, getapi } from '../api/getpost';
import Navbar from './navbar'
function FormExample() {
  const [formData, setfd] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    cpassword: ''
  });
  const handleinput = (events) => {

    //const {name,value}=events.target;
    setfd({
      ...formData,
      [events.target.name]: events.target.value

    });


  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Apirequest = postapi('http://localhost:7777/signup', formData);
    const Apiresponse = await Apirequest;
    console.log(Apiresponse);


    Apiresponse.success == true ? alert('successfully signed') :
      signupMap(Apiresponse.errors)

    Apiresponse.msg == 'duplicate user' ? alert('user is duplicate') : null
  }
  return (
    <>
    <Navbar/>
        <Form onSubmit={handleSubmit}>

        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            name='firstname'
            placeholder="First name"
            onChange={handleinput}

          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            name='lastname'
            type="text"
            placeholder="Last name"
            onChange={handleinput}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              name='username'
              onChange={handleinput}
              aria-describedby="inputGroupPrepend"
              required
            />

            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label> Password</Form.Label>
          <Form.Control
            required
            type="text"
            name='password'
            placeholder="Enter password"
            onChange={handleinput}

          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>confirm password</Form.Label>
          <Form.Control
            required
            type="text"
            name='cpassword'
            placeholder="Confirm-password"
            onChange={handleinput}

          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    </>
  );
}

export default FormExample;
