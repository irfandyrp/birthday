import { BIRTHDAY_NAME } from "./config/birthday";

const config = {
  appId: "com.example.birthday",
  appName: `Birthday for ${BIRTHDAY_NAME}`,
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    androidScheme: "https",
  },
};

export default config;


