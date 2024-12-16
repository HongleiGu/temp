import getPredefinedTags from "../account/get-predefined-tags";
import { Partner } from "@/app/lib/types";
import { Tag } from "@/app/lib/types";

async function fetchPartners() {
    try {
        const response = await fetch('/api/societies/get-organiser-cards'); 
        if (!response.ok) {
            throw new Error('Failed to fetch organisers card data');
        }
        const data = await response.json();

        // Fetch predefined tags once
        const predefinedTags = await getPredefinedTags();

        // Map predefined tags into a lookup object for efficient access
        const tagLookup: Record<string, string> = predefinedTags.reduce((acc: Record<string, string>, tag: Tag) => {
            acc[tag.value] = tag.label;
            return acc;
        }, {});

        // Map the response to the desired format
        const formattedPartners = data.map((partner: Partner) => ({
            id: partner.id,
            name: partner.name || 'Unknown Name',
            keywords: (partner.tags || []).map((tag: number) => {
                // Convert tag to a string
                const tagKey = tag.toString();
                return tagLookup[tagKey] || 'Unknown Tag';
            }),
            description: partner.description || 'No description provided',
            website: partner.website || 'No website available',
            logo: partner.logo_url || null,
        }));
        
        return formattedPartners;
    } catch (err) {
        console.error('failed to retrieve partner', err);
    }
}

export default fetchPartners;
