'use client'

import { FormattedPartner } from "@/app/lib/types";
import PartnerCard from "./partner-card";


function Partners({ filteredPartners, skeleton = true }: { filteredPartners: FormattedPartner[], skeleton: boolean }) {

	return (
		<>
			{filteredPartners.map((partner: FormattedPartner) => (
				<PartnerCard key={partner.id} partner={partner}/>
			))}
		</>
	);

}

export default Partners;