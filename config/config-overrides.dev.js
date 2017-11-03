module.exports = function (config) {
    // Add the SASS loader second-to-last
    // (last one must remain as the 'file-loader')
    const loaderList = config.module.rules[1].oneOf;

    loaderList.splice(loaderList.length - 1, 0, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
    });

    config.module.rules[0].use[0].options.useEslintrc = true;
};
