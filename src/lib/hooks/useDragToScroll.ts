import { useEffect, useRef } from "react";

export const useDragToScroll = () => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const slider = elementRef.current;
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        slider.addEventListener("mousedown", (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cancelMomentumTracking();
        });

        slider.addEventListener("mouseleave", () => {
            isDown = false;
        });

        slider.addEventListener("mouseup", () => {
            isDown = false;
            beginMomentumTracking();
        });

        slider.addEventListener("mousemove", (e) => {
            if (!isDown) return;

            e.preventDefault();

            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.2; //scroll-fast
            const prevScrollLeft = slider.scrollLeft;

            slider.scrollLeft = scrollLeft - walk;
            velX = slider.scrollLeft - prevScrollLeft;
        });

        // Momentum

        let velX = 0;
        let momentumID: number;

        slider.addEventListener("wheel", () => {
            cancelMomentumTracking();
        });

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
            slider.removeEventListener("mousedown", () => {});
            slider.removeEventListener("mouseleave", () => {});
            slider.removeEventListener("mouseup", () => {});
            slider.removeEventListener("mousemove", () => {});
            slider.removeEventListener("wheel", () => {});
        };
    }, [elementRef]);

    return {
        elementRef,
    };
};
