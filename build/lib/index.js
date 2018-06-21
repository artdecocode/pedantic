"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKeys = exports.excludeReducer = void 0;

/**
 * Exclude items from the array
 * @param {[string[], string[]]} acc left to exclude, and non-excluded
 * @param {string} current
 */
const excludeReducer = (acc, current) => {
  const [ok, ex] = acc;
  let i;

  if (!ex.length || (i = ex.indexOf(current)) == -1) {
    return [[...ok, current], ex];
  }

  const before = ex.slice(0, i);
  const after = ex.slice(i + 1, -1);
  const newExcluded = [...before, ...after];
  return [ok, newExcluded];
};

exports.excludeReducer = excludeReducer;

const hasFile = (array, file) => {
  return array.some(a => a == file);
};
/**
 * @param {string[]} files
 */


const getKeys = files => {
  const hasIndex = hasFile(files, 'index.md');
  const hasFooter = hasFile(files, 'footer.md');
  const excluded = ['index.md', 'footer.md'];
  const [f] = files.reduce(excludeReducer, [[], excluded]);
  const sorted = f.sort();

  if (hasIndex && hasFooter) {
    return ['index.md', ...sorted, 'footer.md'];
  }

  if (hasIndex) {
    return ['index.md', ...sorted];
  }

  if (hasFooter) {
    return [...sorted, 'footer.md'];
  }

  return sorted;
};

exports.getKeys = getKeys;
//# sourceMappingURL=index.js.map