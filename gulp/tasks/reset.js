import del from "del";

import { path } from "../config/path.js";

export const reset = () => {
    return del(path.clean);
};
