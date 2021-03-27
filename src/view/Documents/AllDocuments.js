import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  deleteDocument,
  documentsAll,
  getFile,
  newDocument,
} from "../../service/documents.service";
import { findSpace } from "../../service/spaces.service";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
} from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import classnames from "classnames";
import DocumentsList from "../../components/DocumentsList/DocumentsList";
import docuImg from "./closeup-of-working-table-workplace-office.jpg";
import Spinner from "../../components/Spinner/Spinner";

const GetAllItems = (props) => {
  const initialState = { name: "", description: "", image: "", type: "" };

  const { spaceId } = useParams();
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [space, setSpace] = React.useState({});
  const [state, setState] = React.useState(initialState);
  const [documents, setDocuments] = React.useState({});
  const [error, setError] = React.useState(false)
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

    setSpace(data);
  };
  useEffect(() => {
    getDocuments();
  }, []);
  useEffect(() => {
    getName();
  }, []);

 

  const handleRemove = async (documentId) => {
    const { data } = await deleteDocument(spaceId, documentId);
    if (data){
      getDocuments();
    }
  
  };

  const handleSubmit = async () => {
    try {
      if(!state.name || !state.image || !state.type){
        setError({message: "Debes completar los campos requeridos"})
      }
      const { data } = await newDocument(spaceId, state);
      getDocuments();
      setState(initialState);

      if (data) {
        setModal(!modal);
      }
    } catch (e) {

    }
  };

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleUpload = async (e) => {
    setImageReady(false);
    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0]);
    const { data } = await getFile(spaceId, uploadData);

    setState({ ...state, urlFile: data });
    setImageReady(true);
  };

  const style = {
    backgroundImage: `url(${docuImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    filter: "grayscale(70%)",
  };

  return (
    <div>
      <Breadcrumb tag="nav" listTag="div">
        <BreadcrumbItem tag="a" href="/">
          Home
        </BreadcrumbItem>
        <BreadcrumbItem tag="a" href="/spaces">
          Espacios
        </BreadcrumbItem>
        <BreadcrumbItem tag="a" href={`/spaces/${spaceId}`}>
          {space.name}
        </BreadcrumbItem>
        <BreadcrumbItem active tag="a" href="#">
          Documentos
        </BreadcrumbItem>
      </Breadcrumb>
      <div style={style} className="title-logo"></div>
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
                <div className="column-expenses">
                  {loading ? (
                    documents.map((item) => (
                      <DocumentsList
                        key={item._id}
                        item={item}
                        onDelete={handleRemove}
                      ></DocumentsList>
                    ))
                  ) : (
                    <Spinner/>
                  )}
                </div>
                <div className="newEvent">
                  <img
                    onClick={toggleModal}
                    src="/images/plus.png"
                    alt="mas"
                  ></img>
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
      <Modal isOpen={modal} centered="true" toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>¿Qué quieres subir?</ModalHeader>
        <ModalBody>
          <Form className="form-space" onSubmit={handleSubmit} id="form">
            <FormGroup>
              <Label>
                Nombre del documento
                <Input
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  required
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="imagenSpace">Seleccionar documento </Label>
              <CustomInput
                bsSize="sm"
                id="imagenSpace"
                type="file"
                name="image"
                value={state.image}
                onChange={handleUpload}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>
                Seleccionar tipo de archivo
                <Input  required type="select" onChange={handleChange} name="type">
                  <option selected="true" disabled="disabled">
                    Seleccionar tipo
                  </option>
                  <option value="imagen">Imagen</option>
                  <option value="excel">Excel</option>
                  <option value="word">Word</option>
                  <option value="powerpoint">PowerPoint</option>
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                </Input>
              </Label>
            </FormGroup>
          </Form>
          <p style={{color:"red"}}>{error.message}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!imageReady}
            onClick={handleSubmit}
            style={{ backgroundColor: "orange", border: "none" }}
          >
            Subir documento
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
