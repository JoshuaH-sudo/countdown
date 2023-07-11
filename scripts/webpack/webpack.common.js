const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [/node_modules/, /__test__/, /__mocks__/, /.jest./],
      },
      {
        test: /\.css$/,
        use: [
          // The order of these loaders is important!
          // They will be applied in reverse order (i.e. from right to left)
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        //Ensure leaflet images are loaded bu adding them to the root level of the public folder
        test: /\.png$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "../../public"),
  },
  plugins: [
    //Will automatically attach the bundle to the index.html
    new HtmlWebpackPlugin({
      title: "Helsinki City Bike",
      publicPath: "/files",
      filename: "index.html",
      template: "./src/assets/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
}
