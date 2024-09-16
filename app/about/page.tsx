import ProblemSection from '@/app/components/about-page/problem-section';
import SolutionSection from '@/app/components/about-page/solution-section';
import TeamSection from '@/app/components/about-page/team-section';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="relative h-auto overflow-hidden">
            {/* Background Image */}
            <div className="absolute w-full h-screen">
                <Image
                    src="/images/tower-bridge-1.jpeg"
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                />
            </div>

            {/* Scrollable Content */}
            <div className="relative z-10 h-full overflow-y-auto bg-black bg-opacity-50 text-white">
                <div className="p-10 space-y-10">
                    <section>
                        <ProblemSection />
                    </section>
                    <section>
                        <SolutionSection />
                    </section>
                    <section>
                        <TeamSection />
                    </section>
                </div>
            </div>
        </div>
    );
}