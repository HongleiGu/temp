import Intro from '@/app/components/sponsor-page/intro-section';
import SponsorSection from '@/app/components/sponsor-page/sponsor-section';
import HowToSponsorSection from '../components/sponsor-page/how-to-sponsor-section';
import { getAllCompanyInformation } from '../lib/data';
import { hardCodedSponsors } from '../components/sponsor-page/hard-coded-sponsors';

export default async function SponserPage() {
	const companyInformation = await getAllCompanyInformation();
    return (
        <main className="relative bg-cover bg-center bg-fixed bg-no-repeat h-screen overflow-y-auto " style={{ backgroundImage: "url('/images/tower-bridge-1.jpeg')" }}>

            {/* Scrollable Content */}
            <div className="relative h-full overflow-y-auto bg-black bg-opacity-50 text-white snap-y snap-mandatory">
                <div className="p-10 space-y-10">
                    <section className='snap-start'>
						<Intro />
                    </section>
                    <section className='snap-start'>
                        <SponsorSection 
                            companyInformation={[...companyInformation, ...hardCodedSponsors]}
                        />
                    </section>
                    <section className='snap-start'>
                        <HowToSponsorSection />
                    </section>
                </div>
            </div>
        </main>
    );
}
