export function WizardCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-strong bg-surface-elevated p-6 shadow-lg shadow-black/20 sm:p-8">
      {children}
    </div>
  );
}
