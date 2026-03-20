import { merge } from 'webpack-merge';
import path from 'node:path';
import common from './webpack.common.js';

export default merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: path.resolve(import.meta.dirname, 'dist'),
        hot: true,
        open: true,
        watchFiles: ['src/**/*'],
    },
});
