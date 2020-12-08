const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");

const isProd = process.env.NODE_ENV === "production";

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
    require.extensions[".less"] = (file) => { };
}

// const nextConfig = withCSS({
//     cssModules: true,
//     cssLoaderOptions: {
//         importLoaders: 1,
//         localIdentName: "[local]___[hash:base64:5]",
//     },
//     ...withLess(
//         {
//             lessLoaderOptions: {
//                 javascriptEnabled: true,
//             },
//         }
//     ),
// });

const nextConfig = withCSS({
  cssModules: true,
  ...withSass(withLess({
    lessLoaderOptions: {
                javascriptEnabled: true,
            },
  }))
});

module.exports = {...nextConfig}