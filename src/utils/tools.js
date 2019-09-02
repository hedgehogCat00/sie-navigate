exports.install = function (Vue, options) {
    Vue.prototype.$getText = function (lang, data, prop) {
        // this should be called in Vue component's context
        if (lang === 'cn') {
            return data[`cn${prop}`]
        } else {
            return data[`en${prop}`]
        }
    }
    Vue.prototype.$imgUrlDeco = function (relatedUrl) {
        return `${process.env.VUE_APP_BASE_API}${relatedUrl}`
    }
}
