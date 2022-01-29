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
  const [item, setItem] = useState({});
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch("https://simplor.herokuapp.com/api/category/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.constructor.prototype.hasOwnProperty("push")) {
          setItemList(result);
        } else {
          setItemList([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle]);

  const handleDialogNo = () => {
    setShowDialog(false);
  };

  const handleDialogYes = () => {
    fetch("https://simplor.herokuapp.com/api/category/delete/" + item.id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          setToggle(!toggle);
        } else {
          toast.error(response.statusText + "(" + response.status + ")", {
            position: "bottom-right",
          });
        }
      })
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

    setItem({ ...item, [name]: value });
  };

  const handleImage = (event) => {
    setFile(event.target.files[0]);
    setItem({ ...item, image: event.target.files[0] });
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

      console.log(file);
      console.log(item);
      return;
    }

    if (item.id) {
      setLoading(true);

      fetch("https://simplor.herokuapp.com/api/category/update/" + item.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            toast.success("Data Updated Successfuly", {
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
    } else {
      setLoading(true);

      fetch("https://simplor.herokuapp.com/api/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(item),
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
    }
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>SIMPLE-CRUD</Navbar.Brand>
          <Button variant="dark" className="float-end" onClick={logOut}>
            Logout
          </Button>
        </Container>
      </Navbar>
      <Container>
        <div align="right" className="mt-3">
          <Button
            variant="primary"
            onClick={() => {
              setShowCanvas(true);
              setItem({});
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {itemList.map((itm, index) => (
                    <tr
                      onClick={() => {
                        setItem(itm);
                      }}
                      key={index}
                      className={itm.id === item.id ? "table-active" : ""}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <img src={itm.image} alt="item" />
                      </td>
                      <td>{itm.name}</td>
                      <td>{itm.description}</td>

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
                    value={item.name}
                    required
                  ></FormControl>
                </FormGroup>
                <FormGroup as={Col}>
                  <FormLabel>Description</FormLabel>
                  <FormControl
                    name="description"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    value={item.description}
                    required
                  ></FormControl>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col}>
                  <FormLabel>Image</FormLabel>
                  <FormControl
                    type="file"
                    onChange={(e) => handleImage(e)}
                  ></FormControl>
                </FormGroup>
                {/* <input type="file" onChange={(e) => handleImage(e)} /> */}
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
                  {item.id ? "Update" : "Save"}
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
