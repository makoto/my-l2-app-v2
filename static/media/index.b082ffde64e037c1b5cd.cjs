var ipCodec=function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.decode=function(e,t,r){if(t=~~t,(r=r||e.length-t)===o.size)return o.decode(e,t,r);if(r===n.size)return n.decode(e,t,r);throw Error(`Invalid buffer size needs to be ${o.size} for v4 or ${n.size} for v6.`)},e.encode=function(e,t,r){r=~~r;const d=i(e);"function"===typeof t&&(t=t(r+d));if(d===o.size)return o.encode(e,t,r);return n.encode(e,t,r)},e.familyOf=function(e){return i(e)===o.size?1:2},e.name=void 0,e.sizeOf=i,e.v6=e.v4=void 0;const t=/^(\d{1,3}\.){3,3}\d{1,3}$/,r=/^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i,o={name:"v4",size:4,isFormat:e=>t.test(e),encode(e,t,r){r=~~r,t=t||new Uint8Array(r+4);const o=e.length;let n=0;for(let i=0;i<o;){const o=e.charCodeAt(i++);46===o?(t[r++]=n,n=0):n=10*n+(o-48)}return t[r]=n,t},decode:(e,t)=>(t=~~t,`${e[t++]}.${e[t++]}.${e[t++]}.${e[t]}`)};e.v4=o;const n={name:"v6",size:16,isFormat:e=>e.length>0&&r.test(e),encode(e,t,r){let o=(r=~~r)+16,n=-1,i=0,d=0,f=!0,c=!1;t=t||new Uint8Array(r+16);for(let s=0;s<e.length;s++){let u=e.charCodeAt(s);58===u?(f?-1!==n?(r<o&&(t[r]=0),r<o-1&&(t[r+1]=0),r+=2):r<o&&(n=r):(!0===c?(r<o&&(t[r]=d),r++):(r<o&&(t[r]=i>>8),r<o-1&&(t[r+1]=255&i),r+=2),i=0,d=0),f=!0,c=!1):46===u?(r<o&&(t[r]=d),r++,d=0,i=0,f=!1,c=!0):(f=!1,u>=97?u-=87:u>=65?u-=55:(u-=48,d=10*d+u),i=(i<<4)+u)}if(!1===f)!0===c?(r<o&&(t[r]=d),r++):(r<o&&(t[r]=i>>8),r<o-1&&(t[r+1]=255&i),r+=2);else if(0===n)r<o&&(t[r]=0),r<o-1&&(t[r+1]=0),r+=2;else if(-1!==n){r+=2;for(let e=Math.min(r-1,o-1);e>=n+2;e--)t[e]=t[e-2];t[n]=0,t[n+1]=0,n=r}if(n!==r&&-1!==n)for(r>o-2&&(r=o-2);o>n;)t[--o]=r<o&&r>n?t[--r]:0;else for(;r<o;)t[r++]=0;return t},decode(e,t){t=~~t;let r="";for(let o=0;o<16;o+=2)0!==o&&(r+=":"),r+=(e[t+o]<<8|e[t+o+1]).toString(16);return r.replace(/(^|:)0(:0)*:0(:|$)/,"$1::$3").replace(/:{3,4}/,"::")}};e.v6=n;function i(e){if(o.isFormat(e))return o.size;if(n.isFormat(e))return n.size;throw Error(`Invalid ip address: ${e}`)}return e.name="ip","default"in e?e.default:e}({});"function"===typeof define&&define.amd?define([],(function(){return ipCodec})):"object"===typeof module&&"object"===typeof exports&&(module.exports=ipCodec);