const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const mode = env.production ? "production" : "development";

  return {
    mode: mode,
    entry: path.join(__dirname, "src/index.js"),
    output: {
      path: path.join(__dirname, "dist"),
      filename: "index.js",
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.join(__dirname, "src/index.html"),
        filename: "index.html",
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            context: path.join(__dirname, "src"),
            from: "./**/*.css",
            to: path.join(__dirname, "dist"),
          },
        ],
      }),
    ],
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      watchFiles: ["src/**/*"],
    },
  };
};
