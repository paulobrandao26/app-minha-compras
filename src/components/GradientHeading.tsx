interface GradientHeadingProps {
  children: React.ReactNode;
  size?: 'md' | 'lg' | 'xl';
}

const tamanhos = {
  md: 'text-2xl',
  lg: 'text-4xl',
  xl: 'text-6xl',
};

export function GradientHeading({ children, size = 'lg' }: GradientHeadingProps) {
  return (
    <h2
      className={`${tamanhos[size]} font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent tracking-tight`}
    >
      {children}
    </h2>
  );
}