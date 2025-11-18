export type HistoryItem = {
	squares: string[];
	row: number | null;
	col: number | null;
};

export type BoardProps = {
	xIsNext: boolean;
	squares: string[];
	onPlay: (nextSquares: string[], row: number, col: number) => void;
};

export type SquareProps = {
	value: string;
	onSquareClick: () => void;
	isWinner: boolean;
};

export type StringOrNull = string | null;
