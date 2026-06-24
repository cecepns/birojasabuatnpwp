import PageLayout from '@/components/layout/PageLayout';
import Services from '@/components/home/Services';
import CTA from '@/components/home/CTA';

export default function ServicesPage() {
  return (
    <PageLayout>
      <Services pageTop />
      <CTA />
    </PageLayout>
  );
}
