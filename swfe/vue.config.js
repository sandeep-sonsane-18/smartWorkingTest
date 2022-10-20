// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer : {
//     proxy: "http://localhost:8000/api/"
//   }
// })

module.exports = {
  devServer: {
    proxy: "http://localhost:8000/"
  }
}
