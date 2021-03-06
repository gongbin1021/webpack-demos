function TestThreePlugin(options) {
    this.options = Object.assign({
        fileList: false
    },options);
}


    TestThreePlugin.prototype.apply = function (compiler) {
        const that = this;

        let fileList = ''; // 存储编译好的文件列表。只有在fileList 为true时才会起作用

        compiler.plugin('emit',function (compilation,callback) {
            compilation.chunks.forEach(function (chunk) {
               chunk.files.forEach(function (filename) {
                   let initSource = compilation.assets[filename].source();
                   let time = new Date();
                   let title = 'The comment was created by the  webxiaoma ' + time + '\n\n';

                   let total = `\/\/ ${title} ${initSource}`;

                // 以下功能会在我们打包后的文件开头加上一条备注。
                   compilation.assets[filename] = {
                       source() { // 写入文件时必写项
                           return total;
                       },
                       size() { // 写入文件时必写项
                           return total.length;
                       }
                   };

                   fileList += `- ${filename}文件 \n\n`;
               });
            });


            // 当配置fileList 为true时会生成编译文件清单 file-list.md
            if (that.options.fileList) {
                compilation.assets['file-list.md'] = {
                    source() {
                        return fileList;
                    },
                    size() {
                        return fileList.length;
                    }
                };
            }

            console.log(compilation.assets);
            callback();
        });
    };


module.exports = TestThreePlugin;
