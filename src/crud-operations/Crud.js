import ConfirmDialog from "./ConfirmDialog";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Spinner,
  Table,
  Offcanvas,
  Container,
  Navbar,
} from "react-bootstrap";
const Crud = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetch("API", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserList(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle]);

  const handleDialogNo = () => {
    setShowDialog(false);
  };

  const handleDialogYes = () => {
    fetch("API" + user.id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    setShowDialog(false);
  };

  const handleClose = () => {
    setShowCanvas(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const saveUser = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    var methodType = user.id ? "PUT" : "POST";

    setLoading(true);
    fetch("API", {
      method: methodType,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        console.log(response);
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
        setToggle(!toggle);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">SIMPLE-CRUD</Navbar.Brand>
          <Navbar.Brand onClick={logOut} className="float-end">
            Logout
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <div align="right" className="mt-3">
          <Button
            variant="primary"
            onClick={() => {
              setShowCanvas(true);
              setUser({});
            }}
            className="d-flex justify-content-end"
          >
            Add New
          </Button>
        </div>

        <Row className="mt-2">
          <Col>
            <Card>
              <Table responsive striped borderless>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th> Name</th>
                    <th>Description</th>
                    <th>Created_at</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((item, index) => (
                    <tr
                      onClick={() => {
                        setUser(item);
                      }}
                      key={index}
                      className={item.id === user.id ? "table-active" : ""}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <img src={item.image} alt="user" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.created_at}</td>

                      <td>
                        <Button
                          variant="primary"
                          className="me-2"
                          onClick={() => setShowCanvas(true)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => setShowDialog(true)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Offcanvas
          show={showCanvas}
          onHide={handleClose}
          placement="end"
          className="w-50"
          scroll="true"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={saveUser}
              method="POST"
            >
              <Row className="mb-3">
                <FormGroup as={Col}>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    name="name"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    value={user.name}
                    required
                  ></FormControl>
                </FormGroup>
                <FormGroup as={Col}>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl
                    name="description"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    value={user.description}
                    required
                  ></FormControl>
                </FormGroup>
                <FormGroup as={Col}>
                  <FormLabel>Created at</FormLabel>
                  <FormControl
                    name="created_at"
                    onChange={(e) => handleChange(e)}
                    type="date"
                    value={user.created_at}
                    required
                  ></FormControl>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col}>
                  <FormLabel>Image</FormLabel>
                  <FormControl
                    name="image"
                    onChange={(e) => handleChange(e)}
                    type="file"
                    value={user.image}
                    required
                  ></FormControl>
                </FormGroup>
              </Row>

              {loading ? (
                <Button variant="primary" disabled className="float-end mt-2">
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
                  {user.id ? "Update" : "Save"}
                </Button>
              )}
            </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>

      <ConfirmDialog
        showDialog={showDialog}
        handleDialogYes={handleDialogYes}
        handleDialogNo={handleDialogNo}
      />
      <ToastContainer autoClose={2000} />
    </div>
  );
};
export default Crud;
