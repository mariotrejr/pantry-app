// context/InventoryContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";

const InventoryContext = createContext();

export const useInventory = () => {
  return useContext(InventoryContext);
};

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const inventoryCollection = collection(db, "inventory");
      const inventorySnapshot = await getDocs(inventoryCollection);
      const inventoryList = inventorySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventory(inventoryList);
    } catch (error) {
      console.error("Error fetching inventory: ", error);
    }
    setLoading(false);
  };

  const addItem = async (item) => {
    try {
      const inventoryCollection = collection(db, "inventory");
      const q = query(inventoryCollection, where("name", "==", item.name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const existingItem = querySnapshot.docs[0];
        const newQuantity = existingItem.data().quantity + item.quantity;
        await updateDoc(doc(db, "inventory", existingItem.id), { quantity: newQuantity });
        setInventory(prevInventory =>
          prevInventory.map(i =>
            i.id === existingItem.id ? { ...i, quantity: newQuantity } : i
          )
        );
      } else {
        const docRef = await addDoc(collection(db, "inventory"), item);
        setInventory(prevInventory => [...prevInventory, { id: docRef.id, ...item }]);
      }
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteDoc(doc(db, "inventory", id));
      setInventory(prevInventory => prevInventory.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error removing item: ", error);
    }
  };

  const updateItem = async (id, updatedItem) => {
    try {
      await updateDoc(doc(db, "inventory", id), updatedItem);
      setInventory(prevInventory =>
        prevInventory.map(item => (item.id === id ? { ...item, ...updatedItem } : item))
      );
    } catch (error) {
      console.error("Error updating item: ", error);
    }
  };

  return (
    <InventoryContext.Provider value={{ inventory, addItem, removeItem, updateItem, loading }}>
      {children}
    </InventoryContext.Provider>
  );
};
