import ProblemSection from '@/app/components/about-page/problem-section';
import SolutionSection from '@/app/components/about-page/solution-section';
import TeamSection from '@/app/components/about-page/team-section';

export default function AboutPage() {
    return (
        <div className="relative h-auto">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage: `url('/images/tower-bridge-1.jpeg')`,
                }}
            ></div>

            {/* Scrollable Text */}
            <div className="relative h-full overflow-y-auto bg-black bg-opacity-50 text-white">
                <div className="p-10">
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