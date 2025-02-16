export type Problem = {
	id: string;
	title: string;
	difficulty: string;
	category: string;
	order: number;
	videoId?: string;
	pid:string;
};

export const problems: Problem[] = [
	{
		id: "1",
		title: "Two Sum",
		difficulty: "Easy",
		category: "Array",
		order: 1,
		videoId: "UXDSeD9mN-k",
		pid:"two-sum"
	},
	{
		id: "reverse-linked-list",
		title: "Reverse Linked List",
		difficulty: "Hard",
		category: "Linked List",
		order: 2,
		videoId: "D2vI2DNJGd8",
		pid: "reverse-linked-list",
	},
	{
		id: "jump-game",
		title: "Jump Game",
		difficulty: "Medium",
		category: "Dynamic Programming",
		order: 3,
		videoId: "",
		pid: "jump-game",
	},
	{
		id: "valid-parentheses",
		title: "Valid Parentheses",
		difficulty: "Easy",
		category: "Stack",
		order: 4,
		videoId: "cHT6sG_hUZI",
		pid: "valid-parentheses",
	},
	{
		id: "search-a-2d-matrix",
		title: "Search a 2D Matrix",
		difficulty: "Medium",
		category: "Binary Search",
		order: 5,
		videoId: "JXU4Akft7yk",
		pid: "search-a-2d-matrix",
	},
	{
		id: "container-with-most-water",
		title: "Container With Most Water",
		difficulty: "Medium",
		category: "Two Pointers",
		order: 6,
		videoId: "",
		pid: "container-with-most-water",
	},
	{
		id: "merge-intervals",
		title: "Merge Intervals",
		difficulty: "Medium",
		category: "intervals",
		order: 7,
		videoId: "",
		pid: "merge-intervals",
	},
	{
		id: "maximum-depth-of-binary-tree",
		title: "Maximum Depth of Binary Tree",
		difficulty: "Easy",
		category: "Tree",
		order: 8,
		videoId: "eD3tmO66aBA",
		pid: "maximum-depth-of-binary-tree",
	},
	{
		id: "best-time-to-buy-and-sell-stock",
		title: "Best Time to Buy and Sell Stock",
		difficulty: "Easy",
		category: "Array",
		order: 9,
		videoId: "",
		pid: "best-time-to-buy-and-sell-stock",
	},
	{
		id: "subsets",
		title: "Subsets",
		difficulty: "Medium",
		category: "Backtracking",
		order: 10,
		videoId: "",
		pid: "subsets",
	},
    {
		id: "Longest-Valid-Parentheses",
		title: "Longest Valid Parentheses",
		difficulty: "Hard",
		category: "Stack",
		order: 11,
		videoId: "VdQuwtEd10M",
		pid: "Longest-Valid-Parentheses",
	},
];