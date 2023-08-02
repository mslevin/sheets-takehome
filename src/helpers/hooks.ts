import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RefObject, useEffect } from "react";

import type { RootState, AppDispatch } from "../store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

// This hook allows components to fire a callback function when a click is detected outside of that component
// Cell components use this when in edit mode.
export function useDetectOutsideClick(ref: RefObject<HTMLElement>, callback: () => void) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            callback();
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        // Return a cleanup function to remove the event listener on unmount
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
}