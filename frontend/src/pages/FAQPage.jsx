import PageLayout from '@/components/layout/PageLayout';
import FAQ from '@/components/home/FAQ';
import CTA from '@/components/home/CTA';

export default function FAQPage() {
  return (
    <PageLayout>
      <FAQ pageTop />
      <CTA />
    </PageLayout>
  );
}
