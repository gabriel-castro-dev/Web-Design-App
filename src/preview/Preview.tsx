import { Component, useEffect, useState, type ComponentType, type ReactNode } from 'react'
import { loadDemo } from './demos'

class ErrorBoundary extends Component<{ children: ReactNode }, { error?: Error }> {
  state: { error?: Error } = {}
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    if (this.state.error) return <Message title="This preview crashed" detail={this.state.error.message} />
    return this.props.children
  }
}

function Message({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="grid min-h-dvh place-items-center p-8 text-center font-mono text-sm text-neutral-500">
      <div>
        <p className="text-neutral-800">{title}</p>
        {detail && <p className="mt-2 max-w-md">{detail}</p>}
      </div>
    </div>
  )
}

export function Preview({ id }: { id: string }) {
  const [state, setState] = useState<{ Demo?: ComponentType; missing?: boolean }>({})

  useEffect(() => {
    loadDemo(id).then((Demo) => setState(Demo ? { Demo } : { missing: true }))
  }, [id])

  if (state.missing) return <Message title="No live preview for this reference" detail={id} />
  if (!state.Demo) return null
  const { Demo } = state
  return (
    <ErrorBoundary>
      <Demo />
    </ErrorBoundary>
  )
}
