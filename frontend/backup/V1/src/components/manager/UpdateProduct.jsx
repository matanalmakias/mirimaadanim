import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CateringContext } from "../../context/CateringContext";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import cateringService from "../../services/catering.service";

const UpdateProduct = () => {
  const [titleInput, setTitleInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState();
  const [priceInput, setPriceInput] = useState(0);
  const [showTitleCol, setShowTitleCol] = useState(true);
  const [showDescriptionCol, setShowDescriptionCol] = useState(true);
  const [showPriceCol, setShowPriceCol] = useState(true);
  const caterings = JSON.parse(localStorage.getItem("caterings"));
  const { productId } = useParams();
  const product = caterings.find((item) => item._id === productId);
  const toggleShowCol = (setState) => {
    setState((state) => !state);
  };
  const editProduct = async (data, setState) => {
    cateringService.editProduct(product._id, data);
    toggleShowCol(setState);
  };
  return (
    <>
      <Container className="card gap-1">
        <div className="d-flex justify-content-center flex-row-reverse">
          שם: {product.title}
          <br />
          תיאור: {product.description}
          <br />
          מחיר: {product.price}
        </div>

        <Row className="card ">
          <Col
            className={
              showTitleCol
                ? "d-flex justify-content-center flex-row-reverse p-2 gap-2"
                : "hide_class"
            }
          >
            <p> שם מוצר: </p>

            <input
              onChange={(e) => setTitleInput(e.target.value)}
              type="text"
              className="form-control"
              placeholder="הכנס שם מוצר"
            />
          </Col>
          <Col className="d-flex justify-content-center flex-row-reverse p-2 gap-2">
            <Button
              onClick={() =>
                editProduct({ title: titleInput }, setShowTitleCol)
              }
              className="m-1"
            >
              ערוך שם מוצר
            </Button>
          </Col>
        </Row>
        <Row className="card ">
          <Col
            className={
              showDescriptionCol
                ? "d-flex justify-content-center flex-row-reverse p-2 gap-2"
                : "hide_class"
            }
          >
            <p> תיאור מוצר: </p>

            <input
              onChange={(e) => setDescriptionInput(e.target.value)}
              type="text"
              className="form-control p-5"
              placeholder="הכנס תיאור מוצר"
            />
          </Col>
          <Col className="d-flex justify-content-center flex-row-reverse p-2 gap-2">
            <Button
              onClick={() =>
                editProduct(
                  { description: descriptionInput },
                  setShowDescriptionCol
                )
              }
              className="m-1"
            >
              ערוך תיאור מוצר
            </Button>
          </Col>
        </Row>
        <Row className="card ">
          <Col
            className={
              showPriceCol
                ? "d-flex justify-content-center flex-row-reverse p-2 gap-2"
                : "hide_class"
            }
          >
            <p> מחיר מוצר: </p>

            <input
              onChange={(e) => setPriceInput(e.target.value)}
              type="number"
              className="form-control"
              placeholder="הכנס מחיר מוצר"
            />
          </Col>
          <Col className="d-flex justify-content-center flex-row-reverse p-2 gap-2">
            <Button
              onClick={() =>
                editProduct({ price: priceInput }, setShowPriceCol)
              }
              className="m-1"
            >
              ערוך מחיר מוצר
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateProduct;
