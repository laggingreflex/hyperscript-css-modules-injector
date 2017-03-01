// const loaderUtils = require('loader-utils')

module.exports = source => {
  const styleMatch =
    source.match(/import style from ['"].*(?:css|sass|less|styl)['"]/)
    || source.match(/style = require(['"].*?:css|sass|less|styl)['"]/)

  if (!styleMatch) return source;

  return source.replace(/h\('([\w]+?)\.([\w-_]+)(.*?)',/g, "h(`$1.$2.${style['$2']}$3`,");
}
