import assert from "assert";
import { Problem } from "../types/problem";
import example1 from "./images/search-a-2d-1.jpg";
import example2 from "./images/search-a-2d-2.jpg";

export const search2DMatrixHandler = (fn: any) => {
	try {
		const tests = [
			{
				matrix: [
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60],
				],
				target: 3,
			},
			{
				matrix: [
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60],
				],
				target: 13,
			},
		];
		const answers = [true, false];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i].matrix, tests[i].target);
			assert.deepEqual(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Error from searchA2DMatrixHandler: ", error);
		throw new Error(error);
	}
};
const starterCodeSearch2DMatrixJS = `// Do not edit function name
function searchMatrix(matrix, target) {
  // Write your code here
};






















`;

export const search2DMatrix: Problem = {
	id: "search-a-2d-matrix",
	title: "5. Search a 2D Matrix",
	problemStatement: `
  <p class='mt-3'>Write an efficient algorithm that searches for a value in an <code style="color: black;">m x n</code> matrix. This matrix has the following properties:</p>
    <li class="mt-3">Integers in each row are sorted from left to right.</li>
    <li class="mt-3">The first integer of each row is greater than the last integer of the previous row.</li>
  <p class='mt-3'>Given <code style="color: black;">matrix</code>, an <code style="color: black;">m x n</code> matrix, and <code style="color: black;">target</code>, return <code style="color: black;">true</code> if <code style="color: black;">target</code> is in the matrix, and <code style="color: black;">false</code> otherwise.</p>
  `,
	examples: [
		{
			id: 0,
			inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 3`,
			outputText: `true`,
			img: example1.src,
		},
		{
			id: 1,
			inputText: `matrix = [
  [1,3,5,7],
  [10,11,16,20],
  [23,30,34,60]
], target = 13`,
			outputText: `false`,
			img: example2.src,
		},
		{
			id: 2,
			inputText: `matrix = [[1]], target = 1`,
			outputText: `true`,
		},
	],
	constraints: `
  <li class='mt-2'><code style="color: black;">m == matrix.length</code></li>
  <li class='mt-2'><code style="color: black;">n == matrix[i].length</code></li>
  <li class='mt-2'><code style="color: black;">1 <= m, n <= 100</code></li>
  <li class='mt-2'><code style="color: black;">-10<sup>4</sup> <= matrix[i][j], target <= 10<sup>4</sup></code></li>
  `,
	startercode: starterCodeSearch2DMatrixJS,
	handlerFunction: search2DMatrixHandler,
	starterFunctionName: "function searchMatrix",
	order: 5,
};