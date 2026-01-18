// ════════════════════════════════════════════════════════════════
// Seed: Sample Problems
// ════════════════════════════════════════════════════════════════

import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Delete existing entries
    await knex('problems').del();

    // Insert sample problems
    await knex('problems').insert([
        {
            title: 'Two Sum',
            slug: 'two-sum',
            description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
            difficulty: 'easy',
            constraints: JSON.stringify([
                '2 <= nums.length <= 10^4',
                '-10^9 <= nums[i] <= 10^9',
                '-10^9 <= target <= 10^9',
                'Only one valid answer exists',
            ]),
            examples: JSON.stringify([
                {
                    input: 'nums = [2,7,11,15], target = 9',
                    output: '[0,1]',
                    explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1]',
                },
                {
                    input: 'nums = [3,2,4], target = 6',
                    output: '[1,2]',
                },
            ]),
            test_cases: JSON.stringify([
                { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
                { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
                { input: { nums: [3, 3], target: 6 }, expected: [0, 1] },
            ]),
            starter_code: JSON.stringify({
                python: 'def twoSum(nums, target):\n    # Your code here\n    pass',
                javascript: 'function twoSum(nums, target) {\n    // Your code here\n}',
                java: 'public int[] twoSum(int[] nums, int target) {\n    // Your code here\n}',
            }),
            tags: '{arrays,hash-table,easy}',
            companies: '{google,amazon,facebook}',
            category: 'Arrays',
            time_limit_ms: 5000,
            memory_limit_mb: 256,
        },
        {
            title: 'Valid Parentheses',
            slug: 'valid-parentheses',
            description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
            difficulty: 'easy',
            constraints: JSON.stringify([
                '1 <= s.length <= 10^4',
                's consists of parentheses only \'()[]{}\'',
            ]),
            examples: JSON.stringify([
                {
                    input: 's = "()"',
                    output: 'true',
                },
                {
                    input: 's = "()[]{}"',
                    output: 'true',
                },
                {
                    input: 's = "(]"',
                    output: 'false',
                },
            ]),
            test_cases: JSON.stringify([
                { input: { s: '()' }, expected: true },
                { input: { s: '()[]{}' }, expected: true },
                { input: { s: '(]' }, expected: false },
                { input: { s: '([)]' }, expected: false },
                { input: { s: '{[]}' }, expected: true },
            ]),
            starter_code: JSON.stringify({
                python: 'def isValid(s):\n    # Your code here\n    pass',
                javascript: 'function isValid(s) {\n    // Your code here\n}',
                java: 'public boolean isValid(String s) {\n    // Your code here\n}',
            }),
            tags: '{stack,string,easy}',
            companies: '{microsoft,amazon,bloomberg}',
            category: 'Stack',
            time_limit_ms: 5000,
            memory_limit_mb: 256,
        },
        {
            title: 'Reverse Linked List',
            slug: 'reverse-linked-list',
            description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
            difficulty: 'easy',
            constraints: JSON.stringify([
                'The number of nodes in the list is the range [0, 5000]',
                '-5000 <= Node.val <= 5000',
            ]),
            examples: JSON.stringify([
                {
                    input: 'head = [1,2,3,4,5]',
                    output: '[5,4,3,2,1]',
                },
                {
                    input: 'head = [1,2]',
                    output: '[2,1]',
                },
            ]),
            test_cases: JSON.stringify([
                { input: { head: [1, 2, 3, 4, 5] }, expected: [5, 4, 3, 2, 1] },
                { input: { head: [1, 2] }, expected: [2, 1] },
                { input: { head: [] }, expected: [] },
            ]),
            starter_code: JSON.stringify({
                python: 'def reverseList(head):\n    # Your code here\n    pass',
                javascript: 'function reverseList(head) {\n    // Your code here\n}',
                java: 'public ListNode reverseList(ListNode head) {\n    // Your code here\n}',
            }),
            tags: '{linked-list,recursion,easy}',
            companies: '{amazon,microsoft,apple}',
            category: 'Linked List',
            time_limit_ms: 5000,
            memory_limit_mb: 256,
        },
    ]);

    console.log('✅ Seeded 3 sample problems');
}
