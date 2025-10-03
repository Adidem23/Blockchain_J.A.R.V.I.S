import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import FooterBg from "@/assets/Footer_bg.jpg";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Footer = () => {
    const container = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [-150, 0]);

    return (
        <div id="contact" ref={container} className=" bottom-0 relative bg-gray-50">
            <div
                id="footer"
                ref={container}
                className="relative text-white border-none"
                style={{ backgroundImage: `url(${FooterBg})` }}
            >
                <div className="h-[150px] md:h-[250px] overflow-hidden">
                    <motion.div
                        className="h-full flex justify-center items-center"
                        style={{ y }}
                    >
                        <p className="text-[80px] md:text-[80px] lg:text-[250px] font-extrabold font-Kudryashev mt-4 text-transparent bg-gradient-to-b from-white to-gray-600 bg-clip-text">
                            Jarvis AI
                        </p>
                    </motion.div>
                </div>
                <nav className="mb-8 flex flex-wrap justify-center gap-6">
                    <a href="#" className="hover:text-primary">Home</a>
                    <a href="#" className="hover:text-primary">About</a>
                    <a href="#" className="hover:text-primary">Features</a>
                    <a href="#" className="hover:text-primary">Sign Up</a>
                </nav>
                <div className=" flex flex-col justify-center items-center">
                    <div className="mb-8 flex space-x-4">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <FaFacebook className="h-4 w-4" />
                            <span className="sr-only">Facebook</span>
                        </Button>

                        <Button variant="outline" size="icon" className="rounded-full">
                            <FaInstagram className="h-4 w-4" />
                            <span className="sr-only">Instagram</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <FaTwitter className="h-4 w-4" />
                            <span className="sr-only">Twitter</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <FaLinkedin className="h-4 w-4" />
                            <span className="sr-only">LinkedIn</span>
                        </Button>
                    </div>
                    <div className="mb-8 w-full max-w-md">
                        <form className="flex space-x-2">
                            <div className="flex-grow">
                                <Label htmlFor="email" className="sr-only">Email</Label>
                                <Input id="email" placeholder="Enter your email" type="email" className="rounded-full" />
                            </div>
                            <Button type="submit" className="rounded-full">Subscribe</Button>
                        </form>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            © 2025 Jarvis AI. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
