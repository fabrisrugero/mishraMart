import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "../types";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        set((prevState) => {
          const currentItems = prevState.items;
          const existingItem = currentItems.find(
            (item) => item._id === data._id
          );

          if (existingItem) {
            return prevState; // No change in state
          }

          const updatedItems = [...currentItems, data];
          const newState = { ...prevState, items: updatedItems };

          // Update local storage immediately after modifying the items array
          localStorage.setItem("cart-items", JSON.stringify(updatedItems));

          toast.success("Item added to cart.");
          return newState;
        });
      },
      removeItem: (id: string) => {
        set((prevState) => {
          const updatedItems = prevState.items.filter(
            (item) => item._id !== id
          );
          const newState = { ...prevState, items: updatedItems };

          // Update local storage immediately after modifying the items array
          localStorage.setItem("cart-items", JSON.stringify(updatedItems));

          toast.success("Item removed from cart.");
          return newState;
        });
      },
      removeAll: () => {
        set((prevState) => {
          const newState = { ...prevState, items: [] };

          // Clear local storage
          localStorage.removeItem("cart-items");

          return newState;
        });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
