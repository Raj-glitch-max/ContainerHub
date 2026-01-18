// ════════════════════════════════════════════════════════════════
// Mock Code Execution Service
// ════════════════════════════════════════════════════════════════
//
// This is a MOCK implementation for testing.
// Real code execution will require Docker containers for security.
//
// ════════════════════════════════════════════════════════════════

interface TestCase {
    input: any;
    expected: any;
}

interface ExecutionResult {
    status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded';
    execution_time_ms: number;
    memory_used_mb: number;
    error_message?: string;
    test_results: Array<{
        passed: boolean;
        input: any;
        output: any;
        expected: any;
    }>;
    passed_test_count: number;
    total_test_count: number;
}

export async function executeCode(
    code: string,
    language: string,
    testCases: TestCase[]
): Promise<ExecutionResult> {
    console.log(`🧪 [MOCK] Executing ${language} code...`);

    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    // Mock execution results
    const mockExecutionTime = Math.floor(Math.random() * 200) + 50; // 50-250ms
    const mockMemoryUsage = Math.floor(Math.random() * 50) + 10; // 10-60MB

    // Randomly determine if code is correct (70% acceptance rate for testing)
    const isCorrect = Math.random() < 0.7;

    const testResults = testCases.map((testCase, index) => {
        // First test case always passes if code is "correct"
        // Later test cases might fail
        const passed = isCorrect ? (index === 0 || Math.random() < 0.8) : false;

        return {
            passed,
            input: testCase.input,
            output: passed ? testCase.expected : generateWrongOutput(testCase.expected),
            expected: testCase.expected,
        };
    });

    const passedCount = testResults.filter(r => r.passed).length;
    const totalCount = testResults.length;

    let status: ExecutionResult['status'];
    if (passedCount === totalCount) {
        status = 'accepted';
    } else if (passedCount > 0) {
        status = 'wrong_answer';
    } else {
        // Randomly choose between wrong_answer and runtime_error
        status = Math.random() < 0.7 ? 'wrong_answer' : 'runtime_error';
    }

    const result: ExecutionResult = {
        status,
        execution_time_ms: mockExecutionTime,
        memory_used_mb: mockMemoryUsage,
        test_results: testResults,
        passed_test_count: passedCount,
        total_test_count: totalCount,
    };

    if (status === 'runtime_error') {
        result.error_message = generateMockError(language);
    }

    console.log(`✅ [MOCK] Execution complete: ${status} (${passedCount}/${totalCount} tests passed)`);

    return result;
}

function generateWrongOutput(expected: any): any {
    if (Array.isArray(expected)) {
        // Return different array
        return expected.slice().reverse();
    }
    if (typeof expected === 'number') {
        return expected + 1;
    }
    if (typeof expected === 'boolean') {
        return !expected;
    }
    return null;
}

function generateMockError(language: string): string {
    const errors = {
        python: [
            'TypeError: unsupported operand type(s) for +: \'int\' and \'str\'',
            'IndexError: list index out of range',
            'KeyError: \'key\'',
            'AttributeError: \'NoneType\' object has no attribute \'append\'',
        ],
        javascript: [
            'TypeError: Cannot read property \'length\' of undefined',
            'ReferenceError: variable is not defined',
            'RangeError: Maximum call stack size exceeded',
        ],
        java: [
            'java.lang.NullPointerException',
            'java.lang.ArrayIndexOutOfBoundsException',
            'java.lang.StackOverflowError',
        ],
    };

    const languageErrors = errors[language as keyof typeof errors] || errors.python;
    return languageErrors[Math.floor(Math.random() * languageErrors.length)];
}

// Real implementation note:
// For production, this should:
// 1. Run code in isolated Docker containers
// 2. Set resource limits (CPU, memory, time)
// 3. Sanitize inputs and outputs
// 4. Handle security concerns (code injection, infinite loops)
// 5. Support multiple languages with different runtimes
// 6. Queue submissions for processing
