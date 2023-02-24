import Header from "../../components/header/Header";
import { Container, Row, Col, Button } from "react-bootstrap";
import WorkPlaces from "../../components/work-places/WorkPlaces";
import Catering from "../../components/catering/Catering";

const Home = () => {
  return (
    <>
      <WorkPlaces />

      <Catering />
    </>
  );
};

export default Home;
