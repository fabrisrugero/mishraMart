import { create } from "zustand";

interface FileDataState {
  items: any[];
  addFileItems: (data: any) => void;
  removeAllBears: () => void;
}

const useFileData = create<FileDataState>((set, get) => ({
  items: [],
  addFileItems: (data) => set({ items: [...get().items, data] }),
  removeAllBears: () => set({ items: [] }), // Updated this line to clear the items array
}));

export default useFileData;
