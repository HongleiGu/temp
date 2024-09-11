import React, { useState, useRef } from 'react';

interface ResizableColumnProps {
	title: string;
	initialWidth?: number; // Default width for the column in pixels
}

export default function ResizableColumn({ title, initialWidth = 150 } : ResizableColumnProps) {

	const [columnWidth, setColumnWidth] = useState(initialWidth);
	const resizerRef = useRef<HTMLDivElement>(null);
	const [isResizing, setIsResizing] = useState(false);

	// Handle the start of column resizing
	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsResizing(true);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	// Handle the movement during resizing
	const handleMouseMove = (e: MouseEvent) => {
		if (isResizing && resizerRef.current) {
			const newWidth = e.clientX - resizerRef.current.getBoundingClientRect().left;
			if (newWidth > 50) { // Minimum width constraint
				setColumnWidth(newWidth);
			}
		}
	};

	// Clean up after resizing ends
	const handleMouseUp = () => {
		setIsResizing(false);
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	return (
		<th
			style={{ width: `${columnWidth}px` }}
			className="relative group"
		>
			<div className="flex justify-between items-center">
				<span>{title}</span>
				<div
					ref={resizerRef}
					onMouseDown={handleMouseDown}
					className="absolute right-0 top-0 h-full w-1.5 bg-transparent cursor-col-resize group-hover:bg-gray-400"
				></div>
			</div>
		</th>
	)
}
