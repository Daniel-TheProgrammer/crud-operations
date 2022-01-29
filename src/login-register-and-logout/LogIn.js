import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Button,
  Image,
  Spinner,
} from "react-bootstrap";

const LogIn = () => {
  let navigate = useNavigate();
  const [messages, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    var { email, password } = event.target;
    setLoading(true);
    const response = await fetch(
      "https://simplor.herokuapp.com/api/user/login",
      {
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    if (response.status === 200) {
      var result = await response.json();
      console.log(result);
      localStorage.setItem("token", result.access);
      navigate("/crud");
      setLoading(false);
    } else {
      setMessage([{ error: "Invalid Username or Password" }]);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col sm={9}>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={6}>
                  <Image src="cycle.PNG" className="img-fluid w-100 h-100" />
                </Col>
                <Col className="p-5 ">
                  <Row className="text-center">
                    <h3>Login</h3>
                  </Row>
                  <Row>
                    <Form noValidate onSubmit={handleSubmit} method="POST">
                      {messages.map((item) => (
                        <li className="text-danger" key={item}>
                          {item.error && item.error}
                        </li>
                      ))}

                      <Row className="mb-3">
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            maxLength="30"
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            name="password"
                            type="password"
                            maxLength="30"
                          />
                        </Form.Group>
                      </Row>

                      <Button
                        variant="light"
                        className="float-start"
                        onClick={() => navigate("/register")}
                      >
                        Create account
                      </Button>

                      {loading ? (
                        <Button
                          variant="primary"
                          disabled
                          className="float-end"
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
                          className="float-end"
                        >
                          Login
                        </Button>
                      )}
                    </Form>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;
