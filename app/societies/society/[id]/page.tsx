
'use client';

// Plan for this page, add notificatoin button between the two cards below the banner, which will send emails to you when the
// society creates an event on LSN.
// Also add custom styles to tailwind config, so that style prop no longer needed

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/app/components/button';
import UserEventsList from '@/app/components/account/user-events-list';
import NextImage from 'next/image'; // using NextImage instead of Image to avoid Namespace clashs with javascript Image method in extractAndSetMainColor 
import { FetchAccountDetailsPromiseInterface, Tag } from '@/app/lib/types';
import getPredefinedTags from '@/app/lib/utils';
import { formattedWebsite } from '@/app/lib/utils';
import * as skeletons from '@/app/components/skeletons/unique-society';


export default function SocietyPage() {
    const [loadingDetails, setLoadingDetails] = useState<boolean>(true);
    const [loadingName, setLoadingName] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [logo, setLogo] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [mainColor, setMainColor] = useState<string>('');
    const [bannerBackground, setBannerBackground] = useState<string>('transparent');
    const { id } = useParams();
    const stringid = id instanceof Array ? id[0] : id;

    
    // fetch and set logo, website, description, tags, if available
    useEffect(() => {
        const fetchDetails = async (id: string) => {
            try {
                setLoadingDetails(true);
                const result: FetchAccountDetailsPromiseInterface = await fetchAccountDetails(id);

                setLogo(result.logo_url);
                setDescription(result.description);
                setWebsite(result.website);

                if (result.tags.length > 0) {
                    // Fetch predefined tags
                    const predefinedTags = await getPredefinedTags();

                    // Map predefined tags into a lookup object for efficient access
                    const tagLookup: Record<string, string> = predefinedTags.reduce((acc: Record<string, string>, tag: Tag) => {
                        acc[tag.value] = tag.label;
                        return acc;
                    }, {});

                    const mappedTags = result.tags.map((tag: number) => {
                        // Convert tag to a string, then to actual tag
                        const tagKey = tag.toString();
                        return tagLookup[tagKey] || 'Unknown Tag';
                    });
                    setTags(mappedTags);

                } else {
                    setTags([]);
                }

                setLoadingDetails(false);
            } catch (error) {
                setLoadingDetails(false);
                console.error('Error fetching account details:', error);
            }
        };

        fetchDetails(stringid);
    }, [stringid]);

    // fetch and set name of society
    useEffect(() => {
        const fetchAndSetName = async (id: string) => {
            try{
                setLoadingName(true);
                const result = await fetchSocietyName(id);
                setName(result?.name || 'Unknown Society');

                setLoadingName(false);
            } catch (error) {
                setLoadingName(false);
                console.error('Error fetching society name:', error);
            }
        };

        fetchAndSetName(stringid);
    }, [stringid]);

    // set background colour for banner, for custom or dynamic banners
    useEffect(() => {
        // Set the banner background color to the main color, or fallback to a solid gray
        const background = mainColor
        ? 'transparent' // switching to mainColor is also available, but couldn't make it look good
        : 'transparent' // switching to '#CCCCCC' is also available, but couldn't make it look good

        setBannerBackground(background);
    }, [mainColor]);

    // useEffect(() => { // uncomment if dynamic banner wanted
    //     if (logo && typeof logo === 'string') extractAndSetMainColor();
    // }, [logo]);


    async function fetchSocietyName(id: string): Promise<{ name: string }> {
        try {
            const response = await fetch('/api/societies/get-organiser-name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) throw new Error('Failed to fetch organiser details')

            return await response.json();
        } catch (err) {
            console.error('Error fetching organiser details:', err);
        }
    };


    async function fetchAccountDetails(id: string): Promise<FetchAccountDetailsPromiseInterface> {
        try {
            const res = await fetch('/api/user/get-account-fields', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(id),
            });

            const { logo_url, description, website, tags } = await res.json();
            
            return { logo_url, description, website, tags };
        } catch (error) {
            console.error('Error loading description:', error);
        }
    };


    const extractAndSetMainColor = () => { // move to utils in the future
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context || !logo) return;

        const img = new window.Image();
        img.crossOrigin = 'Anonymous';
        img.src = logo;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            const pixelData = context.getImageData(0, 0, img.width, img.height).data;
            let r = 0, g = 0, b = 0, count = 0;

            // Averaging pixel colors to find the most prominent color
            for (let i = 0; i < pixelData.length; i += 4) {
                r += pixelData[i];     // Red
                g += pixelData[i + 1]; // Green
                b += pixelData[i + 2]; // Blue
                count++;
            }

            // Calculate average color
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);

            const mainColor = `rgb(${Math.floor(r*0.7)}, ${Math.floor(g*0.7)}, ${Math.floor(b*0.7)})`;
            setMainColor(mainColor);
        };
    };


    const handleMessageClick = (id: string) => { // turns message button into link
        const url = `/societies/message/${id}`;

        const newTab = window.open(url, '_blank'); // open in new tab
        
        if (newTab) {
          newTab.focus(); // focus on new tab
        }
    };


    const handleWebsiteClick = (website: string) => { // turns website button into link
        window.open(formattedWebsite(website), '_blank'); // open in new tab
    };


    const handleJoinLSNClick = () => {
        const url = '/register';

        const newTab = window.open(url, '_blank'); // open in new tab
        
        if (newTab) {
          newTab.focus(); // focus on new tab
        }
    };


    return (
        <div className="flex flex-col min-h-screen p-8 bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157]">

            {/* Header Section */}
            <header className="relative flex flex-col items-center mb-6" style={{ paddingBottom: '100px' }}>

                {/* Banner Background */}
                <div
                    className="absolute inset-0 -m-8 mb-16 h-full z-0"
                    style={{
                        background: bannerBackground,
                        opacity: 1, // Adjust this value to control the transparency (lower = more transparent)
                    }}
                ></div>

                {/* Logo */}
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-[265px] h-[265px] bg-transparent rounded-full flex items-center justify-center mt-[50px]">
                        <div
                            className="relative flex items-center justify-center overflow-hidden rounded-full"
                            style={{
                                width: '200px',
                                height: '200px',
                                clipPath: 'circle(95px at center)',
                            }}
                        >
                            {loadingDetails ? (
                                <skeletons.UniqueSocietyLogoSkeleton />
                            ) : logo ? (
                                <NextImage
                                    src={logo}
                                    alt="Account Logo"
                                    width={280}
                                    height={280}
                                    className="w-[280px] h-[280px] object-cover border-2 border-gray-300 rounded"
                                />
                            ) : (
                                <NextImage
                                    src="/images/no-image-found.png"
                                    alt="No logo found"
                                    width={280}
                                    height={280}
                                    className="w-[280px] h-[280px] object-cover border-2 border-gray-300 rounded"
                                />
                            )}
                        </div>
                    </div>

                    {/* Society Name */}
                    <div className="relative mt-6 flex flex-col items-center">
                        {loadingName ? (
                            <skeletons.UniqueSocietyNameSkeleton />
                        ) : (
                            <h1
                                className="text-5xl font-bold text-white text-center overflow-hidden text-ellipsis pb-4"
                                style={{
                                    textShadow: '0 0 0px white', // modify if glow wanted
                                }}
                            >
                                {name}
                            </h1>
                        )}
                        {loadingDetails ? (
                            <skeletons.UniqueSocietyTagsSkeleton />
                        ) : (
                            <div>
                                {tags.map((tag, index) => (
                                    <span
                                        key={`${index}-${tag}`} // keep keys unique
                                        className="text-white px-2 py-1 rounded-full text-[10px] shadow-lg hover:cursor-default"
                                        style={{
                                            backgroundColor: 'transparent', // change if you want background colour like society cards
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Description Section */}
            {description && (
                <section className="mb-8">
                    <h2 className="text-2xl italic text-white font-semibold mb-2">About Us</h2>
                    <p className="text-white">{description}</p>
                </section>
            )}

            {/* Middle Content Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                {/* Middle Left */}
                <div className="bg-transparent shadow-md p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
                    <p className="text-sm text-white">
                        Do you have an idea for a new event or initiative?
                        <br />
                        Do you have any feedback on how we can improve our services?
                        <br />
                        Do you want to collaborate with us?
                        <br />
                        If so, we would love to hear from you!
                    </p>
                    {/* Links */}
                    <div className="flex items-center gap-4 relative bottom-[-10px] justify-center w-full">
                        <Button variant='ghost' onClick={() => handleMessageClick(stringid)} className="bg-transparent text-white py-2 px-4 rounded-lg hover:text-gray-400 transition text-sm mr-0">
                            <div className='flex'>
                                <p className="mt-[6px]">Message</p>
                                <NextImage
                                    src='/icons/send-message-icon.png'
                                    alt='send icon'
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                />
                            </div>
                        </Button>

                        {website && website !== 'No website available' && (
                            <Button variant='ghost' onClick={() => handleWebsiteClick(website)} className="bg-transparent text-white py-2 rounded-lg hover:text-gray-400 transition text-sm mr-0">
                                <span className="text-white hover:text-gray-400 px-4 py-2 rounded-lg transition text-sm flex flex-row">
                                    Website
                                    <NextImage
                                    src='/icons/web.png'
                                    alt='website icon'
                                    width={20}
                                    height={20}
                                    className=" ml-2 object-cover"
                                    />
                                </span>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Middle */}
                <div className="bg-transparent p-4 rounded-lg">
                    {/* Placeholder for future content (notification button + image) */}
                </div>

                {/* Middle Right */}
                <div className="bg-transparent shadow-md p-4 rounded-lg">
                    <p className="text-sm text-white">
                        Join a vibrant community and participate in exciting events and
                        initiatives tailored just for you. Become a member and enjoy
                        exclusive benefits and opportunities.
                    </p>
                    <div className="flex items-center gap-4 relative bottom-[-10px] justify-center w-full">
                        <Button variant='ghost' onClick={() => handleJoinLSNClick()} className="bg-green-600 mt-4 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition text-sm mr-0">
                            <div className='flex'>
                                <p className="mt-[6px] mr-2">Join LSN</p>
                                <NextImage
                                    src='/icons/sparkle.png'
                                    alt='sparkle icon'
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                />
                            </div>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section className="border-b border-gray-300 pb-4 mb-10 space-y-6">
                <h2 className="text-2xl italic mb-2 ml-2">
                    {name ? `${name}${name.endsWith('s') ? '\'' : '\'s'} events` : "Societies' events"}
                </h2>
                <UserEventsList user_id={stringid} />
            </section>
        </div>
    );
}

