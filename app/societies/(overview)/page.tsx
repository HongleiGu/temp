'use client';

// This page occassionally has a bug due to the pagination, where the same societies are fetched in the next page, causing 
// some societies to be missed out. Spotted during development on 31/12/2024. Likely because the db doesn't return societies in
// a particular order. Likely solution is ordering the societies by id or name in the db query.

// Second bug, when the user scrolls very quickly on initial render, only some 23 of the 33 societies are rendered/fetched.
// This was spotted during development on 6/1/2025. For now, pagination is removed until it is
// more thoroughly tested and fixed.

import { useState, useMemo, useEffect, useCallback } from 'react';
import { fetchPartners, fetchAllPartners } from '@/app/lib/utils';
import CardSkeleton from '@/app/components/skeletons/card';
import Partners from '@/app/components/societies/partners';
import { FormattedPartner } from '@/app/lib/types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function SocietyPage() {
	// Search feature will search the whole dataset, and we'll paginate it
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [partners, setPartners] = useState<FormattedPartner[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true); // Tracks if more data exists
	const [initialLoadTriggered, setInitialLoadTriggered] = useState<boolean>(false); // New state
	const pageSize: number = 10;
	const maxCards: number = 100; // Max number of cards per page

	// Fetch partners for the current page
	const fetchPartnersData =useCallback(async () => {
		setLoading(true);
		const result = await fetchAllPartners();
		if (result.length === 0) {
			setHasMore(false); // No more data to fetch
		} else {
			setPartners((prev) => [...prev, ...result]);
		}
		setLoading(false);
	}, [currentPage, setHasMore, setPartners]);



	useEffect(() => {
		fetchPartnersData();
	}, [currentPage, fetchPartnersData]);


	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157] p-10 relative">
			<div className="flex flex-row items-center justify-between w-full max-w-[1000px] mb-10">
				<h1 className="text-4xl font-semibold text-white">Our Partners</h1>

				{/* Search Box */}
				<div className="relative hidden items-center w-[100px] sm:w-[100px] md:w-[200px] lg:w-[300px] transition-all duration-100 ease-in-out bg-transparent backdrop-blur-lg bg-opacity-30 rounded-lg">
					<input
						type="text"
						placeholder="Search partners..."
						className="rounded-full border-[1px] border-white bg-transparent px-6 py-3 w-[300px] min-w-[50px] text-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 sm:w-[250px] md:w-[300px]"
						disabled // the search box feature is more complex because of the pagination feature
					/>
				</div>
			</div>

			{/* Skeletons on Initial Render */}
			{loading && currentPage === 1 && (
				<div className="flex flex-col space-y-8 w-full max-w-[1000px] overflow-x-auto mt-16">
					{Array.from({ length: 30 }).map((_, index) => (
						<CardSkeleton key={index} />
					))}
				</div>
			)}

			{/* Partners List */}
			<div className=" w-full mt-16 grid partner-grid gap-8 ">
				<Partners filteredPartners={partners} />
			</div>

		</main>
	);
}
