import create from "zustand"

type AutocompleteState = {
  inputValue: string
  setInputValue: (value: string) => void
}

const useAutocompleteStore = create<AutocompleteState>((set) => ({
  inputValue: "",
  setInputValue: (value) => set({ inputValue: value }),
}))

export default useAutocompleteStore
