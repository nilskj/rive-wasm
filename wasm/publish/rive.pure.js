
var Rive = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(Rive) {
  Rive = Rive || {};

null;

var Module = typeof Rive !== "undefined" ? Rive : {};

var readyPromiseResolve, readyPromiseReject;

Module["ready"] = new Promise(function(resolve, reject) {
 readyPromiseResolve = resolve;
 readyPromiseReject = reject;
});

var moduleOverrides = {};

var key;

for (key in Module) {
 if (Module.hasOwnProperty(key)) {
  moduleOverrides[key] = Module[key];
 }
}

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = function(status, toThrow) {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = false;

var ENVIRONMENT_IS_WORKER = false;

var ENVIRONMENT_IS_NODE = false;

var ENVIRONMENT_IS_SHELL = false;

ENVIRONMENT_IS_WEB = typeof window === "object";

ENVIRONMENT_IS_WORKER = typeof importScripts === "function";

ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";

ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary, setWindowTitle;

var nodeFS;

var nodePath;

if (ENVIRONMENT_IS_NODE) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = require("path").dirname(scriptDirectory) + "/";
 } else {
  scriptDirectory = __dirname + "/";
 }
 read_ = function shell_read(filename, binary) {
  var ret = tryParseAsDataURI(filename);
  if (ret) {
   return binary ? ret : ret.toString();
  }
  if (!nodeFS) nodeFS = require("fs");
  if (!nodePath) nodePath = require("path");
  filename = nodePath["normalize"](filename);
  return nodeFS["readFileSync"](filename, binary ? null : "utf8");
 };
 readBinary = function readBinary(filename) {
  var ret = read_(filename, true);
  if (!ret.buffer) {
   ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
 };
 if (process["argv"].length > 1) {
  thisProgram = process["argv"][1].replace(/\\/g, "/");
 }
 arguments_ = process["argv"].slice(2);
 process["on"]("uncaughtException", function(ex) {
  if (!(ex instanceof ExitStatus)) {
   throw ex;
  }
 });
 process["on"]("unhandledRejection", abort);
 quit_ = function(status) {
  process["exit"](status);
 };
 Module["inspect"] = function() {
  return "[Emscripten Module object]";
 };
} else if (ENVIRONMENT_IS_SHELL) {
 if (typeof read != "undefined") {
  read_ = function shell_read(f) {
   var data = tryParseAsDataURI(f);
   if (data) {
    return intArrayToString(data);
   }
   return read(f);
  };
 }
 readBinary = function readBinary(f) {
  var data;
  data = tryParseAsDataURI(f);
  if (data) {
   return data;
  }
  if (typeof readbuffer === "function") {
   return new Uint8Array(readbuffer(f));
  }
  data = read(f, "binary");
  assert(typeof data === "object");
  return data;
 };
 if (typeof scriptArgs != "undefined") {
  arguments_ = scriptArgs;
 } else if (typeof arguments != "undefined") {
  arguments_ = arguments;
 }
 if (typeof quit === "function") {
  quit_ = function(status) {
   quit(status);
  };
 }
 if (typeof print !== "undefined") {
  if (typeof console === "undefined") console = {};
  console.log = print;
  console.warn = console.error = typeof printErr !== "undefined" ? printErr : print;
 }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (_scriptDir) {
  scriptDirectory = _scriptDir;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 {
  read_ = function shell_read(url) {
   try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
   } catch (err) {
    var data = tryParseAsDataURI(url);
    if (data) {
     return intArrayToString(data);
    }
    throw err;
   }
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = function readBinary(url) {
    try {
     var xhr = new XMLHttpRequest();
     xhr.open("GET", url, false);
     xhr.responseType = "arraybuffer";
     xhr.send(null);
     return new Uint8Array(xhr.response);
    } catch (err) {
     var data = tryParseAsDataURI(url);
     if (data) {
      return data;
     }
     throw err;
    }
   };
  }
  readAsync = function readAsync(url, onload, onerror) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = function xhr_onload() {
    if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
     onload(xhr.response);
     return;
    }
    var data = tryParseAsDataURI(url);
    if (data) {
     onload(data.buffer);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
 setWindowTitle = function(title) {
  document.title = title;
 };
} else {}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.warn.bind(console);

for (key in moduleOverrides) {
 if (moduleOverrides.hasOwnProperty(key)) {
  Module[key] = moduleOverrides[key];
 }
}

moduleOverrides = null;

if (Module["arguments"]) arguments_ = Module["arguments"];

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

if (Module["quit"]) quit_ = Module["quit"];

var tempRet0 = 0;

var setTempRet0 = function(value) {
 tempRet0 = value;
};

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

var noExitRuntime;

if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];

var WebAssembly = {
 Memory: function(opts) {
  this.buffer = new ArrayBuffer(opts["initial"] * 65536);
  this.grow = function(amount) {
   var ret = __growWasmMemory(amount);
   return ret;
  };
 },
 Table: function(opts) {
  var ret = new Array(opts["initial"]);
  ret.grow = function(by) {
   if (ret.length >= 1003 + 0) {
    abort("Unable to grow wasm table. Use a higher value for RESERVED_FUNCTION_POINTERS or set ALLOW_TABLE_GROWTH.");
   }
   ret.push(null);
  };
  ret.set = function(i, func) {
   ret[i] = func;
  };
  ret.get = function(i) {
   return ret[i];
  };
  return ret;
 },
 Module: function(binary) {},
 Instance: function(module, info) {
  this.exports = (
// EMSCRIPTEN_START_ASM
function a(asmLibraryArg, wasmMemory, wasmTable) {
 var scratchBuffer = new ArrayBuffer(16);
 var b = new Int32Array(scratchBuffer);
 var c = new Float32Array(scratchBuffer);
 var d = new Float64Array(scratchBuffer);
 function e(index) {
  return b[index];
 }
 function f(index, value) {
  b[index] = value;
 }
 function g() {
  return d[0];
 }
 function h(value) {
  d[0] = value;
 }
 function i(value) {
  c[2] = value;
 }
 function j() {
  return c[2];
 }
 function k(global, env, buffer) {
  var l = env.memory;
  var m = wasmTable;
  var n = new global.Int8Array(buffer);
  var o = new global.Int16Array(buffer);
  var p = new global.Int32Array(buffer);
  var q = new global.Uint8Array(buffer);
  var r = new global.Uint16Array(buffer);
  var s = new global.Uint32Array(buffer);
  var t = new global.Float32Array(buffer);
  var u = new global.Float64Array(buffer);
  var v = global.Math.imul;
  var w = global.Math.fround;
  var x = global.Math.abs;
  var y = global.Math.clz32;
  var z = global.Math.min;
  var A = global.Math.max;
  var B = global.Math.floor;
  var C = global.Math.ceil;
  var D = global.Math.sqrt;
  var E = env.abort;
  var F = global.NaN;
  var G = global.Infinity;
  var H = env.a;
  var I = env.b;
  var J = env.c;
  var K = env.d;
  var L = env.e;
  var M = env.f;
  var N = env.g;
  var O = env.h;
  var P = env.i;
  var Q = env.j;
  var R = env.k;
  var S = env.l;
  var T = env.m;
  var U = env.n;
  var V = env.o;
  var W = env.p;
  var X = env.q;
  var Y = env.r;
  var Z = env.s;
  var _ = env.t;
  var $ = env.u;
  var aa = env.v;
  var ba = env.w;
  var ca = env.x;
  var da = env.y;
  var ea = env.z;
  var fa = env.A;
  var ga = env.B;
  var ha = env.C;
  var ia = env.D;
  var ja = env.E;
  var ka = env.F;
  var la = env.G;
  var ma = env.H;
  var na = env.I;
  var oa = env.J;
  var pa = env.K;
  var qa = env.L;
  var ra = env.M;
  var sa = 5266272;
  var ta = 0;
  
// EMSCRIPTEN_START_FUNCS
function de(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0;
 m = sa - 16 | 0;
 sa = m;
 a : {
  b : {
   c : {
    d : {
     e : {
      f : {
       g : {
        h : {
         i : {
          j : {
           k : {
            l : {
             if (a >>> 0 <= 244) {
              e = p[5684];
              g = a >>> 0 < 11 ? 16 : a + 11 & -8;
              a = g >>> 3 | 0;
              b = e >>> a | 0;
              if (b & 3) {
               c = a + ((b ^ -1) & 1) | 0;
               f = c << 3;
               b = p[f + 22784 >> 2];
               a = b + 8 | 0;
               d = p[b + 8 >> 2];
               f = f + 22776 | 0;
               m : {
                if ((d | 0) == (f | 0)) {
                 n = 22736, o = Zy(c) & e, p[n >> 2] = o;
                 break m;
                }
                p[d + 12 >> 2] = f;
                p[f + 8 >> 2] = d;
               }
               c = c << 3;
               p[b + 4 >> 2] = c | 3;
               b = b + c | 0;
               p[b + 4 >> 2] = p[b + 4 >> 2] | 1;
               break a;
              }
              i = p[5686];
              if (g >>> 0 <= i >>> 0) {
               break l;
              }
              if (b) {
               c = 2 << a;
               a = (0 - c | c) & b << a;
               a = (0 - a & a) + -1 | 0;
               b = a >>> 12 & 16;
               c = b;
               a = a >>> b | 0;
               b = a >>> 5 & 8;
               c = c | b;
               a = a >>> b | 0;
               b = a >>> 2 & 4;
               c = c | b;
               a = a >>> b | 0;
               b = a >>> 1 & 2;
               c = c | b;
               a = a >>> b | 0;
               b = a >>> 1 & 1;
               c = (c | b) + (a >>> b | 0) | 0;
               d = c << 3;
               b = p[d + 22784 >> 2];
               a = p[b + 8 >> 2];
               d = d + 22776 | 0;
               n : {
                if ((a | 0) == (d | 0)) {
                 e = Zy(c) & e;
                 p[5684] = e;
                 break n;
                }
                p[a + 12 >> 2] = d;
                p[d + 8 >> 2] = a;
               }
               a = b + 8 | 0;
               p[b + 4 >> 2] = g | 3;
               h = b + g | 0;
               c = c << 3;
               f = c - g | 0;
               p[h + 4 >> 2] = f | 1;
               p[b + c >> 2] = f;
               if (i) {
                c = i >>> 3 | 0;
                b = (c << 3) + 22776 | 0;
                d = p[5689];
                c = 1 << c;
                o : {
                 if (!(c & e)) {
                  p[5684] = c | e;
                  c = b;
                  break o;
                 }
                 c = p[b + 8 >> 2];
                }
                p[b + 8 >> 2] = d;
                p[c + 12 >> 2] = d;
                p[d + 12 >> 2] = b;
                p[d + 8 >> 2] = c;
               }
               p[5689] = h;
               p[5686] = f;
               break a;
              }
              k = p[5685];
              if (!k) {
               break l;
              }
              a = (k & 0 - k) + -1 | 0;
              b = a >>> 12 & 16;
              c = b;
              a = a >>> b | 0;
              b = a >>> 5 & 8;
              c = c | b;
              a = a >>> b | 0;
              b = a >>> 2 & 4;
              c = c | b;
              a = a >>> b | 0;
              b = a >>> 1 & 2;
              c = c | b;
              a = a >>> b | 0;
              b = a >>> 1 & 1;
              b = p[((c | b) + (a >>> b | 0) << 2) + 23040 >> 2];
              d = (p[b + 4 >> 2] & -8) - g | 0;
              c = b;
              while (1) {
               p : {
                a = p[c + 16 >> 2];
                if (!a) {
                 a = p[c + 20 >> 2];
                 if (!a) {
                  break p;
                 }
                }
                f = (p[a + 4 >> 2] & -8) - g | 0;
                c = f >>> 0 < d >>> 0;
                d = c ? f : d;
                b = c ? a : b;
                c = a;
                continue;
               }
               break;
              }
              l = b + g | 0;
              if (l >>> 0 <= b >>> 0) {
               break k;
              }
              j = p[b + 24 >> 2];
              f = p[b + 12 >> 2];
              if ((f | 0) != (b | 0)) {
               a = p[b + 8 >> 2];
               p[a + 12 >> 2] = f;
               p[f + 8 >> 2] = a;
               break b;
              }
              c = b + 20 | 0;
              a = p[c >> 2];
              if (!a) {
               a = p[b + 16 >> 2];
               if (!a) {
                break j;
               }
               c = b + 16 | 0;
              }
              while (1) {
               h = c;
               f = a;
               c = a + 20 | 0;
               a = p[c >> 2];
               if (a) {
                continue;
               }
               c = f + 16 | 0;
               a = p[f + 16 >> 2];
               if (a) {
                continue;
               }
               break;
              }
              p[h >> 2] = 0;
              break b;
             }
             g = -1;
             if (a >>> 0 > 4294967231) {
              break l;
             }
             b = a + 11 | 0;
             g = b & -8;
             i = p[5685];
             if (!i) {
              break l;
             }
             c = 0 - g | 0;
             b = b >>> 8 | 0;
             e = 0;
             q : {
              if (!b) {
               break q;
              }
              e = 31;
              if (g >>> 0 > 16777215) {
               break q;
              }
              d = b + 1048320 >>> 16 & 8;
              b = b << d;
              a = b + 520192 >>> 16 & 4;
              e = b << a;
              b = e + 245760 >>> 16 & 2;
              a = (e << b >>> 15 | 0) - (b | (a | d)) | 0;
              e = (a << 1 | g >>> a + 21 & 1) + 28 | 0;
             }
             d = p[(e << 2) + 23040 >> 2];
             r : {
              s : {
               t : {
                if (!d) {
                 a = 0;
                 break t;
                }
                b = g << ((e | 0) == 31 ? 0 : 25 - (e >>> 1 | 0) | 0);
                a = 0;
                while (1) {
                 u : {
                  h = (p[d + 4 >> 2] & -8) - g | 0;
                  if (h >>> 0 >= c >>> 0) {
                   break u;
                  }
                  f = d;
                  c = h;
                  if (c) {
                   break u;
                  }
                  c = 0;
                  a = d;
                  break s;
                 }
                 h = p[d + 20 >> 2];
                 d = p[((b >>> 29 & 4) + d | 0) + 16 >> 2];
                 a = h ? (h | 0) == (d | 0) ? a : h : a;
                 b = b << ((d | 0) != 0);
                 if (d) {
                  continue;
                 }
                 break;
                }
               }
               if (!(a | f)) {
                a = 2 << e;
                a = (0 - a | a) & i;
                if (!a) {
                 break l;
                }
                a = (a & 0 - a) + -1 | 0;
                b = a >>> 12 & 16;
                d = b;
                a = a >>> b | 0;
                b = a >>> 5 & 8;
                d = d | b;
                a = a >>> b | 0;
                b = a >>> 2 & 4;
                d = d | b;
                a = a >>> b | 0;
                b = a >>> 1 & 2;
                d = d | b;
                a = a >>> b | 0;
                b = a >>> 1 & 1;
                a = p[((d | b) + (a >>> b | 0) << 2) + 23040 >> 2];
               }
               if (!a) {
                break r;
               }
              }
              while (1) {
               d = (p[a + 4 >> 2] & -8) - g | 0;
               b = d >>> 0 < c >>> 0;
               c = b ? d : c;
               f = b ? a : f;
               b = p[a + 16 >> 2];
               if (b) {
                a = b;
               } else {
                a = p[a + 20 >> 2];
               }
               if (a) {
                continue;
               }
               break;
              }
             }
             if (!f | c >>> 0 >= p[5686] - g >>> 0) {
              break l;
             }
             e = f + g | 0;
             if (e >>> 0 <= f >>> 0) {
              break k;
             }
             j = p[f + 24 >> 2];
             b = p[f + 12 >> 2];
             if ((f | 0) != (b | 0)) {
              a = p[f + 8 >> 2];
              p[a + 12 >> 2] = b;
              p[b + 8 >> 2] = a;
              break c;
             }
             d = f + 20 | 0;
             a = p[d >> 2];
             if (!a) {
              a = p[f + 16 >> 2];
              if (!a) {
               break i;
              }
              d = f + 16 | 0;
             }
             while (1) {
              h = d;
              b = a;
              d = a + 20 | 0;
              a = p[d >> 2];
              if (a) {
               continue;
              }
              d = b + 16 | 0;
              a = p[b + 16 >> 2];
              if (a) {
               continue;
              }
              break;
             }
             p[h >> 2] = 0;
             break c;
            }
            b = p[5686];
            if (b >>> 0 >= g >>> 0) {
             a = p[5689];
             c = b - g | 0;
             v : {
              if (c >>> 0 >= 16) {
               p[5686] = c;
               d = a + g | 0;
               p[5689] = d;
               p[d + 4 >> 2] = c | 1;
               p[a + b >> 2] = c;
               p[a + 4 >> 2] = g | 3;
               break v;
              }
              p[5689] = 0;
              p[5686] = 0;
              p[a + 4 >> 2] = b | 3;
              b = a + b | 0;
              p[b + 4 >> 2] = p[b + 4 >> 2] | 1;
             }
             a = a + 8 | 0;
             break a;
            }
            d = p[5687];
            if (d >>> 0 > g >>> 0) {
             b = d - g | 0;
             p[5687] = b;
             a = p[5690];
             c = a + g | 0;
             p[5690] = c;
             p[c + 4 >> 2] = b | 1;
             p[a + 4 >> 2] = g | 3;
             a = a + 8 | 0;
             break a;
            }
            a = 0;
            f = g + 47 | 0;
            c = f;
            if (p[5802]) {
             b = p[5804];
            } else {
             p[5805] = -1;
             p[5806] = -1;
             p[5803] = 4096;
             p[5804] = 4096;
             p[5802] = m + 12 & -16 ^ 1431655768;
             p[5807] = 0;
             p[5795] = 0;
             b = 4096;
            }
            e = c + b | 0;
            h = 0 - b | 0;
            c = e & h;
            if (c >>> 0 <= g >>> 0) {
             break a;
            }
            b = p[5794];
            if (b) {
             i = p[5792];
             j = i + c | 0;
             if (j >>> 0 <= i >>> 0 | j >>> 0 > b >>> 0) {
              break a;
             }
            }
            if (q[23180] & 4) {
             break f;
            }
            w : {
             x : {
              b = p[5690];
              if (b) {
               a = 23184;
               while (1) {
                i = p[a >> 2];
                if (i + p[a + 4 >> 2] >>> 0 > b >>> 0 ? i >>> 0 <= b >>> 0 : 0) {
                 break x;
                }
                a = p[a + 8 >> 2];
                if (a) {
                 continue;
                }
                break;
               }
              }
              b = yc(0);
              if ((b | 0) == -1) {
               break g;
              }
              e = c;
              a = p[5803];
              d = a + -1 | 0;
              if (d & b) {
               e = (c - b | 0) + (b + d & 0 - a) | 0;
              }
              if (e >>> 0 <= g >>> 0 | e >>> 0 > 2147483646) {
               break g;
              }
              a = p[5794];
              if (a) {
               d = p[5792];
               h = d + e | 0;
               if (h >>> 0 <= d >>> 0 | h >>> 0 > a >>> 0) {
                break g;
               }
              }
              a = yc(e);
              if ((b | 0) != (a | 0)) {
               break w;
              }
              break e;
             }
             e = h & e - d;
             if (e >>> 0 > 2147483646) {
              break g;
             }
             b = yc(e);
             if ((b | 0) == (p[a >> 2] + p[a + 4 >> 2] | 0)) {
              break h;
             }
             a = b;
            }
            if (!((a | 0) == -1 | g + 48 >>> 0 <= e >>> 0)) {
             b = p[5804];
             b = b + (f - e | 0) & 0 - b;
             if (b >>> 0 > 2147483646) {
              b = a;
              break e;
             }
             if ((yc(b) | 0) != -1) {
              e = b + e | 0;
              b = a;
              break e;
             }
             yc(0 - e | 0);
             break g;
            }
            b = a;
            if ((a | 0) != -1) {
             break e;
            }
            break g;
           }
           E();
          }
          f = 0;
          break b;
         }
         b = 0;
         break c;
        }
        if ((b | 0) != -1) {
         break e;
        }
       }
       p[5795] = p[5795] | 4;
      }
      if (c >>> 0 > 2147483646) {
       break d;
      }
      b = yc(c);
      a = yc(0);
      if (b >>> 0 >= a >>> 0 | (b | 0) == -1 | (a | 0) == -1) {
       break d;
      }
      e = a - b | 0;
      if (e >>> 0 <= g + 40 >>> 0) {
       break d;
      }
     }
     a = p[5792] + e | 0;
     p[5792] = a;
     if (a >>> 0 > s[5793]) {
      p[5793] = a;
     }
     y : {
      z : {
       A : {
        c = p[5690];
        if (c) {
         a = 23184;
         while (1) {
          d = p[a >> 2];
          f = p[a + 4 >> 2];
          if ((d + f | 0) == (b | 0)) {
           break A;
          }
          a = p[a + 8 >> 2];
          if (a) {
           continue;
          }
          break;
         }
         break z;
        }
        a = p[5688];
        if (!(b >>> 0 >= a >>> 0 ? a : 0)) {
         p[5688] = b;
        }
        a = 0;
        p[5797] = e;
        p[5796] = b;
        p[5692] = -1;
        p[5693] = p[5802];
        p[5799] = 0;
        while (1) {
         c = a << 3;
         d = c + 22776 | 0;
         p[c + 22784 >> 2] = d;
         p[c + 22788 >> 2] = d;
         a = a + 1 | 0;
         if ((a | 0) != 32) {
          continue;
         }
         break;
        }
        a = e + -40 | 0;
        c = b + 8 & 7 ? -8 - b & 7 : 0;
        d = a - c | 0;
        p[5687] = d;
        c = b + c | 0;
        p[5690] = c;
        p[c + 4 >> 2] = d | 1;
        p[(a + b | 0) + 4 >> 2] = 40;
        p[5691] = p[5806];
        break y;
       }
       if (q[a + 12 | 0] & 8 | b >>> 0 <= c >>> 0 | d >>> 0 > c >>> 0) {
        break z;
       }
       p[a + 4 >> 2] = e + f;
       a = c + 8 & 7 ? -8 - c & 7 : 0;
       b = a + c | 0;
       p[5690] = b;
       d = p[5687] + e | 0;
       a = d - a | 0;
       p[5687] = a;
       p[b + 4 >> 2] = a | 1;
       p[(c + d | 0) + 4 >> 2] = 40;
       p[5691] = p[5806];
       break y;
      }
      f = p[5688];
      if (b >>> 0 < f >>> 0) {
       p[5688] = b;
       f = 0;
      }
      d = b + e | 0;
      a = 23184;
      B : {
       C : {
        D : {
         E : {
          F : {
           G : {
            while (1) {
             if ((d | 0) != p[a >> 2]) {
              a = p[a + 8 >> 2];
              if (a) {
               continue;
              }
              break G;
             }
             break;
            }
            if (!(q[a + 12 | 0] & 8)) {
             break F;
            }
           }
           a = 23184;
           while (1) {
            d = p[a >> 2];
            if (d >>> 0 <= c >>> 0) {
             f = d + p[a + 4 >> 2] | 0;
             if (f >>> 0 > c >>> 0) {
              break E;
             }
            }
            a = p[a + 8 >> 2];
            continue;
           }
          }
          p[a >> 2] = b;
          p[a + 4 >> 2] = p[a + 4 >> 2] + e;
          j = (b + 8 & 7 ? -8 - b & 7 : 0) + b | 0;
          p[j + 4 >> 2] = g | 3;
          b = d + (d + 8 & 7 ? -8 - d & 7 : 0) | 0;
          a = (b - j | 0) - g | 0;
          h = g + j | 0;
          if ((b | 0) == (c | 0)) {
           p[5690] = h;
           a = p[5687] + a | 0;
           p[5687] = a;
           p[h + 4 >> 2] = a | 1;
           break C;
          }
          if (p[5689] == (b | 0)) {
           p[5689] = h;
           a = p[5686] + a | 0;
           p[5686] = a;
           p[h + 4 >> 2] = a | 1;
           p[a + h >> 2] = a;
           break C;
          }
          c = p[b + 4 >> 2];
          if ((c & 3) == 1) {
           k = c & -8;
           H : {
            if (c >>> 0 <= 255) {
             f = c >>> 3 | 0;
             c = p[b + 8 >> 2];
             d = p[b + 12 >> 2];
             if ((d | 0) == (c | 0)) {
              n = 22736, o = p[5684] & Zy(f), p[n >> 2] = o;
              break H;
             }
             p[c + 12 >> 2] = d;
             p[d + 8 >> 2] = c;
             break H;
            }
            i = p[b + 24 >> 2];
            e = p[b + 12 >> 2];
            I : {
             if ((e | 0) != (b | 0)) {
              c = p[b + 8 >> 2];
              p[c + 12 >> 2] = e;
              p[e + 8 >> 2] = c;
              break I;
             }
             J : {
              d = b + 20 | 0;
              g = p[d >> 2];
              if (g) {
               break J;
              }
              d = b + 16 | 0;
              g = p[d >> 2];
              if (g) {
               break J;
              }
              e = 0;
              break I;
             }
             while (1) {
              c = d;
              e = g;
              d = e + 20 | 0;
              g = p[d >> 2];
              if (g) {
               continue;
              }
              d = e + 16 | 0;
              g = p[e + 16 >> 2];
              if (g) {
               continue;
              }
              break;
             }
             p[c >> 2] = 0;
            }
            if (!i) {
             break H;
            }
            c = p[b + 28 >> 2];
            d = (c << 2) + 23040 | 0;
            K : {
             if (p[d >> 2] == (b | 0)) {
              p[d >> 2] = e;
              if (e) {
               break K;
              }
              n = 22740, o = p[5685] & Zy(c), p[n >> 2] = o;
              break H;
             }
             p[i + (p[i + 16 >> 2] == (b | 0) ? 16 : 20) >> 2] = e;
             if (!e) {
              break H;
             }
            }
            p[e + 24 >> 2] = i;
            c = p[b + 16 >> 2];
            if (c) {
             p[e + 16 >> 2] = c;
             p[c + 24 >> 2] = e;
            }
            c = p[b + 20 >> 2];
            if (!c) {
             break H;
            }
            p[e + 20 >> 2] = c;
            p[c + 24 >> 2] = e;
           }
           b = b + k | 0;
           a = a + k | 0;
          }
          p[b + 4 >> 2] = p[b + 4 >> 2] & -2;
          p[h + 4 >> 2] = a | 1;
          p[a + h >> 2] = a;
          if (a >>> 0 <= 255) {
           b = a >>> 3 | 0;
           a = (b << 3) + 22776 | 0;
           c = p[5684];
           b = 1 << b;
           L : {
            if (!(c & b)) {
             p[5684] = b | c;
             b = a;
             break L;
            }
            b = p[a + 8 >> 2];
           }
           p[a + 8 >> 2] = h;
           p[b + 12 >> 2] = h;
           p[h + 12 >> 2] = a;
           p[h + 8 >> 2] = b;
           break C;
          }
          c = h;
          d = a >>> 8 | 0;
          b = 0;
          M : {
           if (!d) {
            break M;
           }
           b = 31;
           if (a >>> 0 > 16777215) {
            break M;
           }
           f = d + 1048320 >>> 16 & 8;
           d = d << f;
           b = d + 520192 >>> 16 & 4;
           g = d << b;
           d = g + 245760 >>> 16 & 2;
           b = (g << d >>> 15 | 0) - (d | (b | f)) | 0;
           b = (b << 1 | a >>> b + 21 & 1) + 28 | 0;
          }
          p[c + 28 >> 2] = b;
          p[h + 16 >> 2] = 0;
          p[h + 20 >> 2] = 0;
          c = (b << 2) + 23040 | 0;
          d = p[5685];
          f = 1 << b;
          N : {
           if (!(d & f)) {
            p[5685] = d | f;
            p[c >> 2] = h;
            break N;
           }
           d = a << ((b | 0) == 31 ? 0 : 25 - (b >>> 1 | 0) | 0);
           b = p[c >> 2];
           while (1) {
            c = b;
            if ((p[b + 4 >> 2] & -8) == (a | 0)) {
             break D;
            }
            b = d >>> 29 | 0;
            d = d << 1;
            f = (b & 4) + c | 0;
            b = p[f + 16 >> 2];
            if (b) {
             continue;
            }
            break;
           }
           p[f + 16 >> 2] = h;
          }
          p[h + 24 >> 2] = c;
          p[h + 12 >> 2] = h;
          p[h + 8 >> 2] = h;
          break C;
         }
         a = e + -40 | 0;
         d = b + 8 & 7 ? -8 - b & 7 : 0;
         h = a - d | 0;
         p[5687] = h;
         d = b + d | 0;
         p[5690] = d;
         p[d + 4 >> 2] = h | 1;
         p[(a + b | 0) + 4 >> 2] = 40;
         p[5691] = p[5806];
         a = (f + (f + -39 & 7 ? 39 - f & 7 : 0) | 0) + -47 | 0;
         d = a >>> 0 < c + 16 >>> 0 ? c : a;
         p[d + 4 >> 2] = 27;
         a = p[5799];
         p[d + 16 >> 2] = p[5798];
         p[d + 20 >> 2] = a;
         a = p[5797];
         p[d + 8 >> 2] = p[5796];
         p[d + 12 >> 2] = a;
         p[5798] = d + 8;
         p[5797] = e;
         p[5796] = b;
         p[5799] = 0;
         a = d + 24 | 0;
         while (1) {
          p[a + 4 >> 2] = 7;
          b = a + 8 | 0;
          a = a + 4 | 0;
          if (f >>> 0 > b >>> 0) {
           continue;
          }
          break;
         }
         if ((c | 0) == (d | 0)) {
          break y;
         }
         p[d + 4 >> 2] = p[d + 4 >> 2] & -2;
         f = d - c | 0;
         p[c + 4 >> 2] = f | 1;
         p[d >> 2] = f;
         if (f >>> 0 <= 255) {
          b = f >>> 3 | 0;
          a = (b << 3) + 22776 | 0;
          d = p[5684];
          b = 1 << b;
          O : {
           if (!(d & b)) {
            p[5684] = b | d;
            b = a;
            break O;
           }
           b = p[a + 8 >> 2];
          }
          p[a + 8 >> 2] = c;
          p[b + 12 >> 2] = c;
          p[c + 12 >> 2] = a;
          p[c + 8 >> 2] = b;
          break y;
         }
         p[c + 16 >> 2] = 0;
         p[c + 20 >> 2] = 0;
         b = c;
         d = f >>> 8 | 0;
         a = 0;
         P : {
          if (!d) {
           break P;
          }
          a = 31;
          if (f >>> 0 > 16777215) {
           break P;
          }
          e = d + 1048320 >>> 16 & 8;
          d = d << e;
          a = d + 520192 >>> 16 & 4;
          h = d << a;
          d = h + 245760 >>> 16 & 2;
          a = (h << d >>> 15 | 0) - (d | (a | e)) | 0;
          a = (a << 1 | f >>> a + 21 & 1) + 28 | 0;
         }
         p[b + 28 >> 2] = a;
         b = (a << 2) + 23040 | 0;
         d = p[5685];
         e = 1 << a;
         Q : {
          if (!(d & e)) {
           p[5685] = d | e;
           p[b >> 2] = c;
           p[c + 24 >> 2] = b;
           break Q;
          }
          a = f << ((a | 0) == 31 ? 0 : 25 - (a >>> 1 | 0) | 0);
          b = p[b >> 2];
          while (1) {
           d = b;
           if ((f | 0) == (p[b + 4 >> 2] & -8)) {
            break B;
           }
           b = a >>> 29 | 0;
           a = a << 1;
           e = d + (b & 4) | 0;
           b = p[e + 16 >> 2];
           if (b) {
            continue;
           }
           break;
          }
          p[e + 16 >> 2] = c;
          p[c + 24 >> 2] = d;
         }
         p[c + 12 >> 2] = c;
         p[c + 8 >> 2] = c;
         break y;
        }
        a = p[c + 8 >> 2];
        p[a + 12 >> 2] = h;
        p[c + 8 >> 2] = h;
        p[h + 24 >> 2] = 0;
        p[h + 12 >> 2] = c;
        p[h + 8 >> 2] = a;
       }
       a = j + 8 | 0;
       break a;
      }
      a = p[d + 8 >> 2];
      p[a + 12 >> 2] = c;
      p[d + 8 >> 2] = c;
      p[c + 24 >> 2] = 0;
      p[c + 12 >> 2] = d;
      p[c + 8 >> 2] = a;
     }
     a = p[5687];
     if (a >>> 0 <= g >>> 0) {
      break d;
     }
     b = a - g | 0;
     p[5687] = b;
     a = p[5690];
     c = a + g | 0;
     p[5690] = c;
     p[c + 4 >> 2] = b | 1;
     p[a + 4 >> 2] = g | 3;
     a = a + 8 | 0;
     break a;
    }
    p[5666] = 48;
    a = 0;
    break a;
   }
   R : {
    if (!j) {
     break R;
    }
    a = p[f + 28 >> 2];
    d = (a << 2) + 23040 | 0;
    S : {
     if (p[d >> 2] == (f | 0)) {
      p[d >> 2] = b;
      if (b) {
       break S;
      }
      i = Zy(a) & i;
      p[5685] = i;
      break R;
     }
     p[j + (p[j + 16 >> 2] == (f | 0) ? 16 : 20) >> 2] = b;
     if (!b) {
      break R;
     }
    }
    p[b + 24 >> 2] = j;
    a = p[f + 16 >> 2];
    if (a) {
     p[b + 16 >> 2] = a;
     p[a + 24 >> 2] = b;
    }
    a = p[f + 20 >> 2];
    if (!a) {
     break R;
    }
    p[b + 20 >> 2] = a;
    p[a + 24 >> 2] = b;
   }
   T : {
    if (c >>> 0 <= 15) {
     a = c + g | 0;
     p[f + 4 >> 2] = a | 3;
     a = a + f | 0;
     p[a + 4 >> 2] = p[a + 4 >> 2] | 1;
     break T;
    }
    p[f + 4 >> 2] = g | 3;
    p[e + 4 >> 2] = c | 1;
    p[c + e >> 2] = c;
    if (c >>> 0 <= 255) {
     b = c >>> 3 | 0;
     a = (b << 3) + 22776 | 0;
     c = p[5684];
     b = 1 << b;
     U : {
      if (!(c & b)) {
       p[5684] = b | c;
       b = a;
       break U;
      }
      b = p[a + 8 >> 2];
     }
     p[a + 8 >> 2] = e;
     p[b + 12 >> 2] = e;
     p[e + 12 >> 2] = a;
     p[e + 8 >> 2] = b;
     break T;
    }
    b = e;
    d = c >>> 8 | 0;
    a = 0;
    V : {
     if (!d) {
      break V;
     }
     a = 31;
     if (c >>> 0 > 16777215) {
      break V;
     }
     g = d + 1048320 >>> 16 & 8;
     d = d << g;
     a = d + 520192 >>> 16 & 4;
     h = d << a;
     d = h + 245760 >>> 16 & 2;
     a = (h << d >>> 15 | 0) - (d | (a | g)) | 0;
     a = (a << 1 | c >>> a + 21 & 1) + 28 | 0;
    }
    p[b + 28 >> 2] = a;
    p[e + 16 >> 2] = 0;
    p[e + 20 >> 2] = 0;
    b = (a << 2) + 23040 | 0;
    W : {
     d = 1 << a;
     X : {
      if (!(d & i)) {
       p[5685] = d | i;
       p[b >> 2] = e;
       break X;
      }
      a = c << ((a | 0) == 31 ? 0 : 25 - (a >>> 1 | 0) | 0);
      g = p[b >> 2];
      while (1) {
       b = g;
       if ((p[b + 4 >> 2] & -8) == (c | 0)) {
        break W;
       }
       d = a >>> 29 | 0;
       a = a << 1;
       d = (d & 4) + b | 0;
       g = p[d + 16 >> 2];
       if (g) {
        continue;
       }
       break;
      }
      p[d + 16 >> 2] = e;
     }
     p[e + 24 >> 2] = b;
     p[e + 12 >> 2] = e;
     p[e + 8 >> 2] = e;
     break T;
    }
    a = p[b + 8 >> 2];
    p[a + 12 >> 2] = e;
    p[b + 8 >> 2] = e;
    p[e + 24 >> 2] = 0;
    p[e + 12 >> 2] = b;
    p[e + 8 >> 2] = a;
   }
   a = f + 8 | 0;
   break a;
  }
  Y : {
   if (!j) {
    break Y;
   }
   a = p[b + 28 >> 2];
   c = (a << 2) + 23040 | 0;
   Z : {
    if (p[c >> 2] == (b | 0)) {
     p[c >> 2] = f;
     if (f) {
      break Z;
     }
     n = 22740, o = Zy(a) & k, p[n >> 2] = o;
     break Y;
    }
    p[j + (p[j + 16 >> 2] == (b | 0) ? 16 : 20) >> 2] = f;
    if (!f) {
     break Y;
    }
   }
   p[f + 24 >> 2] = j;
   a = p[b + 16 >> 2];
   if (a) {
    p[f + 16 >> 2] = a;
    p[a + 24 >> 2] = f;
   }
   a = p[b + 20 >> 2];
   if (!a) {
    break Y;
   }
   p[f + 20 >> 2] = a;
   p[a + 24 >> 2] = f;
  }
  _ : {
   if (d >>> 0 <= 15) {
    a = d + g | 0;
    p[b + 4 >> 2] = a | 3;
    a = a + b | 0;
    p[a + 4 >> 2] = p[a + 4 >> 2] | 1;
    break _;
   }
   p[b + 4 >> 2] = g | 3;
   p[l + 4 >> 2] = d | 1;
   p[d + l >> 2] = d;
   if (i) {
    c = i >>> 3 | 0;
    a = (c << 3) + 22776 | 0;
    f = p[5689];
    c = 1 << c;
    $ : {
     if (!(c & e)) {
      p[5684] = c | e;
      c = a;
      break $;
     }
     c = p[a + 8 >> 2];
    }
    p[a + 8 >> 2] = f;
    p[c + 12 >> 2] = f;
    p[f + 12 >> 2] = a;
    p[f + 8 >> 2] = c;
   }
   p[5689] = l;
   p[5686] = d;
  }
  a = b + 8 | 0;
 }
 sa = m + 16 | 0;
 return a | 0;
}
function al() {
 var a = 0, b = 0, c = 0, d = 0, e = 0;
 a = sa - 1680 | 0;
 sa = a;
 $k();
 J(22422, 22423, 22424, 0, 15516, 727, 15519, 0, 15519, 0, 14073, 15521, 728);
 p[a + 1032 >> 2] = 8;
 p[a + 1036 >> 2] = 1;
 p[a + 1672 >> 2] = 8;
 p[a + 1676 >> 2] = 1;
 ig(14082, a + 1032 | 0);
 p[a + 1024 >> 2] = 12;
 p[a + 1028 >> 2] = 1;
 p[a + 1672 >> 2] = 12;
 p[a + 1676 >> 2] = 1;
 ig(14087, a + 1024 | 0);
 p[a + 1016 >> 2] = 16;
 p[a + 1020 >> 2] = 1;
 p[a + 1672 >> 2] = 16;
 p[a + 1676 >> 2] = 1;
 Zk(a + 1016 | 0);
 p[a + 1008 >> 2] = 20;
 p[a + 1012 >> 2] = 1;
 p[a + 1672 >> 2] = 20;
 p[a + 1676 >> 2] = 1;
 Yk(a + 1008 | 0);
 p[a + 1e3 >> 2] = 24;
 p[a + 1004 >> 2] = 1;
 p[a + 1672 >> 2] = 24;
 p[a + 1676 >> 2] = 1;
 Xk(a + 1e3 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 729;
 b = p[a + 1676 >> 2];
 p[a + 992 >> 2] = p[a + 1672 >> 2];
 p[a + 996 >> 2] = b;
 Vk(a + 992 | 0);
 J(22425, 22426, 22431, 22422, 15516, 730, 15516, 884, 15516, 885, 14129, 15521, 731);
 Sk();
 P(22422, 15668, 2, 15696, 15512, 732, 733);
 P(22422, 15678, 3, 15856, 15868, 734, 735);
 J(22465, 22406, 22466, 0, 15516, 736, 15519, 0, 15519, 0, 14145, 15521, 737);
 p[a + 984 >> 2] = 8;
 p[a + 988 >> 2] = 1;
 p[a + 1672 >> 2] = 8;
 p[a + 1676 >> 2] = 1;
 hg(14156, a + 984 | 0);
 p[a + 976 >> 2] = 40;
 p[a + 980 >> 2] = 1;
 p[a + 1672 >> 2] = 40;
 p[a + 1676 >> 2] = 1;
 Nk(a + 976 | 0);
 p[a + 968 >> 2] = 12;
 p[a + 972 >> 2] = 1;
 p[a + 1672 >> 2] = 12;
 p[a + 1676 >> 2] = 1;
 Mk(a + 968 | 0);
 p[a + 960 >> 2] = 20;
 p[a + 964 >> 2] = 1;
 p[a + 1672 >> 2] = 20;
 p[a + 1676 >> 2] = 1;
 gg(14179, a + 960 | 0);
 p[a + 952 >> 2] = 24;
 p[a + 956 >> 2] = 1;
 p[a + 1672 >> 2] = 24;
 p[a + 1676 >> 2] = 1;
 gg(14186, a + 952 | 0);
 p[a + 944 >> 2] = 28;
 p[a + 948 >> 2] = 1;
 p[a + 1672 >> 2] = 28;
 p[a + 1676 >> 2] = 1;
 Kk(a + 944 | 0);
 p[a + 936 >> 2] = 32;
 p[a + 940 >> 2] = 1;
 p[a + 1672 >> 2] = 32;
 p[a + 1676 >> 2] = 1;
 hg(14201, a + 936 | 0);
 J(22467, 22468, 22471, 22465, 15516, 738, 15516, 893, 15516, 894, 14207, 15521, 739);
 Ik();
 P(22465, 15668, 2, 16004, 15512, 740, 741);
 P(22465, 15678, 3, 15856, 15868, 734, 742);
 R(22504, 14225, 4, 1);
 fg(fg(a + 1672 | 0, 14242, 1), 14247, 0);
 R(22469, 14254, 4, 1);
 eg(eg(a + 1672 | 0, 14263, 0), 14271, 1);
 R(22505, 14279, 4, 0);
 me(me(me(a + 1672 | 0, 14289, 0), 14294, 1), 14300, 2);
 R(22506, 14307, 4, 0);
 le(le(le(a + 1672 | 0, 14318, 0), 14294, 1), 14324, 2);
 R(22507, 14330, 4, 0);
 ub(ub(ub(ub(ub(ub(ub(ub(ub(ub(ub(ub(ub(ub(ub(ub(a + 1672 | 0, 14340, 3), 14348, 14), 14355, 15), 14363, 16), 14370, 17), 14378, 18), 14389, 19), 14399, 20), 14409, 21), 14419, 22), 14430, 23), 14440, 24), 14449, 25), 14453, 26), 14464, 27), 14470, 28);
 J(22508, 22405, 22509, 0, 15516, 743, 15519, 0, 15519, 0, 14481, 15521, 744);
 p[a + 928 >> 2] = 4;
 p[a + 932 >> 2] = 1;
 p[a + 1672 >> 2] = 4;
 p[a + 1676 >> 2] = 1;
 Ek(a + 928 | 0);
 p[a + 920 >> 2] = 0;
 p[a + 924 >> 2] = 1;
 p[a + 1672 >> 2] = 0;
 p[a + 1676 >> 2] = 1;
 Dk(a + 920 | 0);
 p[a + 912 >> 2] = 8;
 p[a + 916 >> 2] = 1;
 p[a + 1672 >> 2] = 8;
 p[a + 1676 >> 2] = 1;
 Ck(a + 912 | 0);
 p[a + 904 >> 2] = 12;
 p[a + 908 >> 2] = 1;
 p[a + 1672 >> 2] = 12;
 p[a + 1676 >> 2] = 1;
 Bk(a + 904 | 0);
 p[a + 896 >> 2] = 16;
 p[a + 900 >> 2] = 1;
 p[a + 1672 >> 2] = 16;
 p[a + 1676 >> 2] = 1;
 Ak(a + 896 | 0);
 p[a + 888 >> 2] = 20;
 p[a + 892 >> 2] = 1;
 p[a + 1672 >> 2] = 20;
 p[a + 1676 >> 2] = 1;
 zk(a + 888 | 0);
 p[a + 880 >> 2] = 24;
 p[a + 884 >> 2] = 1;
 p[a + 1672 >> 2] = 24;
 p[a + 1676 >> 2] = 1;
 cg(14528, a + 880 | 0);
 p[a + 872 >> 2] = 28;
 p[a + 876 >> 2] = 1;
 p[a + 1672 >> 2] = 28;
 p[a + 1676 >> 2] = 1;
 cg(14543, a + 872 | 0);
 p[a + 864 >> 2] = 32;
 p[a + 868 >> 2] = 1;
 p[a + 1672 >> 2] = 32;
 p[a + 1676 >> 2] = 1;
 yk(a + 864 | 0);
 p[a + 856 >> 2] = 36;
 p[a + 860 >> 2] = 1;
 p[a + 1672 >> 2] = 36;
 p[a + 1676 >> 2] = 1;
 wk(a + 856 | 0);
 J(22510, 22511, 22512, 22508, 15516, 745, 15516, 906, 15516, 907, 14583, 15521, 746);
 uk();
 P(22508, 15668, 2, 16392, 15512, 747, 748);
 P(22508, 15678, 3, 15856, 15868, 734, 749);
 J(22427, 22580, 22581, 0, 15516, 750, 15519, 0, 15519, 0, 14602, 15521, 751);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 752;
 b = p[a + 1676 >> 2];
 p[a + 848 >> 2] = p[a + 1672 >> 2];
 p[a + 852 >> 2] = b;
 I(22427, 14608, 22470, 16656, 753, Wa(a + 848 | 0) | 0, 0, 0, 0, 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 754;
 b = p[a + 1676 >> 2];
 p[a + 840 >> 2] = p[a + 1672 >> 2];
 p[a + 844 >> 2] = b;
 I(22427, 14611, 22470, 16656, 753, Wa(a + 840 | 0) | 0, 0, 0, 0, 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 755;
 b = p[a + 1676 >> 2];
 p[a + 832 >> 2] = p[a + 1672 >> 2];
 p[a + 836 >> 2] = b;
 I(22427, 14614, 22470, 16656, 753, Wa(a + 832 | 0) | 0, 0, 0, 0, 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 756;
 b = p[a + 1676 >> 2];
 p[a + 824 >> 2] = p[a + 1672 >> 2];
 p[a + 828 >> 2] = b;
 I(22427, 14617, 22470, 16656, 753, Wa(a + 824 | 0) | 0, 0, 0, 0, 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 757;
 b = p[a + 1676 >> 2];
 p[a + 816 >> 2] = p[a + 1672 >> 2];
 p[a + 820 >> 2] = b;
 I(22427, 14620, 22470, 16656, 753, Wa(a + 816 | 0) | 0, 0, 0, 0, 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 758;
 b = p[a + 1676 >> 2];
 p[a + 808 >> 2] = p[a + 1672 >> 2];
 p[a + 812 >> 2] = b;
 I(22427, 14623, 22470, 16656, 753, Wa(a + 808 | 0) | 0, 0, 0, 0, 0);
 J(22582, 22421, 22583, 0, 15516, 759, 15519, 0, 15519, 0, 14626, 15521, 760);
 p[a + 1652 >> 2] = 0;
 p[a + 1648 >> 2] = 761;
 b = p[a + 1652 >> 2];
 p[a + 800 >> 2] = p[a + 1648 >> 2];
 p[a + 804 >> 2] = b;
 Za(a + 1656 | 0, a + 800 | 0);
 b = p[a + 1660 >> 2];
 c = p[a + 1656 >> 2];
 p[a + 792 >> 2] = c;
 p[a + 796 >> 2] = b;
 p[a + 1672 >> 2] = c;
 p[a + 1676 >> 2] = b;
 Ry(a + 792 | 0);
 p[a + 1636 >> 2] = 0;
 p[a + 1632 >> 2] = 762;
 b = p[a + 1636 >> 2];
 p[a + 784 >> 2] = p[a + 1632 >> 2];
 p[a + 788 >> 2] = b;
 Za(a + 1640 | 0, a + 784 | 0);
 b = p[a + 1644 >> 2];
 c = p[a + 1640 >> 2];
 p[a + 776 >> 2] = c;
 p[a + 780 >> 2] = b;
 p[a + 1672 >> 2] = c;
 p[a + 1676 >> 2] = b;
 Qy(a + 776 | 0);
 p[a + 1620 >> 2] = 0;
 p[a + 1616 >> 2] = 763;
 b = p[a + 1620 >> 2];
 p[a + 768 >> 2] = p[a + 1616 >> 2];
 p[a + 772 >> 2] = b;
 Za(a + 1624 | 0, a + 768 | 0);
 b = p[a + 1624 >> 2];
 p[a + 1676 >> 2] = p[a + 1628 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 760 >> 2] = p[a + 1672 >> 2];
 p[a + 764 >> 2] = b;
 Py(a + 760 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 764;
 b = p[a + 1676 >> 2];
 p[a + 752 >> 2] = p[a + 1672 >> 2];
 p[a + 756 >> 2] = b;
 Oy(a + 752 | 0);
 J(22586, 22584, 22587, 0, 15516, 765, 15519, 0, 15519, 0, 14692, 15521, 766);
 p[a + 1604 >> 2] = 0;
 p[a + 1600 >> 2] = 767;
 b = p[a + 1604 >> 2];
 p[a + 744 >> 2] = p[a + 1600 >> 2];
 p[a + 748 >> 2] = b;
 Za(a + 1608 | 0, a + 744 | 0);
 b = p[a + 1608 >> 2];
 p[a + 1676 >> 2] = p[a + 1612 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 736 >> 2] = p[a + 1672 >> 2];
 p[a + 740 >> 2] = b;
 I(22586, 14701, 22464, 15512, 768, Wa(a + 736 | 0) | 0, 0, 0, 0, 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 769;
 b = p[a + 1676 >> 2];
 p[a + 728 >> 2] = p[a + 1672 >> 2];
 p[a + 732 >> 2] = b;
 My(a + 728 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 770;
 b = p[a + 1676 >> 2];
 p[a + 720 >> 2] = p[a + 1672 >> 2];
 p[a + 724 >> 2] = b;
 Ly(a + 720 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 771;
 b = p[a + 1676 >> 2];
 p[a + 712 >> 2] = p[a + 1672 >> 2];
 p[a + 716 >> 2] = b;
 Iy(a + 712 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 772;
 b = p[a + 1676 >> 2];
 p[a + 704 >> 2] = p[a + 1672 >> 2];
 p[a + 708 >> 2] = b;
 Gy(a + 704 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 773;
 b = p[a + 1676 >> 2];
 p[a + 696 >> 2] = p[a + 1672 >> 2];
 p[a + 700 >> 2] = b;
 Ey(a + 696 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 774;
 b = p[a + 1676 >> 2];
 p[a + 688 >> 2] = p[a + 1672 >> 2];
 p[a + 692 >> 2] = b;
 Cy(a + 688 | 0);
 p[a + 1588 >> 2] = 0;
 p[a + 1584 >> 2] = 775;
 b = p[a + 1588 >> 2];
 p[a + 680 >> 2] = p[a + 1584 >> 2];
 p[a + 684 >> 2] = b;
 Za(a + 1592 | 0, a + 680 | 0);
 b = p[a + 1592 >> 2];
 p[a + 1676 >> 2] = p[a + 1596 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 672 >> 2] = p[a + 1672 >> 2];
 p[a + 676 >> 2] = b;
 By(a + 672 | 0);
 p[a + 1572 >> 2] = 0;
 p[a + 1568 >> 2] = 776;
 b = p[a + 1572 >> 2];
 p[a + 664 >> 2] = p[a + 1568 >> 2];
 p[a + 668 >> 2] = b;
 Za(a + 1576 | 0, a + 664 | 0);
 b = p[a + 1576 >> 2];
 p[a + 1676 >> 2] = p[a + 1580 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 656 >> 2] = p[a + 1672 >> 2];
 p[a + 660 >> 2] = b;
 Ay(a + 656 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 777;
 b = p[a + 1676 >> 2];
 p[a + 648 >> 2] = p[a + 1672 >> 2];
 p[a + 652 >> 2] = b;
 nk(14790, a + 648 | 0);
 p[a + 1556 >> 2] = 0;
 p[a + 1552 >> 2] = 778;
 b = p[a + 1556 >> 2];
 p[a + 640 >> 2] = p[a + 1552 >> 2];
 p[a + 644 >> 2] = b;
 Za(a + 1560 | 0, a + 640 | 0);
 b = p[a + 1560 >> 2];
 p[a + 1676 >> 2] = p[a + 1564 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 632 >> 2] = p[a + 1672 >> 2];
 p[a + 636 >> 2] = b;
 xy(a + 632 | 0);
 p[a + 1540 >> 2] = 0;
 p[a + 1536 >> 2] = 779;
 b = p[a + 1540 >> 2];
 p[a + 624 >> 2] = p[a + 1536 >> 2];
 p[a + 628 >> 2] = b;
 Za(a + 1544 | 0, a + 624 | 0);
 b = p[a + 1544 >> 2];
 p[a + 1676 >> 2] = p[a + 1548 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 616 >> 2] = p[a + 1672 >> 2];
 p[a + 620 >> 2] = b;
 wy(a + 616 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 780;
 b = p[a + 1676 >> 2];
 p[a + 608 >> 2] = p[a + 1672 >> 2];
 p[a + 612 >> 2] = b;
 nk(14844, a + 608 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 781;
 b = p[a + 1676 >> 2];
 p[a + 600 >> 2] = p[a + 1672 >> 2];
 p[a + 604 >> 2] = b;
 I(22586, 14862, 22430, 15512, 782, Wa(a + 600 | 0) | 0, 0, 0, 0, 0);
 J(22596, 22590, 22597, 0, 15516, 783, 15519, 0, 15519, 0, 14869, 15521, 784);
 p[a + 1524 >> 2] = 0;
 p[a + 1520 >> 2] = 785;
 b = p[a + 1524 >> 2];
 p[a + 592 >> 2] = p[a + 1520 >> 2];
 p[a + 596 >> 2] = b;
 Za(a + 1528 | 0, a + 592 | 0);
 p[a + 1508 >> 2] = 0;
 p[a + 1504 >> 2] = 786;
 b = p[a + 1508 >> 2];
 p[a + 584 >> 2] = p[a + 1504 >> 2];
 p[a + 588 >> 2] = b;
 b = p[a + 1528 >> 2];
 c = p[a + 1532 >> 2];
 Za(a + 1512 | 0, a + 584 | 0);
 d = p[a + 1512 >> 2];
 e = p[a + 1516 >> 2];
 p[a + 1676 >> 2] = c;
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 576 >> 2] = p[a + 1672 >> 2];
 p[a + 580 >> 2] = b;
 b = Wa(a + 576 | 0);
 p[a + 1668 >> 2] = e;
 p[a + 1664 >> 2] = d;
 c = p[a + 1668 >> 2];
 p[a + 568 >> 2] = p[a + 1664 >> 2];
 p[a + 572 >> 2] = c;
 I(22596, 14888, 22470, 16656, 787, b | 0, 22470, 16268, 788, Wa(a + 568 | 0) | 0);
 p[a + 1492 >> 2] = 0;
 p[a + 1488 >> 2] = 789;
 b = p[a + 1492 >> 2];
 p[a + 560 >> 2] = p[a + 1488 >> 2];
 p[a + 564 >> 2] = b;
 Za(a + 1496 | 0, a + 560 | 0);
 p[a + 1476 >> 2] = 0;
 p[a + 1472 >> 2] = 790;
 b = p[a + 1476 >> 2];
 p[a + 552 >> 2] = p[a + 1472 >> 2];
 p[a + 556 >> 2] = b;
 b = p[a + 1496 >> 2];
 c = p[a + 1500 >> 2];
 Za(a + 1480 | 0, a + 552 | 0);
 d = p[a + 1480 >> 2];
 e = p[a + 1484 >> 2];
 p[a + 1676 >> 2] = c;
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 544 >> 2] = p[a + 1672 >> 2];
 p[a + 548 >> 2] = b;
 b = Wa(a + 544 | 0);
 p[a + 1668 >> 2] = e;
 p[a + 1664 >> 2] = d;
 c = p[a + 1668 >> 2];
 p[a + 536 >> 2] = p[a + 1664 >> 2];
 p[a + 540 >> 2] = c;
 I(22596, 14895, 22470, 16656, 787, b | 0, 22470, 16268, 788, Wa(a + 536 | 0) | 0);
 p[a + 1460 >> 2] = 0;
 p[a + 1456 >> 2] = 791;
 b = p[a + 1460 >> 2];
 p[a + 528 >> 2] = p[a + 1456 >> 2];
 p[a + 532 >> 2] = b;
 Za(a + 1464 | 0, a + 528 | 0);
 p[a + 1444 >> 2] = 0;
 p[a + 1440 >> 2] = 792;
 b = p[a + 1444 >> 2];
 p[a + 520 >> 2] = p[a + 1440 >> 2];
 p[a + 524 >> 2] = b;
 b = p[a + 1464 >> 2];
 c = p[a + 1468 >> 2];
 Za(a + 1448 | 0, a + 520 | 0);
 d = p[a + 1448 >> 2];
 e = p[a + 1452 >> 2];
 p[a + 1676 >> 2] = c;
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 512 >> 2] = p[a + 1672 >> 2];
 p[a + 516 >> 2] = b;
 b = Wa(a + 512 | 0);
 p[a + 1668 >> 2] = e;
 p[a + 1664 >> 2] = d;
 c = p[a + 1668 >> 2];
 p[a + 504 >> 2] = p[a + 1664 >> 2];
 p[a + 508 >> 2] = c;
 I(22596, 14902, 22470, 16656, 787, b | 0, 22470, 16268, 788, Wa(a + 504 | 0) | 0);
 J(22598, 22591, 22599, 22596, 15516, 793, 15516, 925, 15516, 926, 14911, 15521, 794);
 p[a + 1424 >> 2] = 72;
 p[a + 1428 >> 2] = 1;
 p[a + 496 >> 2] = 72;
 p[a + 500 >> 2] = 1;
 Za(a + 1432 | 0, a + 496 | 0);
 p[a + 1412 >> 2] = 0;
 p[a + 1408 >> 2] = 795;
 b = p[a + 1412 >> 2];
 p[a + 488 >> 2] = p[a + 1408 >> 2];
 p[a + 492 >> 2] = b;
 b = p[a + 1432 >> 2];
 c = p[a + 1436 >> 2];
 Za(a + 1416 | 0, a + 488 | 0);
 d = p[a + 1416 >> 2];
 e = p[a + 1420 >> 2];
 p[a + 1676 >> 2] = c;
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 480 >> 2] = p[a + 1672 >> 2];
 p[a + 484 >> 2] = b;
 b = Wa(a + 480 | 0);
 p[a + 1668 >> 2] = e;
 p[a + 1664 >> 2] = d;
 c = p[a + 1668 >> 2];
 p[a + 472 >> 2] = p[a + 1664 >> 2];
 p[a + 476 >> 2] = c;
 I(22598, 14916, 22470, 16656, 796, b | 0, 22470, 16268, 797, Wa(a + 472 | 0) | 0);
 p[a + 1392 >> 2] = 76;
 p[a + 1396 >> 2] = 1;
 p[a + 464 >> 2] = 76;
 p[a + 468 >> 2] = 1;
 Za(a + 1400 | 0, a + 464 | 0);
 p[a + 1380 >> 2] = 0;
 p[a + 1376 >> 2] = 798;
 b = p[a + 1380 >> 2];
 p[a + 456 >> 2] = p[a + 1376 >> 2];
 p[a + 460 >> 2] = b;
 b = p[a + 1400 >> 2];
 c = p[a + 1404 >> 2];
 Za(a + 1384 | 0, a + 456 | 0);
 d = p[a + 1384 >> 2];
 e = p[a + 1388 >> 2];
 p[a + 1676 >> 2] = c;
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 448 >> 2] = p[a + 1672 >> 2];
 p[a + 452 >> 2] = b;
 b = Wa(a + 448 | 0);
 p[a + 1668 >> 2] = e;
 p[a + 1664 >> 2] = d;
 c = p[a + 1668 >> 2];
 p[a + 440 >> 2] = p[a + 1664 >> 2];
 p[a + 444 >> 2] = c;
 I(22598, 14918, 22470, 16656, 796, b | 0, 22470, 16268, 797, Wa(a + 440 | 0) | 0);
 J(22600, 22592, 22601, 22596, 15516, 799, 15516, 927, 15516, 928, 14920, 15521, 800);
 p[a + 1364 >> 2] = 0;
 p[a + 1360 >> 2] = 801;
 b = p[a + 1364 >> 2];
 p[a + 432 >> 2] = p[a + 1360 >> 2];
 p[a + 436 >> 2] = b;
 Za(a + 1368 | 0, a + 432 | 0);
 p[a + 1348 >> 2] = 0;
 p[a + 1344 >> 2] = 802;
 b = p[a + 1348 >> 2];
 p[a + 424 >> 2] = p[a + 1344 >> 2];
 p[a + 428 >> 2] = b;
 b = p[a + 1368 >> 2];
 c = p[a + 1372 >> 2];
 Za(a + 1352 | 0, a + 424 | 0);
 d = p[a + 1352 >> 2];
 e = p[a + 1356 >> 2];
 p[a + 1676 >> 2] = c;
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 416 >> 2] = p[a + 1672 >> 2];
 p[a + 420 >> 2] = b;
 b = Wa(a + 416 | 0);
 p[a + 1668 >> 2] = e;
 p[a + 1664 >> 2] = d;
 c = p[a + 1668 >> 2];
 p[a + 408 >> 2] = p[a + 1664 >> 2];
 p[a + 412 >> 2] = c;
 I(22600, 14925, 22470, 16656, 803, b | 0, 22470, 16268, 804, Wa(a + 408 | 0) | 0);
 J(22602, 22593, 22603, 22600, 15516, 805, 15516, 929, 15516, 930, 14932, 15521, 806);
 p[a + 1328 >> 2] = 72;
 p[a + 1332 >> 2] = 1;
 p[a + 400 >> 2] = 72;
 p[a + 404 >> 2] = 1;
 Za(a + 1336 | 0, a + 400 | 0);
 p[a + 1316 >> 2] = 0;
 p[a + 1312 >> 2] = 807;
 b = p[a + 1316 >> 2];
 p[a + 392 >> 2] = p[a + 1312 >> 2];
 p[a + 396 >> 2] = b;
 b = p[a + 1336 >> 2];
 c = p[a + 1340 >> 2];
 Za(a + 1320 | 0, a + 392 | 0);
 d = p[a + 1320 >> 2];
 e = p[a + 1324 >> 2];
 p[a + 1676 >> 2] = c;
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 384 >> 2] = p[a + 1672 >> 2];
 p[a + 388 >> 2] = b;
 b = Wa(a + 384 | 0);
 p[a + 1668 >> 2] = e;
 p[a + 1664 >> 2] = d;
 c = p[a + 1668 >> 2];
 p[a + 376 >> 2] = p[a + 1664 >> 2];
 p[a + 380 >> 2] = c;
 I(22602, 14916, 22470, 16656, 808, b | 0, 22470, 16268, 809, Wa(a + 376 | 0) | 0);
 p[a + 1296 >> 2] = 76;
 p[a + 1300 >> 2] = 1;
 p[a + 368 >> 2] = 76;
 p[a + 372 >> 2] = 1;
 Za(a + 1304 | 0, a + 368 | 0);
 p[a + 1284 >> 2] = 0;
 p[a + 1280 >> 2] = 810;
 b = p[a + 1284 >> 2];
 p[a + 360 >> 2] = p[a + 1280 >> 2];
 p[a + 364 >> 2] = b;
 b = p[a + 1304 >> 2];
 c = p[a + 1308 >> 2];
 Za(a + 1288 | 0, a + 360 | 0);
 d = p[a + 1288 >> 2];
 e = p[a + 1292 >> 2];
 p[a + 1676 >> 2] = c;
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 352 >> 2] = p[a + 1672 >> 2];
 p[a + 356 >> 2] = b;
 b = Wa(a + 352 | 0);
 p[a + 1668 >> 2] = e;
 p[a + 1664 >> 2] = d;
 c = p[a + 1668 >> 2];
 p[a + 344 >> 2] = p[a + 1664 >> 2];
 p[a + 348 >> 2] = c;
 I(22602, 14918, 22470, 16656, 808, b | 0, 22470, 16268, 809, Wa(a + 344 | 0) | 0);
 J(22604, 22605, 22606, 0, 15516, 811, 15519, 0, 15519, 0, 14941, 15521, 812);
 p[a + 1268 >> 2] = 0;
 p[a + 1264 >> 2] = 813;
 b = p[a + 1268 >> 2];
 p[a + 336 >> 2] = p[a + 1264 >> 2];
 p[a + 340 >> 2] = b;
 Za(a + 1272 | 0, a + 336 | 0);
 b = p[a + 1272 >> 2];
 p[a + 1676 >> 2] = p[a + 1276 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 328 >> 2] = p[a + 1672 >> 2];
 p[a + 332 >> 2] = b;
 I(22604, 14701, 22464, 15512, 814, Wa(a + 328 | 0) | 0, 0, 0, 0, 0);
 J(22607, 22594, 22608, 22604, 15516, 815, 15516, 931, 15516, 932, 14951, 15521, 816);
 p[a + 1252 >> 2] = 0;
 p[a + 1248 >> 2] = 813;
 b = p[a + 1252 >> 2];
 p[a + 320 >> 2] = p[a + 1248 >> 2];
 p[a + 324 >> 2] = b;
 Za(a + 1256 | 0, a + 320 | 0);
 b = p[a + 1256 >> 2];
 p[a + 1676 >> 2] = p[a + 1260 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 312 >> 2] = p[a + 1672 >> 2];
 p[a + 316 >> 2] = b;
 I(22607, 14701, 22464, 15512, 817, Wa(a + 312 | 0) | 0, 0, 0, 0, 0);
 p[a + 1236 >> 2] = 0;
 p[a + 1232 >> 2] = 818;
 b = p[a + 1236 >> 2];
 p[a + 304 >> 2] = p[a + 1232 >> 2];
 p[a + 308 >> 2] = b;
 Za(a + 1240 | 0, a + 304 | 0);
 b = p[a + 1240 >> 2];
 p[a + 1676 >> 2] = p[a + 1244 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 296 >> 2] = p[a + 1672 >> 2];
 p[a + 300 >> 2] = b;
 I(22607, 14967, 22609, 15512, 819, Wa(a + 296 | 0) | 0, 0, 0, 0, 0);
 p[a + 1220 >> 2] = 0;
 p[a + 1216 >> 2] = 820;
 b = p[a + 1220 >> 2];
 p[a + 288 >> 2] = p[a + 1216 >> 2];
 p[a + 292 >> 2] = b;
 Za(a + 1224 | 0, a + 288 | 0);
 b = p[a + 1224 >> 2];
 p[a + 1676 >> 2] = p[a + 1228 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 280 >> 2] = p[a + 1672 >> 2];
 p[a + 284 >> 2] = b;
 I(22607, 14976, 22609, 15512, 819, Wa(a + 280 | 0) | 0, 0, 0, 0, 0);
 p[a + 1204 >> 2] = 0;
 p[a + 1200 >> 2] = 821;
 b = p[a + 1204 >> 2];
 p[a + 272 >> 2] = p[a + 1200 >> 2];
 p[a + 276 >> 2] = b;
 Za(a + 1208 | 0, a + 272 | 0);
 b = p[a + 1208 >> 2];
 p[a + 1676 >> 2] = p[a + 1212 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 264 >> 2] = p[a + 1672 >> 2];
 p[a + 268 >> 2] = b;
 I(22607, 14980, 22609, 15512, 819, Wa(a + 264 | 0) | 0, 0, 0, 0, 0);
 p[a + 1188 >> 2] = 0;
 p[a + 1184 >> 2] = 822;
 b = p[a + 1188 >> 2];
 p[a + 256 >> 2] = p[a + 1184 >> 2];
 p[a + 260 >> 2] = b;
 Za(a + 1192 | 0, a + 256 | 0);
 b = p[a + 1192 >> 2];
 p[a + 1676 >> 2] = p[a + 1196 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 248 >> 2] = p[a + 1672 >> 2];
 p[a + 252 >> 2] = b;
 I(22607, 14990, 22609, 15512, 819, Wa(a + 248 | 0) | 0, 0, 0, 0, 0);
 p[a + 1172 >> 2] = 0;
 p[a + 1168 >> 2] = 823;
 b = p[a + 1172 >> 2];
 p[a + 240 >> 2] = p[a + 1168 >> 2];
 p[a + 244 >> 2] = b;
 Za(a + 1176 | 0, a + 240 | 0);
 b = p[a + 1176 >> 2];
 p[a + 1676 >> 2] = p[a + 1180 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 232 >> 2] = p[a + 1672 >> 2];
 p[a + 236 >> 2] = b;
 I(22607, 14998, 22588, 15512, 824, Wa(a + 232 | 0) | 0, 0, 0, 0, 0);
 p[a + 1156 >> 2] = 0;
 p[a + 1152 >> 2] = 825;
 b = p[a + 1156 >> 2];
 p[a + 224 >> 2] = p[a + 1152 >> 2];
 p[a + 228 >> 2] = b;
 Za(a + 1160 | 0, a + 224 | 0);
 b = p[a + 1160 >> 2];
 p[a + 1676 >> 2] = p[a + 1164 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 216 >> 2] = p[a + 1672 >> 2];
 p[a + 220 >> 2] = b;
 I(22607, 15013, 22609, 15512, 819, Wa(a + 216 | 0) | 0, 0, 0, 0, 0);
 p[a + 1140 >> 2] = 0;
 p[a + 1136 >> 2] = 826;
 b = p[a + 1140 >> 2];
 p[a + 208 >> 2] = p[a + 1136 >> 2];
 p[a + 212 >> 2] = b;
 Za(a + 1144 | 0, a + 208 | 0);
 b = p[a + 1144 >> 2];
 p[a + 1676 >> 2] = p[a + 1148 >> 2];
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 200 >> 2] = p[a + 1672 >> 2];
 p[a + 204 >> 2] = b;
 I(22607, 15023, 22470, 16656, 827, Wa(a + 200 | 0) | 0, 0, 0, 0, 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 828;
 b = p[a + 1676 >> 2];
 p[a + 192 >> 2] = p[a + 1672 >> 2];
 p[a + 196 >> 2] = b;
 my(a + 192 | 0);
 J(22610, 22611, 22612, 0, 15516, 829, 15519, 0, 15519, 0, 15035, 15521, 830);
 jy();
 p[a + 1124 >> 2] = 0;
 p[a + 1120 >> 2] = 832;
 b = p[a + 1124 >> 2];
 p[a + 184 >> 2] = p[a + 1120 >> 2];
 p[a + 188 >> 2] = b;
 Za(a + 1128 | 0, a + 184 | 0);
 p[a + 1108 >> 2] = 0;
 p[a + 1104 >> 2] = 833;
 b = p[a + 1108 >> 2];
 p[a + 176 >> 2] = p[a + 1104 >> 2];
 p[a + 180 >> 2] = b;
 b = p[a + 1128 >> 2];
 c = p[a + 1132 >> 2];
 Za(a + 1112 | 0, a + 176 | 0);
 d = p[a + 1112 >> 2];
 e = p[a + 1116 >> 2];
 p[a + 1676 >> 2] = c;
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 168 >> 2] = p[a + 1672 >> 2];
 p[a + 172 >> 2] = b;
 b = Wa(a + 168 | 0);
 p[a + 1668 >> 2] = e;
 p[a + 1664 >> 2] = d;
 c = p[a + 1668 >> 2];
 p[a + 160 >> 2] = p[a + 1664 >> 2];
 p[a + 164 >> 2] = c;
 I(22610, 15059, 22470, 16656, 834, b | 0, 22470, 16268, 835, Wa(a + 160 | 0) | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 836;
 b = p[a + 1676 >> 2];
 p[a + 152 >> 2] = p[a + 1672 >> 2];
 p[a + 156 >> 2] = b;
 I(22610, 15064, 22588, 15512, 837, Wa(a + 152 | 0) | 0, 0, 0, 0, 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 838;
 b = p[a + 1676 >> 2];
 p[a + 144 >> 2] = p[a + 1672 >> 2];
 p[a + 148 >> 2] = b;
 gy(a + 144 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 839;
 b = p[a + 1676 >> 2];
 p[a + 136 >> 2] = p[a + 1672 >> 2];
 p[a + 140 >> 2] = b;
 ey(a + 136 | 0);
 J(22613, 22614, 22615, 0, 15516, 840, 15519, 0, 15519, 0, 15072, 15521, 841);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 842;
 b = p[a + 1676 >> 2];
 p[a + 128 >> 2] = p[a + 1672 >> 2];
 p[a + 132 >> 2] = b;
 I(22613, 15081, 22616, 15512, 843, Wa(a + 128 | 0) | 0, 0, 0, 0, 0);
 M(22613, 15086, 22616, 15092, 15516, 844, 0, 0);
 M(22613, 15094, 22616, 15102, 15516, 844, 0, 0);
 M(22613, 15104, 22616, 15112, 15516, 844, 0, 0);
 $x();
 Yx();
 Wx();
 J(22620, 22617, 22621, 22613, 15516, 848, 15516, 940, 15516, 941, 15140, 15521, 849);
 p[a + 1092 >> 2] = 0;
 p[a + 1088 >> 2] = 850;
 b = p[a + 1092 >> 2];
 p[a + 120 >> 2] = p[a + 1088 >> 2];
 p[a + 124 >> 2] = b;
 Za(a + 1096 | 0, a + 120 | 0);
 p[a + 1076 >> 2] = 0;
 p[a + 1072 >> 2] = 851;
 b = p[a + 1076 >> 2];
 p[a + 112 >> 2] = p[a + 1072 >> 2];
 p[a + 116 >> 2] = b;
 b = p[a + 1096 >> 2];
 c = p[a + 1100 >> 2];
 Za(a + 1080 | 0, a + 112 | 0);
 d = p[a + 1080 >> 2];
 e = p[a + 1084 >> 2];
 p[a + 1676 >> 2] = c;
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 104 >> 2] = p[a + 1672 >> 2];
 p[a + 108 >> 2] = b;
 b = Wa(a + 104 | 0);
 p[a + 1668 >> 2] = e;
 p[a + 1664 >> 2] = d;
 c = p[a + 1668 >> 2];
 p[a + 96 >> 2] = p[a + 1664 >> 2];
 p[a + 100 >> 2] = c;
 I(22620, 15148, 22588, 15512, 852, b | 0, 22588, 15548, 853, Wa(a + 96 | 0) | 0);
 J(22622, 22618, 22623, 22613, 15516, 854, 15516, 942, 15516, 943, 15154, 15521, 855);
 p[a + 1060 >> 2] = 0;
 p[a + 1056 >> 2] = 856;
 b = p[a + 1060 >> 2];
 p[a + 88 >> 2] = p[a + 1056 >> 2];
 p[a + 92 >> 2] = b;
 Za(a + 1064 | 0, a + 88 | 0);
 p[a + 1044 >> 2] = 0;
 p[a + 1040 >> 2] = 857;
 b = p[a + 1044 >> 2];
 p[a + 80 >> 2] = p[a + 1040 >> 2];
 p[a + 84 >> 2] = b;
 b = p[a + 1064 >> 2];
 c = p[a + 1068 >> 2];
 Za(a + 1048 | 0, a + 80 | 0);
 d = p[a + 1048 >> 2];
 e = p[a + 1052 >> 2];
 p[a + 1676 >> 2] = c;
 p[a + 1672 >> 2] = b;
 b = p[a + 1676 >> 2];
 p[a + 72 >> 2] = p[a + 1672 >> 2];
 p[a + 76 >> 2] = b;
 b = Wa(a + 72 | 0);
 p[a + 1668 >> 2] = e;
 p[a + 1664 >> 2] = d;
 c = p[a + 1668 >> 2];
 p[a + 64 >> 2] = p[a + 1664 >> 2];
 p[a + 68 >> 2] = c;
 I(22622, 15148, 22470, 16656, 858, b | 0, 22470, 16268, 859, Wa(a - -64 | 0) | 0);
 J(22624, 22619, 22625, 22613, 15516, 860, 15516, 944, 15516, 945, 15164, 15521, 861);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 862;
 b = p[a + 1676 >> 2];
 p[a + 56 >> 2] = p[a + 1672 >> 2];
 p[a + 60 >> 2] = b;
 Sx(a + 56 | 0);
 J(22626, 22595, 22627, 22604, 15516, 863, 15516, 947, 15516, 948, 15180, 15521, 864);
 J(22628, 22629, 22630, 0, 15516, 865, 15519, 0, 15519, 0, 15193, 15521, 866);
 Mx();
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 868;
 b = p[a + 1676 >> 2];
 p[a + 48 >> 2] = p[a + 1672 >> 2];
 p[a + 52 >> 2] = b;
 Lx(a + 48 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 869;
 b = p[a + 1676 >> 2];
 p[a + 40 >> 2] = p[a + 1672 >> 2];
 p[a + 44 >> 2] = b;
 Kx(a + 40 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 870;
 b = p[a + 1676 >> 2];
 p[a + 32 >> 2] = p[a + 1672 >> 2];
 p[a + 36 >> 2] = b;
 Jx(a + 32 | 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 871;
 b = p[a + 1676 >> 2];
 p[a + 24 >> 2] = p[a + 1672 >> 2];
 p[a + 28 >> 2] = b;
 Ix(a + 24 | 0);
 R(22428, 15231, 1, 0);
 Ec(Ec(Ec(Ec(Ec(Ec(Ec(a + 1672 | 0, 14242, 0), 15235, 1), 15243, 2), 15249, 3), 15258, 4), 15268, 5), 15273, 6);
 J(22429, 22631, 22632, 0, 15516, 872, 15519, 0, 15519, 0, 15283, 15521, 873);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 874;
 b = p[a + 1676 >> 2];
 p[a + 16 >> 2] = p[a + 1672 >> 2];
 p[a + 20 >> 2] = b;
 I(22429, 14916, 22470, 16656, 875, Wa(a + 16 | 0) | 0, 0, 0, 0, 0);
 p[a + 1676 >> 2] = 0;
 p[a + 1672 >> 2] = 876;
 b = p[a + 1676 >> 2];
 p[a + 8 >> 2] = p[a + 1672 >> 2];
 p[a + 12 >> 2] = b;
 I(22429, 14918, 22470, 16656, 875, Wa(a + 8 | 0) | 0, 0, 0, 0, 0);
 M(22429, 15293, 22429, 12896, 15516, 877, 0, 0);
 M(22429, 15301, 22429, 12904, 15516, 877, 0, 0);
 M(22429, 15311, 22429, 12912, 15516, 877, 0, 0);
 M(22429, 15320, 22429, 12920, 15516, 877, 0, 0);
 M(22429, 15331, 22429, 12928, 15516, 877, 0, 0);
 M(22429, 15338, 22429, 12936, 15516, 877, 0, 0);
 M(22429, 15350, 22429, 12944, 15516, 877, 0, 0);
 M(22429, 15361, 22429, 12952, 15516, 877, 0, 0);
 M(22429, 15374, 22429, 12960, 15516, 877, 0, 0);
 pa(22430, 15386, 17012, 954, 15521, 955);
 je(je(je(je(a + 1672 | 0, 15391, 0), 15396, 4), 15401, 8), 15406, 12);
 na(22430);
 sa = a + 1680 | 0;
}
function Tf(a, b, c, d, e, f, g) {
 var h = 0, i = 0, j = 0, k = 0, l = 0, r = 0, s = 0, t = 0, w = 0, x = 0, y = 0, z = 0, A = 0, B = 0, C = 0;
 h = sa - 80 | 0;
 sa = h;
 p[h + 76 >> 2] = b;
 C = h + 55 | 0;
 z = h + 56 | 0;
 b = 0;
 a : {
  b : while (1) {
   c : {
    if ((x | 0) < 0) {
     break c;
    }
    if ((b | 0) > (2147483647 - x | 0)) {
     p[5666] = 61;
     x = -1;
     break c;
    }
    x = b + x | 0;
   }
   d : {
    e : {
     f : {
      k = p[h + 76 >> 2];
      b = k;
      i = q[b | 0];
      if (i) {
       while (1) {
        g : {
         i = i & 255;
         h : {
          if (!i) {
           i = b;
           break h;
          }
          if ((i | 0) != 37) {
           break g;
          }
          i = b;
          while (1) {
           if (q[b + 1 | 0] != 37) {
            break h;
           }
           j = b + 2 | 0;
           p[h + 76 >> 2] = j;
           i = i + 1 | 0;
           l = q[b + 2 | 0];
           b = j;
           if ((l | 0) == 37) {
            continue;
           }
           break;
          }
         }
         b = i - k | 0;
         if (a) {
          pb(a, k, b);
         }
         if (b) {
          continue b;
         }
         i = h;
         j = !pd(n[p[h + 76 >> 2] + 1 | 0]);
         b = p[h + 76 >> 2];
         i : {
          if (!(j | q[b + 2 | 0] != 36)) {
           y = n[b + 1 | 0] + -48 | 0;
           A = 1;
           b = b + 3 | 0;
           break i;
          }
          y = -1;
          b = b + 1 | 0;
         }
         p[i + 76 >> 2] = b;
         r = 0;
         s = n[b | 0];
         j = s + -32 | 0;
         j : {
          if (j >>> 0 > 31) {
           i = b;
           break j;
          }
          i = b;
          j = 1 << j;
          if (!(j & 75913)) {
           break j;
          }
          while (1) {
           i = b + 1 | 0;
           p[h + 76 >> 2] = i;
           r = j | r;
           s = n[b + 1 | 0];
           j = s + -32 | 0;
           if (j >>> 0 >= 32) {
            break j;
           }
           b = i;
           j = 1 << j;
           if (j & 75913) {
            continue;
           }
           break;
          }
         }
         k : {
          if ((s | 0) == 42) {
           j = h;
           l : {
            m : {
             if (!pd(n[i + 1 | 0])) {
              break m;
             }
             b = p[h + 76 >> 2];
             if (q[b + 2 | 0] != 36) {
              break m;
             }
             p[((n[b + 1 | 0] << 2) + e | 0) + -192 >> 2] = 10;
             t = p[((n[b + 1 | 0] << 3) + d | 0) + -384 >> 2];
             A = 1;
             b = b + 3 | 0;
             break l;
            }
            if (A) {
             break f;
            }
            A = 0;
            t = 0;
            if (a) {
             b = p[c >> 2];
             p[c >> 2] = b + 4;
             t = p[b >> 2];
            }
            b = p[h + 76 >> 2] + 1 | 0;
           }
           p[j + 76 >> 2] = b;
           if ((t | 0) > -1) {
            break k;
           }
           t = 0 - t | 0;
           r = r | 8192;
           break k;
          }
          t = Mj(h + 76 | 0);
          if ((t | 0) < 0) {
           break f;
          }
          b = p[h + 76 >> 2];
         }
         l = -1;
         n : {
          if (q[b | 0] != 46) {
           break n;
          }
          if (q[b + 1 | 0] == 42) {
           o : {
            if (!pd(n[b + 2 | 0])) {
             break o;
            }
            b = p[h + 76 >> 2];
            if (q[b + 3 | 0] != 36) {
             break o;
            }
            p[((n[b + 2 | 0] << 2) + e | 0) + -192 >> 2] = 10;
            l = p[((n[b + 2 | 0] << 3) + d | 0) + -384 >> 2];
            b = b + 4 | 0;
            p[h + 76 >> 2] = b;
            break n;
           }
           if (A) {
            break f;
           }
           if (a) {
            b = p[c >> 2];
            p[c >> 2] = b + 4;
            b = p[b >> 2];
           } else {
            b = 0;
           }
           l = b;
           b = p[h + 76 >> 2] + 2 | 0;
           p[h + 76 >> 2] = b;
           break n;
          }
          p[h + 76 >> 2] = b + 1;
          l = Mj(h + 76 | 0);
          b = p[h + 76 >> 2];
         }
         i = 0;
         while (1) {
          B = i;
          w = -1;
          if (n[b | 0] + -65 >>> 0 > 57) {
           break a;
          }
          s = b + 1 | 0;
          p[h + 76 >> 2] = s;
          i = n[b | 0];
          b = s;
          i = q[(i + v(B, 58) | 0) + 20623 | 0];
          if (i + -1 >>> 0 < 8) {
           continue;
          }
          break;
         }
         p : {
          q : {
           if ((i | 0) != 19) {
            if (!i) {
             break a;
            }
            if ((y | 0) >= 0) {
             p[(y << 2) + e >> 2] = i;
             b = (y << 3) + d | 0;
             i = p[b + 4 >> 2];
             p[h + 64 >> 2] = p[b >> 2];
             p[h + 68 >> 2] = i;
             break q;
            }
            if (!a) {
             break d;
            }
            Lj(h - -64 | 0, i, c, g);
            s = p[h + 76 >> 2];
            break p;
           }
           if ((y | 0) > -1) {
            break a;
           }
          }
          b = 0;
          if (!a) {
           continue b;
          }
         }
         j = r & -65537;
         i = r & 8192 ? j : r;
         w = 0;
         y = 20660;
         r = z;
         r : {
          s : {
           t : {
            u : {
             v : {
              w : {
               x : {
                y : {
                 z : {
                  A : {
                   B : {
                    C : {
                     D : {
                      E : {
                       F : {
                        G : {
                         b = n[s + -1 | 0];
                         b = B ? (b & 15) == 3 ? b & -33 : b : b;
                         switch (b + -88 | 0) {
                         case 11:
                          break r;
                         case 9:
                         case 13:
                         case 14:
                         case 15:
                          break s;
                         case 27:
                          break x;
                         case 12:
                         case 17:
                          break A;
                         case 23:
                          break B;
                         case 0:
                         case 32:
                          break C;
                         case 24:
                          break D;
                         case 22:
                          break E;
                         case 29:
                          break F;
                         case 1:
                         case 2:
                         case 3:
                         case 4:
                         case 5:
                         case 6:
                         case 7:
                         case 8:
                         case 10:
                         case 16:
                         case 18:
                         case 19:
                         case 20:
                         case 21:
                         case 25:
                         case 26:
                         case 28:
                         case 30:
                         case 31:
                          break e;
                         default:
                          break G;
                         }
                        }
                        H : {
                         switch (b + -65 | 0) {
                         case 0:
                         case 4:
                         case 5:
                         case 6:
                          break s;
                         case 2:
                          break v;
                         case 1:
                         case 3:
                          break e;
                         default:
                          break H;
                         }
                        }
                        if ((b | 0) == 83) {
                         break w;
                        }
                        break e;
                       }
                       b = p[h + 64 >> 2];
                       k = p[h + 68 >> 2];
                       j = 20660;
                       break z;
                      }
                      b = 0;
                      I : {
                       switch (B & 255) {
                       case 0:
                        p[p[h + 64 >> 2] >> 2] = x;
                        continue b;
                       case 1:
                        p[p[h + 64 >> 2] >> 2] = x;
                        continue b;
                       case 2:
                        i = p[h + 64 >> 2];
                        p[i >> 2] = x;
                        p[i + 4 >> 2] = x >> 31;
                        continue b;
                       case 3:
                        o[p[h + 64 >> 2] >> 1] = x;
                        continue b;
                       case 4:
                        n[p[h + 64 >> 2]] = x;
                        continue b;
                       case 6:
                        p[p[h + 64 >> 2] >> 2] = x;
                        continue b;
                       case 7:
                        break I;
                       default:
                        continue b;
                       }
                      }
                      i = p[h + 64 >> 2];
                      p[i >> 2] = x;
                      p[i + 4 >> 2] = x >> 31;
                      continue b;
                     }
                     l = l >>> 0 > 8 ? l : 8;
                     i = i | 8;
                     b = 120;
                    }
                    k = rv(p[h + 64 >> 2], p[h + 68 >> 2], z, b & 32);
                    if (!(i & 8) | !(p[h + 64 >> 2] | p[h + 68 >> 2])) {
                     break y;
                    }
                    y = (b >>> 4 | 0) + 20660 | 0;
                    w = 2;
                    break y;
                   }
                   k = qv(p[h + 64 >> 2], p[h + 68 >> 2], z);
                   if (!(i & 8)) {
                    break y;
                   }
                   b = z - k | 0;
                   l = (l | 0) > (b | 0) ? l : b + 1 | 0;
                   break y;
                  }
                  j = p[h + 68 >> 2];
                  k = j;
                  b = p[h + 64 >> 2];
                  if ((j | 0) < -1 ? 1 : (j | 0) <= -1) {
                   k = 0 - (k + (0 < b >>> 0) | 0) | 0;
                   b = 0 - b | 0;
                   p[h + 64 >> 2] = b;
                   p[h + 68 >> 2] = k;
                   w = 1;
                   j = 20660;
                   break z;
                  }
                  if (i & 2048) {
                   w = 1;
                   j = 20661;
                   break z;
                  }
                  w = i & 1;
                  j = w ? 20662 : 20660;
                 }
                 y = j;
                 k = Rc(b, k, z);
                }
                i = (l | 0) > -1 ? i & -65537 : i;
                b = p[h + 68 >> 2];
                j = b;
                s = p[h + 64 >> 2];
                if (!(!!(b | s) | l)) {
                 l = 0;
                 k = z;
                 break e;
                }
                b = !(j | s) + (z - k | 0) | 0;
                l = (l | 0) > (b | 0) ? l : b;
                break e;
               }
               b = p[h + 64 >> 2];
               k = b ? b : 20670;
               b = iv(k, l);
               r = b ? b : l + k | 0;
               i = j;
               l = b ? b - k | 0 : l;
               break e;
              }
              j = p[h + 64 >> 2];
              if (l) {
               break u;
              }
              b = 0;
              wb(a, 32, t, 0, i);
              break t;
             }
             p[h + 12 >> 2] = 0;
             p[h + 8 >> 2] = p[h + 64 >> 2];
             p[h + 64 >> 2] = h + 8;
             l = -1;
             j = h + 8 | 0;
            }
            b = 0;
            J : {
             while (1) {
              k = p[j >> 2];
              if (!k) {
               break J;
              }
              k = Jj(h + 4 | 0, k);
              r = (k | 0) < 0;
              if (!(r | k >>> 0 > l - b >>> 0)) {
               j = j + 4 | 0;
               b = b + k | 0;
               if (l >>> 0 > b >>> 0) {
                continue;
               }
               break J;
              }
              break;
             }
             w = -1;
             if (r) {
              break a;
             }
            }
            wb(a, 32, t, b, i);
            if (!b) {
             b = 0;
             break t;
            }
            s = 0;
            j = p[h + 64 >> 2];
            while (1) {
             k = p[j >> 2];
             if (!k) {
              break t;
             }
             k = Jj(h + 4 | 0, k);
             s = k + s | 0;
             if ((s | 0) > (b | 0)) {
              break t;
             }
             pb(a, h + 4 | 0, k);
             j = j + 4 | 0;
             if (s >>> 0 < b >>> 0) {
              continue;
             }
             break;
            }
           }
           wb(a, 32, t, b, i ^ 8192);
           b = (t | 0) > (b | 0) ? t : b;
           continue b;
          }
          b = m[f | 0](a, u[h + 64 >> 3], t, l, i, b) | 0;
          continue b;
         }
         n[h + 55 | 0] = p[h + 64 >> 2];
         l = 1;
         k = C;
         i = j;
         break e;
        }
        j = b + 1 | 0;
        p[h + 76 >> 2] = j;
        i = q[b + 1 | 0];
        b = j;
        continue;
       }
      }
      w = x;
      if (a) {
       break a;
      }
      if (!A) {
       break d;
      }
      b = 1;
      while (1) {
       a = p[(b << 2) + e >> 2];
       if (a) {
        Lj((b << 3) + d | 0, a, c, g);
        w = 1;
        b = b + 1 | 0;
        if ((b | 0) != 10) {
         continue;
        }
        break a;
       }
       break;
      }
      w = 1;
      if (b >>> 0 >= 10) {
       break a;
      }
      while (1) {
       if (p[(b << 2) + e >> 2]) {
        break f;
       }
       b = b + 1 | 0;
       if ((b | 0) != 10) {
        continue;
       }
       break;
      }
      break a;
     }
     w = -1;
     break a;
    }
    r = r - k | 0;
    l = (l | 0) < (r | 0) ? r : l;
    j = l + w | 0;
    b = (t | 0) < (j | 0) ? j : t;
    wb(a, 32, b, j, i);
    pb(a, y, w);
    wb(a, 48, b, j, i ^ 65536);
    wb(a, 48, l, r, 0);
    pb(a, k, r);
    wb(a, 32, b, j, i ^ 8192);
    continue;
   }
   break;
  }
  w = 0;
 }
 sa = h + 80 | 0;
 return w;
}
function pv(a, b, c, d, f, g) {
 a = a | 0;
 b = +b;
 c = c | 0;
 d = d | 0;
 f = f | 0;
 g = g | 0;
 var i = 0, j = 0, k = 0, l = 0, m = 0, o = 0, r = 0, s = 0, t = 0, u = 0, w = 0, y = 0, z = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0;
 l = sa - 560 | 0;
 sa = l;
 p[l + 44 >> 2] = 0;
 h(+b);
 i = e(1) | 0;
 e(0) | 0;
 a : {
  if ((i | 0) < -1 ? 1 : (i | 0) <= -1) {
   C = 1;
   E = 21168;
   b = -b;
   h(+b);
   i = e(1) | 0;
   e(0) | 0;
   break a;
  }
  if (f & 2048) {
   C = 1;
   E = 21171;
   break a;
  }
  C = f & 1;
  E = C ? 21174 : 21169;
  D = !C;
 }
 b : {
  if ((i & 2146435072) == 2146435072) {
   s = C + 3 | 0;
   wb(a, 32, c, s, f & -65537);
   pb(a, E, C);
   d = g & 32;
   pb(a, b != b ? d ? 21195 : 21199 : d ? 21187 : 21191, 3);
   break b;
  }
  z = l + 16 | 0;
  c : {
   d : {
    e : {
     b = Pj(b, l + 44 | 0);
     b = b + b;
     if (b != 0) {
      i = p[l + 44 >> 2];
      p[l + 44 >> 2] = i + -1;
      F = g | 32;
      if ((F | 0) != 97) {
       break e;
      }
      break c;
     }
     F = g | 32;
     if ((F | 0) == 97) {
      break c;
     }
     r = p[l + 44 >> 2];
     o = (d | 0) < 0 ? 6 : d;
     break d;
    }
    r = i + -29 | 0;
    p[l + 44 >> 2] = r;
    b = b * 268435456;
    o = (d | 0) < 0 ? 6 : d;
   }
   w = (r | 0) < 0 ? l + 48 | 0 : l + 336 | 0;
   j = w;
   while (1) {
    d = j;
    if (b < 4294967296 & b >= 0) {
     i = ~~b >>> 0;
    } else {
     i = 0;
    }
    p[d >> 2] = i;
    j = j + 4 | 0;
    b = (b - +(i >>> 0)) * 1e9;
    if (b != 0) {
     continue;
    }
    break;
   }
   f : {
    if ((r | 0) < 1) {
     d = r;
     i = j;
     k = w;
     break f;
    }
    k = w;
    d = r;
    while (1) {
     y = (d | 0) < 29 ? d : 29;
     i = j + -4 | 0;
     g : {
      if (i >>> 0 < k >>> 0) {
       break g;
      }
      d = y;
      u = 0;
      while (1) {
       t = i;
       s = 0;
       G = u;
       u = p[i >> 2];
       m = d & 31;
       if (32 <= (d & 63) >>> 0) {
        H = u << m;
        m = 0;
       } else {
        H = (1 << m) - 1 & u >>> 32 - m;
        m = u << m;
       }
       u = G + m | 0;
       s = s + H | 0;
       s = u >>> 0 < m >>> 0 ? s + 1 | 0 : s;
       m = u;
       u = Yy(m, s, 1e9);
       G = t;
       t = Xy(u, ta, 1e9);
       p[G >> 2] = m - t;
       i = i + -4 | 0;
       if (i >>> 0 >= k >>> 0) {
        continue;
       }
       break;
      }
      d = u;
      if (!d) {
       break g;
      }
      k = k + -4 | 0;
      p[k >> 2] = d;
     }
     while (1) {
      i = j;
      if (i >>> 0 > k >>> 0) {
       j = i + -4 | 0;
       if (!p[j >> 2]) {
        continue;
       }
      }
      break;
     }
     d = p[l + 44 >> 2] - y | 0;
     p[l + 44 >> 2] = d;
     j = i;
     if ((d | 0) > 0) {
      continue;
     }
     break;
    }
   }
   if ((d | 0) <= -1) {
    A = ((o + 25 | 0) / 9 | 0) + 1 | 0;
    y = (F | 0) == 102;
    while (1) {
     u = (d | 0) < -9 ? 9 : 0 - d | 0;
     h : {
      if (k >>> 0 >= i >>> 0) {
       k = p[k >> 2] ? k : k + 4 | 0;
       break h;
      }
      t = 1e9 >>> u | 0;
      m = -1 << u ^ -1;
      d = 0;
      j = k;
      while (1) {
       G = d;
       d = p[j >> 2];
       p[j >> 2] = G + (d >>> u | 0);
       d = v(t, d & m);
       j = j + 4 | 0;
       if (j >>> 0 < i >>> 0) {
        continue;
       }
       break;
      }
      k = p[k >> 2] ? k : k + 4 | 0;
      if (!d) {
       break h;
      }
      p[i >> 2] = d;
      i = i + 4 | 0;
     }
     d = p[l + 44 >> 2] + u | 0;
     p[l + 44 >> 2] = d;
     j = y ? w : k;
     i = i - j >> 2 > (A | 0) ? j + (A << 2) | 0 : i;
     if ((d | 0) < 0) {
      continue;
     }
     break;
    }
   }
   j = 0;
   i : {
    if (k >>> 0 >= i >>> 0) {
     break i;
    }
    j = v(w - k >> 2, 9);
    d = 10;
    m = p[k >> 2];
    if (m >>> 0 < 10) {
     break i;
    }
    while (1) {
     j = j + 1 | 0;
     d = v(d, 10);
     if (m >>> 0 >= d >>> 0) {
      continue;
     }
     break;
    }
   }
   d = (o - ((F | 0) == 102 ? 0 : j) | 0) - ((F | 0) == 103 & (o | 0) != 0) | 0;
   if ((d | 0) < (v(i - w >> 2, 9) + -9 | 0)) {
    t = d + 9216 | 0;
    m = (t | 0) / 9 | 0;
    s = ((m << 2) + ((r | 0) < 0 ? l + 48 | 4 : l + 340 | 0) | 0) + -4096 | 0;
    d = 10;
    t = t - v(m, 9) | 0;
    if ((t | 0) <= 7) {
     while (1) {
      d = v(d, 10);
      t = t + 1 | 0;
      if ((t | 0) != 8) {
       continue;
      }
      break;
     }
    }
    t = p[s >> 2];
    m = (t >>> 0) / (d >>> 0) | 0;
    A = s + 4 | 0;
    y = t - v(d, m) | 0;
    j : {
     if (y ? 0 : (A | 0) == (i | 0)) {
      break j;
     }
     r = d >>> 1 | 0;
     B = y >>> 0 < r >>> 0 ? .5 : (i | 0) == (A | 0) ? (r | 0) == (y | 0) ? 1 : 1.5 : 1.5;
     b = m & 1 ? 9007199254740994 : 9007199254740992;
     if (!(q[E | 0] != 45 | D)) {
      B = -B;
      b = -b;
     }
     r = t - y | 0;
     p[s >> 2] = r;
     if (b + B == b) {
      break j;
     }
     d = d + r | 0;
     p[s >> 2] = d;
     if (d >>> 0 >= 1e9) {
      while (1) {
       p[s >> 2] = 0;
       s = s + -4 | 0;
       if (s >>> 0 < k >>> 0) {
        k = k + -4 | 0;
        p[k >> 2] = 0;
       }
       d = p[s >> 2] + 1 | 0;
       p[s >> 2] = d;
       if (d >>> 0 > 999999999) {
        continue;
       }
       break;
      }
     }
     j = v(w - k >> 2, 9);
     d = 10;
     r = p[k >> 2];
     if (r >>> 0 < 10) {
      break j;
     }
     while (1) {
      j = j + 1 | 0;
      d = v(d, 10);
      if (r >>> 0 >= d >>> 0) {
       continue;
      }
      break;
     }
    }
    d = s + 4 | 0;
    i = i >>> 0 > d >>> 0 ? d : i;
   }
   while (1) {
    m = i;
    r = i >>> 0 <= k >>> 0;
    if (!r) {
     i = m + -4 | 0;
     if (!p[i >> 2]) {
      continue;
     }
    }
    break;
   }
   k : {
    if ((F | 0) != 103) {
     D = f & 8;
     break k;
    }
    i = o ? o : 1;
    d = (i | 0) > (j | 0) & (j | 0) > -5;
    o = (d ? j ^ -1 : -1) + i | 0;
    g = (d ? -1 : -2) + g | 0;
    D = f & 8;
    if (D) {
     break k;
    }
    i = -9;
    l : {
     if (r) {
      break l;
     }
     r = p[m + -4 >> 2];
     if (!r) {
      break l;
     }
     t = 10;
     i = 0;
     if ((r >>> 0) % 10 | 0) {
      break l;
     }
     while (1) {
      d = i;
      i = i + 1 | 0;
      t = v(t, 10);
      if (!((r >>> 0) % (t >>> 0) | 0)) {
       continue;
      }
      break;
     }
     i = d ^ -1;
    }
    d = v(m - w >> 2, 9);
    if ((g & -33) == 70) {
     D = 0;
     d = (d + i | 0) + -9 | 0;
     d = (d | 0) > 0 ? d : 0;
     o = (o | 0) < (d | 0) ? o : d;
     break k;
    }
    D = 0;
    d = ((d + j | 0) + i | 0) + -9 | 0;
    d = (d | 0) > 0 ? d : 0;
    o = (o | 0) < (d | 0) ? o : d;
   }
   u = o | D;
   y = (u | 0) != 0;
   d = a;
   r = c;
   t = g & -33;
   i = (j | 0) > 0 ? j : 0;
   m : {
    if ((t | 0) == 70) {
     break m;
    }
    i = j >> 31;
    i = Rc(i + j ^ i, 0, z);
    if ((z - i | 0) <= 1) {
     while (1) {
      i = i + -1 | 0;
      n[i | 0] = 48;
      if ((z - i | 0) < 2) {
       continue;
      }
      break;
     }
    }
    A = i + -2 | 0;
    n[A | 0] = g;
    n[i + -1 | 0] = (j | 0) < 0 ? 45 : 43;
    i = z - A | 0;
   }
   s = (i + (y + (o + C | 0) | 0) | 0) + 1 | 0;
   wb(d, 32, r, s, f);
   pb(a, E, C);
   wb(a, 48, c, s, f ^ 65536);
   n : {
    o : {
     p : {
      if ((t | 0) == 70) {
       d = l + 16 | 8;
       j = l + 16 | 9;
       g = k >>> 0 > w >>> 0 ? w : k;
       k = g;
       while (1) {
        i = Rc(p[k >> 2], 0, j);
        q : {
         if ((g | 0) != (k | 0)) {
          if (i >>> 0 <= l + 16 >>> 0) {
           break q;
          }
          while (1) {
           i = i + -1 | 0;
           n[i | 0] = 48;
           if (i >>> 0 > l + 16 >>> 0) {
            continue;
           }
           break;
          }
          break q;
         }
         if ((i | 0) != (j | 0)) {
          break q;
         }
         n[l + 24 | 0] = 48;
         i = d;
        }
        pb(a, i, j - i | 0);
        k = k + 4 | 0;
        if (k >>> 0 <= w >>> 0) {
         continue;
        }
        break;
       }
       if (u) {
        pb(a, 21203, 1);
       }
       if ((o | 0) < 1 | k >>> 0 >= m >>> 0) {
        break p;
       }
       while (1) {
        i = Rc(p[k >> 2], 0, j);
        if (i >>> 0 > l + 16 >>> 0) {
         while (1) {
          i = i + -1 | 0;
          n[i | 0] = 48;
          if (i >>> 0 > l + 16 >>> 0) {
           continue;
          }
          break;
         }
        }
        pb(a, i, (o | 0) < 9 ? o : 9);
        i = o + -9 | 0;
        k = k + 4 | 0;
        if (k >>> 0 >= m >>> 0) {
         break o;
        }
        d = (o | 0) > 9;
        o = i;
        if (d) {
         continue;
        }
        break;
       }
       break o;
      }
      r : {
       if ((o | 0) < 0) {
        break r;
       }
       g = m >>> 0 > k >>> 0 ? m : k + 4 | 0;
       d = l + 16 | 8;
       r = l + 16 | 9;
       j = k;
       while (1) {
        i = Rc(p[j >> 2], 0, r);
        if ((r | 0) == (i | 0)) {
         n[l + 24 | 0] = 48;
         i = d;
        }
        s : {
         if ((k | 0) != (j | 0)) {
          if (i >>> 0 <= l + 16 >>> 0) {
           break s;
          }
          while (1) {
           i = i + -1 | 0;
           n[i | 0] = 48;
           if (i >>> 0 > l + 16 >>> 0) {
            continue;
           }
           break;
          }
          break s;
         }
         pb(a, i, 1);
         i = i + 1 | 0;
         if ((o | 0) < 1 ? !D : 0) {
          break s;
         }
         pb(a, 21203, 1);
        }
        m = i;
        i = r - i | 0;
        pb(a, m, (o | 0) > (i | 0) ? i : o);
        o = o - i | 0;
        j = j + 4 | 0;
        if (j >>> 0 >= g >>> 0) {
         break r;
        }
        if ((o | 0) > -1) {
         continue;
        }
        break;
       }
      }
      wb(a, 48, o + 18 | 0, 18, 0);
      pb(a, A, z - A | 0);
      break n;
     }
     i = o;
    }
    wb(a, 48, i + 9 | 0, 9, 0);
   }
   break b;
  }
  o = g & 32;
  w = o ? E + 9 | 0 : E;
  t : {
   if (d >>> 0 > 11) {
    break t;
   }
   i = 12 - d | 0;
   if (!i) {
    break t;
   }
   B = 8;
   while (1) {
    B = B * 16;
    i = i + -1 | 0;
    if (i) {
     continue;
    }
    break;
   }
   if (q[w | 0] == 45) {
    b = -(B + (-b - B));
    break t;
   }
   b = b + B - B;
  }
  i = p[l + 44 >> 2];
  j = i >> 31;
  i = Rc(j ^ i + j, 0, z);
  if ((z | 0) == (i | 0)) {
   n[l + 15 | 0] = 48;
   i = l + 15 | 0;
  }
  r = C | 2;
  j = p[l + 44 >> 2];
  m = i + -2 | 0;
  n[m | 0] = g + 15;
  n[i + -1 | 0] = (j | 0) < 0 ? 45 : 43;
  i = f & 8;
  k = l + 16 | 0;
  while (1) {
   g = k;
   u = o;
   if (x(b) < 2147483648) {
    j = ~~b;
   } else {
    j = -2147483648;
   }
   n[k | 0] = u | q[j + 21152 | 0];
   k = g + 1 | 0;
   b = (b - +(j | 0)) * 16;
   if (!((k - (l + 16 | 0) | 0) != 1 | (b == 0 ? !(i | (d | 0) > 0) : 0))) {
    n[g + 1 | 0] = 46;
    k = g + 2 | 0;
   }
   if (b != 0) {
    continue;
   }
   break;
  }
  g = !d | ((k - l | 0) + -18 | 0) >= (d | 0) ? ((z - (l + 16 | 0) | 0) - m | 0) + k | 0 : ((d + z | 0) - m | 0) + 2 | 0;
  s = g + r | 0;
  wb(a, 32, c, s, f);
  pb(a, w, r);
  wb(a, 48, c, s, f ^ 65536);
  d = k - (l + 16 | 0) | 0;
  pb(a, l + 16 | 0, d);
  i = d;
  d = z - m | 0;
  wb(a, 48, g - (i + d | 0) | 0, 0, 0);
  pb(a, m, d);
 }
 wb(a, 32, c, s, f ^ 8192);
 sa = l + 560 | 0;
 return ((s | 0) < (c | 0) ? c : s) | 0;
}
function Qc(a) {
 var b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0;
 e = sa - 16 | 0;
 sa = e;
 p[e + 12 >> 2] = a;
 a : {
  if (a >>> 0 <= 211) {
   a = p[Hj(21360, 21552, e + 12 | 0) >> 2];
   break a;
  }
  if (a >>> 0 >= 4294967292) {
   Nb();
   E();
  }
  f = (a >>> 0) / 210 | 0;
  d = v(f, 210);
  p[e + 8 >> 2] = a - d;
  g = Hj(21552, 21744, e + 8 | 0) - 21552 >> 2;
  b : {
   while (1) {
    a = p[(g << 2) + 21552 >> 2] + d | 0;
    d = 5;
    b = h;
    c : {
     d : {
      while (1) {
       h = b;
       if ((d | 0) == 47) {
        d = 211;
        while (1) {
         b = (a >>> 0) / (d >>> 0) | 0;
         if (b >>> 0 < d >>> 0) {
          break c;
         }
         if ((v(b, d) | 0) == (a | 0)) {
          break d;
         }
         b = d + 10 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 12 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 16 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 18 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 22 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 28 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 30 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 36 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 40 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 42 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 46 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 52 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 58 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 60 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 66 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 70 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 72 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 78 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 82 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 88 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 96 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 100 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 102 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 106 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 108 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 112 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 120 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 126 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 130 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 136 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 138 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 142 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 148 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 150 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 156 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 162 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 166 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 168 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 172 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 178 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 180 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 186 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 190 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 192 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 196 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 198 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         if ((v(b, c) | 0) == (a | 0)) {
          break d;
         }
         b = d + 208 | 0;
         c = (a >>> 0) / (b >>> 0) | 0;
         if (c >>> 0 < b >>> 0) {
          break c;
         }
         d = d + 210 | 0;
         if ((v(b, c) | 0) != (a | 0)) {
          continue;
         }
         break;
        }
        break d;
       }
       b = p[(d << 2) + 21360 >> 2];
       c = (a >>> 0) / (b >>> 0) | 0;
       i = v(b, c);
       c = c >>> 0 < b >>> 0;
       if (!c) {
        b = c ? a : h;
        d = d + 1 | 0;
        if ((a | 0) != (i | 0)) {
         continue;
        }
       }
       break;
      }
      if (c | (a | 0) != (i | 0)) {
       break b;
      }
     }
     b = g + 1 | 0;
     a = (b | 0) == 48;
     g = a ? 0 : b;
     f = a + f | 0;
     d = v(f, 210);
     continue;
    }
    break;
   }
   p[e + 12 >> 2] = a;
   break a;
  }
  p[e + 12 >> 2] = a;
  a = c ? a : h;
 }
 sa = e + 16 | 0;
 return a;
}
function zj(a, b, c) {
 a : {
  b : {
   c : {
    d : {
     e : {
      f : {
       g : {
        h : {
         i : {
          j : {
           k : {
            l : {
             m : {
              n : {
               o : {
                p : {
                 q : {
                  r : {
                   s : {
                    t : {
                     u : {
                      v : {
                       w : {
                        x : {
                         y : {
                          z : {
                           switch (b + -92 | 0) {
                           default:
                            A : {
                             switch (b + -40 | 0) {
                             default:
                              B : {
                               switch (b + -149 | 0) {
                               default:
                                if ((b | 0) == 23) {
                                 break k;
                                }
                                if ((b | 0) != 5) {
                                 break d;
                                }
                                yj(a, c);
                                return;
                               case 2:
                               case 6:
                                break a;
                               case 11:
                                break v;
                               case 9:
                                break w;
                               case 3:
                                break x;
                               case 7:
                                break y;
                               case 0:
                                break B;
                               case 1:
                               case 4:
                               case 5:
                               case 8:
                               case 10:
                                break d;
                               }
                              }
                              if (p[a + 16 >> 2] != (c | 0)) {
                               p[a + 16 >> 2] = c;
                               m[p[p[a >> 2] + 32 >> 2]](a);
                              }
                              return;
                             case 28:
                              xj(a, c);
                              return;
                             case 11:
                             case 13:
                             case 27:
                              break a;
                             case 0:
                              break m;
                             case 9:
                              break o;
                             case 8:
                              break p;
                             case 21:
                              break q;
                             case 20:
                              break r;
                             case 19:
                              break s;
                             case 17:
                              break t;
                             case 16:
                              break u;
                             case 29:
                              break A;
                             case 1:
                             case 2:
                             case 3:
                             case 4:
                             case 5:
                             case 6:
                             case 7:
                             case 10:
                             case 12:
                             case 14:
                             case 15:
                             case 18:
                             case 22:
                             case 23:
                             case 24:
                             case 25:
                             case 26:
                              break d;
                             }
                            }
                            wj(a, c);
                            return;
                           case 37:
                            break j;
                           case 36:
                            break l;
                           case 25:
                            break n;
                           case 1:
                           case 11:
                           case 28:
                            break b;
                           case 30:
                            break z;
                           case 0:
                           case 3:
                           case 10:
                           case 27:
                           case 29:
                            break c;
                           case 2:
                           case 4:
                           case 5:
                           case 6:
                           case 7:
                           case 8:
                           case 9:
                           case 12:
                           case 13:
                           case 14:
                           case 15:
                           case 16:
                           case 17:
                           case 22:
                           case 23:
                           case 24:
                           case 26:
                           case 31:
                           case 32:
                           case 34:
                           case 35:
                            break d;
                           case 21:
                            break e;
                           case 20:
                            break f;
                           case 19:
                            break g;
                           case 18:
                            break h;
                           case 33:
                            break i;
                           }
                          }
                          lk(a, c);
                          return;
                         }
                         if (p[a + 8 >> 2] != (c | 0)) {
                          p[a + 8 >> 2] = c;
                          m[p[p[a >> 2] + 44 >> 2]](a);
                         }
                         return;
                        }
                        xj(a, c);
                        return;
                       }
                       wj(a, c);
                       return;
                      }
                      if (p[a + 16 >> 2] != (c | 0)) {
                       p[a + 16 >> 2] = c;
                       m[p[p[a >> 2] + 44 >> 2]](a);
                      }
                      return;
                     }
                     yj(a, c);
                     return;
                    }
                    if (p[a + 20 >> 2] != (c | 0)) {
                     p[a + 20 >> 2] = c;
                     m[p[p[a >> 2] + 40 >> 2]](a);
                    }
                    return;
                   }
                   if (p[a + 28 >> 2] != (c | 0)) {
                    p[a + 28 >> 2] = c;
                    m[p[p[a >> 2] + 48 >> 2]](a);
                   }
                   return;
                  }
                  if (p[a + 32 >> 2] != (c | 0)) {
                   p[a + 32 >> 2] = c;
                   m[p[p[a >> 2] + 52 >> 2]](a);
                  }
                  return;
                 }
                 if (p[a + 36 >> 2] != (c | 0)) {
                  p[a + 36 >> 2] = c;
                  m[p[p[a >> 2] + 56 >> 2]](a);
                 }
                 return;
                }
                if (p[a + 60 >> 2] != (c | 0)) {
                 p[a + 60 >> 2] = c;
                 m[p[p[a >> 2] + 72 >> 2]](a);
                }
                return;
               }
               if (p[a + 64 >> 2] != (c | 0)) {
                p[a + 64 >> 2] = c;
                m[p[p[a >> 2] + 76 >> 2]](a);
               }
               return;
              }
              if (p[a + 60 >> 2] != (c | 0)) {
               p[a + 60 >> 2] = c;
               m[p[p[a >> 2] + 64 >> 2]](a);
              }
              return;
             }
             if (p[a + 56 >> 2] != (c | 0)) {
              p[a + 56 >> 2] = c;
              m[p[p[a >> 2] + 68 >> 2]](a);
             }
             return;
            }
            vj(a, c);
            return;
           }
           vj(a, c);
           return;
          }
          if (p[a + 132 >> 2] != (c | 0)) {
           p[a + 132 >> 2] = c;
           m[p[p[a >> 2] + 92 >> 2]](a);
          }
          return;
         }
         if (p[a + 168 >> 2] != (c | 0)) {
          p[a + 168 >> 2] = c;
          m[p[p[a >> 2] + 120 >> 2]](a);
         }
         return;
        }
        if (p[a + 64 >> 2] != (c | 0)) {
         p[a + 64 >> 2] = c;
         m[p[p[a >> 2] + 60 >> 2]](a);
        }
        return;
       }
       if (p[a + 68 >> 2] != (c | 0)) {
        p[a + 68 >> 2] = c;
        m[p[p[a >> 2] + 64 >> 2]](a);
       }
       return;
      }
      if (p[a + 72 >> 2] != (c | 0)) {
       p[a + 72 >> 2] = c;
       m[p[p[a >> 2] + 68 >> 2]](a);
      }
      return;
     }
     if (p[a + 76 >> 2] != (c | 0)) {
      p[a + 76 >> 2] = c;
      m[p[p[a >> 2] + 72 >> 2]](a);
     }
    }
    return;
   }
   Zf(a, c);
   return;
  }
  if (p[a + 52 >> 2] != (c | 0)) {
   p[a + 52 >> 2] = c;
   m[p[p[a >> 2] + 56 >> 2]](a);
  }
  return;
 }
 if (p[a + 4 >> 2] != (c | 0)) {
  p[a + 4 >> 2] = c;
  m[p[p[a >> 2] + 32 >> 2]](a);
 }
}
function En(a) {
 var b = 0;
 a : {
  b : {
   switch (a + -1 | 0) {
   case 47:
    a = cb(La(68), 0, 68);
    kh(a);
    break a;
   case 60:
    a = La(24);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 16 >> 2] = 0;
    p[a + 20 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    gd(a);
    p[a + 16 >> 2] = -1;
    p[a >> 2] = 8696;
    p[a >> 2] = 8652;
    break a;
   case 24:
    a = La(20);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 16 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    Pb(a);
    p[a + 4 >> 2] = 0;
    p[a >> 2] = 8740;
    p[a >> 2] = 1088;
    $a(a + 8 | 0);
    break a;
   case 55:
    a = La(20);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 16 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    De(a);
    p[a + 16 >> 2] = 0;
    p[a >> 2] = 8832;
    p[a >> 2] = 8784;
    break a;
   case 67:
    a = La(8);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    Hg(a);
    p[a >> 2] = 8968;
    p[a >> 2] = 2580;
    break a;
   case 25:
    a = La(20);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 16 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    Pb(a);
    p[a + 4 >> 2] = 0;
    p[a >> 2] = 9064;
    p[a >> 2] = 1200;
    $a(a + 8 | 0);
    break a;
   case 49:
    a = La(28);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 24 >> 2] = 0;
    p[a + 16 >> 2] = 0;
    p[a + 20 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    Ce(a);
    p[a + 24 >> 2] = -1;
    p[a >> 2] = 9108;
    p[a >> 2] = 1500;
    break a;
   case 69:
    a = La(16);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    Gg(a);
    p[a + 12 >> 2] = 0;
    p[a >> 2] = 9224;
    p[a >> 2] = 2520;
    break a;
   case 61:
    a = La(16);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    gd(a);
    p[a >> 2] = 9436;
    p[a >> 2] = 9396;
    break a;
   case 56:
    a = cb(La(40), 0, 40);
    tn(a);
    break a;
   case 26:
    a = La(16);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    Fe(a);
    break a;
   case 27:
    a = cb(La(64), 0, 64);
    Pb(a);
    p[a + 12 >> 2] = 1058306785;
    p[a + 16 >> 2] = 1065353216;
    p[a + 4 >> 2] = 1054280253;
    p[a + 8 >> 2] = 0;
    p[a >> 2] = 9564;
    p[a >> 2] = 1032;
    break a;
   case 64:
    a = cb(La(36), 0, 36);
    Fi(a);
    p[a + 12 >> 2] = 0;
    p[a + 16 >> 2] = 0;
    p[a + 4 >> 2] = -1;
    p[a + 8 >> 2] = 0;
    p[a >> 2] = 9620;
    p[a + 20 >> 2] = 0;
    p[a >> 2] = 2288;
    $a(a + 24 | 0);
    break a;
   case 29:
    a = La(28);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 24 >> 2] = 0;
    p[a + 16 >> 2] = 0;
    p[a + 20 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    Ce(a);
    p[a + 24 >> 2] = 0;
    p[a >> 2] = 9676;
    p[a >> 2] = 1436;
    break a;
   case 36:
    a = La(28);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 24 >> 2] = 0;
    p[a + 16 >> 2] = 0;
    p[a + 20 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    Ce(a);
    p[a + 24 >> 2] = 0;
    p[a >> 2] = 9740;
    p[a >> 2] = 1372;
    break a;
   case 52:
    a = cb(La(40), 0, 40);
    sn(a);
    break a;
   case 62:
    a = La(16);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    gd(a);
    p[a >> 2] = 9888;
    p[a >> 2] = 9848;
    break a;
   case 30:
    a = cb(La(56), 0, 56);
    nn(a);
    p[a >> 2] = 1672;
    $a(a + 44 | 0);
    break a;
   case 57:
    a = La(16);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    De(a);
    p[a >> 2] = 10044;
    p[a >> 2] = 1e4;
    break a;
   case 63:
    a = La(16);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    gd(a);
    p[a >> 2] = 10128;
    p[a >> 2] = 10088;
    break a;
   case 70:
    a = La(12);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    Gg(a);
    p[a >> 2] = 10168;
    p[a >> 2] = 2412;
    break a;
   case 58:
    a = La(20);
    p[a >> 2] = 0;
    p[a + 4 >> 2] = 0;
    p[a + 16 >> 2] = 0;
    p[a + 8 >> 2] = 0;
    p[a + 12 >> 2] = 0;
    De(a);
    n[a + 16 | 0] = 0;
    p[a >> 2] = 10272;
    p[a >> 2] = 10224;
    break a;
   case 21:
    a = cb(La(100), 0, 100);
    Ng(a);
    break a;
   case 16:
    a = cb(La(100), 0, 100);
    Ng(a);
    p[a + 68 >> 2] = 10500;
    p[a >> 2] = 10412;
    p[a + 68 >> 2] = 13564;
    p[a >> 2] = 13476;
    break a;
   case 23:
    a = cb(La(76), 0, 76);
    Dg(a);
    n[a + 68 | 0] = 1;
    p[a + 64 >> 2] = 0;
    p[a + 56 >> 2] = 1065353216;
    p[a + 60 >> 2] = 0;
    p[a >> 2] = 10512;
    p[a + 72 >> 2] = 0;
    p[a >> 2] = 13732;
    break a;
   case 17:
    a = cb(La(64), 0, 64);
    Wb(a);
    p[a + 48 >> 2] = -9145228;
    p[a >> 2] = 10668;
    b = Kg(a + 52 | 0);
    p[a >> 2] = 13652;
    p[b >> 2] = 13720;
    break a;
   case 18:
    a = cb(La(56), 0, 56);
    Wb(a);
    p[a + 48 >> 2] = -1;
    p[a + 52 >> 2] = 0;
    p[a >> 2] = 10732;
    p[a >> 2] = 13240;
    break a;
   case 46:
    a = La(76);
    xl(a);
    break a;
   case 19:
    a = cb(La(60), 0, 60);
    Dg(a);
    p[a + 56 >> 2] = 0;
    p[a >> 2] = 10800;
    p[a >> 2] = 13160;
    break a;
   case 1:
    a = cb(La(128), 0, 128);
    pf(a);
    break a;
   case 2:
    a = La(252);
    op(a);
    break a;
   case 4:
    a = cb(La(64), 0, 64);
    Vb(a);
    break a;
   case 33:
    a = cb(La(92), 0, 92);
    nf(a);
    p[a + 88 >> 2] = 0;
    p[a + 80 >> 2] = 0;
    p[a + 84 >> 2] = 0;
    p[a >> 2] = 10880;
    p[a >> 2] = 3788;
    break a;
   case 15:
    a = cb(La(164), 0, 164);
    oi(a);
    n[a + 152 | 0] = 0;
    p[a >> 2] = 10972;
    b = a + 156 | 0;
    p[b + 4 >> 2] = 0;
    p[b >> 2] = 11088;
    p[a >> 2] = 5888;
    p[b >> 2] = 6008;
    break a;
   case 6:
    a = La(428);
    up(a);
    break a;
   case 34:
    a = cb(La(88), 0, 88);
    nf(a);
    p[a + 80 >> 2] = 0;
    p[a + 84 >> 2] = 0;
    p[a >> 2] = 11100;
    p[a >> 2] = 3976;
    break a;
   case 7:
    a = La(360);
    To(a);
    break a;
   case 3:
    a = La(552);
    jr(a);
    break a;
   case 41:
    a = cb(La(80), 0, 80);
    Wb(a);
    n[a + 56 | 0] = 1;
    p[a + 48 >> 2] = -1;
    p[a + 52 >> 2] = 0;
    p[a >> 2] = 11188;
    p[a >> 2] = 3648;
    $a(a + 60 | 0);
    p[a + 72 >> 2] = 0;
    p[a + 76 >> 2] = 0;
    break a;
   case 50:
    a = La(176);
    Ch(a);
    break a;
   case 51:
    a = La(180);
    Ch(a);
    p[a + 176 >> 2] = 1056964608;
    p[a >> 2] = 7324;
    p[a >> 2] = 7176;
    break a;
   case 5:
    a = cb(La(96), 0, 96);
    ad(a);
    break a;
   case 48:
    a = cb(La(56), 0, 56);
    rc(a);
    p[a + 48 >> 2] = -1;
    p[a >> 2] = 11260;
    p[a + 52 >> 2] = 0;
    p[a >> 2] = 8264;
    break a;
   case 0:
    a = cb(La(180), 0, 180);
    rn(a);
    break a;
   case 22:
    a = La(4);
    p[a >> 2] = 0;
    Pb(a);
    p[a >> 2] = 11460;
    p[a >> 2] = 11420;
    break a;
   case 44:
    a = cb(La(64), 0, 64);
    Mg(a);
    break a;
   case 39:
    a = cb(La(136), 0, 136);
    Lg(a);
    break a;
   case 40:
    a = cb(La(144), 0, 144);
    Lg(a);
    p[a + 136 >> 2] = 0;
    p[a + 140 >> 2] = 0;
    p[a >> 2] = 11836;
    p[a >> 2] = 2840;
    break a;
   case 42:
    a = cb(La(116), 0, 116);
    qn(a);
    break a;
   case 43:
    a = cb(La(104), 0, 104);
    ln(a);
    p[a >> 2] = 3092;
    tb(a + 76 | 0);
    p[a + 100 >> 2] = 0;
    break a;
   case 45:
    b = La(96);
    pn(cb(b, 0, 96));
    break;
   default:
    break b;
   }
  }
  return b;
 }
 return a;
}
function Ua(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 a : {
  if (!a) {
   break a;
  }
  d = a + -8 | 0;
  c = p[a + -4 >> 2];
  a = c & -8;
  f = d + a | 0;
  b : {
   if (c & 1) {
    break b;
   }
   if (!(c & 3)) {
    break a;
   }
   c = p[d >> 2];
   d = d - c | 0;
   if (d >>> 0 < s[5688]) {
    break a;
   }
   a = a + c | 0;
   if (p[5689] != (d | 0)) {
    if (c >>> 0 <= 255) {
     e = p[d + 8 >> 2];
     c = c >>> 3 | 0;
     b = p[d + 12 >> 2];
     if ((b | 0) == (e | 0)) {
      i = 22736, j = p[5684] & Zy(c), p[i >> 2] = j;
      break b;
     }
     p[e + 12 >> 2] = b;
     p[b + 8 >> 2] = e;
     break b;
    }
    h = p[d + 24 >> 2];
    c = p[d + 12 >> 2];
    c : {
     if ((d | 0) != (c | 0)) {
      b = p[d + 8 >> 2];
      p[b + 12 >> 2] = c;
      p[c + 8 >> 2] = b;
      break c;
     }
     d : {
      e = d + 20 | 0;
      b = p[e >> 2];
      if (b) {
       break d;
      }
      e = d + 16 | 0;
      b = p[e >> 2];
      if (b) {
       break d;
      }
      c = 0;
      break c;
     }
     while (1) {
      g = e;
      c = b;
      e = c + 20 | 0;
      b = p[e >> 2];
      if (b) {
       continue;
      }
      e = c + 16 | 0;
      b = p[c + 16 >> 2];
      if (b) {
       continue;
      }
      break;
     }
     p[g >> 2] = 0;
    }
    if (!h) {
     break b;
    }
    e = p[d + 28 >> 2];
    b = (e << 2) + 23040 | 0;
    e : {
     if (p[b >> 2] == (d | 0)) {
      p[b >> 2] = c;
      if (c) {
       break e;
      }
      i = 22740, j = p[5685] & Zy(e), p[i >> 2] = j;
      break b;
     }
     p[h + (p[h + 16 >> 2] == (d | 0) ? 16 : 20) >> 2] = c;
     if (!c) {
      break b;
     }
    }
    p[c + 24 >> 2] = h;
    b = p[d + 16 >> 2];
    if (b) {
     p[c + 16 >> 2] = b;
     p[b + 24 >> 2] = c;
    }
    b = p[d + 20 >> 2];
    if (!b) {
     break b;
    }
    p[c + 20 >> 2] = b;
    p[b + 24 >> 2] = c;
    break b;
   }
   c = p[f + 4 >> 2];
   if ((c & 3) != 3) {
    break b;
   }
   p[5686] = a;
   p[f + 4 >> 2] = c & -2;
   p[d + 4 >> 2] = a | 1;
   p[a + d >> 2] = a;
   return;
  }
  if (f >>> 0 <= d >>> 0) {
   break a;
  }
  c = p[f + 4 >> 2];
  if (!(c & 1)) {
   break a;
  }
  f : {
   if (!(c & 2)) {
    if (p[5690] == (f | 0)) {
     p[5690] = d;
     a = p[5687] + a | 0;
     p[5687] = a;
     p[d + 4 >> 2] = a | 1;
     if (p[5689] != (d | 0)) {
      break a;
     }
     p[5686] = 0;
     p[5689] = 0;
     return;
    }
    if (p[5689] == (f | 0)) {
     p[5689] = d;
     a = p[5686] + a | 0;
     p[5686] = a;
     p[d + 4 >> 2] = a | 1;
     p[a + d >> 2] = a;
     return;
    }
    a = (c & -8) + a | 0;
    g : {
     if (c >>> 0 <= 255) {
      b = p[f + 8 >> 2];
      c = c >>> 3 | 0;
      e = p[f + 12 >> 2];
      if ((b | 0) == (e | 0)) {
       i = 22736, j = p[5684] & Zy(c), p[i >> 2] = j;
       break g;
      }
      p[b + 12 >> 2] = e;
      p[e + 8 >> 2] = b;
      break g;
     }
     h = p[f + 24 >> 2];
     c = p[f + 12 >> 2];
     h : {
      if ((f | 0) != (c | 0)) {
       b = p[f + 8 >> 2];
       p[b + 12 >> 2] = c;
       p[c + 8 >> 2] = b;
       break h;
      }
      i : {
       e = f + 20 | 0;
       b = p[e >> 2];
       if (b) {
        break i;
       }
       e = f + 16 | 0;
       b = p[e >> 2];
       if (b) {
        break i;
       }
       c = 0;
       break h;
      }
      while (1) {
       g = e;
       c = b;
       e = c + 20 | 0;
       b = p[e >> 2];
       if (b) {
        continue;
       }
       e = c + 16 | 0;
       b = p[c + 16 >> 2];
       if (b) {
        continue;
       }
       break;
      }
      p[g >> 2] = 0;
     }
     if (!h) {
      break g;
     }
     e = p[f + 28 >> 2];
     b = (e << 2) + 23040 | 0;
     j : {
      if (p[b >> 2] == (f | 0)) {
       p[b >> 2] = c;
       if (c) {
        break j;
       }
       i = 22740, j = p[5685] & Zy(e), p[i >> 2] = j;
       break g;
      }
      p[h + (p[h + 16 >> 2] == (f | 0) ? 16 : 20) >> 2] = c;
      if (!c) {
       break g;
      }
     }
     p[c + 24 >> 2] = h;
     b = p[f + 16 >> 2];
     if (b) {
      p[c + 16 >> 2] = b;
      p[b + 24 >> 2] = c;
     }
     b = p[f + 20 >> 2];
     if (!b) {
      break g;
     }
     p[c + 20 >> 2] = b;
     p[b + 24 >> 2] = c;
    }
    p[d + 4 >> 2] = a | 1;
    p[a + d >> 2] = a;
    if (p[5689] != (d | 0)) {
     break f;
    }
    p[5686] = a;
    return;
   }
   p[f + 4 >> 2] = c & -2;
   p[d + 4 >> 2] = a | 1;
   p[a + d >> 2] = a;
  }
  if (a >>> 0 <= 255) {
   a = a >>> 3 | 0;
   c = (a << 3) + 22776 | 0;
   b = p[5684];
   a = 1 << a;
   k : {
    if (!(b & a)) {
     p[5684] = a | b;
     a = c;
     break k;
    }
    a = p[c + 8 >> 2];
   }
   p[c + 8 >> 2] = d;
   p[a + 12 >> 2] = d;
   p[d + 12 >> 2] = c;
   p[d + 8 >> 2] = a;
   return;
  }
  p[d + 16 >> 2] = 0;
  p[d + 20 >> 2] = 0;
  f = d;
  e = a >>> 8 | 0;
  b = 0;
  l : {
   if (!e) {
    break l;
   }
   b = 31;
   if (a >>> 0 > 16777215) {
    break l;
   }
   c = e;
   e = e + 1048320 >>> 16 & 8;
   b = c << e;
   h = b + 520192 >>> 16 & 4;
   b = b << h;
   g = b + 245760 >>> 16 & 2;
   b = (b << g >>> 15 | 0) - (g | (e | h)) | 0;
   b = (b << 1 | a >>> b + 21 & 1) + 28 | 0;
  }
  p[f + 28 >> 2] = b;
  g = (b << 2) + 23040 | 0;
  m : {
   n : {
    e = p[5685];
    c = 1 << b;
    o : {
     if (!(e & c)) {
      p[5685] = c | e;
      p[g >> 2] = d;
      p[d + 24 >> 2] = g;
      break o;
     }
     e = a << ((b | 0) == 31 ? 0 : 25 - (b >>> 1 | 0) | 0);
     c = p[g >> 2];
     while (1) {
      b = c;
      if ((p[c + 4 >> 2] & -8) == (a | 0)) {
       break n;
      }
      c = e >>> 29 | 0;
      e = e << 1;
      g = b + (c & 4) | 0;
      c = p[g + 16 >> 2];
      if (c) {
       continue;
      }
      break;
     }
     p[g + 16 >> 2] = d;
     p[d + 24 >> 2] = b;
    }
    p[d + 12 >> 2] = d;
    p[d + 8 >> 2] = d;
    break m;
   }
   a = p[b + 8 >> 2];
   p[a + 12 >> 2] = d;
   p[b + 8 >> 2] = d;
   p[d + 24 >> 2] = 0;
   p[d + 12 >> 2] = b;
   p[d + 8 >> 2] = a;
  }
  a = p[5692] + -1 | 0;
  p[5692] = a;
  if (a) {
   break a;
  }
  d = 23192;
  while (1) {
   a = p[d >> 2];
   d = a + 8 | 0;
   if (a) {
    continue;
   }
   break;
  }
  p[5692] = -1;
 }
}
function vv(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, q = 0, r = 0, s = 0, t = 0, w = 0, y = 0;
 g = sa - 560 | 0;
 sa = g;
 e = c;
 c = (c + -3 | 0) / 24 | 0;
 q = (c | 0) > 0 ? c : 0;
 k = e + v(q, -24) | 0;
 i = p[4452];
 if ((i | 0) >= 0) {
  e = i + 1 | 0;
  c = q;
  while (1) {
   u[(g + 320 | 0) + (f << 3) >> 3] = (c | 0) < 0 ? 0 : +p[(c << 2) + 17824 >> 2];
   c = c + 1 | 0;
   f = f + 1 | 0;
   if ((e | 0) != (f | 0)) {
    continue;
   }
   break;
  }
 }
 m = k + -24 | 0;
 e = 0;
 f = (i | 0) > 0 ? i : 0;
 while (1) {
  c = 0;
  d = 0;
  while (1) {
   d = d + u[(c << 3) + a >> 3] * u[(g + 320 | 0) + (e - c << 3) >> 3];
   c = c + 1 | 0;
   if ((c | 0) != 1) {
    continue;
   }
   break;
  }
  u[(e << 3) + g >> 3] = d;
  c = (e | 0) == (f | 0);
  e = e + 1 | 0;
  if (!c) {
   continue;
  }
  break;
 }
 w = 47 - k | 0;
 r = 48 - k | 0;
 y = k + -25 | 0;
 e = i;
 a : {
  while (1) {
   d = u[(e << 3) + g >> 3];
   c = 0;
   f = e;
   l = (e | 0) < 1;
   if (!l) {
    while (1) {
     j = (g + 480 | 0) + (c << 2) | 0;
     n = d;
     d = d * 5.960464477539063e-8;
     b : {
      if (x(d) < 2147483648) {
       h = ~~d;
       break b;
      }
      h = -2147483648;
     }
     d = +(h | 0);
     n = n + d * -16777216;
     c : {
      if (x(n) < 2147483648) {
       h = ~~n;
       break c;
      }
      h = -2147483648;
     }
     p[j >> 2] = h;
     f = f + -1 | 0;
     d = u[(f << 3) + g >> 3] + d;
     c = c + 1 | 0;
     if ((e | 0) != (c | 0)) {
      continue;
     }
     break;
    }
   }
   d = ce(d, m);
   d = d + B(d * .125) * -8;
   d : {
    if (x(d) < 2147483648) {
     h = ~~d;
     break d;
    }
    h = -2147483648;
   }
   d = d - +(h | 0);
   e : {
    f : {
     g : {
      s = (m | 0) < 1;
      h : {
       if (!s) {
        f = (e << 2) + g | 0;
        j = p[f + 476 >> 2];
        c = j >> r;
        o = f;
        f = j - (c << r) | 0;
        p[o + 476 >> 2] = f;
        h = c + h | 0;
        j = f >> w;
        break h;
       }
       if (m) {
        break g;
       }
       j = p[((e << 2) + g | 0) + 476 >> 2] >> 23;
      }
      if ((j | 0) < 1) {
       break e;
      }
      break f;
     }
     j = 2;
     if (!(d >= .5 ^ 1)) {
      break f;
     }
     j = 0;
     break e;
    }
    c = 0;
    f = 0;
    if (!l) {
     while (1) {
      o = (g + 480 | 0) + (c << 2) | 0;
      t = p[o >> 2];
      l = 16777215;
      i : {
       j : {
        if (f) {
         break j;
        }
        l = 16777216;
        if (t) {
         break j;
        }
        f = 0;
        break i;
       }
       p[o >> 2] = l - t;
       f = 1;
      }
      c = c + 1 | 0;
      if ((e | 0) != (c | 0)) {
       continue;
      }
      break;
     }
    }
    k : {
     if (s) {
      break k;
     }
     l : {
      switch (y | 0) {
      case 0:
       c = (e << 2) + g | 0;
       p[c + 476 >> 2] = p[c + 476 >> 2] & 8388607;
       break k;
      case 1:
       break l;
      default:
       break k;
      }
     }
     c = (e << 2) + g | 0;
     p[c + 476 >> 2] = p[c + 476 >> 2] & 4194303;
    }
    h = h + 1 | 0;
    if ((j | 0) != 2) {
     break e;
    }
    d = 1 - d;
    j = 2;
    if (!f) {
     break e;
    }
    d = d - ce(1, m);
   }
   if (d == 0) {
    f = 0;
    m : {
     c = e;
     if ((c | 0) <= (i | 0)) {
      break m;
     }
     while (1) {
      c = c + -1 | 0;
      f = p[(g + 480 | 0) + (c << 2) >> 2] | f;
      if ((c | 0) > (i | 0)) {
       continue;
      }
      break;
     }
     if (!f) {
      break m;
     }
     k = m;
     while (1) {
      k = k + -24 | 0;
      e = e + -1 | 0;
      if (!p[(g + 480 | 0) + (e << 2) >> 2]) {
       continue;
      }
      break;
     }
     break a;
    }
    c = 1;
    while (1) {
     f = c;
     c = c + 1 | 0;
     if (!p[(g + 480 | 0) + (i - f << 2) >> 2]) {
      continue;
     }
     break;
    }
    f = e + f | 0;
    while (1) {
     h = e + 1 | 0;
     e = e + 1 | 0;
     u[(g + 320 | 0) + (h << 3) >> 3] = p[(q + e << 2) + 17824 >> 2];
     c = 0;
     d = 0;
     while (1) {
      d = d + u[(c << 3) + a >> 3] * u[(g + 320 | 0) + (h - c << 3) >> 3];
      c = c + 1 | 0;
      if ((c | 0) != 1) {
       continue;
      }
      break;
     }
     u[(e << 3) + g >> 3] = d;
     if ((e | 0) < (f | 0)) {
      continue;
     }
     break;
    }
    e = f;
    continue;
   }
   break;
  }
  d = ce(d, 0 - m | 0);
  n : {
   if (!(d >= 16777216 ^ 1)) {
    f = (g + 480 | 0) + (e << 2) | 0;
    n = d;
    d = d * 5.960464477539063e-8;
    o : {
     if (x(d) < 2147483648) {
      c = ~~d;
      break o;
     }
     c = -2147483648;
    }
    d = n + +(c | 0) * -16777216;
    p : {
     if (x(d) < 2147483648) {
      a = ~~d;
      break p;
     }
     a = -2147483648;
    }
    p[f >> 2] = a;
    e = e + 1 | 0;
    break n;
   }
   if (x(d) < 2147483648) {
    c = ~~d;
   } else {
    c = -2147483648;
   }
   k = m;
  }
  p[(g + 480 | 0) + (e << 2) >> 2] = c;
 }
 d = ce(1, k);
 q : {
  if ((e | 0) <= -1) {
   break q;
  }
  c = e;
  while (1) {
   u[(c << 3) + g >> 3] = d * +p[(g + 480 | 0) + (c << 2) >> 2];
   d = d * 5.960464477539063e-8;
   a = (c | 0) > 0;
   c = c + -1 | 0;
   if (a) {
    continue;
   }
   break;
  }
  l = 0;
  if ((e | 0) < 0) {
   break q;
  }
  a = (i | 0) > 0 ? i : 0;
  f = e;
  while (1) {
   k = a >>> 0 < l >>> 0 ? a : l;
   m = e - f | 0;
   c = 0;
   d = 0;
   while (1) {
    d = d + u[(c << 3) + 20592 >> 3] * u[(c + f << 3) + g >> 3];
    i = (c | 0) != (k | 0);
    c = c + 1 | 0;
    if (i) {
     continue;
    }
    break;
   }
   u[(g + 160 | 0) + (m << 3) >> 3] = d;
   f = f + -1 | 0;
   c = (e | 0) != (l | 0);
   l = l + 1 | 0;
   if (c) {
    continue;
   }
   break;
  }
 }
 d = 0;
 if ((e | 0) >= 0) {
  while (1) {
   d = d + u[(g + 160 | 0) + (e << 3) >> 3];
   a = (e | 0) > 0;
   e = e + -1 | 0;
   if (a) {
    continue;
   }
   break;
  }
 }
 u[b >> 3] = j ? -d : d;
 sa = g + 560 | 0;
 return h & 7;
}
function Mo(a) {
 var b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, n = 0, o = 0;
 b = sa - 192 | 0;
 sa = b;
 c = a + 76 | 0;
 n = a, o = Yc(c, 0), p[n + 168 >> 2] = o;
 n = a, o = Yc(c, 0), p[n + 172 >> 2] = o;
 f = a + 92 | 0;
 n = b, o = Ma(f), p[n + 80 >> 2] = o;
 n = b, o = Na(f), p[n + 40 >> 2] = o;
 g = a + 72 | 0;
 while (1) {
  a : {
   d = Oa(b + 80 | 0, b + 40 | 0);
   if (!d) {
    break a;
   }
   c = p[p[b + 80 >> 2] >> 2];
   if (c) {
    c = m[p[p[c >> 2] + 20 >> 2]](c, g) | 0;
    if (!Jc(c)) {
     break a;
    }
   }
   Pa(b + 80 | 0);
   continue;
  }
  break;
 }
 b : {
  if (d) {
   break b;
  }
  h = a + 104 | 0;
  n = b, o = Ma(h), p[n + 80 >> 2] = o;
  n = b, o = Na(h), p[n + 40 >> 2] = o;
  while (1) {
   c : {
    e = Oa(b + 80 | 0, b + 40 | 0);
    if (!e) {
     d = c;
     break c;
    }
    d = p[p[b + 80 >> 2] >> 2];
    d = m[p[p[d >> 2] + 20 >> 2]](d, g) | 0;
    if (!Jc(d)) {
     break c;
    }
    Pa(b + 80 | 0);
    continue;
   }
   break;
  }
  if (e) {
   c = d;
   break b;
  }
  i = a + 116 | 0;
  n = b, o = Ma(i), p[n + 80 >> 2] = o;
  n = b, o = Na(i), p[n + 40 >> 2] = o;
  while (1) {
   d : {
    c = Oa(b + 80 | 0, b + 40 | 0);
    if (!c) {
     e = d;
     break d;
    }
    e = p[p[b + 80 >> 2] >> 2];
    e = m[p[p[e >> 2] + 20 >> 2]](e, g) | 0;
    if (!Jc(e)) {
     break d;
    }
    Pa(b + 80 | 0);
    continue;
   }
   break;
  }
  if (c) {
   c = e;
   break b;
  }
  j = Re(b + 168 | 0);
  n = b, o = Ma(f), p[n + 80 >> 2] = o;
  n = b, o = Na(f), p[n + 40 >> 2] = o;
  l = p[5164];
  while (1) {
   e : {
    k = Oa(b + 80 | 0, b + 40 | 0);
    if (!k) {
     c = e;
     break e;
    }
    d = p[p[b + 80 >> 2] >> 2];
    f : {
     if (!d) {
      break f;
     }
     c = m[p[p[d >> 2] + 24 >> 2]](d, g) | 0;
     if (!Jc(c)) {
      break e;
     }
     if (!(m[p[p[d >> 2] + 12 >> 2]](d, 49) | 0)) {
      break f;
     }
     c = m[p[p[a >> 2] + 76 >> 2]](a, p[d + 16 >> 2]) | 0;
     p[b + 24 >> 2] = c;
     if (c) {
      n = Lo(j, b + 24 | 0), o = d, p[n >> 2] = o;
      break f;
     }
     p[b >> 2] = p[d + 16 >> 2];
     Sf(l, 7896, b);
    }
    Pa(b + 80 | 0);
    continue;
   }
   break;
  }
  g : {
   if (k) {
    break g;
   }
   n = b, o = Ma(h), p[n + 80 >> 2] = o;
   n = b, o = Na(h), p[n + 40 >> 2] = o;
   while (1) {
    h : {
     e = Oa(b + 80 | 0, b + 40 | 0);
     if (!e) {
      d = c;
      break h;
     }
     d = p[p[b + 80 >> 2] >> 2];
     d = m[p[p[d >> 2] + 24 >> 2]](d, g) | 0;
     if (!Jc(d)) {
      break h;
     }
     Pa(b + 80 | 0);
     continue;
    }
    break;
   }
   if (e) {
    c = d;
    break g;
   }
   n = b, o = Ma(i), p[n + 80 >> 2] = o;
   n = b, o = Na(i), p[n + 40 >> 2] = o;
   while (1) {
    i : {
     e = Oa(b + 80 | 0, b + 40 | 0);
     if (!e) {
      c = d;
      break i;
     }
     c = p[p[b + 80 >> 2] >> 2];
     c = m[p[p[c >> 2] + 24 >> 2]](c, g) | 0;
     if (!Jc(c)) {
      break i;
     }
     Pa(b + 80 | 0);
     continue;
    }
    break;
   }
   if (e) {
    break g;
   }
   n = b, o = Ma(f), p[n + 80 >> 2] = o;
   n = b, o = Na(f), p[n + 40 >> 2] = o;
   d = a + 140 | 0;
   while (1) {
    j : {
     k : {
      if (!Oa(b + 80 | 0, b + 40 | 0)) {
       Ko(a);
       d = kh(b + 80 | 0);
       n = b, o = Ma(f), p[n + 40 >> 2] = o;
       n = b, o = Na(f), p[n + 24 >> 2] = o;
       break k;
      }
      c = p[p[b + 80 >> 2] >> 2];
      if (!c) {
       break j;
      }
      if (m[p[p[c >> 2] + 12 >> 2]](c, 10) | 0) {
       m[p[p[c >> 2] + 40 >> 2]](c);
      }
      if (!zf(c)) {
       break j;
      }
      p[b + 24 >> 2] = c;
      ac(d, b + 24 | 0);
      c = p[b + 24 >> 2];
      while (1) {
       if (!c) {
        break j;
       }
       p[b + 152 >> 2] = c;
       n = b, o = Jo(j, b + 152 | 0), p[n + 160 >> 2] = o;
       n = b, o = Pc(), p[n + 152 >> 2] = o;
       if (Kd(b + 160 | 0, b + 152 | 0)) {
        c = Xb(b + 160 | 0);
        p[p[b + 24 >> 2] + 148 >> 2] = p[c + 4 >> 2];
        break j;
       } else {
        c = p[c + 20 >> 2];
        continue;
       }
      }
     }
     while (1) {
      l : {
       m : {
        if (!Oa(b + 40 | 0, b + 24 | 0)) {
         e = jh(b + 40 | 0);
         c = $a(b + 24 | 0);
         Xg(e, d, c);
         n = b, o = Ma(c), p[n + 160 >> 2] = o;
         ih(b + 160 | 0);
         a = a + 152 | 0;
         while (1) {
          n = b, o = Na(c), p[n + 152 >> 2] = o;
          if (!Oa(b + 160 | 0, b + 152 | 0)) {
           break m;
          }
          n = b, o = ih(b + 160 | 0), p[n + 16 >> 2] = o;
          p[b + 152 >> 2] = p[p[b + 16 >> 2] >> 2];
          hh(a, b + 152 | 0);
          continue;
         }
        }
        c = p[p[b + 40 >> 2] >> 2];
        if (!c) {
         break l;
        }
        if (!Jd(c)) {
         break l;
        }
        Tb(d, c);
        g = p[p[c + 56 >> 2] + 148 >> 2];
        if (!g) {
         break l;
        }
        n = b, o = Ma(f), p[n + 160 >> 2] = o;
        n = b, o = Na(f), p[n + 152 >> 2] = o;
        while (1) {
         if (!Oa(b + 160 | 0, b + 152 | 0)) {
          break l;
         }
         e = p[p[b + 160 >> 2] >> 2];
         n : {
          if (!e) {
           break n;
          }
          if (!Jd(e) | (g | 0) != p[e + 20 >> 2]) {
           break n;
          }
          Tb(e, c);
         }
         Pa(b + 160 | 0);
         continue;
        }
       }
       db(c);
       gh(e);
       jb(d);
       c = 0;
       break g;
      }
      Pa(b + 40 | 0);
      continue;
     }
    }
    Pa(b + 80 | 0);
    continue;
   }
  }
  Wc(j);
 }
 sa = b + 192 | 0;
 return c & 255;
}
function Zp(a, b, c) {
 var d = 0, e = w(0), f = 0, g = 0, h = w(0), i = 0, j = 0, k = 0, l = w(0), n = 0, o = w(0), q = w(0), r = w(0), s = w(0), u = w(0), v = 0, x = w(0), y = 0, z = w(0), A = 0, B = 0, C = w(0), D = w(0), E = w(0), F = w(0), G = w(0), H = w(0);
 d = sa - 144 | 0;
 sa = d;
 m[p[p[a >> 2] + 8 >> 2]](a);
 v = _a(c);
 a : {
  if (v >>> 0 < 2) {
   break a;
  }
  f = p[Qa(c, 0) >> 2];
  y = _c(f);
  b : {
   if (y) {
    g = Kb(d - -64 | 0, Wd(f));
    q = t[Ja(g, 0) >> 2];
    r = t[Ja(g, 1) >> 2];
    g = Kb(d + 136 | 0, tf(f));
    e = t[Ja(g, 0) >> 2];
    l = t[Ja(g, 1) >> 2];
    $b(d + 128 | 0, f);
    s = t[Ja(d + 128 | 0, 0) >> 2];
    u = t[Ja(d + 128 | 0, 1) >> 2];
    m[p[p[a >> 2] + 20 >> 2]](a, s, u);
    break b;
   }
   i = Jh(d - -64 | 0, f);
   e = t[i + 60 >> 2];
   t[d + 60 >> 2] = e;
   c : {
    if (!(e > w(0) ^ 1)) {
     g = p[Qa(c, v + -1 | 0) >> 2];
     $b(d + 136 | 0, i);
     f = hb(d + 128 | 0);
     d : {
      if (_c(g)) {
       Kb(d + 48 | 0, tf(g));
       break d;
      }
      $b(d + 48 | 0, g);
     }
     dd(f, d + 48 | 0, d + 136 | 0);
     e = Yd(f);
     t[d + 44 >> 2] = e;
     g = Ja(f, 0);
     t[g >> 2] = t[g >> 2] / e;
     e = t[d + 44 >> 2];
     g = Ja(f, 1);
     t[g >> 2] = t[g >> 2] / e;
     j = p[Qa(c, 1) >> 2];
     g = hb(d + 48 | 0);
     e : {
      if (_c(j)) {
       Kb(d + 32 | 0, Wd(j));
       break e;
      }
      $b(d + 32 | 0, j);
     }
     dd(g, d + 32 | 0, d + 136 | 0);
     e = Yd(g);
     t[d + 28 >> 2] = e;
     j = Ja(g, 0);
     t[j >> 2] = t[j >> 2] / e;
     e = t[d + 28 >> 2];
     j = Ja(g, 1);
     t[j >> 2] = t[j >> 2] / e;
     e = t[ld(d + 44 | 0, ld(d + 28 | 0, d + 60 | 0)) >> 2];
     j = hb(d + 32 | 0);
     Ob(j, d + 136 | 0, f, e);
     q = t[Ja(j, 0) >> 2];
     r = t[Ja(j, 1) >> 2];
     m[p[p[a >> 2] + 20 >> 2]](a, q, r);
     j = hb(d + 16 | 0);
     l = w(e * w(.44771522283554077));
     Ob(j, d + 136 | 0, f, l);
     f = hb(d + 8 | 0);
     Ob(f, d + 136 | 0, g, l);
     n = hb(d);
     Ob(n, d + 136 | 0, g, e);
     h = t[Ja(j, 0) >> 2];
     o = t[Ja(j, 1) >> 2];
     s = t[Ja(f, 0) >> 2];
     u = t[Ja(f, 1) >> 2];
     e = t[Ja(n, 0) >> 2];
     l = t[Ja(n, 1) >> 2];
     m[p[p[a >> 2] + 28 >> 2]](a, h, o, s, u, e, l);
     break c;
    }
    $b(d + 136 | 0, i);
    q = t[Ja(d + 136 | 0, 0) >> 2];
    r = t[Ja(d + 136 | 0, 1) >> 2];
    m[p[p[a >> 2] + 20 >> 2]](a, q, r);
    l = r;
    e = q;
   }
   jb(i);
   u = r;
   s = q;
  }
  j = 1;
  f = y;
  while (1) {
   if ((j | 0) == (v | 0)) {
    if (!b) {
     break a;
    }
    if ((f | y) & 1) {
     m[p[p[a >> 2] + 28 >> 2]](a, e, l, q, r, s, u);
    }
    m[p[p[a >> 2] + 32 >> 2]](a);
   } else {
    i = p[Qa(c, j) >> 2];
    g = _c(i);
    f : {
     if (g) {
      f = Kb(d - -64 | 0, Wd(i));
      $b(d + 136 | 0, i);
      B = a, C = e, D = l, E = t[Ja(f, 0) >> 2], F = t[Ja(f, 1) >> 2], G = t[Ja(d + 136 | 0, 0) >> 2], H = t[Ja(d + 136 | 0, 1) >> 2], A = p[p[a >> 2] + 28 >> 2], m[A](B | 0, w(C), w(D), w(E), w(F), w(G), w(H));
      f = Kb(d + 128 | 0, tf(i));
      e = t[Ja(f, 0) >> 2];
      l = t[Ja(f, 1) >> 2];
      break f;
     }
     Jh(d - -64 | 0, i);
     $b(d + 136 | 0, d - -64 | 0);
     h = t[(d - -64 | 0) + 60 >> 2];
     t[d + 60 >> 2] = h;
     g : {
      if (!(h > w(0) ^ 1)) {
       n = hb(d + 128 | 0);
       dd(n, fb(d + 48 | 0, e, l), d + 136 | 0);
       h = Yd(n);
       t[d + 44 >> 2] = h;
       i = Ja(n, 0);
       t[i >> 2] = t[i >> 2] / h;
       h = t[d + 44 >> 2];
       i = Ja(n, 1);
       t[i >> 2] = t[i >> 2] / h;
       k = p[Qa(c, (j + 1 >>> 0) % (v >>> 0) | 0) >> 2];
       i = hb(d + 48 | 0);
       h : {
        if (_c(k)) {
         Kb(d + 32 | 0, Wd(k));
         break h;
        }
        $b(d + 32 | 0, k);
       }
       dd(i, d + 32 | 0, d + 136 | 0);
       h = Yd(i);
       t[d + 28 >> 2] = h;
       k = Ja(i, 0);
       t[k >> 2] = t[k >> 2] / h;
       h = t[d + 28 >> 2];
       k = Ja(i, 1);
       t[k >> 2] = t[k >> 2] / h;
       h = t[ld(d + 44 | 0, ld(d + 28 | 0, d + 60 | 0)) >> 2];
       k = hb(d + 32 | 0);
       Ob(k, d + 136 | 0, n, h);
       o = t[Ja(k, 0) >> 2];
       x = t[Ja(k, 1) >> 2];
       i : {
        if (f & 1) {
         B = a, H = e, G = l, F = o, E = x, D = t[Ja(k, 0) >> 2], C = t[Ja(k, 1) >> 2], A = p[p[a >> 2] + 28 >> 2], m[A](B | 0, w(H), w(G), w(F), w(E), w(D), w(C));
         break i;
        }
        m[p[p[a >> 2] + 24 >> 2]](a, o, x);
       }
       f = hb(d + 16 | 0);
       e = w(h * w(.44771522283554077));
       Ob(f, d + 136 | 0, n, e);
       n = hb(d + 8 | 0);
       Ob(n, d + 136 | 0, i, e);
       k = hb(d);
       Ob(k, d + 136 | 0, i, h);
       h = t[Ja(f, 0) >> 2];
       o = t[Ja(f, 1) >> 2];
       x = t[Ja(n, 0) >> 2];
       z = t[Ja(n, 1) >> 2];
       e = t[Ja(k, 0) >> 2];
       l = t[Ja(k, 1) >> 2];
       m[p[p[a >> 2] + 28 >> 2]](a, h, o, x, z, e, l);
       break g;
      }
      h = t[Ja(d + 136 | 0, 0) >> 2];
      o = t[Ja(d + 136 | 0, 1) >> 2];
      j : {
       if (f & 1) {
        m[p[p[a >> 2] + 28 >> 2]](a, e, l, h, o, h, o);
        break j;
       }
       m[p[p[a >> 2] + 24 >> 2]](a, h, o);
      }
      l = o;
      e = h;
     }
     jb(d - -64 | 0);
    }
    j = j + 1 | 0;
    f = g;
    continue;
   }
   break;
  }
 }
 sa = d + 144 | 0;
}
function qe(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0;
 a : while (1) {
  h = b + -4 | 0;
  b : while (1) {
   e = a;
   while (1) {
    c : {
     d : {
      e : {
       f : {
        g : {
         h : {
          i : {
           j : {
            k : {
             a = b - e | 0;
             d = a >> 2;
             switch (d | 0) {
             case 5:
              break i;
             case 4:
              break j;
             case 2:
              break k;
             case 0:
             case 1:
              break c;
             case 3:
              break g;
             default:
              break h;
             }
            }
            a = b + -4 | 0;
            if (!(m[p[c >> 2]](p[a >> 2], p[e >> 2]) | 0)) {
             break c;
            }
            Ya(e, a);
            return;
           }
           pe(e, e + 4 | 0, e + 8 | 0, b + -4 | 0, c);
           return;
          }
          oe(e, e + 4 | 0, e + 8 | 0, e + 12 | 0, b + -4 | 0, c);
          return;
         }
         if ((a | 0) <= 123) {
          Kl(e, b, c);
          return;
         }
         f = ((d | 0) / 2 << 2) + e | 0;
         l : {
          if ((a | 0) >= 3997) {
           a = (d | 0) / 4 << 2;
           a = oe(e, a + e | 0, f, a + f | 0, h, c);
           break l;
          }
          a = Fc(e, f, h, c);
         }
         i = a;
         a = h;
         if (!(m[p[c >> 2]](p[e >> 2], p[f >> 2]) | 0)) {
          while (1) {
           a = a + -4 | 0;
           if ((e | 0) == (a | 0)) {
            d = e + 4 | 0;
            if (m[p[c >> 2]](p[e >> 2], p[h >> 2]) | 0) {
             break e;
            }
            while (1) {
             if ((d | 0) == (h | 0)) {
              break c;
             }
             if (m[p[c >> 2]](p[e >> 2], p[d >> 2]) | 0) {
              Ya(d, h);
              d = d + 4 | 0;
              break e;
             } else {
              d = d + 4 | 0;
              continue;
             }
            }
           }
           if (!(m[p[c >> 2]](p[a >> 2], p[f >> 2]) | 0)) {
            continue;
           }
           break;
          }
          Ya(e, a);
          i = i + 1 | 0;
         }
         d = e + 4 | 0;
         if (d >>> 0 >= a >>> 0) {
          break f;
         }
         while (1) {
          g = d;
          d = d + 4 | 0;
          if (m[p[c >> 2]](p[g >> 2], p[f >> 2]) | 0) {
           continue;
          }
          while (1) {
           a = a + -4 | 0;
           if (!(m[p[c >> 2]](p[a >> 2], p[f >> 2]) | 0)) {
            continue;
           }
           break;
          }
          if (g >>> 0 > a >>> 0) {
           d = g;
           break f;
          } else {
           Ya(g, a);
           f = (f | 0) == (g | 0) ? a : f;
           i = i + 1 | 0;
           continue;
          }
         }
        }
        Fc(e, e + 4 | 0, b + -4 | 0, c);
        break c;
       }
       m : {
        if ((d | 0) == (f | 0)) {
         break m;
        }
        if (!(m[p[c >> 2]](p[f >> 2], p[d >> 2]) | 0)) {
         break m;
        }
        Ya(d, f);
        i = i + 1 | 0;
       }
       if (!i) {
        g = sg(e, d, c);
        a = d + 4 | 0;
        if (sg(a, b, c)) {
         b = d;
         a = e;
         if (!g) {
          continue a;
         }
         break c;
        }
        f = 2;
        if (g) {
         break d;
        }
       }
       if ((d - e | 0) < (b - d | 0)) {
        qe(e, d, c);
        a = d + 4 | 0;
        continue b;
       }
       qe(d + 4 | 0, b, c);
       b = d;
       a = e;
       continue a;
      }
      f = h;
      if ((f | 0) == (d | 0)) {
       break c;
      }
      while (1) {
       a = d;
       d = d + 4 | 0;
       if (!(m[p[c >> 2]](p[e >> 2], p[a >> 2]) | 0)) {
        continue;
       }
       while (1) {
        f = f + -4 | 0;
        if (m[p[c >> 2]](p[e >> 2], p[f >> 2]) | 0) {
         continue;
        }
        break;
       }
       if (a >>> 0 < f >>> 0) {
        Ya(a, f);
        continue;
       }
       break;
      }
      f = 4;
     }
     e = a;
     switch (f | 0) {
     case 0:
     case 2:
      continue b;
     case 4:
      continue;
     default:
      break c;
     }
    }
    break;
   }
   break;
  }
  break;
 }
}
function ff(a, b, c, d, e, f) {
 var g = 0, h = w(0), i = 0, j = 0, k = 0, l = 0, n = w(0), o = 0, r = 0, s = w(0), u = 0, v = 0, x = 0, y = w(0), z = w(0), A = w(0), B = w(0), C = w(0), D = w(0);
 g = sa + -64 | 0;
 sa = g;
 l = Zh(a + 40 | 0, b);
 o = q[l | 0];
 a : {
  if (!o) {
   a = a + 16 | 0;
   b = mb(a, q[l + 1 | 0] + -1 | 0);
   j = mb(a, q[l + 1 | 0]);
   a = hb(g);
   dd(a, j, b);
   if (e) {
    e = hb(g + 56 | 0);
    Ob(e, b, a, c);
    x = f, y = t[Ja(e, 0) >> 2], z = t[Ja(e, 1) >> 2], v = p[p[f >> 2] + 20 >> 2], m[v](x | 0, w(y), w(z));
   }
   Ob(a, b, a, d);
   x = f, z = t[Ja(a, 0) >> 2], y = t[Ja(a, 1) >> 2], v = p[p[f >> 2] + 24 >> 2], m[v](x | 0, w(z), w(y));
   break a;
  }
  j = o + -1 | 0;
  u = q[l + 2 | 0];
  n = t[Qa(a + 52 | 0, b) >> 2];
  b : {
   c : {
    if (c == w(0)) {
     break c;
    }
    r = j + u | 0;
    i = a + 28 | 0;
    h = w(n * c);
    b = j;
    while (1) {
     if ((b | 0) >= (r | 0)) {
      break c;
     }
     d : {
      k = mb(i, b);
      s = t[k + 4 >> 2];
      if (!(s >= h ^ 1)) {
       if ((b | 0) != (j | 0)) {
        break d;
       }
       c = w(w(h / s) * t[k >> 2]);
       break c;
      }
      b = b + 1 | 0;
      continue;
     }
     break;
    }
    r = b + -1 | 0;
    c = t[mb(i, r) + 4 >> 2];
    s = t[k + 4 >> 2];
    c = Yh(t[mb(i, r) >> 2], t[k >> 2], w(w(h - c) / w(s - c)));
    break b;
   }
   b = j;
  }
  h = w(1);
  e : {
   if (d == w(1)) {
    break e;
   }
   i = o + u | 0;
   o = (b | 0) < (i | 0) ? i + -1 | 0 : b;
   i = a + 28 | 0;
   n = w(n * d);
   while (1) {
    h = d;
    if ((b | 0) == (o | 0)) {
     break e;
    }
    f : {
     k = mb(i, b);
     h = t[k + 4 >> 2];
     if (!(h >= n ^ 1)) {
      if ((b | 0) != (j | 0)) {
       break f;
      }
      h = w(w(n / h) * t[k >> 2]);
      break e;
     }
     b = b + 1 | 0;
     continue;
    }
    break;
   }
   b = b + -1 | 0;
   d = t[mb(i, b) + 4 >> 2];
   h = t[k + 4 >> 2];
   h = Yh(t[mb(i, b) >> 2], t[k >> 2], w(w(n - d) / w(h - d)));
  }
  j = g + 48 | 0;
  b = g;
  while (1) {
   b = hb(b) + 8 | 0;
   if ((j | 0) != (b | 0)) {
    continue;
   }
   break;
  }
  a = a + 16 | 0;
  b = mb(a, q[l + 1 | 0] + -1 | 0);
  j = mb(a, q[l + 1 | 0]);
  i = mb(a, q[l + 1 | 0] + 1 | 0);
  a = mb(a, q[l + 1 | 0] + 2 | 0);
  if (c == w(0)) {
   Qd(b, j, i, a, h, g);
   if (e) {
    x = f, y = t[Ja(b, 0) >> 2], z = t[Ja(b, 1) >> 2], v = p[p[f >> 2] + 20 >> 2], m[v](x | 0, w(y), w(z));
   }
   c = t[Ja(g, 0) >> 2];
   d = t[Ja(g, 1) >> 2];
   a = g + 24 | 0;
   h = t[Ja(a, 0) >> 2];
   n = t[Ja(a, 1) >> 2];
   a = g + 40 | 0;
   x = f, z = c, y = d, A = h, B = n, C = t[Ja(a, 0) >> 2], D = t[Ja(a, 1) >> 2], v = p[p[f >> 2] + 28 >> 2], m[v](x | 0, w(z), w(y), w(A), w(B), w(C), w(D));
   break a;
  }
  Qd(b, j, i, a, c, g);
  if (e) {
   b = g + 40 | 0;
   x = f, D = t[Ja(b, 0) >> 2], C = t[Ja(b, 1) >> 2], v = p[p[f >> 2] + 20 >> 2], m[v](x | 0, w(D), w(C));
  }
  if (h == w(1)) {
   b = g + 32 | 0;
   c = t[Ja(b, 0) >> 2];
   d = t[Ja(b, 1) >> 2];
   b = g + 16 | 0;
   x = f, C = c, D = d, B = t[Ja(b, 0) >> 2], A = t[Ja(b, 1) >> 2], y = t[Ja(a, 0) >> 2], z = t[Ja(a, 1) >> 2], v = p[p[f >> 2] + 28 >> 2], m[v](x | 0, w(C), w(D), w(B), w(A), w(y), w(z));
   break a;
  }
  b = g + 40 | 0;
  Qd(b, g + 32 | 0, g + 16 | 0, a, w(w(h - c) / w(w(1) - c)), g);
  a = g + 24 | 0;
  x = f, z = t[Ja(g, 0) >> 2], y = t[Ja(g, 1) >> 2], A = t[Ja(a, 0) >> 2], B = t[Ja(a, 1) >> 2], D = t[Ja(b, 0) >> 2], C = t[Ja(b, 1) >> 2], v = p[p[f >> 2] + 28 >> 2], m[v](x | 0, w(z), w(y), w(A), w(B), w(D), w(C));
 }
 sa = g - -64 | 0;
}
function Nw(a, b, c) {
 a : {
  switch (b + -7 | 0) {
  case 133:
   if (t[a + 16 >> 2] != c) {
    t[a + 16 >> 2] = c;
    m[p[p[a >> 2] + 36 >> 2]](a);
   }
   return;
  case 150:
   if (t[a + 12 >> 2] != c) {
    t[a + 12 >> 2] = c;
    m[p[p[a >> 2] + 48 >> 2]](a);
   }
   return;
  case 56:
   if (t[a + 4 >> 2] != c) {
    t[a + 4 >> 2] = c;
    m[p[p[a >> 2] + 32 >> 2]](a);
   }
   return;
  case 57:
   if (t[a + 8 >> 2] != c) {
    t[a + 8 >> 2] = c;
    m[p[p[a >> 2] + 36 >> 2]](a);
   }
   return;
  case 58:
   if (t[a + 12 >> 2] != c) {
    t[a + 12 >> 2] = c;
    m[p[p[a >> 2] + 40 >> 2]](a);
   }
   return;
  case 59:
   if (t[a + 16 >> 2] != c) {
    t[a + 16 >> 2] = c;
    m[p[p[a >> 2] + 44 >> 2]](a);
   }
   return;
  case 63:
   if (t[a + 24 >> 2] != c) {
    t[a + 24 >> 2] = c;
    m[p[p[a >> 2] + 52 >> 2]](a);
   }
   return;
  case 51:
   if (t[a + 24 >> 2] != c) {
    t[a + 24 >> 2] = c;
    m[p[p[a >> 2] + 44 >> 2]](a);
   }
   return;
  case 40:
   if (t[a + 56 >> 2] != c) {
    t[a + 56 >> 2] = c;
    m[p[p[a >> 2] + 68 >> 2]](a);
   }
   return;
  case 6:
   ee(a, c);
   return;
  case 7:
   Nj(a, c);
   return;
  case 74:
   Kj(a, c);
   return;
  case 13:
   if (t[a + 152 >> 2] != c) {
    t[a + 152 >> 2] = c;
    m[p[p[a >> 2] + 104 >> 2]](a);
   }
   return;
  case 14:
   if (t[a + 156 >> 2] != c) {
    t[a + 156 >> 2] = c;
    m[p[p[a >> 2] + 108 >> 2]](a);
   }
   return;
  case 116:
   if (t[a + 160 >> 2] != c) {
    t[a + 160 >> 2] = c;
    m[p[p[a >> 2] + 112 >> 2]](a);
   }
   return;
  case 117:
   if (t[a + 164 >> 2] != c) {
    t[a + 164 >> 2] = c;
    m[p[p[a >> 2] + 116 >> 2]](a);
   }
   return;
  case 24:
   if (t[a + 168 >> 2] != c) {
    t[a + 168 >> 2] = c;
    m[p[p[a >> 2] + 120 >> 2]](a);
   }
   return;
  case 119:
   if (t[a + 172 >> 2] != c) {
    t[a + 172 >> 2] = c;
    m[p[p[a >> 2] + 124 >> 2]](a);
   }
   return;
  case 120:
   if (t[a + 176 >> 2] != c) {
    t[a + 176 >> 2] = c;
    m[p[p[a >> 2] + 136 >> 2]](a);
   }
   return;
  case 79:
   Kj(a, c);
   return;
  case 80:
   if (t[a + 92 >> 2] != c) {
    t[a + 92 >> 2] = c;
    m[p[p[a >> 2] + 84 >> 2]](a);
   }
   return;
  case 82:
   ee(a, c);
   return;
  case 83:
   Ij(a, c);
   return;
  case 84:
   Gj(a, c);
   return;
  case 94:
   if (t[a + 72 >> 2] != c) {
    t[a + 72 >> 2] = c;
    m[p[p[a >> 2] + 76 >> 2]](a);
   }
  default:
   return;
  case 0:
  case 8:
  case 17:
  case 35:
  case 97:
  case 107:
   Bb(a, c);
   return;
  case 1:
  case 9:
  case 18:
  case 26:
  case 32:
  case 89:
  case 98:
  case 108:
   Ab(a, c);
   return;
  case 2:
  case 10:
  case 27:
  case 90:
  case 99:
  case 109:
   Xj(a, c);
   return;
  case 3:
  case 11:
  case 19:
  case 28:
  case 91:
  case 100:
   Sc(a, c);
   return;
  case 4:
  case 39:
  case 92:
  case 101:
   if (t[a + 64 >> 2] != c) {
    t[a + 64 >> 2] = c;
    m[p[p[a >> 2] + 68 >> 2]](a);
   }
   return;
  case 72:
  case 75:
  case 77:
   if (t[a + 80 >> 2] != c) {
    t[a + 80 >> 2] = c;
    m[p[p[a >> 2] + 72 >> 2]](a);
   }
   return;
  case 73:
  case 76:
  case 78:
   if (t[a + 84 >> 2] != c) {
    t[a + 84 >> 2] = c;
    m[p[p[a >> 2] + 76 >> 2]](a);
   }
   return;
  case 5:
  case 93:
  case 102:
   break a;
  }
 }
 if (t[a + 68 >> 2] != c) {
  t[a + 68 >> 2] = c;
  m[p[p[a >> 2] + 72 >> 2]](a);
 }
}
function Uu(a, b) {
 var c = 0, d = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0;
 h(+b);
 d = e(1) | 0;
 o = e(0) | 0;
 m = d;
 a : {
  c = o;
  d = d << 1 | c >>> 31;
  k = c << 1;
  c = d;
  d = m & 2147483647;
  if (!(!(k | c) | ((d | 0) == 2146435072 & o >>> 0 > 0 | d >>> 0 > 2146435072))) {
   h(+a);
   d = e(1) | 0;
   j = e(0) | 0;
   p = d;
   l = d >>> 20 & 2047;
   if ((l | 0) != 2047) {
    break a;
   }
  }
  a = a * b;
  return a / a;
 }
 i = j;
 n = i << 1;
 d = p << 1 | i >>> 31;
 i = d;
 if ((c | 0) == (d | 0) & n >>> 0 > k >>> 0 | d >>> 0 > c >>> 0) {
  n = m >>> 20 & 2047;
  b : {
   if (!l) {
    l = 0;
    c = p << 12 | j >>> 20;
    i = j << 12;
    d = c;
    if ((c | 0) > 0 ? 1 : (c | 0) >= 0 ? i >>> 0 >= 0 : 0) {
     while (1) {
      l = l + -1 | 0;
      c = d << 1 | i >>> 31;
      i = i << 1;
      d = c;
      if ((c | 0) > -1) {
       continue;
      }
      break;
     }
    }
    d = p;
    c = 1 - l | 0;
    i = c & 31;
    if (32 <= (c & 63) >>> 0) {
     c = j << i;
     i = 0;
    } else {
     c = (1 << i) - 1 & j >>> 32 - i | d << i;
     i = j << i;
    }
    d = c;
    break b;
   }
   i = j;
   d = p & 1048575 | 1048576;
  }
  c : {
   if (!n) {
    n = 0;
    j = o;
    k = j << 12;
    c = m << 12 | j >>> 20;
    j = c;
    if ((c | 0) > 0 ? 1 : (c | 0) >= 0 ? k >>> 0 >= 0 : 0) {
     while (1) {
      n = n + -1 | 0;
      c = j << 1 | k >>> 31;
      k = k << 1;
      j = c;
      if ((c | 0) > -1) {
       continue;
      }
      break;
     }
    }
    k = o;
    c = 1 - n | 0;
    j = c & 31;
    if (32 <= (c & 63) >>> 0) {
     c = k << j;
     o = 0;
    } else {
     c = (1 << j) - 1 & k >>> 32 - j | m << j;
     o = k << j;
    }
    j = c;
    break c;
   }
   j = m & 1048575 | 1048576;
  }
  c = o;
  k = j;
  if ((l | 0) > (n | 0)) {
   while (1) {
    d : {
     j = i;
     m = d - ((j >>> 0 < c >>> 0) + k | 0) | 0;
     o = j - c | 0;
     j = m;
     if ((j | 0) < 0 ? 1 : (j | 0) <= 0 ? o >>> 0 < 0 : 0) {
      break d;
     }
     i = o;
     d = j;
     if (i | d) {
      break d;
     }
     return a * 0;
    }
    d = d << 1 | i >>> 31;
    i = i << 1;
    l = l + -1 | 0;
    if ((l | 0) > (n | 0)) {
     continue;
    }
    break;
   }
   l = n;
  }
  e : {
   j = d - ((i >>> 0 < c >>> 0) + k | 0) | 0;
   m = i - c | 0;
   c = j;
   if ((c | 0) < 0 ? 1 : (c | 0) <= 0 ? m >>> 0 < 0 : 0) {
    break e;
   }
   i = m;
   d = c;
   if (i | c) {
    break e;
   }
   return a * 0;
  }
  f : {
   if (d >>> 0 > 1048575) {
    k = i;
    j = d;
    break f;
   }
   while (1) {
    l = l + -1 | 0;
    m = (d | 0) == 524288 & i >>> 0 < 0 | d >>> 0 < 524288;
    c = i;
    d = d << 1 | c >>> 31;
    k = c << 1;
    j = d;
    i = k;
    if (m) {
     continue;
    }
    break;
   }
  }
  m = 0;
  p = p & -2147483648;
  if ((l | 0) >= 1) {
   c = j + -1048576 | 0;
   i = k;
   c = l << 20 | (i >>> 0 < 0 ? c + 1 | 0 : c);
  } else {
   i = k;
   c = 1 - l | 0;
   d = c & 31;
   if (32 <= (c & 63) >>> 0) {
    c = 0;
    i = j >>> d | 0;
   } else {
    c = j >>> d | 0;
    i = ((1 << d) - 1 & j) << 32 - d | i >>> d;
   }
  }
  f(0, i | m);
  f(1, c | p);
  return +g();
 }
 return (k | 0) == (n | 0) & (c | 0) == (i | 0) ? a * 0 : a;
}
function Mn(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 i = sa - 48 | 0;
 sa = i;
 j = a + 4 | 0;
 g = i + 16 | 0;
 Re(g);
 $a(g + 20 | 0);
 a : {
  b : {
   while (1) {
    if (p[b >> 2] == p[b + 4 >> 2]) {
     e = 1;
    } else {
     e = q[b + 8 | 0];
    }
    if (!e) {
     f = Kn(b, c);
     if (!f) {
      Jn(g);
      continue;
     }
     e = 0;
     c : {
      d : {
       e : {
        f : {
         g : {
          h : {
           d = m[p[p[f >> 2] + 8 >> 2]](f) | 0;
           switch (d + -53 | 0) {
           case 4:
            break f;
           case 0:
            break g;
           case 1:
           case 2:
           case 3:
           case 5:
           case 6:
           case 7:
            break c;
           case 12:
            break d;
           case 8:
           case 9:
           case 10:
           case 11:
            break e;
           default:
            break h;
           }
          }
          i : {
           switch (d + -25 | 0) {
           default:
            if ((d | 0) != 1) {
             break c;
            }
            e = La(8);
            d = e;
            fc(d);
            p[d + 4 >> 2] = f;
            p[d >> 2] = 3248;
            d = 1;
            break c;
           case 6:
            e = La(8);
            d = e;
            fc(d);
            p[d + 4 >> 2] = f;
            p[d >> 2] = 3368;
            d = 31;
            break c;
           case 0:
            e = La(8);
            d = e;
            fc(d);
            p[d + 4 >> 2] = f;
            p[d >> 2] = 3296;
            d = 25;
            break c;
           case 1:
            break i;
           case 2:
           case 3:
           case 4:
           case 5:
            break c;
           }
          }
          h = Db(g, 31);
          if (!h) {
           break b;
          }
          e = La(12);
          d = e;
          h = p[h + 4 >> 2];
          fc(d);
          p[d + 8 >> 2] = f;
          p[d + 4 >> 2] = h;
          p[d >> 2] = 3320;
          d = 26;
          break c;
         }
         e = La(8);
         d = e;
         fc(d);
         p[d + 4 >> 2] = f;
         p[d >> 2] = 3392;
         d = 53;
         break c;
        }
        h = Db(g, 1);
        if (!h) {
         break b;
        }
        e = La(12);
        d = e;
        fc(d);
        p[d + 8 >> 2] = h;
        p[d + 4 >> 2] = f;
        p[d >> 2] = 3416;
        d = 57;
        break c;
       }
       e = La(8);
       d = e;
       fc(d);
       p[d + 4 >> 2] = f;
       p[d >> 2] = 3344;
       d = 60;
       break c;
      }
      e = La(8);
      d = e;
      fc(d);
      p[d + 4 >> 2] = f;
      p[d >> 2] = 3600;
      d = 65;
     }
     if (Hn(g, d, e)) {
      break b;
     }
     if (m[p[p[f >> 2] + 28 >> 2]](f, g) | 0) {
      continue;
     }
     d = m[p[p[f >> 2] + 8 >> 2]](f) | 0;
     if ((d | 0) != 1) {
      if ((d | 0) != 23) {
       continue;
      }
      p[a >> 2] = f;
     } else {
      p[i + 12 >> 2] = f;
      hh(j, i + 12 | 0);
     }
     continue;
    }
    break;
   }
   a = ((Gn(g) | 0) != 0) << 1;
   break a;
  }
  a = 2;
 }
 Fn(g);
 sa = i + 48 | 0;
 return a;
}
function Go(a) {
 var b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0;
 c = sa - 16 | 0;
 sa = c;
 e = a + 152 | 0;
 h = c, i = Ma(e), p[h + 8 >> 2] = i;
 h = c, i = Na(e), p[h >> 2] = i;
 while (1) {
  if (Oa(c + 8 | 0, c)) {
   b = p[p[c + 8 >> 2] >> 2];
   p[b + 60 >> 2] = 0;
   p[b + 64 >> 2] = 0;
   Pa(c + 8 | 0);
   continue;
  } else {
   p[a + 176 >> 2] = 0;
   b = a + 140 | 0;
   h = c, i = Ma(b), p[h + 8 >> 2] = i;
   h = c, i = Na(b), p[h >> 2] = i;
   while (1) {
    if (Oa(c + 8 | 0, c)) {
     b = p[p[c + 8 >> 2] >> 2];
     d = p[b + 148 >> 2];
     a : {
      if (!(!d | !p[d + 52 >> 2])) {
       d = p[d + 52 >> 2];
       if (!p[d + 60 >> 2]) {
        p[d + 60 >> 2] = b;
        p[d + 64 >> 2] = b;
        p[b + 152 >> 2] = 0;
        p[b + 156 >> 2] = 0;
        break a;
       }
       f = p[d + 64 >> 2];
       p[f + 156 >> 2] = b;
       p[b + 152 >> 2] = f;
       p[d + 64 >> 2] = b;
       p[b + 156 >> 2] = 0;
       break a;
      }
      p[b + 156 >> 2] = 0;
      p[b + 152 >> 2] = g;
      b : {
       if (!g) {
        p[a + 176 >> 2] = b;
        break b;
       }
       p[g + 156 >> 2] = b;
      }
      g = b;
     }
     Pa(c + 8 | 0);
     continue;
    } else {
     h = c, i = Ma(e), p[h + 8 >> 2] = i;
     h = c, i = Na(e), p[h >> 2] = i;
     while (1) {
      if (Oa(c + 8 | 0, c)) {
       b = p[p[c + 8 >> 2] >> 2];
       c : {
        if (!p[b + 60 >> 2]) {
         break c;
        }
        d = p[b + 56 >> 2];
        d : {
         switch (p[b + 52 >> 2] & 255) {
         case 0:
          e = p[d + 152 >> 2];
          if (e) {
           f = p[b + 60 >> 2];
           p[e + 156 >> 2] = f;
           p[f + 152 >> 2] = e;
          }
          if ((d | 0) == p[a + 176 >> 2]) {
           p[a + 176 >> 2] = p[b + 60 >> 2];
          }
          b = p[b + 64 >> 2];
          p[d + 152 >> 2] = b;
          p[b + 156 >> 2] = d;
          break c;
         case 1:
          break d;
         default:
          break c;
         }
        }
        e = p[d + 156 >> 2];
        if (e) {
         f = p[b + 64 >> 2];
         p[e + 152 >> 2] = f;
         p[f + 156 >> 2] = e;
        }
        g = (d | 0) == (g | 0) ? p[b + 64 >> 2] : g;
        b = p[b + 60 >> 2];
        p[d + 156 >> 2] = b;
        p[b + 152 >> 2] = d;
       }
       Pa(c + 8 | 0);
       continue;
      }
      break;
     }
     p[a + 176 >> 2] = g;
     sa = c + 16 | 0;
    }
    break;
   }
  }
  break;
 }
}
function dj(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0, h = w(0), i = w(0), j = 0, k = 0, l = 0, o = w(0), q = 0, r = 0, s = 0;
 a : {
  if (!b) {
   break a;
  }
  l = bj(b);
  while (1) {
   if ((j | 0) == (l | 0)) {
    break a;
   }
   b : {
    e = aj(b, j);
    if ((zb(jd(e), 1) | 0) == 1) {
     break b;
    }
    f = 0;
    k = _a(e + 24 | 0);
    while (1) {
     d = f;
     if ((d | 0) != (k | 0)) {
      f = d + 1 | 0;
      g = e + 24 | 0;
      if (_a(g) >>> 0 > d >>> 0) {
       g = p[Qa(g, d) >> 2];
      } else {
       g = 0;
      }
      if (m[p[p[g >> 2] + 36 >> 2]](g, p[(p[g + 4 >> 2] << 2) + c >> 2]) | 0) {
       continue;
      }
     }
     break;
    }
    if (d >>> 0 < k >>> 0) {
     break b;
    }
    c : {
     if (!kd(b)) {
      break c;
     }
     if (!$i(e)) {
      break c;
     }
     f = p[b + 20 >> 2];
     i = t[p[a + 20 >> 2] + 12 >> 2];
     g = d >>> 0 >= k >>> 0 ^ 1;
     o = t[p[a + 20 >> 2] + 8 >> 2];
     h = Xi(e, b, 1);
     if (!(h < nd(f) ^ 1)) {
      i = w(i / nd(f));
      d : {
       if (w(x(i)) < w(2147483648)) {
        d = ~~i;
        break d;
       }
       d = -2147483648;
      }
      h = w(h + w(nd(f) * w(d | 0)));
     }
     if (o < h | g) {
      break b;
     }
    }
    f = p[a + 4 >> 2];
    d = p[e + 20 >> 2];
    if ((f | 0) != (d | 0)) {
     p[a + 4 >> 2] = d;
    }
    if ((d | 0) == (f | 0)) {
     break b;
    }
    p[a + 8 >> 2] = b;
    p[a + 12 >> 2] = e;
    e : {
     if (!_i(e)) {
      break e;
     }
     if (!$i(e)) {
      break e;
     }
     c = p[a + 20 >> 2];
     if (!c) {
      break e;
     }
     lj(c, Xi(e, b, 0));
    }
    f : {
     if (t[a + 28 >> 2] != w(0)) {
      r = a, s = _i(e), n[r + 16 | 0] = s;
      Ua(p[a + 24 >> 2]);
      p[a + 24 >> 2] = p[a + 20 >> 2];
      break f;
     }
     Ua(p[a + 20 >> 2]);
    }
    p[a + 20 >> 2] = 0;
    q = 1;
    if (!kd(p[a + 4 >> 2])) {
     break a;
    }
    b = p[a + 4 >> 2];
    c = p[a + 24 >> 2];
    h = w(0);
    g : {
     if (!c) {
      break g;
     }
     h = t[c + 16 >> 2];
    }
    if (p[b + 20 >> 2]) {
     c = La(28);
     b = mj(c, p[b + 20 >> 2]);
     p[a + 20 >> 2] = c;
     $d(b, h);
    }
    p[a + 28 >> 2] = 0;
    break a;
   }
   j = j + 1 | 0;
   continue;
  }
 }
 return q;
}
function Qb(a, b, c) {
 var d = 0, e = 0, f = 0;
 if (c >>> 0 >= 512) {
  ca(a | 0, b | 0, c | 0) | 0;
  return a;
 }
 e = a + c | 0;
 a : {
  if (!((a ^ b) & 3)) {
   b : {
    if ((c | 0) < 1) {
     c = a;
     break b;
    }
    if (!(a & 3)) {
     c = a;
     break b;
    }
    c = a;
    while (1) {
     n[c | 0] = q[b | 0];
     b = b + 1 | 0;
     c = c + 1 | 0;
     if (c >>> 0 >= e >>> 0) {
      break b;
     }
     if (c & 3) {
      continue;
     }
     break;
    }
   }
   d = e & -4;
   c : {
    if (d >>> 0 < 64) {
     break c;
    }
    f = d + -64 | 0;
    if (c >>> 0 > f >>> 0) {
     break c;
    }
    while (1) {
     p[c >> 2] = p[b >> 2];
     p[c + 4 >> 2] = p[b + 4 >> 2];
     p[c + 8 >> 2] = p[b + 8 >> 2];
     p[c + 12 >> 2] = p[b + 12 >> 2];
     p[c + 16 >> 2] = p[b + 16 >> 2];
     p[c + 20 >> 2] = p[b + 20 >> 2];
     p[c + 24 >> 2] = p[b + 24 >> 2];
     p[c + 28 >> 2] = p[b + 28 >> 2];
     p[c + 32 >> 2] = p[b + 32 >> 2];
     p[c + 36 >> 2] = p[b + 36 >> 2];
     p[c + 40 >> 2] = p[b + 40 >> 2];
     p[c + 44 >> 2] = p[b + 44 >> 2];
     p[c + 48 >> 2] = p[b + 48 >> 2];
     p[c + 52 >> 2] = p[b + 52 >> 2];
     p[c + 56 >> 2] = p[b + 56 >> 2];
     p[c + 60 >> 2] = p[b + 60 >> 2];
     b = b - -64 | 0;
     c = c - -64 | 0;
     if (c >>> 0 <= f >>> 0) {
      continue;
     }
     break;
    }
   }
   if (c >>> 0 >= d >>> 0) {
    break a;
   }
   while (1) {
    p[c >> 2] = p[b >> 2];
    b = b + 4 | 0;
    c = c + 4 | 0;
    if (c >>> 0 < d >>> 0) {
     continue;
    }
    break;
   }
   break a;
  }
  if (e >>> 0 < 4) {
   c = a;
   break a;
  }
  d = e + -4 | 0;
  if (d >>> 0 < a >>> 0) {
   c = a;
   break a;
  }
  c = a;
  while (1) {
   n[c | 0] = q[b | 0];
   n[c + 1 | 0] = q[b + 1 | 0];
   n[c + 2 | 0] = q[b + 2 | 0];
   n[c + 3 | 0] = q[b + 3 | 0];
   b = b + 4 | 0;
   c = c + 4 | 0;
   if (c >>> 0 <= d >>> 0) {
    continue;
   }
   break;
  }
 }
 if (c >>> 0 < e >>> 0) {
  while (1) {
   n[c | 0] = q[b | 0];
   b = b + 1 | 0;
   c = c + 1 | 0;
   if ((e | 0) != (c | 0)) {
    continue;
   }
   break;
  }
 }
 return a;
}
function Wy(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0;
 a : {
  b : {
   c : {
    d : {
     e : {
      f : {
       g : {
        h : {
         i : {
          e = b;
          if (b) {
           d = c;
           if (!d) {
            break i;
           }
           break h;
          }
          a = (a >>> 0) / (c >>> 0) | 0;
          ta = 0;
          return a;
         }
         if (!a) {
          break g;
         }
         break f;
        }
        if (!(d + -1 & d)) {
         break e;
        }
        i = (y(d) + 33 | 0) - y(e) | 0;
        g = 0 - i | 0;
        break c;
       }
       a = (e >>> 0) / 0 | 0;
       ta = 0;
       return a;
      }
      d = 32 - y(e) | 0;
      if (d >>> 0 < 31) {
       break d;
      }
      break b;
     }
     if ((d | 0) == 1) {
      break a;
     }
     if (d) {
      d = 31 - y(d + -1 ^ d) | 0;
     } else {
      d = 32;
     }
     c = d & 31;
     if (32 <= (d & 63) >>> 0) {
      e = 0;
      a = b >>> c | 0;
     } else {
      e = b >>> c | 0;
      a = ((1 << c) - 1 & b) << 32 - c | a >>> c;
     }
     ta = e;
     return a;
    }
    i = d + 1 | 0;
    g = 63 - d | 0;
   }
   d = b;
   e = i & 63;
   f = e & 31;
   if (32 <= e >>> 0) {
    e = 0;
    f = d >>> f | 0;
   } else {
    e = d >>> f | 0;
    f = ((1 << f) - 1 & d) << 32 - f | a >>> f;
   }
   g = g & 63;
   d = g & 31;
   if (32 <= g >>> 0) {
    b = a << d;
    a = 0;
   } else {
    b = (1 << d) - 1 & a >>> 32 - d | b << d;
    a = a << d;
   }
   if (i) {
    d = -1;
    g = c + -1 | 0;
    if ((g | 0) != -1) {
     d = 0;
    }
    while (1) {
     h = f << 1 | b >>> 31;
     j = h;
     e = e << 1 | f >>> 31;
     h = d - (e + (g >>> 0 < h >>> 0) | 0) >> 31;
     k = c & h;
     f = j - k | 0;
     e = e - (j >>> 0 < k >>> 0) | 0;
     b = b << 1 | a >>> 31;
     a = l | a << 1;
     h = h & 1;
     l = h;
     i = i + -1 | 0;
     if (i) {
      continue;
     }
     break;
    }
   }
   ta = b << 1 | a >>> 31;
   return h | a << 1;
  }
  a = 0;
  b = 0;
 }
 ta = b;
 return a;
}
function fv(a, b, c, d) {
 var e = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0;
 i = sa - 32 | 0;
 sa = i;
 e = d & 2147483647;
 k = e;
 e = e + -1006698496 | 0;
 j = c;
 h = c;
 if (c >>> 0 < 0) {
  e = e + 1 | 0;
 }
 l = h;
 h = e;
 e = k + -1140785152 | 0;
 m = j;
 if (j >>> 0 < 0) {
  e = e + 1 | 0;
 }
 a : {
  if ((e | 0) == (h | 0) & l >>> 0 < m >>> 0 | h >>> 0 < e >>> 0) {
   e = d << 4 | c >>> 28;
   c = c << 4 | b >>> 28;
   b = b & 268435455;
   j = b;
   if ((b | 0) == 134217728 & a >>> 0 >= 1 | b >>> 0 > 134217728) {
    e = e + 1073741824 | 0;
    a = c + 1 | 0;
    if (a >>> 0 < 1) {
     e = e + 1 | 0;
    }
    h = a;
    break a;
   }
   h = c;
   e = e - ((c >>> 0 < 0) + -1073741824 | 0) | 0;
   if (a | j ^ 134217728) {
    break a;
   }
   a = h + (h & 1) | 0;
   if (a >>> 0 < h >>> 0) {
    e = e + 1 | 0;
   }
   h = a;
   break a;
  }
  if (!(!j & (k | 0) == 2147418112 ? !(a | b) : (k | 0) == 2147418112 & j >>> 0 < 0 | k >>> 0 < 2147418112)) {
   e = d << 4 | c >>> 28;
   h = c << 4 | b >>> 28;
   e = e & 524287 | 2146959360;
   break a;
  }
  h = 0;
  e = 2146435072;
  if (k >>> 0 > 1140785151) {
   break a;
  }
  e = 0;
  j = k >>> 16 | 0;
  if (j >>> 0 < 15249) {
   break a;
  }
  e = d & 65535 | 65536;
  ev(i + 16 | 0, a, b, c, e, j + -15233 | 0);
  gv(i, a, b, c, e, 15361 - j | 0);
  c = p[i + 4 >> 2];
  a = p[i + 8 >> 2];
  e = p[i + 12 >> 2] << 4 | a >>> 28;
  h = a << 4 | c >>> 28;
  a = c & 268435455;
  c = a;
  b = p[i >> 2] | ((p[i + 16 >> 2] | p[i + 24 >> 2]) != 0 | (p[i + 20 >> 2] | p[i + 28 >> 2]) != 0);
  if ((a | 0) == 134217728 & b >>> 0 >= 1 | a >>> 0 > 134217728) {
   a = h + 1 | 0;
   if (a >>> 0 < 1) {
    e = e + 1 | 0;
   }
   h = a;
   break a;
  }
  if (b | c ^ 134217728) {
   break a;
  }
  a = h + (h & 1) | 0;
  if (a >>> 0 < h >>> 0) {
   e = e + 1 | 0;
  }
  h = a;
 }
 sa = i + 32 | 0;
 f(0, h | 0);
 f(1, d & -2147483648 | e);
 return +g();
}
function gf(a, b, c, d, e) {
 var f = 0, g = 0, h = 0, i = 0, j = 0, k = w(0), l = w(0), n = w(0), o = 0, r = 0, s = 0, u = w(0), v = w(0), x = w(0), y = w(0), z = w(0), A = w(0);
 while (1) {
  f = a - -64 | 0;
  if (!lf(f)) {
   a = p[p[f >> 2] >> 2];
   continue;
  }
  break;
 }
 a : {
  if (b == c) {
   break a;
  }
  o = a + 40 | 0;
  f = qc(o);
  i = (f | 0) > 0 ? f : 0;
  h = a + 52 | 0;
  while (1) {
   if ((g | 0) == (i | 0)) {
    break a;
   }
   k = t[Qa(h, g) >> 2];
   n = w(l + k);
   if (!(n > b)) {
    g = g + 1 | 0;
    l = n;
    continue;
   }
   break;
  }
  if ((g | 0) == -1) {
   break a;
  }
  i = f + -1 | 0;
  n = w(w(b - l) / k);
  j = (f | 0) > (g | 0) ? f : g;
  f = g;
  while (1) {
   b : {
    c : {
     if ((f | 0) == (j | 0)) {
      f = i;
      b = w(1);
      break c;
     }
     k = t[Qa(h, f) >> 2];
     b = w(l + k);
     if (b >= c ^ 1) {
      break b;
     }
     b = w(w(c - l) / k);
    }
    c = ji(n);
    b = ji(b);
    if ((f | 0) == (g | 0)) {
     ff(a, g, c, b, d, e);
     return;
    }
    ff(a, g, c, w(1), d, e);
    i = a + 16 | 0;
    while (1) {
     g = g + 1 | 0;
     if ((g | 0) >= (f | 0)) {
      ff(a, f, w(0), b, 0, e);
      break a;
     }
     h = Zh(o, g);
     j = q[h | 0];
     d = mb(i, q[h + 1 | 0]);
     if (j) {
      j = mb(i, q[h + 1 | 0] + 1 | 0);
      h = mb(i, q[h + 1 | 0] + 2 | 0);
      s = e, u = t[Ja(d, 0) >> 2], v = t[Ja(d, 1) >> 2], x = t[Ja(j, 0) >> 2], y = t[Ja(j, 1) >> 2], z = t[Ja(h, 0) >> 2], A = t[Ja(h, 1) >> 2], r = p[p[e >> 2] + 28 >> 2], m[r](s | 0, w(u), w(v), w(x), w(y), w(z), w(A));
     } else {
      s = e, A = t[Ja(d, 0) >> 2], z = t[Ja(d, 1) >> 2], r = p[p[e >> 2] + 24 >> 2], m[r](s | 0, w(A), w(z));
     }
     continue;
    }
   }
   f = f + 1 | 0;
   l = b;
   continue;
  }
 }
}
function Tq(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = w(0), j = 0, k = 0, l = w(0), m = 0, o = 0, r = 0, s = 0, u = w(0);
 c = sa - 32 | 0;
 sa = c;
 a : {
  b : {
   h = a + 52 | 0;
   if (lf(h)) {
    break b;
   }
   if (!Rq(b, a + 80 | 0)) {
    break b;
   }
   i = t[a + 76 >> 2];
   break a;
  }
  e = p[b + 4 >> 2];
  p[a + 80 >> 2] = p[b >> 2];
  p[a + 84 >> 2] = e;
  e = p[b + 20 >> 2];
  p[a + 96 >> 2] = p[b + 16 >> 2];
  p[a + 100 >> 2] = e;
  e = p[b + 12 >> 2];
  p[a + 88 >> 2] = p[b + 8 >> 2];
  p[a + 92 >> 2] = e;
  Rd(h);
  e = a + 28 | 0;
  mf(e);
  j = a + 16 | 0;
  f = a + 4 | 0;
  Qq(j, nb(f));
  g = nb(f);
  g = (g | 0) > 0 ? g : 0;
  while (1) {
   if ((d | 0) == (g | 0)) {
    d = mb(j, 0);
    b = a + 40 | 0;
    r = c, s = Ma(b), p[r + 24 >> 2] = s;
    r = c, s = Na(b), p[r + 16 >> 2] = s;
    b = 1;
    while (1) {
     if (Oa(c + 24 | 0, c + 16 | 0)) {
      f = p[c + 24 >> 2];
      c : {
       if (!q[f | 0]) {
        k = d;
        d = mb(j, b);
        r = c, u = zi(k, d), t[r + 12 >> 2] = u;
        yb(h, c + 12 | 0);
        l = t[c + 12 >> 2];
        b = b + 1 | 0;
        break c;
       }
       g = nb(e);
       n[f | 0] = g + 1;
       k = d;
       m = d + 8 | 0;
       o = d + 16 | 0;
       d = d + 24 | 0;
       r = c, u = kf(k, m, o, d, w(0), w(0), w(1), e), t[r + 12 >> 2] = u;
       yb(h, c + 12 | 0);
       l = t[c + 12 >> 2];
       r = f, s = nb(e) - g | 0, n[r + 2 | 0] = s;
       b = b + 3 | 0;
      }
      i = w(i + l);
      p[c + 24 >> 2] = p[c + 24 >> 2] + 3;
      continue;
     } else {
      t[a + 76 >> 2] = i;
     }
     break;
    }
   } else {
    Af(mb(j, d), mb(f, d), b);
    d = d + 1 | 0;
    continue;
   }
   break;
  }
 }
 sa = c + 32 | 0;
 return i;
}
function ng(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = w(0), e = w(0), f = w(0), g = w(0), h = 0, i = 0, j = 0, k = w(0), l = 0, n = 0;
 h = sa - 16 | 0;
 sa = h;
 c = p[a + 72 >> 2];
 if (!c) {
  i = b - -64 | 0;
  c = p[a + 68 >> 2];
  m[p[p[c >> 2] + 8 >> 2]](c);
  f = Ej(w(Ej(t[a + 56 >> 2]) + w(1)));
  a : {
   b : {
    switch (p[a + 60 >> 2] + -1 | 0) {
    case 0:
     d = t[b + 76 >> 2];
     g = w(d * w(f + t[a + 52 >> 2]));
     f = w(d * w(f + t[a + 48 >> 2]));
     b = g < f;
     e = b ? g : f;
     c = e > d;
     e = c ? w(e - d) : e;
     f = b ? f : g;
     d = c ? w(f - d) : f;
     c = 0;
     b = _a(i);
     while (1) {
      if (d > w(0) ^ 1) {
       break a;
      }
      j = p[Qa(i, (c | 0) % (b | 0) | 0) >> 2];
      f = t[j + 76 >> 2];
      c : {
       if (!(e < f ^ 1)) {
        gf(j, e, d, 1, p[a + 68 >> 2]);
        e = w(0);
        break c;
       }
       e = w(e - f);
      }
      c = c + 1 | 0;
      d = w(d - f);
      continue;
     }
    case 1:
     break b;
    default:
     break a;
    }
   }
   l = h, n = Ma(i), p[l + 8 >> 2] = n;
   l = h, n = Na(i), p[l >> 2] = n;
   while (1) {
    if (!Oa(h + 8 | 0, h)) {
     break a;
    }
    b = p[p[h + 8 >> 2] >> 2];
    e = t[b + 76 >> 2];
    d = w(e * w(f + t[a + 52 >> 2]));
    g = w(e * w(f + t[a + 48 >> 2]));
    c = d < g;
    k = c ? g : d;
    g = c ? d : g;
    c = g > e;
    d = c ? w(k - e) : k;
    gf(b, c ? w(g - e) : g, d, 1, p[a + 68 >> 2]);
    while (1) {
     if (!(d > e ^ 1)) {
      d = w(d - e);
      gf(b, w(0), d, 0, p[a + 68 >> 2]);
      continue;
     }
     break;
    }
    Pa(h + 8 | 0);
    continue;
   }
  }
  c = p[a + 68 >> 2];
  p[a + 72 >> 2] = c;
 }
 sa = h + 16 | 0;
 return c | 0;
}
function bo(a, b, c, d) {
 var e = 0, f = 0, g = 0, h = 0, i = 0, j = w(0), k = 0, l = 0;
 e = sa - 32 | 0;
 sa = e;
 i = Ke(Xa(b), p[c >> 2]);
 f = vb(b);
 n[e + 31 | 0] = 0;
 a : {
  b : {
   if (!f) {
    break b;
   }
   h = ab(i, f);
   g = p[Qa(b, h) >> 2];
   if (!g) {
    break b;
   }
   while (1) {
    g = p[g >> 2];
    if (!g) {
     break b;
    }
    if (p[g + 4 >> 2] != (i | 0)) {
     if ((ab(p[g + 4 >> 2], f) | 0) != (h | 0)) {
      break b;
     }
    }
    if (!Ed(kb(b), g + 8 | 0, c)) {
     continue;
    }
    break;
   }
   break a;
  }
  ao(e + 16 | 0, b, i, d);
  c = p[Xa(b) >> 2];
  d = b;
  if (!(w(t[kb(b) >> 2] * w(f >>> 0)) < w(c + 1 >>> 0) ^ 1 ? f : 0)) {
   k = e, l = kc(f) ^ 1 | f << 1, p[k + 12 >> 2] = l;
   c = e;
   j = w(C(w(w(p[Xa(b) >> 2] + 1 >>> 0) / t[kb(b) >> 2])));
   c : {
    if (j < w(4294967296) & j >= w(0)) {
     f = ~~j >>> 0;
     break c;
    }
    f = 0;
   }
   p[c + 8 >> 2] = f;
   $n(b, p[Ib(e + 12 | 0, e + 8 | 0) >> 2]);
   f = vb(b);
   h = ab(i, f);
  }
  c = p[Qa(d, h) >> 2];
  d : {
   if (!c) {
    c = b + 8 | 0;
    p[p[e + 16 >> 2] >> 2] = p[c >> 2];
    p[b + 8 >> 2] = p[e + 16 >> 2];
    k = Qa(b, h), l = c, p[k >> 2] = l;
    if (!p[p[e + 16 >> 2] >> 2]) {
     break d;
    }
    c = p[e + 16 >> 2];
    k = Qa(b, ab(p[p[p[e + 16 >> 2] >> 2] + 4 >> 2], f)), l = c, p[k >> 2] = l;
    break d;
   }
   p[p[e + 16 >> 2] >> 2] = p[c >> 2];
   p[c >> 2] = p[e + 16 >> 2];
  }
  g = Hd(e + 16 | 0);
  b = Xa(b);
  p[b >> 2] = p[b >> 2] + 1;
  n[e + 31 | 0] = 1;
  c = e + 16 | 0;
  b = p[c >> 2];
  p[c >> 2] = 0;
  if (b) {
   q[ib(c) + 4 | 0];
   if (b) {
    Ua(b);
   }
  }
 }
 Fd(a, gb(e + 16 | 0, g), e + 31 | 0);
 sa = e + 32 | 0;
}
function ut(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 n[a + 4 | 0] = 0;
 p[a >> 2] = b;
 c = gj(b);
 p[a + 8 >> 2] = c;
 g = a, h = La((c & 1073741823) != (c | 0) ? -1 : c << 2), p[g + 12 >> 2] = h;
 while (1) {
  if (d >>> 0 >= c >>> 0) {
   e = _a(b + 16 | 0);
   p[a + 16 >> 2] = e;
   d = e << 5;
   c = La((e | 0) != (e & 134217727) ? -1 : d);
   if (e) {
    e = c + d | 0;
    d = c;
    while (1) {
     d = tt(d) + 32 | 0;
     if ((e | 0) != (d | 0)) {
      continue;
     }
     break;
    }
   }
   p[a + 20 >> 2] = c;
  } else {
   e = hj(b, d);
   a : {
    if (!e) {
     p[p[a + 12 >> 2] + (d << 2) >> 2] = 0;
     break a;
    }
    b : {
     switch ((m[p[p[e >> 2] + 8 >> 2]](e) | 0) + -56 | 0) {
     case 3:
      c = La(16);
      If(c, e, a);
      p[c >> 2] = 2076;
      n[c + 12 | 0] = q[e + 16 | 0];
      p[p[a + 12 >> 2] + (d << 2) >> 2] = c;
      break a;
     case 0:
      c = La(16);
      If(c, e, a);
      p[c >> 2] = 2096;
      t[c + 12 >> 2] = t[e + 16 >> 2];
      p[p[a + 12 >> 2] + (d << 2) >> 2] = c;
      break a;
     case 2:
      c = La(16);
      If(c, e, a);
      n[c + 12 | 0] = 0;
      p[c >> 2] = 2116;
      p[p[a + 12 >> 2] + (d << 2) >> 2] = c;
      break a;
     default:
      break b;
     }
    }
    p[p[a + 12 >> 2] + (d << 2) >> 2] = 0;
   }
   d = d + 1 | 0;
   c = p[a + 8 >> 2];
   continue;
  }
  break;
 }
 d = 0;
 while (1) {
  if (d >>> 0 < s[a + 16 >> 2]) {
   e = p[a + 20 >> 2] + (d << 5) | 0;
   f = e;
   c = b + 16 | 0;
   if (_a(c) >>> 0 > d >>> 0) {
    c = p[Qa(c, d) >> 2];
   } else {
    c = 0;
   }
   p[f >> 2] = c;
   p[e + 4 >> 2] = p[c + 32 >> 2];
   d = d + 1 | 0;
   continue;
  }
  break;
 }
 return a;
}
function $d(a, b) {
 a = a | 0;
 b = w(b);
 var c = w(0), d = 0, e = w(0), f = 0, g = 0, h = 0, i = w(0), j = 0, k = 0, l = w(0);
 d = p[a >> 2];
 e = t[d + 24 >> 2];
 c = t[a + 8 >> 2];
 p[a + 12 >> 2] = p[a + 8 >> 2];
 t[a + 8 >> 2] = c + b;
 t[a + 4 >> 2] = t[a + 4 >> 2] + w(w(e * b) * w(p[a + 20 >> 2]));
 f = p[d + 16 >> 2];
 b = t[a + 4 >> 2];
 g = q[d + 40 | 0] ? p[d + 32 >> 2] : g;
 e = w(f | 0);
 if (q[d + 40 | 0]) {
  f = p[d + 36 >> 2];
 } else {
  f = p[d + 20 >> 2];
 }
 b = w(b * e);
 p[a + 16 >> 2] = 0;
 j = 1;
 a : {
  b : {
   switch (p[d + 28 >> 2]) {
   case 0:
    c = w(f | 0);
    if (b > c ^ 1) {
     break a;
    }
    t[a + 4 >> 2] = c / e;
    t[a + 16 >> 2] = w(b - c) / e;
    h = 1;
    j = 0;
    break a;
   case 1:
    c = w(f | 0);
    if (b >= c ^ 1) {
     break a;
    }
    t[a + 16 >> 2] = w(b - c) / e;
    k = a, l = w(w(Uu(+w(w(t[a + 4 >> 2] * e) - w(g | 0)), +(f - g | 0)) + +(g | 0)) / e), t[k + 4 >> 2] = l;
    h = 1;
    break a;
   case 2:
    break b;
   default:
    break a;
   }
  }
  d = p[a + 20 >> 2];
  c = w(f | 0);
  i = w(g | 0);
  while (1) {
   f = a;
   c : {
    d : {
     switch (d + 1 | 0) {
     case 2:
      if (b >= c ^ 1) {
       break a;
      }
      d = -1;
      p[a + 20 >> 2] = -1;
      t[a + 16 >> 2] = w(b - c) / e;
      b = w(w(c - b) + c);
      break c;
     case 0:
      break d;
     default:
      break a;
     }
    }
    if (b < i ^ 1) {
     break a;
    }
    d = 1;
    p[a + 20 >> 2] = 1;
    b = w(i - b);
    t[a + 16 >> 2] = b / e;
    b = w(b + i);
   }
   t[f + 4 >> 2] = b / e;
   h = 1;
   continue;
  }
 }
 n[a + 24 | 0] = h;
 return j | 0;
}
function Ww(a, b) {
 var c = w(0);
 a : {
  switch (b + -7 | 0) {
  case 133:
   return t[a + 16 >> 2];
  case 150:
   return t[a + 12 >> 2];
  case 56:
   return t[a + 4 >> 2];
  case 57:
   return t[a + 8 >> 2];
  case 58:
   return t[a + 12 >> 2];
  case 59:
   return t[a + 16 >> 2];
  case 63:
   return t[a + 24 >> 2];
  case 51:
   return t[a + 24 >> 2];
  case 74:
   return t[a + 88 >> 2];
  case 13:
   return t[a + 152 >> 2];
  case 14:
   return t[a + 156 >> 2];
  case 116:
   return t[a + 160 >> 2];
  case 117:
   return t[a + 164 >> 2];
  case 24:
   return t[a + 168 >> 2];
  case 119:
   return t[a + 172 >> 2];
  case 120:
   return t[a + 176 >> 2];
  case 79:
   return t[a + 88 >> 2];
  case 80:
   return t[a + 92 >> 2];
  case 82:
   return t[a + 120 >> 2];
  case 94:
   c = t[a + 72 >> 2];
  default:
   return c;
  case 0:
  case 8:
  case 17:
  case 35:
  case 97:
  case 107:
   return t[a + 48 >> 2];
  case 1:
  case 9:
  case 18:
  case 26:
  case 32:
  case 89:
  case 98:
  case 108:
   return t[a + 52 >> 2];
  case 2:
  case 10:
  case 27:
  case 40:
  case 90:
  case 99:
  case 109:
   return t[a + 56 >> 2];
  case 3:
  case 11:
  case 19:
  case 28:
  case 91:
  case 100:
   return t[a + 60 >> 2];
  case 4:
  case 39:
  case 92:
  case 101:
   return t[a + 64 >> 2];
  case 6:
  case 83:
   return w(m[p[p[a >> 2] + 72 >> 2]](a));
  case 7:
  case 84:
   return w(m[p[p[a >> 2] + 76 >> 2]](a));
  case 72:
  case 75:
  case 77:
   return t[a + 80 >> 2];
  case 73:
  case 76:
  case 78:
   return t[a + 84 >> 2];
  case 5:
  case 93:
  case 102:
   break a;
  }
 }
 return t[a + 68 >> 2];
}
function un(a, b, c, d) {
 var e = 0, f = 0, g = 0, h = 0, i = 0, j = w(0), k = 0, l = 0;
 e = sa - 32 | 0;
 sa = e;
 Xa(b);
 i = p[c >> 2];
 f = vb(b);
 n[e + 31 | 0] = 0;
 a : {
  b : {
   if (!f) {
    break b;
   }
   h = ab(i, f);
   g = p[Qa(b, h) >> 2];
   if (!g) {
    break b;
   }
   while (1) {
    g = p[g >> 2];
    if (!g) {
     break b;
    }
    if (p[g + 4 >> 2] != (i | 0)) {
     if ((ab(p[g + 4 >> 2], f) | 0) != (h | 0)) {
      break b;
     }
    }
    if (!Uc(kb(b), g + 8 | 0, c)) {
     continue;
    }
    break;
   }
   break a;
  }
  _g(e + 16 | 0, b, i, d);
  c = p[Xa(b) >> 2];
  d = b;
  if (!(w(t[kb(b) >> 2] * w(f >>> 0)) < w(c + 1 >>> 0) ^ 1 ? f : 0)) {
   k = e, l = kc(f) ^ 1 | f << 1, p[k + 12 >> 2] = l;
   c = e;
   j = w(C(w(w(p[Xa(b) >> 2] + 1 >>> 0) / t[kb(b) >> 2])));
   c : {
    if (j < w(4294967296) & j >= w(0)) {
     f = ~~j >>> 0;
     break c;
    }
    f = 0;
   }
   p[c + 8 >> 2] = f;
   Zg(b, p[Ib(e + 12 | 0, e + 8 | 0) >> 2]);
   f = vb(b);
   h = ab(i, f);
  }
  c = p[Qa(d, h) >> 2];
  d : {
   if (!c) {
    c = b + 8 | 0;
    p[p[e + 16 >> 2] >> 2] = p[c >> 2];
    p[c >> 2] = p[e + 16 >> 2];
    k = Qa(b, h), l = c, p[k >> 2] = l;
    if (!p[p[e + 16 >> 2] >> 2]) {
     break d;
    }
    c = p[e + 16 >> 2];
    k = Qa(b, ab(p[p[p[e + 16 >> 2] >> 2] + 4 >> 2], f)), l = c, p[k >> 2] = l;
    break d;
   }
   p[p[e + 16 >> 2] >> 2] = p[c >> 2];
   p[c >> 2] = p[e + 16 >> 2];
  }
  g = Hd(e + 16 | 0);
  b = Xa(b);
  p[b >> 2] = p[b >> 2] + 1;
  n[e + 31 | 0] = 1;
  Bd(e + 16 | 0);
 }
 Fd(a, gb(e + 16 | 0, g), e + 31 | 0);
 sa = e + 32 | 0;
}
function mm(a, b, c, d) {
 var e = 0, f = 0, g = 0, h = 0, i = 0, j = w(0), k = 0, l = 0;
 e = sa - 32 | 0;
 sa = e;
 Xa(b);
 i = r[c >> 1];
 f = vb(b);
 n[e + 31 | 0] = 0;
 a : {
  b : {
   if (!f) {
    break b;
   }
   h = ab(i, f);
   g = p[Qa(b, h) >> 2];
   if (!g) {
    break b;
   }
   while (1) {
    g = p[g >> 2];
    if (!g) {
     break b;
    }
    if (p[g + 4 >> 2] != (i | 0)) {
     if ((ab(p[g + 4 >> 2], f) | 0) != (h | 0)) {
      break b;
     }
    }
    if (!Mi(kb(b), g + 8 | 0, c)) {
     continue;
    }
    break;
   }
   break a;
  }
  jm(e + 16 | 0, b, i, d);
  c = p[Xa(b) >> 2];
  d = b;
  if (!(w(t[kb(b) >> 2] * w(f >>> 0)) < w(c + 1 >>> 0) ^ 1 ? f : 0)) {
   k = e, l = kc(f) ^ 1 | f << 1, p[k + 12 >> 2] = l;
   c = e;
   j = w(C(w(w(p[Xa(b) >> 2] + 1 >>> 0) / t[kb(b) >> 2])));
   c : {
    if (j < w(4294967296) & j >= w(0)) {
     f = ~~j >>> 0;
     break c;
    }
    f = 0;
   }
   p[c + 8 >> 2] = f;
   im(b, p[Ib(e + 12 | 0, e + 8 | 0) >> 2]);
   f = vb(b);
   h = ab(i, f);
  }
  c = p[Qa(d, h) >> 2];
  d : {
   if (!c) {
    c = b + 8 | 0;
    p[p[e + 16 >> 2] >> 2] = p[c >> 2];
    p[c >> 2] = p[e + 16 >> 2];
    k = Qa(b, h), l = c, p[k >> 2] = l;
    if (!p[p[e + 16 >> 2] >> 2]) {
     break d;
    }
    c = p[e + 16 >> 2];
    k = Qa(b, ab(p[p[p[e + 16 >> 2] >> 2] + 4 >> 2], f)), l = c, p[k >> 2] = l;
    break d;
   }
   p[p[e + 16 >> 2] >> 2] = p[c >> 2];
   p[c >> 2] = p[e + 16 >> 2];
  }
  g = Hd(e + 16 | 0);
  b = Xa(b);
  p[b >> 2] = p[b >> 2] + 1;
  n[e + 31 | 0] = 1;
  Bd(e + 16 | 0);
 }
 Fd(a, gb(e + 16 | 0, g), e + 31 | 0);
 sa = e + 32 | 0;
}
function Io(a, b, c, d) {
 var e = 0, f = 0, g = 0, h = 0, i = 0, j = w(0), k = 0, l = 0;
 e = sa - 32 | 0;
 sa = e;
 i = $g(Xa(b), c);
 f = vb(b);
 n[e + 31 | 0] = 0;
 a : {
  b : {
   if (!f) {
    break b;
   }
   h = ab(i, f);
   g = p[Qa(b, h) >> 2];
   if (!g) {
    break b;
   }
   while (1) {
    g = p[g >> 2];
    if (!g) {
     break b;
    }
    if (p[g + 4 >> 2] != (i | 0)) {
     if ((ab(p[g + 4 >> 2], f) | 0) != (h | 0)) {
      break b;
     }
    }
    if (!Uc(kb(b), g + 8 | 0, c)) {
     continue;
    }
    break;
   }
   break a;
  }
  _g(e + 16 | 0, b, i, d);
  c = p[Xa(b) >> 2];
  d = b;
  if (!(w(t[kb(b) >> 2] * w(f >>> 0)) < w(c + 1 >>> 0) ^ 1 ? f : 0)) {
   k = e, l = kc(f) ^ 1 | f << 1, p[k + 12 >> 2] = l;
   c = e;
   j = w(C(w(w(p[Xa(b) >> 2] + 1 >>> 0) / t[kb(b) >> 2])));
   c : {
    if (j < w(4294967296) & j >= w(0)) {
     f = ~~j >>> 0;
     break c;
    }
    f = 0;
   }
   p[c + 8 >> 2] = f;
   Zg(b, p[Ib(e + 12 | 0, e + 8 | 0) >> 2]);
   f = vb(b);
   h = ab(i, f);
  }
  c = p[Qa(d, h) >> 2];
  d : {
   if (!c) {
    c = b + 8 | 0;
    p[p[e + 16 >> 2] >> 2] = p[c >> 2];
    p[c >> 2] = p[e + 16 >> 2];
    k = Qa(b, h), l = c, p[k >> 2] = l;
    if (!p[p[e + 16 >> 2] >> 2]) {
     break d;
    }
    c = p[e + 16 >> 2];
    k = Qa(b, ab(p[p[p[e + 16 >> 2] >> 2] + 4 >> 2], f)), l = c, p[k >> 2] = l;
    break d;
   }
   p[p[e + 16 >> 2] >> 2] = p[c >> 2];
   p[c >> 2] = p[e + 16 >> 2];
  }
  g = Hd(e + 16 | 0);
  b = Xa(b);
  p[b >> 2] = p[b >> 2] + 1;
  n[e + 31 | 0] = 1;
  Bd(e + 16 | 0);
 }
 Fd(a, gb(e + 16 | 0, g), e + 31 | 0);
 sa = e + 32 | 0;
}
function Wk(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 var f = w(0), g = w(0), h = w(0), i = 0, j = w(0), k = w(0), l = w(0), n = w(0), o = w(0), q = w(0), r = w(0), s = w(0), u = w(0), v = 0, x = w(0);
 i = sa - 96 | 0;
 sa = i;
 g = w(t[Ja(e, 2) >> 2] - t[Ja(e, 0) >> 2]);
 h = w(t[Ja(e, 3) >> 2] - t[Ja(e, 1) >> 2]);
 q = t[Ja(e, 0) >> 2];
 r = t[c >> 2];
 s = t[Ja(e, 1) >> 2];
 f = w(1);
 u = t[c + 4 >> 2];
 j = w(1);
 a : {
  b : {
   c : {
    switch (b | 0) {
    case 0:
     j = w(tc(d) / g);
     f = w(sc(d) / h);
     break a;
    case 1:
     f = Di(w(tc(d) / g), w(sc(d) / h));
     break b;
    case 2:
     f = Vu(w(tc(d) / g), w(sc(d) / h));
     break b;
    case 4:
     f = w(sc(d) / h);
     break b;
    case 3:
     f = w(tc(d) / g);
     break b;
    case 6:
     break c;
    default:
     break a;
    }
   }
   f = Di(w(tc(d) / g), w(sc(d) / h));
   f = f < w(1) ? f : w(1);
  }
  j = f;
 }
 b = tb(i + 72 | 0);
 k = t[Ja(d, 0) >> 2];
 l = tc(d);
 n = t[c >> 2];
 o = tc(d);
 v = Ja(b, 4), x = w(+l * .5 + +k + +w(n * o) * .5), t[v >> 2] = x;
 k = t[Ja(d, 1) >> 2];
 l = sc(d);
 n = t[c + 4 >> 2];
 o = sc(d);
 v = Ja(b, 5), x = w(+l * .5 + +k + +w(n * o) * .5), t[v >> 2] = x;
 d = tb(i + 48 | 0);
 v = Ja(d, 0), x = j, t[v >> 2] = x;
 v = Ja(d, 3), x = f, t[v >> 2] = x;
 e = tb(i + 24 | 0);
 v = Ja(e, 4), x = w(+w(-q) - +g * .5 - +w(g * r) * .5), t[v >> 2] = x;
 v = Ja(e, 5), x = w(+w(-s) - +h * .5 - +w(h * u) * .5), t[v >> 2] = x;
 c = tb(i);
 fd(c, b, d);
 fd(c, c, e);
 m[p[p[a >> 2] + 16 >> 2]](a, c);
 sa = i + 96 | 0;
}
function Dj(a, b, c) {
 var d = 0;
 a : {
  if ((a | 0) == (b | 0)) {
   break a;
  }
  if ((b - a | 0) - c >>> 0 <= 0 - (c << 1) >>> 0) {
   Qb(a, b, c);
   return;
  }
  d = (a ^ b) & 3;
  b : {
   c : {
    if (a >>> 0 < b >>> 0) {
     if (d) {
      break b;
     }
     if (!(a & 3)) {
      break c;
     }
     while (1) {
      if (!c) {
       break a;
      }
      n[a | 0] = q[b | 0];
      b = b + 1 | 0;
      c = c + -1 | 0;
      a = a + 1 | 0;
      if (a & 3) {
       continue;
      }
      break;
     }
     break c;
    }
    d : {
     if (d) {
      break d;
     }
     if (a + c & 3) {
      while (1) {
       if (!c) {
        break a;
       }
       c = c + -1 | 0;
       d = c + a | 0;
       n[d | 0] = q[b + c | 0];
       if (d & 3) {
        continue;
       }
       break;
      }
     }
     if (c >>> 0 <= 3) {
      break d;
     }
     while (1) {
      c = c + -4 | 0;
      p[c + a >> 2] = p[b + c >> 2];
      if (c >>> 0 > 3) {
       continue;
      }
      break;
     }
    }
    if (!c) {
     break a;
    }
    while (1) {
     c = c + -1 | 0;
     n[c + a | 0] = q[b + c | 0];
     if (c) {
      continue;
     }
     break;
    }
    break a;
   }
   if (c >>> 0 <= 3) {
    break b;
   }
   while (1) {
    p[a >> 2] = p[b >> 2];
    b = b + 4 | 0;
    a = a + 4 | 0;
    c = c + -4 | 0;
    if (c >>> 0 > 3) {
     continue;
    }
    break;
   }
  }
  if (!c) {
   break a;
  }
  while (1) {
   n[a | 0] = q[b | 0];
   a = a + 1 | 0;
   b = b + 1 | 0;
   c = c + -1 | 0;
   if (c) {
    continue;
   }
   break;
  }
 }
}
function Op(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0;
 c = sa - 96 | 0;
 sa = c;
 a : {
  if (!qb(b, 8)) {
   break a;
  }
  b : {
   d = ap(p[a + 48 >> 2] + 160 | 0);
   if ((zb(d, 2) | 0) != 2) {
    break b;
   }
   b = p[a + 52 >> 2];
   c : {
    if (!b) {
     h = a, i = Yc(p[a + 48 >> 2] + 160 | 0, 2), p[h + 52 >> 2] = i;
     break c;
    }
    m[p[p[b >> 2] + 8 >> 2]](b);
   }
   b = Ci(c + 72 | 0, dc(p[a + 48 >> 2]));
   e = tb(c + 48 | 0);
   if (!Bi(e, b)) {
    Ai(e);
   }
   b = Xe(p[a + 48 >> 2]);
   h = c, i = Ma(b), p[h + 40 >> 2] = i;
   h = c, i = Na(b), p[h + 32 >> 2] = i;
   while (1) {
    if (!Oa(c + 40 | 0, c + 32 | 0)) {
     break b;
    }
    b = p[p[c + 40 >> 2] >> 2];
    f = tb(c + 8 | 0);
    fd(f, e, m[p[p[b >> 2] + 92 >> 2]](b) | 0);
    g = p[a + 52 >> 2];
    m[p[p[g >> 2] + 16 >> 2]](g, p[b + 136 >> 2], f);
    Pa(c + 40 | 0);
    continue;
   }
  }
  if ((zb(d, 4) | 0) != 4) {
   break a;
  }
  b = p[a + 56 >> 2];
  d : {
   if (!b) {
    h = a, i = Yc(p[a + 48 >> 2] + 160 | 0, 4), p[h + 56 >> 2] = i;
    break d;
   }
   m[p[p[b >> 2] + 8 >> 2]](b);
  }
  b = Xe(p[a + 48 >> 2]);
  h = c, i = Ma(b), p[h + 72 >> 2] = i;
  h = c, i = Na(b), p[h + 48 >> 2] = i;
  while (1) {
   if (!Oa(c + 72 | 0, c + 48 | 0)) {
    break a;
   }
   b = p[p[c + 72 >> 2] >> 2];
   e = m[p[p[b >> 2] + 92 >> 2]](b) | 0;
   d = p[a + 56 >> 2];
   m[p[p[d >> 2] + 16 >> 2]](d, p[b + 136 >> 2], e);
   Pa(c + 72 | 0);
   continue;
  }
 }
 sa = c + 96 | 0;
}
function Qr(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0, g = 0;
 c = sa - 32 | 0;
 sa = c;
 e = p[p[a + 8 >> 2] + 4 >> 2];
 b = p[a + 4 >> 2] + 16 | 0;
 f = c, g = Ma(b), p[f + 24 >> 2] = g;
 f = c, g = Na(b), p[f + 16 >> 2] = g;
 while (1) {
  a : {
   b : {
    c : {
     if (!Oa(c + 24 | 0, c + 16 | 0)) {
      b = 2;
      break c;
     }
     d : {
      b = p[p[c + 24 >> 2] >> 2];
      if (!kd(b) | p[b + 16 >> 2] == -1) {
       break d;
      }
      d = bh(e, p[b + 16 >> 2]);
      p[b + 20 >> 2] = d;
      if (d) {
       break d;
      }
      b = 1;
      a = 1;
      break a;
     }
     b = b + 4 | 0;
     f = c, g = Ma(b), p[f + 8 >> 2] = g;
     f = c, g = Na(b), p[f >> 2] = g;
     e : {
      while (1) {
       if (!Oa(c + 8 | 0, c)) {
        d = 0;
        b = 4;
        break e;
       }
       f : {
        b = p[p[c + 8 >> 2] >> 2];
        if (p[b + 4 >> 2] < 0) {
         break f;
        }
        if (s[b + 4 >> 2] > _a(p[a + 4 >> 2] + 16 | 0) >>> 0) {
         break f;
        }
        f = b, g = p[Qa(p[a + 4 >> 2] + 16 | 0, p[b + 4 >> 2]) >> 2], p[f + 20 >> 2] = g;
        Pa(c + 8 | 0);
        continue;
       }
       break;
      }
      d = 1;
      b = 1;
     }
     if (!d) {
      break b;
     }
    }
    a = 2;
    break a;
   }
   Pa(c + 24 | 0);
   continue;
  }
  break;
 }
 sa = c + 32 | 0;
 return ((b | 0) == 2 ? 0 : a) | 0;
}
function sg(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 g = sa - 16 | 0;
 sa = g;
 d = 1;
 a : {
  b : {
   switch (b - a >> 2) {
   case 2:
    b = b + -4 | 0;
    if (!(m[p[c >> 2]](p[b >> 2], p[a >> 2]) | 0)) {
     break a;
    }
    Ya(a, b);
    break a;
   case 3:
    Fc(a, a + 4 | 0, b + -4 | 0, c);
    break a;
   case 4:
    pe(a, a + 4 | 0, a + 8 | 0, b + -4 | 0, c);
    break a;
   case 5:
    oe(a, a + 4 | 0, a + 8 | 0, a + 12 | 0, b + -4 | 0, c);
    break a;
   case 0:
   case 1:
    break a;
   default:
    break b;
   }
  }
  f = a + 8 | 0;
  Fc(a, a + 4 | 0, f, c);
  e = a + 12 | 0;
  c : {
   while (1) {
    h = (b | 0) == (e | 0);
    if (h) {
     break c;
    }
    d : {
     if (m[p[c >> 2]](p[e >> 2], p[f >> 2]) | 0) {
      p[g + 12 >> 2] = p[e >> 2];
      i = e;
      while (1) {
       e : {
        d = f;
        p[i >> 2] = p[d >> 2];
        if ((a | 0) == (d | 0)) {
         d = a;
         break e;
        }
        i = d;
        f = d + -4 | 0;
        if (m[p[c >> 2]](p[g + 12 >> 2], p[f >> 2]) | 0) {
         continue;
        }
       }
       break;
      }
      p[d >> 2] = p[g + 12 >> 2];
      j = j + 1 | 0;
      if ((j | 0) == 8) {
       break d;
      }
     }
     f = e;
     e = e + 4 | 0;
     continue;
    }
    break;
   }
   d = (e + 4 | 0) == (b | 0);
  }
  d = d | h;
 }
 sa = g + 16 | 0;
 return d & 1;
}
function sv(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 d = sa - 32 | 0;
 sa = d;
 e = p[a + 28 >> 2];
 p[d + 16 >> 2] = e;
 f = p[a + 20 >> 2];
 p[d + 28 >> 2] = c;
 p[d + 24 >> 2] = b;
 b = f - e | 0;
 p[d + 20 >> 2] = b;
 e = b + c | 0;
 j = 2;
 b = d + 16 | 0;
 a : {
  b : {
   c : {
    if (!Rf(V(p[a + 60 >> 2], d + 16 | 0, 2, d + 12 | 0) | 0)) {
     while (1) {
      f = p[d + 12 >> 2];
      if ((f | 0) == (e | 0)) {
       break c;
      }
      if ((f | 0) <= -1) {
       break b;
      }
      g = p[b + 4 >> 2];
      h = f >>> 0 > g >>> 0;
      i = (h << 3) + b | 0;
      g = f - (h ? g : 0) | 0;
      p[i >> 2] = g + p[i >> 2];
      i = (h ? 12 : 4) + b | 0;
      p[i >> 2] = p[i >> 2] - g;
      e = e - f | 0;
      b = h ? b + 8 | 0 : b;
      j = j - h | 0;
      if (!Rf(V(p[a + 60 >> 2], b | 0, j | 0, d + 12 | 0) | 0)) {
       continue;
      }
      break;
     }
    }
    p[d + 12 >> 2] = -1;
    if ((e | 0) != -1) {
     break b;
    }
   }
   b = p[a + 44 >> 2];
   p[a + 28 >> 2] = b;
   p[a + 20 >> 2] = b;
   p[a + 16 >> 2] = b + p[a + 48 >> 2];
   a = c;
   break a;
  }
  p[a + 28 >> 2] = 0;
  p[a + 16 >> 2] = 0;
  p[a + 20 >> 2] = 0;
  p[a >> 2] = p[a >> 2] | 32;
  a = 0;
  if ((j | 0) == 2) {
   break a;
  }
  a = c - p[b + 4 >> 2] | 0;
 }
 sa = d + 32 | 0;
 return a | 0;
}
function Nn(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0;
 d = sa - 48 | 0;
 sa = d;
 a : {
  b : {
   while (1) {
    if ((c | 0) == 4) {
     break b;
    }
    e = c + 8511 | 0;
    c = c + 1 | 0;
    if (n[e | 0] == (Ii(a) | 0)) {
     continue;
    }
    break;
   }
   c = 0;
   break a;
  }
  h = b, i = gc(a), p[h >> 2] = i;
  c = 0;
  if (q[a + 8 | 0]) {
   break a;
  }
  h = b, i = gc(a), p[h + 4 >> 2] = i;
  if (q[a + 8 | 0]) {
   break a;
  }
  h = b, i = gc(a), p[h + 8 >> 2] = i;
  if (q[a + 8 | 0]) {
   break a;
  }
  e = $a(d + 32 | 0);
  c : {
   d : {
    while (1) {
     c = gc(a);
     p[d + 24 >> 2] = c;
     if (!c) {
      break d;
     }
     ac(e, d + 24 | 0);
     if (!q[a + 8 | 0]) {
      continue;
     }
     break;
    }
    c = 0;
    break c;
   }
   h = d, i = Ma(e), p[h + 24 >> 2] = i;
   h = d, i = Na(e), p[h + 16 >> 2] = i;
   g = b + 12 | 0;
   b = 0;
   c = 8;
   while (1) {
    e : {
     f = Oa(d + 24 | 0, d + 16 | 0);
     if (!f) {
      break e;
     }
     p[d + 12 >> 2] = p[p[d + 24 >> 2] >> 2];
     if ((c | 0) == 8) {
      c = 0;
      b = hd(a);
     }
     h = Ln(g, d + 12 | 0), i = b >> c & 3, p[h >> 2] = i;
     if (q[a + 8 | 0]) {
      break e;
     }
     c = c + 2 | 0;
     Pa(d + 24 | 0);
     continue;
    }
    break;
   }
   c = f ^ 1;
  }
  db(e);
 }
 sa = d + 48 | 0;
 return c;
}
function lh(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 b = sa - 16 | 0;
 sa = b;
 p[a + 72 >> 2] = 7892;
 p[a >> 2] = 7804;
 f = a + 92 | 0;
 g = b, h = Ma(f), p[g + 8 >> 2] = h;
 g = b, h = Na(f), p[g >> 2] = h;
 while (1) {
  if (!Oa(b + 8 | 0, b)) {
   d = a + 104 | 0;
   g = b, h = Ma(d), p[g + 8 >> 2] = h;
   g = b, h = Na(d), p[g >> 2] = h;
   while (1) {
    if (!Oa(b + 8 | 0, b)) {
     e = a + 116 | 0;
     g = b, h = Ma(e), p[g + 8 >> 2] = h;
     g = b, h = Na(e), p[g >> 2] = h;
     while (1) {
      if (!Oa(b + 8 | 0, b)) {
       c = p[a + 172 >> 2];
       if (c) {
        m[p[p[c >> 2] + 4 >> 2]](c);
       }
       c = p[a + 168 >> 2];
       if (c) {
        m[p[p[c >> 2] + 4 >> 2]](c);
       }
       db(a + 152 | 0);
       db(a + 140 | 0);
       db(a + 128 | 0);
       db(e);
       db(d);
       db(f);
       ph(a + 76 | 0);
       jb(a);
       sa = b + 16 | 0;
       return a | 0;
      }
      c = p[p[b + 8 >> 2] >> 2];
      if (c) {
       m[p[p[c >> 2] + 4 >> 2]](c);
      }
      Pa(b + 8 | 0);
      continue;
     }
    }
    e = p[p[b + 8 >> 2] >> 2];
    if (e) {
     m[p[p[e >> 2] + 4 >> 2]](e);
    }
    Pa(b + 8 | 0);
    continue;
   }
  }
  d = p[p[b + 8 >> 2] >> 2];
  if (!((d | 0) == (a | 0) | !d)) {
   m[p[p[d >> 2] + 4 >> 2]](d);
  }
  Pa(b + 8 | 0);
  continue;
 }
}
function Sg(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 ib(a);
 a : {
  if (b) {
   d = a;
   f = b;
   if (1073741823 < b >>> 0) {
    Nb();
    E();
   }
   Ic(d, La(f << 2));
   i = ib(a), j = f, p[i >> 2] = j;
   while (1) if ((c | 0) == (f | 0)) {
    b = a + 8 | 0;
    d = p[b >> 2];
    if (!d) {
     break a;
    }
    g = ab(p[d + 4 >> 2], f);
    i = Qa(a, g), j = b, p[i >> 2] = j;
    while (1) {
     b = p[d >> 2];
     if (!b) {
      break a;
     }
     b : {
      e = ab(p[b + 4 >> 2], f);
      if ((g | 0) == (e | 0)) {
       break b;
      }
      c = b;
      if (!p[Qa(a, e) >> 2]) {
       i = Qa(a, e), j = d, p[i >> 2] = j;
       g = e;
       break b;
      }
      c : {
       while (1) {
        h = p[c >> 2];
        if (!h) {
         break c;
        }
        if (Ed(kb(a), b + 8 | 0, p[c >> 2] + 8 | 0)) {
         c = p[c >> 2];
         continue;
        }
        break;
       }
       h = p[c >> 2];
      }
      p[d >> 2] = h;
      i = c, j = p[p[Qa(a, e) >> 2] >> 2], p[i >> 2] = j;
      i = p[Qa(a, e) >> 2], j = b, p[i >> 2] = j;
      continue;
     }
     d = b;
     continue;
    }
   } else {
    i = Qa(a, c), j = 0, p[i >> 2] = j;
    c = c + 1 | 0;
    continue;
   }
  }
  Ic(a, 0);
  i = ib(a), j = 0, p[i >> 2] = j;
 }
}
function Ej(a) {
 var b = 0, c = 0, d = 0, g = 0, h = 0;
 g = (i(a), e(2));
 c = g >>> 23 & 255;
 if ((c | 0) == 255) {
  return w(a / a);
 }
 b = g << 1;
 if (b >>> 0 > 2130706432) {
  a : {
   if (!c) {
    c = 0;
    b = g << 9;
    if ((b | 0) >= 0) {
     while (1) {
      c = c + -1 | 0;
      b = b << 1;
      if ((b | 0) > -1) {
       continue;
      }
      break;
     }
    }
    b = g << 1 - c;
    break a;
   }
   b = g & 8388607 | 8388608;
  }
  if ((c | 0) > 127) {
   while (1) {
    b : {
     d = b - 8388608 | 0;
     if ((d | 0) < 0) {
      break b;
     }
     b = d;
     if (b) {
      break b;
     }
     return w(a * w(0));
    }
    b = b << 1;
    c = c + -1 | 0;
    if ((c | 0) > 127) {
     continue;
    }
    break;
   }
   c = 127;
  }
  c : {
   d = b - 8388608 | 0;
   if ((d | 0) < 0) {
    break c;
   }
   b = d;
   if (b) {
    break c;
   }
   return w(a * w(0));
  }
  d : {
   if (b >>> 0 > 8388607) {
    d = b;
    break d;
   }
   while (1) {
    c = c + -1 | 0;
    h = b >>> 0 < 4194304;
    d = b << 1;
    b = d;
    if (h) {
     continue;
    }
    break;
   }
  }
  return f(2, g & -2147483648 | ((c | 0) >= 1 ? d + -8388608 | c << 23 : d >>> 1 - c | 0)), j();
 }
 return (b | 0) == 2130706432 ? w(a * w(0)) : a;
}
function cb(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0;
 a : {
  if (!c) {
   break a;
  }
  d = a + c | 0;
  n[d + -1 | 0] = b;
  n[a | 0] = b;
  if (c >>> 0 < 3) {
   break a;
  }
  n[d + -2 | 0] = b;
  n[a + 1 | 0] = b;
  n[d + -3 | 0] = b;
  n[a + 2 | 0] = b;
  if (c >>> 0 < 7) {
   break a;
  }
  n[d + -4 | 0] = b;
  n[a + 3 | 0] = b;
  if (c >>> 0 < 9) {
   break a;
  }
  d = 0 - a & 3;
  e = d + a | 0;
  b = v(b & 255, 16843009);
  p[e >> 2] = b;
  c = c - d & -4;
  d = c + e | 0;
  p[d + -4 >> 2] = b;
  if (c >>> 0 < 9) {
   break a;
  }
  p[e + 8 >> 2] = b;
  p[e + 4 >> 2] = b;
  p[d + -8 >> 2] = b;
  p[d + -12 >> 2] = b;
  if (c >>> 0 < 25) {
   break a;
  }
  p[e + 24 >> 2] = b;
  p[e + 20 >> 2] = b;
  p[e + 16 >> 2] = b;
  p[e + 12 >> 2] = b;
  p[d + -16 >> 2] = b;
  p[d + -20 >> 2] = b;
  p[d + -24 >> 2] = b;
  p[d + -28 >> 2] = b;
  g = e & 4 | 24;
  c = c - g | 0;
  if (c >>> 0 < 32) {
   break a;
  }
  d = b;
  f = b;
  b = e + g | 0;
  while (1) {
   p[b + 24 >> 2] = f;
   p[b + 28 >> 2] = d;
   p[b + 16 >> 2] = f;
   p[b + 20 >> 2] = d;
   p[b + 8 >> 2] = f;
   p[b + 12 >> 2] = d;
   p[b >> 2] = f;
   p[b + 4 >> 2] = d;
   b = b + 32 | 0;
   c = c + -32 | 0;
   if (c >>> 0 > 31) {
    continue;
   }
   break;
  }
 }
 return a;
}
function Tl(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = w(0), g = 0, h = 0, i = 0, j = w(0), k = 0, l = 0, n = 0, o = w(0);
 c = sa - 32 | 0;
 sa = c;
 if (qb(b, 512)) {
  d = a + 80 | 0;
  Ql(Ma(d), Na(d));
 }
 d = qb(b, 64);
 if (!(k = !qb(b, cd(cd(256, 128), 32)), l = 0, n = !q[a + 92 | 0] | d ^ 1, n ? k : l)) {
  g = a + 68 | 0;
  b = p[g + 8 >> 2];
  d = fb(c + 24 | 0, t[a + 48 >> 2], t[a + 52 >> 2]);
  h = fb(c + 16 | 0, t[a + 56 >> 2], t[a + 60 >> 2]);
  a : {
   b : {
    if (!q[a + 92 | 0]) {
     break b;
    }
    e = p[a + 96 >> 2];
    if (!e) {
     break b;
    }
    e = dc(e);
    i = hb(c + 8 | 0);
    Af(i, d, e);
    d = hb(c);
    Af(d, h, e);
    m[p[p[a >> 2] + 76 >> 2]](a, i, d);
    break a;
   }
   m[p[p[a >> 2] + 76 >> 2]](a, d, h);
  }
  f = t[a + 64 >> 2];
  j = t[g + 4 >> 2];
  a = a + 80 | 0;
  k = c, l = Ma(a), p[k + 8 >> 2] = l;
  k = c, l = Na(a), p[k >> 2] = l;
  f = w(f * j);
  while (1) {
   if (Oa(c + 8 | 0, c)) {
    a = p[p[c + 8 >> 2] >> 2];
    l = b, n = wg(p[a + 48 >> 2], f), o = t[a + 52 >> 2], k = p[p[b >> 2] + 32 >> 2], m[k](l | 0, n | 0, w(o));
    Pa(c + 8 | 0);
    continue;
   } else {
    m[p[p[b >> 2] + 36 >> 2]](b);
   }
   break;
  }
 }
 sa = c + 32 | 0;
}
function Lj(a, b, c, d) {
 a : {
  b : {
   if (b >>> 0 > 20) {
    break b;
   }
   c : {
    switch (b + -9 | 0) {
    case 0:
     b = p[c >> 2];
     p[c >> 2] = b + 4;
     p[a >> 2] = p[b >> 2];
     return;
    case 1:
     b = p[c >> 2];
     p[c >> 2] = b + 4;
     b = p[b >> 2];
     p[a >> 2] = b;
     p[a + 4 >> 2] = b >> 31;
     return;
    case 2:
     b = p[c >> 2];
     p[c >> 2] = b + 4;
     p[a >> 2] = p[b >> 2];
     p[a + 4 >> 2] = 0;
     return;
    case 4:
     b = p[c >> 2];
     p[c >> 2] = b + 4;
     b = o[b >> 1];
     p[a >> 2] = b;
     p[a + 4 >> 2] = b >> 31;
     return;
    case 5:
     b = p[c >> 2];
     p[c >> 2] = b + 4;
     p[a >> 2] = r[b >> 1];
     p[a + 4 >> 2] = 0;
     return;
    case 6:
     b = p[c >> 2];
     p[c >> 2] = b + 4;
     b = n[b | 0];
     p[a >> 2] = b;
     p[a + 4 >> 2] = b >> 31;
     return;
    case 7:
     b = p[c >> 2];
     p[c >> 2] = b + 4;
     p[a >> 2] = q[b | 0];
     p[a + 4 >> 2] = 0;
     return;
    case 3:
    case 8:
     break a;
    case 9:
     break c;
    default:
     break b;
    }
   }
   m[d | 0](a, c);
  }
  return;
 }
 b = p[c >> 2] + 7 & -8;
 p[c >> 2] = b + 8;
 c = p[b + 4 >> 2];
 p[a >> 2] = p[b >> 2];
 p[a + 4 >> 2] = c;
}
function Ag(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 ib(a);
 a : {
  if (b) {
   Ic(a, Od(b));
   i = ib(a), j = b, p[i >> 2] = j;
   while (1) if ((b | 0) == (c | 0)) {
    d = a + 8 | 0;
    e = p[d >> 2];
    if (!e) {
     break a;
    }
    g = ab(p[e + 4 >> 2], b);
    i = Qa(a, g), j = d, p[i >> 2] = j;
    while (1) {
     d = p[e >> 2];
     if (!d) {
      break a;
     }
     b : {
      f = ab(p[d + 4 >> 2], b);
      if ((g | 0) == (f | 0)) {
       break b;
      }
      c = d;
      if (!p[Qa(a, f) >> 2]) {
       i = Qa(a, f), j = e, p[i >> 2] = j;
       g = f;
       break b;
      }
      c : {
       while (1) {
        h = p[c >> 2];
        if (!h) {
         break c;
        }
        kb(a);
        if (Ji(d + 8 | 0, p[c >> 2] + 8 | 0)) {
         c = p[c >> 2];
         continue;
        }
        break;
       }
       h = p[c >> 2];
      }
      p[e >> 2] = h;
      i = c, j = p[p[Qa(a, f) >> 2] >> 2], p[i >> 2] = j;
      i = p[Qa(a, f) >> 2], j = d, p[i >> 2] = j;
      continue;
     }
     e = d;
     continue;
    }
   } else {
    i = Qa(a, c), j = 0, p[i >> 2] = j;
    c = c + 1 | 0;
    continue;
   }
  }
  Ic(a, 0);
  i = ib(a), j = 0, p[i >> 2] = j;
 }
}
function Yg(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 ib(a);
 a : {
  if (b) {
   Ic(a, Od(b));
   i = ib(a), j = b, p[i >> 2] = j;
   while (1) if ((b | 0) == (c | 0)) {
    d = a + 8 | 0;
    e = p[d >> 2];
    if (!e) {
     break a;
    }
    g = ab(p[e + 4 >> 2], b);
    i = Qa(a, g), j = d, p[i >> 2] = j;
    while (1) {
     d = p[e >> 2];
     if (!d) {
      break a;
     }
     b : {
      f = ab(p[d + 4 >> 2], b);
      if ((g | 0) == (f | 0)) {
       break b;
      }
      c = d;
      if (!p[Qa(a, f) >> 2]) {
       i = Qa(a, f), j = e, p[i >> 2] = j;
       g = f;
       break b;
      }
      c : {
       while (1) {
        h = p[c >> 2];
        if (!h) {
         break c;
        }
        if (Uc(kb(a), d + 8 | 0, p[c >> 2] + 8 | 0)) {
         c = p[c >> 2];
         continue;
        }
        break;
       }
       h = p[c >> 2];
      }
      p[e >> 2] = h;
      i = c, j = p[p[Qa(a, f) >> 2] >> 2], p[i >> 2] = j;
      i = p[Qa(a, f) >> 2], j = d, p[i >> 2] = j;
      continue;
     }
     e = d;
     continue;
    }
   } else {
    i = Qa(a, c), j = 0, p[i >> 2] = j;
    c = c + 1 | 0;
    continue;
   }
  }
  Ic(a, 0);
  i = ib(a), j = 0, p[i >> 2] = j;
 }
}
function zc(a) {
 var b = w(0), c = 0, d = 0, f = 0, g = 0;
 c = sa - 16 | 0;
 sa = c;
 f = (i(a), e(2));
 d = f & 2147483647;
 a : {
  if (d >>> 0 <= 1061752794) {
   b = w(1);
   if (d >>> 0 < 964689920) {
    break a;
   }
   b = Mb(+a);
   break a;
  }
  if (d >>> 0 <= 1081824209) {
   g = +a;
   if (d >>> 0 >= 1075235812) {
    b = w(-Mb(((f | 0) > -1 ? -3.141592653589793 : 3.141592653589793) + g));
    break a;
   }
   if ((f | 0) <= -1) {
    b = Lb(g + 1.5707963267948966);
    break a;
   }
   b = Lb(1.5707963267948966 - g);
   break a;
  }
  if (d >>> 0 <= 1088565717) {
   if (d >>> 0 >= 1085271520) {
    b = Mb(((f | 0) > -1 ? -6.283185307179586 : 6.283185307179586) + +a);
    break a;
   }
   if ((f | 0) <= -1) {
    b = Lb(-4.71238898038469 - +a);
    break a;
   }
   b = Lb(+a + -4.71238898038469);
   break a;
  }
  b = w(a - a);
  if (d >>> 0 >= 2139095040) {
   break a;
  }
  b : {
   switch (Qj(a, c + 8 | 0) & 3) {
   case 0:
    b = Mb(u[c + 8 >> 3]);
    break a;
   case 1:
    b = Lb(-u[c + 8 >> 3]);
    break a;
   case 2:
    b = w(-Mb(u[c + 8 >> 3]));
    break a;
   default:
    break b;
   }
  }
  b = Lb(u[c + 8 >> 3]);
 }
 a = b;
 sa = c + 16 | 0;
 return a;
}
function Ac(a) {
 var b = 0, c = 0, d = 0, f = 0;
 b = sa - 16 | 0;
 sa = b;
 f = (i(a), e(2));
 c = f & 2147483647;
 a : {
  if (c >>> 0 <= 1061752794) {
   if (c >>> 0 < 964689920) {
    break a;
   }
   a = Lb(+a);
   break a;
  }
  if (c >>> 0 <= 1081824209) {
   d = +a;
   if (c >>> 0 <= 1075235811) {
    if ((f | 0) <= -1) {
     a = w(-Mb(d + 1.5707963267948966));
     break a;
    }
    a = Mb(d + -1.5707963267948966);
    break a;
   }
   a = Lb(-(((f | 0) > -1 ? -3.141592653589793 : 3.141592653589793) + d));
   break a;
  }
  if (c >>> 0 <= 1088565717) {
   d = +a;
   if (c >>> 0 <= 1085271519) {
    if ((f | 0) <= -1) {
     a = Mb(d + 4.71238898038469);
     break a;
    }
    a = w(-Mb(d + -4.71238898038469));
    break a;
   }
   a = Lb(((f | 0) > -1 ? -6.283185307179586 : 6.283185307179586) + d);
   break a;
  }
  if (c >>> 0 >= 2139095040) {
   a = w(a - a);
   break a;
  }
  b : {
   switch (Qj(a, b + 8 | 0) & 3) {
   case 0:
    a = Lb(u[b + 8 >> 3]);
    break a;
   case 1:
    a = Mb(u[b + 8 >> 3]);
    break a;
   case 2:
    a = Lb(-u[b + 8 >> 3]);
    break a;
   default:
    break b;
   }
  }
  a = w(-Mb(u[b + 8 >> 3]));
 }
 sa = b + 16 | 0;
 return a;
}
function Aq(a, b) {
 var c = w(0), d = 0, e = w(0), f = w(0), g = w(0), h = w(0), i = w(0);
 d = 1;
 while (1) {
  a : {
   if ((d | 0) == 10) {
    c = t[a + 60 >> 2];
    break a;
   }
   c = t[((d << 2) + a | 0) + 20 >> 2];
   if (c <= b ^ 1) {
    break a;
   }
   d = d + 1 | 0;
   e = w(e + w(.10000000149011612));
   continue;
  }
  break;
 }
 f = t[((d << 2) + a | 0) + 16 >> 2];
 c = w(e + w(w(w(b - f) / w(c - f)) * w(.10000000149011612)));
 f = t[a + 4 >> 2];
 h = t[a + 12 >> 2];
 g = xh(c, f, h);
 b : {
  if (!(g >= w(.0010000000474974513) ^ 1)) {
   d = 0;
   while (1) {
    if ((d | 0) == 4) {
     break b;
    }
    e = xh(c, f, h);
    if (e == w(0)) {
     break b;
    }
    c = w(c - w(w(Xd(c, f, h) - b) / e));
    d = d + 1 | 0;
    continue;
   }
  }
  if (g == w(0)) {
   break b;
  }
  g = w(e + w(.10000000149011612));
  d = 0;
  while (1) {
   c = w(e + w(w(g - e) * w(.5)));
   i = w(Xd(c, f, h) - b);
   if (w(x(i)) > w(1.0000000116860974e-7) ^ 1) {
    break b;
   }
   a = i > w(0);
   g = a ? c : g;
   e = a ? e : c;
   d = d + 1 | 0;
   if ((d | 0) != 10) {
    continue;
   }
   break;
  }
 }
 return c;
}
function Hr(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 c = sa - 32 | 0;
 sa = c;
 e = p[a + 20 >> 2];
 b = (b ? b + -72 | 0 : 0) + 92 | 0;
 g = c, h = Ma(b), p[g + 24 >> 2] = h;
 g = c, h = Na(b), p[g + 16 >> 2] = h;
 f = a + 60 | 0;
 while (1) {
  a : {
   b : {
    if (Oa(c + 24 | 0, c + 16 | 0)) {
     d = p[p[c + 24 >> 2] >> 2];
     if (!d) {
      break a;
     }
     if (!zf(d)) {
      break b;
     }
     b = d;
     while (1) {
      if (!b) {
       break b;
      }
      if ((b | 0) == (e | 0)) {
       Qn(d, a);
       break b;
      } else {
       b = p[b + 20 >> 2];
       continue;
      }
     }
    }
    g = a, h = td(), p[g + 76 >> 2] = h;
    sa = c + 32 | 0;
    return 0;
   }
   if (!xi(d) | (d | 0) == (e | 0)) {
    break a;
   }
   b = d;
   while (1) {
    if (!b) {
     break a;
    }
    if (p[a + 72 >> 2] == (b | 0)) {
     p[c + 12 >> 2] = d;
     rh(d + 160 | 0, cd(4, 16));
     yb(f, c + 12 | 0);
    } else {
     b = p[b + 20 >> 2];
     continue;
    }
    break;
   }
  }
  Pa(c + 24 | 0);
  continue;
 }
}
function qt(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0, h = w(0), i = 0, j = w(0);
 e = sa - 16 | 0;
 sa = e;
 d = p[a + 20 >> 2];
 g = 0;
 a : {
  if (!d) {
   break a;
  }
  g = $d(d, b);
 }
 d = p[a + 12 >> 2];
 b : {
  if (!(!d | !p[a + 8 >> 2] | !p[d + 12 >> 2])) {
   p[e + 12 >> 2] = 1065353216;
   p[e + 8 >> 2] = 0;
   i = e, j = w(t[a + 28 >> 2] + w(b / $s(p[a + 12 >> 2], p[a + 8 >> 2]))), t[i + 4 >> 2] = j;
   d = ld(e + 12 | 0, fj(e + 8 | 0, e + 4 | 0));
   h = t[d >> 2];
   p[a + 28 >> 2] = p[d >> 2];
   d = h < w(1);
   break b;
  }
  p[a + 28 >> 2] = 1065353216;
  d = 0;
 }
 f = p[a + 24 >> 2];
 if (!(q[a + 16 | 0] | (!f | !d))) {
  $d(f, b);
 }
 d = 0;
 c : {
  d : {
   while (1) {
    if (dj(a, p[p[a >> 2] + 28 >> 2], c)) {
     f = 1;
    } else {
     f = dj(a, p[a + 4 >> 2], c);
    }
    if (!f) {
     break d;
    }
    f = (d | 0) != 100;
    d = d + 1 | 0;
    if (f) {
     continue;
    }
    break;
   }
   Of(2128, 38, p[5164]);
   a = 0;
   break c;
  }
  a = t[a + 28 >> 2] != w(1) | g;
 }
 sa = e + 16 | 0;
 return a;
}
function ir(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = w(0), e = 0, f = w(0), g = w(0), h = w(0), i = w(0), j = w(0), k = w(0), l = w(0), m = w(0), n = w(0);
 e = sa - 16 | 0;
 sa = e;
 if (qb(b, 8)) {
  g = t[a + 156 >> 2];
  d = t[a + 164 >> 2];
  i = t[a + 156 >> 2];
  c = a + 168 | 0;
  j = w(t[a + 152 >> 2] * w(.5));
  f = w(j - w(t[a + 160 >> 2] * t[a + 152 >> 2]));
  Bb(c, f);
  h = w(g * w(.5));
  g = w(h - w(d * i));
  d = w(g - h);
  Ab(c, d);
  i = w(j * w(.5522847771644592));
  k = w(f - i);
  Td(c, fb(e + 8 | 0, k, d));
  i = w(i + f);
  Ud(c, fb(e + 8 | 0, i, d));
  c = a + 264 | 0;
  d = w(j + f);
  Bb(c, d);
  Ab(c, g);
  l = w(h * w(.5522847771644592));
  m = w(g - l);
  Td(c, fb(e + 8 | 0, d, m));
  n = d;
  d = w(l + g);
  Ud(c, fb(e + 8 | 0, n, d));
  c = a + 360 | 0;
  Bb(c, f);
  h = w(h + g);
  Ab(c, h);
  Td(c, fb(e + 8 | 0, i, h));
  Ud(c, fb(e + 8 | 0, k, h));
  c = a + 456 | 0;
  f = w(f - j);
  Bb(c, f);
  Ab(c, g);
  Td(c, fb(e + 8 | 0, f, d));
  Ud(c, fb(e + 8 | 0, f, m));
 }
 Kc(a, b);
 sa = e + 16 | 0;
}
function wo(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = w(0), f = w(0), g = 0, h = 0, i = 0, j = w(0);
 d = sa - 48 | 0;
 sa = d;
 m[p[p[b >> 2] + 8 >> 2]](b);
 c = p[a + 172 >> 2];
 h = b, i = m[p[p[c >> 2] + 36 >> 2]](c) | 0, g = p[p[b >> 2] + 24 >> 2], m[g](h | 0, i | 0);
 c = tb(d + 24 | 0);
 e = t[a + 48 >> 2];
 f = t[a + 64 >> 2];
 g = Ja(c, 4), j = w(e * f), t[g >> 2] = j;
 e = t[a + 52 >> 2];
 f = t[a + 68 >> 2];
 g = Ja(c, 5), j = w(e * f), t[g >> 2] = j;
 m[p[p[b >> 2] + 16 >> 2]](b, c);
 c = a + 80 | 0;
 g = d, i = Ma(c), p[g + 16 >> 2] = i;
 g = d, i = Na(c), p[g + 8 >> 2] = i;
 while (1) {
  if (Oa(d + 16 | 0, d + 8 | 0)) {
   c = p[p[d + 16 >> 2] >> 2];
   m[p[p[c >> 2] + 64 >> 2]](c, b, p[a + 168 >> 2]);
   Pa(d + 16 | 0);
   continue;
  } else {
   a : {
    a = a + 176 | 0;
    while (1) {
     a = p[a >> 2];
     if (!a) {
      break a;
     }
     m[p[p[a >> 2] + 96 >> 2]](a, b);
     a = a + 152 | 0;
     continue;
    }
   }
  }
  break;
 }
 m[p[p[b >> 2] + 12 >> 2]](b);
 sa = d + 48 | 0;
}
function Kn(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 d = sa - 32 | 0;
 sa = d;
 c = En(gc(a));
 while (1) {
  e = gc(a);
  f = ta;
  h = f;
  a : {
   b : {
    if (!(e | f)) {
     a = c;
     break b;
    }
    if (q[a + 8 | 0]) {
     a = 0;
     if (!c) {
      break b;
     }
     m[p[p[c >> 2] + 4 >> 2]](c);
     break b;
    }
    if (c) {
     if (m[p[p[c >> 2] + 16 >> 2]](c, e & 65535, a) | 0) {
      continue;
     }
    }
    f = e;
    g = Dn(e);
    if ((g | 0) != -1) {
     break a;
    }
    g = Cn(b, f);
    if ((g | 0) != -1) {
     break a;
    }
    p[d >> 2] = e;
    p[d + 4 >> 2] = h;
    a = 0;
    Sf(p[5164], 8585, d);
    if (!c) {
     break b;
    }
    m[p[p[c >> 2] + 4 >> 2]](c);
   }
   sa = d + 32 | 0;
   return a;
  }
  c : {
   switch (g | 0) {
   case 0:
    gc(a);
    continue;
   case 1:
    yd(d + 16 | 0, a);
    Yb(d + 16 | 0);
    continue;
   case 2:
    Sa(a);
    continue;
   case 3:
    break c;
   default:
    continue;
   }
  }
  hd(a);
  continue;
 }
}
function Wg(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0;
 d = sa - 48 | 0;
 sa = d;
 p[d + 44 >> 2] = b;
 f = d, g = Vg(a, d + 44 | 0), p[f + 32 >> 2] = g;
 f = d, g = Ug(), p[f + 16 >> 2] = g;
 b = 1;
 a : {
  if (Ne(d + 32 | 0, d + 16 | 0)) {
   break a;
  }
  b = a + 20 | 0;
  f = d, g = Vg(b, d + 44 | 0), p[f + 32 >> 2] = g;
  f = d, g = Ug(), p[f + 16 >> 2] = g;
  if (Ne(d + 32 | 0, d + 16 | 0)) {
   Of(8168, 18, p[5164]);
   b = 0;
   break a;
  }
  Tg(d + 32 | 0, b, d + 44 | 0);
  b = Ih(d + 32 | 0, p[d + 44 >> 2] + 24 | 0);
  f = d, g = Ma(b), p[f + 16 >> 2] = g;
  f = d, g = Na(b), p[f + 24 >> 2] = g;
  b : {
   while (1) {
    e = Oa(d + 16 | 0, d + 24 | 0);
    if (e) {
     if (!Wg(a, p[p[d + 16 >> 2] >> 2], c)) {
      break b;
     }
     Pa(d + 16 | 0);
     continue;
    }
    break;
   }
   Tg(d + 16 | 0, a, d + 44 | 0);
   f = d, g = Ma(c), p[f + 16 >> 2] = g;
   ho(c, p[Hc(d + 8 | 0, d + 16 | 0) >> 2], d + 44 | 0);
  }
  db(b);
  b = e ^ 1;
 }
 sa = d + 48 | 0;
 return b;
}
function gv(a, b, c, d, e, f) {
 var g = 0, h = 0, i = 0, j = 0;
 a : {
  if (f & 64) {
   c = f + -64 | 0;
   b = c & 31;
   if (32 <= (c & 63) >>> 0) {
    c = 0;
    b = e >>> b | 0;
   } else {
    c = e >>> b | 0;
    b = ((1 << b) - 1 & e) << 32 - b | d >>> b;
   }
   d = 0;
   e = 0;
   break a;
  }
  if (!f) {
   break a;
  }
  h = e;
  i = d;
  j = 64 - f | 0;
  g = j & 31;
  if (32 <= (j & 63) >>> 0) {
   h = i << g;
   j = 0;
  } else {
   h = (1 << g) - 1 & i >>> 32 - g | h << g;
   j = i << g;
  }
  i = b;
  g = f;
  b = g & 31;
  if (32 <= (g & 63) >>> 0) {
   g = 0;
   b = c >>> b | 0;
  } else {
   g = c >>> b | 0;
   b = ((1 << b) - 1 & c) << 32 - b | i >>> b;
  }
  b = j | b;
  c = g | h;
  g = d;
  d = f & 31;
  if (32 <= (f & 63) >>> 0) {
   h = 0;
   d = e >>> d | 0;
  } else {
   h = e >>> d | 0;
   d = ((1 << d) - 1 & e) << 32 - d | g >>> d;
  }
  e = h;
 }
 p[a >> 2] = b;
 p[a + 4 >> 2] = c;
 p[a + 8 >> 2] = d;
 p[a + 12 >> 2] = e;
}
function Oj(a, b, c, d, e) {
 var f = 0, g = 0, h = 0;
 f = sa - 208 | 0;
 sa = f;
 p[f + 204 >> 2] = c;
 c = 0;
 cb(f + 160 | 0, 0, 40);
 p[f + 200 >> 2] = p[f + 204 >> 2];
 a : {
  if ((Tf(0, b, f + 200 | 0, f + 80 | 0, f + 160 | 0, d, e) | 0) < 0) {
   break a;
  }
  c = p[a + 76 >> 2] >= 0 ? 1 : c;
  g = p[a >> 2];
  if (n[a + 74 | 0] <= 0) {
   p[a >> 2] = g & -33;
  }
  h = g & 32;
  b : {
   if (p[a + 48 >> 2]) {
    Tf(a, b, f + 200 | 0, f + 80 | 0, f + 160 | 0, d, e);
    break b;
   }
   p[a + 48 >> 2] = 80;
   p[a + 16 >> 2] = f + 80;
   p[a + 28 >> 2] = f;
   p[a + 20 >> 2] = f;
   g = p[a + 44 >> 2];
   p[a + 44 >> 2] = f;
   Tf(a, b, f + 200 | 0, f + 80 | 0, f + 160 | 0, d, e);
   if (!g) {
    break b;
   }
   m[p[a + 36 >> 2]](a, 0, 0) | 0;
   p[a + 48 >> 2] = 0;
   p[a + 44 >> 2] = g;
   p[a + 28 >> 2] = 0;
   p[a + 16 >> 2] = 0;
   p[a + 20 >> 2] = 0;
  }
  p[a >> 2] = p[a >> 2] | h;
  if (!c) {
   break a;
  }
 }
 sa = f + 208 | 0;
}
function ev(a, b, c, d, e, f) {
 var g = 0, h = 0, i = 0, j = 0;
 a : {
  if (f & 64) {
   d = b;
   e = f + -64 | 0;
   b = e & 31;
   if (32 <= (e & 63) >>> 0) {
    e = d << b;
    d = 0;
   } else {
    e = (1 << b) - 1 & d >>> 32 - b | c << b;
    d = d << b;
   }
   b = 0;
   c = 0;
   break a;
  }
  if (!f) {
   break a;
  }
  g = d;
  i = f;
  d = f & 31;
  if (32 <= (f & 63) >>> 0) {
   h = g << d;
   j = 0;
  } else {
   h = (1 << d) - 1 & g >>> 32 - d | e << d;
   j = g << d;
  }
  d = c;
  g = b;
  f = 64 - f | 0;
  e = f & 31;
  if (32 <= (f & 63) >>> 0) {
   f = 0;
   d = d >>> e | 0;
  } else {
   f = d >>> e | 0;
   d = ((1 << e) - 1 & d) << 32 - e | g >>> e;
  }
  d = j | d;
  e = f | h;
  f = b;
  b = i & 31;
  if (32 <= (i & 63) >>> 0) {
   h = f << b;
   b = 0;
  } else {
   h = (1 << b) - 1 & f >>> 32 - b | c << b;
   b = f << b;
  }
  c = h;
 }
 p[a >> 2] = b;
 p[a + 4 >> 2] = c;
 p[a + 8 >> 2] = d;
 p[a + 12 >> 2] = e;
}
function Cf(a, b, c, d, e, f, g) {
 var h = w(0), i = 0, j = w(0), k = w(0), l = w(0), m = w(0), n = w(0), o = w(0), p = w(0), q = w(0), r = w(0), s = w(0), u = w(0), x = w(0), y = 0, z = w(0);
 p = t[Ja(e, 0) >> 2];
 q = t[Ja(e, 2) >> 2];
 r = t[Ja(e, 4) >> 2];
 s = t[Ja(e, 1) >> 2];
 u = t[Ja(e, 3) >> 2];
 x = t[Ja(e, 5) >> 2];
 while (1) {
  if ((i | 0) != 4) {
   e = Oi(i, d);
   if (e) {
    h = w(w(e | 0) / w(255));
    e = v(Oi(i, c), 24);
    j = w(j + w(h * t[e + f >> 2]));
    e = (e | 4) + f | 0;
    k = w(k + w(h * t[e >> 2]));
    l = w(l + w(h * t[e + 8 >> 2]));
    m = w(m + w(h * t[e + 4 >> 2]));
    n = w(n + w(h * t[e + 16 >> 2]));
    o = w(o + w(h * t[e + 12 >> 2]));
   }
   i = i + 1 | 0;
   continue;
  }
  break;
 }
 h = w(w(w(s * a) + w(u * b)) + x);
 a = w(w(w(p * a) + w(q * b)) + r);
 y = Ja(g, 0), z = w(o + w(w(h * m) + w(a * j))), t[y >> 2] = z;
 y = Ja(g, 1), z = w(n + w(w(h * l) + w(a * k))), t[y >> 2] = z;
}
function Yc(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 c = sa - 16 | 0;
 sa = c;
 d = zb(cd(b, q[a | 0]), 16);
 a = a + 4 | 0;
 g = c, h = Ma(a), p[g + 8 >> 2] = h;
 g = c, h = Na(a), p[g >> 2] = h;
 f = (d | 0) == 16;
 a = 0;
 a : {
  while (1) {
   if (Oa(c + 8 | 0, c)) {
    d = p[p[c + 8 >> 2] >> 2];
    b : {
     c : {
      if (b) {
       if ((zb(b, m[p[p[d >> 2] + 60 >> 2]](d) | 0) | 0) != (b | 0)) {
        break c;
       }
      }
      if (Se(d)) {
       e = 1;
       if (p[d + 72 >> 2]) {
        break b;
       }
      }
      f = 1;
     }
     e = a;
    }
    a = e;
    Pa(c + 8 | 0);
    continue;
   } else {
    if (a & f) {
     a = La(108);
     Xh(a);
     p[a >> 2] = 5160;
     g = a, h = td(), p[g + 104 >> 2] = h;
     break a;
    }
   }
   break;
  }
  if (a & 1) {
   a = La(104);
   b = cb(a, 0, 104);
   Xh(b);
   p[b >> 2] = 7060;
   break a;
  }
  a = td();
 }
 sa = c + 16 | 0;
 return a;
}
function wm(a, b, c, d) {
 var e = 0, f = 0, g = 0, h = 0, i = 0, j = w(0);
 h = a + 8 | 0;
 i = _a(h);
 e = i + -1 | 0;
 while (1) {
  a : {
   b : {
    if ((g | 0) <= (e | 0)) {
     f = e + g >> 1;
     j = t[p[Qa(h, f) >> 2] + 20 >> 2];
     if (!(j < c ^ 1)) {
      g = f + 1 | 0;
      continue;
     }
     if (!(j > c ^ 1)) {
      break b;
     }
     g = f;
    }
    f = p[a + 4 >> 2];
    if (!g) {
     a = p[Qa(h, 0) >> 2];
     m[p[p[a >> 2] + 44 >> 2]](a, b, f, d);
     return;
    }
    e = p[Qa(h, g + -1 | 0) >> 2];
    if ((g | 0) < (i | 0)) {
     a = p[Qa(h, g) >> 2];
     if (t[a + 20 >> 2] == c) {
      m[p[p[a >> 2] + 44 >> 2]](a, b, f, d);
      return;
     }
     if (!p[e + 8 >> 2]) {
      break a;
     }
     m[p[p[e >> 2] + 48 >> 2]](e, b, f, c, a, d);
     return;
    }
    break a;
   }
   e = f + -1 | 0;
   continue;
  }
  break;
 }
 m[p[p[e >> 2] + 44 >> 2]](e, b, f, d);
}
function Hn(a, b, c) {
 var d = 0, e = 0, f = 0;
 d = sa - 48 | 0;
 sa = d;
 p[d + 40 >> 2] = c;
 o[d + 46 >> 1] = b;
 e = d, f = Bj(a, d + 46 | 0), p[e + 32 >> 2] = f;
 e = d, f = Pc(), p[e + 24 >> 2] = f;
 a : {
  if (Kd(d + 32 | 0, d + 24 | 0)) {
   e = d, f = p[Xb(d + 32 | 0) + 4 >> 2], p[e + 24 >> 2] = f;
   b = a + 20 | 0;
   e = d, f = zn(Ma(b), Na(b), d + 24 | 0), p[e + 16 >> 2] = f;
   e = d, f = Na(b), p[e + 8 >> 2] = f;
   if (Oa(d + 16 | 0, d + 8 | 0)) {
    yn(b, p[Hc(d, d + 16 | 0) >> 2]);
   }
   b = p[d + 24 >> 2];
   c = m[p[p[b >> 2] + 8 >> 2]](b) | 0;
   b = p[d + 24 >> 2];
   if (b) {
    m[p[p[b >> 2] + 4 >> 2]](b);
   }
   if (c) {
    Pg(a, d + 46 | 0);
    break a;
   }
   c = p[d + 40 >> 2];
  }
  b : {
   if (!c) {
    Pg(a, d + 46 | 0);
    break b;
   }
   e = xn(a, d + 46 | 0), f = c, p[e >> 2] = f;
   ac(a + 20 | 0, d + 40 | 0);
  }
  c = 0;
 }
 sa = d + 48 | 0;
 return c;
}
function jt(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 d = sa - 16 | 0;
 sa = d;
 c = a + 16 | 0;
 g = d, h = Ma(c), p[g + 8 >> 2] = h;
 g = d, h = Na(c), p[g >> 2] = h;
 while (1) {
  a : {
   f = Oa(d + 8 | 0, d);
   if (!f) {
    break a;
   }
   c = p[p[d + 8 >> 2] >> 2];
   e = m[p[p[c >> 2] + 20 >> 2]](c, b) | 0;
   if (e) {
    break a;
   }
   b : {
    c : {
     switch ((m[p[p[c >> 2] + 8 >> 2]](c) | 0) + -62 | 0) {
     case 0:
      p[a + 28 >> 2] = c;
      break b;
     case 1:
      p[a + 32 >> 2] = c;
      break b;
     case 2:
      break c;
     default:
      break b;
     }
    }
    p[a + 36 >> 2] = c;
   }
   Pa(d + 8 | 0);
   continue;
  }
  break;
 }
 d : {
  if (f) {
   break d;
  }
  e = 2;
  if (!p[a + 28 >> 2] | !p[a + 32 >> 2]) {
   break d;
  }
  sa = d + 16 | 0;
  return !p[a + 36 >> 2] << 1;
 }
 sa = d + 16 | 0;
 return e & 255;
}
function ns(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 b = sa - 48 | 0;
 sa = b;
 e = tb(b + 24 | 0);
 c = a + 96 | 0;
 g = b, h = Ma(c), p[g + 16 >> 2] = h;
 g = b, h = Na(c), p[g + 8 >> 2] = h;
 f = 6;
 while (1) {
  if (Oa(b + 16 | 0, b + 8 | 0)) {
   c = p[p[b + 16 >> 2] >> 2];
   fd(e, dc(p[c + 100 >> 2]), c + 76 | 0);
   d = Ja(e, 0);
   c = f << 2;
   p[c + p[a + 108 >> 2] >> 2] = p[d >> 2];
   d = Ja(e, 1);
   p[p[a + 108 >> 2] + (c | 4) >> 2] = p[d >> 2];
   d = Ja(e, 2);
   p[(c + p[a + 108 >> 2] | 0) + 8 >> 2] = p[d >> 2];
   d = Ja(e, 3);
   p[(c + p[a + 108 >> 2] | 0) + 12 >> 2] = p[d >> 2];
   d = Ja(e, 4);
   p[(c + p[a + 108 >> 2] | 0) + 16 >> 2] = p[d >> 2];
   d = Ja(e, 5);
   p[(c + p[a + 108 >> 2] | 0) + 20 >> 2] = p[d >> 2];
   f = f + 6 | 0;
   Pa(b + 16 | 0);
   continue;
  } else {
   sa = b + 48 | 0;
  }
  break;
 }
}
function eo(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 d = sa - 48 | 0;
 sa = d;
 a : {
  if (p[a + 8 >> 2] != p[Xa(a) >> 2]) {
   break a;
  }
  g = a + 8 | 0;
  h = a + 4 | 0;
  c = p[a + 4 >> 2];
  e = p[a >> 2];
  if (c >>> 0 > e >>> 0) {
   f = c;
   c = ((c - e >> 2) + 1 | 0) / -2 << 2;
   i = g, j = Rg(f, p[g >> 2], f + c | 0), p[i >> 2] = j;
   p[h >> 2] = c + p[h >> 2];
   break a;
  }
  i = d, j = p[Xa(a) >> 2] - p[a >> 2] >> 1, p[i + 24 >> 2] = j;
  p[d + 44 >> 2] = 1;
  c = p[Ib(d + 24 | 0, d + 44 | 0) >> 2];
  c = Nd(d + 24 | 0, c, c >>> 2 | 0, p[a + 16 >> 2]);
  e = gb(d + 16 | 0, p[a + 4 >> 2]);
  f = gb(d + 8 | 0, p[a + 8 >> 2]);
  _n(c, p[e >> 2], p[f >> 2]);
  Ya(a, c);
  Ya(h, c + 4 | 0);
  Ya(g, c + 8 | 0);
  Ya(Xa(a), Xa(c));
  Xc(c);
 }
 lc(p[a + 16 >> 2], p[a + 8 >> 2], b);
 p[a + 8 >> 2] = p[a + 8 >> 2] + 4;
 sa = d + 48 | 0;
}
function Kt(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0, g = 0;
 c = sa - 16 | 0;
 sa = c;
 d = a + 28 | 0;
 f = c, g = Ma(d), p[f + 8 >> 2] = g;
 f = c, g = Na(d), p[f >> 2] = g;
 while (1) {
  a : {
   e = Oa(c + 8 | 0, c);
   if (!e) {
    break a;
   }
   d = p[p[c + 8 >> 2] >> 2];
   d = m[p[p[d >> 2] + 20 >> 2]](d, b) | 0;
   if (d) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 b : {
  if (!e) {
   a = a + 16 | 0;
   f = c, g = Ma(a), p[f + 8 >> 2] = g;
   f = c, g = Na(a), p[f >> 2] = g;
   while (1) {
    if (!Oa(c + 8 | 0, c)) {
     d = 0;
     break b;
    }
    a = p[p[c + 8 >> 2] >> 2];
    d = m[p[p[a >> 2] + 20 >> 2]](a, b) | 0;
    if (d) {
     break b;
    }
    Pa(c + 8 | 0);
    continue;
   }
  }
  sa = c + 16 | 0;
  return d & 255;
 }
 sa = c + 16 | 0;
 return d | 0;
}
function Jt(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0, g = 0;
 c = sa - 16 | 0;
 sa = c;
 d = a + 28 | 0;
 f = c, g = Ma(d), p[f + 8 >> 2] = g;
 f = c, g = Na(d), p[f >> 2] = g;
 while (1) {
  a : {
   e = Oa(c + 8 | 0, c);
   if (!e) {
    break a;
   }
   d = p[p[c + 8 >> 2] >> 2];
   d = m[p[p[d >> 2] + 24 >> 2]](d, b) | 0;
   if (d) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 b : {
  if (!e) {
   a = a + 16 | 0;
   f = c, g = Ma(a), p[f + 8 >> 2] = g;
   f = c, g = Na(a), p[f >> 2] = g;
   while (1) {
    if (!Oa(c + 8 | 0, c)) {
     d = 0;
     break b;
    }
    a = p[p[c + 8 >> 2] >> 2];
    d = m[p[p[a >> 2] + 24 >> 2]](a, b) | 0;
    if (d) {
     break b;
    }
    Pa(c + 8 | 0);
    continue;
   }
  }
  sa = c + 16 | 0;
  return d & 255;
 }
 sa = c + 16 | 0;
 return d | 0;
}
function iv(a, b) {
 var c = 0;
 c = (b | 0) != 0;
 a : {
  b : {
   c : {
    if (!b | !(a & 3)) {
     break c;
    }
    while (1) {
     if (!q[a | 0]) {
      break b;
     }
     a = a + 1 | 0;
     b = b + -1 | 0;
     c = (b | 0) != 0;
     if (!b) {
      break c;
     }
     if (a & 3) {
      continue;
     }
     break;
    }
   }
   if (!c) {
    break a;
   }
  }
  d : {
   if (!q[a | 0] | b >>> 0 < 4) {
    break d;
   }
   while (1) {
    c = p[a >> 2];
    if ((c ^ -1) & c + -16843009 & -2139062144) {
     break d;
    }
    a = a + 4 | 0;
    b = b + -4 | 0;
    if (b >>> 0 > 3) {
     continue;
    }
    break;
   }
  }
  if (!b) {
   break a;
  }
  while (1) {
   if (!q[a | 0]) {
    return a;
   }
   a = a + 1 | 0;
   b = b + -1 | 0;
   if (b) {
    continue;
   }
   break;
  }
 }
 return 0;
}
function kp(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0;
 c = sa - 16 | 0;
 sa = c;
 g = Pn(a, b);
 d = a + 164 | 0;
 j = c, k = Ma(d), p[j + 8 >> 2] = k;
 j = c, k = Na(d), p[j >> 2] = k;
 e = a + 176 | 0;
 while (1) {
  if (!Oa(c + 8 | 0, c)) {
   if (g) {
    m[p[p[b >> 2] + 12 >> 2]](b);
   }
   sa = c + 16 | 0;
   return;
  }
  d = p[p[c + 8 >> 2] >> 2];
  if (q[d + 46 | 0]) {
   m[p[p[b >> 2] + 8 >> 2]](b);
   h = d;
   i = b;
   a : {
    if ((zb(m[p[p[d >> 2] + 60 >> 2]](d) | 0, 2) | 0) == 2) {
     k = b, l = dc(a), j = p[p[b >> 2] + 16 >> 2], m[j](k | 0, l | 0);
     f = p[e + 52 >> 2];
     break a;
    }
    f = p[e + 56 >> 2];
   }
   m[p[p[d >> 2] + 64 >> 2]](h, i, f);
   m[p[p[b >> 2] + 12 >> 2]](b);
  }
  Pa(c + 8 | 0);
  continue;
 }
}
function km(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
 h = sa - 16 | 0;
 sa = h;
 g = vb(b);
 f = ab(p[c + 4 >> 2], g);
 d = p[Qa(b, f) >> 2];
 while (1) {
  e = d;
  d = p[d >> 2];
  if ((d | 0) != (c | 0)) {
   continue;
  }
  break;
 }
 a : {
  if ((e | 0) != (b + 8 | 0)) {
   if ((ab(p[e + 4 >> 2], g) | 0) == (f | 0)) {
    break a;
   }
  }
  d = p[c >> 2];
  if (d) {
   if ((ab(p[d + 4 >> 2], g) | 0) == (f | 0)) {
    break a;
   }
  }
  i = Qa(b, f), j = 0, p[i >> 2] = j;
 }
 d = p[c >> 2];
 b : {
  if (!d) {
   break b;
  }
  d = ab(p[d + 4 >> 2], g);
  if ((d | 0) == (f | 0)) {
   break b;
  }
  i = Qa(b, d), j = e, p[i >> 2] = j;
 }
 p[e >> 2] = p[c >> 2];
 p[c >> 2] = 0;
 e = Xa(b);
 p[e >> 2] = p[e >> 2] + -1;
 Cd(a, c, Dd(h + 8 | 0, Ra(b), 1));
 sa = h + 16 | 0;
}
function Qj(a, b) {
 var c = 0, d = 0, g = 0, h = 0, k = 0, l = 0;
 d = sa - 16 | 0;
 sa = d;
 g = (i(a), e(2));
 c = g & 2147483647;
 a : {
  if (c >>> 0 <= 1305022426) {
   k = +a;
   h = k * .6366197723675814 + 6755399441055744 + -6755399441055744;
   u[b >> 3] = k + h * -1.5707963109016418 + h * -1.5893254773528196e-8;
   if (x(h) < 2147483648) {
    c = ~~h;
    break a;
   }
   c = -2147483648;
   break a;
  }
  if (c >>> 0 >= 2139095040) {
   u[b >> 3] = w(a - a);
   c = 0;
   break a;
  }
  l = c;
  c = (c >>> 23 | 0) + -150 | 0;
  u[d + 8 >> 3] = (f(2, l - (c << 23) | 0), j());
  c = vv(d + 8 | 0, d, c);
  if ((g | 0) <= -1) {
   u[b >> 3] = -u[d >> 3];
   c = 0 - c | 0;
   break a;
  }
  g = p[d + 4 >> 2];
  p[b >> 2] = p[d >> 2];
  p[b + 4 >> 2] = g;
 }
 sa = d + 16 | 0;
 return c;
}
function fd(a, b, c) {
 var d = w(0), e = w(0), f = w(0), g = w(0), h = w(0), i = w(0), j = w(0), k = w(0), l = w(0), m = w(0), n = w(0), o = w(0), p = 0, q = w(0);
 d = t[Ja(b, 0) >> 2];
 e = t[Ja(b, 1) >> 2];
 f = t[Ja(b, 2) >> 2];
 g = t[Ja(b, 3) >> 2];
 n = t[Ja(b, 4) >> 2];
 o = t[Ja(b, 5) >> 2];
 h = t[Ja(c, 0) >> 2];
 i = t[Ja(c, 1) >> 2];
 j = t[Ja(c, 2) >> 2];
 k = t[Ja(c, 3) >> 2];
 l = t[Ja(c, 4) >> 2];
 m = t[Ja(c, 5) >> 2];
 p = Ja(a, 0), q = w(w(d * h) + w(f * i)), t[p >> 2] = q;
 p = Ja(a, 1), q = w(w(e * h) + w(g * i)), t[p >> 2] = q;
 p = Ja(a, 2), q = w(w(d * j) + w(f * k)), t[p >> 2] = q;
 p = Ja(a, 3), q = w(w(e * j) + w(g * k)), t[p >> 2] = q;
 p = Ja(a, 4), q = w(n + w(w(d * l) + w(f * m))), t[p >> 2] = q;
 p = Ja(a, 5), q = w(o + w(w(e * l) + w(g * m))), t[p >> 2] = q;
}
function hv(a, b) {
 a : {
  if (a) {
   if (b >>> 0 <= 127) {
    break a;
   }
   b : {
    if (!p[p[5566] >> 2]) {
     if ((b & -128) == 57216) {
      break a;
     }
     break b;
    }
    if (b >>> 0 <= 2047) {
     n[a + 1 | 0] = b & 63 | 128;
     n[a | 0] = b >>> 6 | 192;
     return 2;
    }
    if (!((b & -8192) != 57344 ? b >>> 0 >= 55296 : 0)) {
     n[a + 2 | 0] = b & 63 | 128;
     n[a | 0] = b >>> 12 | 224;
     n[a + 1 | 0] = b >>> 6 & 63 | 128;
     return 3;
    }
    if (b + -65536 >>> 0 <= 1048575) {
     n[a + 3 | 0] = b & 63 | 128;
     n[a | 0] = b >>> 18 | 240;
     n[a + 2 | 0] = b >>> 6 & 63 | 128;
     n[a + 1 | 0] = b >>> 12 & 63 | 128;
     return 4;
    }
   }
   p[5666] = 25;
   a = -1;
  } else {
   a = 1;
  }
  return a;
 }
 n[a | 0] = b;
 return 1;
}
function fs(a, b) {
 a = a | 0;
 b = b | 0;
 var c = w(0), d = 0, e = 0, f = 0, g = 0, h = w(0);
 f = sa - 32 | 0;
 sa = f;
 d = tb(f + 8 | 0);
 c = t[a + 52 >> 2];
 g = Ja(d, 0), h = c, t[g >> 2] = h;
 c = t[a + 60 >> 2];
 g = Ja(d, 1), h = c, t[g >> 2] = h;
 c = t[a + 56 >> 2];
 g = Ja(d, 2), h = c, t[g >> 2] = h;
 e = 3;
 c = t[a + 64 >> 2];
 g = Ja(d, 3), h = c, t[g >> 2] = h;
 c = t[a + 68 >> 2];
 g = Ja(d, 4), h = c, t[g >> 2] = h;
 c = t[a + 72 >> 2];
 g = Ja(d, 5), h = c, t[g >> 2] = h;
 a : {
  if (!Bi(a + 76 | 0, d)) {
   break a;
  }
  e = Gb(a, b);
  if (e) {
   break a;
  }
  e = 1;
  b = m[p[p[b >> 2] >> 2]](b, p[a + 48 >> 2]) | 0;
  if (!b) {
   break a;
  }
  if (!Ff(b)) {
   break a;
  }
  p[a + 100 >> 2] = b;
  e = 0;
 }
 sa = f + 32 | 0;
 return e | 0;
}
function im(a, b) {
 var c = 0, d = 0, e = 0, f = w(0), g = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 e = c;
 a : {
  if ((b | 0) == 1) {
   b = 2;
  } else {
   if (!(b + -1 & b)) {
    break a;
   }
   b = Qc(b);
  }
  p[e + 12 >> 2] = b;
 }
 d = vb(a);
 b : {
  if (b >>> 0 > d >>> 0) {
   Ag(a, b);
   break b;
  }
  if (b >>> 0 >= d >>> 0) {
   break b;
  }
  g = kc(d);
  f = w(C(w(w(s[Xa(a) >> 2]) / t[kb(a) >> 2])));
  c : {
   if (f < w(4294967296) & f >= w(0)) {
    b = ~~f >>> 0;
    break c;
   }
   b = 0;
  }
  e = c;
  d : {
   if (g) {
    b = Je(b);
    break d;
   }
   b = Qc(b);
  }
  p[e + 8 >> 2] = b;
  b = p[Ib(c + 12 | 0, c + 8 | 0) >> 2];
  p[c + 12 >> 2] = b;
  if (b >>> 0 >= d >>> 0) {
   break b;
  }
  Ag(a, b);
 }
 sa = c + 16 | 0;
}
function Zg(a, b) {
 var c = 0, d = 0, e = 0, f = w(0), g = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 e = c;
 a : {
  if ((b | 0) == 1) {
   b = 2;
  } else {
   if (!(b + -1 & b)) {
    break a;
   }
   b = Qc(b);
  }
  p[e + 12 >> 2] = b;
 }
 d = vb(a);
 b : {
  if (b >>> 0 > d >>> 0) {
   Yg(a, b);
   break b;
  }
  if (b >>> 0 >= d >>> 0) {
   break b;
  }
  g = kc(d);
  f = w(C(w(w(s[Xa(a) >> 2]) / t[kb(a) >> 2])));
  c : {
   if (f < w(4294967296) & f >= w(0)) {
    b = ~~f >>> 0;
    break c;
   }
   b = 0;
  }
  e = c;
  d : {
   if (g) {
    b = Je(b);
    break d;
   }
   b = Qc(b);
  }
  p[e + 8 >> 2] = b;
  b = p[Ib(c + 12 | 0, c + 8 | 0) >> 2];
  p[c + 12 >> 2] = b;
  if (b >>> 0 >= d >>> 0) {
   break b;
  }
  Yg(a, b);
 }
 sa = c + 16 | 0;
}
function $n(a, b) {
 var c = 0, d = 0, e = 0, f = w(0), g = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 e = c;
 a : {
  if ((b | 0) == 1) {
   b = 2;
  } else {
   if (!(b + -1 & b)) {
    break a;
   }
   b = Qc(b);
  }
  p[e + 12 >> 2] = b;
 }
 d = vb(a);
 b : {
  if (b >>> 0 > d >>> 0) {
   Sg(a, b);
   break b;
  }
  if (b >>> 0 >= d >>> 0) {
   break b;
  }
  g = kc(d);
  f = w(C(w(w(s[Xa(a) >> 2]) / t[kb(a) >> 2])));
  c : {
   if (f < w(4294967296) & f >= w(0)) {
    b = ~~f >>> 0;
    break c;
   }
   b = 0;
  }
  e = c;
  d : {
   if (g) {
    b = Je(b);
    break d;
   }
   b = Qc(b);
  }
  p[e + 8 >> 2] = b;
  b = p[Ib(c + 12 | 0, c + 8 | 0) >> 2];
  p[c + 12 >> 2] = b;
  if (b >>> 0 >= d >>> 0) {
   break b;
  }
  Sg(a, b);
 }
 sa = c + 16 | 0;
}
function kj(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0, g = 0;
 b = sa - 16 | 0;
 sa = b;
 p[a >> 2] = 1856;
 d = a + 28 | 0;
 f = b, g = Ma(d), p[f + 8 >> 2] = g;
 f = b, g = Na(d), p[f >> 2] = g;
 while (1) {
  a : {
   if (!Oa(b + 8 | 0, b)) {
    c = a + 16 | 0;
    f = b, g = Ma(c), p[f + 8 >> 2] = g;
    f = b, g = Na(c), p[f >> 2] = g;
    while (1) {
     if (!Oa(b + 8 | 0, b)) {
      break a;
     }
     e = p[p[b + 8 >> 2] >> 2];
     if (e) {
      m[p[p[e >> 2] + 4 >> 2]](e);
     }
     Pa(b + 8 | 0);
     continue;
    }
   }
   c = p[p[b + 8 >> 2] >> 2];
   if (c) {
    m[p[p[c >> 2] + 4 >> 2]](c);
   }
   Pa(b + 8 | 0);
   continue;
  }
  break;
 }
 db(d);
 db(c);
 be(a);
 sa = b + 16 | 0;
 return a | 0;
}
function Pf(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0;
 d = p[c + 16 >> 2];
 a : {
  if (!d) {
   if (Su(c)) {
    break a;
   }
   d = p[c + 16 >> 2];
  }
  f = p[c + 20 >> 2];
  if (d - f >>> 0 < b >>> 0) {
   return m[p[c + 36 >> 2]](c, a, b) | 0;
  }
  b : {
   if (n[c + 75 | 0] < 0) {
    break b;
   }
   e = b;
   while (1) {
    d = e;
    if (!d) {
     break b;
    }
    e = d + -1 | 0;
    if (q[e + a | 0] != 10) {
     continue;
    }
    break;
   }
   e = m[p[c + 36 >> 2]](c, a, d) | 0;
   if (e >>> 0 < d >>> 0) {
    break a;
   }
   a = a + d | 0;
   b = b - d | 0;
   f = p[c + 20 >> 2];
   g = d;
  }
  Qb(f, a, b);
  p[c + 20 >> 2] = p[c + 20 >> 2] + b;
  e = b + g | 0;
 }
 return e;
}
function bs(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = w(0);
 a : {
  b : {
   switch (b + -95 | 0) {
   case 0:
    d = a, e = gc(c), p[d + 48 >> 2] = e;
    break a;
   case 1:
    d = a, f = w(Sa(c)), t[d + 52 >> 2] = f;
    break a;
   case 2:
    d = a, f = w(Sa(c)), t[d + 56 >> 2] = f;
    break a;
   case 3:
    d = a, f = w(Sa(c)), t[d + 60 >> 2] = f;
    break a;
   case 4:
    d = a, f = w(Sa(c)), t[d + 64 >> 2] = f;
    break a;
   case 5:
    d = a, f = w(Sa(c)), t[d + 68 >> 2] = f;
    break a;
   case 6:
    d = a, f = w(Sa(c)), t[d + 72 >> 2] = f;
    break a;
   default:
    break b;
   }
  }
  return xb(a, b, c) | 0;
 }
 return 1;
}
function Yo(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = w(0), f = 0, g = 0, h = 0, i = w(0), j = w(0), k = w(0), l = w(0);
 b = m[p[p[a >> 2] + 128 >> 2]](a) | 0;
 f = (b | 0) > 0 ? b : 0;
 g = a + 140 | 0;
 h = 6.283185307179586 / +(b | 0);
 i = w(t[a + 152 >> 2] * w(.5));
 j = w(t[a + 156 >> 2] * w(.5));
 k = w(w(t[a + 152 >> 2] * t[a + 176 >> 2]) * w(.5));
 l = w(w(t[a + 156 >> 2] * t[a + 176 >> 2]) * w(.5));
 d = -1.5707963267948966;
 while (1) {
  if ((c | 0) != (f | 0)) {
   b = p[Qa(g, c) >> 2];
   e = w(d);
   a : {
    if (c & 1) {
     Ue(a, b, l, k, e);
     break a;
    }
    Ue(a, b, j, i, e);
   }
   c = c + 1 | 0;
   d = h + d;
   continue;
  }
  break;
 }
}
function Bi(a, b) {
 var c = w(0), d = w(0), e = w(0), f = w(0), g = w(0), h = w(0), i = w(0), j = w(0), k = 0, l = w(0);
 d = t[Ja(b, 0) >> 2];
 e = t[Ja(b, 1) >> 2];
 f = t[Ja(b, 2) >> 2];
 g = t[Ja(b, 3) >> 2];
 i = t[Ja(b, 4) >> 2];
 b = Ja(b, 5);
 h = w(w(d * g) - w(e * f));
 if (h != w(0)) {
  j = t[b >> 2];
  c = w(w(1) / h);
  k = Ja(a, 0), l = w(g * c), t[k >> 2] = l;
  k = Ja(a, 1), l = w(c * w(-e)), t[k >> 2] = l;
  k = Ja(a, 2), l = w(c * w(-f)), t[k >> 2] = l;
  k = Ja(a, 3), l = w(d * c), t[k >> 2] = l;
  k = Ja(a, 4), l = w(c * w(w(f * j) - w(g * i))), t[k >> 2] = l;
  k = Ja(a, 5), l = w(c * w(w(e * i) - w(d * j))), t[k >> 2] = l;
 }
 return h != w(0);
}
function Kl(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0, h = 0;
 f = sa - 16 | 0;
 sa = f;
 d = a + 8 | 0;
 Fc(a, a + 4 | 0, d, c);
 e = a + 12 | 0;
 while (1) {
  if ((b | 0) != (e | 0)) {
   if (m[p[c >> 2]](p[e >> 2], p[d >> 2]) | 0) {
    p[f + 12 >> 2] = p[e >> 2];
    h = e;
    while (1) {
     a : {
      g = d;
      p[h >> 2] = p[d >> 2];
      if ((a | 0) == (d | 0)) {
       g = a;
       break a;
      }
      h = g;
      d = g + -4 | 0;
      if (m[p[c >> 2]](p[f + 12 >> 2], p[d >> 2]) | 0) {
       continue;
      }
     }
     break;
    }
    p[g >> 2] = p[f + 12 >> 2];
   }
   d = e;
   e = d + 4 | 0;
   continue;
  }
  break;
 }
 sa = f + 16 | 0;
}
function os(a, b) {
 a = a | 0;
 b = b | 0;
 var c = w(0), d = 0, e = 0, f = w(0);
 c = t[a + 48 >> 2];
 b = a + 72 | 0;
 e = Ja(b, 0), f = c, t[e >> 2] = f;
 c = t[a + 56 >> 2];
 e = Ja(b, 1), f = c, t[e >> 2] = f;
 c = t[a + 52 >> 2];
 e = Ja(b, 2), f = c, t[e >> 2] = f;
 c = t[a + 60 >> 2];
 e = Ja(b, 3), f = c, t[e >> 2] = f;
 c = t[a + 64 >> 2];
 e = Ja(b, 4), f = c, t[e >> 2] = f;
 c = t[a + 68 >> 2];
 e = Ja(b, 5), f = c, t[e >> 2] = f;
 d = a;
 b = p[a + 20 >> 2];
 if ((m[p[p[b >> 2] + 8 >> 2]](b) | 0) == 16) {
  b = b ? b + 156 | 0 : 0;
 } else {
  b = 0;
 }
 p[d + 112 >> 2] = b;
 if (b) {
  p[b + 4 >> 2] = a;
  a = 0;
 } else {
  a = 1;
 }
 return a | 0;
}
function go(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0;
 d = sa - 16 | 0;
 sa = d;
 e = Ke(Xa(a), p[b >> 2]);
 a : {
  b : {
   f = vb(a);
   if (!f) {
    break b;
   }
   g = ab(e, f);
   c = p[Qa(a, g) >> 2];
   if (!c) {
    break b;
   }
   while (1) {
    c = p[c >> 2];
    if (!c) {
     break b;
    }
    if (p[c + 4 >> 2] != (e | 0)) {
     if ((ab(p[c + 4 >> 2], f) | 0) != (g | 0)) {
      break b;
     }
    }
    if (p[c + 4 >> 2] != (e | 0)) {
     continue;
    }
    if (!Ed(kb(a), c + 8 | 0, b)) {
     continue;
    }
    break;
   }
   c = p[gb(d + 8 | 0, c) >> 2];
   break a;
  }
  c = vc();
  p[d + 8 >> 2] = c;
 }
 sa = d + 16 | 0;
 return c;
}
function pm(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0;
 d = sa - 16 | 0;
 sa = d;
 Xa(a);
 e = p[b >> 2];
 a : {
  b : {
   f = vb(a);
   if (!f) {
    break b;
   }
   g = ab(e, f);
   c = p[Qa(a, g) >> 2];
   if (!c) {
    break b;
   }
   while (1) {
    c = p[c >> 2];
    if (!c) {
     break b;
    }
    if (p[c + 4 >> 2] != (e | 0)) {
     if ((ab(p[c + 4 >> 2], f) | 0) != (g | 0)) {
      break b;
     }
    }
    if (p[c + 4 >> 2] != (e | 0)) {
     continue;
    }
    if (!Uc(kb(a), c + 8 | 0, b)) {
     continue;
    }
    break;
   }
   c = p[gb(d + 8 | 0, c) >> 2];
   break a;
  }
  c = vc();
  p[d + 8 >> 2] = c;
 }
 sa = d + 16 | 0;
 return c;
}
function ej(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0;
 d = sa - 16 | 0;
 sa = d;
 Xa(a);
 e = r[b >> 1];
 a : {
  b : {
   f = vb(a);
   if (!f) {
    break b;
   }
   g = ab(e, f);
   c = p[Qa(a, g) >> 2];
   if (!c) {
    break b;
   }
   while (1) {
    c = p[c >> 2];
    if (!c) {
     break b;
    }
    if (p[c + 4 >> 2] != (e | 0)) {
     if ((ab(p[c + 4 >> 2], f) | 0) != (g | 0)) {
      break b;
     }
    }
    if (p[c + 4 >> 2] != (e | 0)) {
     continue;
    }
    if (!Mi(kb(a), c + 8 | 0, b)) {
     continue;
    }
    break;
   }
   c = p[gb(d + 8 | 0, c) >> 2];
   break a;
  }
  c = vc();
  p[d + 8 >> 2] = c;
 }
 sa = d + 16 | 0;
 return c;
}
function Rt(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = w(0);
 a : {
  b : {
   switch (b + -56 | 0) {
   case 0:
    d = a, e = gc(c), p[d + 16 >> 2] = e;
    break a;
   case 1:
    d = a, e = gc(c), p[d + 20 >> 2] = e;
    break a;
   case 2:
    d = a, f = w(Sa(c)), t[d + 24 >> 2] = f;
    break a;
   case 3:
    d = a, e = gc(c), p[d + 28 >> 2] = e;
    break a;
   case 4:
    d = a, e = gc(c), p[d + 32 >> 2] = e;
    break a;
   case 5:
    d = a, e = gc(c), p[d + 36 >> 2] = e;
    break a;
   case 6:
    d = a, e = Gc(c), n[d + 40 | 0] = e;
    break a;
   default:
    break b;
   }
  }
  return pj(a, b, c) | 0;
 }
 return 1;
}
function Ho(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0;
 d = sa - 16 | 0;
 sa = d;
 e = $g(Xa(a), b);
 a : {
  b : {
   f = vb(a);
   if (!f) {
    break b;
   }
   g = ab(e, f);
   c = p[Qa(a, g) >> 2];
   if (!c) {
    break b;
   }
   while (1) {
    c = p[c >> 2];
    if (!c) {
     break b;
    }
    if (p[c + 4 >> 2] != (e | 0)) {
     if ((ab(p[c + 4 >> 2], f) | 0) != (g | 0)) {
      break b;
     }
    }
    if (p[c + 4 >> 2] != (e | 0)) {
     continue;
    }
    if (!Uc(kb(a), c + 8 | 0, b)) {
     continue;
    }
    break;
   }
   c = p[gb(d + 8 | 0, c) >> 2];
   break a;
  }
  c = vc();
  p[d + 8 >> 2] = c;
 }
 sa = d + 16 | 0;
 return c;
}
function yo(a) {
 var b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 a : {
  d = ch(a);
  if (!d) {
   break a;
  }
  e = a + 128 | 0;
  h = _a(e);
  while (1) {
   if (!ch(a)) {
    break a;
   }
   b = 0;
   if (f >>> 0 > 99) {
    break a;
   }
   while (1) {
    b : {
     if ((b | 0) == (h | 0)) {
      break b;
     }
     c = p[Qa(e, b) >> 2];
     p[a + 164 >> 2] = b;
     g = r[c + 44 >> 1];
     if (g) {
      o[c + 44 >> 1] = 0;
      m[p[p[c >> 2] + 48 >> 2]](c, g);
      if (s[a + 164 >> 2] < b >>> 0) {
       break b;
      }
     }
     b = b + 1 | 0;
     continue;
    }
    break;
   }
   f = f + 1 | 0;
   continue;
  }
 }
 return d;
}
function Pm(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 a : {
  b : {
   switch (b + -33 | 0) {
   case 9:
    d = a, e = w(Sa(c)), t[d + 48 >> 2] = e;
    return 1;
   case 0:
    d = a, e = w(Sa(c)), t[d + 52 >> 2] = e;
    return 1;
   case 1:
    d = a, e = w(Sa(c)), t[d + 56 >> 2] = e;
    return 1;
   case 2:
    d = a, e = w(Sa(c)), t[d + 60 >> 2] = e;
    return 1;
   default:
    if ((b | 0) == 46) {
     break a;
    }
    break;
   case 3:
   case 4:
   case 5:
   case 6:
   case 7:
   case 8:
    break b;
   }
  }
  return xb(a, b, c) | 0;
 }
 d = a, e = w(Sa(c)), t[d + 64 >> 2] = e;
 return 1;
}
function Er(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0, g = 0;
 c = sa - 16 | 0;
 sa = c;
 a : {
  if (!qb(b, cd(8, 64))) {
   break a;
  }
  b = p[a + 76 >> 2];
  m[p[p[b >> 2] + 8 >> 2]](b);
  b = p[a + 76 >> 2];
  m[p[p[b >> 2] + 12 >> 2]](b, p[a + 52 >> 2]);
  b = a + 60 | 0;
  d = c, e = Ma(b), p[d + 8 >> 2] = e;
  d = c, e = Na(b), p[d >> 2] = e;
  while (1) {
   if (!Oa(c + 8 | 0, c)) {
    break a;
   }
   b = p[a + 76 >> 2];
   e = b, f = p[wi(p[p[c + 8 >> 2] >> 2]) + 56 >> 2], g = 22320, d = p[p[b >> 2] + 16 >> 2], m[d](e | 0, f | 0, g | 0);
   Pa(c + 8 | 0);
   continue;
  }
 }
 sa = c + 16 | 0;
}
function ho(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0;
 e = sa - 32 | 0;
 sa = e;
 p[e + 24 >> 2] = b;
 b = p[a >> 2];
 f = e, g = Ma(a), p[f >> 2] = g;
 b = b + (He(e + 24 | 0, e) << 2) | 0;
 a : {
  if (s[a + 4 >> 2] < s[Ra(a) >> 2]) {
   d = p[a + 4 >> 2];
   if ((d | 0) == (b | 0)) {
    $c(a, c);
    break a;
   }
   fo(a, b, d, b + 4 | 0);
   d = b;
   if (b >>> 0 <= c >>> 0) {
    c = c >>> 0 < s[a + 4 >> 2] ? c + 4 | 0 : c;
   }
   p[d >> 2] = p[c >> 2];
   break a;
  }
  d = Ra(a);
  d = Nd(e, Ld(a, _a(a) + 1 | 0), b - p[a >> 2] >> 2, d);
  eo(d, c);
  b = co(a, d, b);
  Xc(d);
 }
 Vd(b);
 sa = e + 32 | 0;
}
function kf(a, b, c, d, e, f, g, h) {
 var i = 0, j = 0, k = w(0), l = 0, m = w(0);
 i = sa - 48 | 0;
 sa = i;
 a : {
  if (Kq(a, b, c, d)) {
   k = w(f + g);
   l = i + 48 | 0;
   j = i;
   while (1) {
    j = hb(j) + 8 | 0;
    if ((l | 0) != (j | 0)) {
     continue;
    }
    break;
   }
   Qd(a, b, c, d, w(.5), i);
   b = i + 40 | 0;
   m = e;
   e = w(k * w(.5));
   e = kf(b, i + 32 | 0, i + 16 | 0, d, kf(a, i, i + 24 | 0, b, m, f, e, h), e, g, h);
   break a;
  }
  f = zi(a, d);
  e = w(f + e);
  if (f > w(.05000000074505806) ^ 1) {
   break a;
  }
  Jq(h, fb(i, g, e));
 }
 sa = i + 48 | 0;
 return e;
}
function rf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 a : {
  b : {
   c : {
    d : {
     switch (b + -20 | 0) {
     default:
      switch (b + -123 | 0) {
      case 1:
       break b;
      case 0:
       break c;
      default:
       break a;
      }
     case 0:
      d = a, e = w(Sa(c)), t[d + 152 >> 2] = e;
      return 1;
     case 1:
      break d;
     }
    }
    d = a, e = w(Sa(c)), t[d + 156 >> 2] = e;
    return 1;
   }
   d = a, e = w(Sa(c)), t[d + 160 >> 2] = e;
   return 1;
  }
  d = a, e = w(Sa(c)), t[d + 164 >> 2] = e;
  return 1;
 }
 return qf(a, b, c) | 0;
}
function ms(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0;
 b = sa - 16 | 0;
 sa = b;
 c = a + 96 | 0;
 e = b, f = Ma(c), p[e + 8 >> 2] = f;
 e = b, f = Na(c), p[e >> 2] = f;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   Tb(p[p[p[b + 8 >> 2] >> 2] + 100 >> 2], a);
   Pa(b + 8 | 0);
   continue;
  } else {
   d = a;
   a = v(_a(c), 6) + 6 | 0;
   a = La((a | 0) != (a & 1073741822) ? -1 : a << 2);
   p[d + 108 >> 2] = a;
   p[a + 16 >> 2] = 0;
   p[a + 20 >> 2] = 0;
   p[a + 8 >> 2] = 0;
   p[a + 12 >> 2] = 1065353216;
   p[a >> 2] = 1065353216;
   p[a + 4 >> 2] = 0;
   sa = b + 16 | 0;
  }
  break;
 }
}
function gs(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 a : {
  b : {
   switch (b + -104 | 0) {
   case 0:
    d = a, e = w(Sa(c)), t[d + 48 >> 2] = e;
    break a;
   case 1:
    d = a, e = w(Sa(c)), t[d + 52 >> 2] = e;
    break a;
   case 2:
    d = a, e = w(Sa(c)), t[d + 56 >> 2] = e;
    break a;
   case 3:
    d = a, e = w(Sa(c)), t[d + 60 >> 2] = e;
    break a;
   case 4:
    d = a, e = w(Sa(c)), t[d + 64 >> 2] = e;
    break a;
   case 5:
    d = a, e = w(Sa(c)), t[d + 68 >> 2] = e;
    break a;
   default:
    break b;
   }
  }
  return xb(a, b, c) | 0;
 }
 return 1;
}
function Cj(a) {
 var b = 0, c = 0, d = 0;
 a : {
  b : {
   b = a;
   if (!(b & 3)) {
    break b;
   }
   if (!q[a | 0]) {
    return 0;
   }
   while (1) {
    b = b + 1 | 0;
    if (!(b & 3)) {
     break b;
    }
    if (q[b | 0]) {
     continue;
    }
    break;
   }
   break a;
  }
  while (1) {
   c = b;
   b = b + 4 | 0;
   d = p[c >> 2];
   if (!((d ^ -1) & d + -16843009 & -2139062144)) {
    continue;
   }
   break;
  }
  if (!(d & 255)) {
   return c - a | 0;
  }
  while (1) {
   d = q[c + 1 | 0];
   b = c + 1 | 0;
   c = b;
   if (d) {
    continue;
   }
   break;
  }
 }
 return b - a | 0;
}
function qo(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 a : {
  b : {
   switch (b + -7 | 0) {
   case 0:
    d = a, e = w(Sa(c)), t[d + 48 >> 2] = e;
    break a;
   case 1:
    d = a, e = w(Sa(c)), t[d + 52 >> 2] = e;
    break a;
   case 2:
    d = a, e = w(Sa(c)), t[d + 56 >> 2] = e;
    break a;
   case 3:
    d = a, e = w(Sa(c)), t[d + 60 >> 2] = e;
    break a;
   case 4:
    d = a, e = w(Sa(c)), t[d + 64 >> 2] = e;
    break a;
   case 5:
    d = a, e = w(Sa(c)), t[d + 68 >> 2] = e;
    break a;
   default:
    break b;
   }
  }
  return xb(a, b, c) | 0;
 }
 return 1;
}
function On(a, b) {
 var c = 0, d = 0, e = 0;
 d = sa - 48 | 0;
 sa = d;
 e = d + 16 | 0;
 Re(e + 12 | 0);
 a : {
  if (!Nn(a, e)) {
   Of(8456, 11, p[5164]);
   break a;
  }
  if (p[e >> 2] != 7) {
   a = p[e >> 2];
   b = p[e + 4 >> 2];
   p[d + 8 >> 2] = 7;
   p[d + 12 >> 2] = 0;
   p[d + 4 >> 2] = b;
   p[d >> 2] = a;
   Sf(p[5164], 8468, d);
   break a;
  }
  c = La(16);
  p[c >> 2] = 0;
  p[c + 4 >> 2] = 0;
  p[c + 8 >> 2] = 0;
  p[c + 12 >> 2] = 0;
  p[c >> 2] = 0;
  $a(c + 4 | 0);
  if (Mn(c, a, e)) {
   Qg(c);
   Ua(c);
   break a;
  }
  p[b >> 2] = c;
 }
 Wc(e + 12 | 0);
 sa = d + 48 | 0;
}
function tp(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = w(0), e = w(0), f = w(0), g = w(0);
 if (qb(b, 8)) {
  e = t[a + 168 >> 2];
  d = t[a + 164 >> 2];
  g = t[a + 156 >> 2];
  c = a + 172 | 0;
  f = w(t[a + 152 >> 2] * w(-t[a + 160 >> 2]));
  Bb(c, f);
  d = w(g * w(-d));
  Ab(c, d);
  Sc(c, e);
  c = a + 236 | 0;
  Bb(c, w(f + t[a + 152 >> 2]));
  Ab(c, d);
  Sc(c, e);
  c = a + 300 | 0;
  Bb(c, w(f + t[a + 152 >> 2]));
  Ab(c, w(d + t[a + 156 >> 2]));
  Sc(c, e);
  c = a + 364 | 0;
  Bb(c, f);
  Ab(c, w(d + t[a + 156 >> 2]));
  Sc(c, e);
 }
 Kc(a, b);
}
function Cp(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0;
 a : {
  d = a + 140 | 0;
  a = _a(d);
  if ((b | 0) == (a | 0)) {
   break a;
  }
  if ((a | 0) >= (b | 0)) {
   c = b;
   while (1) {
    if ((a | 0) == (c | 0)) {
     Ah(d, b);
     break a;
    }
    e = p[Qa(d, c) >> 2];
    if (e) {
     m[p[p[e >> 2] + 4 >> 2]](e);
    }
    c = c + 1 | 0;
    continue;
   }
  }
  Ah(d, b);
  while (1) {
   if ((a | 0) == (b | 0)) {
    break a;
   }
   c = cb(La(64), 0, 64);
   Vb(c);
   f = Qa(d, a), g = c, p[f >> 2] = g;
   a = a + 1 | 0;
   continue;
  }
 }
}
function jo(a) {
 var b = 0, c = 0, d = 0;
 b = 4;
 c = 4;
 while (1) {
  if (c >>> 0 >= 4) {
   d = v(q[a | 0] | q[a + 1 | 0] << 8 | (q[a + 2 | 0] << 16 | q[a + 3 | 0] << 24), 1540483477);
   b = v(d ^ d >>> 24, 1540483477) ^ v(b, 1540483477);
   c = c + -4 | 0;
   a = a + 4 | 0;
   continue;
  }
  break;
 }
 a : {
  switch (c + -1 | 0) {
  case 2:
   b = q[a + 2 | 0] << 16 ^ b;
  case 1:
   b = q[a + 1 | 0] << 8 ^ b;
  case 0:
   b = v(q[a | 0] ^ b, 1540483477);
   break;
  default:
   break a;
  }
 }
 a = v(b >>> 13 ^ b, 1540483477);
 return a >>> 15 ^ a;
}
function Fb(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0;
 d = sa - 16 | 0;
 sa = d;
 e = 0;
 a : {
  if ((zb(r[a + 44 >> 1], b) | 0) == (b | 0)) {
   break a;
  }
  Id(a + 44 | 0, b);
  m[p[p[a >> 2] + 44 >> 2]](a, r[a + 44 >> 1]);
  Bo(p[a + 40 >> 2], a);
  e = 1;
  if (!c) {
   break a;
  }
  a = a + 24 | 0;
  f = d, g = Ma(a), p[f + 8 >> 2] = g;
  f = d, g = Na(a), p[f >> 2] = g;
  while (1) {
   if (Oa(d + 8 | 0, d)) {
    Fb(p[p[d + 8 >> 2] >> 2], b, 1);
    Pa(d + 8 | 0);
    continue;
   }
   break;
  }
  e = 1;
 }
 a = e;
 sa = d + 16 | 0;
 return a;
}
function Yr(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0;
 e = a;
 a : {
  while (1) {
   if (e >>> 0 >= b >>> 0) {
    break a;
   }
   h = q[e | 0];
   g = h & 127;
   i = d & 255;
   f = i;
   d = f & 31;
   if (32 <= (f & 63) >>> 0) {
    f = g << d;
    d = 0;
   } else {
    f = (1 << d) - 1 & g >>> 32 - d;
    d = g << d;
   }
   j = d | j;
   k = f | k;
   e = e + 1 | 0;
   d = i + 7 | 0;
   if (h & 128) {
    continue;
   }
   break;
  }
  p[c >> 2] = j;
  p[c + 4 >> 2] = k;
  l = e - a | 0;
 }
 return l;
}
function Iq(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a : {
  if (m[p[p[b >> 2] >> 2]](b, p[a + 4 >> 2]) | 0) {
   a = a + 8 | 0;
   d = c, e = Ma(a), p[d + 8 >> 2] = e;
   d = c, e = Na(a), p[d >> 2] = e;
   while (1) {
    if (!Oa(c + 8 | 0, c)) {
     a = 0;
     break a;
    }
    a = p[p[c + 8 >> 2] >> 2];
    a = m[p[p[a >> 2] + 20 >> 2]](a, b) | 0;
    if (a) {
     break a;
    }
    Pa(c + 8 | 0);
    continue;
   }
  }
  sa = c + 16 | 0;
  return 1;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function Dy(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 92 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   b : {
    if (!a) {
     break b;
    }
    if (!(m[p[p[a >> 2] + 12 >> 2]](a, 41) | 0)) {
     break b;
    }
    if (xc(ib(a), b)) {
     break a;
    }
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function Rc(a, b, c) {
 var d = 0, e = 0, f = 0;
 a : {
  if ((b | 0) == 1 & a >>> 0 < 0 | b >>> 0 < 1) {
   d = a;
   break a;
  }
  while (1) {
   d = Yy(a, b, 10);
   e = ta;
   f = e;
   e = Xy(d, e, 10);
   c = c + -1 | 0;
   n[c | 0] = a - e | 48;
   e = b >>> 0 > 9;
   a = d;
   b = f;
   if (e) {
    continue;
   }
   break;
  }
 }
 if (d) {
  while (1) {
   c = c + -1 | 0;
   a = (d >>> 0) / 10 | 0;
   n[c | 0] = d - v(a, 10) | 48;
   b = d >>> 0 > 9;
   d = a;
   if (b) {
    continue;
   }
   break;
  }
 }
 return c;
}
function ce(a, b) {
 a : {
  if ((b | 0) >= 1024) {
   a = a * 8.98846567431158e+307;
   if ((b | 0) < 2047) {
    b = b + -1023 | 0;
    break a;
   }
   a = a * 8.98846567431158e+307;
   b = ((b | 0) < 3069 ? b : 3069) + -2046 | 0;
   break a;
  }
  if ((b | 0) > -1023) {
   break a;
  }
  a = a * 2.2250738585072014e-308;
  if ((b | 0) > -2045) {
   b = b + 1022 | 0;
   break a;
  }
  a = a * 2.2250738585072014e-308;
  b = ((b | 0) > -3066 ? b : -3066) + 2044 | 0;
 }
 f(0, 0);
 f(1, b + 1023 << 20);
 return a * +g();
}
function lp(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = w(0), e = 0, f = 0;
 c = sa - 16 | 0;
 sa = c;
 we(a, b);
 a : {
  if (!qb(b, 128)) {
   break a;
  }
  b = a + 164 | 0;
  e = c, f = Ma(b), p[e + 8 >> 2] = f;
  e = c, f = Na(b), p[e >> 2] = f;
  while (1) {
   if (!Oa(c + 8 | 0, c)) {
    break a;
   }
   b = p[p[p[c + 8 >> 2] >> 2] + 52 >> 2];
   d = t[a + 112 >> 2];
   if (t[b + 4 >> 2] != d) {
    t[b + 4 >> 2] = d;
    m[p[p[b >> 2] >> 2]](b);
   }
   Pa(c + 8 | 0);
   continue;
  }
 }
 sa = c + 16 | 0;
}
function Fc(a, b, c, d) {
 var e = 0, f = 0;
 e = m[p[d >> 2]](p[b >> 2], p[a >> 2]) | 0;
 f = m[p[d >> 2]](p[c >> 2], p[b >> 2]) | 0;
 a : {
  b : {
   if (!e) {
    e = 0;
    if (!f) {
     break a;
    }
    Ya(b, c);
    e = 1;
    if (!(m[p[d >> 2]](p[b >> 2], p[a >> 2]) | 0)) {
     break a;
    }
    Ya(a, b);
    break b;
   }
   if (f) {
    Ya(a, c);
    return 1;
   }
   Ya(a, b);
   e = 1;
   if (!(m[p[d >> 2]](p[c >> 2], p[b >> 2]) | 0)) {
    break a;
   }
   Ya(b, c);
  }
  e = 2;
 }
 return e;
}
function Jy(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 92 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   b : {
    if (!a) {
     break b;
    }
    if (!zg(a)) {
     break b;
    }
    if (xc(ib(a), b)) {
     break a;
    }
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function Hy(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 92 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   b : {
    if (!a) {
     break b;
    }
    if (!yf(a)) {
     break b;
    }
    if (xc(ib(a), b)) {
     break a;
    }
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function Fy(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 92 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   b : {
    if (!a) {
     break b;
    }
    if (!Ff(a)) {
     break b;
    }
    if (xc(ib(a), b)) {
     break a;
    }
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function jl(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0;
 b = sa - 48 | 0;
 sa = b;
 c = $a(b + 32 | 0);
 hl(b + 8 | 0, a);
 d = gl(b + 8 | 0);
 Eb(b + 8 | 0);
 fl(c, d);
 p[b + 12 >> 2] = p[c >> 2];
 p[b + 8 >> 2] = d;
 d = el(b + 24 | 0, b + 8 | 0);
 bl(p[d >> 2], a);
 a = Zr(b + 8 | 0, p[c >> 2], Zb(c));
 p[b + 4 >> 2] = 0;
 On(a, b + 4 | 0);
 a = p[b + 4 >> 2];
 Eb(d);
 jg(c);
 if (p[c >> 2]) {
  kk(c, p[c >> 2]);
  Ra(c);
  d = p[c >> 2];
  Dc(c);
  Ua(d);
 }
 sa = b + 48 | 0;
 return a | 0;
}
function Pn(a, b) {
 var c = 0, d = 0, e = 0, f = 0;
 c = sa - 16 | 0;
 sa = c;
 a : {
  a = a + 136 | 0;
  d = _a(a);
  if (!d) {
   break a;
  }
  m[p[p[b >> 2] + 8 >> 2]](b);
  e = c, f = Ma(a), p[e + 8 >> 2] = f;
  e = c, f = Na(a), p[e >> 2] = f;
  while (1) {
   if (!Oa(c + 8 | 0, c)) {
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   if (q[a + 56 | 0]) {
    m[p[p[b >> 2] + 24 >> 2]](b, p[a + 76 >> 2]);
   }
   Pa(c + 8 | 0);
   continue;
  }
 }
 sa = c + 16 | 0;
 return (d | 0) != 0;
}
function Bt(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = w(0);
 a : {
  b : {
   c : {
    switch (b + -63 | 0) {
    case 0:
     e = a, f = w(Sa(c)), t[e + 4 >> 2] = f;
     break b;
    case 1:
     e = a, f = w(Sa(c)), t[e + 8 >> 2] = f;
     break b;
    case 2:
     e = a, f = w(Sa(c)), t[e + 12 >> 2] = f;
     break b;
    case 3:
     break c;
    default:
     break a;
    }
   }
   e = a, f = w(Sa(c)), t[e + 16 >> 2] = f;
  }
  d = 1;
 }
 return d | 0;
}
function dl(a, b) {
 var c = 0, d = 0;
 d = sa - 32 | 0;
 sa = d;
 a : {
  if (p[Ra(a) >> 2] - p[a + 4 >> 2] >>> 0 >= b >>> 0) {
   Ax(a, b);
   break a;
  }
  c = Ra(a);
  c = yx(d + 8 | 0, zx(a, Zb(a) + b | 0), Zb(a), c);
  xx(c, b);
  wx(a, c);
  a = c;
  b = p[a + 4 >> 2];
  while (1) {
   if (p[a + 8 >> 2] != (b | 0)) {
    p[a + 8 >> 2] = p[a + 8 >> 2] + -1;
    continue;
   }
   break;
  }
  if (p[c >> 2]) {
   a = p[c >> 2];
   p[Xa(c) >> 2];
   Ua(a);
  }
 }
 sa = d + 32 | 0;
}
function Ss(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0, g = 0;
 c = 1;
 d = Db(b, 53);
 a : {
  if (!d) {
   break a;
  }
  c = 2;
  if (p[a + 4 >> 2] < 0) {
   break a;
  }
  if (s[a + 4 >> 2] >= gj(p[d + 4 >> 2]) >>> 0) {
   break a;
  }
  if (!(f = a, g = hj(p[d + 4 >> 2], p[a + 4 >> 2]), e = p[p[a >> 2] + 40 >> 2], m[e](f | 0, g | 0) | 0)) {
   break a;
  }
  c = 1;
  b = Db(b, 65);
  if (!b) {
   break a;
  }
  at(p[b + 4 >> 2], a);
  c = 0;
 }
 return c | 0;
}
function rt(a, b) {
 a = a | 0;
 b = w(b);
 var c = 0, d = 0;
 n[a + 4 | 0] = 0;
 while (1) {
  a : {
   if (c >>> 0 >= s[a + 16 >> 2]) {
    c = 0;
    break a;
   }
   if (qt(p[a + 20 >> 2] + (c << 5) | 0, b, p[a + 12 >> 2])) {
    n[a + 4 | 0] = 1;
   }
   c = c + 1 | 0;
   continue;
  }
  break;
 }
 while (1) {
  if (c >>> 0 < s[a + 8 >> 2]) {
   d = p[p[a + 12 >> 2] + (c << 2) >> 2];
   m[p[p[d >> 2] >> 2]](d);
   c = c + 1 | 0;
   continue;
  }
  break;
 }
 return q[a + 4 | 0];
}
function Qf(a, b, c) {
 var d = 0, e = 0, f = 0;
 e = sa - 16 | 0;
 sa = e;
 if (4294967279 >= c >>> 0) {
  a : {
   if (c >>> 0 <= 10) {
    oj(a, c);
    d = a;
    break a;
   }
   f = av(c) + 1 | 0;
   d = f;
   if (4294967295 < d >>> 0) {
    Nb();
    E();
   }
   d = La(d);
   p[a >> 2] = d;
   p[a + 8 >> 2] = f | -2147483648;
   p[a + 4 >> 2] = c;
  }
  if (c) {
   Qb(d, b, c);
  }
  n[e + 15 | 0] = 0;
  nj(c + d | 0, e + 15 | 0);
  sa = e + 16 | 0;
  return;
 }
 Nb();
 E();
}
function wv(a) {
 var b = w(0), c = w(0), d = 0, f = 0;
 d = (i(a), e(2));
 f = d >>> 23 & 255;
 if (f >>> 0 <= 149) {
  if (f >>> 0 <= 125) {
   return w(a * w(0));
  }
  a = (d | 0) > -1 ? a : w(-a);
  b = w(w(w(a + w(8388608)) + w(-8388608)) - a);
  a : {
   if (!(b > w(.5) ^ 1)) {
    c = w(w(a + b) + w(-1));
    break a;
   }
   a = w(a + b);
   c = a;
   if (b <= w(-.5) ^ 1) {
    break a;
   }
   c = w(a + w(1));
  }
  a = c;
  a = (d | 0) > -1 ? a : w(-a);
 }
 return a;
}
function Os(a, b) {
 a = a | 0;
 b = b | 0;
 if (!b) {
  return 1;
 }
 a : {
  switch (p[a + 8 >> 2] - 1 | 0) {
  default:
   return t[b + 12 >> 2] == t[a + 12 >> 2] | 0;
  case 0:
   return t[b + 12 >> 2] != t[a + 12 >> 2] | 0;
  case 1:
   return t[b + 12 >> 2] <= t[a + 12 >> 2] | 0;
  case 3:
   return t[b + 12 >> 2] < t[a + 12 >> 2] | 0;
  case 2:
   return t[b + 12 >> 2] >= t[a + 12 >> 2] | 0;
  case 4:
   break a;
  }
 }
 return t[b + 12 >> 2] > t[a + 12 >> 2] | 0;
}
function Jn(a) {
 var b = 0, c = 0, d = 0;
 b = sa - 16 | 0;
 sa = b;
 c = a + 20 | 0;
 Cg(b + 8 | 0, Na(c));
 a : {
  while (1) {
   Cg(b, Ma(c));
   if (!Bn(b + 8 | 0, b)) {
    break a;
   }
   a = p[An(b + 8 | 0) >> 2];
   if (!(m[p[p[a >> 2] + 12 >> 2]](a) | 0)) {
    a = b + 8 | 0;
    d = p[a + 4 >> 2];
    p[b >> 2] = p[a >> 2];
    p[b + 4 >> 2] = d;
    Bg(a + 4 | 0);
    continue;
   }
   break;
  }
  sa = b + 16 | 0;
  return;
 }
 sa = b + 16 | 0;
}
function So(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = w(0), e = w(0), f = w(0);
 if (qb(b, 8)) {
  d = t[a + 164 >> 2];
  f = t[a + 156 >> 2];
  c = a + 168 | 0;
  e = w(t[a + 152 >> 2] * w(-t[a + 160 >> 2]));
  Bb(c, w(e + w(t[a + 152 >> 2] * w(.5))));
  d = w(f * w(-d));
  Ab(c, d);
  c = a + 232 | 0;
  Bb(c, w(e + t[a + 152 >> 2]));
  Ab(c, w(d + t[a + 156 >> 2]));
  c = a + 296 | 0;
  Bb(c, e);
  Ab(c, w(d + t[a + 156 >> 2]));
 }
 Kc(a, b);
}
function it(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 16 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   a = m[p[p[a >> 2] + 24 >> 2]](a, b) | 0;
   if (a) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function dt(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 24 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   a = m[p[p[a >> 2] + 20 >> 2]](a, b) | 0;
   if (a) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function ct(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 24 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   a = m[p[p[a >> 2] + 24 >> 2]](a, b) | 0;
   if (a) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function _t(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 44 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   a = m[p[p[a >> 2] + 24 >> 2]](a, b) | 0;
   if (a) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function $t(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 44 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   a = m[p[p[a >> 2] + 20 >> 2]](a, b) | 0;
   if (a) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function fu(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 4 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   a = m[p[p[a >> 2] + 20 >> 2]](a, b) | 0;
   if (a) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function eu(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 4 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   a = m[p[p[a >> 2] + 24 >> 2]](a, b) | 0;
   if (a) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function bm(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 8 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   a = m[p[p[a >> 2] + 20 >> 2]](a, b) | 0;
   if (a) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function $l(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 8 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   a = m[p[p[a >> 2] + 24 >> 2]](a, b) | 0;
   if (a) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function Ko(a) {
 var b = 0, c = 0, d = 0, e = 0, f = 0;
 b = sa + -64 | 0;
 sa = b;
 d = jh(b + 24 | 0);
 c = a + 128 | 0;
 Xg(d, a, c);
 e = b, f = Ma(c), p[e + 16 >> 2] = f;
 e = b, f = Na(c), p[e + 8 >> 2] = f;
 c = 0;
 while (1) {
  if (Oa(b + 16 | 0, b + 8 | 0)) {
   p[p[p[b + 16 >> 2] >> 2] + 36 >> 2] = c;
   c = c + 1 | 0;
   Pa(b + 16 | 0);
   continue;
  } else {
   Id(a + 44 | 0, 2);
   gh(d);
   sa = b - -64 | 0;
  }
  break;
 }
}
function Mq(a, b) {
 var c = 0, d = 0, e = 0;
 d = sa - 32 | 0;
 sa = d;
 c = Ra(a);
 e = c;
 c = mq(d + 8 | 0, nq(a, qc(a) + 1 | 0), qc(a), c);
 Oh(e, p[c + 8 >> 2], b);
 p[c + 8 >> 2] = p[c + 8 >> 2] + 3;
 lq(a, c);
 a = c;
 b = p[c + 4 >> 2];
 while (1) {
  if (p[a + 8 >> 2] != (b | 0)) {
   p[a + 8 >> 2] = p[a + 8 >> 2] + -3;
   continue;
  }
  break;
 }
 if (p[c >> 2]) {
  a = p[c >> 2];
  p[Xa(c) >> 2];
  Ua(a);
 }
 sa = d + 32 | 0;
}
function pl(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0), f = 0;
 a : {
  switch (b + -114 | 0) {
  case 0:
   d = a, e = w(Sa(c)), t[d + 48 >> 2] = e;
   return 1;
  case 1:
   d = a, e = w(Sa(c)), t[d + 52 >> 2] = e;
   return 1;
  case 2:
   d = a, e = w(Sa(c)), t[d + 56 >> 2] = e;
   return 1;
  case 3:
   d = a, f = gc(c), p[d + 60 >> 2] = f;
   return 1;
  default:
   break a;
  }
 }
 return xb(a, b, c) | 0;
}
function Yj() {
 ha(22420, 17017);
 ga(22588, 17022, 1, 1, 0);
 Nv();
 Mv();
 Lv();
 Kv();
 Jv();
 Iv();
 Hv();
 Gv();
 Fv();
 Ev();
 Dv();
 X(22464, 17128);
 X(22634, 17140);
 T(22635, 4, 17173);
 T(22636, 2, 17186);
 T(22637, 4, 17201);
 fa(22404, 17216);
 Cv();
 Wj(17262);
 Vj(17299);
 Uj(17338);
 Tj(17369);
 Sj(17409);
 Rj(17438);
 Bv();
 Av();
 Wj(17545);
 Vj(17577);
 Uj(17610);
 Tj(17643);
 Sj(17677);
 Rj(17710);
 zv();
 yv();
}
function rr(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 a : {
  switch (b + -84 | 0) {
  case 0:
   d = a, e = w(Sa(c)), t[d + 80 >> 2] = e;
   return 1;
  case 1:
   d = a, e = w(Sa(c)), t[d + 84 >> 2] = e;
   return 1;
  case 2:
   d = a, e = w(Sa(c)), t[d + 88 >> 2] = e;
   return 1;
  case 3:
   d = a, e = w(Sa(c)), t[d + 92 >> 2] = e;
   return 1;
  default:
   break a;
  }
 }
 return bd(a, b, c) | 0;
}
function Df(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 a : {
  switch (b + -15 | 0) {
  case 0:
   d = a, e = w(Sa(c)), t[d + 48 >> 2] = e;
   return 1;
  case 1:
   d = a, e = w(Sa(c)), t[d + 52 >> 2] = e;
   return 1;
  case 2:
   d = a, e = w(Sa(c)), t[d + 56 >> 2] = e;
   return 1;
  case 3:
   d = a, e = w(Sa(c)), t[d + 60 >> 2] = e;
   return 1;
  default:
   break a;
  }
 }
 return xb(a, b, c) | 0;
}
function Qg(a) {
 var b = 0, c = 0, d = 0, e = 0, f = 0;
 b = sa - 16 | 0;
 sa = b;
 c = a + 4 | 0;
 e = b, f = Ma(c), p[e + 8 >> 2] = f;
 e = b, f = Na(c), p[e >> 2] = f;
 while (1) {
  if (!Oa(b + 8 | 0, b)) {
   a = p[a >> 2];
   if (a) {
    m[p[p[a >> 2] + 4 >> 2]](a);
   }
   db(c);
   sa = b + 16 | 0;
   return;
  }
  d = p[p[b + 8 >> 2] >> 2];
  if (d) {
   m[p[p[d >> 2] + 4 >> 2]](d);
  }
  Pa(b + 8 | 0);
  continue;
 }
}
function Km(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0), f = 0;
 a : {
  switch (b + -47 | 0) {
  case 0:
   d = a, e = w(Sa(c)), t[d + 56 >> 2] = e;
   return 1;
  case 1:
   d = a, f = gc(c), p[d + 60 >> 2] = f;
   return 1;
  case 2:
   d = a, f = gc(c), p[d + 64 >> 2] = f;
   return 1;
  case 3:
   d = a, f = Gc(c), n[d + 68 | 0] = f;
   return 1;
  default:
   break a;
  }
 }
 return ze(a, b, c) | 0;
}
function qm(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 a : {
  switch (b + -110 | 0) {
  case 0:
   d = a, e = gc(c), p[d + 64 >> 2] = e;
   return 1;
  case 1:
   d = a, e = gc(c), p[d + 68 >> 2] = e;
   return 1;
  case 2:
   d = a, e = gc(c), p[d + 72 >> 2] = e;
   return 1;
  case 3:
   d = a, e = gc(c), p[d + 76 >> 2] = e;
   return 1;
  default:
   break a;
  }
 }
 return Ni(a, b, c) | 0;
}
function oe(a, b, c, d, e, f) {
 var g = 0;
 g = pe(a, b, c, d, f);
 if (m[p[f >> 2]](p[e >> 2], p[d >> 2]) | 0) {
  Ya(d, e);
  if (!(m[p[f >> 2]](p[d >> 2], p[c >> 2]) | 0)) {
   return g + 1 | 0;
  }
  Ya(c, d);
  if (!(m[p[f >> 2]](p[c >> 2], p[b >> 2]) | 0)) {
   return g + 2 | 0;
  }
  Ya(b, c);
  if (!(m[p[f >> 2]](p[b >> 2], p[a >> 2]) | 0)) {
   return g + 3 | 0;
  }
  Ya(a, b);
  g = g + 4 | 0;
 }
 return g;
}
function rj(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0;
 b = sa - 16 | 0;
 sa = b;
 p[a >> 2] = 1672;
 c = a + 44 | 0;
 e = b, f = Ma(c), p[e + 8 >> 2] = f;
 e = b, f = Na(c), p[e >> 2] = f;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   d = p[p[b + 8 >> 2] >> 2];
   if (d) {
    m[p[p[d >> 2] + 4 >> 2]](d);
   }
   Pa(b + 8 | 0);
   continue;
  }
  break;
 }
 db(c);
 be(a);
 sa = b + 16 | 0;
 return a | 0;
}
function Zi(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0;
 b = sa - 16 | 0;
 sa = b;
 p[a >> 2] = 2176;
 c = a + 16 | 0;
 e = b, f = Ma(c), p[e + 8 >> 2] = f;
 e = b, f = Na(c), p[e >> 2] = f;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   d = p[p[b + 8 >> 2] >> 2];
   if (d) {
    m[p[p[d >> 2] + 4 >> 2]](d);
   }
   Pa(b + 8 | 0);
   continue;
  }
  break;
 }
 db(c);
 Lf(a);
 sa = b + 16 | 0;
 return a | 0;
}
function ap(a) {
 var b = 0, c = 0, d = 0;
 b = sa - 16 | 0;
 sa = b;
 n[b + 15 | 0] = q[a | 0];
 a = a + 4 | 0;
 c = b, d = Ma(a), p[c + 8 >> 2] = d;
 c = b, d = Na(a), p[c >> 2] = d;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   a = p[p[b + 8 >> 2] >> 2];
   rh(b + 15 | 0, m[p[p[a >> 2] + 60 >> 2]](a) | 0);
   Pa(b + 8 | 0);
   continue;
  } else {
   sa = b + 16 | 0;
   a = q[b + 15 | 0];
  }
  break;
 }
 return a;
}
function uo(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 104 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   if (xc(ib(a), b)) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function to(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 116 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   if (xc(ib(a), b)) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function uq(a, b, c, d) {
 var e = 0, f = 0, g = 0;
 e = sa - 16 | 0;
 sa = e;
 a : {
  b = m[p[p[b >> 2] + 76 >> 2]](b, p[a + 4 >> 2]) | 0;
  if (!b) {
   break a;
  }
  a = a + 8 | 0;
  f = e, g = Ma(a), p[f + 8 >> 2] = g;
  f = e, g = Na(a), p[f >> 2] = g;
  while (1) {
   if (!Oa(e + 8 | 0, e)) {
    break a;
   }
   wm(p[p[e + 8 >> 2] >> 2], b, c, d);
   Pa(e + 8 | 0);
   continue;
  }
 }
 sa = e + 16 | 0;
}
function jp(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0;
 b = sa - 16 | 0;
 sa = b;
 Gh(a + 176 | 0);
 xe(a);
 c = a + 164 | 0;
 d = b, e = Ma(c), p[d + 8 >> 2] = e;
 d = b, e = Na(c), p[d >> 2] = e;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   c = p[p[p[b + 8 >> 2] >> 2] + 48 >> 2];
   m[p[p[c >> 2] + 20 >> 2]](c, p[a + 128 >> 2]);
   Pa(b + 8 | 0);
   continue;
  } else {
   sa = b + 16 | 0;
  }
  break;
 }
}
function wn(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 4 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  a : {
   if (!Oa(c + 8 | 0, c)) {
    a = 0;
    break a;
   }
   a = p[p[c + 8 >> 2] >> 2];
   if (xc(ib(a), b)) {
    break a;
   }
   Pa(c + 8 | 0);
   continue;
  }
  break;
 }
 sa = c + 16 | 0;
 return a | 0;
}
function mv(a, b) {
 var c = 0, d = 0;
 c = sa - 160 | 0;
 sa = c;
 Qb(c + 8 | 0, 21208, 144);
 p[c + 52 >> 2] = a;
 p[c + 28 >> 2] = a;
 d = -2 - a | 0;
 d = 2147483647 > d >>> 0 ? d : 2147483647;
 p[c + 56 >> 2] = d;
 a = a + d | 0;
 p[c + 36 >> 2] = a;
 p[c + 24 >> 2] = a;
 Oj(c + 8 | 0, 17014, b, 1e3, 1001);
 if (d) {
  a = p[c + 28 >> 2];
  n[a - ((a | 0) == p[c + 24 >> 2]) | 0] = 0;
 }
 sa = c + 160 | 0;
}
function Pj(a, b) {
 var c = 0, d = 0, i = 0;
 h(+a);
 c = e(1) | 0;
 d = e(0) | 0;
 i = c;
 c = c >>> 20 & 2047;
 if ((c | 0) != 2047) {
  if (!c) {
   c = b;
   if (a == 0) {
    b = 0;
   } else {
    a = Pj(a * 0x10000000000000000, b);
    b = p[b >> 2] + -64 | 0;
   }
   p[c >> 2] = b;
   return a;
  }
  p[b >> 2] = c + -1022;
  f(0, d | 0);
  f(1, i & -2146435073 | 1071644672);
  a = +g();
 }
 return a;
}
function Yi(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0;
 b = sa - 16 | 0;
 sa = b;
 p[a >> 2] = 2288;
 c = a + 24 | 0;
 e = b, f = Ma(c), p[e + 8 >> 2] = f;
 e = b, f = Na(c), p[e >> 2] = f;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   d = p[p[b + 8 >> 2] >> 2];
   if (d) {
    m[p[p[d >> 2] + 4 >> 2]](d);
   }
   Pa(b + 8 | 0);
   continue;
  }
  break;
 }
 db(c);
 sa = b + 16 | 0;
 return a | 0;
}
function Nf(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0;
 b = sa - 16 | 0;
 sa = b;
 p[a >> 2] = 1564;
 c = a + 4 | 0;
 e = b, f = Ma(c), p[e + 8 >> 2] = f;
 e = b, f = Na(c), p[e >> 2] = f;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   d = p[p[b + 8 >> 2] >> 2];
   if (d) {
    m[p[p[d >> 2] + 4 >> 2]](d);
   }
   Pa(b + 8 | 0);
   continue;
  }
  break;
 }
 db(c);
 sa = b + 16 | 0;
 return a | 0;
}
function Fg(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0;
 b = sa - 16 | 0;
 sa = b;
 p[a >> 2] = 1200;
 c = a + 8 | 0;
 e = b, f = Ma(c), p[e + 8 >> 2] = f;
 e = b, f = Na(c), p[e >> 2] = f;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   d = p[p[b + 8 >> 2] >> 2];
   if (d) {
    m[p[p[d >> 2] + 4 >> 2]](d);
   }
   Pa(b + 8 | 0);
   continue;
  }
  break;
 }
 db(c);
 sa = b + 16 | 0;
 return a | 0;
}
function Ei(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0;
 b = sa - 16 | 0;
 sa = b;
 p[a >> 2] = 1088;
 c = a + 8 | 0;
 e = b, f = Ma(c), p[e + 8 >> 2] = f;
 e = b, f = Na(c), p[e >> 2] = f;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   d = p[p[b + 8 >> 2] >> 2];
   if (d) {
    m[p[p[d >> 2] + 4 >> 2]](d);
   }
   Pa(b + 8 | 0);
   continue;
  }
  break;
 }
 db(c);
 sa = b + 16 | 0;
 return a | 0;
}
function Af(a, b, c) {
 var d = w(0), e = w(0), f = w(0), g = w(0), h = w(0), i = 0, j = w(0);
 g = t[Ja(b, 0) >> 2];
 h = t[Ja(b, 1) >> 2];
 d = t[Ja(c, 0) >> 2];
 e = t[Ja(c, 2) >> 2];
 f = t[Ja(c, 4) >> 2];
 i = Ja(a, 0), j = w(f + w(w(g * d) + w(h * e))), t[i >> 2] = j;
 d = t[Ja(c, 1) >> 2];
 e = t[Ja(c, 3) >> 2];
 f = t[Ja(c, 5) >> 2];
 i = Ja(a, 1), j = w(f + w(w(g * d) + w(h * e))), t[i >> 2] = j;
}
function rd(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = 0;
 a : {
  b : {
   c : {
    switch (b + -67 | 0) {
    case 0:
     e = a, f = gc(c), p[e + 4 >> 2] = f;
     break b;
    case 1:
     e = a, f = gc(c), p[e + 8 >> 2] = f;
     break b;
    case 2:
     break c;
    default:
     break a;
    }
   }
   e = a, f = gc(c), p[e + 12 >> 2] = f;
  }
  d = 1;
 }
 return d | 0;
}
function Rq(a, b) {
 var c = 0;
 a : {
  if (t[Ja(a, 0) >> 2] != t[Ja(b, 0) >> 2]) {
   break a;
  }
  if (t[Ja(a, 1) >> 2] != t[Ja(b, 1) >> 2]) {
   break a;
  }
  if (t[Ja(a, 2) >> 2] != t[Ja(b, 2) >> 2]) {
   break a;
  }
  if (t[Ja(a, 3) >> 2] != t[Ja(b, 3) >> 2]) {
   break a;
  }
  if (t[Ja(a, 4) >> 2] != t[Ja(b, 4) >> 2]) {
   break a;
  }
  c = t[Ja(a, 5) >> 2] == t[Ja(b, 5) >> 2];
 }
 return c;
}
function Ys(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 a : {
  switch (b + -151 | 0) {
  case 0:
   d = a, e = gc(c), p[d + 4 >> 2] = e;
   return 1;
  case 1:
   d = a, e = gc(c), p[d + 8 >> 2] = e;
   return 1;
  case 7:
   d = a, e = gc(c), p[d + 12 >> 2] = e;
   return 1;
  case 9:
   d = a, e = gc(c), p[d + 16 >> 2] = e;
   return 1;
  default:
   break a;
  }
 }
 return 0;
}
function Kr(a, b) {
 var c = 0, d = 0, e = 0;
 c = p[Ja(b, 0) >> 2];
 d = Ja(a, 0), e = c, p[d >> 2] = e;
 c = p[Ja(b, 1) >> 2];
 d = Ja(a, 1), e = c, p[d >> 2] = e;
 c = p[Ja(b, 2) >> 2];
 d = Ja(a, 2), e = c, p[d >> 2] = e;
 c = p[Ja(b, 3) >> 2];
 d = Ja(a, 3), e = c, p[d >> 2] = e;
 c = p[Ja(b, 4) >> 2];
 d = Ja(a, 4), e = c, p[d >> 2] = e;
 b = p[Ja(b, 5) >> 2];
 d = Ja(a, 5), e = b, p[d >> 2] = e;
}
function Ve(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0;
 b = sa - 16 | 0;
 sa = b;
 p[a >> 2] = 6020;
 c = a + 140 | 0;
 d = b, e = Ma(c), p[d + 8 >> 2] = e;
 d = b, e = Na(c), p[d >> 2] = e;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   c = p[p[b + 8 >> 2] >> 2];
   if (c) {
    m[p[p[c >> 2] + 4 >> 2]](c);
   }
   Pa(b + 8 | 0);
   continue;
  }
  break;
 }
 nc(a);
 sa = b + 16 | 0;
 return a | 0;
}
function fo(a, b, c, d) {
 var e = 0, f = 0, g = 0, h = 0;
 f = sa - 16 | 0;
 sa = f;
 h = p[a + 4 >> 2];
 g = (h - d | 0) + b | 0;
 e = Md(f, a, c - g >> 2);
 d = g;
 while (1) {
  if (d >>> 0 < c >>> 0) {
   lc(Ra(a), p[e + 4 >> 2], d);
   p[e + 4 >> 2] = p[e + 4 >> 2] + 4;
   d = d + 4 | 0;
   continue;
  }
  break;
 }
 Ub(e);
 a = g - b | 0;
 if (a) {
  Dj(h - a | 0, b, a);
 }
 sa = f + 16 | 0;
}
function xc(a, b) {
 var c = 0, d = 0, e = 0;
 c = md(a);
 a : {
  if ((c | 0) != (md(b) | 0)) {
   break a;
  }
  d = Nc(a);
  b = Nc(b);
  if (!Oc(a)) {
   while (1) {
    e = !c;
    if (!c | q[d | 0] != q[b | 0]) {
     break a;
    }
    b = b + 1 | 0;
    d = d + 1 | 0;
    c = c + -1 | 0;
    continue;
   }
  }
  if (c) {
   a = kv(d, b, c);
  } else {
   a = 0;
  }
  e = !a;
 }
 return e;
}
function cv(a, b, c) {
 var d = 0, e = 0;
 d = sa - 16 | 0;
 sa = d;
 b = b - a >> 2;
 while (1) {
  if (b) {
   p[d + 12 >> 2] = a;
   e = b >>> 1 | 0;
   p[d + 12 >> 2] = p[d + 12 >> 2] + (e << 2);
   if (Ge(p[d + 12 >> 2], c)) {
    a = p[d + 12 >> 2] + 4 | 0;
    p[d + 12 >> 2] = a;
    b = (e ^ -1) + b | 0;
   } else {
    b = e;
   }
   continue;
  }
  break;
 }
 sa = d + 16 | 0;
 return a;
}
function xb(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = 0, g = 0;
 d = sa - 16 | 0;
 sa = d;
 a : {
  b : {
   c : {
    switch (b + -4 | 0) {
    case 0:
     yd(d, c);
     Mf(a + 4 | 0, d);
     Yb(d);
     break b;
    case 1:
     break c;
    default:
     break a;
    }
   }
   f = a, g = gc(c), p[f + 16 >> 2] = g;
  }
  e = 1;
 }
 sa = d + 16 | 0;
 return e | 0;
}
function Xr(a, b) {
 var c = 0, d = 0, e = 0, f = 0, g = 0;
 c = sa;
 f = c;
 e = gc(b);
 g = ta;
 a : {
  if (q[b + 8 | 0]) {
   Li(a);
   break a;
  }
  d = c;
  c = e;
  d = d - (c + 16 & -16) | 0;
  sa = d;
  c = Wr(c & 255, p[b >> 2], p[b + 4 >> 2], d);
  b : {
   if ((e | 0) != (c | 0) | g) {
    id(b);
    Li(a);
    break b;
   }
   p[b >> 2] = c + p[b >> 2];
   Zd(a, d);
  }
 }
 sa = f;
}
function Gn(a) {
 var b = 0, c = 0, d = 0;
 b = sa - 16 | 0;
 sa = b;
 c = b, d = Og(a), p[c + 8 >> 2] = d;
 c = b, d = Pc(), p[c >> 2] = d;
 while (1) {
  a : {
   if (!Kd(b + 8 | 0, b)) {
    a = 0;
    break a;
   }
   a = p[Xb(b + 8 | 0) + 4 >> 2];
   a = m[p[p[a >> 2] + 8 >> 2]](a) | 0;
   if (a) {
    break a;
   }
   ye(b + 8 | 0);
   continue;
  }
  break;
 }
 sa = b + 16 | 0;
 return a;
}
function $o(a) {
 var b = 0, c = 0, d = 0;
 b = sa - 16 | 0;
 sa = b;
 a = a + 4 | 0;
 c = b, d = Ma(a), p[c + 8 >> 2] = d;
 c = b, d = Na(a), p[c >> 2] = d;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   a = p[p[b + 8 >> 2] >> 2];
   if (Se(a)) {
    a = p[a + 72 >> 2];
    if (a) {
     m[p[p[a >> 2] + 4 >> 2]](a);
    }
   }
   Pa(b + 8 | 0);
   continue;
  }
  break;
 }
 sa = b + 16 | 0;
}
function Ow(a, b, c, d, e, f, g) {
 a = a | 0;
 b = w(b);
 c = w(c);
 d = w(d);
 e = w(e);
 f = w(f);
 g = w(g);
 var h = 0;
 h = sa - 32 | 0;
 sa = h;
 t[h + 24 >> 2] = c;
 t[h + 28 >> 2] = b;
 t[h + 20 >> 2] = d;
 t[h + 16 >> 2] = e;
 t[h + 12 >> 2] = f;
 t[h + 8 >> 2] = g;
 Fw(p[a + 8 >> 2], h + 28 | 0, h + 24 | 0, h + 20 | 0, h + 16 | 0, h + 12 | 0, h + 8 | 0);
 sa = h + 32 | 0;
}
function zp(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = w(0), f = w(0), g = 0;
 d = a + 140 | 0;
 e = w(t[a + 152 >> 2] * w(.5));
 f = w(t[a + 156 >> 2] * w(.5));
 g = 6.283185307179586 / +p[a + 168 >> 2];
 b = -1.5707963267948966;
 while (1) {
  if ((c | 0) < p[a + 168 >> 2]) {
   Ue(a, p[Qa(d, c) >> 2], f, e, w(b));
   c = c + 1 | 0;
   b = g + b;
   continue;
  }
  break;
 }
}
function zq(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 a = a + 8 | 0;
 d = c, e = Ma(a), p[d + 8 >> 2] = e;
 d = c, e = Na(a), p[d >> 2] = e;
 while (1) {
  if (Oa(c + 8 | 0, c)) {
   a = p[p[c + 8 >> 2] >> 2];
   m[p[p[a >> 2] + 24 >> 2]](a, b) | 0;
   Pa(c + 8 | 0);
   continue;
  } else {
   sa = c + 16 | 0;
  }
  break;
 }
 return 0;
}
function mr(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = 0;
 e = sa - 16 | 0;
 sa = e;
 Dh(a, b, c);
 d = p[a + 56 >> 2];
 f = Kb(e + 8 | 0, si(a));
 Cf(t[Ja(f, 0) >> 2], t[Ja(f, 1) >> 2], p[d + 68 >> 2], p[d + 64 >> 2], b, c, ti(d));
 a = Kb(e, ri(a));
 Cf(t[Ja(a, 0) >> 2], t[Ja(a, 1) >> 2], p[d + 76 >> 2], p[d + 72 >> 2], b, c, dc(d));
 sa = e + 16 | 0;
}
function Xi(a, b, c) {
 var d = w(0), e = w(0), f = 0, g = w(0);
 f = p[a + 16 >> 2];
 if (!f) {
  return w(0);
 }
 a : {
  if (!kd(b)) {
   break a;
  }
  b = p[b + 20 >> 2];
  d = nd(b);
  if (c) {
   break a;
  }
  e = qj(b);
 }
 g = e;
 e = w(f | 0);
 d = w(w(e / w(100)) * d);
 b : {
  if ((zb(jd(a), 8) | 0) == 8) {
   break b;
  }
  d = w(e / w(1e3));
 }
 return w(g + d);
}
function em(a) {
 var b = 0, c = w(0), d = 0, e = w(0);
 b = a - -64 | 0;
 a : {
  if (t[a + 48 >> 2] != w(0)) {
   Lr(b, t[a + 48 >> 2]);
   break a;
  }
  Ai(b);
 }
 c = w(m[p[p[a >> 2] + 72 >> 2]](a));
 b = a - -64 | 0;
 d = Ja(b, 4), e = c, t[d >> 2] = e;
 c = w(m[p[p[a >> 2] + 76 >> 2]](a));
 d = Ja(b, 5), e = c, t[d >> 2] = e;
 Jr(b, t[a + 52 >> 2], t[a + 56 >> 2]);
}
function ae(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 d = w(d);
 var e = 0, f = 0, g = 0;
 e = sa - 16 | 0;
 sa = e;
 a = a + 44 | 0;
 f = e, g = Ma(a), p[f + 8 >> 2] = g;
 f = e, g = Na(a), p[f >> 2] = g;
 while (1) {
  if (Oa(e + 8 | 0, e)) {
   uq(p[p[e + 8 >> 2] >> 2], b, c, d);
   Pa(e + 8 | 0);
   continue;
  } else {
   sa = e + 16 | 0;
  }
  break;
 }
}
function wr(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 a : {
  switch (b + -79 | 0) {
  case 0:
   d = a, e = w(Sa(c)), t[d + 80 >> 2] = e;
   return 1;
  case 1:
   d = a, e = w(Sa(c)), t[d + 84 >> 2] = e;
   return 1;
  case 2:
   d = a, e = w(Sa(c)), t[d + 88 >> 2] = e;
   return 1;
  default:
   break a;
  }
 }
 return bd(a, b, c) | 0;
}
function ls(a, b) {
 var c = 0, d = 0, e = 0, f = 0;
 c = sa - 16 | 0;
 sa = c;
 e = c, f = Ma(b), p[e + 8 >> 2] = f;
 e = c, f = Na(b), p[e >> 2] = f;
 b = a + 72 | 0;
 while (1) {
  if (Oa(c + 8 | 0, c)) {
   d = p[p[c + 8 >> 2] >> 2];
   m[p[p[d >> 2] + 60 >> 2]](d, b, p[a + 108 >> 2]);
   Pa(c + 8 | 0);
   continue;
  } else {
   sa = c + 16 | 0;
  }
  break;
 }
}
function Po(a, b, c, d) {
 var e = 0, f = 0, g = 0, h = 0;
 e = sa - 16 | 0;
 sa = e;
 p[e + 12 >> 2] = 0;
 Vc(a + 12 | 0, d);
 if (b) {
  if (1073741823 < b >>> 0) {
   Nb();
   E();
  }
  f = La(b << 2);
 }
 p[a >> 2] = f;
 c = (c << 2) + f | 0;
 p[a + 8 >> 2] = c;
 p[a + 4 >> 2] = c;
 g = Xa(a), h = (b << 2) + f | 0, p[g >> 2] = h;
 sa = e + 16 | 0;
 return a;
}
function mq(a, b, c, d) {
 var e = 0, f = 0, g = 0, h = 0;
 e = sa - 16 | 0;
 sa = e;
 p[e + 12 >> 2] = 0;
 Vc(a + 12 | 0, d);
 if (b) {
  if (1431655765 < b >>> 0) {
   Nb();
   E();
  }
  f = La(v(b, 3));
 }
 p[a >> 2] = f;
 c = v(c, 3) + f | 0;
 p[a + 8 >> 2] = c;
 p[a + 4 >> 2] = c;
 g = Xa(a), h = v(b, 3) + f | 0, p[g >> 2] = h;
 sa = e + 16 | 0;
 return a;
}
function af(a, b, c, d) {
 var e = 0, f = 0, g = 0, h = 0;
 e = sa - 16 | 0;
 sa = e;
 p[e + 12 >> 2] = 0;
 Vc(a + 12 | 0, d);
 if (b) {
  if (536870911 < b >>> 0) {
   Nb();
   E();
  }
  f = La(b << 3);
 }
 p[a >> 2] = f;
 c = (c << 3) + f | 0;
 p[a + 8 >> 2] = c;
 p[a + 4 >> 2] = c;
 g = Xa(a), h = (b << 3) + f | 0, p[g >> 2] = h;
 sa = e + 16 | 0;
 return a;
}
function Gb(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0;
 c = b ? b + -72 | 0 : 0;
 p[a + 40 >> 2] = c;
 a : {
  if ((a | 0) == (c | 0)) {
   break a;
  }
  d = 1;
  b = m[p[p[b >> 2] >> 2]](b, p[a + 16 >> 2]) | 0;
  if (!b) {
   break a;
  }
  if (!(m[p[p[b >> 2] + 12 >> 2]](b, 11) | 0)) {
   break a;
  }
  p[a + 20 >> 2] = b;
  d = 0;
 }
 return d | 0;
}
function uv(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 var e = 0;
 e = sa - 16 | 0;
 sa = e;
 a : {
  if (!Rf(aa(p[a + 60 >> 2], b | 0, c | 0, d & 255, e + 8 | 0) | 0)) {
   b = p[e + 12 >> 2];
   a = p[e + 8 >> 2];
   break a;
  }
  p[e + 8 >> 2] = -1;
  p[e + 12 >> 2] = -1;
  b = -1;
  a = -1;
 }
 sa = e + 16 | 0;
 ta = b;
 return a | 0;
}
function Fn(a) {
 var b = 0, c = 0, d = 0, e = 0;
 b = sa - 16 | 0;
 sa = b;
 d = b, e = Og(a), p[d + 8 >> 2] = e;
 d = b, e = Pc(), p[d >> 2] = e;
 while (1) {
  if (Kd(b + 8 | 0, b)) {
   c = p[Xb(b + 8 | 0) + 4 >> 2];
   if (c) {
    m[p[p[c >> 2] + 4 >> 2]](c);
   }
   ye(b + 8 | 0);
   continue;
  }
  break;
 }
 db(a + 20 | 0);
 Wc(a);
 sa = b + 16 | 0;
}
function Gh(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0;
 b = sa - 16 | 0;
 sa = b;
 Tb(p[a + 48 >> 2], a);
 c = Xe(p[a + 48 >> 2]);
 d = b, e = Ma(c), p[d + 8 >> 2] = e;
 d = b, e = Na(c), p[d >> 2] = e;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   Tb(p[p[b + 8 >> 2] >> 2], a);
   Pa(b + 8 | 0);
   continue;
  } else {
   sa = b + 16 | 0;
  }
  break;
 }
}
function Ax(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c >> 2] = a;
 d = p[a + 4 >> 2];
 p[c + 4 >> 2] = d;
 p[c + 8 >> 2] = b + d;
 b = c;
 d = p[b + 4 >> 2];
 while (1) {
  if (p[b + 8 >> 2] != (d | 0)) {
   Ra(a);
   qd(p[b + 4 >> 2]);
   d = p[b + 4 >> 2] + 1 | 0;
   p[b + 4 >> 2] = d;
   continue;
  }
  break;
 }
 Ub(b);
 sa = c + 16 | 0;
}
function Ar(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 a : {
  switch (b + -92 | 0) {
  case 0:
   d = a, e = gc(c), p[d + 48 >> 2] = e;
   return 1;
  case 1:
   d = a, e = gc(c), p[d + 52 >> 2] = e;
   return 1;
  case 2:
   d = a, e = Gc(c), n[d + 56 | 0] = e;
   return 1;
  default:
   break a;
  }
 }
 return xb(a, b, c) | 0;
}
function wb(a, b, c, d, e) {
 var f = 0;
 f = sa - 256 | 0;
 sa = f;
 if (!(e & 73728 | (c | 0) <= (d | 0))) {
  c = c - d | 0;
  d = c >>> 0 < 256;
  cb(f, b & 255, d ? c : 256);
  if (!d) {
   while (1) {
    pb(a, f, 256);
    c = c + -256 | 0;
    if (c >>> 0 > 255) {
     continue;
    }
    break;
   }
  }
  pb(a, f, c);
 }
 sa = f + 256 | 0;
}
function lj(a, b) {
 a = a | 0;
 b = w(b);
 var c = 0, d = w(0), e = 0;
 if (t[a + 4 >> 2] != b) {
  t[a + 4 >> 2] = b;
  d = w(t[a + 8 >> 2] - t[a + 12 >> 2]);
  c = q[p[a >> 2] + 40 | 0] ? p[p[a >> 2] + 32 >> 2] : c;
  e = p[p[a >> 2] + 16 >> 2];
  p[a + 20 >> 2] = 1;
  b = w(b - w(v(c, e) | 0));
  t[a + 8 >> 2] = b;
  t[a + 12 >> 2] = b - d;
 }
}
function zo(a, b) {
 a = a | 0;
 b = b | 0;
 if (qb(b, 4)) {
  Go(a);
 }
 if (qb(b, 8)) {
  b = p[a + 172 >> 2];
  m[p[p[b >> 2] + 8 >> 2]](b);
  dh(p[a + 172 >> 2], w(0), w(0), t[a + 48 >> 2], t[a + 52 >> 2]);
  dh(p[a + 168 >> 2], w(t[a + 64 >> 2] * w(-t[a + 48 >> 2])), w(t[a + 68 >> 2] * w(-t[a + 52 >> 2])), t[a + 48 >> 2], t[a + 52 >> 2]);
 }
}
function we(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = w(0);
 if (qb(b, 32)) {
  em(a);
 }
 if (qb(b, 64)) {
  dm(a);
 }
 a : {
  if (!qb(b, 128)) {
   break a;
  }
  t[a + 112 >> 2] = t[a + 60 >> 2];
  b = p[a + 116 >> 2];
  if (!b) {
   break a;
  }
  c = a, d = w(w(m[p[p[b >> 2] + 68 >> 2]](b)) * t[a + 112 >> 2]), t[c + 112 >> 2] = d;
 }
}
function yx(a, b, c, d) {
 var e = 0, f = 0, g = 0, h = 0;
 e = sa - 16 | 0;
 sa = e;
 p[e + 12 >> 2] = 0;
 Vc(a + 12 | 0, d);
 if (b) {
  if (4294967295 < b >>> 0) {
   Nb();
   E();
  }
  f = La(b);
 }
 p[a >> 2] = f;
 c = c + f | 0;
 p[a + 8 >> 2] = c;
 p[a + 4 >> 2] = c;
 g = Xa(a), h = b + f | 0, p[g >> 2] = h;
 sa = e + 16 | 0;
 return a;
}
function Ci(a, b) {
 var c = 0, d = 0;
 c = a, d = p[Ja(b, 0) >> 2], p[c >> 2] = d;
 c = a, d = p[Ja(b, 1) >> 2], p[c + 4 >> 2] = d;
 c = a, d = p[Ja(b, 2) >> 2], p[c + 8 >> 2] = d;
 c = a, d = p[Ja(b, 3) >> 2], p[c + 12 >> 2] = d;
 c = a, d = p[Ja(b, 4) >> 2], p[c + 16 >> 2] = d;
 c = a, d = p[Ja(b, 5) >> 2], p[c + 20 >> 2] = d;
 return a;
}
function Bl(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = 0, g = 0, h = 0, i = 0;
 if (q[a + 46 | 0]) {
  e = b;
  d = p[a + 72 >> 2];
  if (d) {
   c = m[p[p[d >> 2] >> 2]](d, c) | 0;
  }
  g = e, h = m[p[p[c >> 2] + 36 >> 2]](c) | 0, i = p[a + 48 >> 2], f = p[p[b >> 2] + 20 >> 2], m[f](g | 0, h | 0, i | 0);
 }
}
function ai(a, b, c, d, e, f, g) {
 a = a | 0;
 b = w(b);
 c = w(c);
 d = w(d);
 e = w(e);
 f = w(f);
 g = w(g);
 var h = 0, i = 0;
 h = sa - 16 | 0;
 sa = h;
 i = a + 40 | 0;
 a = a + 4 | 0;
 hf(i, jf(h + 8 | 0, 1, nb(a) & 255));
 Lc(a, fb(h + 8 | 0, b, c));
 Lc(a, fb(h + 8 | 0, d, e));
 Lc(a, fb(h + 8 | 0, f, g));
 sa = h + 16 | 0;
}
function Sb(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = w(0);
 c = sa - 16 | 0;
 sa = c;
 d = p[a >> 2];
 e = c;
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 f = b;
 if (a & 1) {
  d = p[p[b >> 2] + d >> 2];
 }
 g = e, h = w(m[d | 0](f)), t[g + 12 >> 2] = h;
 sa = c + 16 | 0;
 return w(t[c + 12 >> 2]);
}
function Fr(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0;
 b = sa - 16 | 0;
 sa = b;
 c = a + 60 | 0;
 d = b, e = Ma(c), p[d + 8 >> 2] = e;
 d = b, e = Na(c), p[d >> 2] = e;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   Tb(wi(p[p[b + 8 >> 2] >> 2]), a);
   Pa(b + 8 | 0);
   continue;
  } else {
   sa = b + 16 | 0;
  }
  break;
 }
}
function cy(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 c = sa - 16 | 0;
 sa = c;
 d = p[a >> 2];
 e = c;
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 f = b;
 if (a & 1) {
  d = p[p[b >> 2] + d >> 2];
 }
 g = e, h = m[d | 0](f) | 0, o[g + 14 >> 1] = h;
 sa = c + 16 | 0;
 return r[c + 14 >> 1];
}
function Vf(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
 c = sa - 16 | 0;
 sa = c;
 d = p[a >> 2];
 e = c;
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 f = b;
 if (a & 1) {
  d = p[p[b >> 2] + d >> 2];
 }
 g = e, h = m[d | 0](f) | 0, p[g + 12 >> 2] = h;
 sa = c + 16 | 0;
 return p[c + 12 >> 2];
}
function pe(a, b, c, d, e) {
 var f = 0;
 f = Fc(a, b, c, e);
 if (m[p[e >> 2]](p[d >> 2], p[c >> 2]) | 0) {
  Ya(c, d);
  if (!(m[p[e >> 2]](p[c >> 2], p[b >> 2]) | 0)) {
   return f + 1 | 0;
  }
  Ya(b, c);
  if (!(m[p[e >> 2]](p[b >> 2], p[a >> 2]) | 0)) {
   return f + 2 | 0;
  }
  Ya(a, b);
  f = f + 3 | 0;
 }
 return f;
}
function _n(a, b, c) {
 var d = 0;
 d = sa - 32 | 0;
 sa = d;
 p[d + 24 >> 2] = b;
 b = vh(d + 8 | 0, a + 8 | 0, Zn(b, c));
 while (1) {
  if (p[b >> 2] != p[b + 4 >> 2]) {
   lc(p[a + 16 >> 2], p[b >> 2], p[d + 24 >> 2]);
   p[b >> 2] = p[b >> 2] + 4;
   Pa(d + 24 | 0);
   continue;
  }
  break;
 }
 Pd(b);
 sa = d + 32 | 0;
}
function rn(a) {
 var b = 0;
 mn(a);
 b = a + 72 | 0;
 p[b >> 2] = 11408;
 th(a + 76 | 0);
 p[a >> 2] = 7804;
 p[b >> 2] = 7892;
 $a(a + 92 | 0);
 $a(a + 104 | 0);
 $a(a + 116 | 0);
 $a(a + 128 | 0);
 $a(a + 140 | 0);
 $a(a + 152 | 0);
 p[a + 172 >> 2] = 0;
 p[a + 176 >> 2] = 0;
 p[a + 164 >> 2] = 0;
 p[a + 168 >> 2] = 0;
}
function Es(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0;
 b = sa - 16 | 0;
 sa = b;
 a = a + 124 | 0;
 c = b, d = Ma(a), p[c + 8 >> 2] = d;
 c = b, d = Na(a), p[c >> 2] = d;
 while (1) {
  if (Oa(b + 8 | 0, b)) {
   yg(p[p[b + 8 >> 2] >> 2]);
   Pa(b + 8 | 0);
   continue;
  } else {
   sa = b + 16 | 0;
  }
  break;
 }
}
function kv(a, b, c) {
 var d = 0, e = 0, f = 0;
 a : {
  if (!c) {
   break a;
  }
  while (1) {
   d = q[a | 0];
   e = q[b | 0];
   if ((d | 0) == (e | 0)) {
    b = b + 1 | 0;
    a = a + 1 | 0;
    c = c + -1 | 0;
    if (c) {
     continue;
    }
    break a;
   }
   break;
  }
  f = d - e | 0;
 }
 return f;
}
function $s(a, b) {
 var c = w(0);
 if (!p[a + 12 >> 2]) {
  return w(0);
 }
 if ((zb(jd(a), 2) | 0) == 2) {
  a : {
   if (!kd(b)) {
    break a;
   }
   b = p[b + 20 >> 2];
   if (!b) {
    break a;
   }
   c = nd(b);
  }
  return w(c * w(w(p[a + 12 >> 2]) / w(100)));
 }
 return w(w(p[a + 12 >> 2]) / w(1e3));
}
function Nd(a, b, c, d) {
 var e = 0, f = 0, g = 0, h = 0;
 e = sa - 16 | 0;
 sa = e;
 p[e + 12 >> 2] = 0;
 Vc(a + 12 | 0, d);
 if (b) {
  f = Od(b);
 }
 p[a >> 2] = f;
 c = (c << 2) + f | 0;
 p[a + 8 >> 2] = c;
 p[a + 4 >> 2] = c;
 g = Xa(a), h = (b << 2) + f | 0, p[g >> 2] = h;
 sa = e + 16 | 0;
 return a;
}
function wh(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = w(0);
 a : {
  switch (b + -125 | 0) {
  case 0:
   d = a, e = gc(c), p[d + 168 >> 2] = e;
   return 1;
  case 1:
   d = a, f = w(Sa(c)), t[d + 172 >> 2] = f;
   return 1;
  default:
   break a;
  }
 }
 return rf(a, b, c) | 0;
}
function Lr(a, b) {
 var c = w(0), d = 0, e = w(0), f = 0;
 c = Ac(b);
 b = zc(b);
 d = Ja(a, 0), e = b, t[d >> 2] = e;
 d = Ja(a, 1), e = c, t[d >> 2] = e;
 d = Ja(a, 2), e = w(-c), t[d >> 2] = e;
 d = Ja(a, 3), e = b, t[d >> 2] = e;
 d = Ja(a, 4), f = 0, p[d >> 2] = f;
 d = Ja(a, 5), f = 0, p[d >> 2] = f;
}
function Dw(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 e = e | 0;
 f = w(f);
 var g = 0;
 d = w(w(d - t[a + 20 >> 2]) / w(t[e + 20 >> 2] - t[a + 20 >> 2]));
 g = p[a + 16 >> 2];
 if (g) {
  d = ah(g, d);
 }
 gk(b, c, f, w(t[a + 24 >> 2] + w(d * w(t[e + 24 >> 2] - t[a + 24 >> 2]))));
}
function Uh(a, b) {
 var c = 0, d = 0, e = w(0);
 c = sa - 16 | 0;
 sa = c;
 d = c, e = w(x(w(t[Ja(a, 0) >> 2] - t[Ja(b, 0) >> 2]))), t[d + 12 >> 2] = e;
 d = c, e = w(x(w(t[Ja(a, 1) >> 2] - t[Ja(b, 1) >> 2]))), t[d + 8 >> 2] = e;
 a = fj(c + 12 | 0, c + 8 | 0);
 sa = c + 16 | 0;
 return t[a >> 2] > w(1);
}
function st(a) {
 var b = 0, c = 0;
 while (1) {
  b = p[a + 12 >> 2];
  if (c >>> 0 >= s[a + 8 >> 2]) {
   if (b) {
    Ua(b);
   }
   a = p[a + 20 >> 2];
   if (a) {
    Ua(a);
   }
   return;
  }
  b = p[b + (c << 2) >> 2];
  if (b) {
   m[p[p[b >> 2] + 8 >> 2]](b);
  }
  c = c + 1 | 0;
  continue;
 }
}
function Vy(a, b, c) {
 var d = 0, e = 0, f = 0, g = 0, h = 0;
 e = c >>> 16 | 0;
 d = a >>> 16 | 0;
 h = v(e, d);
 f = c & 65535;
 a = a & 65535;
 g = v(f, a);
 d = (g >>> 16 | 0) + v(d, f) | 0;
 a = (d & 65535) + v(a, e) | 0;
 ta = h + v(b, c) + (d >>> 16) + (a >>> 16) | 0;
 return g & 65535 | a << 16;
}
function Bm(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = w(0);
 a : {
  switch (b + -38 | 0) {
  case 0:
   d = a, e = hd(c), p[d + 48 >> 2] = e;
   return 1;
  case 1:
   d = a, f = w(Sa(c)), t[d + 52 >> 2] = f;
   return 1;
  default:
   break a;
  }
 }
 return xb(a, b, c) | 0;
}
function ol(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = 1;
 a : {
  if (p[a + 12 >> 2] >= 1) {
   b = m[p[p[b >> 2] >> 2]](b, p[a + 12 >> 2]) | 0;
   if (!b) {
    break a;
   }
   if (!(m[p[p[b >> 2] + 12 >> 2]](b, 28) | 0)) {
    break a;
   }
   p[a + 16 >> 2] = b;
  }
  c = 0;
 }
 return c | 0;
}
function ss(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 a : {
  switch (b + -90 | 0) {
  case 0:
   d = a, e = w(Sa(c)), t[d + 136 >> 2] = e;
   return 1;
  case 1:
   d = a, e = w(Sa(c)), t[d + 140 >> 2] = e;
   return 1;
  default:
   break a;
  }
 }
 return Ti(a, b, c) | 0;
}
function of(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 a : {
  switch (b + -13 | 0) {
  case 0:
   d = a, e = w(Sa(c)), t[d + 120 >> 2] = e;
   return 1;
  case 1:
   d = a, e = w(Sa(c)), t[d + 124 >> 2] = e;
   return 1;
  default:
   break a;
  }
 }
 return Df(a, b, c) | 0;
}
function nr(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 a : {
  switch (b + -82 | 0) {
  case 0:
   d = a, e = w(Sa(c)), t[d + 80 >> 2] = e;
   return 1;
  case 1:
   d = a, e = w(Sa(c)), t[d + 84 >> 2] = e;
   return 1;
  default:
   break a;
  }
 }
 return bd(a, b, c) | 0;
}
function bd(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 a : {
  switch (b + -24 | 0) {
  case 0:
   d = a, e = w(Sa(c)), t[d + 48 >> 2] = e;
   return 1;
  case 1:
   d = a, e = w(Sa(c)), t[d + 52 >> 2] = e;
   return 1;
  default:
   break a;
  }
 }
 return xb(a, b, c) | 0;
}
function Pl(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = w(0), g = w(0), h = w(0), i = w(0);
 a = p[a + 76 >> 2];
 e = a, f = t[Ja(b, 0) >> 2], g = t[Ja(b, 1) >> 2], h = t[Ja(c, 0) >> 2], i = t[Ja(c, 1) >> 2], d = p[p[a >> 2] + 24 >> 2], m[d](e | 0, w(f), w(g), w(h), w(i));
}
function Jl(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = w(0), g = w(0), h = w(0), i = w(0);
 a = p[a + 76 >> 2];
 e = a, f = t[Ja(b, 0) >> 2], g = t[Ja(b, 1) >> 2], h = t[Ja(c, 0) >> 2], i = t[Ja(c, 1) >> 2], d = p[p[a >> 2] + 28 >> 2], m[d](e | 0, w(f), w(g), w(h), w(i));
}
function bq(a, b) {
 a = a | 0;
 b = b | 0;
 b = zd(a, b);
 if (!b) {
  b = p[a + 20 >> 2];
  while (1) {
   a : {
    if (b) {
     if (!xi(b)) {
      break a;
     }
     p[a + 132 >> 2] = b;
     mp(b, a);
    }
    return !b | 0;
   }
   b = p[b + 20 >> 2];
   continue;
  }
 }
 return b | 0;
}
function Su(a) {
 var b = 0;
 b = q[a + 74 | 0];
 n[a + 74 | 0] = b + -1 | b;
 b = p[a >> 2];
 if (b & 8) {
  p[a >> 2] = b | 32;
  return -1;
 }
 p[a + 4 >> 2] = 0;
 p[a + 8 >> 2] = 0;
 b = p[a + 44 >> 2];
 p[a + 28 >> 2] = b;
 p[a + 20 >> 2] = b;
 p[a + 16 >> 2] = b + p[a + 48 >> 2];
 return 0;
}
function yc(a) {
 var b = 0, c = 0;
 b = p[5808];
 c = a + 3 & -4;
 a = b + c | 0;
 a : {
  if (a >>> 0 <= b >>> 0 ? (c | 0) >= 1 : 0) {
   break a;
  }
  if (a >>> 0 > ua() << 16 >>> 0) {
   if (!(da(a | 0) | 0)) {
    break a;
   }
  }
  p[5808] = a;
  return b;
 }
 p[5666] = 48;
 return -1;
}
function uy(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0, f = 0;
 c = sa - 16 | 0;
 sa = c;
 d = p[a >> 2];
 e = c;
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 f = b;
 if (a & 1) {
  d = p[p[b >> 2] + d >> 2];
 }
 m[d | 0](e, f);
 a = Mr(La(16), c);
 sa = c + 16 | 0;
 return a | 0;
}
function no(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 a : {
  switch (b + -119 | 0) {
  case 0:
   d = a, e = gc(c), p[d + 48 >> 2] = e;
   return 1;
  case 1:
   d = a, e = gc(c), p[d + 52 >> 2] = e;
   return 1;
  default:
   break a;
  }
 }
 return xb(a, b, c) | 0;
}
function Ni(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 a : {
  switch (b + -102 | 0) {
  case 0:
   d = a, e = gc(c), p[d + 48 >> 2] = e;
   return 1;
  case 1:
   d = a, e = gc(c), p[d + 52 >> 2] = e;
   return 1;
  default:
   break a;
  }
 }
 return xb(a, b, c) | 0;
}
function zx(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 d = vx(a);
 if (d >>> 0 >= b >>> 0) {
  a = Dc(a);
  if (a >>> 0 < d >>> 1 >>> 0) {
   p[c + 8 >> 2] = a << 1;
   d = p[Ib(c + 8 | 0, c + 12 | 0) >> 2];
  }
  sa = c + 16 | 0;
  return d;
 }
 od();
 E();
}
function nq(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 d = kq(a);
 if (d >>> 0 >= b >>> 0) {
  a = oc(a);
  if (a >>> 0 < d >>> 1 >>> 0) {
   p[c + 8 >> 2] = a << 1;
   d = p[Ib(c + 8 | 0, c + 12 | 0) >> 2];
  }
  sa = c + 16 | 0;
  return d;
 }
 od();
 E();
}
function bf(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 d = sq(a);
 if (d >>> 0 >= b >>> 0) {
  a = pc(a);
  if (a >>> 0 < d >>> 1 >>> 0) {
   p[c + 8 >> 2] = a << 1;
   d = p[Ib(c + 8 | 0, c + 12 | 0) >> 2];
  }
  sa = c + 16 | 0;
  return d;
 }
 od();
 E();
}
function Xw(a, b, c, d, e, f, g, h) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 d = w(d);
 e = w(e);
 f = w(f);
 g = w(g);
 h = w(h);
 var i = 0, j = 0;
 i = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 j = b;
 if (a & 1) {
  i = p[i + p[b >> 2] >> 2];
 }
 m[i | 0](j, c, d, e, f, g, h);
}
function Ld(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 d = eh(a);
 if (d >>> 0 >= b >>> 0) {
  a = mc(a);
  if (a >>> 0 < d >>> 1 >>> 0) {
   p[c + 8 >> 2] = a << 1;
   d = p[Ib(c + 8 | 0, c + 12 | 0) >> 2];
  }
  sa = c + 16 | 0;
  return d;
 }
 od();
 E();
}
function Cw(a, b, c, d, e, f, g) {
 var h = 0;
 h = sa - 16 | 0;
 sa = h;
 p[h + 12 >> 2] = a;
 Cb(h + 12 | 0, t[b >> 2]);
 Cb(h + 12 | 0, t[c >> 2]);
 Cb(h + 12 | 0, t[d >> 2]);
 Cb(h + 12 | 0, t[e >> 2]);
 Cb(h + 12 | 0, t[f >> 2]);
 Cb(h + 12 | 0, t[g >> 2]);
 sa = h + 16 | 0;
 return a;
}
function ep(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 a : {
  if ((b | 0) != 129) {
   if ((b | 0) != 23) {
    break a;
   }
   d = a, e = gc(c), p[d + 128 >> 2] = e;
   return 1;
  }
  d = a, e = gc(c), p[d + 132 >> 2] = e;
  return 1;
 }
 return of(a, b, c) | 0;
}
function wp(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 b = Md(c, a, b);
 d = p[b + 4 >> 2];
 while (1) {
  if (p[b + 8 >> 2] != (d | 0)) {
   Ra(a);
   Ee(p[b + 4 >> 2]);
   d = p[b + 4 >> 2] + 4 | 0;
   p[b + 4 >> 2] = d;
   continue;
  }
  break;
 }
 Ub(b);
 sa = c + 16 | 0;
}
function hq(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 b = cf(c, a, b);
 d = p[b + 4 >> 2];
 while (1) {
  if (p[b + 8 >> 2] != (d | 0)) {
   Ra(a);
   Nh(p[b + 4 >> 2]);
   d = p[b + 4 >> 2] + 8 | 0;
   p[b + 4 >> 2] = d;
   continue;
  }
  break;
 }
 Ub(b);
 sa = c + 16 | 0;
}
function Ty(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = w(0);
 b = 0;
 while (1) {
  if ((b | 0) != 11) {
   c = (b << 2) + a | 0, d = Xd(w(w(b | 0) * w(.10000000149011612)), t[a + 4 >> 2], t[a + 12 >> 2]), t[c + 20 >> 2] = d;
   b = b + 1 | 0;
   continue;
  }
  break;
 }
 return 0;
}
function gc(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = Yr(p[a >> 2], p[a + 4 >> 2], b + 8 | 0);
 a : {
  if (!c) {
   id(a);
   c = 0;
   a = 0;
   break a;
  }
  p[a >> 2] = p[a >> 2] + c;
  c = p[b + 12 >> 2];
  a = p[b + 8 >> 2];
 }
 sa = b + 16 | 0;
 ta = c;
 return a;
}
function ec(a, b, c, d) {
 var e = w(0), f = w(0), g = w(0), h = 0, i = w(0);
 e = t[Ja(b, 0) >> 2];
 f = t[Ja(b, 1) >> 2];
 g = t[Ja(c, 0) >> 2];
 h = Ja(a, 0), i = w(e + w(w(g - e) * d)), t[h >> 2] = i;
 e = t[Ja(c, 1) >> 2];
 h = Ja(a, 1), i = w(f + w(w(e - f) * d)), t[h >> 2] = i;
}
function Cn(a, b) {
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 d = c, e = on(a + 12 | 0, c + 12 | 0), p[d + 8 >> 2] = e;
 d = c, e = Pc(), p[d >> 2] = e;
 a = -1;
 if (!tj(c + 8 | 0, c)) {
  a = p[Xb(c + 8 | 0) + 4 >> 2];
 }
 sa = c + 16 | 0;
 return a;
}
function qy(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 e = e | 0;
 f = w(f);
 var g = 0;
 d = w(w(d - t[a + 20 >> 2]) / w(t[e + 20 >> 2] - t[a + 20 >> 2]));
 g = p[a + 16 >> 2];
 if (g) {
  d = ah(g, d);
 }
 ok(b, c, f, vg(p[a + 24 >> 2], p[e + 24 >> 2], d));
}
function Lq(a, b) {
 var c = 0, d = 0;
 d = sa - 32 | 0;
 sa = d;
 a : {
  if (p[Ra(a) >> 2] - p[a + 4 >> 2] >> 3 >>> 0 >= b >>> 0) {
   hq(a, b);
   break a;
  }
  c = Ra(a);
  c = af(d + 8 | 0, bf(a, nb(a) + b | 0), nb(a), c);
  gq(c, b);
  Ph(a, c);
  $e(c);
 }
 sa = d + 32 | 0;
}
function Bp(a, b) {
 var c = 0, d = 0;
 d = sa - 32 | 0;
 sa = d;
 a : {
  if (p[Ra(a) >> 2] - p[a + 4 >> 2] >> 2 >>> 0 >= b >>> 0) {
   wp(a, b);
   break a;
  }
  c = Ra(a);
  c = Nd(d + 8 | 0, Ld(a, _a(a) + b | 0), _a(a), c);
  vp(c, b);
  Qe(a, c);
  Xc(c);
 }
 sa = d + 32 | 0;
}
function co(a, b, c) {
 var d = 0, e = 0, f = 0;
 sf(a);
 e = p[b + 4 >> 2];
 d = b + 4 | 0;
 Gd(Ra(a), p[a >> 2], c, d);
 f = c;
 c = b + 8 | 0;
 Hh(Ra(a), f, p[a + 4 >> 2], c);
 Ya(a, d);
 Ya(a + 4 | 0, c);
 Ya(Ra(a), Xa(b));
 p[b >> 2] = p[b + 4 >> 2];
 Ie(a, _a(a));
 return e;
}
function Xn(a) {
 a = a | 0;
 var b = 0;
 a : {
  b : {
   b = p[a + 40 >> 2];
   b = m[p[p[b >> 2] + 76 >> 2]](b, p[a + 48 >> 2]) | 0;
   if (b) {
    if (Jd(b)) {
     break b;
    }
   }
   p[a + 52 >> 2] = 0;
   break a;
  }
  p[a + 52 >> 2] = b;
 }
 Fb(p[a + 40 >> 2], 4, 0);
}
function Bc(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 d = sa - 16 | 0;
 sa = d;
 e = p[a + 4 >> 2];
 b = (e >> 1) + b | 0;
 a = p[a >> 2];
 a = e & 1 ? p[p[b >> 2] + a >> 2] : a;
 ek(d, c);
 a = m[a | 0](b, d) | 0;
 Yb(d);
 sa = d + 16 | 0;
 return a | 0;
}
function Db(a, b) {
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 o[c + 14 >> 1] = b;
 d = c, e = Bj(a, c + 14 | 0), p[d + 8 >> 2] = e;
 d = c, e = Pc(), p[d >> 2] = e;
 a = 0;
 if (!tj(c + 8 | 0, c)) {
  a = p[Xb(c + 8 | 0) + 4 >> 2];
 }
 sa = c + 16 | 0;
 return a;
}
function Ai(a) {
 var b = 0, c = 0;
 b = Ja(a, 0), c = 1065353216, p[b >> 2] = c;
 b = Ja(a, 1), c = 0, p[b >> 2] = c;
 b = Ja(a, 2), c = 0, p[b >> 2] = c;
 b = Ja(a, 3), c = 1065353216, p[b >> 2] = c;
 b = Ja(a, 4), c = 0, p[b >> 2] = c;
 b = Ja(a, 5), c = 0, p[b >> 2] = c;
}
function Ky(a, b) {
 var c = 0;
 a : {
  b : {
   switch (b + -37 | 0) {
   default:
    c = 0;
    if ((b | 0) != 88) {
     break a;
    }
    return p[a + 24 >> 2];
   case 0:
    return p[a + 48 >> 2];
   case 1:
    break b;
   }
  }
  c = p[a + 48 >> 2];
 }
 return c;
}
function jm(a, b, c, d) {
 var e = 0, f = 0, g = 0;
 e = sa - 16 | 0;
 sa = e;
 b = Ra(b);
 a = Cd(a, La(16), Dd(e + 8 | 0, b, 0));
 hm(p[a >> 2] + 8 | 0, p[d >> 2]);
 f = ib(a), g = 1, n[f + 4 | 0] = g;
 p[p[a >> 2] + 4 >> 2] = c;
 p[p[a >> 2] >> 2] = 0;
 sa = e + 16 | 0;
}
function _g(a, b, c, d) {
 var e = 0, f = 0, g = 0;
 e = sa - 16 | 0;
 sa = e;
 b = Ra(b);
 a = Cd(a, La(16), Dd(e + 8 | 0, b, 0));
 io(p[a >> 2] + 8 | 0, p[d >> 2]);
 f = ib(a), g = 1, n[f + 4 | 0] = g;
 p[p[a >> 2] + 4 >> 2] = c;
 p[p[a >> 2] >> 2] = 0;
 sa = e + 16 | 0;
}
function Tn(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = Gb(a, b);
 a : {
  if (c) {
   break a;
  }
  c = 1;
  b = m[p[p[b >> 2] >> 2]](b, p[a + 48 >> 2]) | 0;
  if (!b) {
   break a;
  }
  if (!zf(b)) {
   break a;
  }
  p[a + 56 >> 2] = b;
  c = 0;
 }
 return c | 0;
}
function Gr(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = Gb(a, b);
 a : {
  if (c) {
   break a;
  }
  c = 1;
  b = m[p[p[b >> 2] >> 2]](b, p[a + 48 >> 2]) | 0;
  if (!b) {
   break a;
  }
  if (!yf(b)) {
   break a;
  }
  p[a + 72 >> 2] = b;
  c = 0;
 }
 return c | 0;
}
function xl(a) {
 var b = 0;
 Wb(a);
 p[a + 48 >> 2] = 0;
 p[a + 52 >> 2] = 0;
 p[a >> 2] = 13924;
 p[a + 56 >> 2] = 0;
 p[a + 60 >> 2] = 0;
 b = a - -64 | 0;
 p[b >> 2] = 14e3;
 p[a >> 2] = 13824;
 p[b >> 2] = 13908;
 b = td();
 p[a + 72 >> 2] = 0;
 p[a + 68 >> 2] = b;
}
function pw(a, b, c, d, e) {
 a = a | 0;
 b = w(b);
 c = w(c);
 d = w(d);
 e = w(e);
 var f = 0;
 f = sa - 16 | 0;
 sa = f;
 t[f + 8 >> 2] = c;
 t[f + 12 >> 2] = b;
 t[f + 4 >> 2] = d;
 t[f >> 2] = e;
 ak(a, 14528, f + 12 | 0, f + 8 | 0, f + 4 | 0, f);
 sa = f + 16 | 0;
}
function ow(a, b, c, d, e) {
 a = a | 0;
 b = w(b);
 c = w(c);
 d = w(d);
 e = w(e);
 var f = 0;
 f = sa - 16 | 0;
 sa = f;
 t[f + 8 >> 2] = c;
 t[f + 12 >> 2] = b;
 t[f + 4 >> 2] = d;
 t[f >> 2] = e;
 ak(a, 14543, f + 12 | 0, f + 8 | 0, f + 4 | 0, f);
 sa = f + 16 | 0;
}
function ot(a, b) {
 var c = 0;
 c = p[a + 24 >> 2];
 if (!(!c | t[a + 28 >> 2] < w(1) ^ 1)) {
  ae(p[c >> 2], b, t[p[a + 24 >> 2] + 4 >> 2], w(w(1) - t[a + 28 >> 2]));
 }
 c = p[a + 20 >> 2];
 if (c) {
  ae(p[c >> 2], b, t[p[a + 20 >> 2] + 4 >> 2], t[a + 28 >> 2]);
 }
}
function Ng(a) {
 var b = 0;
 rc(a);
 p[a + 48 >> 2] = 0;
 p[a + 52 >> 2] = 0;
 p[a >> 2] = 10320;
 p[a + 56 >> 2] = 0;
 p[a + 60 >> 2] = 0;
 p[a + 64 >> 2] = 1065353216;
 b = Kg(a + 68 | 0);
 p[a >> 2] = 13308;
 p[b >> 2] = 13396;
 $a(a + 80 | 0);
 p[a + 96 >> 2] = 0;
}
function ao(a, b, c, d) {
 var e = 0, f = 0, g = 0;
 e = sa - 16 | 0;
 sa = e;
 b = Ra(b);
 a = Cd(a, La(12), Dd(e + 8 | 0, b, 0));
 lc(b, p[a >> 2] + 8 | 0, d);
 f = ib(a), g = 1, n[f + 4 | 0] = g;
 p[p[a >> 2] + 4 >> 2] = c;
 p[p[a >> 2] >> 2] = 0;
 sa = e + 16 | 0;
}
function zn(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 p[d >> 2] = b;
 p[d + 8 >> 2] = a;
 while (1) {
  if (!(!Oa(d + 8 | 0, d) | p[p[d + 8 >> 2] >> 2] == p[c >> 2])) {
   Pa(d + 8 | 0);
   continue;
  }
  break;
 }
 sa = d + 16 | 0;
 return p[d + 8 >> 2];
}
function xx(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 b = ux(c, a + 8 | 0, b);
 a = p[b >> 2];
 while (1) {
  if (p[b + 4 >> 2] != (a | 0)) {
   qd(p[b >> 2]);
   a = p[b >> 2] + 1 | 0;
   p[b >> 2] = a;
   continue;
  }
  break;
 }
 Pd(b);
 sa = c + 16 | 0;
}
function vp(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 b = vh(c, a + 8 | 0, b);
 a = p[b >> 2];
 while (1) {
  if (p[b + 4 >> 2] != (a | 0)) {
   Ee(p[b >> 2]);
   a = p[b >> 2] + 4 | 0;
   p[b >> 2] = a;
   continue;
  }
  break;
 }
 Pd(b);
 sa = c + 16 | 0;
}
function gq(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 b = fq(c, a + 8 | 0, b);
 a = p[b >> 2];
 while (1) {
  if (p[b + 4 >> 2] != (a | 0)) {
   Nh(p[b >> 2]);
   a = p[b >> 2] + 8 | 0;
   p[b >> 2] = a;
   continue;
  }
  break;
 }
 Pd(b);
 sa = c + 16 | 0;
}
function bv(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 a : {
  if (!Oc(b)) {
   p[a + 8 >> 2] = p[b + 8 >> 2];
   d = p[b + 4 >> 2];
   p[a >> 2] = p[b >> 2];
   p[a + 4 >> 2] = d;
   break a;
  }
  Qf(a, p[b >> 2], p[b + 4 >> 2]);
 }
 sa = c + 16 | 0;
}
function Ot(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 if (Oc(a)) {
  Ua(p[a >> 2]);
 }
 p[a + 8 >> 2] = p[b + 8 >> 2];
 d = p[b + 4 >> 2];
 p[a >> 2] = p[b >> 2];
 p[a + 4 >> 2] = d;
 oj(b, 0);
 n[c + 15 | 0] = 0;
 nj(b, c + 15 | 0);
 sa = c + 16 | 0;
}
function qn(a) {
 rc(a);
 p[a + 64 >> 2] = 0;
 p[a + 68 >> 2] = 0;
 p[a + 56 >> 2] = 0;
 p[a + 60 >> 2] = 1065353216;
 p[a + 48 >> 2] = 1065353216;
 p[a + 52 >> 2] = 0;
 p[a >> 2] = 11936;
 p[a >> 2] = 2940;
 tb(a + 72 | 0);
 $a(a + 96 | 0);
 p[a + 108 >> 2] = 0;
}
function as(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 b = Gb(a, b);
 a : {
  if (b) {
   break a;
  }
  b = 1;
  c = p[a + 20 >> 2];
  if (!(m[p[p[c >> 2] + 12 >> 2]](c, 14) | 0)) {
   break a;
  }
  p[p[a + 20 >> 2] + 56 >> 2] = a;
  b = 0;
 }
 return b | 0;
}
function px(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 var g = 0, h = 0;
 g = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 h = b;
 if (a & 1) {
  g = p[g + p[b >> 2] >> 2];
 }
 m[g | 0](h, c, d, e, f);
}
function Ob(a, b, c, d) {
 var e = w(0), f = w(0), g = 0, h = w(0);
 e = t[Ja(b, 0) >> 2];
 f = t[Ja(c, 0) >> 2];
 g = Ja(a, 0), h = w(e + w(f * d)), t[g >> 2] = h;
 e = t[Ja(b, 1) >> 2];
 f = t[Ja(c, 1) >> 2];
 g = Ja(a, 1), h = w(e + w(f * d)), t[g >> 2] = h;
}
function Ur(a) {
 var b = 0, c = 0, d = w(0);
 b = sa - 16 | 0;
 sa = b;
 c = Ki(p[a >> 2], p[a + 4 >> 2], b + 12 | 0);
 a : {
  if (!c) {
   id(a);
   d = w(0);
   break a;
  }
  p[a >> 2] = p[a >> 2] + c;
  d = t[b + 12 >> 2];
 }
 sa = b + 16 | 0;
 return d;
}
function Wr(a, b, c, d) {
 var e = 0;
 if ((c - b | 0) < (a | 0)) {
  return 0;
 }
 while (1) {
  if ((a | 0) == (e | 0)) {
   n[a + d | 0] = 0;
  } else {
   n[d + e | 0] = q[b | 0];
   e = e + 1 | 0;
   b = b + 1 | 0;
   continue;
  }
  break;
 }
 return a;
}
function Qk(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0;
 d = sa - 32 | 0;
 sa = d;
 ek(d + 8 | 0, b);
 _f(d, c);
 m[a | 0](d + 24 | 0, d + 8 | 0, d);
 a = jk(d + 24 | 0);
 Eb(d + 24 | 0);
 Eb(d);
 Yb(d + 8 | 0);
 sa = d + 32 | 0;
 return a | 0;
}
function yw(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 d = w(d);
 e = w(e);
 f = w(f);
 var g = 0, h = 0;
 g = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 h = b;
 if (a & 1) {
  g = p[g + p[b >> 2] >> 2];
 }
 m[g | 0](h, c, d, e, f);
}
function Kq(a, b, c, d) {
 var e = 0, f = 0, g = 0;
 e = sa - 16 | 0;
 sa = e;
 f = hb(e + 8 | 0);
 g = hb(e);
 ec(f, a, d, w(.3333333432674408));
 ec(g, a, d, w(.6666666865348816));
 a = 1;
 if (!Uh(b, f)) {
  a = Uh(c, g);
 }
 sa = e + 16 | 0;
 return a;
}
function Yn(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = Gb(a, b);
 a : {
  if (c) {
   break a;
  }
  b = m[p[p[b >> 2] >> 2]](b, p[a + 48 >> 2]) | 0;
  if (!b) {
   break a;
  }
  if (!Jd(b)) {
   break a;
  }
  p[a + 52 >> 2] = b;
 }
 return c | 0;
}
function om(a, b) {
 var c = 0, d = 0, e = 0;
 c = sa - 32 | 0;
 sa = c;
 d = c, e = ej(a, b), p[d + 24 >> 2] = e;
 d = c, e = vc(), p[d + 16 >> 2] = e;
 if (!Gf(c + 24 | 0, c + 16 | 0)) {
  lm(a, p[Hc(c + 8 | 0, c + 24 | 0) >> 2]);
 }
 sa = c + 32 | 0;
}
function ni(a) {
 rc(a);
 p[a + 56 >> 2] = 1065353216;
 p[a + 60 >> 2] = 1065353216;
 p[a + 48 >> 2] = 0;
 p[a + 52 >> 2] = 1065353216;
 p[a >> 2] = 4724;
 p[a >> 2] = 13072;
 tb(a - -64 | 0);
 tb(a + 88 | 0);
 p[a + 112 >> 2] = 0;
 p[a + 116 >> 2] = 0;
}
function Zl(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 b = Gb(a, b);
 a : {
  if (b) {
   break a;
  }
  b = 1;
  c = p[a + 20 >> 2];
  if (!(m[p[p[c >> 2] + 12 >> 2]](c, 22) | 0)) {
   break a;
  }
  Ul(p[a + 20 >> 2], a);
  b = 0;
 }
 return b | 0;
}
function Np(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 b = Gb(a, b);
 a : {
  if (b) {
   break a;
  }
  b = 1;
  c = p[a + 20 >> 2];
  if (!(m[p[p[c >> 2] + 12 >> 2]](c, 12) | 0)) {
   break a;
  }
  Jb(p[a + 20 >> 2], a);
  b = 0;
 }
 return b | 0;
}
function up(a) {
 var b = 0, c = 0, d = 0, e = 0;
 Sd(a);
 p[a + 168 >> 2] = 0;
 p[a >> 2] = 6432;
 p[a >> 2] = 6300;
 b = Vb(a + 172 | 0);
 c = Vb(a + 236 | 0);
 d = Vb(a + 300 | 0);
 e = Vb(a + 364 | 0);
 Jb(a, b);
 Jb(a, c);
 Jb(a, d);
 Jb(a, e);
}
function Mj(a) {
 var b = 0, c = 0, d = 0;
 if (pd(n[p[a >> 2]])) {
  while (1) {
   b = p[a >> 2];
   d = n[b | 0];
   p[a >> 2] = b + 1;
   c = (v(c, 10) + d | 0) + -48 | 0;
   if (pd(n[b + 1 | 0])) {
    continue;
   }
   break;
  }
 }
 return c;
}
function yn(a, b) {
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 8 >> 2] = b;
 d = c, e = Ma(a), p[d >> 2] = e;
 b = He(c + 8 | 0, c);
 b = p[a >> 2] + (b << 2) | 0;
 zh(a, Rg(b + 4 | 0, p[a + 4 >> 2], b));
 Vd(b);
 sa = c + 16 | 0;
}
function hd(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = Ki(p[a >> 2], p[a + 4 >> 2], b + 12 | 0);
 a : {
  if (!c) {
   id(a);
   a = 0;
   break a;
  }
  p[a >> 2] = p[a >> 2] + c;
  a = p[b + 12 >> 2];
 }
 sa = b + 16 | 0;
 return a;
}
function ui(a) {
 a = a | 0;
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 ed(a - -64 | 0, fb(b + 8 | 0, t[a + 48 >> 2], t[a + 52 >> 2]), fb(b, w(zc(t[a + 80 >> 2]) * w(-t[a + 84 >> 2])), w(Ac(t[a + 80 >> 2]) * w(-t[a + 84 >> 2]))));
 sa = b + 16 | 0;
}
function di(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = w(0);
 d = sa - 16 | 0;
 sa = d;
 p[d + 12 >> 2] = b;
 e = a, f = w(Tq(b, c) + t[a + 76 >> 2]), t[e + 76 >> 2] = f;
 Sq(a - -64 | 0, d + 12 | 0);
 sa = d + 16 | 0;
}
function ed(a, b, c) {
 var d = w(0), e = w(0), f = 0, g = w(0);
 d = t[Ja(b, 0) >> 2];
 e = t[Ja(c, 0) >> 2];
 f = Ja(a, 0), g = w(d + e), t[f >> 2] = g;
 d = t[Ja(b, 1) >> 2];
 e = t[Ja(c, 1) >> 2];
 f = Ja(a, 1), g = w(d + e), t[f >> 2] = g;
}
function dd(a, b, c) {
 var d = w(0), e = w(0), f = 0, g = w(0);
 d = t[Ja(b, 0) >> 2];
 e = t[Ja(c, 0) >> 2];
 f = Ja(a, 0), g = w(d - e), t[f >> 2] = g;
 d = t[Ja(b, 1) >> 2];
 e = t[Ja(c, 1) >> 2];
 f = Ja(a, 1), g = w(d - e), t[f >> 2] = g;
}
function vq(a, b) {
 var c = 0, d = 0, e = 0;
 d = sa - 32 | 0;
 sa = d;
 c = Ra(a);
 e = c;
 c = af(d + 8 | 0, bf(a, nb(a) + 1 | 0), nb(a), c);
 Th(e, p[c + 8 >> 2], b);
 p[c + 8 >> 2] = p[c + 8 >> 2] + 8;
 tq(a, c);
 $e(c);
 sa = d + 32 | 0;
}
function Oq(a, b) {
 var c = 0, d = 0, e = 0;
 d = sa - 32 | 0;
 sa = d;
 c = Ra(a);
 e = c;
 c = af(d + 8 | 0, bf(a, nb(a) + 1 | 0), nb(a), c);
 Ze(e, p[c + 8 >> 2], b);
 p[c + 8 >> 2] = p[c + 8 >> 2] + 8;
 Ph(a, c);
 $e(c);
 sa = d + 32 | 0;
}
function Lh(a, b) {
 var c = 0, d = 0, e = 0;
 d = sa - 32 | 0;
 sa = d;
 c = Ra(a);
 e = c;
 c = Nd(d + 8 | 0, Ld(a, _a(a) + 1 | 0), _a(a), c);
 lc(e, p[c + 8 >> 2], b);
 p[c + 8 >> 2] = p[c + 8 >> 2] + 4;
 Qe(a, c);
 Xc(c);
 sa = d + 32 | 0;
}
function $h(a, b) {
 var c = 0, d = 0, e = 0;
 d = sa - 32 | 0;
 sa = d;
 c = Ra(a);
 e = c;
 c = Po(d + 8 | 0, Ld(a, _a(a) + 1 | 0), _a(a), c);
 lc(e, p[c + 8 >> 2], b);
 p[c + 8 >> 2] = p[c + 8 >> 2] + 4;
 Qe(a, c);
 Xc(c);
 sa = d + 32 | 0;
}
function xp(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -2 | 0;
 if ((a & 65535) >>> 0 <= 49) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 131088 >>> a | 0 : ((1 << a) - 1 & 131088) << 32 - a | 9985 >>> a) & 1;
 }
 return 0;
}
function Xc(a) {
 var b = 0, c = 0;
 b = a;
 c = p[a + 4 >> 2];
 while (1) {
  if (p[b + 8 >> 2] != (c | 0)) {
   p[b + 8 >> 2] = p[b + 8 >> 2] + -4;
   continue;
  }
  break;
 }
 if (p[a >> 2]) {
  b = p[a >> 2];
  p[Xa(a) >> 2];
  Ua(b);
 }
}
function Vo(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -2 | 0;
 if ((a & 65535) >>> 0 <= 50) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 393232 >>> a | 0 : ((1 << a) - 1 & 393232) << 32 - a | 9985 >>> a) & 1;
 }
 return 0;
}
function Cl(a, b) {
 a = a | 0;
 b = b | 0;
 b = ne(a, b);
 m[p[p[b >> 2] >> 2]](b, 0);
 m[p[p[b >> 2] + 8 >> 2]](b, t[a + 56 >> 2]);
 m[p[p[b >> 2] + 16 >> 2]](b, p[a + 60 >> 2]);
 m[p[p[b >> 2] + 12 >> 2]](b, p[a + 64 >> 2]);
 return b | 0;
}
function $e(a) {
 var b = 0, c = 0;
 b = a;
 c = p[a + 4 >> 2];
 while (1) {
  if (p[b + 8 >> 2] != (c | 0)) {
   p[b + 8 >> 2] = p[b + 8 >> 2] + -8;
   continue;
  }
  break;
 }
 if (p[a >> 2]) {
  b = p[a >> 2];
  p[Xa(a) >> 2];
  Ua(b);
 }
}
function Pv(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 e = w(e);
 var f = 0, g = 0;
 f = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 g = b;
 if (a & 1) {
  f = p[f + p[b >> 2] >> 2];
 }
 m[f | 0](g, c, d, e);
}
function op(a) {
 var b = 0;
 np(a);
 p[a >> 2] = 6672;
 th(a + 160 | 0);
 p[a >> 2] = 6564;
 b = a + 176 | 0;
 Wb(b);
 p[b + 52 >> 2] = 0;
 p[b + 56 >> 2] = 0;
 p[b + 48 >> 2] = a;
 p[b >> 2] = 5756;
 $a(a + 236 | 0);
 n[a + 248 | 0] = 0;
}
function vr(a) {
 a = a | 0;
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 ed(a - -64 | 0, fb(b + 8 | 0, t[a + 48 >> 2], t[a + 52 >> 2]), fb(b, w(zc(t[a + 80 >> 2]) * t[a + 84 >> 2]), w(Ac(t[a + 80 >> 2]) * t[a + 84 >> 2])));
 sa = b + 16 | 0;
}
function dh(a, b, c, d, e) {
 m[p[p[a >> 2] + 20 >> 2]](a, b, c);
 d = w(b + d);
 m[p[p[a >> 2] + 24 >> 2]](a, d, c);
 c = w(c + e);
 m[p[p[a >> 2] + 24 >> 2]](a, d, c);
 m[p[p[a >> 2] + 24 >> 2]](a, b, c);
 m[p[p[a >> 2] + 32 >> 2]](a);
}
function Nq(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c >> 2] = a;
 d = p[a + 4 >> 2];
 p[c + 4 >> 2] = d;
 p[c + 8 >> 2] = d + 3;
 Oh(Ra(a), p[c + 4 >> 2], b);
 p[c + 4 >> 2] = p[c + 4 >> 2] + 3;
 Ub(c);
 sa = c + 16 | 0;
}
function zr(a) {
 a = a | 0;
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 ed(a + 72 | 0, fb(b + 8 | 0, t[a + 48 >> 2], t[a + 52 >> 2]), fb(b, w(zc(t[a + 80 >> 2]) * t[a + 88 >> 2]), w(Ac(t[a + 80 >> 2]) * t[a + 88 >> 2])));
 sa = b + 16 | 0;
}
function ur(a) {
 a = a | 0;
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 ed(a + 72 | 0, fb(b + 8 | 0, t[a + 48 >> 2], t[a + 52 >> 2]), fb(b, w(zc(t[a + 88 >> 2]) * t[a + 92 >> 2]), w(Ac(t[a + 88 >> 2]) * t[a + 92 >> 2])));
 sa = b + 16 | 0;
}
function qr(a) {
 a = a | 0;
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 ed(a + 72 | 0, fb(b + 8 | 0, t[a + 48 >> 2], t[a + 52 >> 2]), fb(b, w(zc(t[a + 80 >> 2]) * t[a + 84 >> 2]), w(Ac(t[a + 80 >> 2]) * t[a + 84 >> 2])));
 sa = b + 16 | 0;
}
function qp(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -2 | 0;
 if ((a & 65535) >>> 0 <= 36) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 16 >>> a | 0 : ((1 << a) - 1 & 16) << 32 - a | 10017 >>> a) & 1;
 }
 return 0;
}
function Oo(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -2 | 0;
 if ((a & 65535) >>> 0 <= 36) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 16 >>> a | 0 : ((1 << a) - 1 & 16) << 32 - a | 10049 >>> a) & 1;
 }
 return 0;
}
function Gq(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = 0, g = 0;
 di(a, b, c);
 a = p[a + 104 >> 2];
 e = a, f = m[p[p[b >> 2] + 36 >> 2]](b) | 0, g = c, d = p[p[a >> 2] + 16 >> 2], m[d](e | 0, f | 0, g | 0);
}
function Gp(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -2 | 0;
 if ((a & 65535) >>> 0 <= 36) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 16 >>> a | 0 : ((1 << a) - 1 & 16) << 32 - a | 18177 >>> a) & 1;
 }
 return 0;
}
function sx() {
 var a = 0, b = 0;
 a : {
  if (n[22416] & 1) {
   break a;
  }
  if (!sb(22416)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(2, 15496) | 0;
  sa = a + 16 | 0;
  p[5603] = b;
  rb(22416);
 }
 return p[5603];
}
function iw() {
 var a = 0, b = 0;
 a : {
  if (n[22520] & 1) {
   break a;
  }
  if (!sb(22520)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(2, 16568) | 0;
  sa = a + 16 | 0;
  p[5629] = b;
  rb(22520);
 }
 return p[5629];
}
function gw() {
 var a = 0, b = 0;
 a : {
  if (n[22528] & 1) {
   break a;
  }
  if (!sb(22528)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(2, 16576) | 0;
  sa = a + 16 | 0;
  p[5631] = b;
  rb(22528);
 }
 return p[5631];
}
function fx() {
 var a = 0, b = 0;
 a : {
  if (n[22436] & 1) {
   break a;
  }
  if (!sb(22436)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(1, 15824) | 0;
  sa = a + 16 | 0;
  p[5608] = b;
  rb(22436);
 }
 return p[5608];
}
function fr(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -2 | 0;
 if ((a & 65535) >>> 0 <= 36) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 16 >>> a | 0 : ((1 << a) - 1 & 16) << 32 - a | 9989 >>> a) & 1;
 }
 return 0;
}
function fp(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -2 | 0;
 if ((a & 65535) >>> 0 <= 36) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 16 >>> a | 0 : ((1 << a) - 1 & 16) << 32 - a | 2819 >>> a) & 1;
 }
 return 0;
}
function ew() {
 var a = 0, b = 0;
 a : {
  if (n[22536] & 1) {
   break a;
  }
  if (!sb(22536)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(2, 16584) | 0;
  sa = a + 16 | 0;
  p[5633] = b;
  rb(22536);
 }
 return p[5633];
}
function dx() {
 var a = 0, b = 0;
 a : {
  if (n[22444] & 1) {
   break a;
  }
  if (!sb(22444)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(2, 15828) | 0;
  sa = a + 16 | 0;
  p[5610] = b;
  rb(22444);
 }
 return p[5610];
}
function cp(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -2 | 0;
 if ((a & 65535) >>> 0 <= 36) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 16 >>> a | 0 : ((1 << a) - 1 & 16) << 32 - a | 2817 >>> a) & 1;
 }
 return 0;
}
function bw() {
 var a = 0, b = 0;
 a : {
  if (n[22544] & 1) {
   break a;
  }
  if (!sb(22544)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(2, 16592) | 0;
  sa = a + 16 | 0;
  p[5635] = b;
  rb(22544);
 }
 return p[5635];
}
function br(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -2 | 0;
 if ((a & 65535) >>> 0 <= 36) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 16 >>> a | 0 : ((1 << a) - 1 & 16) << 32 - a | 9985 >>> a) & 1;
 }
 return 0;
}
function ax() {
 var a = 0, b = 0;
 a : {
  if (n[22452] & 1) {
   break a;
  }
  if (!sb(22452)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(3, 15836) | 0;
  sa = a + 16 | 0;
  p[5612] = b;
  rb(22452);
 }
 return p[5612];
}
function _v() {
 var a = 0, b = 0;
 a : {
  if (n[22552] & 1) {
   break a;
  }
  if (!sb(22552)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(2, 16600) | 0;
  sa = a + 16 | 0;
  p[5637] = b;
  rb(22552);
 }
 return p[5637];
}
function Zw() {
 var a = 0, b = 0;
 a : {
  if (n[22460] & 1) {
   break a;
  }
  if (!sb(22460)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(2, 15848) | 0;
  sa = a + 16 | 0;
  p[5614] = b;
  rb(22460);
 }
 return p[5614];
}
function Yv() {
 var a = 0, b = 0;
 a : {
  if (n[22560] & 1) {
   break a;
  }
  if (!sb(22560)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(2, 16608) | 0;
  sa = a + 16 | 0;
  p[5639] = b;
  rb(22560);
 }
 return p[5639];
}
function Wv() {
 var a = 0, b = 0;
 a : {
  if (n[22568] & 1) {
   break a;
  }
  if (!sb(22568)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(5, 16624) | 0;
  sa = a + 16 | 0;
  p[5641] = b;
  rb(22568);
 }
 return p[5641];
}
function Vn(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 | 0;
 if ((a & 65535) >>> 0 <= 39) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 128 >>> a | 0 : ((1 << a) - 1 & 128) << 32 - a | 3 >>> a) & 1;
 }
 return 0;
}
function Up(a, b) {
 var c = 0;
 Tp(a, b);
 p[a >> 2] = 8116;
 p[a + 20 >> 2] = p[b + 20 >> 2];
 Ih(a + 24 | 0, b + 24 | 0);
 o[a + 44 >> 1] = r[b + 44 >> 1];
 c = p[b + 40 >> 2];
 p[a + 36 >> 2] = p[b + 36 >> 2];
 p[a + 40 >> 2] = c;
}
function Tv() {
 var a = 0, b = 0;
 a : {
  if (n[22576] & 1) {
   break a;
  }
  if (!sb(22576)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(3, 16644) | 0;
  sa = a + 16 | 0;
  p[5643] = b;
  rb(22576);
 }
 return p[5643];
}
function Jw() {
 var a = 0, b = 0;
 a : {
  if (n[22476] & 1) {
   break a;
  }
  if (!sb(22476)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(2, 16168) | 0;
  sa = a + 16 | 0;
  p[5618] = b;
  rb(22476);
 }
 return p[5618];
}
function Hw() {
 var a = 0, b = 0;
 a : {
  if (n[22484] & 1) {
   break a;
  }
  if (!sb(22484)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(3, 16176) | 0;
  sa = a + 16 | 0;
  p[5620] = b;
  rb(22484);
 }
 return p[5620];
}
function Ew() {
 var a = 0, b = 0;
 a : {
  if (n[22492] & 1) {
   break a;
  }
  if (!sb(22492)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(7, 16192) | 0;
  sa = a + 16 | 0;
  p[5622] = b;
  rb(22492);
 }
 return p[5622];
}
function Bx() {
 var a = 0, b = 0;
 a : {
  if (n[22400] & 1) {
   break a;
  }
  if (!sb(22400)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(1, 15412) | 0;
  sa = a + 16 | 0;
  p[5599] = b;
  rb(22400);
 }
 return p[5599];
}
function Aw() {
 var a = 0, b = 0;
 a : {
  if (n[22500] & 1) {
   break a;
  }
  if (!sb(22500)) {
   break a;
  }
  a = sa - 16 | 0;
  sa = a;
  b = K(3, 16220) | 0;
  sa = a + 16 | 0;
  p[5624] = b;
  rb(22500);
 }
 return p[5624];
}
function $q(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -2 | 0;
 if ((a & 65535) >>> 0 <= 36) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 16 >>> a | 0 : ((1 << a) - 1 & 16) << 32 - a | 1793 >>> a) & 1;
 }
 return 0;
}
function _q(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -2 | 0;
 if ((a & 65535) >>> 0 <= 36) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 16 >>> a | 0 : ((1 << a) - 1 & 16) << 32 - a | 769 >>> a) & 1;
 }
 return 0;
}
function rm(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 | 0;
 if ((a & 65535) >>> 0 <= 36) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 24 >>> a | 0 : ((1 << a) - 1 & 24) << 32 - a | 1 >>> a) & 1;
 }
 return 0;
}
function zy(a, b, c) {
 a : {
  b : {
   switch (b + -37 | 0) {
   default:
    if ((b | 0) != 88) {
     break a;
    }
    lk(a, c);
    return;
   case 0:
    Zf(a, c);
    return;
   case 1:
    break b;
   }
  }
  Zf(a, c);
 }
}
function zd(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 b = a;
 c = 0;
 a : {
  if (!p[a + 20 >> 2]) {
   break a;
  }
  c = 0;
  if (!zg(p[a + 20 >> 2])) {
   break a;
  }
  c = p[a + 20 >> 2];
 }
 p[b + 116 >> 2] = c;
 return 0;
}
function rv(a, b, c, d) {
 if (a | b) {
  while (1) {
   c = c + -1 | 0;
   n[c | 0] = q[(a & 15) + 21152 | 0] | d;
   a = (b & 15) << 28 | a >>> 4;
   b = b >>> 4 | 0;
   if (a | b) {
    continue;
   }
   break;
  }
 }
 return c;
}
function mj(a, b) {
 var c = w(0);
 p[a >> 2] = b;
 c = q[b + 40 | 0] ? w(w(p[b + 32 >> 2]) / w(p[b + 16 >> 2])) : c;
 p[a + 16 >> 2] = 0;
 p[a + 20 >> 2] = 1;
 p[a + 8 >> 2] = 0;
 p[a + 12 >> 2] = 0;
 t[a + 4 >> 2] = c;
 return a;
}
function hs(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 | 0;
 if ((a & 65535) >>> 0 <= 33) {
  b = a & 65535;
  a = b & 31;
  return (32 <= (b & 63) >>> 0 ? 2 >>> a | 0 : ((1 << a) - 1 & 2) << 32 - a | 3 >>> a) & 1;
 }
 return 0;
}
function Vv(a, b, c, d, e) {
 var f = 0;
 f = sa - 16 | 0;
 sa = f;
 p[f + 12 >> 2] = a;
 Cb(f + 12 | 0, t[b >> 2]);
 Cb(f + 12 | 0, t[c >> 2]);
 Cb(f + 12 | 0, t[d >> 2]);
 Cb(f + 12 | 0, t[e >> 2]);
 sa = f + 16 | 0;
 return a;
}
function Yp(a, b) {
 var c = 0;
 Up(a, b);
 p[a >> 2] = 4860;
 p[a >> 2] = 4800;
 p[a >> 2] = 5092;
 c = p[b + 52 >> 2];
 p[a + 48 >> 2] = p[b + 48 >> 2];
 p[a + 52 >> 2] = c;
 p[a >> 2] = 5816;
 p[a + 56 >> 2] = p[b + 56 >> 2];
}
function Ws(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = 1;
 a : {
  if (!b | (p[a + 8 >> 2] ? 0 : q[b + 12 | 0])) {
   break a;
  }
  c = 0;
  if (q[b + 12 | 0]) {
   break a;
  }
  c = p[a + 8 >> 2] == 1;
 }
 return c | 0;
}
function jr(a) {
 var b = 0, c = 0, d = 0, e = 0;
 Sd(a);
 p[a >> 2] = 4272;
 p[a >> 2] = 4144;
 b = ad(a + 168 | 0);
 c = ad(a + 264 | 0);
 d = ad(a + 360 | 0);
 e = ad(a + 456 | 0);
 Jb(a, b);
 Jb(a, c);
 Jb(a, d);
 Jb(a, e);
}
function yh(a, b) {
 a = a | 0;
 b = b | 0;
 if (qb(b, 8)) {
  if ((_a(a + 140 | 0) | 0) != (m[p[p[a >> 2] + 128 >> 2]](a) | 0)) {
   Cp(a, m[p[p[a >> 2] + 128 >> 2]](a) | 0);
  }
  m[p[p[a >> 2] + 132 >> 2]](a);
 }
 Kc(a, b);
}
function pg(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0, e = 0, f = 0;
 b = a + 52 | 0;
 if (p[b + 8 >> 2]) {
  c = p[b + 8 >> 2];
  e = c, f = wg(p[a + 48 >> 2], t[b + 4 >> 2]), d = p[p[c >> 2] + 4 >> 2], m[d](e | 0, f | 0);
 }
}
function lv(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 e = p[a + 20 >> 2];
 d = p[a + 16 >> 2] - e | 0;
 d = d >>> 0 > c >>> 0 ? c : d;
 Qb(e, b, d);
 p[a + 20 >> 2] = d + p[a + 20 >> 2];
 return c | 0;
}
function ik(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 var e = 0, f = 0;
 e = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 f = b;
 if (a & 1) {
  e = p[e + p[b >> 2] >> 2];
 }
 m[e | 0](f, c, d);
}
function Vl(a) {
 a = a | 0;
 var b = 0, c = 0, d = 0;
 b = p[a + 20 >> 2];
 if (!(!b | !p[b + 20 >> 2])) {
  d = a;
  b = p[b + 20 >> 2];
  if (yf(b)) {
   c = b;
  } else {
   c = 0;
  }
  p[d + 96 >> 2] = c;
  Tb(b, a);
 }
}
function bk(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 var e = 0, f = 0;
 e = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 f = b;
 if (a & 1) {
  e = p[e + p[b >> 2] >> 2];
 }
 m[e | 0](f, c, d);
}
function _h(a) {
 a = a | 0;
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = a + 40 | 0;
 if (!q[p[c + 4 >> 2] + -3 | 0]) {
  a = a + 4 | 0;
  hf(c, jf(b + 8 | 0, 0, nb(a) & 255));
  Lc(a, mb(a, 0));
 }
 sa = b + 16 | 0;
}
function Yw(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 d = w(d);
 var e = 0, f = 0;
 e = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 f = b;
 if (a & 1) {
  e = p[e + p[b >> 2] >> 2];
 }
 m[e | 0](f, c, d);
}
function _l(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 if (q[a + 46 | 0]) {
  c = m[p[p[c >> 2] + 36 >> 2]](c) | 0;
  m[p[p[c >> 2] + 12 >> 2]](c, p[a + 56 >> 2]);
  m[p[p[b >> 2] + 20 >> 2]](b, c, p[a + 48 >> 2]);
 }
}
function bp(a) {
 var b = 0;
 a : {
  switch ((m[p[p[a >> 2] + 8 >> 2]](a) | 0) + -1 | 0) {
  case 0:
   return a ? a + 76 | 0 : 0;
  case 2:
   b = a ? a + 160 | 0 : 0;
   break;
  default:
   break a;
  }
 }
 return b;
}
function fe(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 d = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 e = b;
 if (a & 1) {
  d = p[d + p[b >> 2] >> 2];
 }
 return m[d | 0](e, c) | 0;
}
function Zj(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 var d = 0, e = 0;
 d = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 e = b;
 if (a & 1) {
  d = p[d + p[b >> 2] >> 2];
 }
 return m[d | 0](e, c) | 0;
}
function Hl(a, b) {
 a = a | 0;
 b = b | 0;
 b = Gb(a, b);
 a : {
  if (b) {
   break a;
  }
  b = 1;
  if (!qg(a + 52 | 0, p[a + 20 >> 2])) {
   break a;
  }
  m[p[p[a >> 2] + 56 >> 2]](a);
  b = 0;
 }
 return b | 0;
}
function wg(a, b) {
 var c = 0;
 b = wv(w(w(w(w(se(a) >>> 0) / w(255)) * w(255)) * b));
 a : {
  if (b < w(4294967296) & b >= w(0)) {
   c = ~~b >>> 0;
   break a;
  }
  c = 0;
 }
 return xg(c, ve(a), ue(a), te(a));
}
function Qv(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = +c;
 var d = 0, e = 0;
 d = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 e = b;
 if (a & 1) {
  d = p[d + p[b >> 2] >> 2];
 }
 return m[d | 0](e, c) | 0;
}
function nk(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 d = p[b + 4 >> 2];
 p[c + 8 >> 2] = p[b >> 2];
 p[c + 12 >> 2] = d;
 H(22586, a | 0, 2, 16804, 15512, 922, Va(c + 8 | 0) | 0, 0);
 sa = c + 16 | 0;
}
function ig(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 d = p[b + 4 >> 2];
 p[c + 8 >> 2] = p[b >> 2];
 p[c + 12 >> 2] = d;
 H(22425, a | 0, 2, 15524, 15532, 879, Va(c + 8 | 0) | 0, 1);
 sa = c + 16 | 0;
}
function hg(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 d = p[b + 4 >> 2];
 p[c + 8 >> 2] = p[b >> 2];
 p[c + 12 >> 2] = d;
 H(22467, a | 0, 2, 15876, 15532, 888, Va(c + 8 | 0) | 0, 1);
 sa = c + 16 | 0;
}
function gg(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 d = p[b + 4 >> 2];
 p[c + 8 >> 2] = p[b >> 2];
 p[c + 12 >> 2] = d;
 H(22467, a | 0, 4, 15920, 15936, 891, Va(c + 8 | 0) | 0, 1);
 sa = c + 16 | 0;
}
function cg(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 d = p[b + 4 >> 2];
 p[c + 8 >> 2] = p[b >> 2];
 p[c + 12 >> 2] = d;
 H(22510, a | 0, 6, 16320, 16344, 903, Va(c + 8 | 0) | 0, 1);
 sa = c + 16 | 0;
}
function La(a) {
 var b = 0;
 a = a ? a : 1;
 a : {
  while (1) {
   b = de(a);
   if (b) {
    break a;
   }
   b = p[5683];
   if (b) {
    m[b | 0]();
    continue;
   }
   break;
  }
  Z();
  E();
 }
 return b;
}
function ov(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0, e = 0;
 c = b;
 b = p[b >> 2] + 15 & -16;
 p[c >> 2] = b + 16;
 d = a, e = fv(p[b >> 2], p[b + 4 >> 2], p[b + 8 >> 2], p[b + 12 >> 2]), u[d >> 3] = e;
}
function bi(a, b, c) {
 a = a | 0;
 b = w(b);
 c = w(c);
 var d = 0, e = 0;
 d = sa - 16 | 0;
 sa = d;
 e = a + 40 | 0;
 a = a + 4 | 0;
 hf(e, jf(d + 8 | 0, 0, nb(a) & 255));
 Lc(a, fb(d, b, c));
 sa = d + 16 | 0;
}
function tb(a) {
 var b = 0;
 b = p[909];
 p[a + 16 >> 2] = p[908];
 p[a + 20 >> 2] = b;
 b = p[907];
 p[a + 8 >> 2] = p[906];
 p[a + 12 >> 2] = b;
 b = p[905];
 p[a >> 2] = p[904];
 p[a + 4 >> 2] = b;
 return a;
}
function hl(a, b) {
 var c = 0, d = 0, e = 0, f = 0;
 c = sa - 16 | 0;
 sa = c;
 d = p[b >> 2];
 b = c + 8 | 0;
 e = b, f = ka(14053) | 0, p[e >> 2] = f;
 gb(a, $(d | 0, p[b >> 2]) | 0);
 Eb(b);
 sa = c + 16 | 0;
}
function Ye(a) {
 a = a | 0;
 var b = 0;
 p[a >> 2] = 5756;
 b = p[a + 52 >> 2];
 if (b) {
  m[p[p[b >> 2] + 4 >> 2]](b);
 }
 b = p[a + 56 >> 2];
 if (b) {
  m[p[p[b >> 2] + 4 >> 2]](b);
 }
 jb(a);
 return a | 0;
}
function zk(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22510, 14518, 3, 16300, 15548, 902, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function yk(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22510, 14558, 4, 16352, 16368, 904, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function xy(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22586, 14805, 3, 16812, 15868, 923, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function wy(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22586, 14825, 3, 16824, 15868, 924, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function wk(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22510, 14566, 2, 16376, 15532, 905, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function my(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22607, 15029, 5, 16848, 16868, 933, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function gy(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22610, 14706, 3, 16884, 16896, 935, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function ey(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22610, 15029, 4, 16912, 16368, 936, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Zk(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22425, 14095, 3, 15536, 15548, 880, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function Yk(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22425, 14105, 4, 15568, 15584, 881, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function Xk(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22425, 14114, 3, 15592, 15548, 882, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function Vk(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22422, 14123, 6, 15616, 15640, 883, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Sx(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22624, 15175, 2, 16952, 15532, 946, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Ry(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22582, 14631, 2, 16660, 15512, 910, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Qy(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22582, 14647, 3, 16668, 15868, 911, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Py(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22582, 14662, 3, 16680, 15868, 912, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Oy(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22582, 14678, 2, 16692, 15512, 913, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Nk(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22467, 14162, 4, 15888, 15584, 889, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function My(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22586, 14706, 3, 16700, 16712, 914, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Mk(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22467, 14170, 3, 15904, 15548, 890, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function Ly(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22586, 14714, 3, 16720, 15548, 915, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Lx(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22628, 14706, 3, 16968, 16896, 950, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Kx(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22628, 15029, 3, 16980, 15548, 951, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Kk(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22467, 14193, 8, 15952, 15984, 892, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function Jx(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22628, 15214, 2, 16992, 15512, 952, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Iy(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22586, 14719, 3, 16732, 15868, 916, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Gy(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22586, 14738, 3, 16744, 15868, 917, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Ey(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22586, 14743, 3, 16756, 15868, 918, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Ek(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22510, 14464, 3, 16232, 15548, 897, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function Dk(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22510, 14493, 3, 16244, 15548, 898, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function Cy(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22586, 14748, 3, 16768, 15868, 919, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Ck(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22510, 14499, 3, 16256, 16268, 899, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function By(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22586, 14757, 3, 16780, 15868, 920, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Bk(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22510, 14509, 3, 16276, 15548, 900, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function Ay(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22586, 14774, 3, 16792, 15868, 921, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Ak(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22510, 14514, 3, 16288, 15548, 901, Va(b + 8 | 0) | 0, 1);
 sa = b + 16 | 0;
}
function qv(a, b, c) {
 if (a | b) {
  while (1) {
   c = c + -1 | 0;
   n[c | 0] = a & 7 | 48;
   a = (b & 7) << 29 | a >>> 3;
   b = b >>> 3 | 0;
   if (a | b) {
    continue;
   }
   break;
  }
 }
 return c;
}
function ln(a) {
 Wb(a);
 p[a + 68 >> 2] = 0;
 p[a + 72 >> 2] = 0;
 p[a + 60 >> 2] = 0;
 p[a + 64 >> 2] = 1065353216;
 p[a + 52 >> 2] = 1065353216;
 p[a + 56 >> 2] = 0;
 p[a + 48 >> 2] = -1;
 p[a >> 2] = 12020;
}
function Kf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 if ((b | 0) == 138) {
  yd(d, c);
  Mf(a + 4 | 0, d);
  Yb(d);
 }
 sa = d + 16 | 0;
 return (b | 0) == 138 | 0;
}
function Ix(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 H(22628, 15225, 3, 17e3, 15868, 953, Va(b + 8 | 0) | 0, 0);
 sa = b + 16 | 0;
}
function Rp(a, b) {
 var c = 0, d = 0, e = 0;
 if (eh(a) >>> 0 < b >>> 0) {
  od();
  E();
 }
 Ra(a);
 c = Od(b);
 p[a >> 2] = c;
 p[a + 4 >> 2] = c;
 d = Ra(a), e = (b << 2) + c | 0, p[d >> 2] = e;
 Ie(a, 0);
}
function Qd(a, b, c, d, e, f) {
 ec(f, a, b, e);
 a = f + 8 | 0;
 ec(a, b, c, e);
 b = f + 16 | 0;
 ec(b, c, d, e);
 c = f + 24 | 0;
 ec(c, f, a, e);
 d = f + 32 | 0;
 ec(d, a, b, e);
 ec(f + 40 | 0, c, d, e);
}
function Cq(a, b, c, d, e, f, g) {
 a = a | 0;
 b = w(b);
 c = w(c);
 d = w(d);
 e = w(e);
 f = w(f);
 g = w(g);
 ai(a, b, c, d, e, f, g);
 a = p[a + 104 >> 2];
 m[p[p[a >> 2] + 28 >> 2]](a, b, c, d, e, f, g);
}
function pj(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 if ((b | 0) == 55) {
  yd(d, c);
  Mf(a + 4 | 0, d);
  Yb(d);
 }
 sa = d + 16 | 0;
 return (b | 0) == 55 | 0;
}
function je(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 p[d + 12 >> 2] = c;
 oa(22430, b | 0, 22470, 16656, 956, jc(d + 12 | 0) | 0, 22470, 16268, 957, jc(d + 12 | 0) | 0);
 sa = d + 16 | 0;
 return a;
}
function ag(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0;
 c = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 d = b;
 if (a & 1) {
  c = p[c + p[b >> 2] >> 2];
 }
 return Rv(m[c | 0](d) | 0) | 0;
}
function fh(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 a : {
  if ((b | 0) < 0) {
   break a;
  }
  a = a + 92 | 0;
  if ((_a(a) | 0) <= (b | 0)) {
   break a;
  }
  c = p[Qa(a, b) >> 2];
 }
 return c | 0;
}
function Rb(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 d = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 e = b;
 if (a & 1) {
  d = p[d + p[b >> 2] >> 2];
 }
 m[d | 0](e, c);
}
function Tc(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 var d = 0, e = 0;
 d = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 e = b;
 if (a & 1) {
  d = p[d + p[b >> 2] >> 2];
 }
 m[d | 0](e, c);
}
function Jr(a, b, c) {
 var d = 0;
 d = Ja(a, 0);
 t[d >> 2] = t[d >> 2] * b;
 d = Ja(a, 1);
 t[d >> 2] = t[d >> 2] * b;
 d = Ja(a, 2);
 t[d >> 2] = t[d >> 2] * c;
 a = Ja(a, 3);
 t[a >> 2] = t[a >> 2] * c;
}
function wx(a, b) {
 var c = 0;
 jg(a);
 c = b + 4 | 0;
 Gd(Ra(a), p[a >> 2], p[a + 4 >> 2], c);
 Ya(a, c);
 Ya(a + 4 | 0, b + 8 | 0);
 Ya(Ra(a), Xa(b));
 p[b >> 2] = p[b + 4 >> 2];
 Zb(a);
 Dc(a);
 Dc(a);
}
function lq(a, b) {
 var c = 0;
 Rh(a);
 c = b + 4 | 0;
 iq(Ra(a), p[a >> 2], p[a + 4 >> 2], c);
 Ya(a, c);
 Ya(a + 4 | 0, b + 8 | 0);
 Ya(Ra(a), Xa(b));
 p[b >> 2] = p[b + 4 >> 2];
 qc(a);
 oc(a);
 oc(a);
}
function xn(a, b) {
 var c = 0, d = 0, e = 0;
 c = sa - 32 | 0;
 sa = c;
 d = c, e = Oe(b), p[d + 16 >> 2] = e;
 mm(c + 24 | 0, a, b, c + 16 | 0);
 a = Xb(c + 24 | 0);
 sa = c + 32 | 0;
 return a + 4 | 0;
}
function Pe(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 mo(a);
 Ee(a + 8 | 0);
 p[b + 12 >> 2] = 0;
 Me(a + 12 | 0, b + 12 | 0);
 p[b + 4 >> 2] = 1065353216;
 Me(a + 16 | 0, b + 4 | 0);
 sa = b + 16 | 0;
}
function Lo(a, b) {
 var c = 0, d = 0, e = 0;
 c = sa - 32 | 0;
 sa = c;
 d = c, e = Oe(b), p[d + 16 >> 2] = e;
 Io(c + 24 | 0, a, b, c + 16 | 0);
 a = Xb(c + 24 | 0);
 sa = c + 32 | 0;
 return a + 4 | 0;
}
function Ln(a, b) {
 var c = 0, d = 0, e = 0;
 c = sa - 32 | 0;
 sa = c;
 d = c, e = Oe(b), p[d + 16 >> 2] = e;
 un(c + 24 | 0, a, b, c + 16 | 0);
 a = Xb(c + 24 | 0);
 sa = c + 32 | 0;
 return a + 4 | 0;
}
function Kp(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 a : {
  if (!qb(b, 8)) {
   break a;
  }
  c = a + 156 | 0;
  if (!p[c + 4 >> 2]) {
   break a;
  }
  ls(p[c + 4 >> 2], a + 140 | 0);
 }
 Kc(a, b);
}
function nn(a) {
 Fe(a);
 n[a + 40 | 0] = 0;
 p[a + 32 >> 2] = -1;
 p[a + 36 >> 2] = -1;
 p[a + 24 >> 2] = 1065353216;
 p[a + 28 >> 2] = 0;
 p[a + 16 >> 2] = 60;
 p[a + 20 >> 2] = 60;
 p[a >> 2] = 9928;
}
function _u(a) {
 var b = 0;
 a : {
  a = p[a + 8 >> 2];
  b = q[a | 0];
  if ((b | 0) != 1) {
   if (b & 2) {
    break a;
   }
   n[a | 0] = 2;
   a = 1;
  } else {
   a = 0;
  }
  return a;
 }
 E();
}
function ll(a, b, c) {
 var d = 0, e = 0;
 d = sa - 16 | 0;
 sa = d;
 e = +ma(Bx() | 0, b | 0, c | 0, d + 4 | 0, mk(d + 8 | 0) | 0);
 b = gb(d, p[d + 4 >> 2]);
 _f(a, ie(e));
 ud(b);
 sa = d + 16 | 0;
}
function $f(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0;
 c = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 d = b;
 if (a & 1) {
  c = p[p[b >> 2] + c >> 2];
 }
 return m[c | 0](d) | 0;
}
function ix(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 p[d + 8 >> 2] = c;
 p[d + 12 >> 2] = b;
 bx(p[a + 8 >> 2], d + 12 | 0, d + 8 | 0);
 sa = d + 16 | 0;
}
function Rw(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0, f = 0, g = 0;
 e = a, f = m[p[p[b >> 2] + 36 >> 2]](b) | 0, g = c, d = p[p[a >> 2] + 40 >> 2], m[d](e | 0, f | 0, g | 0);
}
function Cd(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 p[d + 12 >> 2] = b;
 Le(a, d + 12 | 0);
 b = p[c + 4 >> 2];
 p[a + 4 >> 2] = p[c >> 2];
 p[a + 8 >> 2] = b;
 sa = d + 16 | 0;
 return a;
}
function nw(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 t[d + 8 >> 2] = c;
 p[d + 12 >> 2] = b;
 Uv(p[a + 8 >> 2], d + 12 | 0, d + 8 | 0);
 sa = d + 16 | 0;
}
function Lb(a) {
 var b = 0, c = 0;
 b = a * a;
 c = b * a;
 return w(c * (b * b) * (b * 2718311493989822e-21 + -.00019839334836096632) + (c * (b * .008333329385889463 + -.16666666641626524) + a));
}
function tt(a) {
 p[a + 20 >> 2] = 0;
 p[a + 24 >> 2] = 0;
 p[a >> 2] = 0;
 p[a + 4 >> 2] = 0;
 p[a + 28 >> 2] = 1065353216;
 p[a + 8 >> 2] = 0;
 p[a + 12 >> 2] = 0;
 n[a + 16 | 0] = 0;
 return a;
}
function tq(a, b) {
 var c = 0;
 _e(a);
 c = b + 4 | 0;
 Gd(Ra(a), p[a >> 2], p[a + 4 >> 2], c);
 Ya(a, c);
 Ya(a + 4 | 0, b + 8 | 0);
 Ya(Ra(a), Xa(b));
 p[b >> 2] = p[b + 4 >> 2];
 Sh(a, nb(a));
}
function Qe(a, b) {
 var c = 0;
 sf(a);
 c = b + 4 | 0;
 Gd(Ra(a), p[a >> 2], p[a + 4 >> 2], c);
 Ya(a, c);
 Ya(a + 4 | 0, b + 8 | 0);
 Ya(Ra(a), Xa(b));
 p[b >> 2] = p[b + 4 >> 2];
 Ie(a, _a(a));
}
function Ph(a, b) {
 var c = 0;
 _e(a);
 c = b + 4 | 0;
 oq(Ra(a), p[a >> 2], p[a + 4 >> 2], c);
 Ya(a, c);
 Ya(a + 4 | 0, b + 8 | 0);
 Ya(Ra(a), Xa(b));
 p[b >> 2] = p[b + 4 >> 2];
 Sh(a, nb(a));
}
function fl(a, b) {
 var c = 0;
 c = Zb(a);
 if (c >>> 0 < b >>> 0) {
  dl(a, b - c | 0);
  return;
 }
 if (c >>> 0 > b >>> 0) {
  b = p[a >> 2] + b | 0;
  Zb(a);
  kk(a, b);
  Dc(a);
  Zb(a);
 }
}
function Ov(a) {
 a = a | 0;
 var b = 0;
 b = sa - 112 | 0;
 sa = b;
 p[b + 108 >> 2] = a;
 p[b >> 2] = p[b + 108 >> 2];
 nv(b + 16 | 0, b);
 a = jv(b + 16 | 0);
 sa = b + 112 | 0;
 return a | 0;
}
function Qq(a, b) {
 var c = 0;
 c = nb(a);
 if (c >>> 0 < b >>> 0) {
  Lq(a, b - c | 0);
  return;
 }
 if (c >>> 0 > b >>> 0) {
  b = p[a >> 2] + (b << 3) | 0;
  nb(a);
  Qh(a, b);
  gi(a);
 }
}
function ef(a) {
 a = a | 0;
 var b = 0;
 p[a >> 2] = 5208;
 db(a - -64 | 0);
 db(a + 52 | 0);
 b = a + 40 | 0;
 Rh(b);
 rq(b);
 df(a + 28 | 0);
 df(a + 16 | 0);
 df(a + 4 | 0);
 return a | 0;
}
function Qw(a, b, c) {
 a = a | 0;
 b = w(b);
 c = w(c);
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 t[d + 8 >> 2] = c;
 t[d + 12 >> 2] = b;
 ck(a, 14179, d + 12 | 0, d + 8 | 0);
 sa = d + 16 | 0;
}
function Pw(a, b, c) {
 a = a | 0;
 b = w(b);
 c = w(c);
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 t[d + 8 >> 2] = c;
 t[d + 12 >> 2] = b;
 ck(a, 14186, d + 12 | 0, d + 8 | 0);
 sa = d + 16 | 0;
}
function kq(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 Ra(a);
 p[b + 12 >> 2] = 1431655765;
 p[b + 8 >> 2] = 2147483647;
 a = p[Ad(b + 12 | 0, b + 8 | 0) >> 2];
 sa = b + 16 | 0;
 return a;
}
function eh(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 Ra(a);
 p[b + 12 >> 2] = 1073741823;
 p[b + 8 >> 2] = 2147483647;
 a = p[Ad(b + 12 | 0, b + 8 | 0) >> 2];
 sa = b + 16 | 0;
 return a;
}
function sq(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 Ra(a);
 p[b + 12 >> 2] = 536870911;
 p[b + 8 >> 2] = 2147483647;
 a = p[Ad(b + 12 | 0, b + 8 | 0) >> 2];
 sa = b + 16 | 0;
 return a;
}
function pt(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 while (1) {
  if (c >>> 0 < s[a + 16 >> 2]) {
   ot(p[a + 20 >> 2] + (c << 5) | 0, b);
   c = c + 1 | 0;
   continue;
  }
  break;
 }
}
function np(a) {
 pf(a);
 p[a + 128 >> 2] = 3;
 p[a + 132 >> 2] = 0;
 p[a >> 2] = 6888;
 p[a >> 2] = 6780;
 $a(a + 136 | 0);
 p[a + 156 >> 2] = 0;
 p[a + 148 >> 2] = 0;
 p[a + 152 >> 2] = 0;
}
function Ql(a, b) {
 var c = 0;
 c = sa - 32 | 0;
 sa = c;
 p[c + 16 >> 2] = b;
 p[c + 24 >> 2] = a;
 p[c + 12 >> 2] = 688;
 qe(p[c + 24 >> 2], p[c + 16 >> 2], c + 12 | 0);
 sa = c + 32 | 0;
}
function ge(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0, d = 0;
 c = p[a >> 2];
 a = p[a + 4 >> 2];
 b = (a >> 1) + b | 0;
 d = b;
 if (a & 1) {
  c = p[p[b >> 2] + c >> 2];
 }
 m[c | 0](d);
}
function Wb(a) {
 Pb(a);
 p[a >> 2] = 2724;
 Zd(a + 4 | 0, 4912);
 p[a + 16 >> 2] = 0;
 p[a + 20 >> 2] = 0;
 p[a >> 2] = 8116;
 $a(a + 24 | 0);
 o[a + 44 >> 1] = 65535;
 p[a + 40 >> 2] = 0;
}
function il(a, b) {
 a = a | 0;
 b = b | 0;
 b = Db(b, 26);
 if (!b) {
  return 1;
 }
 t[a + 20 >> 2] = w(p[a + 4 >> 2]) / w(p[p[b + 4 >> 2] + 16 >> 2]);
 li(p[b + 8 >> 2], a);
 return 0;
}
function Uo(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 if ((b | 0) == 127) {
  d = a, e = w(Sa(c)), t[d + 176 >> 2] = e;
  return 1;
 }
 return wh(a, b, c) | 0;
}
function To(a) {
 var b = 0, c = 0, d = 0;
 Sd(a);
 p[a >> 2] = 7676;
 p[a >> 2] = 7548;
 b = Vb(a + 168 | 0);
 c = Vb(a + 232 | 0);
 d = Vb(a + 296 | 0);
 Jb(a, b);
 Jb(a, c);
 Jb(a, d);
}
function pp(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 if ((b | 0) == 31) {
  d = a, e = w(Sa(c)), t[d + 168 >> 2] = e;
  return 1;
 }
 return rf(a, b, c) | 0;
}
function pn(a) {
 Mg(a);
 p[a + 72 >> 2] = 255;
 p[a + 76 >> 2] = 1;
 p[a + 64 >> 2] = 255;
 p[a + 68 >> 2] = 1;
 p[a >> 2] = 12192;
 p[a >> 2] = 12108;
 hb(a + 80 | 0);
 hb(a + 88 | 0);
}
function en(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 if ((b | 0) == 140) {
  d = a, e = w(Sa(c)), t[d + 16 >> 2] = e;
  return 1;
 }
 return Kf(a, b, c) | 0;
}
function Ti(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 if ((b | 0) == 89) {
  d = a, e = w(Sa(c)), t[d + 120 >> 2] = e;
  return 1;
 }
 return Df(a, b, c) | 0;
}
function Ls(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 if ((b | 0) == 157) {
  d = a, e = w(Sa(c)), t[d + 12 >> 2] = e;
  return 1;
 }
 return Wi(a, b, c) | 0;
}
function ml(a) {
 var b = 0, c = 0, d = 0;
 b = sa - 16 | 0;
 sa = b;
 c = +S(p[a >> 2], p[3854], b + 4 | 0);
 a = gb(b, p[b + 4 >> 2]);
 d = ie(c);
 ud(a);
 sa = b + 16 | 0;
 return d;
}
function kl(a) {
 var b = 0, c = 0, d = 0;
 b = sa - 16 | 0;
 sa = b;
 c = +S(p[a >> 2], p[3855], b + 4 | 0);
 a = gb(b, p[b + 4 >> 2]);
 d = ie(c);
 ud(a);
 sa = b + 16 | 0;
 return d;
}
function gl(a) {
 var b = 0, c = 0, d = 0;
 b = sa - 16 | 0;
 sa = b;
 c = +S(p[a >> 2], p[3856], b + 4 | 0);
 a = gb(b, p[b + 4 >> 2]);
 d = ie(c);
 ud(a);
 sa = b + 16 | 0;
 return d;
}
function aw(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 if ((b | 0) == 70) {
  d = a, e = w(Sa(c)), t[d + 24 >> 2] = e;
  return 1;
 }
 return rd(a, b, c) | 0;
}
function Vp(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = w(0);
 if ((b | 0) == 26) {
  d = a, e = w(Sa(c)), t[d + 60 >> 2] = e;
  return 1;
 }
 return bd(a, b, c) | 0;
}
function Ih(a, b) {
 var c = 0, d = 0;
 d = sa - 16 | 0;
 sa = d;
 Ra(b);
 Sp(a);
 c = _a(b);
 if (c) {
  Rp(a, c);
  Qp(a, p[b >> 2], p[b + 4 >> 2], c);
 }
 sa = d + 16 | 0;
 return a;
}
function vx(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 Ra(a);
 p[b + 12 >> 2] = -1;
 p[b + 8 >> 2] = 2147483647;
 a = p[Ad(b + 12 | 0, b + 8 | 0) >> 2];
 sa = b + 16 | 0;
 return a;
}
function Xh(a) {
 Wh(a);
 p[a >> 2] = 5208;
 $a(a + 4 | 0);
 $a(a + 16 | 0);
 $a(a + 28 | 0);
 $a(a + 40 | 0);
 $a(a + 52 | 0);
 $a(a - -64 | 0);
 p[a + 76 >> 2] = 0;
 tb(a + 80 | 0);
}
function mn(a) {
 rc(a);
 p[a + 48 >> 2] = 0;
 p[a + 52 >> 2] = 0;
 p[a >> 2] = 11324;
 p[a + 56 >> 2] = 0;
 p[a + 60 >> 2] = 0;
 a = a - -64 | 0;
 p[a >> 2] = 0;
 p[a + 4 >> 2] = 0;
}
function qg(a, b) {
 var c = 0, d = 0, e = 0;
 c = m[p[p[b >> 2] + 12 >> 2]](b, 21) | 0;
 if (c) {
  d = a, e = m[p[p[b >> 2] + 56 >> 2]](b, a) | 0, p[d + 8 >> 2] = e;
 }
 return c;
}
function qf(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 128) {
  d = a, e = gc(c), p[d + 128 >> 2] = e;
  return 1;
 }
 return of(a, b, c) | 0;
}
function sd(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 _f(c + 8 | 0, b);
 a = m[a | 0](c + 8 | 0) | 0;
 Eb(c + 8 | 0);
 sa = c + 16 | 0;
 return a | 0;
}
function hu(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 122) {
  d = a, e = gc(c), p[d + 24 >> 2] = e;
  return 1;
 }
 return rd(a, b, c) | 0;
}
function es(a, b) {
 a = a | 0;
 b = b | 0;
 b = p[a + 20 >> 2];
 if (m[p[p[b >> 2] + 12 >> 2]](b, 43) | 0) {
  ks(p[a + 20 >> 2], a);
  a = 0;
 } else {
  a = 1;
 }
 return a | 0;
}
function Wa(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[a + 4 >> 2];
 p[b + 8 >> 2] = p[a >> 2];
 p[b + 12 >> 2] = c;
 a = Va(b + 8 | 0);
 sa = b + 16 | 0;
 return a;
}
function Un(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 121) {
  d = a, e = gc(c), p[d + 48 >> 2] = e;
  return 1;
 }
 return xb(a, b, c) | 0;
}
function ym(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 40) {
  d = a, e = gc(c), p[d + 56 >> 2] = e;
  return 1;
 }
 return ze(a, b, c) | 0;
}
function xh(a, b, c) {
 var d = w(0);
 d = w(b * w(3));
 c = w(c * w(3));
 b = w(c + w(b * w(-6)));
 return w(d + w(w(w(b + b) * a) + w(w(w(w(d + w(w(1) - c)) * w(3)) * a) * a)));
}
function kh(a) {
 Wb(a);
 p[a + 48 >> 2] = -1;
 p[a + 52 >> 2] = 0;
 p[a >> 2] = 7976;
 p[a + 64 >> 2] = 0;
 p[a + 56 >> 2] = 0;
 p[a + 60 >> 2] = 0;
 p[a >> 2] = 8328;
 return a;
}
function Wi(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 156) {
  d = a, e = gc(c), p[d + 8 >> 2] = e;
  return 1;
 }
 return Vi(a, b, c) | 0;
}
function Sm(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 141) {
  d = a, e = Gc(c), n[d + 16 | 0] = e;
  return 1;
 }
 return Kf(a, b, c) | 0;
}
function Fx(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 88) {
  d = a, e = hd(c), p[d + 24 >> 2] = e;
  return 1;
 }
 return rd(a, b, c) | 0;
}
function Fp(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 32) {
  d = a, e = Gc(c), n[d + 152 | 0] = e;
  return 1;
 }
 return qf(a, b, c) | 0;
}
function Em(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 37) {
  d = a, e = hd(c), p[d + 48 >> 2] = e;
  return 1;
 }
 return xb(a, b, c) | 0;
}
function Dh(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 Cf(t[a + 48 >> 2], t[a + 52 >> 2], p[p[a + 56 >> 2] + 52 >> 2], p[p[a + 56 >> 2] + 48 >> 2], b, c, Eh(p[a + 56 >> 2]));
}
function ze(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 41) {
  d = a, e = Gc(c), n[d + 46 | 0] = e;
  return 1;
 }
 return xb(a, b, c) | 0;
}
function oq(a, b, c, d) {
 while (1) {
  if ((b | 0) != (c | 0)) {
   c = c + -8 | 0;
   Ze(a, p[d >> 2] + -8 | 0, c);
   p[d >> 2] = p[d >> 2] + -8;
   continue;
  }
  break;
 }
}
function ii(a) {
 a = a | 0;
 var b = 0;
 p[a + 76 >> 2] = 0;
 mf(a + 28 | 0);
 mf(a + 4 | 0);
 b = a + 40 | 0;
 qc(b);
 fi(b);
 oc(b);
 qc(b);
 Rd(a + 52 | 0);
 Rd(a - -64 | 0);
}
function vu(a, b, c, d, e, f, g, h, i) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 e = w(e);
 f = w(f);
 g = w(g);
 h = w(h);
 i = w(i);
 m[a | 0](b, c, d, e, f, g, h, i);
}
function Ki(a, b, c) {
 if (b - a >>> 0 >= 4) {
  p[c >> 2] = q[a | 0] | q[a + 1 | 0] << 8 | (q[a + 2 | 0] << 16 | q[a + 3 | 0] << 24);
  a = 4;
 } else {
  a = 0;
 }
 return a;
}
function wq(a, b) {
 var c = 0, d = 0;
 d = sa - 16 | 0;
 sa = d;
 c = cf(d, a, 1);
 Th(Ra(a), p[c + 4 >> 2], b);
 p[c + 4 >> 2] = p[c + 4 >> 2] + 8;
 Ub(c);
 sa = d + 16 | 0;
}
function Pq(a, b) {
 var c = 0, d = 0;
 d = sa - 16 | 0;
 sa = d;
 c = cf(d, a, 1);
 Ze(Ra(a), p[c + 4 >> 2], b);
 p[c + 4 >> 2] = p[c + 4 >> 2] + 8;
 Ub(c);
 sa = d + 16 | 0;
}
function Mb(a) {
 var b = 0;
 a = a * a;
 b = a * a;
 return w(a * -.499999997251031 + 1 + b * .04166662332373906 + a * b * (a * 2439044879627741e-20 + -.001388676377460993));
}
function $c(a, b) {
 var c = 0, d = 0;
 d = sa - 16 | 0;
 sa = d;
 c = Md(d, a, 1);
 lc(Ra(a), p[c + 4 >> 2], b);
 p[c + 4 >> 2] = p[c + 4 >> 2] + 4;
 Ub(c);
 sa = d + 16 | 0;
}
function Zu(a) {
 var b = 0, c = 0, d = 0;
 b = sa - 16 | 0;
 sa = b;
 c = p[gb(b + 8 | 0, p[a + 4 >> 2]) >> 2], d = 1, n[c | 0] = d;
 n[p[a + 8 >> 2]] = 1;
 sa = b + 16 | 0;
}
function Ir(a, b) {
 var c = w(0), d = w(0);
 c = w(t[Ja(b, 0) >> 2] - t[Ja(a, 0) >> 2]);
 d = w(c * c);
 c = w(t[Ja(b, 1) >> 2] - t[Ja(a, 1) >> 2]);
 return w(d + w(c * c));
}
function og(a) {
 a = a | 0;
 var b = 0;
 p[a + 64 >> 2] = 13908;
 p[a >> 2] = 13824;
 b = p[a + 68 >> 2];
 if (b) {
  m[p[p[b >> 2] + 4 >> 2]](b);
 }
 jb(a);
 return a | 0;
}
function Ii(a) {
 var b = 0, c = 0;
 b = p[a >> 2];
 a : {
  if ((p[a + 4 >> 2] - b | 0) <= 0) {
   id(a);
   break a;
  }
  p[a >> 2] = b + 1;
  c = q[b | 0];
 }
 return c;
}
function Lw(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 p[d + 12 >> 2] = b;
 Bw(p[a + 8 >> 2], d + 12 | 0, c);
 sa = d + 16 | 0;
}
function pq(a, b) {
 var c = 0;
 c = p[a + 4 >> 2];
 while (1) {
  if ((b | 0) != (c | 0)) {
   Ra(a);
   c = c + -3 | 0;
   continue;
  }
  break;
 }
 p[a + 4 >> 2] = b;
}
function kk(a, b) {
 var c = 0;
 c = p[a + 4 >> 2];
 while (1) {
  if ((b | 0) != (c | 0)) {
   Ra(a);
   c = c + -1 | 0;
   continue;
  }
  break;
 }
 p[a + 4 >> 2] = b;
}
function Vi(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 155) {
  d = a, e = gc(c), p[d + 4 >> 2] = e;
 }
 return (b | 0) == 155 | 0;
}
function Qh(a, b) {
 var c = 0;
 c = p[a + 4 >> 2];
 while (1) {
  if ((b | 0) != (c | 0)) {
   Ra(a);
   c = c + -8 | 0;
   continue;
  }
  break;
 }
 p[a + 4 >> 2] = b;
}
function Bn(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 8 >> 2] = p[a + 4 >> 2];
 p[c >> 2] = p[b + 4 >> 2];
 a = Oa(c + 8 | 0, c);
 sa = c + 16 | 0;
 return a;
}
function Bh(a, b) {
 var c = 0;
 c = p[a + 4 >> 2];
 while (1) {
  if ((b | 0) != (c | 0)) {
   Ra(a);
   c = c + -4 | 0;
   continue;
  }
  break;
 }
 p[a + 4 >> 2] = b;
}
function vo(a, b) {
 a = a | 0;
 b = b | 0;
 var c = w(0);
 c = t[b + 48 >> 2];
 t[a + 12 >> 2] = t[b + 52 >> 2];
 t[a + 8 >> 2] = c;
 t[a + 4 >> 2] = 0;
 t[a >> 2] = 0;
}
function Vg(a, b) {
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 d = c, e = go(a, b), p[d >> 2] = e;
 a = p[Hc(c + 8 | 0, c) >> 2];
 sa = c + 16 | 0;
 return a;
}
function wl(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 53) {
  d = a, e = gc(c), p[d + 4 >> 2] = e;
 }
 return (b | 0) == 53 | 0;
}
function td() {
 var a = 0, b = 0;
 a = sa - 16 | 0;
 sa = a;
 lg(a);
 kg(a + 8 | 0, a, 14038);
 Eb(a);
 b = kl(a + 8 | 0);
 Eb(a + 8 | 0);
 sa = a + 16 | 0;
 return b;
}
function nl() {
 var a = 0, b = 0;
 a = sa - 16 | 0;
 sa = a;
 lg(a);
 kg(a + 8 | 0, a, 14022);
 Eb(a);
 b = ml(a + 8 | 0);
 Eb(a + 8 | 0);
 sa = a + 16 | 0;
 return b;
}
function ft(a, b) {
 a = a | 0;
 b = b | 0;
 a = 1;
 a : {
  switch (b + -54 | 0) {
  default:
   a = 0;
   break;
  case 0:
  case 3:
   break a;
  }
 }
 return a | 0;
}
function bn(a, b) {
 a = a | 0;
 b = b | 0;
 a = 1;
 a : {
  switch (b + -67 | 0) {
  default:
   a = 0;
   break;
  case 0:
  case 2:
   break a;
  }
 }
 return a | 0;
}
function _p(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 51) {
  d = a, e = gc(c), p[d + 4 >> 2] = e;
 }
 return (b | 0) == 51 | 0;
}
function Ug() {
 var a = 0, b = 0, c = 0, d = 0;
 a = sa - 16 | 0;
 sa = a;
 c = a, d = vc(), p[c >> 2] = d;
 b = Hc(a + 8 | 0, a);
 sa = a + 16 | 0;
 return p[b >> 2];
}
function St(a, b) {
 a = a | 0;
 b = b | 0;
 a = 1;
 a : {
  switch (b + -27 | 0) {
  default:
   a = 0;
   break;
  case 0:
  case 4:
   break a;
  }
 }
 return a | 0;
}
function Sd(a) {
 oi(a);
 p[a + 160 >> 2] = 1056964608;
 p[a + 164 >> 2] = 1056964608;
 p[a + 152 >> 2] = 0;
 p[a + 156 >> 2] = 0;
 p[a >> 2] = 4400;
 p[a >> 2] = 5372;
}
function _j(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 a = m[a | 0](c + 12 | 0) | 0;
 sa = c + 16 | 0;
 return a | 0;
}
function Sv(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 p[d + 12 >> 2] = a;
 ic(d + 12 | 0, p[b >> 2]);
 Cb(d + 12 | 0, t[c >> 2]);
 sa = d + 16 | 0;
 return a;
}
function Gw(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 p[d + 12 >> 2] = a;
 Cb(d + 12 | 0, t[b >> 2]);
 Cb(d + 12 | 0, t[c >> 2]);
 sa = d + 16 | 0;
 return a;
}
function $w(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 p[d + 12 >> 2] = a;
 ic(d + 12 | 0, p[b >> 2]);
 ic(d + 12 | 0, p[c >> 2]);
 sa = d + 16 | 0;
 return a;
}
function nc(a) {
 a = a | 0;
 var b = 0;
 p[a >> 2] = 5500;
 b = p[a + 136 >> 2];
 if (b) {
  m[p[p[b >> 2] + 4 >> 2]](b);
 }
 db(a + 140 | 0);
 jb(a);
 return a | 0;
}
function hn(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 var d = 0, e = 0;
 if ((b | 0) == 149) {
  d = a, e = gc(c), p[d + 16 >> 2] = e;
  return 1;
 }
 return 0;
}
function Ah(a, b) {
 var c = 0;
 c = _a(a);
 if (c >>> 0 < b >>> 0) {
  Bp(a, b - c | 0);
  return;
 }
 if (c >>> 0 > b >>> 0) {
  zh(a, p[a >> 2] + (b << 2) | 0);
 }
}
function yi(a, b) {
 var c = 0, d = 0, e = 0;
 c = p[Ja(b, 0) >> 2];
 d = Ja(a, 0), e = c, p[d >> 2] = e;
 b = p[Ja(b, 1) >> 2];
 d = Ja(a, 1), e = b, p[d >> 2] = e;
}
function el(a, b) {
 var c = 0, d = 0, e = 0;
 c = sa - 16 | 0;
 sa = c;
 d = a, e = _(22408, cl(c + 8 | 0, b) | 0) | 0, p[d >> 2] = e;
 sa = c + 16 | 0;
 return a;
}
function zw(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 p[d + 12 >> 2] = a;
 ic(d + 12 | 0, p[b >> 2]);
 ic(d + 12 | 0, fk(c));
 sa = d + 16 | 0;
 return a;
}
function Wu(a, b) {
 if (((i(a), e(2)) & 2147483647) >>> 0 <= 2139095040) {
  return ((i(b), e(2)) & 2147483647) >>> 0 > 2139095040 ? a : w(z(a, b));
 }
 return b;
}
function Vu(a, b) {
 if (((i(a), e(2)) & 2147483647) >>> 0 <= 2139095040) {
  return ((i(b), e(2)) & 2147483647) >>> 0 > 2139095040 ? a : w(A(a, b));
 }
 return b;
}
function Tg(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 bo(d + 8 | 0, b, c, c);
 b = d + 8 | 0;
 Hc(a, b);
 n[a + 4 | 0] = q[b + 4 | 0];
 sa = d + 16 | 0;
}
function io(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 8 >> 2] = b;
 b = p[p[c + 8 >> 2] >> 2];
 p[a + 4 >> 2] = 0;
 p[a >> 2] = b;
 sa = c + 16 | 0;
}
function hm(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 8 >> 2] = b;
 b = r[p[c + 8 >> 2] >> 1];
 p[a + 4 >> 2] = 0;
 o[a >> 1] = b;
 sa = c + 16 | 0;
}
function nd(a) {
 var b = 0;
 if (q[a + 40 | 0]) {
  b = p[a + 36 >> 2];
 } else {
  b = p[a + 20 >> 2];
 }
 return w(w(w(b | 0) / w(p[a + 16 >> 2])) - qj(a));
}
function Fu(a, b, c, d, e, f, g, h) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 d = w(d);
 e = w(e);
 f = w(f);
 g = w(g);
 h = w(h);
 m[a | 0](b, c, d, e, f, g, h);
}
function uk() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 908;
 H(22510, 15648, 2, 16384, 15532, 909, jc(a + 12 | 0) | 0, 0);
 sa = a + 16 | 0;
}
function ab(a, b) {
 var c = 0;
 c = b + -1 | 0;
 if (!(c & b)) {
  return a & c;
 }
 if (a >>> 0 >= b >>> 0) {
  a = (a >>> 0) % (b >>> 0) | 0;
 }
 return a;
}
function Yx() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 846;
 H(22613, 15121, 2, 16936, 15512, 938, jc(a + 12 | 0) | 0, 0);
 sa = a + 16 | 0;
}
function Ya(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = p[a >> 2];
 p[a >> 2] = p[b >> 2];
 p[b >> 2] = p[c + 12 >> 2];
 sa = c + 16 | 0;
}
function Wx() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 847;
 H(22613, 15130, 2, 16944, 15512, 939, jc(a + 12 | 0) | 0, 0);
 sa = a + 16 | 0;
}
function Sk() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 886;
 H(22425, 15648, 2, 15688, 15532, 887, jc(a + 12 | 0) | 0, 0);
 sa = a + 16 | 0;
}
function Ik() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 895;
 H(22467, 15648, 2, 15996, 15532, 896, jc(a + 12 | 0) | 0, 0);
 sa = a + 16 | 0;
}
function $x() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 845;
 H(22613, 15114, 2, 16928, 15512, 937, jc(a + 12 | 0) | 0, 0);
 sa = a + 16 | 0;
}
function ul(a, b) {
 a = a | 0;
 b = b | 0;
 if (Se(p[a + 20 >> 2])) {
  p[p[a + 20 >> 2] + 72 >> 2] = a - -64;
  a = 0;
 } else {
  a = 2;
 }
 return a | 0;
}
function ad(a) {
 nf(a);
 p[a + 80 >> 2] = 0;
 p[a + 84 >> 2] = 0;
 p[a >> 2] = 4924;
 p[a + 88 >> 2] = 0;
 p[a + 92 >> 2] = 0;
 p[a >> 2] = 3880;
 return a;
}
function Pr(a) {
 a = a | 0;
 var b = 0;
 b = La(16);
 p[b >> 2] = 0;
 p[b + 4 >> 2] = 0;
 p[b + 8 >> 2] = 0;
 p[b + 12 >> 2] = 0;
 Gi(a, gd(b));
 return 1;
}
function $u(a) {
 var b = 0, c = 0;
 b = sa - 16 | 0;
 sa = b;
 if (!q[p[gb(b + 8 | 0, p[a + 4 >> 2]) >> 2]]) {
  c = _u(a);
 }
 sa = b + 16 | 0;
 return c;
}
function nu(a, b, c, d, e, f, g) {
 a = a | 0;
 b = b | 0;
 c = +c;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 return m[a | 0](b, c, d, e, f, g) | 0;
}
function Vr(a) {
 var b = 0;
 b = a;
 a = 0;
 while (1) {
  if ((a | 0) != 3) {
   p[(a << 2) + b >> 2] = 0;
   a = a + 1 | 0;
   continue;
  }
  break;
 }
}
function Xd(a, b, c) {
 var d = w(0);
 d = w(b * w(3));
 c = w(c * w(3));
 return w(w(d + w(w(w(c + w(b * w(-6))) + w(w(d + w(w(1) - c)) * a)) * a)) * a);
}
function ww(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 jw(p[a + 8 >> 2], c + 12 | 0);
 sa = c + 16 | 0;
}
function vw(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 hw(p[a + 8 >> 2], c + 12 | 0);
 sa = c + 16 | 0;
}
function sw(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 cw(p[a + 8 >> 2], c + 12 | 0);
 sa = c + 16 | 0;
}
function rw(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 $v(p[a + 8 >> 2], c + 12 | 0);
 sa = c + 16 | 0;
}
function qw(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 Zv(p[a + 8 >> 2], c + 12 | 0);
 sa = c + 16 | 0;
}
function hx(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 _w(p[a + 8 >> 2], c + 12 | 0);
 sa = c + 16 | 0;
}
function cl(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 4 >> 2] = a;
 Za(c + 8 | 0, b);
 tx(c + 4 | 0, c + 8 | 0);
 sa = c + 16 | 0;
 return a;
}
function Sw(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 Kw(p[a + 8 >> 2], c + 12 | 0);
 sa = c + 16 | 0;
}
function tw(a, b) {
 a = a | 0;
 b = w(b);
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 t[c + 12 >> 2] = b;
 fw(p[a + 8 >> 2], c + 12 | 0);
 sa = c + 16 | 0;
}
function so(a, b) {
 a = a | 0;
 b = b | 0;
 a = a + 116 | 0;
 if (_a(a) >>> 0 > b >>> 0) {
  a = p[Qa(a, b) >> 2];
 } else {
  a = 0;
 }
 return a | 0;
}
function dm(a) {
 var b = 0, c = 0;
 b = a + 88 | 0;
 c = p[a + 116 >> 2];
 if (c) {
  fd(b, c + 88 | 0, a - -64 | 0);
  return;
 }
 Kr(b, a - -64 | 0);
}
function bh(a, b) {
 a = a | 0;
 b = b | 0;
 a = a + 104 | 0;
 if (_a(a) >>> 0 > b >>> 0) {
  a = p[Qa(a, b) >> 2];
 } else {
  a = 0;
 }
 return a | 0;
}
function Mr(a, b) {
 p[a >> 2] = p[b >> 2];
 p[a + 4 >> 2] = p[b + 4 >> 2];
 p[a + 8 >> 2] = p[b + 8 >> 2];
 p[a + 12 >> 2] = p[b + 12 >> 2];
 return a;
}
function Iv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17079;
 O(22609, p[a + 12 >> 2], 4, -2147483648, 2147483647);
 sa = a + 16 | 0;
}
function Gv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17096;
 O(22642, p[a + 12 >> 2], 4, -2147483648, 2147483647);
 sa = a + 16 | 0;
}
function Fs(a, b) {
 a = a | 0;
 b = b | 0;
 zd(a, b);
 if (Ff(p[a + 20 >> 2])) {
  Gs(p[a + 20 >> 2], a);
  a = 0;
 } else {
  a = 1;
 }
 return a | 0;
}
function xd(a, b, c) {
 c = w(w(w(b >>> 0) * c) + w(w(w(1) - c) * w(a >>> 0)));
 if (c < w(4294967296) & c >= w(0)) {
  return ~~c >>> 0;
 }
 return 0;
}
function av(a) {
 var b = 0;
 if (a >>> 0 >= 11) {
  b = a + 16 & -16;
  a = b + -1 | 0;
  a = (a | 0) == 11 ? b : a;
 } else {
  a = 10;
 }
 return a;
}
function ci(a, b, c) {
 a = a | 0;
 b = w(b);
 c = w(c);
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 Lc(a + 4 | 0, fb(d + 8 | 0, b, c));
 sa = d + 16 | 0;
}
function aj(a, b) {
 a = a | 0;
 b = b | 0;
 a = a + 4 | 0;
 if (_a(a) >>> 0 > b >>> 0) {
  a = p[Qa(a, b) >> 2];
 } else {
  a = 0;
 }
 return a | 0;
}
function xv(a) {
 a = a | 0;
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 p[b + 12 >> 2] = a;
 a = p[b + 12 >> 2];
 Yj();
 sa = b + 16 | 0;
 return a | 0;
}
function rg(a) {
 a = a | 0;
 var b = 0;
 p[a >> 2] = 13576;
 b = p[a + 48 >> 2];
 if (b) {
  m[p[p[b >> 2] + 44 >> 2]](b);
 }
 jb(a);
 return a | 0;
}
function $p(a, b) {
 a = a | 0;
 b = b | 0;
 a : {
  if (!qb(b, 64)) {
   break a;
  }
  a = p[a + 132 >> 2];
  if (!a) {
   break a;
  }
  sh(a);
 }
}
function Vh(a) {
 a = a | 0;
 var b = 0;
 p[a >> 2] = 5160;
 b = p[a + 104 >> 2];
 if (b) {
  m[p[p[b >> 2] + 4 >> 2]](b);
 }
 ef(a);
 return a | 0;
}
function Fw(a, b, c, d, e, f, g) {
 var h = 0;
 h = sa - 48 | 0;
 sa = h;
 L(Ew() | 0, a | 0, 14193, Cw(h, b, c, d, e, f, g) | 0);
 sa = h + 48 | 0;
}
function wu(a, b, c, d, e, f, g) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 g = g | 0;
 m[a | 0](b, c, d, e, f, g);
}
function mu(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 a = m[a | 0](b, c, d, e) | 0;
 ba(ta | 0);
 return a | 0;
}
function oi(a) {
 pf(a);
 p[a + 128 >> 2] = 0;
 p[a >> 2] = 4528;
 p[a + 132 >> 2] = 0;
 p[a + 136 >> 2] = 0;
 p[a >> 2] = 5500;
 $a(a + 140 | 0);
}
function Zn(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c >> 2] = b;
 p[c + 8 >> 2] = a;
 a = He(c, c + 8 | 0);
 sa = c + 16 | 0;
 return a;
}
function Sp(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 p[a >> 2] = 0;
 p[a + 4 >> 2] = 0;
 p[b + 12 >> 2] = 0;
 Ee(a + 8 | 0);
 sa = b + 16 | 0;
}
function Ku(a, b, c, d, e, f, g) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = w(e);
 f = f | 0;
 g = w(g);
 m[a | 0](b, c, d, e, f, g);
}
function Kc(a, b) {
 a = a | 0;
 b = b | 0;
 we(a, b);
 if (qb(b, 8)) {
  Zp(p[a + 136 >> 2], m[p[p[a >> 2] + 100 >> 2]](a) | 0, a + 140 | 0);
 }
}
function Ce(a) {
 Pb(a);
 p[a + 12 >> 2] = -1;
 p[a + 4 >> 2] = 0;
 p[a + 8 >> 2] = 0;
 p[a >> 2] = 9172;
 p[a + 16 >> 2] = 0;
 p[a >> 2] = 1312;
}
function An(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 p[b + 8 >> 2] = p[a + 4 >> 2];
 a = p[Bg(b + 8 | 0) >> 2];
 sa = b + 16 | 0;
 return a;
}
function uu(a, b, c, d, e, f, g) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 e = w(e);
 f = w(f);
 g = w(g);
 m[a | 0](b, c, d, e, f, g);
}
function Qi(a) {
 a = a | 0;
 var b = 0;
 p[a >> 2] = 2940;
 b = p[a + 108 >> 2];
 if (b) {
  Ua(b);
 }
 db(a + 96 | 0);
 jb(a);
 return a | 0;
}
function Lm(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 | 0;
 if ((a & 65535) >>> 0 <= 14) {
  return 18435 >>> (a & 32767) & 1;
 }
 return 0;
}
function Lg(a) {
 ni(a);
 p[a >> 2] = 11748;
 p[a >> 2] = 11660;
 p[a + 120 >> 2] = 0;
 p[a >> 2] = 11568;
 p[a >> 2] = 2632;
 $a(a + 124 | 0);
}
function uh(a) {
 a = a | 0;
 p[a >> 2] = 6300;
 jb(a + 364 | 0);
 jb(a + 300 | 0);
 jb(a + 236 | 0);
 jb(a + 172 | 0);
 nc(a);
 return a | 0;
}
function tn(a) {
 Ig(a);
 p[a >> 2] = 9476;
 p[a >> 2] = 2176;
 $a(a + 16 | 0);
 p[a + 36 >> 2] = 0;
 p[a + 28 >> 2] = 0;
 p[a + 32 >> 2] = 0;
}
function pi(a) {
 a = a | 0;
 p[a >> 2] = 4144;
 jb(a + 456 | 0);
 jb(a + 360 | 0);
 jb(a + 264 | 0);
 jb(a + 168 | 0);
 nc(a);
 return a | 0;
}
function gk(a, b, c, d) {
 var e = 0, f = 0;
 e = a;
 f = b;
 if (c != w(1)) {
  d = w(w(c * d) + w(w(w(1) - c) * Ww(a, b)));
 }
 Nw(e, f, d);
}
function Kv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17058;
 O(22641, p[a + 12 >> 2], 2, -32768, 32767);
 sa = a + 16 | 0;
}
function zm(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 | 0;
 if ((a & 65535) >>> 0 <= 11) {
  return 3075 >>> (a & 4095) & 1;
 }
 return 0;
}
function ji(a) {
 var b = w(0);
 a : {
  if (a < w(0)) {
   break a;
  }
  b = w(1);
  if (a > w(1)) {
   break a;
  }
  b = a;
 }
 return b;
}
function iq(a, b, c, d) {
 a = c - b | 0;
 c = p[d >> 2] + v((a | 0) / -3 | 0, 3) | 0;
 p[d >> 2] = c;
 if ((a | 0) >= 1) {
  Qb(c, b, a);
 }
}
function Rv(a) {
 var b = 0, c = 0, d = 0;
 b = de(md(a) + 4 | 0);
 c = b, d = md(a), p[c >> 2] = d;
 Qb(b + 4 | 0, Nc(a), md(a));
 return b;
}
function Qm(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 | 0;
 if ((a & 65535) >>> 0 <= 12) {
  return 4099 >>> (a & 8191) & 1;
 }
 return 0;
}
function Nm(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 | 0;
 if ((a & 65535) >>> 0 <= 12) {
  return 4227 >>> (a & 8191) & 1;
 }
 return 0;
}
function Im(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 | 0;
 if ((a & 65535) >>> 0 <= 11) {
  return 2051 >>> (a & 4095) & 1;
 }
 return 0;
}
function ro(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -1 | 0;
 if ((a & 65535) >>> 0 <= 10) {
  return 1537 >>> (a & 2047) & 1;
 }
 return 0;
}
function Xv(a, b, c, d, e, f) {
 var g = 0;
 g = sa - 32 | 0;
 sa = g;
 L(Wv() | 0, a | 0, b | 0, Vv(g, c, d, e, f) | 0);
 sa = g + 32 | 0;
}
function lm(a, b) {
 var c = 0;
 c = sa - 32 | 0;
 sa = c;
 ye(gb(c + 24 | 0, b));
 km(c + 8 | 0, a, b);
 Bd(c + 8 | 0);
 sa = c + 32 | 0;
}
function Yt(a, b) {
 a = a | 0;
 b = b | 0;
 b = Db(b, 1);
 if (b) {
  Eo(p[b + 4 >> 2], a);
  a = 0;
 } else {
  a = 1;
 }
 return a | 0;
}
function Wp(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -5 | 0;
 if ((a & 65535) >>> 0 <= 9) {
  return 609 >>> (a & 1023) & 1;
 }
 return 0;
}
function Nv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17027;
 O(22638, p[a + 12 >> 2], 1, -128, 127);
 sa = a + 16 | 0;
}
function Mv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17032;
 O(22639, p[a + 12 >> 2], 1, -128, 127);
 sa = a + 16 | 0;
}
function It(a, b) {
 a = a | 0;
 b = b | 0;
 b = Db(b, 1);
 if (b) {
  Do(p[b + 4 >> 2], a);
  a = 0;
 } else {
  a = 1;
 }
 return a | 0;
}
function jn(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -60 | 0;
 if ((a & 65535) >>> 0 <= 6) {
  return 67 >>> (a & 127) & 1;
 }
 return 0;
}
function Zm(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -60 | 0;
 if ((a & 65535) >>> 0 <= 6) {
  return 73 >>> (a & 127) & 1;
 }
 return 0;
}
function Vm(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -60 | 0;
 if ((a & 65535) >>> 0 <= 6) {
  return 81 >>> (a & 127) & 1;
 }
 return 0;
}
function Qp(a, b, c, d) {
 var e = 0;
 e = sa - 16 | 0;
 sa = e;
 d = Md(e, a, d);
 Hh(Ra(a), b, c, d + 4 | 0);
 Ub(d);
 sa = e + 16 | 0;
}
function Jv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17064;
 O(22616, p[a + 12 >> 2], 2, 0, 65535);
 sa = a + 16 | 0;
}
function $m(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -60 | 0;
 if ((a & 65535) >>> 0 <= 6) {
  return 69 >>> (a & 127) & 1;
 }
 return 0;
}
function vh(a, b, c) {
 var d = 0;
 p[a >> 2] = p[b >> 2];
 d = p[b >> 2];
 p[a + 8 >> 2] = b;
 p[a + 4 >> 2] = (c << 2) + d;
 return a;
}
function fq(a, b, c) {
 var d = 0;
 p[a >> 2] = p[b >> 2];
 d = p[b >> 2];
 p[a + 8 >> 2] = b;
 p[a + 4 >> 2] = (c << 3) + d;
 return a;
}
function dw(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = a;
 Cb(c + 12 | 0, t[b >> 2]);
 sa = c + 16 | 0;
 return a;
}
function Xm(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -54 | 0;
 if ((a & 65535) >>> 0 <= 4) {
  return 19 >>> (a & 31) & 1;
 }
 return 0;
}
function Uq(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 | 0;
 if ((a & 65535) >>> 0 <= 4) {
  return 19 >>> (a & 31) & 1;
 }
 return 0;
}
function Tm(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -54 | 0;
 if ((a & 65535) >>> 0 <= 5) {
  return 35 >>> (a & 63) & 1;
 }
 return 0;
}
function Ms(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -67 | 0;
 if ((a & 65535) >>> 0 <= 3) {
  return 13 >>> (a & 15) & 1;
 }
 return 0;
}
function Cc(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = a;
 ic(c + 12 | 0, p[b >> 2]);
 sa = c + 16 | 0;
 return a;
}
function Lv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17044;
 O(22640, p[a + 12 >> 2], 1, 0, 255);
 sa = a + 16 | 0;
}
function Hv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17083;
 O(22407, p[a + 12 >> 2], 4, 0, -1);
 sa = a + 16 | 0;
}
function Fv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17101;
 O(22585, p[a + 12 >> 2], 4, 0, -1);
 sa = a + 16 | 0;
}
function Yd(a) {
 var b = w(0), c = w(0);
 b = t[Ja(a, 0) >> 2];
 c = w(b * b);
 b = t[Ja(a, 1) >> 2];
 return w(D(w(c + w(b * b))));
}
function zs(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 & 65535;
 if (a >>> 0 <= 30) {
  return 1879048195 >>> a & 1;
 }
 return 0;
}
function ts(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 & 65535;
 if (a >>> 0 <= 31) {
  return -268435453 >>> a & 1;
 }
 return 0;
}
function rx(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = a;
 ic(c + 12 | 0, jk(b));
 sa = c + 16 | 0;
 return a;
}
function cx(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = a;
 ic(c + 12 | 0, fk(b));
 sa = c + 16 | 0;
 return a;
}
function Wl(a, b) {
 a = a | 0;
 b = b | 0;
 b = Gb(a, b);
 if (!b) {
  return qg(a + 68 | 0, p[a + 20 >> 2]) ^ 1;
 }
 return b | 0;
}
function Ex() {
 var a = 0;
 a = La(16);
 p[a >> 2] = 0;
 p[a + 4 >> 2] = 0;
 p[a + 8 >> 2] = 0;
 p[a + 12 >> 2] = 0;
 return a | 0;
}
function tm(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 & 65535;
 if (a >>> 0 <= 29) {
  return 805306371 >>> a & 1;
 }
 return 0;
}
function sr(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -6 & 65535;
 if (a >>> 0 <= 30) {
  return 1073742129 >>> a & 1;
 }
 return 0;
}
function or(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 & 65535;
 if (a >>> 0 <= 26) {
  return 100663315 >>> a & 1;
 }
 return 0;
}
function Yq(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 & 65535;
 if (a >>> 0 <= 28) {
  return 268435459 >>> a & 1;
 }
 return 0;
}
function xr(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 & 65535;
 if (a >>> 0 <= 26) {
  return 83886099 >>> a & 1;
 }
 return 0;
}
function mo(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 p[b + 12 >> 2] = 0;
 Le(a, b + 12 | 0);
 lo(a + 4 | 0);
 sa = b + 16 | 0;
}
function kr(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -10 & 65535;
 if (a >>> 0 <= 26) {
  return 67108883 >>> a & 1;
 }
 return 0;
}
function ux(a, b, c) {
 var d = 0;
 p[a >> 2] = p[b >> 2];
 d = p[b >> 2];
 p[a + 8 >> 2] = b;
 p[a + 4 >> 2] = c + d;
 return a;
}
function ee(a, b) {
 a = a | 0;
 b = w(b);
 if (t[a + 120 >> 2] != b) {
  t[a + 120 >> 2] = b;
  m[p[p[a >> 2] + 80 >> 2]](a);
 }
}
function Zt(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 yb(a + 44 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}



function Wc(a) {
 var b = 0, c = 0;
 ko(a, p[a + 8 >> 2]);
 c = a;
 b = p[a >> 2];
 p[a >> 2] = 0;
 if (b) {
  ib(c);
  Ua(b);
 }
}
function Ts(a, b) {
 a = a | 0;
 b = b | 0;
 a = b + -67 | 0;
 if ((a & 65535) >>> 0 <= 4) {
  return !(a & 1) | 0;
 }
 return 0;
}
function Nj(a, b) {
 a = a | 0;
 b = w(b);
 if (t[a + 124 >> 2] != b) {
  t[a + 124 >> 2] = b;
  m[p[p[a >> 2] + 84 >> 2]](a);
 }
}
function Ij(a, b) {
 a = a | 0;
 b = w(b);
 if (t[a + 136 >> 2] != b) {
  t[a + 136 >> 2] = b;
  m[p[p[a >> 2] + 84 >> 2]](a);
 }
}
function Gj(a, b) {
 a = a | 0;
 b = w(b);
 if (t[a + 140 >> 2] != b) {
  t[a + 140 >> 2] = b;
  m[p[p[a >> 2] + 88 >> 2]](a);
 }
}
function Eu(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 f = f | 0;
 m[a | 0](b, c, d, e, f);
}
function Eq(a, b, c) {
 a = a | 0;
 b = w(b);
 c = w(c);
 ci(a, b, c);
 a = p[a + 104 >> 2];
 m[p[p[a >> 2] + 20 >> 2]](a, b, c);
}
function Dq(a, b, c) {
 a = a | 0;
 b = w(b);
 c = w(c);
 bi(a, b, c);
 a = p[a + 104 >> 2];
 m[p[p[a >> 2] + 24 >> 2]](a, b, c);
}
function ku(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 e = e | 0;
 f = w(f);
 zj(b, c, p[a + 24 >> 2]);
}
function zv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17744;
 N(22651, 6, p[a + 12 >> 2]);
 sa = a + 16 | 0;
}
function yv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17775;
 N(22652, 7, p[a + 12 >> 2]);
 sa = a + 16 | 0;
}
function ru(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = w(e);
 f = w(f);
 m[a | 0](b, c, d, e, f);
}
function mp(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 yb(a + 236 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function gm(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 a = p[gb(b + 8 | 0, p[a + 8 >> 2]) >> 2];
 sa = b + 16 | 0;
 return a;
}
function Xj(a, b) {
 a = a | 0;
 b = w(b);
 if (t[a + 56 >> 2] != b) {
  t[a + 56 >> 2] = b;
  m[p[p[a >> 2] + 60 >> 2]](a);
 }
}
function Qn(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 yb(a + 136 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function Oh(a, b, c) {
 a = q[c | 0] | q[c + 1 | 0] << 8;
 n[b | 0] = a;
 n[b + 1 | 0] = a >>> 8;
 n[b + 2 | 0] = q[c + 2 | 0];
}
function Jb(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 ac(a + 140 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function Iw(a, b, c, d) {
 var e = 0;
 e = sa - 16 | 0;
 sa = e;
 L(Hw() | 0, a | 0, b | 0, Gw(e, c, d) | 0);
 sa = e + 16 | 0;
}
function Gs(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 yb(a + 124 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function Ev() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17115;
 W(22470, p[a + 12 >> 2], 4);
 sa = a + 16 | 0;
}
function Eo(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 ac(a + 104 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function Dv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17121;
 W(22589, p[a + 12 >> 2], 8);
 sa = a + 16 | 0;
}
function Do(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 ac(a + 116 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function Cv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17232;
 N(22643, 0, p[a + 12 >> 2]);
 sa = a + 16 | 0;
}
function Bv() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17476;
 N(22649, 4, p[a + 12 >> 2]);
 sa = a + 16 | 0;
}
function Bb(a, b) {
 a = a | 0;
 b = w(b);
 if (t[a + 48 >> 2] != b) {
  t[a + 48 >> 2] = b;
  m[p[p[a >> 2] + 52 >> 2]](a);
 }
}
function Av() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 p[a + 12 >> 2] = 17506;
 N(22650, 5, p[a + 12 >> 2]);
 sa = a + 16 | 0;
}
function Ab(a, b) {
 a = a | 0;
 b = w(b);
 if (t[a + 52 >> 2] != b) {
  t[a + 52 >> 2] = b;
  m[p[p[a >> 2] + 56 >> 2]](a);
 }
}
function pk(a, b) {
 a = a | 0;
 b = b | 0;
 b = Db(b, 1);
 if (b) {
  Hi(b, a);
  a = 0;
 } else {
  a = 1;
 }
 return a | 0;
}
function ks(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 yb(a + 96 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function jw(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 L(iw() | 0, a | 0, 14493, Cc(c + 8 | 0, b) | 0);
 sa = c + 16 | 0;
}
function jj(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 yb(a + 16 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function ij(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 yb(a + 28 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function hw(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 L(gw() | 0, a | 0, 14464, Cc(c + 8 | 0, b) | 0);
 sa = c + 16 | 0;
}
function fw(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 L(ew() | 0, a | 0, 14499, dw(c + 8 | 0, b) | 0);
 sa = c + 16 | 0;
}
function ex(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 L(dx() | 0, a | 0, 14095, cx(c + 8 | 0, b) | 0);
 sa = c + 16 | 0;
}
function cw(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 L(bw() | 0, a | 0, 14509, Cc(c + 8 | 0, b) | 0);
 sa = c + 16 | 0;
}
function bl(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 L(sx() | 0, a | 0, 14064, rx(c + 8 | 0, b) | 0);
 sa = c + 16 | 0;
}
function at(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 yb(a + 24 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function _w(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 L(Zw() | 0, a | 0, 14114, Cc(c + 8 | 0, b) | 0);
 sa = c + 16 | 0;
}
function Zv(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 L(Yv() | 0, a | 0, 14518, Cc(c + 8 | 0, b) | 0);
 sa = c + 16 | 0;
}
function Ul(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 yb(a + 80 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function Tb(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 ac(a + 24 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function Kw(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 L(Jw() | 0, a | 0, 14170, Cc(c + 8 | 0, b) | 0);
 sa = c + 16 | 0;
}
function Fo(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 ac(a + 92 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function Dg(a) {
 rc(a);
 n[a + 46 | 0] = 1;
 p[a >> 2] = 10604;
 p[a + 48 >> 2] = 0;
 p[a + 52 >> 2] = 0;
 p[a >> 2] = 13576;
}
function $v(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 L(_v() | 0, a | 0, 14514, Cc(c + 8 | 0, b) | 0);
 sa = c + 16 | 0;
}
function uj(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 yb(a + 4 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function ou(a, b, c, d, e, f) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 d = w(d);
 e = w(e);
 f = w(f);
 m[a | 0](b, c, d, e, f);
}
function on(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 a = p[gb(c + 8 | 0, pm(a, b)) >> 2];
 sa = c + 16 | 0;
 return a;
}
function li(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 yb(a + 8 | 0, c + 12 | 0);
 sa = c + 16 | 0;
}
function ki(a) {
 rc(a);
 p[a + 48 >> 2] = 0;
 p[a + 52 >> 2] = 0;
 p[a >> 2] = 5092;
 p[a + 56 >> 2] = 0;
 p[a >> 2] = 5816;
}
function ip(a, b) {
 a = a | 0;
 b = b | 0;
 var c = 0;
 c = Gb(a, b);
 if (!c) {
  c = Gb(a + 176 | 0, b);
 }
 return c | 0;
}
function Jo(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 a = p[gb(c + 8 | 0, Ho(a, b)) >> 2];
 sa = c + 16 | 0;
 return a;
}
function Bj(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 a = p[gb(c + 8 | 0, ej(a, b)) >> 2];
 sa = c + 16 | 0;
 return a;
}
function qh(a) {
 a = a | 0;
 p[a >> 2] = 6564;
 db(a + 236 | 0);
 Ye(a + 176 | 0);
 ph(a + 160 | 0);
 oh(a);
 return a | 0;
}
function mh(a) {
 a = a | 0;
 p[a >> 2] = 7548;
 jb(a + 296 | 0);
 jb(a + 232 | 0);
 jb(a + 168 | 0);
 nc(a);
 return a | 0;
}
function bx(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 L(ax() | 0, a | 0, 14105, $w(d, b, c) | 0);
 sa = d + 16 | 0;
}
function Wj(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 p[b + 12 >> 2] = a;
 N(22644, 0, p[b + 12 >> 2]);
 sa = b + 16 | 0;
}
function Vj(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 p[b + 12 >> 2] = a;
 N(22408, 1, p[b + 12 >> 2]);
 sa = b + 16 | 0;
}
function Uv(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 L(Tv() | 0, a | 0, 14558, Sv(d, b, c) | 0);
 sa = d + 16 | 0;
}
function Uj(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 p[b + 12 >> 2] = a;
 N(22645, 2, p[b + 12 >> 2]);
 sa = b + 16 | 0;
}
function Tj(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 p[b + 12 >> 2] = a;
 N(22646, 3, p[b + 12 >> 2]);
 sa = b + 16 | 0;
}
function Sj(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 p[b + 12 >> 2] = a;
 N(22647, 4, p[b + 12 >> 2]);
 sa = b + 16 | 0;
}
function Rj(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 p[b + 12 >> 2] = a;
 N(22648, 5, p[b + 12 >> 2]);
 sa = b + 16 | 0;
}
function Pc() {
 var a = 0, b = 0;
 a = sa - 16 | 0;
 sa = a;
 b = gb(a + 8 | 0, vc());
 sa = a + 16 | 0;
 return p[b >> 2];
}
function Mg(a) {
 Wb(a);
 p[a + 48 >> 2] = 255;
 p[a + 52 >> 2] = 1;
 p[a >> 2] = 11500;
 p[a >> 2] = 3180;
 hb(a + 56 | 0);
}
function Bw(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 L(Aw() | 0, a | 0, 14162, zw(d, b, c) | 0);
 sa = d + 16 | 0;
}
function hj(a, b) {
 a = a + 28 | 0;
 if (_a(a) >>> 0 > b >>> 0) {
  a = p[Qa(a, b) >> 2];
 } else {
  a = 0;
 }
 return a;
}
function gx(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 L(fx() | 0, a | 0, b | 0, mk(c + 8 | 0) | 0);
 sa = c + 16 | 0;
}
function nt(a, b) {
 a = a | 0;
 b = b | 0;
 return (s[a + 8 >> 2] > b >>> 0 ? p[p[a + 12 >> 2] + (b << 2) >> 2] : 0) | 0;
}
function Va(a) {
 var b = 0, c = 0;
 b = La(8);
 c = p[a + 4 >> 2];
 p[b >> 2] = p[a >> 2];
 p[b + 4 >> 2] = c;
 return b;
}
function Mh(a) {
 a = a | 0;
 var b = 0, c = 0;
 xe(a);
 b = a, c = Yc(p[a + 132 >> 2] + 160 | 0, 0), p[b + 136 >> 2] = c;
}
function vc() {
 var a = 0, b = 0;
 a = sa - 16 | 0;
 sa = a;
 b = gb(a + 8 | 0, 0);
 sa = a + 16 | 0;
 return p[b >> 2];
}
function ok(a, b, c, d) {
 var e = 0, f = 0;
 e = a;
 f = b;
 if (c != w(1)) {
  d = vg(Ky(a, b), d, c);
 }
 zy(e, f, d);
}
function cf(a, b, c) {
 p[a >> 2] = b;
 b = p[b + 4 >> 2];
 p[a + 4 >> 2] = b;
 p[a + 8 >> 2] = b + (c << 3);
 return a;
}
function Sf(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 p[d + 12 >> 2] = c;
 Oj(a, b, c, 0, 0);
 sa = d + 16 | 0;
}
function Md(a, b, c) {
 p[a >> 2] = b;
 b = p[b + 4 >> 2];
 p[a + 4 >> 2] = b;
 p[a + 8 >> 2] = b + (c << 2);
 return a;
}
function Gd(a, b, c, d) {
 a = c - b | 0;
 c = p[d >> 2] - a | 0;
 p[d >> 2] = c;
 if ((a | 0) >= 1) {
  Qb(c, b, a);
 }
}
function vn(a) {
 a = a | 0;
 a = a + 4 | 0;
 if (lf(a)) {
  a = 0;
 } else {
  a = p[Qa(a, 0) >> 2];
 }
 return a | 0;
}
function tx(a, b) {
 p[p[a >> 2] >> 2] = p[b >> 2];
 p[p[a >> 2] + 4 >> 2] = p[b + 4 >> 2];
 p[a >> 2] = p[a >> 2] + 8;
}
function qq(a, b) {
 a = a | 0;
 b = b | 0;
 b = Db(b, 31);
 if (!b) {
  return 1;
 }
 Zt(p[b + 4 >> 2], a);
 return 0;
}
function ne(a, b) {
 a = a | 0;
 b = b | 0;
 p[a + 52 >> 2] = b;
 b = a;
 a = nl();
 p[b + 48 >> 2] = a;
 return a | 0;
}
function ht(a, b) {
 a = a | 0;
 b = b | 0;
 b = Db(b, 53);
 if (!b) {
  return 1;
 }
 jj(p[b + 4 >> 2], a);
 return 0;
}
function hk(a) {
 a = a | 0;
 p[a >> 2] = 15748;
 if (q[a + 4 | 0]) {
  hc(a, 15812);
 }
 Eb(a + 8 | 0);
 return a | 0;
}
function dk(a) {
 a = a | 0;
 p[a >> 2] = 16072;
 if (q[a + 4 | 0]) {
  hc(a, 15812);
 }
 Eb(a + 8 | 0);
 return a | 0;
}
function bt(a, b) {
 a = a | 0;
 b = b | 0;
 b = Db(b, 60);
 if (!b) {
  return 1;
 }
 uj(p[b + 4 >> 2], a);
 return 0;
}
function Rl(a, b) {
 a = a | 0;
 b = b | 0;
 b = Db(b, 25);
 if (!b) {
  return 1;
 }
 li(p[b + 4 >> 2], a);
 return 0;
}
function Og(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 a = p[gb(b + 8 | 0, gm(a)) >> 2];
 sa = b + 16 | 0;
 return a;
}
function Et(a, b) {
 a = a | 0;
 b = b | 0;
 b = Db(b, 53);
 if (!b) {
  return 1;
 }
 ij(p[b + 4 >> 2], a);
 return 0;
}
function Bo(a, b) {
 Id(a + 44 | 0, 2);
 if (s[b + 36 >> 2] < s[a + 164 >> 2]) {
  p[a + 164 >> 2] = p[b + 36 >> 2];
 }
}
function $j(a) {
 a = a | 0;
 p[a >> 2] = 16464;
 if (q[a + 4 | 0]) {
  hc(a, 15812);
 }
 Eb(a + 8 | 0);
 return a | 0;
}
function vg(a, b, c) {
 return xg(xd(se(a), se(b), c), xd(ve(a), ve(b), c), xd(ue(a), ue(b), c), xd(te(a), te(b), c));
}
function nf(a) {
 ki(a);
 p[a >> 2] = 5020;
 o[a + 60 >> 1] = 0;
 p[a >> 2] = 4064;
 hb(a - -64 | 0);
 hb(a + 72 | 0);
}
function ko(a, b) {
 Ra(a);
 while (1) {
  if (b) {
   a = p[b >> 2];
   Ua(b);
   b = a;
   continue;
  }
  break;
 }
}
function Vw(a, b) {
 p[a >> 2] = 0;
 Wh(a);
 p[a >> 2] = 16124;
 qd(a + 4 | 0);
 p[a >> 2] = 16072;
 Wf(a + 8 | 0, b);
}
function Tp(a, b) {
 p[a >> 2] = 3560;
 p[a >> 2] = 2724;
 bv(a + 4 | 0, b + 4 | 0);
 p[a + 16 >> 2] = p[b + 16 >> 2];
}
function Jp(a) {
 a = a | 0;
 var b = 0;
 b = a + 156 | 0;
 if (p[b + 4 >> 2]) {
  Fb(p[b + 4 >> 2], 8, 0);
 }
 Kh(a);
}
function Bd(a) {
 var b = 0;
 b = p[a >> 2];
 p[a >> 2] = 0;
 if (b) {
  q[ib(a) + 4 | 0];
  if (b) {
   Ua(b);
  }
 }
}
function mt(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 d = cj(b, a);
 sa = c + 16 | 0;
 return d ? b : a;
}
function lt(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 d = cj(a, b);
 sa = c + 16 | 0;
 return d ? b : a;
}
function Sn(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 d = Ge(a, b);
 sa = c + 16 | 0;
 return d ? b : a;
}
function Of(a, b, c) {
 a : {
  if (p[c + 76 >> 2] <= -1) {
   a = Pf(a, b, c);
   break a;
  }
  a = Pf(a, b, c);
 }
}
function In(a, b) {
 var c = 0, d = 0;
 c = sa - 16 | 0;
 sa = c;
 d = Ge(b, a);
 sa = c + 16 | 0;
 return d ? b : a;
}
function Hh(a, b, c, d) {
 a = c - b | 0;
 if ((a | 0) >= 1) {
  Qb(p[d >> 2], b, a);
  p[d >> 2] = p[d >> 2] + a;
 }
}
function si(a) {
 if (!q[a + 60 | 0]) {
  m[p[p[a >> 2] + 64 >> 2]](a);
  n[a + 60 | 0] = 1;
 }
 return a - -64 | 0;
}
function Il(a, b) {
 a = a | 0;
 b = b | 0;
 b = bp(p[a + 20 >> 2]);
 if (!b) {
  return 1;
 }
 uj(b, a);
 return 0;
}
function ri(a) {
 if (!q[a + 61 | 0]) {
  m[p[p[a >> 2] + 68 >> 2]](a);
  n[a + 61 | 0] = 1;
 }
 return a + 72 | 0;
}
function Xs(a, b) {
 a = a | 0;
 b = b | 0;
 if (!b) {
  return 1;
 }
 return m[p[p[b >> 2] + 12 >> 2]](b, 59) | 0;
}
function Vd(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 a = p[gb(b + 8 | 0, a) >> 2];
 sa = b + 16 | 0;
 return a;
}
function Ps(a, b) {
 a = a | 0;
 b = b | 0;
 if (!b) {
  return 1;
 }
 return m[p[p[b >> 2] + 12 >> 2]](b, 56) | 0;
}
function Oe(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 Jg(b + 8 | 0, a);
 sa = b + 16 | 0;
 return p[b + 8 >> 2];
}
function Mp(a) {
 a = a | 0;
 var b = 0;
 Mh(a);
 b = a + 156 | 0;
 if (p[b + 4 >> 2]) {
  Tb(p[b + 4 >> 2], a);
 }
}
function Ks(a, b) {
 a = a | 0;
 b = b | 0;
 if (!b) {
  return 1;
 }
 return m[p[p[b >> 2] + 12 >> 2]](b, 58) | 0;
}
function Ke(a, b) {
 a = sa - 16 | 0;
 sa = a;
 p[a + 8 >> 2] = b;
 b = jo(a + 8 | 0);
 sa = a + 16 | 0;
 return b;
}
function $b(a, b) {
 if (uf(b)) {
  Kb(a, Eh(p[b + 56 >> 2]));
  return;
 }
 fb(a, t[b + 48 >> 2], t[b + 52 >> 2]);
}
function lo(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 p[b + 12 >> 2] = 0;
 Me(a, b + 12 | 0);
 sa = b + 16 | 0;
}
function jv(a) {
 var b = 0, c = 0;
 b = Cj(a) + 1 | 0;
 c = de(b);
 if (!c) {
  return 0;
 }
 return Qb(c, a, b);
}
function Zy(a) {
 var b = 0;
 b = a & 31;
 a = 0 - a & 31;
 return (-1 >>> b & -2) << b | (-1 << a & -2) >>> a;
}



function Zr(a, b, c) {
 p[a + 12 >> 2] = c;
 n[a + 8 | 0] = 0;
 p[a >> 2] = b;
 p[a + 4 >> 2] = b + c;
 return a;
}
function Jh(a, b) {
 Yp(a, b);
 p[a >> 2] = 5612;
 p[a + 60 >> 2] = p[b + 60 >> 2];
 p[a >> 2] = 7472;
 return a;
}
function Ae(a) {
 a = a | 0;
 p[a + 68 >> 2] = 13396;
 p[a >> 2] = 13308;
 db(a + 80 | 0);
 jb(a);
 return a | 0;
}
function vj(a, b) {
 if (p[a + 128 >> 2] != (b | 0)) {
  p[a + 128 >> 2] = b;
  m[p[p[a >> 2] + 88 >> 2]](a);
 }
}
function xu(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = e | 0;
 m[a | 0](b, c, d, e);
}
function Fj(a, b) {
 p[a + 12 >> 2] = 0;
 p[a + 4 >> 2] = b;
 p[a >> 2] = b;
 p[a + 8 >> 2] = b + 1;
 return a;
}
function $k() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 qa(14068, 2, 15504, 15512, 878, 726);
 sa = a + 16 | 0;
}
function yj(a, b) {
 if (p[a + 16 >> 2] != (b | 0)) {
  p[a + 16 >> 2] = b;
  m[p[p[a >> 2] + 36 >> 2]](a);
 }
}
function xw(a, b) {
 p[a >> 2] = 0;
 p[a >> 2] = 16520;
 qd(a + 4 | 0);
 p[a >> 2] = 16464;
 Wf(a + 8 | 0, b);
}
function wj(a, b) {
 if (p[a + 12 >> 2] != (b | 0)) {
  p[a + 12 >> 2] = b;
  m[p[p[a >> 2] + 40 >> 2]](a);
 }
}
function ox(a, b) {
 p[a >> 2] = 0;
 p[a >> 2] = 15784;
 qd(a + 4 | 0);
 p[a >> 2] = 15748;
 Wf(a + 8 | 0, b);
}
function lk(a, b) {
 if (p[a + 24 >> 2] != (b | 0)) {
  p[a + 24 >> 2] = b;
  m[p[p[a >> 2] + 52 >> 2]](a);
 }
}
function jy() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 Y(22610, 2, 16876, 15512, 934, 831);
 sa = a + 16 | 0;
}
function df(a) {
 var b = 0;
 _e(a);
 if (p[a >> 2]) {
  hi(a);
  Ra(a);
  b = p[a >> 2];
  pc(a);
  Ua(b);
 }
}
function db(a) {
 var b = 0;
 sf(a);
 if (p[a >> 2]) {
  Fh(a);
  Ra(a);
  b = p[a >> 2];
  mc(a);
  Ua(b);
 }
}
function Zf(a, b) {
 if (p[a + 48 >> 2] != (b | 0)) {
  p[a + 48 >> 2] = b;
  m[p[p[a >> 2] + 52 >> 2]](a);
 }
}
function Mx() {
 var a = 0;
 a = sa - 16 | 0;
 sa = a;
 Y(22628, 2, 16960, 15512, 949, 867);
 sa = a + 16 | 0;
}
function Lu(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 e = w(e);
 m[a | 0](b, c, d, e);
}
function zu(a, b, c, d, e) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 e = w(e);
 m[a | 0](b, c, d, e);
}
function yt(a, b) {
 a = a | 0;
 b = b | 0;
 if (q[a + 12 | 0] != (b | 0)) {
  n[a + 12 | 0] = b;
  Hf(a);
 }
}
function zl(a) {
 a = a | 0;
 var b = 0;
 b = p[a + 48 >> 2];
 m[p[p[b >> 2] + 16 >> 2]](b, p[a + 60 >> 2]);
}
function yl(a) {
 a = a | 0;
 var b = 0;
 b = p[a + 48 >> 2];
 m[p[p[b >> 2] + 12 >> 2]](b, p[a + 64 >> 2]);
}
function xj(a, b) {
 if (p[a + 8 >> 2] != (b | 0)) {
  p[a + 8 >> 2] = b;
  m[p[p[a >> 2] + 36 >> 2]](a);
 }
}
function nv(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 p[c + 12 >> 2] = b;
 mv(a, b);
 sa = c + 16 | 0;
}
function dv(a, b, c) {
 var d = 0;
 d = sa - 16 | 0;
 sa = d;
 a = cv(a, b, c);
 sa = d + 16 | 0;
 return a;
}
function pf(a) {
 ni(a);
 p[a + 120 >> 2] = 0;
 p[a + 124 >> 2] = 0;
 p[a >> 2] = 4628;
 p[a >> 2] = 12976;
}
function du(a, b) {
 a = a | 0;
 b = b | 0;
 b = Db(b, 57);
 if (!b) {
  return 1;
 }
 Gi(b, a);
 return 0;
}
function Al(a) {
 a = a | 0;
 var b = 0;
 b = p[a + 48 >> 2];
 m[p[p[b >> 2] + 8 >> 2]](b, t[a + 56 >> 2]);
}
function ek(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 Qf(a, b + 4 | 0, p[b >> 2]);
 sa = c + 16 | 0;
}
function Lp(a) {
 a = a | 0;
 if (p[a + 160 >> 2]) {
  a = 22368;
 } else {
  a = dc(a);
 }
 return a | 0;
}
function Dn(a) {
 a = a + -4 | 0;
 if (a >>> 0 <= 156) {
  return p[(a << 2) + 12268 >> 2];
 }
 return -1;
}
function Ch(a) {
 Sd(a);
 p[a + 168 >> 2] = 5;
 p[a + 172 >> 2] = 0;
 p[a >> 2] = 6164;
 p[a >> 2] = 6020;
}
function mk(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 p[b + 12 >> 2] = a;
 sa = b + 16 | 0;
 return a;
}
function xt(a, b) {
 a = a | 0;
 b = w(b);
 if (t[a + 12 >> 2] != b) {
  t[a + 12 >> 2] = b;
  Hf(a);
 }
}
function Sc(a, b) {
 if (t[a + 60 >> 2] != b) {
  t[a + 60 >> 2] = b;
  m[p[p[a >> 2] + 64 >> 2]](a);
 }
}
function Nu(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 return m[a | 0](b, c, d) | 0;
}
function Kj(a, b) {
 if (t[a + 88 >> 2] != b) {
  t[a + 88 >> 2] = b;
  m[p[p[a >> 2] + 80 >> 2]](a);
 }
}
function sb(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 a = $u(Fj(b, a));
 sa = b + 16 | 0;
 return a;
}
function qu(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 return m[a | 0](b, c, d) | 0;
}
function xk(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 ok(b, c, d, p[a + 24 >> 2]);
}
function sk(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 he(a, U(Nc(b) | 0, 22510, p[c >> 2]) | 0);
}
function rq(a) {
 var b = 0;
 if (p[a >> 2]) {
  fi(a);
  Ra(a);
  b = p[a >> 2];
  oc(a);
  Ua(b);
 }
}
function qx(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 gk(b, c, d, t[a + 24 >> 2]);
}
function am(a, b) {
 a = a | 0;
 b = b | 0;
 a = ne(a, b);
 m[p[p[a >> 2] >> 2]](a, 1);
 return a | 0;
}
function Pk(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 he(a, U(Nc(b) | 0, 22425, p[c >> 2]) | 0);
}
function Gk(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 he(a, U(Nc(b) | 0, 22467, p[c >> 2]) | 0);
}
function su(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = +d;
 return m[a | 0](b, c, d) | 0;
}
function Js(a, b) {
 a = a | 0;
 b = b | 0;
 if (!b) {
  return 1;
 }
 return q[b + 12 | 0] != 0 | 0;
}
function yq(a, b) {
 a = a | 0;
 b = b | 0;
 a = p[a + 104 >> 2];
 m[p[p[a >> 2] + 12 >> 2]](a, b);
}
function tu(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 zj(b, c, p[a + 24 >> 2]);
}
function tk(a) {
 a = a | 0;
 var b = 0;
 b = La(12);
 xw(b, a);
 p[b >> 2] = 16408;
 return b | 0;
}
function Rk(a) {
 a = a | 0;
 var b = 0;
 b = La(12);
 ox(b, a);
 p[b >> 2] = 15712;
 return b | 0;
}
function Hk(a) {
 a = a | 0;
 var b = 0;
 b = La(12);
 Vw(b, a);
 p[b >> 2] = 16020;
 return b | 0;
}
function Ue(a, b, c, d, e) {
 Bb(b, w(zc(e) * d));
 Ab(b, w(Ac(e) * c));
 Sc(b, t[a + 172 >> 2]);
}
function sn(a) {
 Fe(a);
 p[a >> 2] = 9804;
 p[a >> 2] = 1856;
 $a(a + 16 | 0);
 $a(a + 28 | 0);
}
function Zc(a) {
 if (p[a + 20 >> 2]) {
  a = p[a + 20 >> 2];
  m[p[p[a >> 2] + 96 >> 2]](a);
 }
}
function Kg(a) {
 p[a + 4 >> 2] = 1065353216;
 p[a + 8 >> 2] = 0;
 p[a >> 2] = 10400;
 return a;
}
function Za(a, b) {
 var c = 0;
 c = p[b + 4 >> 2];
 p[a >> 2] = p[b >> 2];
 p[a + 4 >> 2] = c;
}
function yb(a, b) {
 if (p[a + 4 >> 2] != p[Ra(a) >> 2]) {
  $c(a, b);
  return;
 }
 $h(a, b);
}
function xg(a, b, c, d) {
 return d & 255 | (c << 8 & 65280 | (b << 16 & 16711680 | a << 24));
}
function fy(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 ae(p[a >> 2], b, t[a + 4 >> 2], c);
}
function ac(a, b) {
 if (p[a + 4 >> 2] != p[Ra(a) >> 2]) {
  $c(a, b);
  return;
 }
 Lh(a, b);
}
function Zd(a, b) {
 var c = 0;
 c = sa - 16 | 0;
 sa = c;
 Qf(a, b, Cj(b));
 sa = c + 16 | 0;
}
function Vb(a) {
 ki(a);
 p[a + 60 >> 2] = 0;
 p[a >> 2] = 5612;
 p[a >> 2] = 7472;
 return a;
}
function Ic(a, b) {
 var c = 0;
 c = p[a >> 2];
 p[a >> 2] = b;
 if (c) {
  ib(a);
  Ua(c);
 }
}
function hh(a, b) {
 if (s[a + 4 >> 2] < s[Ra(a) >> 2]) {
  $c(a, b);
  return;
 }
 Lh(a, b);
}
function hf(a, b) {
 if (s[a + 4 >> 2] < s[Ra(a) >> 2]) {
  Nq(a, b);
  return;
 }
 Mq(a, b);
}
function Sq(a, b) {
 if (s[a + 4 >> 2] < s[Ra(a) >> 2]) {
  $c(a, b);
  return;
 }
 $h(a, b);
}
function Lc(a, b) {
 if (s[a + 4 >> 2] < s[Ra(a) >> 2]) {
  Pq(a, b);
  return;
 }
 Oq(a, b);
}
function Jq(a, b) {
 if (s[a + 4 >> 2] < s[Ra(a) >> 2]) {
  wq(a, b);
  return;
 }
 vq(a, b);
}
function Hu(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 m[a | 0](b, c, d);
}
function Au(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = w(d);
 m[a | 0](b, c, d);
}
function qj(a) {
 return w((q[a + 40 | 0] ? w(p[a + 32 >> 2]) : w(0)) / w(p[a + 16 >> 2]));
}
function mg(a) {
 a = a | 0;
 p[a + 72 >> 2] = 0;
 Fb(p[p[a + 20 >> 2] + 20 >> 2], 256, 0);
}
function js(a, b) {
 a = a | 0;
 b = b | 0;
 a = p[a + 112 >> 2];
 m[p[p[a >> 2] >> 2]](a);
}
function Gu(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 d = w(d);
 m[a | 0](b, c, d);
}
function ql(a, b) {
 a = a | 0;
 b = b | 0;
 return !!((b | 0) == 10 | (b | 0) == 47) | 0;
}
function oo(a, b) {
 a = a | 0;
 b = b | 0;
 return !!((b | 0) == 10 | (b | 0) == 48) | 0;
}
function iu(a, b) {
 a = a | 0;
 b = b | 0;
 return !!((b | 0) == 29 | (b | 0) == 50) | 0;
}
function cs(a, b) {
 a = a | 0;
 b = b | 0;
 return !!((b | 0) == 10 | (b | 0) == 44) | 0;
}
function bu(a, b) {
 a = a | 0;
 b = b | 0;
 return !!((b | 0) == 60 | (b | 0) == 66) | 0;
}
function _r(a, b) {
 a = a | 0;
 b = b | 0;
 return !!((b | 0) == 10 | (b | 0) == 45) | 0;
}
function Px(a, b) {
 a = a | 0;
 b = b | 0;
 return !!((b | 0) == 29 | (b | 0) == 37) | 0;
}
function Ft(a, b) {
 a = a | 0;
 b = b | 0;
 return !!((b | 0) == 27 | (b | 0) == 53) | 0;
}
function Fm(a, b) {
 a = a | 0;
 b = b | 0;
 return !!((b | 0) == 10 | (b | 0) == 18) | 0;
}
function Cm(a, b) {
 a = a | 0;
 b = b | 0;
 return !!((b | 0) == 10 | (b | 0) == 19) | 0;
}
function gd(a) {
 Fi(a);
 p[a >> 2] = 3440;
 p[a >> 2] = 1564;
 $a(a + 4 | 0);
 return a;
}
function _d(a) {
 a = a | 0;
 a = p[a + 8 >> 2];
 return m[p[p[a >> 2] + 8 >> 2]](a) | 0;
}
function Bq(a) {
 a = a | 0;
 _h(a);
 a = p[a + 104 >> 2];
 m[p[p[a >> 2] + 32 >> 2]](a);
}
function rb(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 Zu(Fj(b, a));
 sa = b + 16 | 0;
}
function oh(a) {
 a = a | 0;
 p[a >> 2] = 6780;
 db(a + 136 | 0);
 jb(a);
 return a | 0;
}
function Sl(a, b) {
 a = a | 0;
 b = b | 0;
 return t[a + 52 >> 2] < t[b + 52 >> 2] | 0;
}
function Fq(a) {
 a = a | 0;
 ii(a);
 a = p[a + 104 >> 2];
 m[p[p[a >> 2] + 8 >> 2]](a);
}
function Ef(a) {
 a = a | 0;
 p[a >> 2] = 2632;
 db(a + 124 | 0);
 jb(a);
 return a | 0;
}
function Du(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 return w(w(m[a | 0](b, c)));
}
function vi(a) {
 a = a | 0;
 p[a >> 2] = 3648;
 db(a + 60 | 0);
 jb(a);
 return a | 0;
}
function jb(a) {
 a = a | 0;
 p[a >> 2] = 8116;
 db(a + 24 | 0);
 Si(a);
 return a | 0;
}
function jf(a, b, c) {
 n[a + 2 | 0] = 0;
 n[a + 1 | 0] = c;
 n[a | 0] = b;
 return a;
}
function Th(a, b, c) {
 a = p[c + 4 >> 2];
 p[b >> 2] = p[c >> 2];
 p[b + 4 >> 2] = a;
}
function Pu(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 return m[a | 0](b, c) | 0;
}
function Kh(a) {
 a = a | 0;
 Fb(a, 8, 0);
 a = p[a + 132 >> 2];
 if (a) {
  sh(a);
 }
}
function Kb(a, b) {
 p[a >> 2] = p[b >> 2];
 p[a + 4 >> 2] = p[b + 4 >> 2];
 return a;
}
function yu(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 return m[a | 0](b, c) | 0;
}
function Rg(a, b, c) {
 b = b - a | 0;
 if (b) {
  Dj(c, a, b);
 }
 return b + c | 0;
}
function Cx(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 t[p[a >> 2] + b >> 2] = c;
}
function wt(a) {
 a = a | 0;
 if (!q[a + 12 | 0]) {
  n[a + 12 | 0] = 1;
  Hf(a);
 }
}
function Ig(a) {
 Pb(a);
 p[a >> 2] = 2012;
 Zd(a + 4 | 0, 8640);
 p[a >> 2] = 8924;
}
function Fe(a) {
 Pb(a);
 p[a >> 2] = 1744;
 Zd(a + 4 | 0, 8640);
 p[a >> 2] = 9520;
}
function Od(a) {
 if (1073741823 < a >>> 0) {
  Nb();
  E();
 }
 return La(a << 2);
}
function Hg(a) {
 Pb(a);
 p[a + 4 >> 2] = -1;
 p[a >> 2] = 9020;
 p[a >> 2] = 2468;
}
function Cu(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = +c;
 return m[a | 0](b, c) | 0;
}
function ie(a) {
 if (a < 4294967296 & a >= 0) {
  return ~~a >>> 0;
 }
 return 0;
}
function Gg(a) {
 Hg(a);
 p[a + 8 >> 2] = 0;
 p[a >> 2] = 9340;
 p[a >> 2] = 9284;
}
function Li(a) {
 var b = 0;
 b = sa - 16 | 0;
 sa = b;
 Vr(a);
 sa = b + 16 | 0;
}
function If(a, b, c) {
 p[a + 8 >> 2] = b;
 p[a + 4 >> 2] = c;
 p[a >> 2] = 2056;
}
function md(a) {
 if (Oc(a)) {
  return p[a + 4 >> 2];
 }
 return q[a + 11 | 0];
}
function xe(a) {
 a = a | 0;
 if (p[a + 20 >> 2]) {
  Tb(p[a + 20 >> 2], a);
 }
}
function be(a) {
 a = a | 0;
 p[a >> 2] = 1744;
 Yb(a + 4 | 0);
 return a | 0;
}
function Uy() {
 tb(22320);
 tb(22344);
 tb(22368);
 al();
 m[996](22633) | 0;
}
function Si(a) {
 a = a | 0;
 p[a >> 2] = 2724;
 Yb(a + 4 | 0);
 return a | 0;
}
function Lf(a) {
 a = a | 0;
 p[a >> 2] = 2012;
 Yb(a + 4 | 0);
 return a | 0;
}
function tf(a) {
 if (uf(a)) {
  return dc(p[a + 56 >> 2]);
 }
 return ri(a);
}
function Wd(a) {
 if (uf(a)) {
  return ti(p[a + 56 >> 2]);
 }
 return si(a);
}
function Dx(a, b) {
 a = a | 0;
 b = b | 0;
 return w(t[p[a >> 2] + b >> 2]);
}
function tl(a, b) {
 a = a | 0;
 b = b | 0;
 return ng(a + -64 | 0, b) | 0;
}
function jc(a) {
 var b = 0;
 b = La(4);
 p[b >> 2] = p[a >> 2];
 return b;
}
function Ju(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 m[a | 0](b, c);
}
function Co(a, b) {
 a = a | 0;
 b = b | 0;
 return fh(a + -72 | 0, b) | 0;
}
function lw(a, b) {
 a = a | 0;
 b = b | 0;
 return b + -29 >>> 0 < 2 | 0;
}
function fn(a, b) {
 a = a | 0;
 b = b | 0;
 return b + -54 >>> 0 < 3 | 0;
}
function Zs(a, b) {
 a = a | 0;
 b = b | 0;
 return b + -65 >>> 0 < 2 | 0;
}
function Wq(a, b) {
 a = a | 0;
 b = b | 0;
 return (b & 65534) == 10 | 0;
}
function Hs(a, b) {
 a = a | 0;
 b = b | 0;
 return b + -67 >>> 0 < 2 | 0;
}
function Ct(a, b) {
 a = a | 0;
 b = b | 0;
 return (b & 65534) == 54 | 0;
}
function Bu(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = w(c);
 m[a | 0](b, c);
}
function dg(a) {
 a = a | 0;
 if (a) {
  m[p[p[a >> 2] + 44 >> 2]](a);
 }
}
function ke(a) {
 a = a | 0;
 if (a) {
  m[p[p[a >> 2] + 8 >> 2]](a);
 }
}
function ah(a, b) {
 return Xd(Aq(a, b), t[a + 8 >> 2], t[a + 16 >> 2]);
}
function Uf(a, b) {
 a = a | 0;
 b = b | 0;
 return m[p[a >> 2]](b) | 0;
}
function Hb(a) {
 a = a | 0;
 if (a) {
  m[p[p[a >> 2] + 4 >> 2]](a);
 }
}
function Fd(a, b, c) {
 p[a >> 2] = p[b >> 2];
 n[a + 4 | 0] = q[c | 0];
}
function ic(a, b) {
 p[p[a >> 2] >> 2] = b;
 p[a >> 2] = p[a >> 2] + 8;
}
function Hd(a) {
 var b = 0;
 b = p[a >> 2];
 p[a >> 2] = 0;
 return b;
}
function Cb(a, b) {
 t[p[a >> 2] >> 2] = b;
 p[a >> 2] = p[a >> 2] + 8;
}
function Br(a, b) {
 a = a | 0;
 b = b | 0;
 return (b | 32) == 42 | 0;
}
function zt(a, b) {
 a = a | 0;
 b = b | 0;
 return (b | 0) == 54 | 0;
}
function ws(a, b) {
 a = a | 0;
 b = b | 0;
 return (b | 0) == 10 | 0;
}
function vm(a, b) {
 a = a | 0;
 b = b | 0;
 return (b | 0) == 23 | 0;
}
function eq(a, b) {
 a = a | 0;
 b = b | 0;
 return (b | 0) == 25 | 0;
}
function Qs(a, b) {
 a = a | 0;
 b = b | 0;
 return (b | 0) == 67 | 0;
}
function Pt(a, b) {
 a = a | 0;
 b = b | 0;
 return (b | 0) == 27 | 0;
}
function Nr(a, b) {
 a = a | 0;
 b = b | 0;
 return (b | 0) == 66 | 0;
}
function Lk(a, b) {
 a = a | 0;
 b = b | 0;
 return (b | 0) == 29 | 0;
}
function Iu(a, b) {
 a = a | 0;
 b = b | 0;
 return w(w(m[a | 0](b)));
}
function Ht(a, b) {
 a = a | 0;
 b = b | 0;
 return (b | 0) == 28 | 0;
}
function Gl(a, b) {
 a = a | 0;
 b = b | 0;
 return (b | 0) == 26 | 0;
}
function sj(a, b, c) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 return 0;
}
function fb(a, b, c) {
 t[a + 4 >> 2] = c;
 t[a >> 2] = b;
 return a;
}
function ay(a) {
 a = a | 0;
 return ((_d(a) | 0) == 59 ? a : 0) | 0;
}
function _x(a) {
 a = a | 0;
 return ((_d(a) | 0) == 56 ? a : 0) | 0;
}
function Xx(a) {
 a = a | 0;
 return ((_d(a) | 0) == 58 ? a : 0) | 0;
}
function Ds(a) {
 a = a | 0;
 return w(t[p[a + 20 >> 2] + 120 >> 2]);
}
function Ru(a, b) {
 a = a | 0;
 b = b | 0;
 return m[a | 0](b) | 0;
}
function Rf(a) {
 if (!a) {
  return 0;
 }
 p[5666] = a;
 return -1;
}
function Je(a) {
 return a >>> 0 >= 2 ? 1 << 32 - y(a + -1 | 0) : a;
}
function Dd(a, b, c) {
 n[a + 4 | 0] = c;
 p[a >> 2] = b;
 return a;
}
function jx(a, b) {
 a = a | 0;
 b = b | 0;
 ex(p[a + 8 >> 2], b);
}
function ak(a, b, c, d, e, f) {
 Xv(p[a + 8 >> 2], b, c, d, e, f);
}
function Xl(a) {
 a = a | 0;
 Fb(p[a + 20 >> 2], zb(256, 512), 0);
}
function vs(a, b) {
 a = a | 0;
 b = b | 0;
 return zd(a, b) | 0;
}
function qc(a) {
 return (p[a + 4 >> 2] - p[a >> 2] | 0) / 3 | 0;
}
function pb(a, b, c) {
 if (!(q[a | 0] & 32)) {
  Pf(b, c, a);
 }
}
function oc(a) {
 return (p[Ra(a) >> 2] - p[a >> 2] | 0) / 3 | 0;
}
function cq(a, b) {
 a = a | 0;
 b = b | 0;
 return Gb(a, b) | 0;
}
function Dl(a) {
 a = a | 0;
 return (q[a + 68 | 0] ? 2 : 4) | 0;
}
function ky(a) {
 a = a | 0;
 return mj(La(28), p[a >> 2]) | 0;
}
function ih(a) {
 var b = 0;
 b = p[a >> 2];
 Pa(a);
 return b;
}
function id(a) {
 n[a + 8 | 0] = 1;
 p[a >> 2] = p[a + 4 >> 2];
}
function hb(a) {
 p[a >> 2] = 0;
 p[a + 4 >> 2] = 0;
 return a;
}
function Nx(a) {
 a = a | 0;
 return ut(La(24), p[a >> 2]) | 0;
}
function Jj(a, b) {
 if (!a) {
  return 0;
 }
 return hv(a, b);
}
function Ao(a, b) {
 a = a | 0;
 b = b | 0;
 Id(a + 44 | 0, 2);
}
function zg(a) {
 return m[p[p[a >> 2] + 12 >> 2]](a, 38) | 0;
}
function zf(a) {
 return m[p[p[a >> 2] + 12 >> 2]](a, 13) | 0;
}
function rc(a) {
 Wb(a);
 p[a >> 2] = 4860;
 p[a >> 2] = 4800;
}
function kd(a) {
 return m[p[p[a >> 2] + 12 >> 2]](a, 61) | 0;
}
function _c(a) {
 return m[p[p[a >> 2] + 12 >> 2]](a, 36) | 0;
}
function Se(a) {
 return m[p[p[a >> 2] + 12 >> 2]](a, 24) | 0;
}
function Rr(a) {
 a = a | 0;
 ij(p[a + 4 >> 2], 0);
 return 1;
}
function Jd(a) {
 return m[p[p[a >> 2] + 12 >> 2]](a, 48) | 0;
}
function Fi(a) {
 Pb(a);
 p[a >> 2] = 3520;
 p[a >> 2] = 3480;
}
function Ff(a) {
 return m[p[p[a >> 2] + 12 >> 2]](a, 40) | 0;
}
function De(a) {
 Ig(a);
 p[a >> 2] = 8880;
 p[a >> 2] = 1968;
}
function yf(a) {
 return m[p[p[a >> 2] + 12 >> 2]](a, 2) | 0;
}
function xi(a) {
 return m[p[p[a >> 2] + 12 >> 2]](a, 3) | 0;
}
function Xf(a, b) {
 a = a | 0;
 b = b | 0;
 m[p[a >> 2]](b);
}
function Nc(a) {
 if (Oc(a)) {
  a = p[a >> 2];
 }
 return a;
}
function tv(a) {
 a = a | 0;
 return ea(p[a + 60 >> 2]) | 0;
}
function Td(a, b) {
 yi(a - -64 | 0, b);
 n[a + 60 | 0] = 1;
}
function xo(a, b) {
 a = a | 0;
 b = +b;
 return yo(a) | 0;
}
function vd(a) {
 a = a | 0;
 m[p[p[a >> 2] + 72 >> 2]](a);
}
function sc(a) {
 return w(t[a + 12 >> 2] - t[a + 4 >> 2]);
}
function bc(a) {
 a = a | 0;
 m[p[p[a >> 2] + 96 >> 2]](a);
}
function Wf(a, b) {
 p[a >> 2] = p[b >> 2];
 p[b >> 2] = 0;
}
function Ud(a, b) {
 yi(a + 72 | 0, b);
 n[a + 61 | 0] = 1;
}
function Tr(a) {
 a = a | 0;
 return Mo(p[a + 4 >> 2]) | 0;
}
function El(a) {
 a = a | 0;
 m[p[p[a >> 2] + 56 >> 2]](a);
}
function ub(a, b, c) {
 Q(22507, b | 0, c | 0);
 return a;
}
function sh(a) {
 Fb(a + 176 | 0, 8, 1);
 $o(a + 160 | 0);
}
function me(a, b, c) {
 Q(22505, b | 0, c | 0);
 return a;
}
function le(a, b, c) {
 Q(22506, b | 0, c | 0);
 return a;
}
function fg(a, b, c) {
 Q(22504, b | 0, c | 0);
 return a;
}
function eg(a, b, c) {
 Q(22469, b | 0, c | 0);
 return a;
}
function ch(a) {
 return (zb(r[a + 44 >> 1], 2) | 0) == 2;
}
function Zo(a) {
 a = a | 0;
 return p[a + 168 >> 2] << 1;
}
function Sy(a) {
 a = a | 0;
 if (a) {
  Qg(a);
 }
 Ua(a);
}
function Ox(a) {
 a = a | 0;
 if (a) {
  st(a);
 }
 Ua(a);
}
function Ec(a, b, c) {
 Q(22428, b | 0, c | 0);
 return a;
}
function yy(a) {
 a = a | 0;
 return _a(a + 104 | 0) | 0;
}
function xf(a) {
 a = a | 0;
 o[a + 60 >> 1] = 0;
 Zc(a);
}
function vy(a) {
 a = a | 0;
 return _a(a + 116 | 0) | 0;
}
function qi(a) {
 a = a | 0;
 Zc(a);
 o[a + 60 >> 1] = 0;
}
function Qu(a, b) {
 a = a | 0;
 b = b | 0;
 m[a | 0](b);
}
function ys(a) {
 a = a | 0;
 return w(t[a + 112 >> 2]);
}
function yg(a) {
 if (Fb(a, 32, 0)) {
  Fb(a, 64, 1);
 }
}
function wf(a) {
 a = a | 0;
 n[a + 60 | 0] = 0;
 Zc(a);
}
function vf(a) {
 a = a | 0;
 n[a + 61 | 0] = 0;
 Zc(a);
}
function rs(a) {
 a = a | 0;
 return w(t[a + 136 >> 2]);
}
function qs(a) {
 a = a | 0;
 return w(t[a + 140 >> 2]);
}
function pc(a) {
 return p[Ra(a) >> 2] - p[a >> 2] >> 3;
}
function nb(a) {
 return p[a + 4 >> 2] - p[a >> 2] >> 3;
}
function mc(a) {
 return p[Ra(a) >> 2] - p[a >> 2] >> 2;
}
function er(a) {
 a = a | 0;
 return w(t[a + 124 >> 2]);
}
function _a(a) {
 return p[a + 4 >> 2] - p[a >> 2] >> 2;
}
function Ub(a) {
 p[p[a >> 2] + 4 >> 2] = p[a + 4 >> 2];
}
function Bg(a) {
 p[a >> 2] = p[a >> 2] + -4;
 return a;
}
function Aj(a) {
 a = a | 0;
 return w(t[a + 120 >> 2]);
}
function nm(a) {
 a = a | 0;
 return w(t[a + 20 >> 2]);
}
function mx(a) {
 a = a | 0;
 return w(t[a + 24 >> 2]);
}
function bj(a) {
 a = a | 0;
 return _a(a + 4 | 0) | 0;
}
function Zb(a) {
 return p[a + 4 >> 2] - p[a >> 2] | 0;
}
function Xu(a) {
 a = a | 0;
 return w(t[a + 48 >> 2]);
}
function Tu(a) {
 a = a | 0;
 return w(t[a + 52 >> 2]);
}
function Rn(a) {
 a = a | 0;
 Fb(p[a + 40 >> 2], 4, 0);
}
function Pi(a) {
 a = a | 0;
 return w(t[a + 12 >> 2]);
}
function Ou(a) {
 a = a | 0;
 return w(t[a + 56 >> 2]);
}
function Oa(a, b) {
 return p[a >> 2] == p[b >> 2] ^ 1;
}
function Ml(a) {
 a = a | 0;
 return w(t[a + 16 >> 2]);
}
function He(a, b) {
 return p[a >> 2] - p[b >> 2] >> 2;
}
function Dc(a) {
 return p[Ra(a) >> 2] - p[a >> 2] | 0;
}
function Cg(a, b) {
 p[a + 4 >> 2] = b;
 p[a >> 2] = b;
}
function tc(a) {
 return w(t[a + 8 >> 2] - t[a >> 2]);
}
function lb(a, b) {
 a = a | 0;
 b = b | 0;
 return 0;
}
function dn(a) {
 a = a | 0;
 return w(t[a + 8 >> 2]);
}
function ck(a, b, c, d) {
 Iw(p[a + 8 >> 2], b, c, d);
}
function Yh(a, b, c) {
 return w(w(w(b - a) * c) + a);
}
function Xo(a, b) {
 a = a | 0;
 b = b | 0;
 yh(a, b);
}
function Ui(a, b) {
 a = a | 0;
 b = b | 0;
 return 1;
}
function Jf(a) {
 a = a | 0;
 return w(t[a + 4 >> 2]);
}
function Hc(a, b) {
 p[a >> 2] = p[b >> 2];
 return a;
}
function Ed(a, b, c) {
 return p[b >> 2] == p[c >> 2];
}
function xq(a) {
 a = a | 0;
 return p[a + 104 >> 2];
}
function mb(a, b) {
 return p[a >> 2] + (b << 3) | 0;
}
function kc(a) {
 return !(a + -1 & a) & a >>> 0 > 2;
}
function Qa(a, b) {
 return p[a >> 2] + (b << 2) | 0;
}
function Ap(a) {
 a = a | 0;
 return p[a + 168 >> 2];
}
function pu(a) {
 a = a | 0;
 return m[a | 0]() | 0;
}
function lf(a) {
 return p[a >> 2] == p[a + 4 >> 2];
}
function jh(a) {
 Pe(a);
 Pe(a + 20 | 0);
 return a;
}
function hy(a) {
 a = a | 0;
 return p[a + 16 >> 2];
}
function Zh(a, b) {
 return p[a >> 2] + v(b, 3) | 0;
}
function Wt(a) {
 a = a | 0;
 return p[a + 32 >> 2];
}
function Vt(a) {
 a = a | 0;
 return p[a + 36 >> 2];
}
function Ut(a) {
 a = a | 0;
 return p[a + 20 >> 2];
}
function Pd(a) {
 p[p[a + 8 >> 2] >> 2] = p[a >> 2];
}
function Nt(a) {
 a = a | 0;
 return p[a + 28 >> 2];
}
function Ep(a) {
 a = a | 0;
 return q[a + 152 | 0];
}
function lu(a) {
 a = a | 0;
 return va(a | 0) | 0;
}
function jk(a) {
 ia(p[a >> 2]);
 return p[a >> 2];
}
function iy(a) {
 a = a | 0;
 return q[a + 24 | 0];
}
function fm(a) {
 a = a | 0;
 return p[a + 8 >> 2];
}
function _i(a) {
 return (zb(jd(a), 16) | 0) == 16;
}
function Xt(a) {
 a = a | 0;
 return q[a + 40 | 0];
}
function Vs(a) {
 a = a | 0;
 return q[a + 12 | 0];
}
function Ji(a, b) {
 return r[a >> 1] == r[b >> 1];
}
function Gf(a, b) {
 return p[a >> 2] == p[b >> 2];
}
function cj(a, b) {
 return t[a >> 2] < t[b >> 2];
}
function bg(a) {
 a = a | 0;
 return w(t[a >> 2]);
}
function Yb(a) {
 if (Oc(a)) {
  Ua(p[a >> 2]);
 }
}
function Sr(a) {
 a = a | 0;
 Hi(a, 0);
 return 1;
}
function Ge(a, b) {
 return s[a >> 2] < s[b >> 2];
}
function Yl(a) {
 a = a | 0;
 re(p[a + 20 >> 2]);
}
function Oi(a, b) {
 return b >>> (a << 3) & 255;
}
function $i(a) {
 return (zb(jd(a), 4) | 0) == 4;
}
function ye(a) {
 p[a >> 2] = p[p[a >> 2] >> 2];
}
function vt(a) {
 a = a | 0;
 n[a + 12 | 0] = 0;
}
function qb(a, b) {
 return (zb(a, b) | 0) != 0;
}
function th(a) {
 n[a | 0] = 0;
 $a(a + 4 | 0);
}
function ib(a) {
 a = a | 0;
 return a + 4 | 0;
}
function by(a) {
 a = a | 0;
 return r[a >> 1];
}
function aq(a) {
 a = a | 0;
 return dc(a) | 0;
}
function Yf(a) {
 a = a | 0;
 n[a + 4 | 0] = 1;
}
function Ip(a) {
 a = a | 0;
 bc(a + -156 | 0);
}
function Id(a, b) {
 o[a >> 1] = r[a >> 1] | b;
}
function Hf(a) {
 n[p[a + 4 >> 2] + 4 | 0] = 1;
}
function Gx(a) {
 a = a | 0;
 return Va(a) | 0;
}
function zh(a, b) {
 _a(a);
 Bh(a, b);
 ei(a);
}
function sl(a) {
 a = a | 0;
 mg(a + -64 | 0);
}
function lc(a, b, c) {
 p[b >> 2] = p[c >> 2];
}
function gb(a, b) {
 p[a >> 2] = b;
 return a;
}
function Vc(a, b) {
 Ee(a);
 Jg(a + 4 | 0, b);
}
function Ol(a) {
 a = a | 0;
 re(a + -68 | 0);
}
function Fl(a) {
 a = a | 0;
 pg(a + -52 | 0);
}
function uf(a) {
 return p[a + 56 >> 2] != 0;
}
function rh(a, b) {
 n[a | 0] = q[a | 0] | b;
}
function jd(a) {
 return p[a + 8 >> 2] & 255;
}
function Ja(a, b) {
 return (b << 2) + a | 0;
}
function Cs(a) {
 a = a | 0;
 return w(w(0));
}
function $g(a, b) {
 return Ke(a, p[b >> 2]);
}
function wc(a) {
 a = a | 0;
 Lf(a);
 Ua(a);
}
function ug(a) {
 a = a | 0;
 rg(a);
 Ua(a);
}
function pd(a) {
 return a + -48 >>> 0 < 10;
}
function ob(a) {
 a = a | 0;
 jb(a);
 Ua(a);
}
function nx(a) {
 a = a | 0;
 hk(a);
 Ua(a);
}
function nh(a) {
 a = a | 0;
 Ve(a);
 Ua(a);
}
function kw(a) {
 a = a | 0;
 $j(a);
 Ua(a);
}
function kg(a, b, c) {
 ll(a, p[b >> 2], c);
}
function cm(a) {
 a = a | 0;
 Fb(a, 128, 1);
}
function cc(a) {
 a = a | 0;
 nc(a);
 Ua(a);
}
function _o(a) {
 a = a | 0;
 ef(a);
 Ua(a);
}
function _b(a) {
 a = a | 0;
 Nf(a);
 Ua(a);
}
function Xg(a, b, c) {
 Rd(c);
 Wg(a, b, c);
}
function Uw(a) {
 a = a | 0;
 dk(a);
 Ua(a);
}
function Ri(a) {
 a = a | 0;
 Ef(a);
 Ua(a);
}
function Pa(a) {
 p[a >> 2] = p[a >> 2] + 4;
}
function Eg(a) {
 a = a | 0;
 Ae(a);
 Ua(a);
}
function Be(a) {
 a = a | 0;
 be(a);
 Ua(a);
}
function zi(a, b) {
 return w(D(Ir(a, b)));
}
function wd(a) {
 a = a | 0;
 Fb(a, 32, 0);
}
function vk(a) {
 a = a | 0;
 return 22510;
}
function ty(a) {
 a = a | 0;
 return 22596;
}
function sy(a) {
 a = a | 0;
 return 22598;
}
function ry(a) {
 a = a | 0;
 return 22600;
}
function rk(a) {
 a = a | 0;
 return 22427;
}
function qk(a) {
 a = a | 0;
 return 22582;
}
function py(a) {
 a = a | 0;
 return 22602;
}
function oy(a) {
 a = a | 0;
 return 22604;
}
function ny(a) {
 a = a | 0;
 return 22607;
}
function mw(a) {
 a = a | 0;
 hc(a, 14566);
}
function ly(a) {
 a = a | 0;
 return 22610;
}
function lx(a) {
 a = a | 0;
 hc(a, 14082);
}
function kx(a) {
 a = a | 0;
 hc(a, 14087);
}
function eb(a) {
 a = a | 0;
 return a | 0;
}
function dy(a) {
 a = a | 0;
 return 22613;
}
function _k(a) {
 a = a | 0;
 return 22422;
}
function Yy(a, b, c) {
 return Wy(a, b, c);
}
function Xy(a, b, c) {
 return Vy(a, b, c);
}
function Xb(a) {
 return p[a >> 2] + 8 | 0;
}
function Vx(a) {
 a = a | 0;
 return 22620;
}
function Ux(a) {
 a = a | 0;
 return 22622;
}
function Uk(a) {
 a = a | 0;
 return 22425;
}
function Uc(a, b, c) {
 return Ed(a, b, c);
}
function Tx(a) {
 a = a | 0;
 return 22624;
}
function Tw(a) {
 a = a | 0;
 hc(a, 14156);
}
function Te(a, b) {
 a = a | 0;
 b = b | 0;
}
function Rx(a) {
 a = a | 0;
 return 22626;
}
function Qx(a) {
 a = a | 0;
 return 22628;
}
function Ok(a) {
 a = a | 0;
 return 22465;
}
function Oc(a) {
 return n[a + 11 | 0] < 0;
}
function Ny(a) {
 a = a | 0;
 return 22586;
}
function Na(a) {
 return Vd(p[a + 4 >> 2]);
}
function Mw(a) {
 a = a | 0;
 hc(a, 14201);
}
function Le(a, b) {
 p[a >> 2] = p[b >> 2];
}
function Jk(a) {
 a = a | 0;
 return 22467;
}
function Hx(a) {
 a = a | 0;
 return 22429;
}
function Hj(a, b, c) {
 return dv(a, b, c);
}
function Fk(a) {
 a = a | 0;
 return 22508;
}
function hc(a, b) {
 gx(p[a + 8 >> 2], b);
}
function Hi(a, b) {
 Fo(p[a + 4 >> 2], b);
}
function Gi(a, b) {
 jj(p[a + 4 >> 2], b);
}
function Gc(a) {
 return (Ii(a) | 0) == 1;
}
function nj(a, b) {
 n[a | 0] = q[b | 0];
}
function gh(a) {
 Wc(a + 20 | 0);
 Wc(a);
}
function Ne(a, b) {
 return Gf(a, b) ^ 1;
}
function Mu(a) {
 a = a | 0;
 m[a | 0]();
}
function yr(a) {
 a = a | 0;
 return 34;
}
function yp(a) {
 a = a | 0;
 return 51;
}
function xs(a) {
 a = a | 0;
 return 10;
}
function xm(a) {
 a = a | 0;
 return 23;
}
function vl(a) {
 a = a | 0;
 Ua(og(a));
}
function ve(a) {
 return a >>> 16 & 255;
}
function uw(a) {
 a = a | 0;
 return 30;
}
function us(a) {
 a = a | 0;
 return 41;
}
function um(a) {
 a = a | 0;
 return 39;
}
function sp(a) {
 a = a | 0;
 Ua(uh(a));
}
function sm(a) {
 a = a | 0;
 return 46;
}
function sf(a) {
 mc(a);
 _a(a);
 mc(a);
}
function rl(a) {
 a = a | 0;
 return 47;
}
function ps(a) {
 a = a | 0;
 Ua(Qi(a));
}
function pr(a) {
 a = a | 0;
 return 35;
}
function po(a) {
 a = a | 0;
 return 48;
}
function mf(a) {
 nb(a);
 hi(a);
 gi(a);
}
function lr(a) {
 a = a | 0;
 return 36;
}
function kt(a) {
 a = a | 0;
 Ua(Zi(a));
}
function kn(a) {
 a = a | 0;
 return 61;
}
function ju(a) {
 a = a | 0;
 return 50;
}
function jq(a) {
 a = a | 0;
 return 25;
}
function jg(a) {
 Dc(a);
 Zb(a);
 Dc(a);
}
function is(a) {
 a = a | 0;
 return 43;
}
function hr(a) {
 a = a | 0;
 Ua(pi(a));
}
function hp(a) {
 a = a | 0;
 Ua(qh(a));
}
function gu(a) {
 a = a | 0;
 Ua(Nf(a));
}
function gt(a) {
 a = a | 0;
 return 57;
}
function gn(a) {
 a = a | 0;
 return 56;
}
function gj(a) {
 return _a(a + 28 | 0);
}
function et(a) {
 a = a | 0;
 Ua(Yi(a));
}
function ds(a) {
 a = a | 0;
 return 44;
}
function dr(a) {
 a = a | 0;
 Ua(Ei(a));
}
function dq(a) {
 a = a | 0;
 Ua(nc(a));
}
function dp(a) {
 a = a | 0;
 return 13;
}
function cu(a) {
 a = a | 0;
 return 60;
}
function cr(a) {
 a = a | 0;
 return 15;
}
function cn(a) {
 a = a | 0;
 return 69;
}
function au(a) {
 a = a | 0;
 Ua(rj(a));
}
function ar(a) {
 a = a | 0;
 return 12;
}
function an(a) {
 a = a | 0;
 return 62;
}
function _s(a) {
 a = a | 0;
 return 65;
}
function _m(a) {
 a = a | 0;
 return 63;
}
function _e(a) {
 pc(a);
 nb(a);
 pc(a);
}
function Zx(a) {
 a = a | 0;
 return 37;
}
function Zq(a) {
 a = a | 0;
 return 38;
}
function Ym(a) {
 a = a | 0;
 return 58;
}
function Xq(a) {
 a = a | 0;
 return 11;
}
function Wo(a) {
 a = a | 0;
 return 52;
}
function Wn(a) {
 a = a | 0;
 return 49;
}
function Wm(a) {
 a = a | 0;
 return 64;
}
function Vq(a) {
 a = a | 0;
 return 14;
}
function Us(a) {
 a = a | 0;
 return 71;
}
function Um(a) {
 a = a | 0;
 return 59;
}
function Tt(a) {
 a = a | 0;
 return 31;
}
function Tk(a) {
 a = a | 0;
 return 29;
}
function Rs(a) {
 a = a | 0;
 return 67;
}
function Ro(a) {
 a = a | 0;
 Ua(mh(a));
}
function Rm(a) {
 a = a | 0;
 return 22;
}
function Rh(a) {
 oc(a);
 qc(a);
 oc(a);
}
function Rd(a) {
 _a(a);
 Fh(a);
 ei(a);
}
function Qt(a) {
 a = a | 0;
 return 27;
}
function Pp(a) {
 a = a | 0;
 Ua(Ye(a));
}
function Or(a) {
 a = a | 0;
 return 66;
}
function Om(a) {
 a = a | 0;
 return 17;
}
function Ns(a) {
 a = a | 0;
 return 70;
}
function No(a) {
 a = a | 0;
 Ua(lh(a));
}
function Nl(a) {
 a = a | 0;
 Ua(Ae(a));
}
function Mt(a) {
 a = a | 0;
 return 28;
}
function Mm(a) {
 a = a | 0;
 return 24;
}
function Mi(a, b, c) {
 return Ji(b, c);
}
function Lt(a) {
 a = a | 0;
 Ua(kj(a));
}
function Ll(a) {
 a = a | 0;
 return 26;
}
function Jm(a) {
 a = a | 0;
 return 21;
}
function Is(a) {
 a = a | 0;
 return 68;
}
function Hq(a) {
 a = a | 0;
 Ua(Vh(a));
}
function Hp(a) {
 a = a | 0;
 return 16;
}
function Hm(a) {
 a = a | 0;
 Ua(Fg(a));
}
function Gt(a) {
 a = a | 0;
 return 53;
}
function Gm(a) {
 a = a | 0;
 return 18;
}
function Dt(a) {
 a = a | 0;
 return 55;
}
function Dr(a) {
 a = a | 0;
 Ua(vi(a));
}
function Dp(a) {
 a = a | 0;
 Ua(Ve(a));
}
function Dm(a) {
 a = a | 0;
 return 19;
}
function Cr(a) {
 a = a | 0;
 return 42;
}
function Bs(a) {
 a = a | 0;
 Ua(Ef(a));
}
function At(a) {
 a = a | 0;
 return 54;
}
function As(a) {
 a = a | 0;
 return 40;
}
function Am(a) {
 a = a | 0;
 return 20;
}
function $r(a) {
 a = a | 0;
 return 45;
}
function vb(a) {
 return p[ib(a) >> 2];
}
function ue(a) {
 return a >>> 8 & 255;
}
function tr(a) {
 a = a | 0;
 return 6;
}
function rp(a) {
 a = a | 0;
 return 7;
}
function oj(a, b) {
 n[a + 11 | 0] = b;
}
function mi(a) {
 a = a | 0;
 return 2;
}
function lg(a) {
 gb(a, ra(14008) | 0);
}
function gr(a) {
 a = a | 0;
 return 4;
}
function gp(a) {
 a = a | 0;
 return 3;
}
function fk(a) {
 return Ci(La(24), a);
}
function Xp(a) {
 a = a | 0;
 return 5;
}
function Qo(a) {
 a = a | 0;
 return 8;
}
function Mc(a) {
 a = a | 0;
 return 0;
}
function Ma(a) {
 return Vd(p[a >> 2]);
}
function Bf(a) {
 a = a | 0;
 return 1;
}
function se(a) {
 return a >>> 24 | 0;
}
function Jc(a) {
 return (a | 0) != 2;
}
function wi(a) {
 return a + 176 | 0;
}
function tj(a, b) {
 return Gf(a, b);
}
function ld(a, b) {
 return mt(a, b);
}
function fj(a, b) {
 return lt(a, b);
}
function Xe(a) {
 return a + 236 | 0;
}
function Kd(a, b) {
 return Ne(a, b);
}
function Ib(a, b) {
 return Sn(a, b);
}
function Di(a, b) {
 return Wu(a, b);
}
function Ad(a, b) {
 return In(a, b);
}
function uc(a) {
 a = a | 0;
 yg(a);
}
function ti(a) {
 return a + 80 | 0;
}
function tg(a) {
 a = a | 0;
 re(a);
}
function kb(a) {
 return a + 16 | 0;
}
function dc(a) {
 return a + 88 | 0;
}
function bb(a) {
 a = a | 0;
 Ua(a);
}
function Xa(a) {
 return a + 12 | 0;
}
function We(a) {
 a = a | 0;
 Zc(a);
}
function Eh(a) {
 return a + 56 | 0;
}
function hi(a) {
 Qh(a, p[a >> 2]);
}
function fi(a) {
 pq(a, p[a >> 2]);
}
function fc(a) {
 p[a >> 2] = 3272;
}
function Wh(a) {
 p[a >> 2] = 5324;
}
function Sh(a, b) {
 pc(a);
 pc(a);
}
function Re(a) {
 Pe(a);
 return a;
}
function Ra(a) {
 return a + 8 | 0;
}
function Pb(a) {
 p[a >> 2] = 3560;
}
function Jg(a, b) {
 p[a >> 2] = b;
}
function Ie(a, b) {
 mc(a);
 mc(a);
}
function Fh(a) {
 Bh(a, p[a >> 2]);
}
function $a(a) {
 Sp(a);
 return a;
}
function zb(a, b) {
 return a & b;
}
function cd(a, b) {
 return a | b;
}
function Ta(a) {
 a = a | 0;
 E();
}
function te(a) {
 return a & 255;
}
function Ze(a, b, c) {
 Kb(b, c);
}
function ud(a) {
 la(p[a >> 2]);
}
function re(a) {
 Fb(a, 256, 0);
}
function ph(a) {
 db(a + 4 | 0);
}
function gi(a) {
 pc(a);
 nb(a);
}
function ei(a) {
 mc(a);
 _a(a);
}
function Sa(a) {
 return +Ur(a);
}
function Ee(a) {
 p[a >> 2] = 0;
}
function Eb(a) {
 ja(p[a >> 2]);
}
function qd(a) {
 n[a | 0] = 0;
}
function yd(a, b) {
 Xr(a, b);
}
function he(a, b) {
 gb(a, b);
}
function _f(a, b) {
 he(a, b);
}
function Pg(a, b) {
 om(a, b);
}
function Mf(a, b) {
 Ot(a, b);
}
function Me(a, b) {
 Le(a, b);
}
function od() {
 Nb();
 E();
}
function Ka(a) {
 a = a | 0;
}
function Nb() {
 Z();
 E();
}
function Nh(a) {
 hb(a);
}
function Yu() {
 E();
}

// EMSCRIPTEN_END_FUNCS

  m[1] = eb;
  m[2] = bb;
  m[3] = Mt;
  m[4] = Ht;
  m[5] = Bt;
  m[6] = Ty;
  m[7] = lb;
  m[8] = pk;
  m[9] = Ka;
  m[10] = Ka;
  m[11] = Ka;
  m[12] = Ka;
  m[13] = Ei;
  m[14] = dr;
  m[15] = jq;
  m[16] = eq;
  m[17] = _p;
  m[18] = Iq;
  m[19] = zq;
  m[20] = qq;
  m[21] = Ka;
  m[22] = Fg;
  m[23] = Hm;
  m[24] = Ll;
  m[25] = Gl;
  m[26] = wl;
  m[27] = bm;
  m[28] = $l;
  m[29] = Rl;
  m[30] = Ka;
  m[31] = Ta;
  m[32] = Tk;
  m[33] = Lk;
  m[34] = rd;
  m[35] = ol;
  m[36] = lb;
  m[37] = il;
  m[38] = Ka;
  m[39] = Ka;
  m[40] = Ka;
  m[41] = Yu;
  m[42] = bb;
  m[43] = Zx;
  m[44] = Px;
  m[45] = Fx;
  m[46] = xk;
  m[47] = qy;
  m[48] = Ka;
  m[49] = bb;
  m[50] = uw;
  m[51] = lw;
  m[52] = aw;
  m[53] = qx;
  m[54] = Dw;
  m[55] = Ka;
  m[56] = bb;
  m[57] = ju;
  m[58] = iu;
  m[59] = hu;
  m[60] = tu;
  m[61] = ku;
  m[62] = Ka;
  m[63] = Nf;
  m[64] = gu;
  m[65] = cu;
  m[66] = bu;
  m[67] = sj;
  m[68] = fu;
  m[69] = eu;
  m[70] = du;
  m[71] = rj;
  m[72] = au;
  m[73] = Tt;
  m[74] = St;
  m[75] = Rt;
  m[76] = $t;
  m[77] = _t;
  m[78] = Yt;
  m[79] = Ka;
  m[80] = Ka;
  m[81] = Ka;
  m[82] = Ka;
  m[83] = Ka;
  m[84] = Ka;
  m[85] = Ka;
  m[86] = Ka;
  m[87] = be;
  m[88] = Ta;
  m[89] = Qt;
  m[90] = Pt;
  m[91] = pj;
  m[92] = lb;
  m[93] = kj;
  m[94] = Lt;
  m[95] = Gt;
  m[96] = Ft;
  m[97] = Kt;
  m[98] = Jt;
  m[99] = It;
  m[100] = Lf;
  m[101] = wc;
  m[102] = Dt;
  m[103] = Ct;
  m[104] = Kf;
  m[105] = lb;
  m[106] = lb;
  m[107] = Et;
  m[108] = Ka;
  m[109] = Ta;
  m[110] = At;
  m[111] = zt;
  m[112] = Ka;
  m[113] = eb;
  m[114] = bb;
  m[115] = bb;
  m[116] = bb;
  m[117] = vt;
  m[118] = bb;
  m[119] = Zi;
  m[120] = kt;
  m[121] = gt;
  m[122] = ft;
  m[123] = jt;
  m[124] = it;
  m[125] = ht;
  m[126] = Yi;
  m[127] = et;
  m[128] = _s;
  m[129] = Zs;
  m[130] = Ys;
  m[131] = dt;
  m[132] = ct;
  m[133] = bt;
  m[134] = Ka;
  m[135] = Ka;
  m[136] = Ka;
  m[137] = Ka;
  m[138] = bb;
  m[139] = Us;
  m[140] = Ts;
  m[141] = Wi;
  m[142] = lb;
  m[143] = lb;
  m[144] = Ss;
  m[145] = Ka;
  m[146] = Ws;
  m[147] = Xs;
  m[148] = Ka;
  m[149] = bb;
  m[150] = Rs;
  m[151] = Qs;
  m[152] = Vi;
  m[153] = Ui;
  m[154] = Ui;
  m[155] = bb;
  m[156] = Ns;
  m[157] = Ms;
  m[158] = Ls;
  m[159] = Os;
  m[160] = Ps;
  m[161] = Ka;
  m[162] = bb;
  m[163] = Is;
  m[164] = Hs;
  m[165] = Js;
  m[166] = Ks;
  m[167] = Ef;
  m[168] = Bs;
  m[169] = As;
  m[170] = zs;
  m[171] = Ti;
  m[172] = Gb;
  m[173] = Fs;
  m[174] = pk;
  m[175] = Ka;
  m[176] = Ka;
  m[177] = xe;
  m[178] = Te;
  m[179] = we;
  m[180] = uc;
  m[181] = uc;
  m[182] = uc;
  m[183] = cm;
  m[184] = ys;
  m[185] = Ds;
  m[186] = Cs;
  m[187] = Es;
  m[188] = Si;
  m[189] = Ta;
  m[190] = xs;
  m[191] = ws;
  m[192] = xb;
  m[193] = Ri;
  m[194] = us;
  m[195] = ts;
  m[196] = ss;
  m[197] = vs;
  m[198] = rs;
  m[199] = qs;
  m[200] = uc;
  m[201] = uc;
  m[202] = Qi;
  m[203] = ps;
  m[204] = is;
  m[205] = hs;
  m[206] = gs;
  m[207] = os;
  m[208] = ms;
  m[209] = js;
  m[210] = ns;
  m[211] = Ka;
  m[212] = Ka;
  m[213] = Ka;
  m[214] = Ka;
  m[215] = Ka;
  m[216] = Ka;
  m[217] = jb;
  m[218] = ob;
  m[219] = ds;
  m[220] = cs;
  m[221] = bs;
  m[222] = fs;
  m[223] = es;
  m[224] = Ka;
  m[225] = Te;
  m[226] = Ka;
  m[227] = Ka;
  m[228] = Ka;
  m[229] = Ka;
  m[230] = Ka;
  m[231] = Ka;
  m[232] = Ka;
  m[233] = ob;
  m[234] = $r;
  m[235] = _r;
  m[236] = Ni;
  m[237] = as;
  m[238] = lb;
  m[239] = Ka;
  m[240] = Ka;
  m[241] = eb;
  m[242] = bb;
  m[243] = Tr;
  m[244] = Sr;
  m[245] = bb;
  m[246] = Mc;
  m[247] = Mc;
  m[248] = bb;
  m[249] = bb;
  m[250] = Bf;
  m[251] = bb;
  m[252] = Mc;
  m[253] = bb;
  m[254] = bb;
  m[255] = Mc;
  m[256] = Rr;
  m[257] = bb;
  m[258] = Qr;
  m[259] = Pr;
  m[260] = Ta;
  m[261] = Ta;
  m[262] = Or;
  m[263] = Nr;
  m[264] = Ta;
  m[265] = Ta;
  m[266] = bb;
  m[267] = Mc;
  m[268] = vi;
  m[269] = Dr;
  m[270] = Cr;
  m[271] = Br;
  m[272] = Ar;
  m[273] = Gr;
  m[274] = Hr;
  m[275] = Fr;
  m[276] = Er;
  m[277] = Ka;
  m[278] = Ka;
  m[279] = Ka;
  m[280] = ob;
  m[281] = yr;
  m[282] = xr;
  m[283] = wr;
  m[284] = Np;
  m[285] = lb;
  m[286] = qi;
  m[287] = qi;
  m[288] = mr;
  m[289] = ui;
  m[290] = zr;
  m[291] = xf;
  m[292] = wf;
  m[293] = vf;
  m[294] = ob;
  m[295] = tr;
  m[296] = sr;
  m[297] = rr;
  m[298] = vr;
  m[299] = ur;
  m[300] = wf;
  m[301] = wf;
  m[302] = vf;
  m[303] = vf;
  m[304] = ob;
  m[305] = pr;
  m[306] = or;
  m[307] = nr;
  m[308] = ui;
  m[309] = qr;
  m[310] = xf;
  m[311] = xf;
  m[312] = Ta;
  m[313] = lr;
  m[314] = kr;
  m[315] = bd;
  m[316] = pi;
  m[317] = hr;
  m[318] = gr;
  m[319] = fr;
  m[320] = rf;
  m[321] = cq;
  m[322] = bq;
  m[323] = Mh;
  m[324] = $p;
  m[325] = ir;
  m[326] = Aj;
  m[327] = er;
  m[328] = uc;
  m[329] = uc;
  m[330] = Ka;
  m[331] = aq;
  m[332] = Kh;
  m[333] = Bf;
  m[334] = bc;
  m[335] = bc;
  m[336] = Ka;
  m[337] = Ka;
  m[338] = nc;
  m[339] = cc;
  m[340] = Kc;
  m[341] = cc;
  m[342] = cr;
  m[343] = br;
  m[344] = Ka;
  m[345] = Ka;
  m[346] = ob;
  m[347] = ar;
  m[348] = $q;
  m[349] = qf;
  m[350] = zd;
  m[351] = ob;
  m[352] = mi;
  m[353] = _q;
  m[354] = of;
  m[355] = Ka;
  m[356] = Ka;
  m[357] = Ta;
  m[358] = Zq;
  m[359] = Yq;
  m[360] = Df;
  m[361] = Ka;
  m[362] = Ka;
  m[363] = Ka;
  m[364] = Ka;
  m[365] = Ta;
  m[366] = Xq;
  m[367] = Wq;
  m[368] = Ta;
  m[369] = Ta;
  m[370] = Ka;
  m[371] = Ka;
  m[372] = Ka;
  m[373] = Ka;
  m[374] = ob;
  m[375] = We;
  m[376] = We;
  m[377] = Dh;
  m[378] = Ta;
  m[379] = Vq;
  m[380] = Uq;
  m[381] = Ka;
  m[382] = Ka;
  m[383] = Vh;
  m[384] = Hq;
  m[385] = Fq;
  m[386] = yq;
  m[387] = Gq;
  m[388] = Eq;
  m[389] = Dq;
  m[390] = Cq;
  m[391] = Bq;
  m[392] = xq;
  m[393] = ef;
  m[394] = Ta;
  m[395] = ii;
  m[396] = di;
  m[397] = ci;
  m[398] = bi;
  m[399] = ai;
  m[400] = _h;
  m[401] = eb;
  m[402] = Ta;
  m[403] = cc;
  m[404] = dq;
  m[405] = ob;
  m[406] = Xp;
  m[407] = Wp;
  m[408] = Vp;
  m[409] = Ka;
  m[410] = Ye;
  m[411] = Pp;
  m[412] = lb;
  m[413] = Gh;
  m[414] = Op;
  m[415] = ob;
  m[416] = cc;
  m[417] = Hp;
  m[418] = Gp;
  m[419] = Fp;
  m[420] = Mp;
  m[421] = Kp;
  m[422] = Lp;
  m[423] = Jp;
  m[424] = Ep;
  m[425] = Ka;
  m[426] = bc;
  m[427] = Ip;
  m[428] = Ve;
  m[429] = Dp;
  m[430] = yp;
  m[431] = xp;
  m[432] = wh;
  m[433] = yh;
  m[434] = bc;
  m[435] = bc;
  m[436] = Ap;
  m[437] = zp;
  m[438] = cc;
  m[439] = Ka;
  m[440] = Ka;
  m[441] = uh;
  m[442] = sp;
  m[443] = rp;
  m[444] = qp;
  m[445] = pp;
  m[446] = tp;
  m[447] = bc;
  m[448] = cc;
  m[449] = Ka;
  m[450] = qh;
  m[451] = hp;
  m[452] = gp;
  m[453] = fp;
  m[454] = ep;
  m[455] = ip;
  m[456] = jp;
  m[457] = lp;
  m[458] = Ka;
  m[459] = Ka;
  m[460] = kp;
  m[461] = oh;
  m[462] = Ta;
  m[463] = Ta;
  m[464] = dp;
  m[465] = cp;
  m[466] = ob;
  m[467] = _o;
  m[468] = Te;
  m[469] = Mc;
  m[470] = nh;
  m[471] = Wo;
  m[472] = Vo;
  m[473] = Uo;
  m[474] = Xo;
  m[475] = Zo;
  m[476] = Yo;
  m[477] = bc;
  m[478] = nh;
  m[479] = Ka;
  m[480] = ob;
  m[481] = We;
  m[482] = mh;
  m[483] = Ro;
  m[484] = Qo;
  m[485] = Oo;
  m[486] = So;
  m[487] = cc;
  m[488] = lh;
  m[489] = No;
  m[490] = Bf;
  m[491] = ro;
  m[492] = qo;
  m[493] = lb;
  m[494] = Ao;
  m[495] = zo;
  m[496] = Ka;
  m[497] = Ka;
  m[498] = Ka;
  m[499] = Ka;
  m[500] = Ka;
  m[501] = Ka;
  m[502] = fh;
  m[503] = Co;
  m[504] = Ta;
  m[505] = po;
  m[506] = oo;
  m[507] = no;
  m[508] = Ka;
  m[509] = Ka;
  m[510] = Ta;
  m[511] = ob;
  m[512] = Wn;
  m[513] = Vn;
  m[514] = Un;
  m[515] = Yn;
  m[516] = lb;
  m[517] = Xn;
  m[518] = ob;
  m[519] = Tn;
  m[520] = lb;
  m[521] = Rn;
  m[522] = _b;
  m[523] = kn;
  m[524] = jn;
  m[525] = hn;
  m[526] = Ka;
  m[527] = _b;
  m[528] = Ta;
  m[529] = wc;
  m[530] = gn;
  m[531] = fn;
  m[532] = en;
  m[533] = Ka;
  m[534] = wc;
  m[535] = Ta;
  m[536] = Ta;
  m[537] = bb;
  m[538] = Ta;
  m[539] = Ta;
  m[540] = Ta;
  m[541] = Ta;
  m[542] = bb;
  m[543] = bb;
  m[544] = cn;
  m[545] = bn;
  m[546] = bb;
  m[547] = _b;
  m[548] = an;
  m[549] = $m;
  m[550] = _b;
  m[551] = Ta;
  m[552] = Be;
  m[553] = lb;
  m[554] = lb;
  m[555] = Ta;
  m[556] = Ta;
  m[557] = Ta;
  m[558] = Ta;
  m[559] = Be;
  m[560] = _b;
  m[561] = _m;
  m[562] = Zm;
  m[563] = _b;
  m[564] = Be;
  m[565] = wc;
  m[566] = Ym;
  m[567] = Xm;
  m[568] = wc;
  m[569] = _b;
  m[570] = Wm;
  m[571] = Vm;
  m[572] = _b;
  m[573] = bb;
  m[574] = wc;
  m[575] = Um;
  m[576] = Tm;
  m[577] = Sm;
  m[578] = Ka;
  m[579] = wc;
  m[580] = Ta;
  m[581] = Rm;
  m[582] = Qm;
  m[583] = Pm;
  m[584] = Ka;
  m[585] = Ka;
  m[586] = Ka;
  m[587] = Ka;
  m[588] = Ka;
  m[589] = Ae;
  m[590] = Eg;
  m[591] = Om;
  m[592] = Nm;
  m[593] = Wl;
  m[594] = lb;
  m[595] = Vl;
  m[596] = Tl;
  m[597] = wd;
  m[598] = wd;
  m[599] = wd;
  m[600] = wd;
  m[601] = tg;
  m[602] = tg;
  m[603] = Pl;
  m[604] = Ol;
  m[605] = rg;
  m[606] = Ta;
  m[607] = Mm;
  m[608] = Lm;
  m[609] = Km;
  m[610] = Il;
  m[611] = Ka;
  m[612] = ne;
  m[613] = Ka;
  m[614] = Ka;
  m[615] = Ka;
  m[616] = Ka;
  m[617] = Ta;
  m[618] = Jm;
  m[619] = Im;
  m[620] = ze;
  m[621] = Ta;
  m[622] = Gm;
  m[623] = Fm;
  m[624] = Em;
  m[625] = Ka;
  m[626] = Ta;
  m[627] = Dm;
  m[628] = Cm;
  m[629] = Bm;
  m[630] = Ka;
  m[631] = Ka;
  m[632] = Ta;
  m[633] = Am;
  m[634] = zm;
  m[635] = ym;
  m[636] = Ka;
  m[637] = Ta;
  m[638] = Ka;
  m[639] = Ka;
  m[640] = Ka;
  m[641] = cc;
  m[642] = Ta;
  m[643] = Ka;
  m[644] = Ka;
  m[645] = Ta;
  m[646] = Ta;
  m[647] = Ka;
  m[648] = Ta;
  m[649] = bb;
  m[650] = xm;
  m[651] = vm;
  m[652] = sj;
  m[653] = lb;
  m[654] = lb;
  m[655] = Ta;
  m[656] = Ta;
  m[657] = Ta;
  m[658] = Ka;
  m[659] = Ta;
  m[660] = um;
  m[661] = tm;
  m[662] = Ta;
  m[663] = Ri;
  m[664] = Ka;
  m[665] = Ka;
  m[666] = Ta;
  m[667] = Ta;
  m[668] = ob;
  m[669] = sm;
  m[670] = rm;
  m[671] = qm;
  m[672] = Ka;
  m[673] = Ka;
  m[674] = Ka;
  m[675] = Ka;
  m[676] = ob;
  m[677] = ob;
  m[678] = Ta;
  m[679] = ug;
  m[680] = am;
  m[681] = mi;
  m[682] = _l;
  m[683] = ob;
  m[684] = Zl;
  m[685] = lb;
  m[686] = Yl;
  m[687] = Xl;
  m[688] = Sl;
  m[689] = Nl;
  m[690] = Eg;
  m[691] = lb;
  m[692] = Jl;
  m[693] = Ta;
  m[694] = ob;
  m[695] = Hl;
  m[696] = lb;
  m[697] = El;
  m[698] = pg;
  m[699] = Fl;
  m[700] = ug;
  m[701] = Cl;
  m[702] = Dl;
  m[703] = Bl;
  m[704] = Al;
  m[705] = zl;
  m[706] = yl;
  m[707] = og;
  m[708] = vl;
  m[709] = rl;
  m[710] = ql;
  m[711] = pl;
  m[712] = ul;
  m[713] = vd;
  m[714] = vd;
  m[715] = vd;
  m[716] = vd;
  m[717] = ng;
  m[718] = mg;
  m[719] = tl;
  m[720] = sl;
  m[721] = Ta;
  m[722] = Ka;
  m[723] = Ka;
  m[724] = Ka;
  m[725] = Ka;
  m[726] = jl;
  m[727] = _k;
  m[728] = Hb;
  m[729] = Wk;
  m[730] = Uk;
  m[731] = Hb;
  m[732] = sd;
  m[733] = Rk;
  m[734] = Qk;
  m[735] = Pk;
  m[736] = Ok;
  m[737] = Hb;
  m[738] = Jk;
  m[739] = Hb;
  m[740] = sd;
  m[741] = Hk;
  m[742] = Gk;
  m[743] = Fk;
  m[744] = dg;
  m[745] = vk;
  m[746] = dg;
  m[747] = sd;
  m[748] = tk;
  m[749] = sk;
  m[750] = rk;
  m[751] = bb;
  m[752] = bg;
  m[753] = Sb;
  m[754] = Jf;
  m[755] = dn;
  m[756] = Pi;
  m[757] = Ml;
  m[758] = nm;
  m[759] = qk;
  m[760] = Sy;
  m[761] = vn;
  m[762] = wn;
  m[763] = aj;
  m[764] = bj;
  m[765] = Ny;
  m[766] = Hb;
  m[767] = ib;
  m[768] = ag;
  m[769] = xo;
  m[770] = wo;
  m[771] = Jy;
  m[772] = Hy;
  m[773] = Fy;
  m[774] = Dy;
  m[775] = bh;
  m[776] = uo;
  m[777] = yy;
  m[778] = so;
  m[779] = to;
  m[780] = vy;
  m[781] = vo;
  m[782] = uy;
  m[783] = ty;
  m[784] = Hb;
  m[785] = Tu;
  m[786] = Ab;
  m[787] = Sb;
  m[788] = Tc;
  m[789] = Ou;
  m[790] = Xj;
  m[791] = Xu;
  m[792] = Bb;
  m[793] = sy;
  m[794] = Hb;
  m[795] = ee;
  m[796] = Sb;
  m[797] = Tc;
  m[798] = Nj;
  m[799] = ry;
  m[800] = Hb;
  m[801] = Aj;
  m[802] = ee;
  m[803] = Sb;
  m[804] = Tc;
  m[805] = py;
  m[806] = Hb;
  m[807] = Ij;
  m[808] = Sb;
  m[809] = Tc;
  m[810] = Gj;
  m[811] = oy;
  m[812] = Hb;
  m[813] = ib;
  m[814] = ag;
  m[815] = ny;
  m[816] = Hb;
  m[817] = ag;
  m[818] = Ut;
  m[819] = Vf;
  m[820] = hy;
  m[821] = Wt;
  m[822] = Vt;
  m[823] = Xt;
  m[824] = $f;
  m[825] = Nt;
  m[826] = mx;
  m[827] = Sb;
  m[828] = ae;
  m[829] = ly;
  m[830] = bb;
  m[831] = ky;
  m[832] = Jf;
  m[833] = lj;
  m[834] = Sb;
  m[835] = Tc;
  m[836] = iy;
  m[837] = $f;
  m[838] = $d;
  m[839] = fy;
  m[840] = dy;
  m[841] = ke;
  m[842] = _d;
  m[843] = cy;
  m[844] = by;
  m[845] = ay;
  m[846] = _x;
  m[847] = Xx;
  m[848] = Vx;
  m[849] = ke;
  m[850] = Vs;
  m[851] = yt;
  m[852] = $f;
  m[853] = Rb;
  m[854] = Ux;
  m[855] = ke;
  m[856] = Pi;
  m[857] = xt;
  m[858] = Sb;
  m[859] = Tc;
  m[860] = Tx;
  m[861] = ke;
  m[862] = wt;
  m[863] = Rx;
  m[864] = Hb;
  m[865] = Qx;
  m[866] = Ox;
  m[867] = Nx;
  m[868] = rt;
  m[869] = pt;
  m[870] = fm;
  m[871] = nt;
  m[872] = Hx;
  m[873] = bb;
  m[874] = bg;
  m[875] = Sb;
  m[876] = Jf;
  m[877] = Gx;
  m[878] = sd;
  m[879] = ge;
  m[880] = Rb;
  m[881] = ik;
  m[882] = Rb;
  m[883] = px;
  m[884] = eb;
  m[885] = eb;
  m[886] = Yf;
  m[887] = Xf;
  m[888] = ge;
  m[889] = ik;
  m[890] = Rb;
  m[891] = Yw;
  m[892] = Xw;
  m[893] = eb;
  m[894] = eb;
  m[895] = Yf;
  m[896] = Xf;
  m[897] = Rb;
  m[898] = Rb;
  m[899] = Tc;
  m[900] = Rb;
  m[901] = Rb;
  m[902] = Rb;
  m[903] = yw;
  m[904] = bk;
  m[905] = ge;
  m[906] = eb;
  m[907] = eb;
  m[908] = Yf;
  m[909] = Xf;
  m[910] = $f;
  m[911] = Bc;
  m[912] = fe;
  m[913] = Vf;
  m[914] = Qv;
  m[915] = Rb;
  m[916] = Bc;
  m[917] = Bc;
  m[918] = Bc;
  m[919] = Bc;
  m[920] = fe;
  m[921] = Bc;
  m[922] = Vf;
  m[923] = fe;
  m[924] = Bc;
  m[925] = eb;
  m[926] = eb;
  m[927] = eb;
  m[928] = eb;
  m[929] = eb;
  m[930] = eb;
  m[931] = eb;
  m[932] = eb;
  m[933] = Pv;
  m[934] = _j;
  m[935] = Zj;
  m[936] = bk;
  m[937] = Uf;
  m[938] = Uf;
  m[939] = Uf;
  m[940] = eb;
  m[941] = eb;
  m[942] = eb;
  m[943] = eb;
  m[944] = eb;
  m[945] = eb;
  m[946] = ge;
  m[947] = eb;
  m[948] = eb;
  m[949] = _j;
  m[950] = Zj;
  m[951] = Rb;
  m[952] = Vf;
  m[953] = fe;
  m[954] = Ex;
  m[955] = bb;
  m[956] = Dx;
  m[957] = Cx;
  m[958] = hk;
  m[959] = nx;
  m[960] = lx;
  m[961] = kx;
  m[962] = jx;
  m[963] = ix;
  m[964] = hx;
  m[965] = Ta;
  m[966] = eb;
  m[967] = Ta;
  m[968] = dk;
  m[969] = Uw;
  m[970] = Tw;
  m[971] = Sw;
  m[972] = Rw;
  m[973] = Qw;
  m[974] = Pw;
  m[975] = Ow;
  m[976] = Mw;
  m[977] = eb;
  m[978] = Lw;
  m[979] = Ta;
  m[980] = Ta;
  m[981] = ww;
  m[982] = vw;
  m[983] = tw;
  m[984] = sw;
  m[985] = rw;
  m[986] = qw;
  m[987] = pw;
  m[988] = ow;
  m[989] = nw;
  m[990] = mw;
  m[991] = $j;
  m[992] = kw;
  m[993] = Ta;
  m[994] = eb;
  m[995] = Ta;
  m[996] = xv;
  m[997] = tv;
  m[998] = sv;
  m[999] = uv;
  m[1e3] = pv;
  m[1001] = ov;
  m[1002] = lv;
  function ua() {
   return buffer.byteLength / 65536 | 0;
  }
  function va(pagesToAdd) {
   pagesToAdd = pagesToAdd | 0;
   var wa = ua() | 0;
   var xa = wa + pagesToAdd | 0;
   if (wa < xa && xa < 65536) {
    var ya = new ArrayBuffer(v(xa, 65536));
    var za = new global.Int8Array(ya);
    za.set(n);
    n = za;
    n = new global.Int8Array(ya);
    o = new global.Int16Array(ya);
    p = new global.Int32Array(ya);
    q = new global.Uint8Array(ya);
    r = new global.Uint16Array(ya);
    s = new global.Uint32Array(ya);
    t = new global.Float32Array(ya);
    u = new global.Float64Array(ya);
    buffer = ya;
    l.buffer = ya;
   }
   return wa;
  }
  return {
   "N": Uy,
   "O": de,
   "P": Ov,
   "Q": Yj,
   "R": Ua,
   "S": Ru,
   "T": Qu,
   "U": Pu,
   "V": Nu,
   "W": Mu,
   "X": Lu,
   "Y": Ku,
   "Z": Ju,
   "_": Iu,
   "$": Hu,
   "aa": Gu,
   "ba": Fu,
   "ca": Eu,
   "da": Du,
   "ea": Cu,
   "fa": Bu,
   "ga": Au,
   "ha": zu,
   "ia": yu,
   "ja": xu,
   "ka": wu,
   "la": vu,
   "ma": uu,
   "na": su,
   "oa": ru,
   "pa": qu,
   "qa": pu,
   "ra": ou,
   "sa": mu,
   "ta": nu,
   "ua": lu
  };
 }
 var Aa = new Uint8Array(wasmMemory.buffer);
 for (var Ba = new Uint8Array(123), Ca = 25; Ca >= 0; --Ca) {
  Ba[48 + Ca] = 52 + Ca;
  Ba[65 + Ca] = Ca;
  Ba[97 + Ca] = 26 + Ca;
 }
 Ba[43] = 62;
 Ba[47] = 63;
 function Da(uint8Array, offset, b64) {
  var Ea, Fa, Ca = 0, Ga = offset, Ha = b64.length, Ia = offset + (Ha * 3 >> 2) - (b64[Ha - 2] == "=") - (b64[Ha - 1] == "=");
  for (; Ca < Ha; Ca += 4) {
   Ea = Ba[b64.charCodeAt(Ca + 1)];
   Fa = Ba[b64.charCodeAt(Ca + 2)];
   uint8Array[Ga++] = Ba[b64.charCodeAt(Ca)] << 2 | Ea >> 4;
   if (Ga < Ia) uint8Array[Ga++] = Ea << 4 | Fa >> 2;
   if (Ga < Ia) uint8Array[Ga++] = Fa << 6 | Ba[b64.charCodeAt(Ca + 3)];
  }
 }
 Da(Aa, 1032, "AQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAM");
 Da(Aa, 1088, "DQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQ==");
 Da(Aa, 1200, "FgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQ==");
 Da(Aa, 1312, "AQAAAB8AAAAgAAAAIQAAACIAAAAjAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKQ==");
 Da(Aa, 1372, "AQAAACoAAAArAAAALAAAAC0AAAAjAAAAJAAAACUAAAAmAAAAJwAAACgAAAAuAAAALwAAADA=");
 Da(Aa, 1436, "AQAAADEAAAAyAAAAMwAAADQAAAAjAAAAJAAAACUAAAAmAAAAJwAAACgAAAA1AAAANgAAADc=");
 Da(Aa, 1500, "AQAAADgAAAA5AAAAOgAAADsAAAAjAAAAJAAAACUAAAAmAAAAJwAAACgAAAA8AAAAPQAAAD4=");
 Da(Aa, 1564, "PwAAAEAAAABBAAAAQgAAAEMAAABEAAAARQAAAEYAAABhbGxvY2F0b3I8VD46OmFsbG9jYXRlKHNpemVfdCBuKSAnbicgZXhjZWVkcyBtYXhpbXVtIHN1cHBvcnRlZCBzaXpl");
 Da(Aa, 1672, "RwAAAEgAAABJAAAASgAAAEsAAABMAAAATQAAAE4AAABPAAAAUAAAAFEAAABSAAAAUwAAAFQAAABVAAAAVg==");
 Da(Aa, 1744, "VwAAAFgAAABZAAAAWgAAAFsAAAApAAAAKQAAAFwAAABPAAAAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQ==");
 Da(Aa, 1856, "XQAAAF4AAABfAAAAYAAAAFsAAABhAAAAYgAAAGMAAABPAAAAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQ==");
 Da(Aa, 1968, "ZAAAAGUAAABmAAAAZwAAAGgAAABpAAAAagAAAGsAAABs");
 Da(Aa, 2012, "ZAAAAG0AAABuAAAAbwAAAGgAAAApAAAAKQAAAFwAAABs");
 Da(Aa, 2056, "cAAAAHEAAABy");
 Da(Aa, 2076, "cAAAAHEAAABz");
 Da(Aa, 2096, "cAAAAHEAAAB0");
 Da(Aa, 2116, "dQAAAHEAAAB2AAAAU3RhdGVNYWNoaW5lIGV4Y2VlZGVkIG1heCBpdGVyYXRpb25zLgo=");
 Da(Aa, 2176, "dwAAAHgAAAB5AAAAegAAAGgAAAB7AAAAfAAAAH0AAABsAAAAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQ==");
 Da(Aa, 2288, "fgAAAH8AAACAAAAAgQAAAIIAAACDAAAAhAAAAIUAAACGAAAAhwAAAIgAAACJAAAAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQ==");
 Da(Aa, 2412, "AQAAAIoAAACLAAAAjAAAAI0AAACOAAAAjwAAAJAAAACRAAAAkgAAAJMAAACU");
 Da(Aa, 2468, "AQAAAJUAAACWAAAAlwAAAJgAAACOAAAAjwAAAJAAAACRAAAAmQAAAJo=");
 Da(Aa, 2520, "AQAAAJsAAACcAAAAnQAAAJ4AAACOAAAAjwAAAJAAAACRAAAAnwAAAKAAAACUAAAAoQ==");
 Da(Aa, 2580, "AQAAAKIAAACjAAAApAAAAJgAAACOAAAAjwAAAJAAAACRAAAApQAAAKY=");
 Da(Aa, 2632, "pwAAAKgAAACpAAAAqgAAAKsAAACsAAAArQAAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAtgAAALcAAAC4AAAAuQAAALoAAAC7");
 Da(Aa, 2724, "vAAAAL0AAAC+AAAAvwAAAMAAAAApAAAAKQAAAFwAAACvAAAAsAAAAGFsbG9jYXRvcjxUPjo6YWxsb2NhdGUoc2l6ZV90IG4pICduJyBleGNlZWRzIG1heGltdW0gc3VwcG9ydGVkIHNpemU=");
 Da(Aa, 2840, "pwAAAMEAAADCAAAAwwAAAMQAAACsAAAAxQAAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAtgAAALcAAAC4AAAAxgAAAMcAAAC7AAAAyAAAAMk=");
 Da(Aa, 2940, "ygAAAMsAAADMAAAAzQAAAM4AAACsAAAAzwAAAK4AAACvAAAAsAAAANAAAADRAAAA0gAAANMAAADUAAAA1QAAANYAAADXAAAA2AAAAGFsbG9jYXRvcjxUPjo6YWxsb2NhdGUoc2l6ZV90IG4pICduJyBleGNlZWRzIG1heGltdW0gc3VwcG9ydGVkIHNpemU=");
 Da(Aa, 3092, "2QAAANoAAADbAAAA3AAAAN0AAADeAAAA3wAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAOIAAADjAAAA5AAAAOUAAADmAAAA5wAAAOg=");
 Da(Aa, 3180, "2QAAAOkAAADqAAAA6wAAAOwAAADtAAAA7gAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAO8AAADw");
 Da(Aa, 3248, "8QAAAPIAAADzAAAA9A==");
 Da(Aa, 3272, "8QAAAPUAAAD2AAAA9w==");
 Da(Aa, 3296, "8QAAAPgAAAD2AAAA9w==");
 Da(Aa, 3320, "8QAAAPkAAAD2AAAA+g==");
 Da(Aa, 3344, "8QAAAPsAAAD8AAAA9w==");
 Da(Aa, 3368, "8QAAAP0AAAD2AAAA9w==");
 Da(Aa, 3392, "8QAAAP4AAAD/AAAAAAE=");
 Da(Aa, 3416, "8QAAAAEBAAACAQAAAwE=");
 Da(Aa, 3440, "AQAAAAQBAABBAAAAQgAAAEMAAAApAAAAKQAAAFw=");
 Da(Aa, 3480, "AQAAAAUBAAAGAQAABwEAAEMAAAApAAAAKQAAAFw=");
 Da(Aa, 3520, "AQAAAAgBAAAGAQAABwEAAEMAAAApAAAAKQAAAFw=");
 Da(Aa, 3560, "AQAAAAkBAAApAAAAKQAAACkAAAApAAAAKQAAAFw=");
 Da(Aa, 3600, "8QAAAAoBAAALAQAA9wAAAAAAgD8=");
 Da(Aa, 3630, "gD8=");
 Da(Aa, 3648, "DAEAAA0BAAAOAQAADwEAABABAAARAQAAEgEAAK4AAACvAAAAsAAAABMBAACyAAAAFAEAABUBAAAWAQAAFwEAAGFsbG9jYXRvcjxUPjo6YWxsb2NhdGUoc2l6ZV90IG4pICduJyBleGNlZWRzIG1heGltdW0gc3VwcG9ydGVkIHNpemU=");
 Da(Aa, 3788, "2QAAABgBAAAZAQAAGgEAABsBAAAcAQAAHQEAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAB4BAAAfAQAAIAEAACEBAAAiAQAAIwEAACQBAAAlAQ==");
 Da(Aa, 3880, "2QAAACYBAAAnAQAAKAEAACkBAAAcAQAAHQEAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAB4BAAAfAQAAIAEAACoBAAArAQAALAEAAC0BAAAuAQAALwE=");
 Da(Aa, 3976, "2QAAADABAAAxAQAAMgEAADMBAAAcAQAAHQEAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAB4BAAAfAQAAIAEAADQBAAA1AQAANgEAADcB");
 Da(Aa, 4064, "2QAAADgBAAA5AQAAOgEAADsBAAAcAQAAHQEAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAB4BAAAfAQAAIAEAACkAAAAp");
 Da(Aa, 4144, "PAEAAD0BAAA+AQAAPwEAAEABAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAARQEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAABOAQAATwEAAFABAABRAQ==");
 Da(Aa, 4272, "UgEAAFMBAAA+AQAAPwEAAEABAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAAVAEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAABOAQAATwEAAFABAABRAQ==");
 Da(Aa, 4400, "UgEAAFUBAABWAQAAVwEAAEABAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAAVAEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAABYAQAAWQEAAFABAABRAQ==");
 Da(Aa, 4528, "2QAAAFoBAABbAQAAXAEAAF0BAACsAAAAXgEAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoB");
 Da(Aa, 4628, "2QAAAF8BAABgAQAAYQEAAGIBAACsAAAAXgEAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABjAQAAZAE=");
 Da(Aa, 4724, "2QAAAGUBAABmAQAAZwEAAGgBAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAGkBAABqAQAAawEAAGwB");
 Da(Aa, 4800, "2QAAAG0BAABuAQAAbwEAAMAAAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4Q==");
 Da(Aa, 4860, "2QAAAHABAABuAQAAbwEAAMAAAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4Q==");
 Da(Aa, 4924, "2QAAAHEBAAAnAQAAKAEAACkBAAAcAQAAHQEAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAB4BAAAfAQAAIAEAACkAAAApAAAAcgEAAHMBAAB0AQAAdQE=");
 Da(Aa, 5020, "2QAAAHYBAAA5AQAAOgEAADsBAAAcAQAAHQEAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAHcBAAB4AQAAeQE=");
 Da(Aa, 5092, "2QAAAHoBAAB7AQAAfAEAADsBAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAH0BAAB+AQ==");
 Da(Aa, 5160, "fwEAAIABAACBAQAAggEAAIMBAACEAQAAhQEAAIYBAACHAQAAiAE=");
 Da(Aa, 5208, "iQEAAIoBAACLAQAAKQAAAIwBAACNAQAAjgEAAI8BAACQAQAAKQAAAGFsbG9jYXRvcjxUPjo6YWxsb2NhdGUoc2l6ZV90IG4pICduJyBleGNlZWRzIG1heGltdW0gc3VwcG9ydGVkIHNpemU=");
 Da(Aa, 5324, "kQEAAJIBAAApAAAAKQAAACkAAAApAAAAKQAAACkAAAApAAAAKQ==");
 Da(Aa, 5372, "UgEAAJMBAABWAQAAVwEAAEABAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAAVAEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAABOAQAATwEAAFABAABRAQ==");
 Da(Aa, 5500, "UgEAAJQBAABbAQAAXAEAAF0BAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAAVAEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0B");
 Da(Aa, 5612, "2QAAAJUBAACWAQAAlwEAAJgBAAAcAQAAHQEAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAHcBAAB4AQAAeQEAAJkBAABhbGxvY2F0b3I8VD46OmFsbG9jYXRlKHNpemVfdCBuKSAnbicgZXhjZWVkcyBtYXhpbXVtIHN1cHBvcnRlZCBzaXpl");
 Da(Aa, 5756, "mgEAAJsBAAC+AAAAvwAAAMAAAACsAAAAnAEAAK4AAACvAAAAsAAAAJ0BAACyAAAAngE=");
 Da(Aa, 5816, "2QAAAJ8BAAB7AQAAfAEAADsBAAAcAQAAHQEAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAHcBAAB4AQAAeQE=");
 Da(Aa, 5888, "UgEAAKABAAChAQAAogEAAKMBAABBAQAAQgEAAK4AAACvAAAAsAAAAKQBAABEAQAApQEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAACmAQAApwEAAKgBAACpAQAAqgEAAGT///8AAAAAqwE=");
 Da(Aa, 6020, "rAEAAK0BAACuAQAArwEAALABAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAAsQEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAABOAQAATwEAAFABAABRAQAAsgEAALMBAAC0AQAAtQE=");
 Da(Aa, 6164, "UgEAALYBAACuAQAArwEAALABAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAAVAEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAABOAQAATwEAAFABAABRAQAAtwEAALgB");
 Da(Aa, 6300, "uQEAALoBAAC7AQAAvAEAAL0BAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAAvgEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAABOAQAATwEAAFABAABRAQAAvwE=");
 Da(Aa, 6432, "UgEAAMABAAC7AQAAvAEAAL0BAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAAVAEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAABOAQAATwEAAFABAABRAQAAwQE=");
 Da(Aa, 6564, "wgEAAMMBAADEAQAAxQEAAMYBAADHAQAAXgEAAK4AAACvAAAAsAAAAMgBAACyAAAAyQEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAMoBAADLAQAAzAE=");
 Da(Aa, 6672, "zQEAAM4BAADEAQAAxQEAAMYBAACsAAAAXgEAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAMoBAADLAQAAKQ==");
 Da(Aa, 6780, "zQEAAM8BAADQAQAA0QEAAMYBAACsAAAAXgEAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAMoBAADLAQAAKQ==");
 Da(Aa, 6888, "2QAAANIBAADQAQAA0QEAAMYBAACsAAAAXgEAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAMoBAADLAQAAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQ==");
 Da(Aa, 7060, "iQEAANMBAACLAQAA1AEAAIwBAACNAQAAjgEAAI8BAACQAQAA1QEAAGFsbG9jYXRvcjxUPjo6YWxsb2NhdGUoc2l6ZV90IG4pICduJyBleGNlZWRzIG1heGltdW0gc3VwcG9ydGVkIHNpemU=");
 Da(Aa, 7176, "rAEAANYBAADXAQAA2AEAANkBAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAA2gEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAABOAQAATwEAAFABAABRAQAAsgEAALMBAADbAQAA3AEAAN0B");
 Da(Aa, 7324, "rAEAAN4BAADXAQAA2AEAANkBAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAAsQEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAABOAQAATwEAAFABAABRAQAAsgEAALMBAAC0AQAAtQEAAN8B");
 Da(Aa, 7472, "2QAAAOABAACWAQAAlwEAAJgBAAAcAQAAHQEAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAHcBAAB4AQAAeQEAAOEB");
 Da(Aa, 7548, "4gEAAOMBAADkAQAA5QEAAEABAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAA5gEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAABOAQAATwEAAFABAABRAQ==");
 Da(Aa, 7676, "UgEAAOcBAADkAQAA5QEAAEABAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAAVAEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAABOAQAATwEAAFABAABRAQ==");
 Da(Aa, 7804, "6AEAAOkBAADqAQAA6wEAAOwBAACsAAAA7QEAAK4AAACvAAAAsAAAAOAAAADuAQAA7wEAAPABAADxAQAA8gEAAPMBAAD0AQAA9QEAAPYBAAC4////AAAAAPcBAABBcnRib2FyZDo6aW5pdGlhbGl6ZSAtIERyYXcgcnVsZSB0YXJnZXRzIG1pc3NpbmcgY29tcG9uZW50IHdpZHRoIGlkICVkCg==");
 Da(Aa, 7976, "2QAAAPgBAAD5AQAA+gEAAPsBAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAPwBAAD9AQAAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQ==");
 Da(Aa, 8116, "2QAAAP4BAAC+AAAAvwAAAMAAAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAERlcGVuZGVuY3kgY3ljbGUhCgBhbGxvY2F0b3I8VD46OmFsbG9jYXRlKHNpemVfdCBuKSAnbicgZXhjZWVkcyBtYXhpbXVtIHN1cHBvcnRlZCBzaXpl");
 Da(Aa, 8264, "2QAAAP8BAAAAAgAAAQIAAAICAAADAgAABAIAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAAUC");
 Da(Aa, 8328, "2QAAAAYCAAD5AQAA+gEAAPsBAAAHAgAACAIAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAPwBAAAJAgAAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQBCYWQgaGVhZGVyCgBVbnN1cHBvcnRlZCB2ZXJzaW9uICV1LiV1IGV4cGVjdGVkICV1LiV1LgoAUklWRQBhbGxvY2F0b3I8VD46OmFsbG9jYXRlKHNpemVfdCBuKSAnbicgZXhjZWVkcyBtYXhpbXVtIHN1cHBvcnRlZCBzaXplAABVbmtub3duIHByb3BlcnR5IGtleSAlbGx1LCBtaXNzaW5nIGZyb20gcHJvcGVydHkgVG9DLgo=");
 Da(Aa, 8652, "PwAAAAoCAAALAgAADAIAAA0CAABEAAAARQAAAEYAAAAOAg==");
 Da(Aa, 8696, "PwAAAA8CAAALAgAADAIAAA0CAABEAAAARQAAAEYAAAAOAg==");
 Da(Aa, 8740, "AQAAABACAAAPAAAAEAAAABEAAAApAAAAKQAAAFwAAAAV");
 Da(Aa, 8784, "ZAAAABECAAASAgAAEwIAABQCAABpAAAAagAAAGsAAABsAAAAFQI=");
 Da(Aa, 8832, "ZAAAABYCAAASAgAAEwIAABQCAABpAAAAagAAAGsAAABsAAAAFQI=");
 Da(Aa, 8880, "ZAAAABcCAABmAAAAZwAAAGgAAAApAAAAKQAAAFwAAABs");
 Da(Aa, 8924, "ZAAAABgCAABuAAAAbwAAAGgAAAApAAAAKQAAAFwAAABs");
 Da(Aa, 8968, "AQAAABkCAACjAAAApAAAAJgAAACOAAAAjwAAAJAAAACRAAAAmQAAAJo=");
 Da(Aa, 9020, "AQAAABoCAACWAAAAlwAAAJgAAAApAAAAKQAAAFwAAACR");
 Da(Aa, 9064, "AQAAABsCAAAYAAAAGQAAABoAAAApAAAAKQAAAFwAAAAe");
 Da(Aa, 9108, "AQAAABwCAAA5AAAAOgAAADsAAAAjAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKQAAAD4=");
 Da(Aa, 9172, "AQAAAB0CAAAgAAAAIQAAACIAAAApAAAAKQAAAFwAAAAmAAAAJwAAACg=");
 Da(Aa, 9224, "AQAAAB4CAACcAAAAnQAAAJ4AAACOAAAAjwAAAJAAAACRAAAAmQAAAJoAAACUAAAAoQ==");
 Da(Aa, 9284, "AQAAAB8CAAAgAgAAIQIAAI0AAACOAAAAjwAAAJAAAACRAAAAmQAAAJoAAACU");
 Da(Aa, 9340, "AQAAACICAAAgAgAAIQIAAI0AAACOAAAAjwAAAJAAAACRAAAAmQAAAJoAAACU");
 Da(Aa, 9396, "PwAAACMCAAAkAgAAJQIAAEMAAABEAAAARQAAAEY=");
 Da(Aa, 9436, "PwAAACYCAAAkAgAAJQIAAEMAAABEAAAARQAAAEY=");
 Da(Aa, 9476, "ZAAAACcCAAB5AAAAegAAAGgAAAApAAAAKQAAAFwAAABs");
 Da(Aa, 9520, "VwAAACgCAABZAAAAWgAAAFsAAAApAgAAKgIAAFwAAABP");
 Da(Aa, 9564, "AQAAACsCAAADAAAABAAAAAUAAAApAAAAKQAAAFwAAAAJAAAACgAAAAsAAAAM");
 Da(Aa, 9620, "AQAAACwCAACAAAAAgQAAAIIAAAApAAAAKQAAAFwAAACGAAAAhwAAAIgAAACJ");
 Da(Aa, 9676, "AQAAAC0CAAAyAAAAMwAAADQAAAAjAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKQAAADc=");
 Da(Aa, 9740, "AQAAAC4CAAArAAAALAAAAC0AAAAjAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKQAAADA=");
 Da(Aa, 9804, "VwAAAC8CAABfAAAAYAAAAFsAAAApAgAAKgIAAFwAAABP");
 Da(Aa, 9848, "PwAAADACAAAxAgAAMgIAAEMAAABEAAAARQAAAEY=");
 Da(Aa, 9888, "PwAAADMCAAAxAgAAMgIAAEMAAABEAAAARQAAAEY=");
 Da(Aa, 9928, "VwAAADQCAABJAAAASgAAAEsAAAApAgAAKgIAAFwAAABPAAAAUAAAAFEAAABSAAAAUwAAAFQAAABVAAAAVg==");
 Da(Aa, 1e4, "ZAAAADUCAAA2AgAANwIAAGgAAABpAAAAagAAAGsAAABs");
 Da(Aa, 10044, "ZAAAADgCAAA2AgAANwIAAGgAAABpAAAAagAAAGsAAABs");
 Da(Aa, 10088, "PwAAADkCAAA6AgAAOwIAAEMAAABEAAAARQAAAEY=");
 Da(Aa, 10128, "PwAAADwCAAA6AgAAOwIAAEMAAABEAAAARQAAAEY=");
 Da(Aa, 10168, "AQAAAD0CAACLAAAAjAAAAI0AAACOAAAAjwAAAJAAAACRAAAAmQAAAJoAAACU");
 Da(Aa, 10224, "ZAAAAD4CAAA/AgAAQAIAAEECAABpAAAAagAAAGsAAABsAAAAQgI=");
 Da(Aa, 10272, "ZAAAAEMCAAA/AgAAQAIAAEECAABpAAAAagAAAGsAAABsAAAAQgI=");
 Da(Aa, 10320, "2QAAAEQCAABFAgAARgIAAEcCAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAEgCAABJAgAASgIAAEsCAABMAg==");
 Da(Aa, 10400, "KQ==");
 Da(Aa, 10412, "TQIAAE4CAABPAgAAUAIAAEcCAABRAgAAUgIAAK4AAACvAAAAsAAAAFMCAACyAAAAVAIAAFUCAABWAgAAVwIAAFgCAABZAgAAWgIAAFsCAAC8////AAAAAFwC");
 Da(Aa, 10512, "XQIAAF4CAABfAgAAYAIAAGECAACsAAAAYgIAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAGMCAABkAgAAKQAAACkAAABlAgAAZgIAAGcCAABoAg==");
 Da(Aa, 10604, "2QAAAGkCAABqAgAAawIAAGwCAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAGMC");
 Da(Aa, 10668, "2QAAAG0CAABuAgAAbwIAAHACAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAHEC");
 Da(Aa, 10732, "2QAAAHICAABzAgAAdAIAAHUCAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAHYCAAB3Ag==");
 Da(Aa, 10800, "XQIAAHgCAAB5AgAAegIAAHsCAACsAAAAYgIAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAGMCAABkAgAAKQAAACkAAAB8Ag==");
 Da(Aa, 10880, "2QAAAH0CAAAZAQAAGgEAABsBAAAcAQAAHQEAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAB4BAAAfAQAAIAEAACkAAAApAAAAfgIAAH8CAACAAg==");
 Da(Aa, 10972, "UgEAAIECAAChAQAAogEAAKMBAABBAQAAQgEAAK4AAACvAAAAsAAAAEMBAABEAQAAVAEAALQAAAC1AAAAtgAAALcAAAC4AAAARgEAAEcBAABIAQAASQEAAEoBAABLAQAATAEAAE0BAACpAQ==");
 Da(Aa, 11088, "KQ==");
 Da(Aa, 11100, "2QAAAIICAAAxAQAAMgEAADMBAAAcAQAAHQEAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAB4BAAAfAQAAIAEAACkAAAApAAAAgwIAAIQC");
 Da(Aa, 11188, "2QAAAIUCAAAOAQAADwEAABABAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAABUBAAAWAQAAFwE=");
 Da(Aa, 11260, "2QAAAIYCAAAAAgAAAQIAAAICAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAIcC");
 Da(Aa, 11324, "2QAAAIgCAADqAQAA6wEAAOwBAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAPABAADxAQAA8gEAAPMBAAD0AQAA9QE=");
 Da(Aa, 11408, "KQ==");
 Da(Aa, 11420, "AQAAAIkCAACKAgAAiwIAAIwCAACNAgAAjgIAAFw=");
 Da(Aa, 11460, "AQAAAI8CAACKAgAAiwIAAIwCAAApAAAAKQAAAFw=");
 Da(Aa, 11500, "2QAAAJACAADqAAAA6wAAAOwAAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAO8AAADw");
 Da(Aa, 11568, "2QAAAJECAACpAAAAqgAAAKsAAACsAAAAXgEAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAtgAAALcAAAC4AAAAKQAAACkAAACSAg==");
 Da(Aa, 11660, "2QAAAJMCAACUAgAAlQIAAGgBAACsAAAAXgEAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAtgAAALcAAAC4AAAAKQAAACk=");
 Da(Aa, 11748, "2QAAAJYCAACUAgAAlQIAAGgBAACsAAAAXgEAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAtgAAALcAAAC4AAAAKQAAACk=");
 Da(Aa, 11836, "pwAAAJcCAADCAAAAwwAAAMQAAACsAAAArQAAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAtgAAALcAAAC4AAAAxgAAAMcAAAC7AAAAmAIAAJkC");
 Da(Aa, 11936, "2QAAAJoCAADMAAAAzQAAAM4AAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAANMAAADUAAAA1QAAANYAAADXAAAA2A==");
 Da(Aa, 12020, "2QAAAJsCAADbAAAA3AAAAN0AAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAOIAAADjAAAA5AAAAOUAAADmAAAA5wAAAOg=");
 Da(Aa, 12108, "2QAAAJwCAACdAgAAngIAAJ8CAADtAAAA7gAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAO8AAADwAAAAoAIAAKECAACiAgAAowI=");
 Da(Aa, 12192, "2QAAAKQCAACdAgAAngIAAJ8CAADtAAAA7gAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAO8AAADwAAAAoAIAAKECAACiAgAAowIAAAEAAAAAAAAA/////wIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAP////8CAAAAAgAAAP////8AAAAAAgAAAAIAAAACAAAA/////////////////////wIAAAAAAAAAAgAAAAIAAAACAAAA/////wMAAAADAAAAAg==");
 Da(Aa, 12420, "AgAAAP///////////////wIAAAAC");
 Da(Aa, 12460, "/////wAAAAD/////AQ==");
 Da(Aa, 12484, "Ag==");
 Da(Aa, 12504, "AgAAAAIAAAACAAAAAg==");
 Da(Aa, 12532, "AgAAAP//////////////////////////////////////////AgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAwAAAAIAAAACAAAAAg==");
 Da(Aa, 12636, "AgAAAAIAAAACAAAAAgAAAAIAAAAC");
 Da(Aa, 12668, "AgAAAAIAAAACAAAAAgAAAAIAAAAC");
 Da(Aa, 12708, "AgAAAAIAAAACAAAAAAAAAP////8=");
 Da(Aa, 12744, "AgAAAAIAAAAAAAAAAgAAAAI=");
 Da(Aa, 12772, "//////////////////////////////////////////8BAAAA/////wIAAAAAAAAA/////////////////////////////////////wAAAAD/////AAAAAAAAAAD//////////wAAAAAAAAAAAgAAAAAAAAD/////AAAAAAAAgL8AAIC/AAAAAAAAgL8AAIA/AACAvwAAgL8=");
 Da(Aa, 12938, "gD8AAAAAAACAvwAAgD8AAAAAAACAPwAAgD8AAIA/AAAAAAAAAADZAAAApQIAAGABAABhAQAAYgEAAKwAAABeAQAArgAAAK8AAACwAAAAsQAAALIAAACzAAAAtAAAALUAAAC2AAAAtwAAALgAAABGAQAARwEAAEgBAABJAQ==");
 Da(Aa, 13072, "2QAAAKYCAABmAQAAZwEAAGgBAACsAAAAXgEAAK4AAACvAAAAsAAAALEAAACyAAAAswAAALQAAAC1AAAAtgAAALcAAAC4AAAAKQAAACk=");
 Da(Aa, 13160, "XQIAAKcCAAB5AgAAegIAAHsCAACsAAAAYgIAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAGMCAACoAgAAqQIAAKoCAAB8Ag==");
 Da(Aa, 13240, "2QAAAKsCAABzAgAAdAIAAHUCAACsAgAArQIAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAK4CAACvAg==");
 Da(Aa, 13308, "TQIAALECAABFAgAARgIAAEcCAABRAgAAUgIAAK4AAACvAAAAsAAAAFMCAACyAAAAVAIAAFUCAABWAgAAVwIAAFgCAABZAgAAWgIAAFsCAAC8////AAAAAFwCAABhbGxvY2F0b3I8VD46OmFsbG9jYXRlKHNpemVfdCBuKSAnbicgZXhjZWVkcyBtYXhpbXVtIHN1cHBvcnRlZCBzaXpl");
 Da(Aa, 13476, "TQIAALICAABPAgAAUAIAAEcCAABRAgAAswIAAK4AAACvAAAAsAAAAFMCAACyAAAAVAIAAFUCAABWAgAAVwIAAFgCAABZAgAAWgIAALQCAAC8////AAAAAFwC");
 Da(Aa, 13576, "XQIAALUCAABqAgAAawIAAGwCAACsAAAAYgIAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAGMCAABkAgAAKQAAACk=");
 Da(Aa, 13652, "2QAAALYCAABuAgAAbwIAAHACAAC3AgAAuAIAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAALkCAAC6AgAAzP///wAAAAC7Ag==");
 Da(Aa, 13732, "XQIAALwCAABfAgAAYAIAAGECAACsAAAAYgIAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAGMCAAC9AgAAvgIAAL8CAADAAgAAwQIAAMICAABoAg==");
 Da(Aa, 13824, "wwIAAMQCAADFAgAAxgIAAMcCAACsAAAAyAIAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAAMkCAADKAgAAywIAAMwCAADNAgAAzgIAAMD///8AAAAAzwIAANAC");
 Da(Aa, 13924, "2QAAANECAADFAgAAxgIAAMcCAACsAAAAKQAAAK4AAACvAAAAsAAAAOAAAACyAAAA4QAAANICAADTAgAA1AIAANUC");
 Da(Aa, 14e3, "KQAAACkAAAByZW5kZXJGYWN0b3J5AG1ha2VSZW5kZXJQYWludABtYWtlUmVuZGVyUGF0aABieXRlTGVuZ3RoAHNldABsb2FkAFJlbmRlcmVyAHNhdmUAcmVzdG9yZQB0cmFuc2Zvcm0AZHJhd1BhdGgAY2xpcFBhdGgAYWxpZ24AUmVuZGVyZXJXcmFwcGVyAFJlbmRlclBhdGgAcmVzZXQAYWRkUGF0aABmaWxsUnVsZQBtb3ZlVG8AbGluZVRvAGN1YmljVG8AY2xvc2UAUmVuZGVyUGF0aFdyYXBwZXIAUmVuZGVyUGFpbnRTdHlsZQBmaWxsAHN0cm9rZQBGaWxsUnVsZQBub25aZXJvAGV2ZW5PZGQAU3Ryb2tlQ2FwAGJ1dHQAcm91bmQAc3F1YXJlAFN0cm9rZUpvaW4AbWl0ZXIAYmV2ZWwAQmxlbmRNb2RlAHNyY092ZXIAc2NyZWVuAG92ZXJsYXkAZGFya2VuAGxpZ2h0ZW4AY29sb3JEb2RnZQBjb2xvckJ1cm4AaGFyZExpZ2h0AHNvZnRMaWdodABkaWZmZXJlbmNlAGV4Y2x1c2lvbgBtdWx0aXBseQBodWUAc2F0dXJhdGlvbgBjb2xvcgBsdW1pbm9zaXR5AFJlbmRlclBhaW50AHN0eWxlAHRoaWNrbmVzcwBqb2luAGNhcABibGVuZE1vZGUAbGluZWFyR3JhZGllbnQAcmFkaWFsR3JhZGllbnQAYWRkU3RvcABjb21wbGV0ZUdyYWRpZW50AFJlbmRlclBhaW50V3JhcHBlcgBNYXQyRAB4eAB4eQB5eAB5eQB0eAB0eQBGaWxlAGRlZmF1bHRBcnRib2FyZABhcnRib2FyZEJ5TmFtZQBhcnRib2FyZEJ5SW5kZXgAYXJ0Ym9hcmRDb3VudABBcnRib2FyZABuYW1lAGFkdmFuY2UAZHJhdwB0cmFuc2Zvcm1Db21wb25lbnQAbm9kZQBib25lAHJvb3RCb25lAGFuaW1hdGlvbkJ5SW5kZXgAYW5pbWF0aW9uQnlOYW1lAGFuaW1hdGlvbkNvdW50AHN0YXRlTWFjaGluZUJ5SW5kZXgAc3RhdGVNYWNoaW5lQnlOYW1lAHN0YXRlTWFjaGluZUNvdW50AGJvdW5kcwBUcmFuc2Zvcm1Db21wb25lbnQAc2NhbGVYAHNjYWxlWQByb3RhdGlvbgBOb2RlAHgAeQBCb25lAGxlbmd0aABSb290Qm9uZQBBbmltYXRpb24ATGluZWFyQW5pbWF0aW9uAGR1cmF0aW9uAGZwcwB3b3JrU3RhcnQAd29ya0VuZABlbmFibGVXb3JrQXJlYQBsb29wVmFsdWUAc3BlZWQAYXBwbHkATGluZWFyQW5pbWF0aW9uSW5zdGFuY2UAdGltZQBkaWRMb29wAFNNSUlucHV0AHR5cGUAYm9vbAAAOwBudW1iZXIAADgAdHJpZ2dlcgA6AGFzQm9vbABhc051bWJlcgBhc1RyaWdnZXIAU01JQm9vbAB2YWx1ZQBTTUlOdW1iZXIAU01JVHJpZ2dlcgBmaXJlAFN0YXRlTWFjaGluZQBTdGF0ZU1hY2hpbmVJbnN0YW5jZQBpbnB1dENvdW50AGlucHV0AEZpdABjb250YWluAGNvdmVyAGZpdFdpZHRoAGZpdEhlaWdodABub25lAHNjYWxlRG93bgBBbGlnbm1lbnQAdG9wTGVmdAB0b3BDZW50ZXIAdG9wUmlnaHQAY2VudGVyTGVmdABjZW50ZXIAY2VudGVyUmlnaHQAYm90dG9tTGVmdABib3R0b21DZW50ZXIAYm90dG9tUmlnaHQAQUFCQgBtaW5YAG1pblkAbWF4WABtYXhZAACEVwAAhVcAAIZXAACHVwAAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQCUVwAAhFcAAJVXAACEVwAAaWlpAGlpAHYAdmkAlFcAAJpXAAB2aWkAlFcAAJpXAACbVwAAdmlpaQ==");
 Da(Aa, 15568, "lFcAAJpXAACGVwAAhVcAAHZpaWlpAAAAlFcAAJpXAACGVw==");
 Da(Aa, 15616, "lFcAAJdXAACcVwAAnVcAAJ5XAACeVwAAdmlpaWlpaQBub3RpZnlPbkRlc3RydWN0aW9uAGltcGxlbWVudABleHRlbmQAAAAAlFcAAJlXAACaVwAAhFc=");
 Da(Aa, 15712, "vgMAAL8DAADAAwAAwQMAAMIDAADDAwAAxAM=");
 Da(Aa, 15748, "vgMAAMUDAAApAAAAKQAAACkAAAApAAAAKQ==");
 Da(Aa, 15784, "xgMAAMcDAAApAAAAKQAAACkAAAApAAAAKQAAAF9fZGVzdHJ1Y3QAAJRXAACUVwAAm1cAAJRXAACGVwAAhVcAAJRXAACGVwAAhFcAAMBXAACEVwAAaWlpaQAAAACUVwAAxFcAAAAAAACUVwAAxFcAAIZXAACbVwAAlFcAAMRXAADFVwAAAAAAAJRXAADEVwAAxlcAAMZXAAB2aWlmZg==");
 Da(Aa, 15952, "lFcAAMRXAADGVwAAxlcAAMZXAADGVwAAxlcAAMZXAAB2aWlmZmZmZmYAAACUVwAAw1cAAMRXAACEVw==");
 Da(Aa, 16020, "yAMAAMkDAADKAwAAywMAAMwDAADNAwAAzgMAAM8DAADQAwAA0QMAANID");
 Da(Aa, 16072, "yAMAANMDAAApAAAAKQAAAMwDAAApAAAAKQAAACkAAAApAAAA0QMAACk=");
 Da(Aa, 16124, "kQEAANQDAAApAAAAKQAAAMwDAAApAAAAKQAAACkAAAApAAAA0QMAACkAAACUVwAAxVcAAJRXAADGVwAAxlcAAAAAAACUVwAAxlcAAMZXAADGVwAAxlcAAMZXAADGVwAAlFcAAIZXAACbVwAAlFcAAO9XAACHVwAAlFcAAO9XAADoVwAAlFcAAO9XAADGVwAAdmlpZgAAAACUVwAA71cAAOpXAACUVwAA71cAAOlXAACUVwAA71cAAOtX");
 Da(Aa, 16320, "lFcAAO9XAADGVwAAxlcAAMZXAADGVwAAdmlpZmZmZgCUVwAA71cAAIdXAADGVwAAdmlpaWYAAACUVwAA71cAAJRXAADuVwAA71cAAIRX");
 Da(Aa, 16408, "1QMAANYDAADXAwAA2AMAANkDAADaAwAA2wMAANwDAADdAwAA3gMAAN8DAADgAw==");
 Da(Aa, 16464, "KQAAACkAAAApAAAAKQAAACkAAAApAAAAKQAAACkAAAApAAAAKQAAAN8DAADhAw==");
 Da(Aa, 16520, "KQAAACkAAAApAAAAKQAAACkAAAApAAAAKQAAACkAAAApAAAAKQAAAOIDAADjAwAAlFcAAOhXAACUVwAAh1cAAJRXAADGVwAAlFcAAOpXAACUVwAA6VcAAJRXAADrVw==");
 Da(Aa, 16624, "lFcAAMZXAADGVwAAxlcAAMZXAACUVwAAh1cAAMZXAABmaWkAOFgAADdYAAA4WAAAN1gAAMBXAAA4WAAAN1gAADlYAAA5WAAAN1gAADxYAAA4WAAAPVgAAGlpaWQAAAAAlFcAADhYAACXVwAAPlgAADhYAADAVwAAP1gAADhYAADAVwAAQFgAADhYAADAVwAAQVgAADhYAADAVwAAQlgAADtYAAA5WAAAQlgAADtYAADAVwAAOVgAADtYAABDWAAAO1gAADlYAABDWAAAO1gAAMBX");
 Da(Aa, 16848, "lFcAAFBYAAA4WAAAxlcAAMZXAAB2aWlpZmYAAFNYAABCWAAAPFgAAFNYAADGVwAAaWlpZg==");
 Da(Aa, 16912, "lFcAAFRYAAA4WAAAxlcAAFlYAABVWAAAWlgAAFVYAABbWAAAVVgAAJRXAABbWAAAZVgAAENYAAA8WAAAZVgAAMZXAACUVwAAZlgAADhYAAA5WAAAZlgAAFZYAABmWAAAOVgAAGkAJXAAdm9pZABib29sAGNoYXIAc2lnbmVkIGNoYXIAdW5zaWduZWQgY2hhcgBzaG9ydAB1bnNpZ25lZCBzaG9ydABpbnQAdW5zaWduZWQgaW50AGxvbmcAdW5zaWduZWQgbG9uZwBmbG9hdABkb3VibGUAc3RkOjpzdHJpbmcAc3RkOjpiYXNpY19zdHJpbmc8dW5zaWduZWQgY2hhcj4Ac3RkOjp3c3RyaW5nAHN0ZDo6dTE2c3RyaW5nAHN0ZDo6dTMyc3RyaW5nAGVtc2NyaXB0ZW46OnZhbABlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8bG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgbG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGZsb2F0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxkb3VibGU+AAADAAAABAAAAAQAAAAGAAAAg/miAERObgD8KRUA0VcnAN009QBi28AAPJmVAEGQQwBjUf4Au96rALdhxQA6biQA0k1CAEkG4AAJ6i4AHJLRAOsd/gApsRwA6D6nAPU1ggBEuy4AnOmEALQmcABBfl8A1pE5AFODOQCc9DkAi1+EACj5vQD4HzsA3v+XAA+YBQARL+8AClqLAG0fbQDPfjYACcsnAEZPtwCeZj8ALepfALondQDl68cAPXvxAPc5BwCSUooA+2vqAB+xXwAIXY0AMANWAHv8RgDwq2sAILzPADb0mgDjqR0AXmGRAAgb5gCFmWUAoBRfAI1AaACA2P8AJ3NNAAYGMQDKVhUAyahzAHviYABrjMAAGcRHAM1nwwAJ6NwAWYMqAIt2xACmHJYARK/dABlX0QClPgUABQf/ADN+PwDCMugAmE/eALt9MgAmPcMAHmvvAJ/4XgA1HzoAf/LKAPGHHQB8kCEAaiR8ANVu+gAwLXcAFTtDALUUxgDDGZ0ArcTCACxNQQAMAF0Ahn1GAONxLQCbxpoAM2IAALTSfAC0p5cAN1XVANc+9gCjEBgATXb8AGSdKgBw16sAY3z4AHqwVwAXFecAwElWADvW2QCnhDgAJCPLANaKdwBaVCMAAB+5APEKGwAZzt8AnzH/AGYeagCZV2EArPtHAH5/2AAiZbcAMuiJAOa/YADvxM0AbDYJAF0/1AAW3tcAWDveAN6bkgDSIigAKIboAOJYTQDGyjIACOMWAOB9ywAXwFAA8x2nABjgWwAuEzQAgxJiAINIAQD1jlsArbB/AB7p8gBISkMAEGfTAKrd2ACuX0IAamHOAAoopADTmbQABqbyAFx3fwCjwoMAYTyIAIpzeACvjFoAb9e9AC2mYwD0v8sAjYHvACbBZwBVykUAytk2ACio0gDCYY0AEsl3AAQmFAASRpsAxFnEAMjFRABNspEAABfzANRDrQApSeUA/dUQAAC+/AAelMwAcM7uABM+9QDs8YAAs+fDAMf4KACTBZQAwXE+AC4JswALRfMAiBKcAKsgewAutZ8AR5LCAHsyLwAMVW0AcqeQAGvnHwAxy5YAeRZKAEF54gD034kA6JSXAOLmhACZMZcAiO1rAF9fNgC7/Q4ASJq0AGekbABxckIAjV0yAJ8VuAC85QkAjTElAPd0OQAwBRwADQwBAEsIaAAs7lgAR6qQAHTnAgC91iQA932mAG5IcgCfFu8AjpSmALSR9gDRU1EAzwryACCYMwD1S34AsmNoAN0+XwBAXQMAhYl/AFVSKQA3ZMAAbdgQADJIMgBbTHUATnHUAEVUbgALCcEAKvVpABRm1QAnB50AXQRQALQ72wDqdsUAh/kXAElrfQAdJ7oAlmkpAMbMrACtFFQAkOJqAIjZiQAsclAABKS+AHcHlADzMHAAAPwnAOpxqABmwkkAZOA9AJfdgwCjP5cAQ5T9AA2GjAAxQd4AkjmdAN1wjAAXt+cACN87ABU3KwBcgKAAWoCTABARkgAP6NgAbICvANv/SwA4kA8AWRh2AGKlFQBhy7sAx4m5ABBAvQDS8gQASXUnAOu29gDbIrsAChSqAIkmLwBkg3YACTszAA6UGgBROqoAHaPCAK/trgBcJhIAbcJNAC16nADAVpcAAz+DAAnw9gArQIwAbTGZADm0BwAMIBUA2MNbAPWSxADGrUsATsqlAKc3zQDmqTYAq5KUAN1CaAAZY94AdozvAGiLUgD82zcArqGrAN8VMQAArqEADPvaAGRNZgDtBbcAKWUwAFdWvwBH/zoAavm5AHW+8wAok98Aq4AwAGaM9gAEyxUA+iIGANnkHQA9s6QAVxuPADbNCQBOQukAE76kADMjtQDwqhoAT2WoANLBpQALPw8AW3jNACP5dgB7iwQAiRdyAMamUwBvbuIA7+sAAJtKWADE2rcAqma6AHbPzwDRAh0AsfEtAIyZwQDDrXcAhkjaAPddoADGgPQArPAvAN3smgA/XLwA0N5tAJDHHwAq27YAoyU6AACvmgCtU5MAtlcEACkttABLgH4A2genAHaqDgB7WaEAFhIqANy3LQD65f0Aidv+AIm+/QDkdmwABqn8AD6AcACFbhUA/Yf/ACg+BwBhZzMAKhiGAE296gCz568Aj21uAJVnOQAxv1sAhNdIADDfFgDHLUMAJWE1AMlwzgAwy7gAv2z9AKQAogAFbOQAWt2gACFvRwBiEtIAuVyEAHBhSQBrVuAAmVIBAFBVNwAe1bcAM/HEABNuXwBdMOQAhS6pAB2ywwChMjYACLekAOqx1AAW9yEAj2nkACf/dwAMA4AAjUAtAE/NoAAgpZkAs6LTAC9dCgC0+UIAEdrLAH2+0ACb28EAqxe9AMqigQAIalwALlUXACcAVQB/FPAA4QeGABQLZACWQY0Ah77eANr9KgBrJbYAe4k0AAXz/gC5v54AaGpPAEoqqABPxFoALfi8ANdamAD0x5UADU2NACA6pgCkV18AFD+xAIA4lQDMIAEAcd2GAMnetgC/YPUATWURAAEHawCMsKwAssDQAFFVSAAe+w4AlXLDAKMGOwDAQDUABtx7AOBFzABOKfoA1srIAOjzQQB8ZN4Am2TYANm+MQCkl8MAd1jUAGnjxQDw2hMAujo8AEYYRgBVdV8A0r31AG6SxgCsLl0ADkTtABw+QgBhxIcAKf3pAOfW8wAifMoAb5E1AAjgxQD/140AbmriALD9xgCTCMEAfF10AGutsgDNbp0APnJ7AMYRagD3z6kAKXPfALXJugC3AFEA4rINAHS6JADlfWAAdNiKAA0VLACBGAwAfmaUAAEpFgCfenYA/f2+AFZF7wDZfjYA7NkTAIu6uQDEl/wAMagnAPFuwwCUxTYA2KhWALSotQDPzA4AEoktAG9XNAAsVokAmc7jANYguQBrXqoAPiqcABFfzAD9C0oA4fT7AI47bQDihiwA6dSEAPy0qQDv7tEALjXJAC85YQA4IUQAG9nIAIH8CgD7SmoALxzYAFO0hABOmYwAVCLMACpV3ADAxtYACxmWABpwuABplWQAJlpgAD9S7gB/EQ8A9LURAPzL9QA0vC0ANLzuAOhdzADdXmAAZ46bAJIz7wDJF7gAYVibAOFXvABRg8YA2D4QAN1xSAAtHN0ArxihACEsRgBZ89cA2XqYAJ5UwABPhvoAVgb8AOV5rgCJIjYAOK0iAGeT3ABV6KoAgiY4AMrnmwBRDaQAmTOxAKnXDgBpBUgAZbLwAH+IpwCITJcA+dE2ACGSswB7gkoAmM8hAECf3ADcR1UA4XQ6AGfrQgD+nd8AXtRfAHtnpAC6rHoAVfaiACuIIwBBulUAWW4IACEqhgA5R4MAiePmAOWe1ABJ+0AA/1bpABwPygDFWYoAlPorANPBxQAPxc8A21quAEfFhgCFQ2IAIYY7ACx5lAAQYYcAKkx7AIAsGgBDvxIAiCaQAHg8iQCoxOQA5dt7AMQ6wgAm9OoA92eKAA2SvwBloysAPZOxAL18CwCkUdwAJ91jAGnh3QCalBkAqCmVAGjOKAAJ7bQARJ8gAE6YygBwgmMAfnwjAA+5MgCn9Y4AFFbnACHxCAC1nSoAb35NAKUZUQC1+asAgt/WAJbdYQAWNgIAxDqfAIOioQBy7W0AOY16AIK4qQBrMlwARidbAAA07QDSAHcA/PRVAAFZTQDgcYA=");
 Da(Aa, 20595, "QPsh+T8AAAAALUR0PgAAAICYRvg8AAAAYFHMeDsAAACAgxvwOQAAAEAgJXo4AAAAgCKC4zYAAAAAHfNpNbhVAAAtKyAgIDBYMHgAKG51bGwp");
 Da(Aa, 20688, "EQAKABEREQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAARAA8KERERAwoHAAEACQsLAAAJBgsAAAsABhEAAAARERE=");
 Da(Aa, 20769, "CwAAAAAAAAAAEQAKChEREQAKAAACAAkLAAAACQALAAAL");
 Da(Aa, 20827, "DA==");
 Da(Aa, 20839, "DAAAAAAMAAAAAAkMAAAAAAAMAAAM");
 Da(Aa, 20885, "Dg==");
 Da(Aa, 20897, "DQAAAAQNAAAAAAkOAAAAAAAOAAAO");
 Da(Aa, 20943, "EA==");
 Da(Aa, 20955, "DwAAAAAPAAAAAAkQAAAAAAAQAAAQAAASAAAAEhIS");
 Da(Aa, 21010, "EgAAABISEgAAAAAAAAk=");
 Da(Aa, 21059, "Cw==");
 Da(Aa, 21071, "CgAAAAAKAAAAAAkLAAAAAAALAAAL");
 Da(Aa, 21117, "DA==");
 Da(Aa, 21129, "DAAAAAAMAAAAAAkMAAAAAAAMAAAMAAAwMTIzNDU2Nzg5QUJDREVGLTBYKzBYIDBYLTB4KzB4IDB4AGluZgBJTkYAbmFuAE5BTgAu");
 Da(Aa, 21244, "6gM=");
 Da(Aa, 21283, "//////8=");
 Da(Aa, 21364, "AgAAAAMAAAAFAAAABwAAAAsAAAANAAAAEQAAABMAAAAXAAAAHQAAAB8AAAAlAAAAKQAAACsAAAAvAAAANQAAADsAAAA9AAAAQwAAAEcAAABJAAAATwAAAFMAAABZAAAAYQAAAGUAAABnAAAAawAAAG0AAABxAAAAfwAAAIMAAACJAAAAiwAAAJUAAACXAAAAnQAAAKMAAACnAAAArQAAALMAAAC1AAAAvwAAAMEAAADFAAAAxwAAANMAAAABAAAACwAAAA0AAAARAAAAEwAAABcAAAAdAAAAHwAAACUAAAApAAAAKwAAAC8AAAA1AAAAOwAAAD0AAABDAAAARwAAAEkAAABPAAAAUwAAAFkAAABhAAAAZQAAAGcAAABrAAAAbQAAAHEAAAB5AAAAfwAAAIMAAACJAAAAiwAAAI8AAACVAAAAlwAAAJ0AAACjAAAApwAAAKkAAACtAAAAswAAALUAAAC7AAAAvwAAAMEAAADFAAAAxwAAANEAAABfX25leHRfcHJpbWUgb3ZlcmZsb3cAYmFzaWNfc3RyaW5nAGFsbG9jYXRvcjxUPjo6YWxsb2NhdGUoc2l6ZV90IG4pICduJyBleGNlZWRzIG1heGltdW0gc3VwcG9ydGVkIHNpemUAdmVjdG9yAF9fY3hhX2d1YXJkX2FjcXVpcmUgZGV0ZWN0ZWQgcmVjdXJzaXZlIGluaXRpYWxpemF0aW9uAFB1cmUgdmlydHVhbCBmdW5jdGlvbiBjYWxsZWQh");
 Da(Aa, 21944, "BQ==");
 Da(Aa, 21956, "5QM=");
 Da(Aa, 21980, "5gMAAOcDAACFWA==");
 Da(Aa, 22004, "Ag==");
 Da(Aa, 22019, "//////8=");
 Da(Aa, 22264, "tFg=");
 return k({
  "Int8Array": Int8Array,
  "Int16Array": Int16Array,
  "Int32Array": Int32Array,
  "Uint8Array": Uint8Array,
  "Uint16Array": Uint16Array,
  "Uint32Array": Uint32Array,
  "Float32Array": Float32Array,
  "Float64Array": Float64Array,
  "NaN": NaN,
  "Infinity": Infinity,
  "Math": Math
 }, asmLibraryArg, wasmMemory.buffer);
}


// EMSCRIPTEN_END_ASM




)(asmLibraryArg, wasmMemory, wasmTable);
 },
 instantiate: function(binary, info) {
  return {
   then: function(ok) {
    var module = new WebAssembly.Module(binary);
    ok({
     "instance": new WebAssembly.Instance(module)
    });
   }
  };
 },
 RuntimeError: Error
};

wasmBinary = [];

if (typeof WebAssembly !== "object") {
 abort("no native wasm support detected");
}

var wasmMemory;

var wasmTable = new WebAssembly.Table({
 "initial": 1003,
 "maximum": 1003 + 0,
 "element": "anyfunc"
});

var ABORT = false;

var EXITSTATUS = 0;

function assert(condition, text) {
 if (!condition) {
  abort("Assertion failed: " + text);
 }
}

var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;

function UTF8ArrayToString(heap, idx, maxBytesToRead) {
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
  return UTF8Decoder.decode(heap.subarray(idx, endPtr));
 } else {
  var str = "";
  while (idx < endPtr) {
   var u0 = heap[idx++];
   if (!(u0 & 128)) {
    str += String.fromCharCode(u0);
    continue;
   }
   var u1 = heap[idx++] & 63;
   if ((u0 & 224) == 192) {
    str += String.fromCharCode((u0 & 31) << 6 | u1);
    continue;
   }
   var u2 = heap[idx++] & 63;
   if ((u0 & 240) == 224) {
    u0 = (u0 & 15) << 12 | u1 << 6 | u2;
   } else {
    u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
   }
   if (u0 < 65536) {
    str += String.fromCharCode(u0);
   } else {
    var ch = u0 - 65536;
    str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
   }
  }
 }
 return str;
}

function UTF8ToString(ptr, maxBytesToRead) {
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
}

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | u1 & 1023;
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   heap[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   heap[outIdx++] = 192 | u >> 6;
   heap[outIdx++] = 128 | u & 63;
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   heap[outIdx++] = 224 | u >> 12;
   heap[outIdx++] = 128 | u >> 6 & 63;
   heap[outIdx++] = 128 | u & 63;
  } else {
   if (outIdx + 3 >= endIdx) break;
   heap[outIdx++] = 240 | u >> 18;
   heap[outIdx++] = 128 | u >> 12 & 63;
   heap[outIdx++] = 128 | u >> 6 & 63;
   heap[outIdx++] = 128 | u & 63;
  }
 }
 heap[outIdx] = 0;
 return outIdx - startIdx;
}

function stringToUTF8(str, outPtr, maxBytesToWrite) {
 return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}

function lengthBytesUTF8(str) {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
  if (u <= 127) ++len; else if (u <= 2047) len += 2; else if (u <= 65535) len += 3; else len += 4;
 }
 return len;
}

var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;

function UTF16ToString(ptr, maxBytesToRead) {
 var endPtr = ptr;
 var idx = endPtr >> 1;
 var maxIdx = idx + maxBytesToRead / 2;
 while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
 endPtr = idx << 1;
 if (endPtr - ptr > 32 && UTF16Decoder) {
  return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
 } else {
  var i = 0;
  var str = "";
  while (1) {
   var codeUnit = HEAP16[ptr + i * 2 >> 1];
   if (codeUnit == 0 || i == maxBytesToRead / 2) return str;
   ++i;
   str += String.fromCharCode(codeUnit);
  }
 }
}

function stringToUTF16(str, outPtr, maxBytesToWrite) {
 if (maxBytesToWrite === undefined) {
  maxBytesToWrite = 2147483647;
 }
 if (maxBytesToWrite < 2) return 0;
 maxBytesToWrite -= 2;
 var startPtr = outPtr;
 var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
 for (var i = 0; i < numCharsToWrite; ++i) {
  var codeUnit = str.charCodeAt(i);
  HEAP16[outPtr >> 1] = codeUnit;
  outPtr += 2;
 }
 HEAP16[outPtr >> 1] = 0;
 return outPtr - startPtr;
}

function lengthBytesUTF16(str) {
 return str.length * 2;
}

function UTF32ToString(ptr, maxBytesToRead) {
 var i = 0;
 var str = "";
 while (!(i >= maxBytesToRead / 4)) {
  var utf32 = HEAP32[ptr + i * 4 >> 2];
  if (utf32 == 0) break;
  ++i;
  if (utf32 >= 65536) {
   var ch = utf32 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  } else {
   str += String.fromCharCode(utf32);
  }
 }
 return str;
}

function stringToUTF32(str, outPtr, maxBytesToWrite) {
 if (maxBytesToWrite === undefined) {
  maxBytesToWrite = 2147483647;
 }
 if (maxBytesToWrite < 4) return 0;
 var startPtr = outPtr;
 var endPtr = startPtr + maxBytesToWrite - 4;
 for (var i = 0; i < str.length; ++i) {
  var codeUnit = str.charCodeAt(i);
  if (codeUnit >= 55296 && codeUnit <= 57343) {
   var trailSurrogate = str.charCodeAt(++i);
   codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
  }
  HEAP32[outPtr >> 2] = codeUnit;
  outPtr += 4;
  if (outPtr + 4 > endPtr) break;
 }
 HEAP32[outPtr >> 2] = 0;
 return outPtr - startPtr;
}

function lengthBytesUTF32(str) {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var codeUnit = str.charCodeAt(i);
  if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
  len += 4;
 }
 return len;
}

var WASM_PAGE_SIZE = 65536;

function alignUp(x, multiple) {
 if (x % multiple > 0) {
  x += multiple - x % multiple;
 }
 return x;
}

var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateGlobalBufferAndViews(buf) {
 buffer = buf;
 Module["HEAP8"] = HEAP8 = new Int8Array(buf);
 Module["HEAP16"] = HEAP16 = new Int16Array(buf);
 Module["HEAP32"] = HEAP32 = new Int32Array(buf);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
}

var DYNAMIC_BASE = 5266272, DYNAMICTOP_PTR = 23232;

var INITIAL_INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;

if (Module["wasmMemory"]) {
 wasmMemory = Module["wasmMemory"];
} else {
 wasmMemory = new WebAssembly.Memory({
  "initial": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
  "maximum": 2147483648 / WASM_PAGE_SIZE
 });
}

if (wasmMemory) {
 buffer = wasmMemory.buffer;
}

INITIAL_INITIAL_MEMORY = buffer.byteLength;

updateGlobalBufferAndViews(buffer);

HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

function callRuntimeCallbacks(callbacks) {
 while (callbacks.length > 0) {
  var callback = callbacks.shift();
  if (typeof callback == "function") {
   callback(Module);
   continue;
  }
  var func = callback.func;
  if (typeof func === "number") {
   if (callback.arg === undefined) {
    Module["dynCall_v"](func);
   } else {
    Module["dynCall_vi"](func, callback.arg);
   }
  } else {
   func(callback.arg === undefined ? null : callback.arg);
  }
 }
}

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATMAIN__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 runtimeInitialized = true;
 callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
 callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

function addRunDependency(id) {
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
}

function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

Module["preloadedImages"] = {};

Module["preloadedAudios"] = {};

function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 what += "";
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
 var e = new WebAssembly.RuntimeError(what);
 readyPromiseReject(e);
 throw e;
}

function hasPrefix(str, prefix) {
 return String.prototype.startsWith ? str.startsWith(prefix) : str.indexOf(prefix) === 0;
}

var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
 return hasPrefix(filename, dataURIPrefix);
}

var fileURIPrefix = "file://";

function isFileURI(filename) {
 return hasPrefix(filename, fileURIPrefix);
}

var wasmBinaryFile = "";

if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary() {
 try {
  if (wasmBinary) {
   return new Uint8Array(wasmBinary);
  }
  var binary = tryParseAsDataURI(wasmBinaryFile);
  if (binary) {
   return binary;
  }
  if (readBinary) {
   return readBinary(wasmBinaryFile);
  } else {
   throw "both async and sync fetching of the wasm failed";
  }
 } catch (err) {
  abort(err);
 }
}

function getBinaryPromise() {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function" && !isFileURI(wasmBinaryFile)) {
  return fetch(wasmBinaryFile, {
   credentials: "same-origin"
  }).then(function(response) {
   if (!response["ok"]) {
    throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
   }
   return response["arrayBuffer"]();
  }).catch(function() {
   return getBinary();
  });
 }
 return Promise.resolve().then(getBinary);
}

function createWasm() {
 var info = {
  "a": asmLibraryArg
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  Module["asm"] = exports;
  removeRunDependency("wasm-instantiate");
 }
 addRunDependency("wasm-instantiate");
 function receiveInstantiatedSource(output) {
  receiveInstance(output["instance"]);
 }
 function instantiateArrayBuffer(receiver) {
  return getBinaryPromise().then(function(binary) {
   return WebAssembly.instantiate(binary, info);
  }).then(receiver, function(reason) {
   err("failed to asynchronously prepare wasm: " + reason);
   abort(reason);
  });
 }
 function instantiateAsync() {
  if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && typeof fetch === "function") {
   fetch(wasmBinaryFile, {
    credentials: "same-origin"
   }).then(function(response) {
    var result = WebAssembly.instantiateStreaming(response, info);
    return result.then(receiveInstantiatedSource, function(reason) {
     err("wasm streaming compile failed: " + reason);
     err("falling back to ArrayBuffer instantiation");
     return instantiateArrayBuffer(receiveInstantiatedSource);
    });
   });
  } else {
   return instantiateArrayBuffer(receiveInstantiatedSource);
  }
 }
 if (Module["instantiateWasm"]) {
  try {
   var exports = Module["instantiateWasm"](info, receiveInstance);
   return exports;
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   return false;
  }
 }
 instantiateAsync();
 return {};
}

__ATINIT__.push({
 func: function() {
  ___wasm_call_ctors();
 }
});

var char_0 = 48;

var char_9 = 57;

function makeLegalFunctionName(name) {
 if (undefined === name) {
  return "_unknown";
 }
 name = name.replace(/[^a-zA-Z0-9_]/g, "$");
 var f = name.charCodeAt(0);
 if (f >= char_0 && f <= char_9) {
  return "_" + name;
 } else {
  return name;
 }
}

function createNamedFunction(name, body) {
 name = makeLegalFunctionName(name);
 return new Function("body", "return function " + name + "() {\n" + '    "use strict";' + "    return body.apply(this, arguments);\n" + "};\n")(body);
}

var emval_free_list = [];

var emval_handle_array = [ {}, {
 value: undefined
}, {
 value: null
}, {
 value: true
}, {
 value: false
} ];

function count_emval_handles() {
 var count = 0;
 for (var i = 5; i < emval_handle_array.length; ++i) {
  if (emval_handle_array[i] !== undefined) {
   ++count;
  }
 }
 return count;
}

function get_first_emval() {
 for (var i = 5; i < emval_handle_array.length; ++i) {
  if (emval_handle_array[i] !== undefined) {
   return emval_handle_array[i];
  }
 }
 return null;
}

function init_emval() {
 Module["count_emval_handles"] = count_emval_handles;
 Module["get_first_emval"] = get_first_emval;
}

function __emval_register(value) {
 switch (value) {
 case undefined:
  {
   return 1;
  }

 case null:
  {
   return 2;
  }

 case true:
  {
   return 3;
  }

 case false:
  {
   return 4;
  }

 default:
  {
   var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
   emval_handle_array[handle] = {
    refcount: 1,
    value: value
   };
   return handle;
  }
 }
}

function extendError(baseErrorType, errorName) {
 var errorClass = createNamedFunction(errorName, function(message) {
  this.name = errorName;
  this.message = message;
  var stack = new Error(message).stack;
  if (stack !== undefined) {
   this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
  }
 });
 errorClass.prototype = Object.create(baseErrorType.prototype);
 errorClass.prototype.constructor = errorClass;
 errorClass.prototype.toString = function() {
  if (this.message === undefined) {
   return this.name;
  } else {
   return this.name + ": " + this.message;
  }
 };
 return errorClass;
}

var PureVirtualError = undefined;

function embind_init_charCodes() {
 var codes = new Array(256);
 for (var i = 0; i < 256; ++i) {
  codes[i] = String.fromCharCode(i);
 }
 embind_charCodes = codes;
}

var embind_charCodes = undefined;

function readLatin1String(ptr) {
 var ret = "";
 var c = ptr;
 while (HEAPU8[c]) {
  ret += embind_charCodes[HEAPU8[c++]];
 }
 return ret;
}

function getInheritedInstanceCount() {
 return Object.keys(registeredInstances).length;
}

function getLiveInheritedInstances() {
 var rv = [];
 for (var k in registeredInstances) {
  if (registeredInstances.hasOwnProperty(k)) {
   rv.push(registeredInstances[k]);
  }
 }
 return rv;
}

var deletionQueue = [];

function flushPendingDeletes() {
 while (deletionQueue.length) {
  var obj = deletionQueue.pop();
  obj.$$.deleteScheduled = false;
  obj["delete"]();
 }
}

var delayFunction = undefined;

function setDelayFunction(fn) {
 delayFunction = fn;
 if (deletionQueue.length && delayFunction) {
  delayFunction(flushPendingDeletes);
 }
}

function init_embind() {
 Module["getInheritedInstanceCount"] = getInheritedInstanceCount;
 Module["getLiveInheritedInstances"] = getLiveInheritedInstances;
 Module["flushPendingDeletes"] = flushPendingDeletes;
 Module["setDelayFunction"] = setDelayFunction;
}

var registeredInstances = {};

var BindingError = undefined;

function throwBindingError(message) {
 throw new BindingError(message);
}

function getBasestPointer(class_, ptr) {
 if (ptr === undefined) {
  throwBindingError("ptr should not be undefined");
 }
 while (class_.baseClass) {
  ptr = class_.upcast(ptr);
  class_ = class_.baseClass;
 }
 return ptr;
}

function registerInheritedInstance(class_, ptr, instance) {
 ptr = getBasestPointer(class_, ptr);
 if (registeredInstances.hasOwnProperty(ptr)) {
  throwBindingError("Tried to register registered instance: " + ptr);
 } else {
  registeredInstances[ptr] = instance;
 }
}

function requireHandle(handle) {
 if (!handle) {
  throwBindingError("Cannot use deleted val. handle = " + handle);
 }
 return emval_handle_array[handle].value;
}

var registeredTypes = {};

function getTypeName(type) {
 var ptr = ___getTypeName(type);
 var rv = readLatin1String(ptr);
 _free(ptr);
 return rv;
}

function requireRegisteredType(rawType, humanName) {
 var impl = registeredTypes[rawType];
 if (undefined === impl) {
  throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
 }
 return impl;
}

function unregisterInheritedInstance(class_, ptr) {
 ptr = getBasestPointer(class_, ptr);
 if (registeredInstances.hasOwnProperty(ptr)) {
  delete registeredInstances[ptr];
 } else {
  throwBindingError("Tried to unregister unregistered instance: " + ptr);
 }
}

function detachFinalizer(handle) {}

var finalizationGroup = false;

function runDestructor($$) {
 if ($$.smartPtr) {
  $$.smartPtrType.rawDestructor($$.smartPtr);
 } else {
  $$.ptrType.registeredClass.rawDestructor($$.ptr);
 }
}

function releaseClassHandle($$) {
 $$.count.value -= 1;
 var toDelete = 0 === $$.count.value;
 if (toDelete) {
  runDestructor($$);
 }
}

function attachFinalizer(handle) {
 if ("undefined" === typeof FinalizationGroup) {
  attachFinalizer = function(handle) {
   return handle;
  };
  return handle;
 }
 finalizationGroup = new FinalizationGroup(function(iter) {
  for (var result = iter.next(); !result.done; result = iter.next()) {
   var $$ = result.value;
   if (!$$.ptr) {
    console.warn("object already deleted: " + $$.ptr);
   } else {
    releaseClassHandle($$);
   }
  }
 });
 attachFinalizer = function(handle) {
  finalizationGroup.register(handle, handle.$$, handle.$$);
  return handle;
 };
 detachFinalizer = function(handle) {
  finalizationGroup.unregister(handle.$$);
 };
 return attachFinalizer(handle);
}

function __embind_create_inheriting_constructor(constructorName, wrapperType, properties) {
 constructorName = readLatin1String(constructorName);
 wrapperType = requireRegisteredType(wrapperType, "wrapper");
 properties = requireHandle(properties);
 var arraySlice = [].slice;
 var registeredClass = wrapperType.registeredClass;
 var wrapperPrototype = registeredClass.instancePrototype;
 var baseClass = registeredClass.baseClass;
 var baseClassPrototype = baseClass.instancePrototype;
 var baseConstructor = registeredClass.baseClass.constructor;
 var ctor = createNamedFunction(constructorName, function() {
  registeredClass.baseClass.pureVirtualFunctions.forEach(function(name) {
   if (this[name] === baseClassPrototype[name]) {
    throw new PureVirtualError("Pure virtual function " + name + " must be implemented in JavaScript");
   }
  }.bind(this));
  Object.defineProperty(this, "__parent", {
   value: wrapperPrototype
  });
  this["__construct"].apply(this, arraySlice.call(arguments));
 });
 wrapperPrototype["__construct"] = function __construct() {
  if (this === wrapperPrototype) {
   throwBindingError("Pass correct 'this' to __construct");
  }
  var inner = baseConstructor["implement"].apply(undefined, [ this ].concat(arraySlice.call(arguments)));
  detachFinalizer(inner);
  var $$ = inner.$$;
  inner["notifyOnDestruction"]();
  $$.preservePointerOnDelete = true;
  Object.defineProperties(this, {
   $$: {
    value: $$
   }
  });
  attachFinalizer(this);
  registerInheritedInstance(registeredClass, $$.ptr, this);
 };
 wrapperPrototype["__destruct"] = function __destruct() {
  if (this === wrapperPrototype) {
   throwBindingError("Pass correct 'this' to __destruct");
  }
  detachFinalizer(this);
  unregisterInheritedInstance(registeredClass, this.$$.ptr);
 };
 ctor.prototype = Object.create(wrapperPrototype);
 for (var p in properties) {
  ctor.prototype[p] = properties[p];
 }
 return __emval_register(ctor);
}

var structRegistrations = {};

function runDestructors(destructors) {
 while (destructors.length) {
  var ptr = destructors.pop();
  var del = destructors.pop();
  del(ptr);
 }
}

function simpleReadValueFromPointer(pointer) {
 return this["fromWireType"](HEAPU32[pointer >> 2]);
}

var awaitingDependencies = {};

var typeDependencies = {};

var InternalError = undefined;

function throwInternalError(message) {
 throw new InternalError(message);
}

function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
 myTypes.forEach(function(type) {
  typeDependencies[type] = dependentTypes;
 });
 function onComplete(typeConverters) {
  var myTypeConverters = getTypeConverters(typeConverters);
  if (myTypeConverters.length !== myTypes.length) {
   throwInternalError("Mismatched type converter count");
  }
  for (var i = 0; i < myTypes.length; ++i) {
   registerType(myTypes[i], myTypeConverters[i]);
  }
 }
 var typeConverters = new Array(dependentTypes.length);
 var unregisteredTypes = [];
 var registered = 0;
 dependentTypes.forEach(function(dt, i) {
  if (registeredTypes.hasOwnProperty(dt)) {
   typeConverters[i] = registeredTypes[dt];
  } else {
   unregisteredTypes.push(dt);
   if (!awaitingDependencies.hasOwnProperty(dt)) {
    awaitingDependencies[dt] = [];
   }
   awaitingDependencies[dt].push(function() {
    typeConverters[i] = registeredTypes[dt];
    ++registered;
    if (registered === unregisteredTypes.length) {
     onComplete(typeConverters);
    }
   });
  }
 });
 if (0 === unregisteredTypes.length) {
  onComplete(typeConverters);
 }
}

function __embind_finalize_value_object(structType) {
 var reg = structRegistrations[structType];
 delete structRegistrations[structType];
 var rawConstructor = reg.rawConstructor;
 var rawDestructor = reg.rawDestructor;
 var fieldRecords = reg.fields;
 var fieldTypes = fieldRecords.map(function(field) {
  return field.getterReturnType;
 }).concat(fieldRecords.map(function(field) {
  return field.setterArgumentType;
 }));
 whenDependentTypesAreResolved([ structType ], fieldTypes, function(fieldTypes) {
  var fields = {};
  fieldRecords.forEach(function(field, i) {
   var fieldName = field.fieldName;
   var getterReturnType = fieldTypes[i];
   var getter = field.getter;
   var getterContext = field.getterContext;
   var setterArgumentType = fieldTypes[i + fieldRecords.length];
   var setter = field.setter;
   var setterContext = field.setterContext;
   fields[fieldName] = {
    read: function(ptr) {
     return getterReturnType["fromWireType"](getter(getterContext, ptr));
    },
    write: function(ptr, o) {
     var destructors = [];
     setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, o));
     runDestructors(destructors);
    }
   };
  });
  return [ {
   name: reg.name,
   "fromWireType": function(ptr) {
    var rv = {};
    for (var i in fields) {
     rv[i] = fields[i].read(ptr);
    }
    rawDestructor(ptr);
    return rv;
   },
   "toWireType": function(destructors, o) {
    for (var fieldName in fields) {
     if (!(fieldName in o)) {
      throw new TypeError('Missing field:  "' + fieldName + '"');
     }
    }
    var ptr = rawConstructor();
    for (fieldName in fields) {
     fields[fieldName].write(ptr, o[fieldName]);
    }
    if (destructors !== null) {
     destructors.push(rawDestructor, ptr);
    }
    return ptr;
   },
   "argPackAdvance": 8,
   "readValueFromPointer": simpleReadValueFromPointer,
   destructorFunction: rawDestructor
  } ];
 });
}

function getShiftFromSize(size) {
 switch (size) {
 case 1:
  return 0;

 case 2:
  return 1;

 case 4:
  return 2;

 case 8:
  return 3;

 default:
  throw new TypeError("Unknown type size: " + size);
 }
}

function registerType(rawType, registeredInstance, options) {
 options = options || {};
 if (!("argPackAdvance" in registeredInstance)) {
  throw new TypeError("registerType registeredInstance requires argPackAdvance");
 }
 var name = registeredInstance.name;
 if (!rawType) {
  throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
 }
 if (registeredTypes.hasOwnProperty(rawType)) {
  if (options.ignoreDuplicateRegistrations) {
   return;
  } else {
   throwBindingError("Cannot register type '" + name + "' twice");
  }
 }
 registeredTypes[rawType] = registeredInstance;
 delete typeDependencies[rawType];
 if (awaitingDependencies.hasOwnProperty(rawType)) {
  var callbacks = awaitingDependencies[rawType];
  delete awaitingDependencies[rawType];
  callbacks.forEach(function(cb) {
   cb();
  });
 }
}

function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
 var shift = getShiftFromSize(size);
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": function(wt) {
   return !!wt;
  },
  "toWireType": function(destructors, o) {
   return o ? trueValue : falseValue;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": function(pointer) {
   var heap;
   if (size === 1) {
    heap = HEAP8;
   } else if (size === 2) {
    heap = HEAP16;
   } else if (size === 4) {
    heap = HEAP32;
   } else {
    throw new TypeError("Unknown boolean type size: " + name);
   }
   return this["fromWireType"](heap[pointer >> shift]);
  },
  destructorFunction: null
 });
}

function ClassHandle_isAliasOf(other) {
 if (!(this instanceof ClassHandle)) {
  return false;
 }
 if (!(other instanceof ClassHandle)) {
  return false;
 }
 var leftClass = this.$$.ptrType.registeredClass;
 var left = this.$$.ptr;
 var rightClass = other.$$.ptrType.registeredClass;
 var right = other.$$.ptr;
 while (leftClass.baseClass) {
  left = leftClass.upcast(left);
  leftClass = leftClass.baseClass;
 }
 while (rightClass.baseClass) {
  right = rightClass.upcast(right);
  rightClass = rightClass.baseClass;
 }
 return leftClass === rightClass && left === right;
}

function shallowCopyInternalPointer(o) {
 return {
  count: o.count,
  deleteScheduled: o.deleteScheduled,
  preservePointerOnDelete: o.preservePointerOnDelete,
  ptr: o.ptr,
  ptrType: o.ptrType,
  smartPtr: o.smartPtr,
  smartPtrType: o.smartPtrType
 };
}

function throwInstanceAlreadyDeleted(obj) {
 function getInstanceTypeName(handle) {
  return handle.$$.ptrType.registeredClass.name;
 }
 throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
}

function ClassHandle_clone() {
 if (!this.$$.ptr) {
  throwInstanceAlreadyDeleted(this);
 }
 if (this.$$.preservePointerOnDelete) {
  this.$$.count.value += 1;
  return this;
 } else {
  var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
   $$: {
    value: shallowCopyInternalPointer(this.$$)
   }
  }));
  clone.$$.count.value += 1;
  clone.$$.deleteScheduled = false;
  return clone;
 }
}

function ClassHandle_delete() {
 if (!this.$$.ptr) {
  throwInstanceAlreadyDeleted(this);
 }
 if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
  throwBindingError("Object already scheduled for deletion");
 }
 detachFinalizer(this);
 releaseClassHandle(this.$$);
 if (!this.$$.preservePointerOnDelete) {
  this.$$.smartPtr = undefined;
  this.$$.ptr = undefined;
 }
}

function ClassHandle_isDeleted() {
 return !this.$$.ptr;
}

function ClassHandle_deleteLater() {
 if (!this.$$.ptr) {
  throwInstanceAlreadyDeleted(this);
 }
 if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
  throwBindingError("Object already scheduled for deletion");
 }
 deletionQueue.push(this);
 if (deletionQueue.length === 1 && delayFunction) {
  delayFunction(flushPendingDeletes);
 }
 this.$$.deleteScheduled = true;
 return this;
}

function init_ClassHandle() {
 ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf;
 ClassHandle.prototype["clone"] = ClassHandle_clone;
 ClassHandle.prototype["delete"] = ClassHandle_delete;
 ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted;
 ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater;
}

function ClassHandle() {}

var registeredPointers = {};

function ensureOverloadTable(proto, methodName, humanName) {
 if (undefined === proto[methodName].overloadTable) {
  var prevFunc = proto[methodName];
  proto[methodName] = function() {
   if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
    throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
   }
   return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
  };
  proto[methodName].overloadTable = [];
  proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
 }
}

function exposePublicSymbol(name, value, numArguments) {
 if (Module.hasOwnProperty(name)) {
  if (undefined === numArguments || undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments]) {
   throwBindingError("Cannot register public name '" + name + "' twice");
  }
  ensureOverloadTable(Module, name, name);
  if (Module.hasOwnProperty(numArguments)) {
   throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
  }
  Module[name].overloadTable[numArguments] = value;
 } else {
  Module[name] = value;
  if (undefined !== numArguments) {
   Module[name].numArguments = numArguments;
  }
 }
}

function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
 this.name = name;
 this.constructor = constructor;
 this.instancePrototype = instancePrototype;
 this.rawDestructor = rawDestructor;
 this.baseClass = baseClass;
 this.getActualType = getActualType;
 this.upcast = upcast;
 this.downcast = downcast;
 this.pureVirtualFunctions = [];
}

function upcastPointer(ptr, ptrClass, desiredClass) {
 while (ptrClass !== desiredClass) {
  if (!ptrClass.upcast) {
   throwBindingError("Expected null or instance of " + desiredClass.name + ", got an instance of " + ptrClass.name);
  }
  ptr = ptrClass.upcast(ptr);
  ptrClass = ptrClass.baseClass;
 }
 return ptr;
}

function constNoSmartPtrRawPointerToWireType(destructors, handle) {
 if (handle === null) {
  if (this.isReference) {
   throwBindingError("null is not a valid " + this.name);
  }
  return 0;
 }
 if (!handle.$$) {
  throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
 }
 if (!handle.$$.ptr) {
  throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
 }
 var handleClass = handle.$$.ptrType.registeredClass;
 var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
 return ptr;
}

function genericPointerToWireType(destructors, handle) {
 var ptr;
 if (handle === null) {
  if (this.isReference) {
   throwBindingError("null is not a valid " + this.name);
  }
  if (this.isSmartPointer) {
   ptr = this.rawConstructor();
   if (destructors !== null) {
    destructors.push(this.rawDestructor, ptr);
   }
   return ptr;
  } else {
   return 0;
  }
 }
 if (!handle.$$) {
  throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
 }
 if (!handle.$$.ptr) {
  throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
 }
 if (!this.isConst && handle.$$.ptrType.isConst) {
  throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
 }
 var handleClass = handle.$$.ptrType.registeredClass;
 ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
 if (this.isSmartPointer) {
  if (undefined === handle.$$.smartPtr) {
   throwBindingError("Passing raw pointer to smart pointer is illegal");
  }
  switch (this.sharingPolicy) {
  case 0:
   if (handle.$$.smartPtrType === this) {
    ptr = handle.$$.smartPtr;
   } else {
    throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
   }
   break;

  case 1:
   ptr = handle.$$.smartPtr;
   break;

  case 2:
   if (handle.$$.smartPtrType === this) {
    ptr = handle.$$.smartPtr;
   } else {
    var clonedHandle = handle["clone"]();
    ptr = this.rawShare(ptr, __emval_register(function() {
     clonedHandle["delete"]();
    }));
    if (destructors !== null) {
     destructors.push(this.rawDestructor, ptr);
    }
   }
   break;

  default:
   throwBindingError("Unsupporting sharing policy");
  }
 }
 return ptr;
}

function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
 if (handle === null) {
  if (this.isReference) {
   throwBindingError("null is not a valid " + this.name);
  }
  return 0;
 }
 if (!handle.$$) {
  throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
 }
 if (!handle.$$.ptr) {
  throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
 }
 if (handle.$$.ptrType.isConst) {
  throwBindingError("Cannot convert argument of type " + handle.$$.ptrType.name + " to parameter type " + this.name);
 }
 var handleClass = handle.$$.ptrType.registeredClass;
 var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
 return ptr;
}

function RegisteredPointer_getPointee(ptr) {
 if (this.rawGetPointee) {
  ptr = this.rawGetPointee(ptr);
 }
 return ptr;
}

function RegisteredPointer_destructor(ptr) {
 if (this.rawDestructor) {
  this.rawDestructor(ptr);
 }
}

function RegisteredPointer_deleteObject(handle) {
 if (handle !== null) {
  handle["delete"]();
 }
}

function downcastPointer(ptr, ptrClass, desiredClass) {
 if (ptrClass === desiredClass) {
  return ptr;
 }
 if (undefined === desiredClass.baseClass) {
  return null;
 }
 var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
 if (rv === null) {
  return null;
 }
 return desiredClass.downcast(rv);
}

function getInheritedInstance(class_, ptr) {
 ptr = getBasestPointer(class_, ptr);
 return registeredInstances[ptr];
}

function makeClassHandle(prototype, record) {
 if (!record.ptrType || !record.ptr) {
  throwInternalError("makeClassHandle requires ptr and ptrType");
 }
 var hasSmartPtrType = !!record.smartPtrType;
 var hasSmartPtr = !!record.smartPtr;
 if (hasSmartPtrType !== hasSmartPtr) {
  throwInternalError("Both smartPtrType and smartPtr must be specified");
 }
 record.count = {
  value: 1
 };
 return attachFinalizer(Object.create(prototype, {
  $$: {
   value: record
  }
 }));
}

function RegisteredPointer_fromWireType(ptr) {
 var rawPointer = this.getPointee(ptr);
 if (!rawPointer) {
  this.destructor(ptr);
  return null;
 }
 var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
 if (undefined !== registeredInstance) {
  if (0 === registeredInstance.$$.count.value) {
   registeredInstance.$$.ptr = rawPointer;
   registeredInstance.$$.smartPtr = ptr;
   return registeredInstance["clone"]();
  } else {
   var rv = registeredInstance["clone"]();
   this.destructor(ptr);
   return rv;
  }
 }
 function makeDefaultHandle() {
  if (this.isSmartPointer) {
   return makeClassHandle(this.registeredClass.instancePrototype, {
    ptrType: this.pointeeType,
    ptr: rawPointer,
    smartPtrType: this,
    smartPtr: ptr
   });
  } else {
   return makeClassHandle(this.registeredClass.instancePrototype, {
    ptrType: this,
    ptr: ptr
   });
  }
 }
 var actualType = this.registeredClass.getActualType(rawPointer);
 var registeredPointerRecord = registeredPointers[actualType];
 if (!registeredPointerRecord) {
  return makeDefaultHandle.call(this);
 }
 var toType;
 if (this.isConst) {
  toType = registeredPointerRecord.constPointerType;
 } else {
  toType = registeredPointerRecord.pointerType;
 }
 var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
 if (dp === null) {
  return makeDefaultHandle.call(this);
 }
 if (this.isSmartPointer) {
  return makeClassHandle(toType.registeredClass.instancePrototype, {
   ptrType: toType,
   ptr: dp,
   smartPtrType: this,
   smartPtr: ptr
  });
 } else {
  return makeClassHandle(toType.registeredClass.instancePrototype, {
   ptrType: toType,
   ptr: dp
  });
 }
}

function init_RegisteredPointer() {
 RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
 RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
 RegisteredPointer.prototype["argPackAdvance"] = 8;
 RegisteredPointer.prototype["readValueFromPointer"] = simpleReadValueFromPointer;
 RegisteredPointer.prototype["deleteObject"] = RegisteredPointer_deleteObject;
 RegisteredPointer.prototype["fromWireType"] = RegisteredPointer_fromWireType;
}

function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
 this.name = name;
 this.registeredClass = registeredClass;
 this.isReference = isReference;
 this.isConst = isConst;
 this.isSmartPointer = isSmartPointer;
 this.pointeeType = pointeeType;
 this.sharingPolicy = sharingPolicy;
 this.rawGetPointee = rawGetPointee;
 this.rawConstructor = rawConstructor;
 this.rawShare = rawShare;
 this.rawDestructor = rawDestructor;
 if (!isSmartPointer && registeredClass.baseClass === undefined) {
  if (isConst) {
   this["toWireType"] = constNoSmartPtrRawPointerToWireType;
   this.destructorFunction = null;
  } else {
   this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
   this.destructorFunction = null;
  }
 } else {
  this["toWireType"] = genericPointerToWireType;
 }
}

function replacePublicSymbol(name, value, numArguments) {
 if (!Module.hasOwnProperty(name)) {
  throwInternalError("Replacing nonexistant public symbol");
 }
 if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
  Module[name].overloadTable[numArguments] = value;
 } else {
  Module[name] = value;
  Module[name].argCount = numArguments;
 }
}

function embind__requireFunction(signature, rawFunction) {
 signature = readLatin1String(signature);
 function makeDynCaller(dynCall) {
  var args = [];
  for (var i = 1; i < signature.length; ++i) {
   args.push("a" + i);
  }
  var name = "dynCall_" + signature + "_" + rawFunction;
  var body = "return function " + name + "(" + args.join(", ") + ") {\n";
  body += "    return dynCall(rawFunction" + (args.length ? ", " : "") + args.join(", ") + ");\n";
  body += "};\n";
  return new Function("dynCall", "rawFunction", body)(dynCall, rawFunction);
 }
 var dc = Module["dynCall_" + signature];
 var fp = makeDynCaller(dc);
 if (typeof fp !== "function") {
  throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
 }
 return fp;
}

var UnboundTypeError = undefined;

function throwUnboundTypeError(message, types) {
 var unboundTypes = [];
 var seen = {};
 function visit(type) {
  if (seen[type]) {
   return;
  }
  if (registeredTypes[type]) {
   return;
  }
  if (typeDependencies[type]) {
   typeDependencies[type].forEach(visit);
   return;
  }
  unboundTypes.push(type);
  seen[type] = true;
 }
 types.forEach(visit);
 throw new UnboundTypeError(message + ": " + unboundTypes.map(getTypeName).join([ ", " ]));
}

function __embind_register_class(rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) {
 name = readLatin1String(name);
 getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
 if (upcast) {
  upcast = embind__requireFunction(upcastSignature, upcast);
 }
 if (downcast) {
  downcast = embind__requireFunction(downcastSignature, downcast);
 }
 rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
 var legalFunctionName = makeLegalFunctionName(name);
 exposePublicSymbol(legalFunctionName, function() {
  throwUnboundTypeError("Cannot construct " + name + " due to unbound types", [ baseClassRawType ]);
 });
 whenDependentTypesAreResolved([ rawType, rawPointerType, rawConstPointerType ], baseClassRawType ? [ baseClassRawType ] : [], function(base) {
  base = base[0];
  var baseClass;
  var basePrototype;
  if (baseClassRawType) {
   baseClass = base.registeredClass;
   basePrototype = baseClass.instancePrototype;
  } else {
   basePrototype = ClassHandle.prototype;
  }
  var constructor = createNamedFunction(legalFunctionName, function() {
   if (Object.getPrototypeOf(this) !== instancePrototype) {
    throw new BindingError("Use 'new' to construct " + name);
   }
   if (undefined === registeredClass.constructor_body) {
    throw new BindingError(name + " has no accessible constructor");
   }
   var body = registeredClass.constructor_body[arguments.length];
   if (undefined === body) {
    throw new BindingError("Tried to invoke ctor of " + name + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(registeredClass.constructor_body).toString() + ") parameters instead!");
   }
   return body.apply(this, arguments);
  });
  var instancePrototype = Object.create(basePrototype, {
   constructor: {
    value: constructor
   }
  });
  constructor.prototype = instancePrototype;
  var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
  var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
  var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
  var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
  registeredPointers[rawType] = {
   pointerType: pointerConverter,
   constPointerType: constPointerConverter
  };
  replacePublicSymbol(legalFunctionName, constructor);
  return [ referenceConverter, pointerConverter, constPointerConverter ];
 });
}

function new_(constructor, argumentList) {
 if (!(constructor instanceof Function)) {
  throw new TypeError("new_ called with constructor type " + typeof constructor + " which is not a function");
 }
 var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function() {});
 dummy.prototype = constructor.prototype;
 var obj = new dummy();
 var r = constructor.apply(obj, argumentList);
 return r instanceof Object ? r : obj;
}

function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
 var argCount = argTypes.length;
 if (argCount < 2) {
  throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
 }
 var isClassMethodFunc = argTypes[1] !== null && classType !== null;
 var needsDestructorStack = false;
 for (var i = 1; i < argTypes.length; ++i) {
  if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
   needsDestructorStack = true;
   break;
  }
 }
 var returns = argTypes[0].name !== "void";
 var argsList = "";
 var argsListWired = "";
 for (var i = 0; i < argCount - 2; ++i) {
  argsList += (i !== 0 ? ", " : "") + "arg" + i;
  argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
 }
 var invokerFnBody = "return function " + makeLegalFunctionName(humanName) + "(" + argsList + ") {\n" + "if (arguments.length !== " + (argCount - 2) + ") {\n" + "throwBindingError('function " + humanName + " called with ' + arguments.length + ' arguments, expected " + (argCount - 2) + " args!');\n" + "}\n";
 if (needsDestructorStack) {
  invokerFnBody += "var destructors = [];\n";
 }
 var dtorStack = needsDestructorStack ? "destructors" : "null";
 var args1 = [ "throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam" ];
 var args2 = [ throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1] ];
 if (isClassMethodFunc) {
  invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
 }
 for (var i = 0; i < argCount - 2; ++i) {
  invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
  args1.push("argType" + i);
  args2.push(argTypes[i + 2]);
 }
 if (isClassMethodFunc) {
  argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
 }
 invokerFnBody += (returns ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";
 if (needsDestructorStack) {
  invokerFnBody += "runDestructors(destructors);\n";
 } else {
  for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
   var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
   if (argTypes[i].destructorFunction !== null) {
    invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
    args1.push(paramName + "_dtor");
    args2.push(argTypes[i].destructorFunction);
   }
  }
 }
 if (returns) {
  invokerFnBody += "var ret = retType.fromWireType(rv);\n" + "return ret;\n";
 } else {}
 invokerFnBody += "}\n";
 args1.push(invokerFnBody);
 var invokerFunction = new_(Function, args1).apply(null, args2);
 return invokerFunction;
}

function heap32VectorToArray(count, firstElement) {
 var array = [];
 for (var i = 0; i < count; i++) {
  array.push(HEAP32[(firstElement >> 2) + i]);
 }
 return array;
}

function __embind_register_class_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, fn) {
 var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
 methodName = readLatin1String(methodName);
 rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
 whenDependentTypesAreResolved([], [ rawClassType ], function(classType) {
  classType = classType[0];
  var humanName = classType.name + "." + methodName;
  function unboundTypesHandler() {
   throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes);
  }
  var proto = classType.registeredClass.constructor;
  if (undefined === proto[methodName]) {
   unboundTypesHandler.argCount = argCount - 1;
   proto[methodName] = unboundTypesHandler;
  } else {
   ensureOverloadTable(proto, methodName, humanName);
   proto[methodName].overloadTable[argCount - 1] = unboundTypesHandler;
  }
  whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
   var invokerArgsArray = [ argTypes[0], null ].concat(argTypes.slice(1));
   var func = craftInvokerFunction(humanName, invokerArgsArray, null, rawInvoker, fn);
   if (undefined === proto[methodName].overloadTable) {
    func.argCount = argCount - 1;
    proto[methodName] = func;
   } else {
    proto[methodName].overloadTable[argCount - 1] = func;
   }
   return [];
  });
  return [];
 });
}

function validateThis(this_, classType, humanName) {
 if (!(this_ instanceof Object)) {
  throwBindingError(humanName + ' with invalid "this": ' + this_);
 }
 if (!(this_ instanceof classType.registeredClass.constructor)) {
  throwBindingError(humanName + ' incompatible with "this" of type ' + this_.constructor.name);
 }
 if (!this_.$$.ptr) {
  throwBindingError("cannot call emscripten binding method " + humanName + " on deleted object");
 }
 return upcastPointer(this_.$$.ptr, this_.$$.ptrType.registeredClass, classType.registeredClass);
}

function __embind_register_class_class_property(rawClassType, fieldName, rawFieldType, rawFieldPtr, getterSignature, getter, setterSignature, setter) {
 fieldName = readLatin1String(fieldName);
 getter = embind__requireFunction(getterSignature, getter);
 whenDependentTypesAreResolved([], [ rawClassType ], function(classType) {
  classType = classType[0];
  var humanName = classType.name + "." + fieldName;
  var desc = {
   get: function() {
    throwUnboundTypeError("Cannot access " + humanName + " due to unbound types", [ rawFieldType ]);
   },
   enumerable: true,
   configurable: true
  };
  if (setter) {
   desc.set = function() {
    throwUnboundTypeError("Cannot access " + humanName + " due to unbound types", [ rawFieldType ]);
   };
  } else {
   desc.set = function(v) {
    throwBindingError(humanName + " is a read-only property");
   };
  }
  Object.defineProperty(classType.registeredClass.constructor, fieldName, desc);
  whenDependentTypesAreResolved([], [ rawFieldType ], function(fieldType) {
   fieldType = fieldType[0];
   var desc = {
    get: function() {
     return fieldType["fromWireType"](getter(rawFieldPtr));
    },
    enumerable: true
   };
   if (setter) {
    setter = embind__requireFunction(setterSignature, setter);
    desc.set = function(v) {
     var destructors = [];
     setter(rawFieldPtr, fieldType["toWireType"](destructors, v));
     runDestructors(destructors);
    };
   }
   Object.defineProperty(classType.registeredClass.constructor, fieldName, desc);
   return [];
  });
  return [];
 });
}

function __embind_register_class_constructor(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) {
 assert(argCount > 0);
 var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
 invoker = embind__requireFunction(invokerSignature, invoker);
 var args = [ rawConstructor ];
 var destructors = [];
 whenDependentTypesAreResolved([], [ rawClassType ], function(classType) {
  classType = classType[0];
  var humanName = "constructor " + classType.name;
  if (undefined === classType.registeredClass.constructor_body) {
   classType.registeredClass.constructor_body = [];
  }
  if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
   throw new BindingError("Cannot register multiple constructors with identical number of parameters (" + (argCount - 1) + ") for class '" + classType.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
  }
  classType.registeredClass.constructor_body[argCount - 1] = function unboundTypeHandler() {
   throwUnboundTypeError("Cannot construct " + classType.name + " due to unbound types", rawArgTypes);
  };
  whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
   classType.registeredClass.constructor_body[argCount - 1] = function constructor_body() {
    if (arguments.length !== argCount - 1) {
     throwBindingError(humanName + " called with " + arguments.length + " arguments, expected " + (argCount - 1));
    }
    destructors.length = 0;
    args.length = argCount;
    for (var i = 1; i < argCount; ++i) {
     args[i] = argTypes[i]["toWireType"](destructors, arguments[i - 1]);
    }
    var ptr = invoker.apply(null, args);
    runDestructors(destructors);
    return argTypes[0]["fromWireType"](ptr);
   };
   return [];
  });
  return [];
 });
}

function __embind_register_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual) {
 var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
 methodName = readLatin1String(methodName);
 rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
 whenDependentTypesAreResolved([], [ rawClassType ], function(classType) {
  classType = classType[0];
  var humanName = classType.name + "." + methodName;
  if (isPureVirtual) {
   classType.registeredClass.pureVirtualFunctions.push(methodName);
  }
  function unboundTypesHandler() {
   throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes);
  }
  var proto = classType.registeredClass.instancePrototype;
  var method = proto[methodName];
  if (undefined === method || undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
   unboundTypesHandler.argCount = argCount - 2;
   unboundTypesHandler.className = classType.name;
   proto[methodName] = unboundTypesHandler;
  } else {
   ensureOverloadTable(proto, methodName, humanName);
   proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
  }
  whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
   var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context);
   if (undefined === proto[methodName].overloadTable) {
    memberFunction.argCount = argCount - 2;
    proto[methodName] = memberFunction;
   } else {
    proto[methodName].overloadTable[argCount - 2] = memberFunction;
   }
   return [];
  });
  return [];
 });
}

function __embind_register_class_property(classType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) {
 fieldName = readLatin1String(fieldName);
 getter = embind__requireFunction(getterSignature, getter);
 whenDependentTypesAreResolved([], [ classType ], function(classType) {
  classType = classType[0];
  var humanName = classType.name + "." + fieldName;
  var desc = {
   get: function() {
    throwUnboundTypeError("Cannot access " + humanName + " due to unbound types", [ getterReturnType, setterArgumentType ]);
   },
   enumerable: true,
   configurable: true
  };
  if (setter) {
   desc.set = function() {
    throwUnboundTypeError("Cannot access " + humanName + " due to unbound types", [ getterReturnType, setterArgumentType ]);
   };
  } else {
   desc.set = function(v) {
    throwBindingError(humanName + " is a read-only property");
   };
  }
  Object.defineProperty(classType.registeredClass.instancePrototype, fieldName, desc);
  whenDependentTypesAreResolved([], setter ? [ getterReturnType, setterArgumentType ] : [ getterReturnType ], function(types) {
   var getterReturnType = types[0];
   var desc = {
    get: function() {
     var ptr = validateThis(this, classType, humanName + " getter");
     return getterReturnType["fromWireType"](getter(getterContext, ptr));
    },
    enumerable: true
   };
   if (setter) {
    setter = embind__requireFunction(setterSignature, setter);
    var setterArgumentType = types[1];
    desc.set = function(v) {
     var ptr = validateThis(this, classType, humanName + " setter");
     var destructors = [];
     setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, v));
     runDestructors(destructors);
    };
   }
   Object.defineProperty(classType.registeredClass.instancePrototype, fieldName, desc);
   return [];
  });
  return [];
 });
}

function __emval_decref(handle) {
 if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
  emval_handle_array[handle] = undefined;
  emval_free_list.push(handle);
 }
}

function __embind_register_emval(rawType, name) {
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": function(handle) {
   var rv = emval_handle_array[handle].value;
   __emval_decref(handle);
   return rv;
  },
  "toWireType": function(destructors, value) {
   return __emval_register(value);
  },
  "argPackAdvance": 8,
  "readValueFromPointer": simpleReadValueFromPointer,
  destructorFunction: null
 });
}

function enumReadValueFromPointer(name, shift, signed) {
 switch (shift) {
 case 0:
  return function(pointer) {
   var heap = signed ? HEAP8 : HEAPU8;
   return this["fromWireType"](heap[pointer]);
  };

 case 1:
  return function(pointer) {
   var heap = signed ? HEAP16 : HEAPU16;
   return this["fromWireType"](heap[pointer >> 1]);
  };

 case 2:
  return function(pointer) {
   var heap = signed ? HEAP32 : HEAPU32;
   return this["fromWireType"](heap[pointer >> 2]);
  };

 default:
  throw new TypeError("Unknown integer type: " + name);
 }
}

function __embind_register_enum(rawType, name, size, isSigned) {
 var shift = getShiftFromSize(size);
 name = readLatin1String(name);
 function ctor() {}
 ctor.values = {};
 registerType(rawType, {
  name: name,
  constructor: ctor,
  "fromWireType": function(c) {
   return this.constructor.values[c];
  },
  "toWireType": function(destructors, c) {
   return c.value;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": enumReadValueFromPointer(name, shift, isSigned),
  destructorFunction: null
 });
 exposePublicSymbol(name, ctor);
}

function __embind_register_enum_value(rawEnumType, name, enumValue) {
 var enumType = requireRegisteredType(rawEnumType, "enum");
 name = readLatin1String(name);
 var Enum = enumType.constructor;
 var Value = Object.create(enumType.constructor.prototype, {
  value: {
   value: enumValue
  },
  constructor: {
   value: createNamedFunction(enumType.name + "_" + name, function() {})
  }
 });
 Enum.values[enumValue] = Value;
 Enum[name] = Value;
}

function _embind_repr(v) {
 if (v === null) {
  return "null";
 }
 var t = typeof v;
 if (t === "object" || t === "array" || t === "function") {
  return v.toString();
 } else {
  return "" + v;
 }
}

function floatReadValueFromPointer(name, shift) {
 switch (shift) {
 case 2:
  return function(pointer) {
   return this["fromWireType"](HEAPF32[pointer >> 2]);
  };

 case 3:
  return function(pointer) {
   return this["fromWireType"](HEAPF64[pointer >> 3]);
  };

 default:
  throw new TypeError("Unknown float type: " + name);
 }
}

function __embind_register_float(rawType, name, size) {
 var shift = getShiftFromSize(size);
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": function(value) {
   return value;
  },
  "toWireType": function(destructors, value) {
   if (typeof value !== "number" && typeof value !== "boolean") {
    throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
   }
   return value;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": floatReadValueFromPointer(name, shift),
  destructorFunction: null
 });
}

function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn) {
 var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
 name = readLatin1String(name);
 rawInvoker = embind__requireFunction(signature, rawInvoker);
 exposePublicSymbol(name, function() {
  throwUnboundTypeError("Cannot call " + name + " due to unbound types", argTypes);
 }, argCount - 1);
 whenDependentTypesAreResolved([], argTypes, function(argTypes) {
  var invokerArgsArray = [ argTypes[0], null ].concat(argTypes.slice(1));
  replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn), argCount - 1);
  return [];
 });
}

function integerReadValueFromPointer(name, shift, signed) {
 switch (shift) {
 case 0:
  return signed ? function readS8FromPointer(pointer) {
   return HEAP8[pointer];
  } : function readU8FromPointer(pointer) {
   return HEAPU8[pointer];
  };

 case 1:
  return signed ? function readS16FromPointer(pointer) {
   return HEAP16[pointer >> 1];
  } : function readU16FromPointer(pointer) {
   return HEAPU16[pointer >> 1];
  };

 case 2:
  return signed ? function readS32FromPointer(pointer) {
   return HEAP32[pointer >> 2];
  } : function readU32FromPointer(pointer) {
   return HEAPU32[pointer >> 2];
  };

 default:
  throw new TypeError("Unknown integer type: " + name);
 }
}

function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
 name = readLatin1String(name);
 if (maxRange === -1) {
  maxRange = 4294967295;
 }
 var shift = getShiftFromSize(size);
 var fromWireType = function(value) {
  return value;
 };
 if (minRange === 0) {
  var bitshift = 32 - 8 * size;
  fromWireType = function(value) {
   return value << bitshift >>> bitshift;
  };
 }
 var isUnsignedType = name.indexOf("unsigned") != -1;
 registerType(primitiveType, {
  name: name,
  "fromWireType": fromWireType,
  "toWireType": function(destructors, value) {
   if (typeof value !== "number" && typeof value !== "boolean") {
    throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
   }
   if (value < minRange || value > maxRange) {
    throw new TypeError('Passing a number "' + _embind_repr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ", " + maxRange + "]!");
   }
   return isUnsignedType ? value >>> 0 : value | 0;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0),
  destructorFunction: null
 });
}

function __embind_register_memory_view(rawType, dataTypeIndex, name) {
 var typeMapping = [ Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array ];
 var TA = typeMapping[dataTypeIndex];
 function decodeMemoryView(handle) {
  handle = handle >> 2;
  var heap = HEAPU32;
  var size = heap[handle];
  var data = heap[handle + 1];
  return new TA(buffer, data, size);
 }
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": decodeMemoryView,
  "argPackAdvance": 8,
  "readValueFromPointer": decodeMemoryView
 }, {
  ignoreDuplicateRegistrations: true
 });
}

function __embind_register_std_string(rawType, name) {
 name = readLatin1String(name);
 var stdStringIsUTF8 = name === "std::string";
 registerType(rawType, {
  name: name,
  "fromWireType": function(value) {
   var length = HEAPU32[value >> 2];
   var str;
   if (stdStringIsUTF8) {
    var decodeStartPtr = value + 4;
    for (var i = 0; i <= length; ++i) {
     var currentBytePtr = value + 4 + i;
     if (i == length || HEAPU8[currentBytePtr] == 0) {
      var maxRead = currentBytePtr - decodeStartPtr;
      var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
      if (str === undefined) {
       str = stringSegment;
      } else {
       str += String.fromCharCode(0);
       str += stringSegment;
      }
      decodeStartPtr = currentBytePtr + 1;
     }
    }
   } else {
    var a = new Array(length);
    for (var i = 0; i < length; ++i) {
     a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
    }
    str = a.join("");
   }
   _free(value);
   return str;
  },
  "toWireType": function(destructors, value) {
   if (value instanceof ArrayBuffer) {
    value = new Uint8Array(value);
   }
   var getLength;
   var valueIsOfTypeString = typeof value === "string";
   if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
    throwBindingError("Cannot pass non-string to std::string");
   }
   if (stdStringIsUTF8 && valueIsOfTypeString) {
    getLength = function() {
     return lengthBytesUTF8(value);
    };
   } else {
    getLength = function() {
     return value.length;
    };
   }
   var length = getLength();
   var ptr = _malloc(4 + length + 1);
   HEAPU32[ptr >> 2] = length;
   if (stdStringIsUTF8 && valueIsOfTypeString) {
    stringToUTF8(value, ptr + 4, length + 1);
   } else {
    if (valueIsOfTypeString) {
     for (var i = 0; i < length; ++i) {
      var charCode = value.charCodeAt(i);
      if (charCode > 255) {
       _free(ptr);
       throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
      }
      HEAPU8[ptr + 4 + i] = charCode;
     }
    } else {
     for (var i = 0; i < length; ++i) {
      HEAPU8[ptr + 4 + i] = value[i];
     }
    }
   }
   if (destructors !== null) {
    destructors.push(_free, ptr);
   }
   return ptr;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": simpleReadValueFromPointer,
  destructorFunction: function(ptr) {
   _free(ptr);
  }
 });
}

function __embind_register_std_wstring(rawType, charSize, name) {
 name = readLatin1String(name);
 var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
 if (charSize === 2) {
  decodeString = UTF16ToString;
  encodeString = stringToUTF16;
  lengthBytesUTF = lengthBytesUTF16;
  getHeap = function() {
   return HEAPU16;
  };
  shift = 1;
 } else if (charSize === 4) {
  decodeString = UTF32ToString;
  encodeString = stringToUTF32;
  lengthBytesUTF = lengthBytesUTF32;
  getHeap = function() {
   return HEAPU32;
  };
  shift = 2;
 }
 registerType(rawType, {
  name: name,
  "fromWireType": function(value) {
   var length = HEAPU32[value >> 2];
   var HEAP = getHeap();
   var str;
   var decodeStartPtr = value + 4;
   for (var i = 0; i <= length; ++i) {
    var currentBytePtr = value + 4 + i * charSize;
    if (i == length || HEAP[currentBytePtr >> shift] == 0) {
     var maxReadBytes = currentBytePtr - decodeStartPtr;
     var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
     if (str === undefined) {
      str = stringSegment;
     } else {
      str += String.fromCharCode(0);
      str += stringSegment;
     }
     decodeStartPtr = currentBytePtr + charSize;
    }
   }
   _free(value);
   return str;
  },
  "toWireType": function(destructors, value) {
   if (!(typeof value === "string")) {
    throwBindingError("Cannot pass non-string to C++ string type " + name);
   }
   var length = lengthBytesUTF(value);
   var ptr = _malloc(4 + length + charSize);
   HEAPU32[ptr >> 2] = length >> shift;
   encodeString(value, ptr + 4, length + charSize);
   if (destructors !== null) {
    destructors.push(_free, ptr);
   }
   return ptr;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": simpleReadValueFromPointer,
  destructorFunction: function(ptr) {
   _free(ptr);
  }
 });
}

function __embind_register_value_object(rawType, name, constructorSignature, rawConstructor, destructorSignature, rawDestructor) {
 structRegistrations[rawType] = {
  name: readLatin1String(name),
  rawConstructor: embind__requireFunction(constructorSignature, rawConstructor),
  rawDestructor: embind__requireFunction(destructorSignature, rawDestructor),
  fields: []
 };
}

function __embind_register_value_object_field(structType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) {
 structRegistrations[structType].fields.push({
  fieldName: readLatin1String(fieldName),
  getterReturnType: getterReturnType,
  getter: embind__requireFunction(getterSignature, getter),
  getterContext: getterContext,
  setterArgumentType: setterArgumentType,
  setter: embind__requireFunction(setterSignature, setter),
  setterContext: setterContext
 });
}

function __embind_register_void(rawType, name) {
 name = readLatin1String(name);
 registerType(rawType, {
  isVoid: true,
  name: name,
  "argPackAdvance": 0,
  "fromWireType": function() {
   return undefined;
  },
  "toWireType": function(destructors, o) {
   return undefined;
  }
 });
}

function __emval_as(handle, returnType, destructorsRef) {
 handle = requireHandle(handle);
 returnType = requireRegisteredType(returnType, "emval::as");
 var destructors = [];
 var rd = __emval_register(destructors);
 HEAP32[destructorsRef >> 2] = rd;
 return returnType["toWireType"](destructors, handle);
}

function __emval_allocateDestructors(destructorsRef) {
 var destructors = [];
 HEAP32[destructorsRef >> 2] = __emval_register(destructors);
 return destructors;
}

var emval_symbols = {};

function getStringOrSymbol(address) {
 var symbol = emval_symbols[address];
 if (symbol === undefined) {
  return readLatin1String(address);
 } else {
  return symbol;
 }
}

var emval_methodCallers = [];

function __emval_call_method(caller, handle, methodName, destructorsRef, args) {
 caller = emval_methodCallers[caller];
 handle = requireHandle(handle);
 methodName = getStringOrSymbol(methodName);
 return caller(handle, methodName, __emval_allocateDestructors(destructorsRef), args);
}

function __emval_call_void_method(caller, handle, methodName, args) {
 caller = emval_methodCallers[caller];
 handle = requireHandle(handle);
 methodName = getStringOrSymbol(methodName);
 caller(handle, methodName, null, args);
}

function __emval_addMethodCaller(caller) {
 var id = emval_methodCallers.length;
 emval_methodCallers.push(caller);
 return id;
}

function __emval_lookupTypes(argCount, argTypes) {
 var a = new Array(argCount);
 for (var i = 0; i < argCount; ++i) {
  a[i] = requireRegisteredType(HEAP32[(argTypes >> 2) + i], "parameter " + i);
 }
 return a;
}

function __emval_get_method_caller(argCount, argTypes) {
 var types = __emval_lookupTypes(argCount, argTypes);
 var retType = types[0];
 var signatureName = retType.name + "_$" + types.slice(1).map(function(t) {
  return t.name;
 }).join("_") + "$";
 var params = [ "retType" ];
 var args = [ retType ];
 var argsList = "";
 for (var i = 0; i < argCount - 1; ++i) {
  argsList += (i !== 0 ? ", " : "") + "arg" + i;
  params.push("argType" + i);
  args.push(types[1 + i]);
 }
 var functionName = makeLegalFunctionName("methodCaller_" + signatureName);
 var functionBody = "return function " + functionName + "(handle, name, destructors, args) {\n";
 var offset = 0;
 for (var i = 0; i < argCount - 1; ++i) {
  functionBody += "    var arg" + i + " = argType" + i + ".readValueFromPointer(args" + (offset ? "+" + offset : "") + ");\n";
  offset += types[i + 1]["argPackAdvance"];
 }
 functionBody += "    var rv = handle[name](" + argsList + ");\n";
 for (var i = 0; i < argCount - 1; ++i) {
  if (types[i + 1]["deleteObject"]) {
   functionBody += "    argType" + i + ".deleteObject(arg" + i + ");\n";
  }
 }
 if (!retType.isVoid) {
  functionBody += "    return retType.toWireType(destructors, rv);\n";
 }
 functionBody += "};\n";
 params.push(functionBody);
 var invokerFunction = new_(Function, params).apply(null, args);
 return __emval_addMethodCaller(invokerFunction);
}

function __emval_get_module_property(name) {
 name = getStringOrSymbol(name);
 return __emval_register(Module[name]);
}

function __emval_get_property(handle, key) {
 handle = requireHandle(handle);
 key = requireHandle(key);
 return __emval_register(handle[key]);
}

function __emval_incref(handle) {
 if (handle > 4) {
  emval_handle_array[handle].refcount += 1;
 }
}

function __emval_new_cstring(v) {
 return __emval_register(getStringOrSymbol(v));
}

function __emval_run_destructors(handle) {
 var destructors = emval_handle_array[handle].value;
 runDestructors(destructors);
 __emval_decref(handle);
}

function __emval_take_value(type, argv) {
 type = requireRegisteredType(type, "_emval_take_value");
 var v = type["readValueFromPointer"](argv);
 return __emval_register(v);
}

function _abort() {
 abort();
}

function _emscripten_memcpy_big(dest, src, num) {
 HEAPU8.copyWithin(dest, src, src + num);
}

function _emscripten_get_heap_size() {
 return HEAPU8.length;
}

function emscripten_realloc_buffer(size) {
 try {
  wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
  updateGlobalBufferAndViews(wasmMemory.buffer);
  return 1;
 } catch (e) {}
}

function _emscripten_resize_heap(requestedSize) {
 requestedSize = requestedSize >>> 0;
 var oldSize = _emscripten_get_heap_size();
 var PAGE_MULTIPLE = 65536;
 var maxHeapSize = 2147483648;
 if (requestedSize > maxHeapSize) {
  return false;
 }
 var minHeapSize = 16777216;
 for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
  var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
  overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
  var newSize = Math.min(maxHeapSize, alignUp(Math.max(minHeapSize, requestedSize, overGrownHeapSize), PAGE_MULTIPLE));
  var replacement = emscripten_realloc_buffer(newSize);
  if (replacement) {
   return true;
  }
 }
 return false;
}

var PATH = {
 splitPath: function(filename) {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: function(parts, allowAboveRoot) {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: function(path) {
  var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(function(p) {
   return !!p;
  }), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: function(path) {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: function(path) {
  if (path === "/") return "/";
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 extname: function(path) {
  return PATH.splitPath(path)[3];
 },
 join: function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return PATH.normalize(paths.join("/"));
 },
 join2: function(l, r) {
  return PATH.normalize(l + "/" + r);
 }
};

var SYSCALLS = {
 mappings: {},
 buffers: [ null, [], [] ],
 printChar: function(stream, curr) {
  var buffer = SYSCALLS.buffers[stream];
  if (curr === 0 || curr === 10) {
   (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
   buffer.length = 0;
  } else {
   buffer.push(curr);
  }
 },
 varargs: undefined,
 get: function() {
  SYSCALLS.varargs += 4;
  var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
  return ret;
 },
 getStr: function(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 },
 get64: function(low, high) {
  return low;
 }
};

function _fd_close(fd) {
 return 0;
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {}

function _fd_write(fd, iov, iovcnt, pnum) {
 var num = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = HEAP32[iov + i * 8 >> 2];
  var len = HEAP32[iov + (i * 8 + 4) >> 2];
  for (var j = 0; j < len; j++) {
   SYSCALLS.printChar(fd, HEAPU8[ptr + j]);
  }
  num += len;
 }
 HEAP32[pnum >> 2] = num;
 return 0;
}

init_emval();

PureVirtualError = Module["PureVirtualError"] = extendError(Error, "PureVirtualError");

embind_init_charCodes();

init_embind();

BindingError = Module["BindingError"] = extendError(Error, "BindingError");

InternalError = Module["InternalError"] = extendError(Error, "InternalError");

init_ClassHandle();

init_RegisteredPointer();

UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");

var ASSERTIONS = false;

function intArrayToString(array) {
 var ret = [];
 for (var i = 0; i < array.length; i++) {
  var chr = array[i];
  if (chr > 255) {
   if (ASSERTIONS) {
    assert(false, "Character code " + chr + " (" + String.fromCharCode(chr) + ")  at offset " + i + " not in 0x00-0xFF.");
   }
   chr &= 255;
  }
  ret.push(String.fromCharCode(chr));
 }
 return ret.join("");
}

var decodeBase64 = typeof atob === "function" ? atob : function(input) {
 var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 var output = "";
 var chr1, chr2, chr3;
 var enc1, enc2, enc3, enc4;
 var i = 0;
 input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 do {
  enc1 = keyStr.indexOf(input.charAt(i++));
  enc2 = keyStr.indexOf(input.charAt(i++));
  enc3 = keyStr.indexOf(input.charAt(i++));
  enc4 = keyStr.indexOf(input.charAt(i++));
  chr1 = enc1 << 2 | enc2 >> 4;
  chr2 = (enc2 & 15) << 4 | enc3 >> 2;
  chr3 = (enc3 & 3) << 6 | enc4;
  output = output + String.fromCharCode(chr1);
  if (enc3 !== 64) {
   output = output + String.fromCharCode(chr2);
  }
  if (enc4 !== 64) {
   output = output + String.fromCharCode(chr3);
  }
 } while (i < input.length);
 return output;
};

function intArrayFromBase64(s) {
 if (typeof ENVIRONMENT_IS_NODE === "boolean" && ENVIRONMENT_IS_NODE) {
  var buf;
  try {
   buf = Buffer.from(s, "base64");
  } catch (_) {
   buf = new Buffer(s, "base64");
  }
  return new Uint8Array(buf["buffer"], buf["byteOffset"], buf["byteLength"]);
 }
 try {
  var decoded = decodeBase64(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0; i < decoded.length; ++i) {
   bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
 } catch (_) {
  throw new Error("Converting base64 string to bytes failed.");
 }
}

function tryParseAsDataURI(filename) {
 if (!isDataURI(filename)) {
  return;
 }
 return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}

var asmLibraryArg = {
 "n": __embind_create_inheriting_constructor,
 "I": __embind_finalize_value_object,
 "B": __embind_register_bool,
 "c": __embind_register_class,
 "i": __embind_register_class_class_function,
 "f": __embind_register_class_class_property,
 "r": __embind_register_class_constructor,
 "a": __embind_register_class_function,
 "b": __embind_register_class_property,
 "A": __embind_register_emval,
 "k": __embind_register_enum,
 "j": __embind_register_enum_value,
 "p": __embind_register_float,
 "L": __embind_register_function,
 "h": __embind_register_integer,
 "g": __embind_register_memory_view,
 "q": __embind_register_std_string,
 "m": __embind_register_std_wstring,
 "K": __embind_register_value_object,
 "J": __embind_register_value_object_field,
 "C": __embind_register_void,
 "l": __emval_as,
 "H": __emval_call_method,
 "e": __emval_call_void_method,
 "E": __emval_decref,
 "d": __emval_get_method_caller,
 "M": __emval_get_module_property,
 "u": __emval_get_property,
 "D": __emval_incref,
 "F": __emval_new_cstring,
 "G": __emval_run_destructors,
 "t": __emval_take_value,
 "s": _abort,
 "x": _emscripten_memcpy_big,
 "y": _emscripten_resize_heap,
 "z": _fd_close,
 "v": _fd_seek,
 "o": _fd_write,
 "memory": wasmMemory,
 "w": setTempRet0,
 "table": wasmTable
};

var asm = createWasm();

var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
 return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["N"]).apply(null, arguments);
};

var _malloc = Module["_malloc"] = function() {
 return (_malloc = Module["_malloc"] = Module["asm"]["O"]).apply(null, arguments);
};

var ___getTypeName = Module["___getTypeName"] = function() {
 return (___getTypeName = Module["___getTypeName"] = Module["asm"]["P"]).apply(null, arguments);
};

var ___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = function() {
 return (___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = Module["asm"]["Q"]).apply(null, arguments);
};

var _free = Module["_free"] = function() {
 return (_free = Module["_free"] = Module["asm"]["R"]).apply(null, arguments);
};

var dynCall_ii = Module["dynCall_ii"] = function() {
 return (dynCall_ii = Module["dynCall_ii"] = Module["asm"]["S"]).apply(null, arguments);
};

var dynCall_vi = Module["dynCall_vi"] = function() {
 return (dynCall_vi = Module["dynCall_vi"] = Module["asm"]["T"]).apply(null, arguments);
};

var dynCall_iii = Module["dynCall_iii"] = function() {
 return (dynCall_iii = Module["dynCall_iii"] = Module["asm"]["U"]).apply(null, arguments);
};

var dynCall_iiii = Module["dynCall_iiii"] = function() {
 return (dynCall_iiii = Module["dynCall_iiii"] = Module["asm"]["V"]).apply(null, arguments);
};

var dynCall_v = Module["dynCall_v"] = function() {
 return (dynCall_v = Module["dynCall_v"] = Module["asm"]["W"]).apply(null, arguments);
};

var dynCall_viiif = Module["dynCall_viiif"] = function() {
 return (dynCall_viiif = Module["dynCall_viiif"] = Module["asm"]["X"]).apply(null, arguments);
};

var dynCall_viiifif = Module["dynCall_viiifif"] = function() {
 return (dynCall_viiifif = Module["dynCall_viiifif"] = Module["asm"]["Y"]).apply(null, arguments);
};

var dynCall_vii = Module["dynCall_vii"] = function() {
 return (dynCall_vii = Module["dynCall_vii"] = Module["asm"]["Z"]).apply(null, arguments);
};

var dynCall_fi = Module["dynCall_fi"] = function() {
 return (dynCall_fi = Module["dynCall_fi"] = Module["asm"]["_"]).apply(null, arguments);
};

var dynCall_viii = Module["dynCall_viii"] = function() {
 return (dynCall_viii = Module["dynCall_viii"] = Module["asm"]["$"]).apply(null, arguments);
};

var dynCall_viff = Module["dynCall_viff"] = function() {
 return (dynCall_viff = Module["dynCall_viff"] = Module["asm"]["aa"]).apply(null, arguments);
};

var dynCall_viffffff = Module["dynCall_viffffff"] = function() {
 return (dynCall_viffffff = Module["dynCall_viffffff"] = Module["asm"]["ba"]).apply(null, arguments);
};

var dynCall_viiiii = Module["dynCall_viiiii"] = function() {
 return (dynCall_viiiii = Module["dynCall_viiiii"] = Module["asm"]["ca"]).apply(null, arguments);
};

var dynCall_fii = Module["dynCall_fii"] = function() {
 return (dynCall_fii = Module["dynCall_fii"] = Module["asm"]["da"]).apply(null, arguments);
};

var dynCall_iid = Module["dynCall_iid"] = function() {
 return (dynCall_iid = Module["dynCall_iid"] = Module["asm"]["ea"]).apply(null, arguments);
};

var dynCall_vif = Module["dynCall_vif"] = function() {
 return (dynCall_vif = Module["dynCall_vif"] = Module["asm"]["fa"]).apply(null, arguments);
};

var dynCall_viif = Module["dynCall_viif"] = function() {
 return (dynCall_viif = Module["dynCall_viif"] = Module["asm"]["ga"]).apply(null, arguments);
};

var dynCall_viiff = Module["dynCall_viiff"] = function() {
 return (dynCall_viiff = Module["dynCall_viiff"] = Module["asm"]["ha"]).apply(null, arguments);
};

var dynCall_iif = Module["dynCall_iif"] = function() {
 return (dynCall_iif = Module["dynCall_iif"] = Module["asm"]["ia"]).apply(null, arguments);
};

var dynCall_viiii = Module["dynCall_viiii"] = function() {
 return (dynCall_viiii = Module["dynCall_viiii"] = Module["asm"]["ja"]).apply(null, arguments);
};

var dynCall_viiiiii = Module["dynCall_viiiiii"] = function() {
 return (dynCall_viiiiii = Module["dynCall_viiiiii"] = Module["asm"]["ka"]).apply(null, arguments);
};

var dynCall_viiffffff = Module["dynCall_viiffffff"] = function() {
 return (dynCall_viiffffff = Module["dynCall_viiffffff"] = Module["asm"]["la"]).apply(null, arguments);
};

var dynCall_viiffff = Module["dynCall_viiffff"] = function() {
 return (dynCall_viiffff = Module["dynCall_viiffff"] = Module["asm"]["ma"]).apply(null, arguments);
};

var dynCall_iiid = Module["dynCall_iiid"] = function() {
 return (dynCall_iiid = Module["dynCall_iiid"] = Module["asm"]["na"]).apply(null, arguments);
};

var dynCall_viiiff = Module["dynCall_viiiff"] = function() {
 return (dynCall_viiiff = Module["dynCall_viiiff"] = Module["asm"]["oa"]).apply(null, arguments);
};

var dynCall_iiif = Module["dynCall_iiif"] = function() {
 return (dynCall_iiif = Module["dynCall_iiif"] = Module["asm"]["pa"]).apply(null, arguments);
};

var dynCall_i = Module["dynCall_i"] = function() {
 return (dynCall_i = Module["dynCall_i"] = Module["asm"]["qa"]).apply(null, arguments);
};

var dynCall_viffff = Module["dynCall_viffff"] = function() {
 return (dynCall_viffff = Module["dynCall_viffff"] = Module["asm"]["ra"]).apply(null, arguments);
};

var dynCall_jiji = Module["dynCall_jiji"] = function() {
 return (dynCall_jiji = Module["dynCall_jiji"] = Module["asm"]["sa"]).apply(null, arguments);
};

var dynCall_iidiiii = Module["dynCall_iidiiii"] = function() {
 return (dynCall_iidiiii = Module["dynCall_iidiiii"] = Module["asm"]["ta"]).apply(null, arguments);
};

var __growWasmMemory = Module["__growWasmMemory"] = function() {
 return (__growWasmMemory = Module["__growWasmMemory"] = Module["asm"]["ua"]).apply(null, arguments);
};

var calledRun;

function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = "Program terminated with exit(" + status + ")";
 this.status = status;
}

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function run(args) {
 args = args || arguments_;
 if (runDependencies > 0) {
  return;
 }
 preRun();
 if (runDependencies > 0) return;
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  preMain();
  readyPromiseResolve(Module);
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
}

Module["run"] = run;

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

noExitRuntime = true;

run();

function makeMatrix(m2d) {
    const m = new DOMMatrix();
    m.a = m2d.xx;
    m.b = m2d.xy;
    m.c = m2d.yx;
    m.d = m2d.yy;
    m.e = m2d.tx;
    m.f = m2d.ty;
    return m;
}

Module.onRuntimeInitialized = function () {
    const {
        RenderPaintStyle,
        FillRule,
        RenderPath,
        RenderPaint,
        Renderer,
        StrokeCap,
        StrokeJoin,
        BlendMode
    } = Module;

    const {
        fill,
        stroke
    } = RenderPaintStyle;

    const {
        evenOdd,
        nonZero
    } = FillRule;

    var CanvasRenderPath = RenderPath.extend("CanvasRenderPath", {
        __construct: function () {
            this.__parent.__construct.call(this);
            this._path2D = new Path2D();
        },
        reset: function () {
            this._path2D = new Path2D();
        },
        addPath: function (path, m2d) {
            this._path2D.addPath(path._path2D, makeMatrix(m2d));
        },
        fillRule: function(fillRule) {
            this._fillRule = fillRule;
        },
        moveTo: function (x, y) {
            this._path2D.moveTo(x, y);
        },
        lineTo: function (x, y) {
            this._path2D.lineTo(x, y);
        },
        cubicTo: function (ox, oy, ix, iy, x, y) {
            this._path2D.bezierCurveTo(ox, oy, ix, iy, x, y);
        },
        close: function () {
            this._path2D.closePath();
        }
    });

    function _colorStyle(value) {
        return 'rgba(' + ((0x00ff0000 & value) >>>
                16) + ',' + ((0x0000ff00 &
                value) >>> 8) + ',' + ((0x000000ff & value) >>> 0) + ',' +
            (((0xff000000 & value) >>> 24) / 0xFF) + ')'
    }
    var CanvasRenderPaint = RenderPaint.extend("CanvasRenderPaint", {
        color: function (value) {
            this._value = _colorStyle(value);
        },
        thickness: function (value) {
            this._thickness = value;
        },
        join: function (value) {
            switch (value) {
                case StrokeJoin.miter:
                    this._join = 'miter';
                    break;
                case StrokeJoin.round:
                    this._join = 'round';
                    break;
                case StrokeJoin.bevel:
                    this._join = 'bevel';
                    break;
            }
        },
        cap: function (value) {
            switch (value) {
                case StrokeCap.butt:
                    this._cap = 'butt';
                    break;
                case StrokeCap.round:
                    this._cap = 'round';
                    break;
                case StrokeCap.square:
                    this._cap = 'square';
                    break;
            }
        },
        style: function (value) {
            this._style = value;
        },
        blendMode: function (value) {
            switch (value) {
                case BlendMode.srcOver:
                    this._blend = 'source-over';
                    break;
                case BlendMode.screen:
                    this._blend = 'screen';
                    break;
                case BlendMode.overlay:
                    this._blend = 'overlay';
                    break;
                case BlendMode.darken:
                    this._blend = 'darken';
                    break;
                case BlendMode.lighten:
                    this._blend = 'lighten';
                    break;
                case BlendMode.colorDodge:
                    this._blend = 'color-dodge';
                    break;
                case BlendMode.colorBurn:
                    this._blend = 'color-burn';
                    break;
                case BlendMode.hardLight:
                    this._blend = 'hard-light';
                    break;
                case BlendMode.softLight:
                    this._blend = 'soft-light';
                    break;
                case BlendMode.difference:
                    this._blend = 'difference';
                    break;
                case BlendMode.exclusion:
                    this._blend = 'exclusion';
                    break;
                case BlendMode.multiply:
                    this._blend = 'multiply';
                    break;
                case BlendMode.hue:
                    this._blend = 'hue';
                    break;
                case BlendMode.saturation:
                    this._blend = 'saturation';
                    break;
                case BlendMode.color:
                    this._blend = 'color';
                    break;
                case BlendMode.luminosity:
                    this._blend = 'luminosity';
                    break;
            }
        },
        linearGradient: function (sx, sy, ex, ey) {
            this._gradient = {
                sx,
                sy,
                ex,
                ey,
                stops: []
            };
        },
        radialGradient: function (sx, sy, ex, ey) {
            this._gradient = {
                sx,
                sy,
                ex,
                ey,
                stops: [],
                isRadial: true
            };
        },
        addStop: function (color, stop) {
            this._gradient.stops.push({
                color,
                stop
            });
        },

        completeGradient: function () {

        },

        draw: function (ctx, path) {
            let {
                _style,
                _value,
                _gradient,
                _blend
            } = this;

            ctx.globalCompositeOperation = _blend;

            if (_gradient != null) {
                const {
                    sx,
                    sy,
                    ex,
                    ey,
                    stops,
                    isRadial
                } = _gradient;

                if (isRadial) {
                    var dx = ex - sx;
                    var dy = ey - sy;
                    var radius = Math.sqrt(dx * dx + dy * dy);
                    _value = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius);
                } else {
                    _value = ctx.createLinearGradient(sx, sy, ex, ey);
                }

                for ({
                        stop,
                        color
                    } of stops) {
                    _value.addColorStop(stop, _colorStyle(color));
                }
                this._value = _value;
                this._gradient = null;
            }
            switch (_style) {
                case stroke:
                    ctx.strokeStyle = _value;
                    ctx.lineWidth = this._thickness;
                    ctx.lineCap = this._cap;
                    ctx.lineJoin = this._join;
                    ctx.stroke(path._path2D);
                    break;
                case fill:
                    ctx.fillStyle = _value;
                    ctx.fill(path._path2D, path._fillRule === evenOdd ? 'evenodd' : 'nonzero');
                    break;
            }
        }
    });

    Module.CanvasRenderer = Renderer.extend("Renderer", {
        __construct: function (ctx) {
            this.__parent.__construct.call(this);
            this._ctx = ctx;
        },
        save: function () {
            this._ctx.save();
        },
        restore: function () {
            this._ctx.restore();
        },
        transform: function (matrix) {
            this._ctx.transform(matrix.xx, matrix.xy, matrix.yx, matrix.yy, matrix.tx,
                matrix.ty);
        },
        drawPath: function (path, paint) {
            paint.draw(this._ctx, path);
        },
        clipPath: function (path) {
            this._ctx.clip(path._path2D, path._fillRule === evenOdd ? 'evenodd' : 'nonzero');
        }
    });

    Module.renderFactory = {
        makeRenderPaint: function () {
            return new CanvasRenderPaint();
        },
        makeRenderPath: function () {
            return new CanvasRenderPath();
        }
    };
};


  return Rive.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
      module.exports = Rive;
    else if (typeof define === 'function' && define['amd'])
      define([], function() { return Rive; });
    else if (typeof exports === 'object')
      exports["Rive"] = Rive;
    
