// Задание:
// Дан целочисленный массив nums и целое число k.
// Верните k наиболее часто встречающихся элементов.
// Вы можете вернуть ответ в любом порядке.

// Ограничения:
// 1) 1 <= nums.length <= 105
// 2) -104 <= nums[i] <= 104
// 3) k is in the range [1, the number of unique elements in the array].

// Ссылка: https://leetcode.com/problems/top-k-frequent-elements/

var topKFrequent = function (nums, k) {
  const freqMap = new Map();
  const bucket = [];
  const result = [];

  for (let num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  for (let [num, freq] of freqMap) {
    bucket[freq] = (bucket[freq] || new Set()).add(num);
  }

  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i]) result.push(...bucket[i]);
    if (result.length === k) break;
  }

  return result;
};

module.exports = topKFrequent;
