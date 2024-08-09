"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import ItemCard from "../components/ItemCard";
import { InventoryItem } from "../InventoryItem";

const Inventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState<number>(0);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList: InventoryItem[] = [];
    docs.forEach((doc) => {
      inventoryList.push({
        id: doc.id,
        ...(doc.data() as Omit<InventoryItem, "id">),
      });
    });
    setInventory(inventoryList);
  };

  const createItem = async () => {
    const collectionRef = collection(firestore, "inventory");
    const docRef = await addDoc(collectionRef, {
      name: itemName,
      quantity: itemQuantity,
    });
    console.log("Document written with ID: ", docRef.id);
    setItemName("");
    setItemQuantity(0);
    handleClose();
    await updateInventory();
  };

  const addItem = async (item: InventoryItem) => {
    const docRef = doc(firestore, "inventory", item.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const quantity = (data as InventoryItem).quantity;
      await setDoc(docRef, { quantity: quantity + 1 }, { merge: true });
    } else {
      await setDoc(docRef, { name: item.name, quantity: 1 });
    }

    await updateInventory();
  };

  const removeItem = async (item: InventoryItem) => {
    const docRef = doc(firestore, "inventory", item.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const quantity = (data as InventoryItem).quantity;
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 }, { merge: true });
      }
    }

    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <NavBar />
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Container
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            height: "80vh",
            bgcolor: "background.default",
            py: 4,
            px: 2,
          }}
        >
          <Typography variant="h6" component="div" sx={{ mb: 2, fontSize: 32 }}>
            INVENTORY
          </Typography>
          <Box
            width="1000px"
            height="500px"
            overflow="auto"
            bgcolor="white"
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gap={2}
            sx={{
              gridAutoRows: "minmax(150px, auto)",
              alignItems: "start",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              scrollbarWidth: "none",
            }}
          >
            {inventory.map((inventoryItem) => (
              <ItemCard
                key={inventoryItem.id}
                inventoryItem={inventoryItem}
                onAdd={addItem}
                onRemove={removeItem}
              />
            ))}
          </Box>
          <Button
            variant="contained"
            sx={{ px: 2, mb: 2, fontSize: 20 }}
            onClick={handleOpen}
          >
            Add Item
          </Button>
        </Container>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              variant="outlined"
              type="number"
              label="Quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(parseInt(e.target.value))}
            />
            <Button variant="outlined" onClick={createItem}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default Inventory;
