// ════════════════════════════════════════════════════════════════
// Additional Problems Seed - 15+ More Problems
// ════════════════════════════════════════════════════════════════

import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Delete existing problems first
    await knex('problems').del();

    // Insert 18 diverse coding problems
    await knex('problems').insert([
        // EASY PROBLEMS (8 problems)
        {
            title: 'Two Sum',
            slug: 'two-sum',
            difficulty: 'easy',
            category: 'Arrays',
            description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
            examples: JSON.stringify([
                { input: { nums: [2, 7, 11, 15], target: 9 }, output: [0, 1], explanation: 'Because nums[0] + nums[1] == 9' },
                { input: { nums: [3, 2, 4], target: 6 }, output: [1, 2] }
            ]),
            constraints: JSON.stringify(['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Only one valid answer exists']),
            test_cases: JSON.stringify([
                { input: { nums: [2, 7, 11, 15], target: 9 }, expected_output: [0, 1] },
                { input: { nums: [3, 2, 4], target: 6 }, expected_output: [1, 2] },
                { input: { nums: [3, 3], target: 6 }, expected_output: [0, 1] }
            ]),
            tags: JSON.stringify(['arrays', 'hash-table', 'easy']),
            companies: JSON.stringify(['google', 'amazon', 'facebook']),
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Valid Parentheses',
            slug: 'valid-parentheses',
            difficulty: 'easy',
            category: 'Stack',
            description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.',
            examples: JSON.stringify([
                { input: '()', output: true },
                { input: '()[]{}', output: true },
                { input: '(]', output: false }
            ]),
            constraints: JSON.stringify(['1 <= s.length <= 10^4', 's consists of parentheses only \'()[]{}\'.']),
            test_cases: JSON.stringify([
                { input: '()', expected_output: true },
                { input: '()[]{}', expected_output: true },
                { input: '(]', expected_output: false },
                { input: '([)]', expected_output: false }
            ]),
            tags: ['stack', 'string', 'easy'],
            companies: ['microsoft', 'amazon', 'bloomberg'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Reverse Linked List',
            slug: 'reverse-linked-list',
            difficulty: 'easy',
            category: 'Linked List',
            description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
            examples: JSON.stringify([
                { input: [1, 2, 3, 4, 5], output: [5, 4, 3, 2, 1] },
                { input: [1, 2], output: [2, 1] },
                { input: [], output: [] }
            ]),
            constraints: JSON.stringify(['The number of nodes in the list is the range [0, 5000].', '-5000 <= Node.val <= 5000']),
            test_cases: JSON.stringify([
                { input: [1, 2, 3, 4, 5], expected_output: [5, 4, 3, 2, 1] },
                { input: [1, 2], expected_output: [2, 1] }
            ]),
            tags: ['linked-list', 'recursion', 'easy'],
            companies: ['amazon', 'microsoft', 'apple'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Merge Two Sorted Lists',
            slug: 'merge-two-sorted-lists',
            difficulty: 'easy',
            category: 'Linked List',
            description: 'You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.',
            examples: JSON.stringify([
                { input: { list1: [1, 2, 4], list2: [1, 3, 4] }, output: [1, 1, 2, 3, 4, 4] },
                { input: { list1: [], list2: [] }, output: [] }
            ]),
            constraints: JSON.stringify(['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100']),
            test_cases: JSON.stringify([
                { input: { list1: [1, 2, 4], list2: [1, 3, 4] }, expected_output: [1, 1, 2, 3, 4, 4] }
            ]),
            tags: ['linked-list', 'recursion', 'easy'],
            companies: ['amazon', 'microsoft', 'apple'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Maximum Subarray',
            slug: 'maximum-subarray',
            difficulty: 'easy',
            category: 'Arrays',
            description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
            examples: JSON.stringify([
                { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], output: 6, explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
                { input: [1], output: 1 },
                { input: [5, 4, -1, 7, 8], output: 23 }
            ]),
            constraints: JSON.stringify(['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4']),
            test_cases: JSON.stringify([
                { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], expected_output: 6 },
                { input: [1], expected_output: 1 }
            ]),
            tags: ['arrays', 'dynamic-programming', 'easy'],
            companies: ['amazon', 'microsoft', 'linkedin'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Best Time to Buy and Sell Stock',
            slug: 'best-time-to-buy-and-sell-stock',
            difficulty: 'easy',
            category: 'Arrays',
            description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
            examples: JSON.stringify([
                { input: [7, 1, 5, 3, 6, 4], output: 5, explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
                { input: [7, 6, 4, 3, 1], output: 0 }
            ]),
            constraints: JSON.stringify(['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4']),
            test_cases: JSON.stringify([
                { input: [7, 1, 5, 3, 6, 4], expected_output: 5 },
                { input: [7, 6, 4, 3, 1], expected_output: 0 }
            ]),
            tags: ['arrays', 'dynamic-programming', 'easy'],
            companies: ['amazon', 'facebook', 'microsoft'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Palindrome Number',
            slug: 'palindrome-number',
            difficulty: 'easy',
            category: 'Math',
            description: 'Given an integer x, return true if x is a palindrome, and false otherwise.',
            examples: JSON.stringify([
                { input: 121, output: true, explanation: '121 reads as 121 from left to right and from right to left.' },
                { input: -121, output: false, explanation: 'From left to right, it reads -121. From right to left, it becomes 121-.' },
                { input: 10, output: false }
            ]),
            constraints: JSON.stringify(['-2^31 <= x <= 2^31 - 1']),
            test_cases: JSON.stringify([
                { input: 121, expected_output: true },
                { input: -121, expected_output: false },
                { input: 10, expected_output: false }
            ]),
            tags: ['math', 'easy'],
            companies: ['amazon', 'apple', 'adobe'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Valid Anagram',
            slug: 'valid-anagram',
            difficulty: 'easy',
            category: 'String',
            description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
            examples: JSON.stringify([
                { input: { s: 'anagram', t: 'nagaram' }, output: true },
                { input: { s: 'rat', t: 'car' }, output: false }
            ]),
            constraints: JSON.stringify(['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.']),
            test_cases: JSON.stringify([
                { input: { s: 'anagram', t: 'nagaram' }, expected_output: true },
                { input: { s: 'rat', t: 'car' }, expected_output: false }
            ]),
            tags: ['string', 'hash-table', 'easy'],
            companies: ['amazon', 'bloomberg', 'microsoft'],
            acceptance_rate: 0,
            is_premium: false,
        },

        // MEDIUM PROBLEMS (7 problems)
        {
            title: 'Longest Substring Without Repeating Characters',
            slug: 'longest-substring-without-repeating-characters',
            difficulty: 'medium',
            category: 'String',
            description: 'Given a string s, find the length of the longest substring without repeating characters.',
            examples: JSON.stringify([
                { input: 'abcabcbb', output: 3, explanation: 'The answer is \\"abc\\", with the length of 3.' },
                { input: 'bbbbb', output: 1, explanation: 'The answer is \\"b\\", with the length of 1.' },
                { input: 'pwwkew', output: 3, explanation: 'The answer is \\"wke\\", with the length of 3.' }
            ]),
            constraints: JSON.stringify(['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.']),
            test_cases: JSON.stringify([
                { input: 'abcabcbb', expected_output: 3 },
                { input: 'bbbbb', expected_output: 1 },
                { input: 'pwwkew', expected_output: 3 }
            ]),
            tags: ['string', 'sliding-window', 'medium'],
            companies: ['amazon', 'adobe', 'bloomberg'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Add Two Numbers',
            slug: 'add-two-numbers',
            difficulty: 'medium',
            category: 'Linked List',
            description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
            examples: JSON.stringify([
                { input: { l1: [2, 4, 3], l2: [5, 6, 4] }, output: [7, 0, 8], explanation: '342 + 465 = 807.' }
            ]),
            constraints: JSON.stringify(['The number of nodes in each linked list is in the range [1, 100].', '0 <= Node.val <= 9']),
            test_cases: JSON.stringify([
                { input: { l1: [2, 4, 3], l2: [5, 6, 4] }, expected_output: [7, 0, 8] }
            ]),
            tags: ['linked-list', 'math', 'medium'],
            companies: ['amazon', 'microsoft', 'adobe'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Container With Most Water',
            slug: 'container-with-most-water',
            difficulty: 'medium',
            category: 'Arrays',
            description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.',
            examples: JSON.stringify([
                { input: [1, 8, 6, 2, 5, 4, 8, 3, 7], output: 49 },
                { input: [1, 1], output: 1 }
            ]),
            constraints: JSON.stringify(['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4']),
            test_cases: JSON.stringify([
                { input: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected_output: 49 },
                { input: [1, 1], expected_output: 1 }
            ]),
            tags: ['arrays', 'two-pointers', 'medium'],
            companies: ['amazon', 'facebook', 'adobe'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: '3Sum',
            slug: '3sum',
            difficulty: 'medium',
            category: 'Arrays',
            description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.',
            examples: JSON.stringify([
                { input: [-1, 0, 1, 2, -1, -4], output: [[-1, -1, 2], [-1, 0, 1]] },
                { input: [0, 1, 1], output: [] },
                { input: [0, 0, 0], output: [[0, 0, 0]] }
            ]),
            constraints: JSON.stringify(['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5']),
            test_cases: JSON.stringify([
                { input: [-1, 0, 1, 2, -1, -4], expected_output: [[-1, -1, 2], [-1, 0, 1]] }
            ]),
            tags: ['arrays', 'two-pointers', 'sorting', 'medium'],
            companies: ['facebook', 'amazon', 'microsoft'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Group Anagrams',
            slug: 'group-anagrams',
            difficulty: 'medium',
            category: 'String',
            description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
            examples: JSON.stringify([
                { input: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'], output: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']] },
                { input: [''], output: [['']] },
                { input: ['a'], output: [['a']] }
            ]),
            constraints: JSON.stringify(['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100']),
            test_cases: JSON.stringify([
                { input: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'], expected_output: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']] }
            ]),
            tags: ['string', 'hash-table', 'medium'],
            companies: ['amazon', 'uber', 'yelp'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Longest Palindromic Substring',
            slug: 'longest-palindromic-substring',
            difficulty: 'medium',
            category: 'String',
            description: 'Given a string s, return the longest palindromic substring in s.',
            examples: JSON.stringify([
                { input: 'babad', output: 'bab', explanation: '\\"aba\\" is also a valid answer.' },
                { input: 'cbbd', output: 'bb' }
            ]),
            constraints: JSON.stringify(['1 <= s.length <= 1000', 's consist of only digits and English letters.']),
            test_cases: JSON.stringify([
                { input: 'babad', expected_output: 'bab' },
                { input: 'cbbd', expected_output: 'bb' }
            ]),
            tags: ['string', 'dynamic-programming', 'medium'],
            companies: ['amazon', 'microsoft', 'adobe'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Product of Array Except Self',
            slug: 'product-of-array-except-self',
            difficulty: 'medium',
            category: 'Arrays',
            description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.',
            examples: JSON.stringify([
                { input: [1, 2, 3, 4], output: [24, 12, 8, 6] },
                { input: [-1, 1, 0, -3, 3], output: [0, 0, 9, 0, 0] }
            ]),
            constraints: JSON.stringify(['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30']),
            test_cases: JSON.stringify([
                { input: [1, 2, 3, 4], expected_output: [24, 12, 8, 6] },
                { input: [-1, 1, 0, -3, 3], expected_output: [0, 0, 9, 0, 0] }
            ]),
            tags: ['arrays', 'prefix-sum', 'medium'],
            companies: ['amazon', 'facebook', 'microsoft'],
            acceptance_rate: 0,
            is_premium: false,
        },

        // HARD PROBLEMS (3 problems)
        {
            title: 'Median of Two Sorted Arrays',
            slug: 'median-of-two-sorted-arrays',
            difficulty: 'hard',
            category: 'Arrays',
            description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).',
            examples: JSON.stringify([
                { input: { nums1: [1, 3], nums2: [2] }, output: 2.0 },
                { input: { nums1: [1, 2], nums2: [3, 4] }, output: 2.5 }
            ]),
            constraints: JSON.stringify(['nums1.length == m', 'nums2.length == n', '0 <= m <= 1000', '0 <= n <= 1000']),
            test_cases: JSON.stringify([
                { input: { nums1: [1, 3], nums2: [2] }, expected_output: 2.0 },
                { input: { nums1: [1, 2], nums2: [3, 4] }, expected_output: 2.5 }
            ]),
            tags: ['arrays', 'binary-search', 'hard'],
            companies: ['google', 'amazon', 'adobe'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Trapping Rain Water',
            slug: 'trapping-rain-water',
            difficulty: 'hard',
            category: 'Arrays',
            description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
            examples: JSON.stringify([
                { input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], output: 6 },
                { input: [4, 2, 0, 3, 2, 5], output: 9 }
            ]),
            constraints: JSON.stringify(['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5']),
            test_cases: JSON.stringify([
                { input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], expected_output: 6 },
                { input: [4, 2, 0, 3, 2, 5], expected_output: 9 }
            ]),
            tags: ['arrays', 'two-pointers', 'stack', 'hard'],
            companies: ['amazon', 'google', 'apple'],
            acceptance_rate: 0,
            is_premium: false,
        },
        {
            title: 'Merge k Sorted Lists',
            slug: 'merge-k-sorted-lists',
            difficulty: 'hard',
            category: 'Linked List',
            description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.',
            examples: JSON.stringify([
                { input: [[1, 4, 5], [1, 3, 4], [2, 6]], output: [1, 1, 2, 3, 4, 4, 5, 6] },
                { input: [], output: [] }
            ]),
            constraints: JSON.stringify(['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500']),
            test_cases: JSON.stringify([
                { input: [[1, 4, 5], [1, 3, 4], [2, 6]], expected_output: [1, 1, 2, 3, 4, 4, 5, 6] }
            ]),
            tags: ['linked-list', 'heap', 'hard'],
            companies: ['facebook', 'amazon', 'google'],
            acceptance_rate: 0,
            is_premium: false,
        },
    ]);

    console.log('✅ Seeded 18 diverse coding problems');
}
