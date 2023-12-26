import { config } from "dotenv";


const configDotEnv = () => {
  config({ path: "src/config/.env" });
  const mode = process.env.NODE_ENV; //dev|test|prod
  console.log("App is running in", mode, "Mode");
  console.log("Config file:", `src/config/${mode}.env`);

  //load the config file:
  config({ path: `src/config/${mode}.env` });
};

export { configDotEnv };


