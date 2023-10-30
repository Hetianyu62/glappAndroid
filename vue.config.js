module.exports = {
    // 基本路径
    publicPath: './',
    productionSourceMap: false,
    css: {
        loaderOptions: {
            //设置less 样式
            less: {
                modifyVars: {
                    // 'text-color': '#42bd56',
                    // 'border-color': '#42bd56',
                    // 'active-color': '#42bd56',
                    // 'background-color': '#42bd56',
                    // 'background-color-light': '#42bd56'
                },
                javascriptEnabled: true
            }
        }
    },

}