import Intro from '@/app/components/sponser-page/intro-section';
import SponserSection from '@/app/components/sponser-page/sponsor-section';
import HowToSponserSection from '../components/sponser-page/how-to-sponsor-section';
import { getAllCompanyInformation } from '../lib/data';
import { hardCodedSponsers } from '../components/sponser-page/hard-coded-sponsers';

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
                        <SponserSection 
                            companyInformation={[...companyInformation, ...hardCodedSponsers]}
                        />
                    </section>
                    <section className='snap-start'>
                        <HowToSponserSection />
                    </section>
                </div>
            </div>
        </main>
    );
}

