import { setRequestLocale } from "next-intl/server";
import { QuizWizard } from "@/components/quiz/quiz-wizard";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <QuizWizard locale={locale} />
    </main>
  );
}
