"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Event } from "@/app/lib/types";

export const columns: ColumnDef<Event>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => {
			return <div className="text-md line-clamp-5 font-bold`">{row.getValue("title")}</div>
		}
	},
	{
		accessorKey: "organiser",
		header: "Organiser"
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => {
			return <div className="line-clamp-3">{row.getValue("description")}</div>
		}
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