export default function MenuIcon({ active, onClick }: { active?: boolean; onClick: () => void }) {
    return (
        <svg className="fill-current group cursor-pointer" width="39" height={active ? "25" : "15"} viewBox={`0 0 39 ${active ? "25" : "15"}`} onClick={onClick}>
            <rect
                x={active ? "8.00006" : "1"}
                y={active ? "22" : "0.5"}
                width={active ? "30" : "39"}
                height="3"
                className={`duration-200 ease-in transform ${active && "-rotate-45"}`}
                style={{
                    transformOrigin: active && "8.00006px 22px",
                }}
            />
            <rect
                x={active ? "9.99994" : "1"}
                y={active ? "1" : "11.5"}
                width={active ? "30" : "26"}
                height="3"
                className={`duration-200 ease-in transform ${active ? "rotate-45" : "group-hover:w-full"}`}
                style={{
                    transformOrigin: active ? "9.99994px 1px" : "0px 11.5px",
                }}
            />
        </svg>
    );
}
