import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;
export const selectCurrentContact = (state) => state.contacts.currentContact;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.isError;
export const selectSortBy = (state) => state.contacts.sortBy;

export const selectSortedContacts = createSelector(
  [selectContacts, selectNameFilter, selectSortBy],
  (contacts, filter, sortBy) => {
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
    );

    return filteredContacts.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
  }
);
