module.exports = {
  paramSerializer(params) {
   if (!params) return '';
   let urlPart = [];
   for (let k in params) {
    let value = params[k];
    urlPart.push(k + '=' + value)
   }
   return urlPart.join('&')
  }
 }