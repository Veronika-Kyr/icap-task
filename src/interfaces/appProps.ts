import { Dispatch, SetStateAction } from "react";

export interface IAppProps {
    nPages: number,
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>;
}
