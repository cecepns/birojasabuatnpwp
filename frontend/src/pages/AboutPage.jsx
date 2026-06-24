import PageLayout from '@/components/layout/PageLayout';
import WhyUs from '@/components/home/WhyUs';
import Process from '@/components/home/Process';
import CTA from '@/components/home/CTA';

export default function AboutPage() {
  return (
    <PageLayout>
      <WhyUs pageTop />
      <Process />
      <CTA />
    </PageLayout>
  );
}
