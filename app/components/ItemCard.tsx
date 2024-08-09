import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { InventoryItem } from "../InventoryItem";

type Props = {
  inventoryItem: InventoryItem;
  onAdd: (item: InventoryItem) => void;
  onRemove: (item: InventoryItem) => void;
};

const ItemCard: React.FC<Props> = ({ inventoryItem, onAdd, onRemove }) => {
  return (
    <Box
      sx={{
        width: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "14px",
        margin: "8px",
        height: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6">{inventoryItem.name}</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Quantity: {inventoryItem.quantity}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => onAdd(inventoryItem)}
          sx={{ flex: 1, fontSize: "12px" }}
        >
          Add
        </Button>
        <Button
          variant="outlined"
          onClick={() => onRemove(inventoryItem)}
          sx={{ flex: 1, fontSize: "12px" }}
        >
          Minus
        </Button>
      </Box>
    </Box>
  );
};

export default ItemCard;
