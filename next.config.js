const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
// const withOffline = require('next-offline')

const isProd = process.env.NODE_ENV === "production";

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
    require.extensions[".less"] = (file) => { };
}

const nextConfig = withCSS({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    },
    ...withLess(
        withSass({
            lessLoaderOptions: {
                javascriptEnabled: true,
            },
        })
    ),
});
// const nextConfigOffline  = {
//   target: 'serverless',
//   transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
//   // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
//   // turn on the SW in dev mode so that we can actually test it
//   generateInDevMode: true,
//   workboxOpts: {
//     swDest: 'static/service-worker.js',
//     runtimeCaching: [
//       {
//         urlPattern: /^https?.*/,
//         handler: 'NetworkFirst',
//         options: {
//           cacheName: 'https-calls',
//           networkTimeoutSeconds: 15,
//           expiration: {
//             maxEntries: 150,
//             maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
//           },
//           cacheableResponse: {
//             statuses: [0, 200],
//           },
//         },
//       },
//     ],
//   },
// };
// module.exports = withOffline({...nextConfig, ...nextConfigOffline})
module.exports = {...nextConfig}