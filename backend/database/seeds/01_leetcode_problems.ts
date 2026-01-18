// ════════════════════════════════════════════════════════════════
// 48 High-Quality LeetCode-Style Problems
// Distribution: Arrays(12), Strings(10), Trees(8), DP(8), Graphs(4), Stack(3), Linked Lists(2), Hash Table(1)
// ════════════════════════════════════════════════════════════════

import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('problems').del();

    const problems = [
        // ═══════════════ ARRAYS (12) ═══════════════
        {
            title: 'Two Sum', slug: 'two-sum', difficulty: 'easy', category: 'Arrays',
            description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
            examples: JSON.stringify([{ input: { nums: [2, 7, 11, 15], target: 9 }, output: [0, 1] }]),
            constraints: JSON.stringify(['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9']),
            test_cases: JSON.stringify([
                { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1], is_visible: true },
                { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2], is_visible: true },
                { input: { nums: [3, 3], target: 6 }, expected: [0, 1], is_visible: false }
            ]),
            tags: JSON.stringify(['array', 'hash-table']), companies: JSON.stringify(['google', 'amazon']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-and-sell-stock', difficulty: 'easy', category: 'Arrays',
            description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit.',
            examples: JSON.stringify([{ input: { prices: [7, 1, 5, 3, 6, 4] }, output: 5 }]),
            constraints: JSON.stringify(['1 <= prices.length <= 10^5']),
            test_cases: JSON.stringify([
                { input: { prices: [7, 1, 5, 3, 6, 4] }, expected: 5, is_visible: true },
                { input: { prices: [7, 6, 4, 3, 1] }, expected: 0, is_visible: false }
            ]),
            tags: JSON.stringify(['array', 'dynamic-programming']), companies: JSON.stringify(['amazon', 'microsoft']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Contains Duplicate', slug: 'contains-duplicate', difficulty: 'easy', category: 'Arrays',
            description: 'Given an integer array nums, return true if any value appears at least twice in the array.',
            examples: JSON.stringify([{ input: { nums: [1, 2, 3, 1] }, output: true }]),
            constraints: JSON.stringify(['1 <= nums.length <= 10^5']),
            test_cases: JSON.stringify([
                { input: { nums: [1, 2, 3, 1] }, expected: true, is_visible: true },
                { input: { nums: [1, 2, 3, 4] }, expected: false, is_visible: false }
            ]),
            tags: JSON.stringify(['array', 'hash-table']), companies: JSON.stringify(['airbnb', 'palantir']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Maximum Subarray', slug: 'maximum-subarray', difficulty: 'medium', category: 'Arrays',
            description: 'Find the contiguous subarray which has the largest sum and return its sum.',
            examples: JSON.stringify([{ input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, output: 6 }]),
            constraints: JSON.stringify(['1 <= nums.length <= 10^5']),
            test_cases: JSON.stringify([
                { input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, expected: 6, is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'dynamic-programming', 'divide-and-conquer']), companies: JSON.stringify(['linkedin', 'bloomberg']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Product of Array Except Self', slug: 'product-of-array-except-self', difficulty: 'medium', category: 'Arrays',
            description: 'Return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].',
            examples: JSON.stringify([{ input: { nums: [1, 2, 3, 4] }, output: [24, 12, 8, 6] }]),
            constraints: JSON.stringify(['2 <= nums.length <= 10^5']),
            test_cases: JSON.stringify([
                { input: { nums: [1, 2, 3, 4] }, expected: [24, 12, 8, 6], is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'prefix-sum']), companies: JSON.stringify(['facebook', 'amazon']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Maximum Product Subarray', slug: 'maximum-product-subarray', difficulty: 'medium', category: 'Arrays',
            description: 'Find the contiguous subarray within an array which has the largest product.',
            examples: JSON.stringify([{ input: { nums: [2, 3, -2, 4] }, output: 6 }]),
            constraints: JSON.stringify(['1 <= nums.length <= 2 * 10^4']),
            test_cases: JSON.stringify([
                { input: { nums: [2, 3, -2, 4] }, expected: 6, is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'dynamic-programming']), companies: JSON.stringify(['linkedin']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array', difficulty: 'medium', category: 'Arrays',
            description: 'Search for a target value in a rotated sorted array. Return its index or -1 if not found.',
            examples: JSON.stringify([{ input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }, output: 4 }]),
            constraints: JSON.stringify(['1 <= nums.length <= 5000']),
            test_cases: JSON.stringify([
                { input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }, expected: 4, is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'binary-search']), companies: JSON.stringify(['facebook', 'amazon']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Container With Most Water', slug: 'container-with-most-water', difficulty: 'medium', category: 'Arrays',
            description: 'Given n non-negative integers representing heights, find two lines that together with the x-axis form a container with most water.',
            examples: JSON.stringify([{ input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] }, output: 49 }]),
            constraints: JSON.stringify(['2 <= height.length <= 10^5']),
            test_cases: JSON.stringify([
                { input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] }, expected: 49, is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'two-pointers', 'greedy']), companies: JSON.stringify(['bloomberg', 'facebook']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: '3Sum', slug: '3sum', difficulty: 'medium', category: 'Arrays',
            description: 'Given an integer array nums, return all the triplets that sum to zero.',
            examples: JSON.stringify([{ input: { nums: [-1, 0, 1, 2, -1, -4] }, output: [[-1, -1, 2], [-1, 0, 1]] }]),
            constraints: JSON.stringify(['0 <= nums.length <= 3000']),
            test_cases: JSON.stringify([
                { input: { nums: [-1, 0, 1, 2, -1, -4] }, expected: [[-1, -1, 2], [-1, 0, 1]], is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'two-pointers', 'sorting']), companies: JSON.stringify(['facebook', 'amazon', 'microsoft']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Merge Intervals', slug: 'merge-intervals', difficulty: 'medium', category: 'Arrays',
            description: 'Given an array of intervals, merge all overlapping intervals.',
            examples: JSON.stringify([{ input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] }, output: [[1, 6], [8, 10], [15, 18]] }]),
            constraints: JSON.stringify(['1 <= intervals.length <= 10^4']),
            test_cases: JSON.stringify([
                { input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] }, expected: [[1, 6], [8, 10], [15, 18]], is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'sorting']), companies: JSON.stringify(['facebook', 'google', 'bloomberg']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Trapping Rain Water', slug: 'trapping-rain-water', difficulty: 'hard', category: 'Arrays',
            description: 'Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.',
            examples: JSON.stringify([{ input: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] }, output: 6 }]),
            constraints: JSON.stringify(['n == height.length', '1 <= n <= 2 * 10^4']),
            test_cases: JSON.stringify([
                { input: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] }, expected: 6, is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'two-pointers', 'dynamic-programming', 'stack']), companies: JSON.stringify(['amazon', 'google', 'facebook']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Median of Two Sorted Arrays', slug: 'median-of-two-sorted-arrays', difficulty: 'hard', category: 'Arrays',
            description: 'Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.',
            examples: JSON.stringify([{ input: { nums1: [1, 3], nums2: [2] }, output: 2.0 }]),
            constraints: JSON.stringify(['nums1.length + nums2.length >= 1']),
            test_cases: JSON.stringify([
                { input: { nums1: [1, 3], nums2: [2] }, expected: 2.0, is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'binary-search', 'divide-and-conquer']), companies: JSON.stringify(['google', 'amazon']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },

        // ═══════════════ STRINGS (10) ═══════════════
        {
            title: 'Valid Anagram', slug: 'valid-anagram', difficulty: 'easy', category: 'Strings',
            description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
            examples: JSON.stringify([{ input: { s: 'anagram', t: 'nagaram' }, output: true }]),
            constraints: JSON.stringify(['1 <= s.length, t.length <= 5 * 10^4']),
            test_cases: JSON.stringify([
                { input: { s: 'anagram', t: 'nagaram' }, expected: true, is_visible: true },
                { input: { s: 'rat', t: 'car' }, expected: false, is_visible: false }
            ]),
            tags: JSON.stringify(['hash-table', 'string', 'sorting']), companies: JSON.stringify(['amazon', 'bloomberg']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Valid Parentheses', slug: 'valid-parentheses', difficulty: 'easy', category: 'Strings',
            description: `Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
            examples: JSON.stringify([{ input: { s: '()' }, output: true }]),
            constraints: JSON.stringify(['1 <= s.length <= 10^4']),
            test_cases: JSON.stringify([
                { input: { s: '()' }, expected: true, is_visible: true },
                { input: { s: '()[]{}' }, expected: true, is_visible: true },
                { input: { s: '(]' }, expected: false, is_visible: false }
            ]),
            tags: JSON.stringify(['string', 'stack']), companies: JSON.stringify(['amazon', 'google', 'facebook']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeating-characters', difficulty: 'medium', category: 'Strings',
            description: 'Given a string s, find the length of the longest substring without repeating characters.',
            examples: JSON.stringify([{ input: { s: 'abcabcbb' }, output: 3 }]),
            constraints: JSON.stringify(['0 <= s.length <= 5 * 10^4']),
            test_cases: JSON.stringify([
                { input: { s: 'abcabcbb' }, expected: 3, is_visible: true },
                { input: { s: 'bbbbb' }, expected: 1, is_visible: false }
            ]),
            tags: JSON.stringify(['hash-table', 'string', 'sliding-window']), companies: JSON.stringify(['amazon', 'adobe', 'bloomberg']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring', difficulty: 'medium', category: 'Strings',
            description: 'Given a string s, return the longest palindromic substring in s.',
            examples: JSON.stringify([{ input: { s: 'babad' }, output: 'bab' }]),
            constraints: JSON.stringify(['1 <= s.length <= 1000']),
            test_cases: JSON.stringify([
                { input: { s: 'babad' }, expected: 'bab', is_visible: true }
            ]),
            tags: JSON.stringify(['string', 'dynamic-programming']), companies: JSON.stringify(['amazon', 'microsoft']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Group Anagrams', slug: 'group-anagrams', difficulty: 'medium', category: 'Strings',
            description: 'Given an array of strings strs, group the anagrams together.',
            examples: JSON.stringify([{ input: { strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'] }, output: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']] }]),
            constraints: JSON.stringify(['1 <= strs.length <= 10^4']),
            test_cases: JSON.stringify([
                { input: { strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'] }, expected: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']], is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'hash-table', 'string', 'sorting']), companies: JSON.stringify(['amazon', 'uber']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Palindromic Substrings', slug: 'palindromic-substrings', difficulty: 'medium', category: 'Strings',
            description: 'Given a string s, return the number of palindromic substrings in it.',
            examples: JSON.stringify([{ input: { s: 'abc' }, output: 3 }]),
            constraints: JSON.stringify(['1 <= s.length <= 1000']),
            test_cases: JSON.stringify([
                { input: { s: 'abc' }, expected: 3, is_visible: true }
            ]),
            tags: JSON.stringify(['string', 'dynamic-programming']), companies: JSON.stringify(['facebook', 'linkedin']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Valid Palindrome', slug: 'valid-palindrome', difficulty: 'easy', category: 'Strings',
            description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
            examples: JSON.stringify([{ input: { s: 'A man, a plan, a canal: Panama' }, output: true }]),
            constraints: JSON.stringify(['1 <= s.length <= 2 * 10^5']),
            test_cases: JSON.stringify([
                { input: { s: 'A man, a plan, a canal: Panama' }, expected: true, is_visible: true }
            ]),
            tags: JSON.stringify(['two-pointers', 'string']), companies: JSON.stringify(['facebook', 'microsoft']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Longest Repeating Character Replacement', slug: 'longest-repeating-character-replacement', difficulty: 'medium', category: 'Strings',
            description: 'You can replace any k characters. Find the length of the longest substring containing the same letter you can get.',
            examples: JSON.stringify([{ input: { s: 'ABAB', k: 2 }, output: 4 }]),
            constraints: JSON.stringify(['1 <= s.length <= 10^5']),
            test_cases: JSON.stringify([
                { input: { s: 'ABAB', k: 2 }, expected: 4, is_visible: true }
            ]),
            tags: JSON.stringify(['hash-table', 'string', 'sliding-window']), companies: JSON.stringify(['pocket-gems']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Minimum Window Substring', slug: 'minimum-window-substring', difficulty: 'hard', category: 'Strings',
            description: 'Given two strings s and t, return the minimum window substring of s such that every character in t is included in the window.',
            examples: JSON.stringify([{ input: { s: 'ADOBECODEBANC', t: 'ABC' }, output: 'BANC' }]),
            constraints: JSON.stringify(['1 <= s.length, t.length <= 10^5']),
            test_cases: JSON.stringify([
                { input: { s: 'ADOBECODEBANC', t: 'ABC' }, expected: 'BANC', is_visible: true }
            ]),
            tags: JSON.stringify(['hash-table', 'string', 'sliding-window']), companies: JSON.stringify(['linkedin', 'facebook', 'uber']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Encode and Decode Strings', slug: 'encode-and-decode-strings', difficulty: 'medium', category: 'Strings',
            description: 'Design an algorithm to encode a list of strings to a string and decode it back.',
            examples: JSON.stringify([{ input: { strs: ['Hello', 'World'] }, output: 'Hello World' }]),
            constraints: JSON.stringify(['1 <= strs.length <= 200']),
            test_cases: JSON.stringify([
                { input: { strs: ['Hello', 'World'] }, expected: ['Hello', 'World'], is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'string', 'design']), companies: JSON.stringify(['google']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },

        // ═══════════════ TREES (8) ═══════════════
        {
            title: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree', difficulty: 'easy', category: 'Trees',
            description: 'Given the root of a binary tree, return its maximum depth.',
            examples: JSON.stringify([{ input: { root: [3, 9, 20, null, null, 15, 7] }, output: 3 }]),
            constraints: JSON.stringify(['The number of nodes in the tree is in the range [0, 10^4]']),
            test_cases: JSON.stringify([
                { input: { root: [3, 9, 20, null, null, 15, 7] }, expected: 3, is_visible: true }
            ]),
            tags: JSON.stringify(['tree', 'depth-first-search', 'breadth-first-search', 'binary-tree']), companies: JSON.stringify(['linkedin', 'uber']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Invert Binary Tree', slug: 'invert-binary-tree', difficulty: 'easy', category: 'Trees',
            description: 'Given the root of a binary tree, invert the tree, and return its root.',
            examples: JSON.stringify([{ input: { root: [4, 2, 7, 1, 3, 6, 9] }, output: [4, 7, 2, 9, 6, 3, 1] }]),
            constraints: JSON.stringify(['The number of nodes in the tree is in the range [0, 100]']),
            test_cases: JSON.stringify([
                { input: { root: [4, 2, 7, 1, 3, 6, 9] }, expected: [4, 7, 2, 9, 6, 3, 1], is_visible: true }
            ]),
            tags: JSON.stringify(['tree', 'depth-first-search', 'breadth-first-search', 'binary-tree']), companies: JSON.stringify(['google']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Same Tree', slug: 'same-tree', difficulty: 'easy', category: 'Trees',
            description: 'Given the roots of two binary trees p and q, check if they are the same.',
            examples: JSON.stringify([{ input: { p: [1, 2, 3], q: [1, 2, 3] }, output: true }]),
            constraints: JSON.stringify(['The number of nodes in both trees is in the range [0, 100]']),
            test_cases: JSON.stringify([
                { input: { p: [1, 2, 3], q: [1, 2, 3] }, expected: true, is_visible: true }
            ]),
            tags: JSON.stringify(['tree', 'depth-first-search', 'breadth-first-search', 'binary-tree']), companies: JSON.stringify(['bloomberg']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Binary Tree Level Order Traversal', slug: 'binary-tree-level-order-traversal', difficulty: 'medium', category: 'Trees',
            description: 'Given the root of a binary tree, return the level order traversal of its nodes values.',
            examples: JSON.stringify([{ input: { root: [3, 9, 20, null, null, 15, 7] }, output: [[3], [9, 20], [15, 7]] }]),
            constraints: JSON.stringify(['The number of nodes in the tree is in the range [0, 2000]']),
            test_cases: JSON.stringify([
                { input: { root: [3, 9, 20, null, null, 15, 7] }, expected: [[3], [9, 20], [15, 7]], is_visible: true }
            ]),
            tags: JSON.stringify(['tree', 'breadth-first-search', 'binary-tree']), companies: JSON.stringify(['facebook', 'amazon', 'microsoft']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Validate Binary Search Tree', slug: 'validate-binary-search-tree', difficulty: 'medium', category: 'Trees',
            description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
            examples: JSON.stringify([{ input: { root: [2, 1, 3] }, output: true }]),
            constraints: JSON.stringify(['The number of nodes in the tree is in the range [1, 10^4]']),
            test_cases: JSON.stringify([
                { input: { root: [2, 1, 3] }, expected: true, is_visible: true }
            ]),
            tags: JSON.stringify(['tree', 'depth-first-search', 'binary-search-tree', 'binary-tree']), companies: JSON.stringify(['amazon', 'facebook', 'microsoft']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Lowest Common Ancestor of BST', slug: 'lowest-common-ancestor-of-bst', difficulty: 'medium', category: 'Trees',
            description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes.',
            examples: JSON.stringify([{ input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 }, output: 6 }]),
            constraints: JSON.stringify(['The number of nodes in the tree is in the range [2, 10^5]']),
            test_cases: JSON.stringify([
                { input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 }, expected: 6, is_visible: true }
            ]),
            tags: JSON.stringify(['tree', 'depth-first-search', 'binary-search-tree', 'binary-tree']), companies: JSON.stringify(['facebook', 'amazon', 'microsoft']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Kth Smallest Element in BST', slug: 'kth-smallest-element-in-bst', difficulty: 'medium', category: 'Trees',
            description: 'Given the root of a binary search tree, and an integer k, return the kth smallest value.',
            examples: JSON.stringify([{ input: { root: [3, 1, 4, null, 2], k: 1 }, output: 1 }]),
            constraints: JSON.stringify(['The number of nodes in the tree is n', '1 <= k <= n <= 10^4']),
            test_cases: JSON.stringify([
                { input: { root: [3, 1, 4, null, 2], k: 1 }, expected: 1, is_visible: true }
            ]),
            tags: JSON.stringify(['tree', 'depth-first-search', 'binary-search-tree', 'binary-tree']), companies: JSON.stringify(['amazon', 'uber']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Binary Tree Maximum Path Sum', slug: 'binary-tree-maximum-path-sum', difficulty: 'hard', category: 'Trees',
            description: 'A path in a binary tree is a sequence of nodes. Return the maximum path sum of any non-empty path.',
            examples: JSON.stringify([{ input: { root: [1, 2, 3] }, output: 6 }]),
            constraints: JSON.stringify(['The number of nodes in the tree is in the range [1, 3 * 10^4]']),
            test_cases: JSON.stringify([
                { input: { root: [1, 2, 3] }, expected: 6, is_visible: true }
            ]),
            tags: JSON.stringify(['dynamic-programming', 'tree', 'depth-first-search', 'binary-tree']), companies: JSON.stringify(['facebook', 'amazon', 'microsoft']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },

        // ═══════════════ DYNAMIC PROGRAMMING (8) ═══════════════
        {
            title: 'Climbing Stairs', slug: 'climbing-stairs', difficulty: 'easy', category: 'Dynamic Programming',
            description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
            examples: JSON.stringify([{ input: { n: 2 }, output: 2 }]),
            constraints: JSON.stringify(['1 <= n <= 45']),
            test_cases: JSON.stringify([
                { input: { n: 2 }, expected: 2, is_visible: true },
                { input: { n: 3 }, expected: 3, is_visible: false }
            ]),
            tags: JSON.stringify(['math', 'dynamic-programming', 'memoization']), companies: JSON.stringify(['adobe', 'apple']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'House Robber', slug: 'house-robber', difficulty: 'medium', category: 'Dynamic Programming',
            description: 'You are a professional robber. Each house has a certain amount of money stashed. You cannot rob two adjacent houses. Return the maximum amount you can rob.',
            examples: JSON.stringify([{ input: { nums: [1, 2, 3, 1] }, output: 4 }]),
            constraints: JSON.stringify(['1 <= nums.length <= 100']),
            test_cases: JSON.stringify([
                { input: { nums: [1, 2, 3, 1] }, expected: 4, is_visible: true },
                { input: { nums: [2, 7, 9, 3, 1] }, expected: 12, is_visible: false }
            ]),
            tags: JSON.stringify(['array', 'dynamic-programming']), companies: JSON.stringify(['linkedin', 'airbnb']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Coin Change', slug: 'coin-change', difficulty: 'medium', category: 'Dynamic Programming',
            description: 'Given an array of coins and an amount, return the fewest number of coins needed to make up that amount.',
            examples: JSON.stringify([{ input: { coins: [1, 2, 5], amount: 11 }, output: 3 }]),
            constraints: JSON.stringify(['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1']),
            test_cases: JSON.stringify([
                { input: { coins: [1, 2, 5], amount: 11 }, expected: 3, is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'dynamic-programming', 'breadth-first-search']), companies: JSON.stringify(['amazon', 'bloomberg']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Longest Increasing Subsequence', slug: 'longest-increasing-subsequence', difficulty: 'medium', category: 'Dynamic Programming',
            description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
            examples: JSON.stringify([{ input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] }, output: 4 }]),
            constraints: JSON.stringify(['1 <= nums.length <= 2500']),
            test_cases: JSON.stringify([
                { input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] }, expected: 4, is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'binary-search', 'dynamic-programming']), companies: JSON.stringify(['microsoft', 'amazon']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Unique Paths', slug: 'unique-paths', difficulty: 'medium', category: 'Dynamic Programming',
            description: 'A robot is located at the top-left corner of a m x n grid. How many possible unique paths are there?',
            examples: JSON.stringify([{ input: { m: 3, n: 7 }, output: 28 }]),
            constraints: JSON.stringify(['1 <= m, n <= 100']),
            test_cases: JSON.stringify([
                { input: { m: 3, n: 7 }, expected: 28, is_visible: true }
            ]),
            tags: JSON.stringify(['math', 'dynamic-programming', 'combinatorics']), companies: JSON.stringify(['google', 'amazon']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Word Break', slug: 'word-break', difficulty: 'medium', category: 'Dynamic Programming',
            description: 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of dictionary words.',
            examples: JSON.stringify([{ input: { s: 'leetcode', wordDict: ['leet', 'code'] }, output: true }]),
            constraints: JSON.stringify(['1 <= s.length <= 300', '1 <= wordDict.length <= 1000']),
            test_cases: JSON.stringify([
                { input: { s: 'leetcode', wordDict: ['leet', 'code'] }, expected: true, is_visible: true }
            ]),
            tags: JSON.stringify(['hash-table', 'string', 'dynamic-programming', 'trie', 'memoization']), companies: JSON.stringify(['google', 'amazon', 'facebook']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Decode Ways', slug: 'decode-ways', difficulty: 'medium', category: 'Dynamic Programming',
            description: 'A message containing letters from A-Z can be encoded into numbers. Given a string containing only digits, return the number of ways to decode it.',
            examples: JSON.stringify([{ input: { s: '12' }, output: 2 }]),
            constraints: JSON.stringify(['1 <= s.length <= 100']),
            test_cases: JSON.stringify([
                { input: { s: '12' }, expected: 2, is_visible: true }
            ]),
            tags: JSON.stringify(['string', 'dynamic-programming']), companies: JSON.stringify(['facebook', 'uber']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Partition Equal Subset Sum', slug: 'partition-equal-subset-sum', difficulty: 'medium', category: 'Dynamic Programming',
            description: 'Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.',
            examples: JSON.stringify([{ input: { nums: [1, 5, 11, 5] }, output: true }]),
            constraints: JSON.stringify(['1 <= nums.length <= 200']),
            test_cases: JSON.stringify([
                { input: { nums: [1, 5, 11, 5] }, expected: true, is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'dynamic-programming']), companies: JSON.stringify(['microsoft']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },

        // ═══════════════ GRAPHS (4) ═══════════════
        {
            title: 'Number of Islands', slug: 'number-of-islands', difficulty: 'medium', category: 'Graphs',
            description: `Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.`,
            examples: JSON.stringify([{ input: { grid: [['1', '1', '1', '1', '0'], ['1', '1', '0', '1', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '0', '0', '0']] }, output: 1 }]),
            constraints: JSON.stringify(['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300']),
            test_cases: JSON.stringify([
                { input: { grid: [['1', '1', '1', '1', '0'], ['1', '1', '0', '1', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '0', '0', '0']] }, expected: 1, is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'depth-first-search', 'breadth-first-search', 'union-find', 'matrix']), companies: JSON.stringify(['amazon', 'facebook', 'google']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Clone Graph', slug: 'clone-graph', difficulty: 'medium', category: 'Graphs',
            description: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
            examples: JSON.stringify([{ input: { adjList: [[2, 4], [1, 3], [2, 4], [1, 3]] }, output: [[2, 4], [1, 3], [2, 4], [1, 3]] }]),
            constraints: JSON.stringify(['The number of nodes in the graph is in the range [0, 100]']),
            test_cases: JSON.stringify([
                { input: { adjList: [[2, 4], [1, 3], [2, 4], [1, 3]] }, expected: [[2, 4], [1, 3], [2, 4], [1, 3]], is_visible: true }
            ]),
            tags: JSON.stringify(['hash-table', 'depth-first-search', 'breadth-first-search', 'graph']), companies: JSON.stringify(['facebook', 'google', 'amazon']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Course Schedule', slug: 'course-schedule', difficulty: 'medium', category: 'Graphs',
            description: 'There are a total of numCourses courses to take, labeled from 0 to numCourses - 1. Given prerequisites, return true if you can finish all courses.',
            examples: JSON.stringify([{ input: { numCourses: 2, prerequisites: [[1, 0]] }, output: true }]),
            constraints: JSON.stringify(['1 <= numCourses <= 2000']),
            test_cases: JSON.stringify([
                { input: { numCourses: 2, prerequisites: [[1, 0]] }, expected: true, is_visible: true }
            ]),
            tags: JSON.stringify(['depth-first-search', 'breadth-first-search', 'graph', 'topological-sort']), companies: JSON.stringify(['amazon', 'microsoft', 'apple']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Pacific Atlantic Water Flow', slug: 'pacific-atlantic-water-flow', difficulty: 'medium', category: 'Graphs',
            description: 'Given an m x n matrix representing the height of each unit cell, return a list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.',
            examples: JSON.stringify([{ input: { heights: [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]] }, output: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] }]),
            constraints: JSON.stringify(['m == heights.length', 'n == heights[r].length']),
            test_cases: JSON.stringify([
                { input: { heights: [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]] }, expected: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]], is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'depth-first-search', 'breadth-first-search', 'matrix']), companies: JSON.stringify(['google']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },

        // ═══════════════ STACK (3) ═══════════════
        {
            title: 'Min Stack', slug: 'min-stack', difficulty: 'medium', category: 'Stack',
            description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
            examples: JSON.stringify([{ input: { operations: ['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'] }, output: [null, null, null, null, -3, null, 0, -2] }]),
            constraints: JSON.stringify(['-2^31 <= val <= 2^31 - 1']),
            test_cases: JSON.stringify([
                { input: { operations: ['MinStack', 'push', 'push', 'push', 'getMin'] }, expected: [null, null, null, null, -3], is_visible: true }
            ]),
            tags: JSON.stringify(['stack', 'design']), companies: JSON.stringify(['amazon', 'bloomberg', 'uber']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Evaluate Reverse Polish Notation', slug: 'evaluate-reverse-polish-notation', difficulty: 'medium', category: 'Stack',
            description: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation.',
            examples: JSON.stringify([{ input: { tokens: ['2', '1', '+', '3', '*'] }, output: 9 }]),
            constraints: JSON.stringify(['1 <= tokens.length <= 10^4']),
            test_cases: JSON.stringify([
                { input: { tokens: ['2', '1', '+', '3', '*'] }, expected: 9, is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'math', 'stack']), companies: JSON.stringify(['linkedin']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Daily Temperatures', slug: 'daily-temperatures', difficulty: 'medium', category: 'Stack',
            description: 'Given an array of integers temperatures represents daily temperatures, return an array answer such that answer[i] is the number of days you have to wait for a warmer temperature.',
            examples: JSON.stringify([{ input: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73] }, output: [1, 1, 4, 2, 1, 1, 0, 0] }]),
            constraints: JSON.stringify(['1 <= temperatures.length <= 10^5']),
            test_cases: JSON.stringify([
                { input: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73] }, expected: [1, 1, 4, 2, 1, 1, 0, 0], is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'stack', 'monotonic-stack']), companies: JSON.stringify(['amazon', 'apple']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },

        // ═══════════════ LINKED LISTS (2) ═══════════════
        {
            title: 'Reverse Linked List', slug: 'reverse-linked-list', difficulty: 'easy', category: 'Linked Lists',
            description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
            examples: JSON.stringify([{ input: { head: [1, 2, 3, 4, 5] }, output: [5, 4, 3, 2, 1] }]),
            constraints: JSON.stringify(['The number of nodes in the list is the range [0, 5000]']),
            test_cases: JSON.stringify([
                { input: { head: [1, 2, 3, 4, 5] }, expected: [5, 4, 3, 2, 1], is_visible: true }
            ]),
            tags: JSON.stringify(['linked-list', 'recursion']), companies: JSON.stringify(['amazon', 'microsoft', 'apple']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
        {
            title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', difficulty: 'easy', category: 'Linked Lists',
            description: 'Merge two sorted linked lists and return it as a sorted list.',
            examples: JSON.stringify([{ input: { list1: [1, 2, 4], list2: [1, 3, 4] }, output: [1, 1, 2, 3, 4, 4] }]),
            constraints: JSON.stringify(['The number of nodes in both lists is in the range [0, 50]']),
            test_cases: JSON.stringify([
                { input: { list1: [1, 2, 4], list2: [1, 3, 4] }, expected: [1, 1, 2, 3, 4, 4], is_visible: true }
            ]),
            tags: JSON.stringify(['linked-list', 'recursion']), companies: JSON.stringify(['amazon', 'microsoft']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },

        // ═══════════════ HASH TABLE (1) ═══════════════
        {
            title: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence', difficulty: 'medium', category: 'Hash Table',
            description: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.',
            examples: JSON.stringify([{ input: { nums: [100, 4, 200, 1, 3, 2] }, output: 4 }]),
            constraints: JSON.stringify(['0 <= nums.length <= 10^5']),
            test_cases: JSON.stringify([
                { input: { nums: [100, 4, 200, 1, 3, 2] }, expected: 4, is_visible: true }
            ]),
            tags: JSON.stringify(['array', 'hash-table', 'union-find']), companies: JSON.stringify(['google', 'facebook']),
            acceptance_rate: 0, total_submissions: 0, total_accepted: 0, is_premium: false
        },
    ];

    await knex('problems').insert(problems);
    console.log(`✅ Seeded ${problems.length} LeetCode-quality problems across 8 topics`);
}
