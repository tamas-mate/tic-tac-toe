import Square from "./Square";

import type { BoardProps } from "../types";
import { BOARDSIZE, calculateWinner } from "../utils";

const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
	function handleClick(i: number, r: number, c: number) {
		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		const nextSquares = squares.slice();

		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}

		onPlay(nextSquares, r, c);
	}

	const winner = calculateWinner(squares);
	let status;

	if (winner) {
		status = "Winner: " + winner.winningPlayer;
	} else {
		const isDraw = squares.every((square) => square !== null);
		status = isDraw ? "It is a Draw" : "Next player: " + (xIsNext ? "X" : "O");
	}

	const rows = [];

	for (let row = 0; row < BOARDSIZE; row++) {
		const rowSquares = [];

		for (let column = 0; column < BOARDSIZE; column++) {
			// formula to get current index
			const currentIndex = row * BOARDSIZE + column;
			const isWinnerSquare = winner?.winningLine?.includes(currentIndex) || false;
			rowSquares.push(
				<Square
					key={`${row}, ${column}`}
					value={squares[currentIndex]}
					onSquareClick={() => handleClick(currentIndex, row, column)}
					isWinner={isWinnerSquare}
				/>
			);
		}

		rows.push(
			<div key={"Row " + row} className="board-row">
				{rowSquares}
			</div>
		);
	}

	return (
		<>
			<div className="status">{status}</div>
			{rows}
		</>
	);
};

export default Board;
