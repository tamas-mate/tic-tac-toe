import { useState } from "react";

import Board from "./components/Board";
import type { HistoryItem } from "./types";

export default function Game() {
	const [history, setHistory] = useState<HistoryItem[]>([
		{
			squares: Array(9).fill(null),
			row: null,
			col: null,
		},
	]);
	const [currentMove, setCurrentMove] = useState<number>(0);
	const [sortDescending, setSortDescending] = useState<boolean>(false);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove].squares;

	function handlePlay(nextSquares: string[], row: number, col: number) {
		const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, row, col }];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove: number) {
		setCurrentMove(nextMove);
	}

	const moves = history.map((history, move) => {
		let description;
		let position = "";
		const atCurrentMove = move === currentMove;

		if (move > 0) {
			description = atCurrentMove ? "You are at move #" + move : "Go to move #" + move;
			position = `(row = ${history.row},column = ${history.col})`;
		} else {
			description = atCurrentMove ? "At the start" : "Go to game start";
		}

		return (
			<li key={move}>
				{atCurrentMove ? (
					<p>
						{description} {position}
					</p>
				) : (
					<>
						<button
							style={{
								margin: "5px",
							}}
							onClick={() => jumpTo(move)}
						>
							{description}
						</button>
						{position}
					</>
				)}
			</li>
		);
	});

	const orderedMoves = sortDescending ? [...moves].reverse() : moves;

	return (
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				{moves.length > 1 && (
					<button className="order-btn" onClick={() => setSortDescending(!sortDescending)}>
						{sortDescending ? "Sort Ascending" : "Sort Descending"}
					</button>
				)}
				<ol>{orderedMoves}</ol>
			</div>
		</div>
	);
}

// If you have extra time or want to practice your new React skills,
// here are some ideas for improvements that you could make to the tic-tac-toe game, listed in order of increasing difficulty:
// TODO: 1 For the current move only, show “You are at move #…” instead of a button. Done
// TODO: 2 Rewrite Board to use two loops to make the squares instead of hardcoding them. Done
// TODO: 3 Add a toggle button that lets you sort the moves in either ascending or descending order. Done
// TODO: 4 When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw). Done
// TODO: 5 Display the location for each move in the format (row, col) in the move history list. Done
