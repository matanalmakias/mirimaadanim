import React from "react";
import { Button } from "react-bootstrap";
import cateringService from "../../services/catering.service";

const RemoveProductButton = ({ productId }) => {
  const removeProduct = async () => {
    cateringService.removeProduct(productId);
  };
  return (
    <Button variant="danger" onClick={() => removeProduct()}>
      מחיקת מוצר
    </Button>
  );
};

export default RemoveProductButton;
