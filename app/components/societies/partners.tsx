'use client'

import { FormattedPartner } from "@/app/lib/types";
import PartnerCard from "./partner-card";


function Partners({ filteredPartners }: { filteredPartners: FormattedPartner[] }) {

	return (
		<>
			{filteredPartners.map((partner: FormattedPartner) => (
				<PartnerCard key={partner.id} partner={partner}/>
			))}
		</>
	);

}

export default Partners;