import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import logoWhite from '@/assets/logo-white.png';

export default function Logo({
  className = 'h-10 md:h-12 w-auto',
  link = true,
  variant = 'default',
}) {
  const src = variant === 'white' ? logoWhite : logo;

  const image = (
    <img
      src={src}
      alt="Biro Jasa Buat NPWP & NIB"
      className={`object-contain ${className}`}
    />
  );

  if (!link) return image;

  return (
    <Link to="/" className="inline-flex shrink-0 group">
      <span className="group-hover:opacity-90 transition-opacity">{image}</span>
    </Link>
  );
}
