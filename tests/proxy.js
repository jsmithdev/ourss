const url = 'https://www.patreon.com/rss/nerdpoker?auth=1a4mPdGsvu2JRekulAPn8_0wz1JIpaq_'

const urlEncoded = encodeURIComponent(url)

const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

function binarySearchAlgo(arr, target){

    return findTargetHelper(target);

    function findTargetHelper(target, start =  0, end = arr.length - 1){
        
        if(start > end) return -1;

        const mid = Math.floor((start + end) / 2);
    
        if(arr[mid] === target) return mid;
    
        if(arr[mid] > target) return findTargetHelper(target, start, mid - 1);
    
        if(arr[mid] < target) return findTargetHelper(target, mid + 1, end);
    }
}

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    
    nums1 = [...nums1, ...nums2]
        .filter(x => x > 0)
        .sort((a,b) => a-b)

    return nums1;
};

merge([1,2,3,0,0,0], 3, [2,5,6], 3) //?
merge([0], 0, [1], 1) //?
merge([1], 1, [], 0) //?