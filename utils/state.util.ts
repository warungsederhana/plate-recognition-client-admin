import { z, ZodObject } from "zod";

// Fungsi untuk menghasilkan state awal dari schema Zod
const generateInitialState = (schema: ZodObject<any>) => {
  const shape = schema.shape;
  const initialState: any = {};
  for (const key in shape) {
    if (shape[key] instanceof z.ZodBoolean) {
      initialState[key] = false;
    } else if (shape[key] instanceof z.ZodNumber) {
      initialState[key] = "";
    } else if (shape[key] instanceof z.ZodString) {
      initialState[key] = "";
    } else if (shape[key] instanceof z.ZodDate) {
      initialState[key] = "";
    } else {
      initialState[key] = "";
    }
  }
  return initialState;
};
