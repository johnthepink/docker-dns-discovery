import dotenv from "dotenv";

dotenv.config({ silent: true });

export default process.env;

export const {
  TLD,
} = process.env;
