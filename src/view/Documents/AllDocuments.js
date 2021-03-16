import React, { useEffect } from "react";
import { useParams, Link, useHistory, Redirect } from "react-router-dom";
import { documentsAll } from "../../service/documents.service";
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
import classnames from "classnames";
import DocumentsList from "../../components/DocumentsList/DocumentsList";

const GetAllItems = (props) => {
  let history = useHistory();
  const { spaceId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [space, setSpace] = React.useState({});
  const [documents, setDocuments] = React.useState({});
  const [activeTab, setActiveTab] = React.useState("1");


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
                      <DocumentsList key={item._id} item={item}></DocumentsList>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <Link to={`/spaces/${spaceId}/documents/newdocument`}>
                  {" "}
                  <img src="/images/mas.png" alt="mas"></img>
                </Link>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default GetAllItems;