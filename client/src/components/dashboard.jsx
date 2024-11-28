import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dash.css';
import Navbar from './navbar2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import tokenchecker from '../api/checktoken';
import { useNavigate } from 'react-router-dom';

import { postapi2 } from '../api/getpost'
const FileUpload = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setupload] = useState(false);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files;
    setFile(selectedFile);


  };


  useEffect(() => {
    const checkMyToken = async () => {
      try {
        const getToken = await tokenchecker();
        if (getToken.message === 'Token is valid') {
          sessionStorage.setItem('id', getToken.data.userId);
          setLoading(true);
        } else {
          navigate('/');
        }
      } catch (err) {
        alert('Error getting token');
      }
    };
    checkMyToken();
  }, []);
  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setupload(true)
    if (file == null) {

    } else {
      const formData = new FormData();

      for (var i = 0; i < file.length; i++) {
        formData.append('kerafiles', file[i]);
      }

      const response = await postapi2('http://localhost:7777/fileupload', formData);
      console.log(response);

      if (response.succcess) { setupload(false); toast("file uploaded"); }
    }
  };
  if (!loading) {
    return null;
  }

  return (
    <>

      <Navbar />
      <ToastContainer />
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row>
          <Col xs={12} sm={10} md={8} lg={6}>
            <Card className="p-4 bg-light rounded shadow-sm">
              <h2 className="text-center mb-4">Upload File</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-4">
                  <Form.Label>Choose a file</Form.Label>
                  <Form.Control
                    type="file" multiple
                    onChange={handleFileChange}
                    required
                  />
                </Form.Group>

                {/* {file && (
                <div className="file-preview mb-4">
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col xs={8}>
                          <Card.Title>{file.name}</Card.Title>
                          <Card.Text>{file.size} KB</Card.Text>
                        </Col>
                        <Col xs={4} className="text-end">
                          <Button variant="danger" onClick={handleRemoveFile}>Remove</Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>
              )} */}

                {/* {
                file.map((val)=>{
                  return(
                    <>
                    {val}
                    </>
                  )
                })
              }  */}

                <Button type="submit" variant="primary" className="w-100">
                  Upload
                </Button>
                {uploading ? <p>Uploading.......</p> : null}
              </Form>
            </Card>
          </Col>
        </Row>

      </Container>
    </>
  );
};

export default FileUpload;
