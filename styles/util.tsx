import { css } from "@emotion/react";
import { mqMin, mqMax } from "./media-queries";

export const onlySp = css`
  ${mqMin("md")} {
    display: none;
  }
`;

export const onlyPc = css`
  ${mqMax("md")} {
    display: none;
  }
`;
