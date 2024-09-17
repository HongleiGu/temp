import ProblemSection from '@/app/components/about-page/problem-section';
import SolutionSection from '@/app/components/about-page/solution-section';
import TeamSection from '@/app/components/about-page/team-section';

export default function AboutPage() {
    return (
        <main className="relative bg-cover bg-center bg-fixed bg-no-repeat h-screen overflow-y-auto " style={{ backgroundImage: "url('/images/tower-bridge-1.jpeg')" }}>
            {/* Background Image */}
            {/* <div className="absolute w-full h-screen">
                <Image
                    src="/images/tower-bridge-1.jpeg"
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                />
            </div> */}

            {/* Scrollable Content */}
            <div className="relative h-full overflow-y-auto bg-black bg-opacity-50 text-white snap-y snap-mandatory">
                <div className="p-10 space-y-10">
                    <section className='snap-start'>
                        <ProblemSection />
                    </section>
                    <section className='snap-start'>
                        <SolutionSection />
                    </section>
                    <section className='snap-start'>
                        <TeamSection />
                    </section>
                </div>
            </div>
        </main>
    );
}