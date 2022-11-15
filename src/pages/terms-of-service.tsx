import LegalPage, { getStaticProps as staticProps } from "@/components/Pages/Legal";

import * as localization from "@/lib/localization/pages/privacy-policy";

export const getStaticProps = staticProps;

export default function TermsOfServicePage() {
    return <LegalPage endpoint="/items/terms_of_service" localization={localization} />;
}
