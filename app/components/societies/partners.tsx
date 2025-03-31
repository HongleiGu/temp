'use client'

import { FormattedPartner } from "@/app/lib/types";
import PartnerCard from "./partner-card";
import CardSkeleton from "../skeletons/card";


function Partners({ filteredPartners, skeleton }: { filteredPartners: FormattedPartner[], skeleton: boolean }) {

	return (
		<>
			{skeleton ? (
				<>
					{[...Array(30)].map((_, idx) => (
						<CardSkeleton idx={idx}/>
					))}
				</>
			) : (
				filteredPartners.map((partner: FormattedPartner) => (
					<PartnerCard key={partner.id} partner={partner}/>
				))
			)}
		</>
	);

}

export default Partners;