import { useState } from "react";

export let useDa = (index) => {
  const [st, setSt] = useState({ [index]: true });
  return { st, setSt };
};
