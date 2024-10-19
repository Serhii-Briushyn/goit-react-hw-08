import { createAsyncThunk } from "@reduxjs/toolkit";
import { goItApi } from "../auth/operations";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await goItApi.get("/contacts");
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue(
        "Something went wrong! Please try again!"
      );
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const response = await goItApi.post("/contacts", newContact);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue(
        "Something went wrong! Please try again!"
      );
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      await goItApi.delete(`/contacts/${contactId}`);
      return contactId;
    } catch {
      return thunkAPI.rejectWithValue(
        "Something went wrong! Please try again!"
      );
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, updatedContact }, thunkAPI) => {
    try {
      const response = await goItApi.patch(`/contacts/${id}`, updatedContact);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue(
        "Something went wrong! Please try again!"
      );
    }
  }
);
