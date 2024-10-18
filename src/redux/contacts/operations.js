import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
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
      const response = await axios.post("/contacts", newContact);
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
      await axios.delete(`/contacts/${contactId}`);
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
      const response = await axios.patch(`/contacts/${id}`, updatedContact);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue(
        "Something went wrong! Please try again!"
      );
    }
  }
);
