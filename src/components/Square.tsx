import type { SquareProps } from "../types";

const Square = ({ value, onSquareClick, isWinner }: SquareProps) => {
	return (
		<button className={"square" + (isWinner ? " winner" : "")} onClick={onSquareClick}>
			{value}
		</button>
	);
};

export default Square;
