/**
 * Used to setup TypeScript support in cypress
 */
const wp = require("@cypress/webpack-preprocessor");
module.exports = (on) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: [".ts", ".tsx", ".js"],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
          {
            test: /\.feature$/,
            use: [
              {
                loader: "cypress-cucumber-preprocessor/loader",
              },
            ],
          },
          {
            test: /\.features$/,
            use: [
              {
                loader: "cypress-cucumber-preprocessor/lib/featuresLoader",
              },
            ],
          },
        ],
      },
    },
  };
  on("file:preprocessor", wp(options));
};



