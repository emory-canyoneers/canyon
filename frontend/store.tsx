import { ReactNode, createContext, useState } from "react";


// global store for selected skills state
type ISelectedContext = [string[], React.Dispatch<React.SetStateAction<string[]>>];

// default values
export const SelectedContext = createContext<ISelectedContext>([[], () => null]);

// provider
export function SelectedProvider(props: {children: ReactNode}) {
  const [selected, setSelected] = useState<string[]>([]);
  
  return (
    <SelectedContext.Provider value={[selected, setSelected]}>
      {props.children}
    </SelectedContext.Provider>
  )
}


// helper state functions

export function isSelected(selected: string[], skill: string): boolean {
  return selected.includes(skill);
}

function addSkill(setSelected: Function, skill: string) {
  setSelected((selected: string[]) => selected.concat(skill));
}

function removeSkill(setSelected: Function, remove: string) {
  setSelected((selected: string[]) => selected.filter(skill => skill !== remove));
}

export function toggleSkill(selected: string[], setSelected: Function, skill: string) {
  if (isSelected(selected, skill)) removeSkill(setSelected, skill);
  else addSkill(setSelected, skill);
}

// for open functionality, returns true if no skill filter or contains skills in filter 
export function hasSelected(selected: string[], skills: string[]): boolean {
  if (selected.length == 0) return true;
  return skills.some((skill) => selected.includes(skill));
}