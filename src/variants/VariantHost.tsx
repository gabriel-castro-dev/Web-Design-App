import { Suspense } from 'react'
import { useParams } from 'react-router'
import { getVariant } from './registry'

export function VariantHost() {
  const { direction = '', impl = '' } = useParams()
  const Variant = getVariant(direction, impl)
  if (!Variant) {
    return <p className="p-8 font-mono text-sm">Variant {direction}/{impl} not built yet.</p>
  }
  return (
    <Suspense fallback={null}>
      <Variant base={`/variants/${direction}/${impl}`} />
    </Suspense>
  )
}
