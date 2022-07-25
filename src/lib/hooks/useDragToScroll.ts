import { useEffect, useRef } from "react";

export const useDragToScroll = () => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const slider = elementRef.current;
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const handleMouseDown = (e: MouseEvent) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cancelMomentumTracking();
        };

        const handleMouseLeave = () => {
            isDown = false;
        };

        const handleMouseUp = () => {
            isDown = false;
            beginMomentumTracking();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDown) return;

            e.preventDefault();

            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.2; //scroll-fast
            const prevScrollLeft = slider.scrollLeft;

            slider.scrollLeft = scrollLeft - walk;
            velX = slider.scrollLeft - prevScrollLeft;
        };

        slider.addEventListener("mousedown", handleMouseDown);
        slider.addEventListener("mouseleave", handleMouseLeave);
        slider.addEventListener("mouseup", handleMouseUp);
        slider.addEventListener("mousemove", handleMouseMove);

        // Momentum

        let velX = 0;
        let momentumID: number;

        const handleWheel = () => {
            cancelMomentumTracking();
        };

        slider.addEventListener("wheel", handleWheel, { passive: true });

        const beginMomentumTracking = () => {
            cancelMomentumTracking();
            momentumID = requestAnimationFrame(momentumLoop);
        };

        const cancelMomentumTracking = () => {
            cancelAnimationFrame(momentumID);
        };

        const momentumLoop = () => {
            slider.scrollLeft += velX;
            velX *= 0.98;

            if (Math.abs(velX) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        };

        return () => {
            slider.removeEventListener("mousedown", handleMouseDown);
            slider.removeEventListener("mouseleave", handleMouseLeave);
            slider.removeEventListener("mouseup", handleMouseUp);
            slider.removeEventListener("mousemove", handleMouseMove);
            slider.removeEventListener("wheel", handleWheel);
        };
    }, [elementRef]);

    return {
        elementRef,
    };
};
