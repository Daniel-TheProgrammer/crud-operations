import { useState } from "react";

import {
  Card,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Button,
  Spinner,
  Image,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Registration = () => {
  const [user, setUser] = useState({});
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const saveUser = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();

      setLoading(true);
      fetch("http://127.0.0.1:8000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Data Added Successfuly", {
              position: "bottom-right",
            });
          } else {
            toast.error(response.statusText + "(" + response.status + ")", {
              position: "bottom-right",
            });
          }

          setValidated(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    setValidated(true);
  };

  return (
    <div>
      <Container>
        <Row className="mt-5 mb-3 justify-content-md-center">
          <Col sm={9}>
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={6}>
                    <Image src="cycle.PNG" className="img-fluid w-100 h-100" />
                  </Col>
                  <Col className="p-5 ">
                    <Row className="justify-content-md-center mb-5">
                      <h3>Registration</h3>
                    </Row>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={saveUser}
                      method="POST"
                    >
                      <Row className="mb-3">
                        <FormGroup>
                          <FormLabel>First Name</FormLabel>
                          <FormControl
                            name="first_name"
                            onChange={(e) => handleChange(e)}
                            type="text"
                            required
                          ></FormControl>
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl
                            name="last_name"
                            onChange={(e) => handleChange(e)}
                            type="text"
                            required
                          ></FormControl>
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Phone</FormLabel>
                          <FormControl
                            name="phone"
                            onChange={(e) => handleChange(e)}
                            type="text"
                            required
                          ></FormControl>
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Email</FormLabel>
                          <FormControl
                            name="email"
                            onChange={(e) => handleChange(e)}
                            type="email"
                            required
                          ></FormControl>
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Password</FormLabel>
                          <FormControl
                            name="password"
                            onChange={(e) => handleChange(e)}
                            type="password"
                            maxLength="30"
                            required
                          ></FormControl>
                        </FormGroup>
                      </Row>
                      <Button variant="link" type="submit" href="/">
                        LogIn
                      </Button>
                      {loading ? (
                        <Button
                          variant="primary"
                          disabled
                          className="float-end mt-2"
                        >
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Loading...
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          type="submit"
                          className="float-end mt-2"
                        >
                          Sign Up
                        </Button>
                      )}
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Registration;
