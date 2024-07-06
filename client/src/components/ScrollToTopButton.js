import { useState, useEffect } from "react";

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    function handleScroll() {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        setIsVisible(scrollTop > windowHeight)
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-5 right-8 px-8 py-3 rounded-full bg-green text-black hover:bg-black hover:text-white font-extrabold font-inter text-3xl transition-all ease-in-out duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Scroll to top"
            >
            ↑
            </button>
    )
}

export default ScrollToTopButton