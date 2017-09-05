// @flow

import dotenv from "dotenv";

dotenv.config();

const TLD = process.env.TLD || "";

export {
  TLD,
};
