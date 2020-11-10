'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.execRxp = exports.getStr = exports.trimStr = exports.getMajor = exports.getLower = exports.hasStr = void 0;
var FUN_TYPE = 'function';
var STR_TYPE = 'string';
var UNKNOWN = '?';
exports.hasStr = function (str1, str2) {
  if (typeof str1 !== STR_TYPE) return false;
  return String(str2).toLowerCase().indexOf(str1.toLowerCase()) !== -1;
};
exports.getLower = function (str) {
  return str.toLowerCase();
};
exports.getMajor = function (version) {
  if (typeof version !== STR_TYPE) return;
  return version
    .replace(/[^\d\.]/g, '')
    .split('.')
    .shift();
};
exports.trimStr = function (str) {
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};
exports.getStr = function (str, maps) {
  for (var i in maps) {
    var map = maps[i];
    if (map instanceof Array && map.length > 0) {
      for (var j = 0; j < map.length; j += 1) {
        if (exports.hasStr(map[j], str)) {
          return i === UNKNOWN ? undefined : i;
        }
      }
    } else if (exports.hasStr(map, str)) {
      return i === UNKNOWN ? undefined : i;
    }
  }
  return str;
};
exports.execRxp = function (target, ua, arrays) {
  if (!ua) return;
  var i = 0;
  var matches;
  var _loop_1 = function () {
    var regex = arrays[i];
    var props = arrays[i + 1];
    var k = 0;
    var j = k;
    while (j < regex.length && !matches) {
      matches = regex[j].exec(ua);
      j += 1;
      if (!matches) continue;
      props.forEach(function (prop) {
        k += 1;
        var match = matches[k];
        if (!(prop instanceof Array) || prop.length < 1) {
          target[prop] = match || undefined;
          return;
        }
        if (prop.length < 2) return;
        var key = prop[0];
        var val = prop[1];
        var isFunc = typeof val === FUN_TYPE;
        switch (prop.length) {
          case 2:
            target[key] = isFunc ? val.call(target, match) : val;
            return;
          case 3:
            if (!match) {
              target[key] = undefined;
            } else if (isFunc && !(val.exec && val.test)) {
              target[key] = val.call(target, match, prop[2]);
            } else {
              target[key] = match.replace(val, prop[2]);
            }
            return;
          case 4:
            target[key] = match ? prop[3].call(target, match.replace(val, prop[2])) : undefined;
            return;
        }
      });
    }
    i += 2;
  };
  while (i < arrays.length && !matches) {
    _loop_1();
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBQzVCLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUMxQixJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFFUCxRQUFBLE1BQU0sR0FBRyxVQUFDLElBQVMsRUFBRSxJQUFZO0lBQzVDLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzNDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN2RSxDQUFDLENBQUM7QUFFVyxRQUFBLFFBQVEsR0FBRyxVQUFDLEdBQVcsSUFBSyxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQztBQUU5QyxRQUFBLFFBQVEsR0FBRyxVQUFDLE9BQVk7SUFDbkMsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRO1FBQUUsT0FBTztJQUN4QyxPQUFPLE9BQU87U0FDWCxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztTQUN2QixLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsS0FBSyxFQUFFLENBQUM7QUFDYixDQUFDLENBQUM7QUFFVyxRQUFBLE9BQU8sR0FBRyxVQUFDLEdBQVcsSUFBSyxPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsb0NBQW9DLEVBQUUsRUFBRSxDQUFDLEVBQXJELENBQXFELENBQUM7QUFFakYsUUFBQSxNQUFNLEdBQUcsVUFBQyxHQUFXLEVBQUUsSUFBUztJQUUzQyxLQUFLLElBQU0sQ0FBQyxJQUFJLElBQUksRUFBRTtRQUNwQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7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
