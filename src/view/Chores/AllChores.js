import React from "react";
import { useParams } from "react-router";
import { Link, useHistory, Redirect } from "react-router-dom";
import ChoreList from "../../components/ChoreList/ChoreList";
import { choresAll, deleteChore } from "../../service/chores.service";
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
import { findSpace } from "../../service/spaces.service";

const AllChores = () => {
  let history = useHistory();
  const { spaceId } = useParams();
  const [space, setSpace] = React.useState({});
  const [chores, setChores] = React.useState({ name: "", description: "" });
  const [activeTab, setActiveTab] = React.useState("1");
  const [loading, setLoading] = React.useState(false);

  const getAllChores = async () => {
    const { data } = await choresAll(spaceId);
    console.log(data);
    setChores(data);
    setLoading(true)
  };
  const getName = async () => {
    const { data } = await findSpace(spaceId);
    console.log(data);
    setSpace(data);
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  React.useEffect(() => {
    getAllChores();
  }, []);
  React.useEffect(() => {
    getName();
  }, []);

  const goBack = () => {
    history.push(`/spaces/${spaceId}`)
  };

  const handleDelete =async (choreId) =>{
    try {
    const deleteOne = await deleteChore(spaceId, choreId)
    getAllChores()
    } catch (e) {
    console.error(e)
    }
  }

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
              Normas del hogar
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className="column">
                  {loading ? (
                    chores.map((item) => (
                      <ChoreList onDelete={handleDelete} key={item._id} chore={item} ></ChoreList>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <Link to={`/spaces/${spaceId}/chores/newchore`}>
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

export default AllChores;
