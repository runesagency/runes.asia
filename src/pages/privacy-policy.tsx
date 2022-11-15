import LegalPage from "@/components/Pages/Legal";

import * as localization from "@/lib/localization/pages/privacy-policy";

export default function PrivacyPolicyPage() {
    return <LegalPage endpoint="/items/privacy_policy" localization={localization} />;
}
