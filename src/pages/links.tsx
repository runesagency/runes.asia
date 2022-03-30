import Stars from "@/components/Stars";

export default function LinksPage() {
    const links = [
        {
            label: "Website",
            href: "/",
        },
        {
            label: "Whatsapp",
            href: "https://wa.me/085156582791",
        },
    ];

    const portfolioIcons = [
        {
            label: "Behance",
            href: "https://www.behance.net/wearerunes",
            icon: (props?: any) => (
                <svg {...props} width="33" height="33" viewBox="0 0 33 33">
                    <path d="M16.5 0C13.2366 0 10.0465 0.967708 7.3331 2.78075C4.61969 4.59379 2.50484 7.17074 1.25599 10.1857C0.00714919 13.2007 -0.319606 16.5183 0.31705 19.719C0.953706 22.9197 2.52518 25.8597 4.83274 28.1673C7.14031 30.4748 10.0803 32.0463 13.281 32.6829C16.4817 33.3196 19.7993 32.9928 22.8143 31.744C25.8293 30.4952 28.4062 28.3803 30.2192 25.6669C32.0323 22.9535 33 19.7634 33 16.5C33 14.3332 32.5732 12.1876 31.744 10.1857C30.9148 8.18385 29.6994 6.3649 28.1673 4.83274C26.6351 3.30057 24.8162 2.08519 22.8143 1.25599C20.8124 0.426785 18.6668 0 16.5 0ZM16.5 29.7C13.8893 29.7 11.3372 28.9258 9.16648 27.4754C6.99575 26.025 5.30387 23.9634 4.3048 21.5514C3.30572 19.1394 3.04432 16.4854 3.55364 13.9248C4.06297 11.3643 5.32014 9.01224 7.1662 7.16619C9.01225 5.32014 11.3643 4.06296 13.9248 3.55363C16.4854 3.04431 19.1394 3.30571 21.5514 4.30479C23.9634 5.30387 26.025 6.99574 27.4754 9.16647C28.9258 11.3372 29.7 13.8893 29.7 16.5C29.7 20.0009 28.3093 23.3583 25.8338 25.8338C23.3583 28.3093 20.0009 29.7 16.5 29.7Z" />
                    <path d="M14.058 16.137C14.5963 16.0276 15.0779 15.73 15.4166 15.2976C15.7553 14.8652 15.9288 14.3263 15.906 13.7775C15.906 12.1275 14.6355 11.1375 12.705 11.1375H8.25001V21.8625H12.705C14.85 21.78 16.5 20.6745 16.5 18.7605C16.5155 18.427 16.4642 18.0938 16.3493 17.7804C16.2343 17.467 16.0579 17.1798 15.8305 16.9354C15.603 16.6911 15.3291 16.4946 15.0248 16.3575C14.7204 16.2204 14.3917 16.1454 14.058 16.137ZM10.329 12.6555H12.2265C13.2165 12.6555 13.794 13.1835 13.794 14.058C13.794 14.9325 13.167 15.5265 11.7315 15.5265H10.329V12.6555ZM11.979 20.196H10.329V16.995H12.3585C13.596 16.995 14.289 17.622 14.289 18.645C14.289 19.668 13.596 20.196 11.913 20.196H11.979ZM21.0375 13.695C20.5372 13.6533 20.0338 13.7203 19.5618 13.8915C19.0898 14.0626 18.6604 14.3338 18.3031 14.6864C17.9457 15.0391 17.6689 15.4648 17.4915 15.9345C17.3141 16.4042 17.2405 16.9067 17.2755 17.4075V18.15C17.2349 18.6651 17.3073 19.1829 17.4877 19.6672C17.6681 20.1514 17.9521 20.5904 18.3198 20.9535C18.6875 21.3165 19.1302 21.5948 19.6167 21.7689C20.1032 21.943 20.6219 22.0088 21.1365 21.9615C21.951 22.0582 22.7723 21.8482 23.4403 21.3723C24.1084 20.8965 24.5753 20.1889 24.75 19.3875H22.7535C22.6502 19.7307 22.4263 20.025 22.123 20.216C21.8198 20.4071 21.4577 20.482 21.1035 20.427C20.8513 20.4333 20.6006 20.3855 20.3684 20.2867C20.1362 20.188 19.9278 20.0406 19.7574 19.8545C19.587 19.6685 19.4584 19.448 19.3804 19.2081C19.3023 18.9681 19.2766 18.7142 19.305 18.4635V18.2325H24.75V17.457C24.7889 16.9573 24.7199 16.4551 24.5478 15.9844C24.3756 15.5137 24.1044 15.0855 23.7523 14.7287C23.4003 14.372 22.9757 14.0951 22.5073 13.9167C22.0389 13.7384 21.5377 13.6628 21.0375 13.695ZM22.6875 16.995H19.3545C19.3338 16.7662 19.3612 16.5355 19.4348 16.3179C19.5084 16.1002 19.6266 15.9003 19.782 15.731C19.9373 15.5617 20.1263 15.4267 20.3368 15.3347C20.5473 15.2426 20.7747 15.1956 21.0045 15.1965C21.2343 15.1956 21.4617 15.2426 21.6722 15.3347C21.8827 15.4267 22.0717 15.5617 22.227 15.731C22.3824 15.9003 22.5006 16.1002 22.5742 16.3179C22.6478 16.5355 22.6752 16.7662 22.6545 16.995H22.6875ZM18.5625 11.88H23.5125V12.705H18.5625V11.88Z" />
                </svg>
            ),
        },
        {
            label: "Instagram",
            href: "https://www.instagram.com/wearerunes",
            icon: (props?: any) => (
                <svg {...props} width="33" height="33" viewBox="0 0 33 33">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.6975 0.099C11.457 0.018 12.018 0 16.5 0C20.982 0 21.543 0.0195 23.301 0.099C25.059 0.1785 26.259 0.459 27.309 0.8655C28.4085 1.281 29.406 1.9305 30.231 2.7705C31.071 3.594 31.719 4.59 32.133 5.691C32.541 6.741 32.82 7.941 32.901 9.696C32.982 11.4585 33 12.0195 33 16.5C33 20.982 32.9805 21.543 32.901 23.3025C32.8215 25.0575 32.541 26.2575 32.133 27.3075C31.719 28.4086 31.0699 29.4063 30.231 30.231C29.406 31.071 28.4085 31.719 27.309 32.133C26.259 32.541 25.059 32.82 23.304 32.901C21.543 32.982 20.982 33 16.5 33C12.018 33 11.457 32.9805 9.6975 32.901C7.9425 32.8215 6.7425 32.541 5.6925 32.133C4.59138 31.7189 3.59373 31.0699 2.769 30.231C1.92957 29.407 1.27997 28.4098 0.8655 27.309C0.459 26.259 0.18 25.059 0.099 23.304C0.018 21.5415 0 20.9805 0 16.5C0 12.018 0.0195 11.457 0.099 9.699C0.1785 7.941 0.459 6.741 0.8655 5.691C1.28058 4.59012 1.93068 3.59297 2.7705 2.769C3.59406 1.92975 4.59071 1.28017 5.691 0.8655C6.741 0.459 7.9425 0.18 9.6975 0.099ZM23.1675 3.069C21.4275 2.9895 20.9055 2.973 16.5 2.973C12.0945 2.973 11.5725 2.9895 9.8325 3.069C8.223 3.1425 7.35 3.411 6.768 3.6375C5.9985 3.9375 5.448 4.293 4.8705 4.8705C4.32307 5.40308 3.90177 6.05142 3.6375 6.768C3.411 7.35 3.1425 8.223 3.069 9.8325C2.9895 11.5725 2.973 12.0945 2.973 16.5C2.973 20.9055 2.9895 21.4275 3.069 23.1675C3.1425 24.777 3.411 25.65 3.6375 26.232C3.9015 26.9475 4.323 27.597 4.8705 28.1295C5.403 28.677 6.0525 29.0985 6.768 29.3625C7.35 29.589 8.223 29.8575 9.8325 29.931C11.5725 30.0105 12.093 30.027 16.5 30.027C20.907 30.027 21.4275 30.0105 23.1675 29.931C24.777 29.8575 25.65 29.589 26.232 29.3625C27.0015 29.0625 27.552 28.707 28.1295 28.1295C28.677 27.597 29.0985 26.9475 29.3625 26.232C29.589 25.65 29.8575 24.777 29.931 23.1675C30.0105 21.4275 30.027 20.9055 30.027 16.5C30.027 12.0945 30.0105 11.5725 29.931 9.8325C29.8575 8.223 29.589 7.35 29.3625 6.768C29.0625 5.9985 28.707 5.448 28.1295 4.8705C27.5969 4.32311 26.9486 3.90182 26.232 3.6375C25.65 3.411 24.777 3.1425 23.1675 3.069ZM14.3925 21.5865C15.5695 22.0764 16.8801 22.1426 18.1004 21.7736C19.3207 21.4046 20.3751 20.6234 21.0834 19.5634C21.7917 18.5034 22.1101 17.2303 21.9841 15.9617C21.8581 14.693 21.2955 13.5075 20.3925 12.6075C19.8169 12.0322 19.1208 11.5917 18.3545 11.3177C17.5882 11.0437 16.7706 10.943 15.9607 11.0229C15.1508 11.1028 14.3687 11.3613 13.6707 11.7797C12.9727 12.1981 12.3761 12.7661 11.924 13.4428C11.4718 14.1194 11.1753 14.8879 11.0558 15.6929C10.9363 16.4979 10.9967 17.3194 11.2328 18.0983C11.4689 18.8771 11.8747 19.5939 12.4211 20.1971C12.9674 20.8003 13.6407 21.2748 14.3925 21.5865ZM10.503 10.503C11.2905 9.71546 12.2255 9.09075 13.2544 8.66454C14.2834 8.23833 15.3863 8.01896 16.5 8.01896C17.6137 8.01896 18.7166 8.23833 19.7456 8.66454C20.7745 9.09075 21.7095 9.71546 22.497 10.503C23.2845 11.2905 23.9092 12.2255 24.3355 13.2544C24.7617 14.2834 24.981 15.3863 24.981 16.5C24.981 17.6137 24.7617 18.7166 24.3355 19.7456C23.9092 20.7745 23.2845 21.7095 22.497 22.497C20.9065 24.0875 18.7493 24.981 16.5 24.981C14.2507 24.981 12.0935 24.0875 10.503 22.497C8.9125 20.9065 8.01896 18.7493 8.01896 16.5C8.01896 14.2507 8.9125 12.0935 10.503 10.503ZM26.862 9.282C27.0572 9.0979 27.2134 8.87652 27.3215 8.63096C27.4295 8.3854 27.4872 8.12065 27.4911 7.8524C27.495 7.58414 27.4451 7.31782 27.3442 7.06922C27.2434 6.82061 27.0936 6.59477 26.9039 6.40506C26.7142 6.21535 26.4884 6.06564 26.2398 5.96478C25.9912 5.86392 25.7249 5.81396 25.4566 5.81787C25.1883 5.82179 24.9236 5.87948 24.678 5.98754C24.4325 6.09561 24.2111 6.25184 24.027 6.447C23.669 6.82654 23.4729 7.33068 23.4806 7.8524C23.4882 8.37411 23.6988 8.87232 24.0677 9.24126C24.4367 9.61021 24.9349 9.82084 25.4566 9.82845C25.9783 9.83605 26.4825 9.64003 26.862 9.282Z"
                    />
                </svg>
            ),
        },
    ];

    const socialIcons = [
        {
            label: "Figma",
            href: "https://figma.com/@wearerunes",
            icon: (props?: any) => (
                <svg {...props} width="21" height="33" viewBox="0 0 21 33">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.79472 0C2.58306 0 8.33494e-05 2.82287 8.33494e-05 6.281C8.33494e-05 8.38338 0.955576 10.2506 2.42425 11.3905C1.66731 11.9846 1.05376 12.7563 0.632788 13.6436C0.211812 14.5309 -0.00487909 15.5092 8.33494e-05 16.5C8.33494e-05 18.6038 0.955576 20.4696 2.42425 21.6095C1.66731 22.2036 1.05376 22.9753 0.632788 23.8626C0.211812 24.7499 -0.00487909 25.7281 8.33494e-05 26.719C8.33494e-05 30.1771 2.58306 33 5.79472 33C9.00507 33 11.5894 30.1771 11.5894 26.719V21.4087C12.6044 22.2953 13.8838 22.7814 15.2053 22.7824C18.4169 22.781 20.9999 19.9581 20.9999 16.5C20.9999 14.3962 20.0457 12.5304 18.5758 11.3905C19.3327 10.7964 19.9462 10.0247 20.3672 9.13744C20.7882 8.25014 21.0049 7.27185 20.9999 6.281C20.9999 2.82287 18.4169 0 15.2053 0H5.79472ZM2.1775 6.281C2.1775 4.09337 3.80762 2.34162 5.79472 2.34162H9.41063V10.2204H5.79472C3.80762 10.2204 2.1775 8.46725 2.1775 6.281ZM15.2053 10.219H11.5894V2.34025H15.2053C17.1937 2.34025 18.8225 4.09337 18.8225 6.281C18.8225 8.46725 17.1937 10.219 15.2053 10.219ZM2.17882 16.5C2.17882 14.3138 3.80893 12.5606 5.79604 12.5606H9.41195V20.4394H5.79472C3.8063 20.4394 2.17882 18.6863 2.17882 16.5ZM11.5894 16.5C11.5894 14.3138 13.2195 12.5606 15.2066 12.5606C17.195 12.5606 18.8238 14.3124 18.8238 16.5C18.8238 18.6863 17.195 20.4394 15.2066 20.4394C13.2195 20.4394 11.5907 18.6876 11.5907 16.5H11.5894ZM2.17882 26.719C2.17882 24.5327 3.80893 22.781 5.79604 22.781H9.41195V26.719C9.41195 28.9066 7.78446 30.6584 5.79604 30.6584C3.80893 30.6584 2.17882 28.9066 2.17882 26.719Z"
                    />
                </svg>
            ),
        },
        {
            label: "Github",
            href: "https://github.com/wearerunes",
            icon: (props?: any) => (
                <svg {...props} width="33" height="33" viewBox="0 0 33 33">
                    <path d="M16.5 0C12.1239 0 7.92709 1.73839 4.83274 4.83274C1.73839 7.92709 0 12.1239 0 16.5C0 20.8761 1.73839 25.0729 4.83274 28.1673C7.92709 31.2616 12.1239 33 16.5 33C20.8761 33 25.0729 31.2616 28.1673 28.1673C31.2616 25.0729 33 20.8761 33 16.5C33 12.1239 31.2616 7.92709 28.1673 4.83274C25.0729 1.73839 20.8761 0 16.5 0ZM20.8491 29.9516H20.7212C20.6252 29.9571 20.5291 29.9428 20.4387 29.9097C20.3484 29.8766 20.2658 29.8253 20.196 29.7591C20.1315 29.691 20.0813 29.6106 20.0482 29.5228C20.0151 29.4349 19.9999 29.3414 20.0035 29.2476V27.3144C20.0118 26.6722 20.0172 26.0219 20.0172 25.3674C20.015 24.8888 19.9451 24.4129 19.8096 23.9539C19.6813 23.4899 19.4227 23.0723 19.0644 22.7507C20.0227 22.6582 20.9648 22.4405 21.8666 22.1031C22.6273 21.8139 23.3154 21.3614 23.8824 20.7776C24.442 20.1905 24.8586 19.481 25.0992 18.7069C25.392 17.7588 25.5312 16.7701 25.5118 15.7781C25.5171 15.0855 25.396 14.3977 25.1543 13.7486C24.9086 13.0944 24.5373 12.4946 24.0611 11.9831C24.1639 11.7252 24.2386 11.4569 24.2839 11.1829C24.3292 10.9079 24.3526 10.6301 24.3526 10.3524C24.3526 9.99487 24.3114 9.63738 24.2289 9.2895C24.1539 8.93269 24.0523 8.582 23.925 8.24038C23.8764 8.22141 23.8246 8.21207 23.7724 8.21288H23.6211C23.3049 8.21563 22.9941 8.26788 22.6944 8.3655C22.3642 8.46188 22.0412 8.58134 21.7278 8.723C21.416 8.86272 21.1126 9.02018 20.8189 9.19462C20.5232 9.36925 20.262 9.537 20.031 9.69237C17.7179 9.04768 15.2725 9.04768 12.9594 9.69237C12.7014 9.51991 12.4392 9.35394 12.1729 9.19462C11.875 9.01873 11.5664 8.86167 11.2489 8.72437C10.9363 8.57802 10.612 8.45798 10.2795 8.3655C9.98566 8.26843 9.67868 8.21696 9.36925 8.21288H9.218C9.16628 8.21214 9.11491 8.22148 9.06675 8.24038C8.93758 8.58248 8.83192 8.933 8.7505 9.2895C8.67625 9.63875 8.6405 9.99487 8.63912 10.3524C8.63912 10.6301 8.6625 10.9079 8.70925 11.1829C8.75463 11.4565 8.8275 11.7246 8.92925 11.9831C8.45431 12.4953 8.08434 13.0956 7.84025 13.75C7.59726 14.3989 7.47471 15.0866 7.47863 15.7795C7.45939 16.7662 7.59487 17.7498 7.88012 18.6945C8.129 19.4686 8.54425 20.1795 9.09562 20.779C9.66625 21.3593 10.3538 21.8103 11.1114 22.1045C12.0093 22.4483 12.9498 22.6683 13.9068 22.759C13.6395 23.0012 13.4276 23.298 13.2852 23.6294C13.1499 23.9571 13.0574 24.3009 13.0102 24.6524C12.5057 24.8939 11.954 25.0207 11.3946 25.0236C10.8752 25.0444 10.3625 24.9 9.93025 24.6111C9.5156 24.3038 9.16446 23.9191 8.89625 23.4781C8.77622 23.2929 8.64198 23.1173 8.49475 22.9529C8.33943 22.78 8.16817 22.6221 7.98325 22.4813C7.80098 22.3451 7.60118 22.2341 7.38925 22.1513C7.18073 22.0598 6.95555 22.0125 6.72788 22.0124C6.67288 22.0138 6.61787 22.0192 6.56287 22.0261C6.48776 22.0259 6.41292 22.0351 6.34013 22.0536C6.27614 22.0704 6.21563 22.0983 6.16137 22.1361C6.13671 22.1497 6.11608 22.1696 6.10159 22.1938C6.0871 22.2179 6.07926 22.2455 6.07888 22.2736C6.08465 22.3398 6.10488 22.4039 6.13815 22.4614C6.17141 22.5189 6.21689 22.5684 6.27137 22.6064C6.39925 22.7081 6.50513 22.7865 6.59038 22.8415L6.63162 22.8704C6.8145 23.012 6.9905 23.1646 7.15687 23.3282C7.31087 23.463 7.44975 23.6156 7.56938 23.782C7.69313 23.9456 7.80038 24.1203 7.887 24.3059C7.98738 24.4901 8.09325 24.7019 8.20463 24.9425C8.46313 25.5942 8.92237 26.1456 9.51638 26.5169C10.1393 26.851 10.8378 27.0174 11.5459 26.9995C11.7851 26.9995 12.0257 26.9858 12.2636 26.9583C12.5001 26.9198 12.7353 26.8799 12.9718 26.8331V29.2297C12.976 29.3264 12.9599 29.4228 12.9243 29.5128C12.8888 29.6027 12.8347 29.6842 12.7655 29.7518C12.6963 29.8194 12.6137 29.8717 12.5229 29.9052C12.4322 29.9386 12.3354 29.9526 12.2389 29.9461H12.1536C8.94718 28.9103 6.21591 26.7637 4.45165 23.8928C2.6874 21.022 2.00608 17.6156 2.53039 14.287C3.05469 10.9585 4.75018 7.92646 7.31152 5.737C9.87287 3.54753 13.1318 2.34447 16.5014 2.34447C19.871 2.34447 23.1299 3.54753 25.6912 5.737C28.2526 7.92646 29.9481 10.9585 30.4724 14.287C30.9967 17.6156 30.3154 21.022 28.5511 23.8928C26.7868 26.7637 24.0556 28.9103 20.8491 29.9461V29.9516Z" />
                </svg>
            ),
        },
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/company/wearerunes/",
            icon: (props?: any) => (
                <svg {...props} width="33" height="33" viewBox="0 0 33 33">
                    <path d="M30.3476 0H2.65238C1.188 0 0 1.188 0 2.65238V30.3476C0 31.812 1.188 33 2.65238 33H30.3476C31.812 33 33 31.812 33 30.3476V2.65238C33 1.188 31.812 0 30.3476 0ZM30.3476 30.36C11.8759 30.3559 2.64 30.3518 2.64 30.3476C2.64413 11.8759 2.64825 2.64 2.65238 2.64C21.1241 2.64413 30.36 2.64825 30.36 2.65238C30.3559 21.1241 30.3518 30.36 30.3476 30.36ZM4.89225 12.3709H9.78862V28.1201H4.89225V12.3709ZM7.3425 10.2176C8.90588 10.2176 10.1805 8.94713 10.1805 7.37962C10.1805 7.00693 10.1071 6.63789 9.96447 6.29357C9.82185 5.94925 9.6128 5.63639 9.34927 5.37286C9.08574 5.10932 8.77288 4.90028 8.42856 4.75765C8.08423 4.61503 7.71519 4.54163 7.3425 4.54163C6.96981 4.54163 6.60077 4.61503 6.25644 4.75765C5.91212 4.90028 5.59926 5.10932 5.33573 5.37286C5.0722 5.63639 4.86315 5.94925 4.72053 6.29357C4.57791 6.63789 4.5045 7.00693 4.5045 7.37962C4.50038 8.94713 5.77088 10.2176 7.3425 10.2176ZM17.7499 20.328C17.7499 18.2738 18.1418 16.2855 20.6869 16.2855C23.1949 16.2855 23.232 18.6326 23.232 20.46V28.1201H28.1243V19.4824C28.1243 15.2419 27.2085 11.979 22.2544 11.979C19.8743 11.979 18.2779 13.2866 17.622 14.5241H17.556V12.3709H12.8576V28.1201H17.7499V20.328Z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="bg-black w-full h-full min-h-screen pt-24 pb-14">
            <div className="relative z-20">
                <div className="xl:bg-contain bg-top bg-no-repeat">
                    <div className="container px-4 mx-auto">
                        <img src="/images/logo-full.svg" alt="Runes" className="w-full max-w-sm mb-12 mx-auto" />

                        <div className="grid gap-4 w-full mx-auto max-w-xs">
                            {links.map((item, index) => {
                                return (
                                    <a
                                        key={index}
                                        className="paragraph block text-center py-4 px-6 text-xl text-yellow-light border-yellow-light border-2 hover:text-black duration-200 font-semibold from-yellow-light to-yellow-medium hover:bg-gradient-to-r hover:border-transparent rounded-full"
                                        href={item.href}>
                                        {item.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto space-y-8 pt-8">
                    <section className="grid gap-4">
                        <span className="block text-center pt-4 px-6 mb-2 sm:mb-2 text-md  text-white paragraph">Portofolio</span>

                        <div className="flex space-x-8 justify-center">
                            {portfolioIcons.map((iconis, index) => {
                                return (
                                    <a key={index} href={iconis.href}>
                                        <iconis.icon className="link-icon" />
                                    </a>
                                );
                            })}
                        </div>
                    </section>

                    <section className="grid gap-4">
                        <span className="block text-center px-6 mb-2 sm:mb-2 text-md text-white paragraph">Also visit us on</span>

                        <div className="flex space-x-8 justify-center">
                            {socialIcons.map((iconis, index) => {
                                return (
                                    <a key={index} href={iconis.href}>
                                        <iconis.icon className="link-icon" />
                                    </a>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>

            <Stars />
        </section>
    );
}
