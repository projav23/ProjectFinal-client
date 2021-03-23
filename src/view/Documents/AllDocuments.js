import React, { useEffect } from "react";
import { useParams, Link, useHistory, Redirect } from "react-router-dom";
import { deleteDocument, documentsAll, getFile, newDocument } from "../../service/documents.service";
import { findSpace } from "../../service/spaces.service";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import classnames from "classnames";
import DocumentsList from "../../components/DocumentsList/DocumentsList";

const GetAllItems = (props) => {
  let history = useHistory();
  const { spaceId } = useParams();
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [space, setSpace] = React.useState({});
  const [state, setState] = React.useState({name:'', description: ''})
  const [documents, setDocuments] = React.useState({});
  const [activeTab, setActiveTab] = React.useState("1");
  const [imageReady, setImageReady] = React.useState(false);


  const toggleModal = () => setModal(!modal);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const getDocuments = async () => {
    const { data } = await documentsAll(spaceId);
    setDocuments(data);
    setLoading(true);
  };
  const getName = async () => {
    const { data } = await findSpace(spaceId);
    console.log(data);
    setSpace(data);
  };
  useEffect(() => {
    getDocuments();
  }, []);
  useEffect(() => {
    getName();
  }, []);

  const goBack = () => {
    history.push(`/spaces/${spaceId}`)
  };

  const handleRemove = async (documentId) =>{
    const {data} = await deleteDocument(spaceId, documentId)
    getDocuments()
  }


  const handleSubmit= async ()=>{
    try {
    console.log('entra a crear doc')
    const {data} = await newDocument(spaceId, state)
    getDocuments()
    console.log("createNewDoc",data)
    if (data){
      setModal(!modal)
    }
    } catch (e) {
    console.error(e)
    }
  }

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleUpload = async (e) => {
    setImageReady(false);
    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0]);
    const { data } = await getFile(spaceId, uploadData);
    console.log("document", data);
    setState({ ...state, urlFile: data });
    setImageReady(true);
  };

  return (
    <div>
      <div className="title-logo">
        <img onClick={goBack} src="/images/left-arrow.png" alt="back"></img>
        <p className="space">{space.name}</p>
      </div>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{ width: "375px" }}
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Documentos
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className="column">
                  {loading ? (
                    documents.map((item) => (
                      <DocumentsList key={item._id} item={item} onDelete={handleRemove}></DocumentsList>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <Link onClick={toggleModal}>
                  {" "}
                  <img src="/images/mas.png" alt="mas"></img>
                </Link>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
      <Modal isOpen={modal} centered="true" toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>¿Qué quieres recordar?</ModalHeader>
        <ModalBody>
        <form className="form-space" onSubmit={handleSubmit} id="form">
        <label>
          Nombre del documento*
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Seleccionar documento
          <input
            type="file"
            name="image"
            value={state.image}
            onChange={handleUpload}
          />
        </label>
        <label>
          Tipo de documento
          <select onChange={handleChange}  name="type">
            <option selected="true" disabled="disabled">
              Seleccionar tipo
            </option>
            <option value='imagen'>Imagen</option>
            <option value='excel'>Excel</option>
            <option value='word'>Word</option>
            <option value='powerpoint'>PowerPoint</option>
            <option value='pdf'>PDF</option>
            <option value='csv'>CSV</option>
          </select>
        </label>
      </form>
      
        </ModalBody>
        <ModalFooter>
          <Button disabled={!imageReady} onClick={handleSubmit} color="success">
            Añadir gasto
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default GetAllItems;