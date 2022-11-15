import LegalPage from "@/components/Pages/Legal";

import * as localization from "@/lib/localization/pages/terms-of-service";

export default function TermsOfServicePage() {
    return <LegalPage endpoint="/items/terms_of_service" localization={localization} />;
}
