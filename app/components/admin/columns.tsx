"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Event } from "@/app/lib/types";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { Button } from "../button";

const parseDate = (dateString: string) => {
	const [day, month, year] = dateString.split("/").map(Number);
	return new Date(year, month - 1, day); // month is 0-indexed in JavaScript
};


export const columns: ColumnDef<Event>[] = [
	{
		accessorKey: "date",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Date
					<ArrowsUpDownIcon className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		sortingFn: (rowA, rowB, columnId) => {
			const dateA = parseDate(rowA.getValue(columnId))
			const dateB = parseDate(rowB.getValue(columnId))
			return dateA.getTime() - dateB.getTime()
		}

	},
	{
		accessorKey: 'time',
		header: 'Time',
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("time")} : {row.getValue("date")}</div>
		},
		enableResizing: true,
	},
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => {
			return <div className="text-md line-clamp-5 italic">{row.getValue("title")}</div>
		},
		enableResizing: true,
	},
	{
		accessorKey: "organiser",
		header: "Organiser",
		enableResizing: true,
	},
	{
		accessorKey: "description",
		header: () => <div className="max-w-[100px]">Description</div>,
		cell: ({ row }) => {
			return <div className="line-clamp-4">{row.getValue("description")}</div>
		},
		enableResizing: true,
	},
	// {
	// 	accessorKey: "image_url",
	// 	header: "Image",
	// 	cell: ({ row }) => {
	// 		console.log(`Image: ${row.getValue('image_url')}`)
	// 		return <img src={row.getValue("image_url")} alt={row.getValue("image_url")} className="w-10 h-10 object-cover cursor-pointer" />
	// 	}
	// }
	{
		accessorKey: "location",
		header: "Location",
		cell: ({ row }) => {
			return <div className="line-clamp-3">{row.getValue("location")}</div>
		}
	},
]