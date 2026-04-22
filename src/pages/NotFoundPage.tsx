import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[var(--navy)] flex flex-col items-center justify-center text-center section-padding">
      <p className="font-display text-[120px] sm:text-[180px] text-white/5 leading-none select-none">404</p>
      <h1 className="font-display text-4xl text-white -mt-8 mb-3">Page not found</h1>
      <p className="font-body text-white/50 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button variant="secondary">Back to Home</Button>
      </Link>
    </div>
  )
}
