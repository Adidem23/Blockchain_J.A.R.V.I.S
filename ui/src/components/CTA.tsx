import { WavePath } from "@/components/ui/wave-path";
import { Button } from "./ui/button";
import { ArrowRight, Plus, Minus } from "lucide-react";
import Spline from '@splinetool/react-spline'
import { useState } from 'react'

interface ExpandableCardProps {
    title: string;
    description: string;
    isOpenByDefault: boolean;
}

const ExpandableCard = ({ title, description, isOpenByDefault }: ExpandableCardProps) => {
    const [isOpen, setIsOpen] = useState(isOpenByDefault);

    return (
        <div className={`rounded-lg transition-all duration-300 ${isOpen ? 'bg-card p-4' : 'p-2'}`}>
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <h3 className="font-semibold text-lg">{title}</h3>
                <button className="p-1">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </button>
            </div>
            {isOpen && (
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
};

const CTA = () => {
    return (
        <div className="relative w-full flex min-h-screen flex-col items-center justify-center">
            <div className="flex w-[70vw] flex-col items-end">
                <WavePath className="mb-10" />
                <div className="flex w-full flex-col items-end">
                    <div className="flex justify-row w-full gap-10">
                        <div className=" w-[40%] flex flex-col justify-between h-[50vh]">
                            <div>
                                <p className=" text-4xl font-serif">From Voice Command to Autonomous Execution</p>
                                <Button variant='link' className=" underline font-light">
                                    Explore Our Agent <ArrowRight />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <ExpandableCard 
                                    title="Voice Recognition" 
                                    description="Advanced AI-powered voice recognition that understands natural language commands and executes complex blockchain transactions seamlessly."
                                    isOpenByDefault={true}
                                />
                                <ExpandableCard 
                                    title="Smart Contract Automation" 
                                    description="Automatically deploy and interact with smart contracts using simple voice commands, no coding required."
                                    isOpenByDefault={false}
                                />
                            </div>
                        </div>
                        <div className=" h-[50vh] w-[35vw] rounded-4xl bg-card flex flex-row">
                            <div className=" w-1/2 flex flex-col justify-end p-4">
                                <p className=" text-2xl font-serif mb-4">One Agent, Multiple Tasks—united by your voice.</p>
                                <Button className=" rounded-xl">Get Started</Button>
                            </div>
                            <div className=" w-1/2 p-4">
                                <div className="border rounded-xl overflow-hidden h-full">
                                    <Spline
                                        scene="https://prod.spline.design/m0JX4ekxx-aJGxNG/scene.splinecode"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CTA