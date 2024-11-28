import { useEffect, useState } from 'react';
import { getapi, deleteapi, postapi } from '../api/getpost';
import Table from 'react-bootstrap/Table';
import Navbar from './navbar2';
import { useNavigate } from "react-router-dom";
import tokenchecker from '../api/checktoken';
import './myfiles.css'; // Import the CSS file
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyFiles = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [friend, setfriend] = useState();
  const [shareerror, seterror] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMyToken = async () => {
      try {
        const getToken = await tokenchecker();
        if (getToken.message === 'Token is valid') {
          //console.log(getToken.data);

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

  const fetchFiles = async () => {
    const response = await getapi('http://localhost:7777/myfiles');
    setFiles(response);
  };

  useEffect(() => {
    if (loading) fetchFiles();
  }, [loading]);

  const handleLook = (id) => {
    window.location.href = `http://localhost:7777/humpydumpy/${id}`; // Adjust your path accordingly
  };

  const handleDelete = async (deleteId) => {
    const response = await deleteapi('http://localhost:7777/deletefile', { deleteid: deleteId });
    if (response.msg === 'file deleted') {
      fetchFiles();
    } else {
      alert(response.msg);
    }
  };
  const [sharefileid, setsharefilename] = useState()

  const handleShareClick = async (file) => {
    setCurrentFile(file);
    setShowShareModal(true);
    setsharefilename(file._id)
    const response = await getapi('http://localhost:7777/fetchUsers');
    if (response.msg == 'error showing friends') {
      seterror(response.msg)
    } else {
      setfriend(response)
      seterror(null)
    }


  };

  const handleCloseModal = () => {
    setShowShareModal(false);
    setCurrentFile(null);
  };

  const handleShare = () => {
    // Implement your share logic here

    handleCloseModal();
  };

  const handleselectfriend = async (friendId) => {
    //alert(sharefilename+'  '+friendId)
    const myid = sessionStorage.getItem('id');
    const response = await postapi('http://localhost:7777/filesharing', { sharedTo: friendId, filesharedId: sharefileid, sharedBy: myid })
    console.log(response);
if(response.msg=='shared'){
  toast("File has been shared successfully");
}
if(response.msg=='sharing error k garne aba yestei ho..'){
  toast("Mula file shared vayana vane k garne");
}

  }
  if (!loading) {
    return null;
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container mt-4">
        {files.msg === 'cookie failed' && <p className="text-danger">Cookie console.error</p>}
        <Table striped bordered hover variant="dark" className="file-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Filename</th>
              <th>Upload Date</th>
              <th>Delete file</th>
              <th>Share file</th>
            </tr>
          </thead>
          <tbody>
            {files.data && files.data.map((val, index) => (
              <tr key={val._id}>
                <td>{index + 1}</td>
                <td onDoubleClick={() => handleLook(val.filename)}>{val.originalname}</td>
                <td>{val.uploadTime}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(val.filename)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary" // Changed to primary for better UI distinction
                    onClick={() => handleShareClick(val)}
                  >
                    Share
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Share Modal */}
        <Modal show={showShareModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Share File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to share the file "{currentFile ? currentFile.originalname : ''}"?</p>
            {shareerror && <p>Error showing friends</p>}
            {
              friend && friend.user.map((val) => {
                return (
                  <>
                    <button
                      className="btn btn-primary" // Changed to primary for better UI distinction
                      onDoubleClick={() => handleselectfriend(val._id)}
                    >
                      {val.name}
                    </button><br /><br />
                  </>
                )
              })
            }
            {/* Add any additional sharing options or input fields here */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default MyFiles;
