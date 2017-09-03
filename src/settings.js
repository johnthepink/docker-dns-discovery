// @flow

import dotenv from "dotenv";

dotenv.config({ silent: true });

const TLD = process.env.TLD || "";

export {
  TLD,
};
