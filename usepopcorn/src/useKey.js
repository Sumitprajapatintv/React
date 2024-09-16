import { useEffect } from "react";
export function useKey(key, action) {
  useEffect(function () {

    function callback(e) {
      console.log('e.code', e.code);
      console.log('key', key);
      if (e.code === key) {
        action()
      }
    }
    document.addEventListener("keydown", callback)

    return () => document.addEventListener("keydown", callback)
    // console.log(inpEl.current);
    // inpEl.current.focus();
  }, [key, action]);
}