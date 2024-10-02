import { Dashboard } from '@/components/playground'
import { TooltipProvider } from '@/components/ui/tooltip'
import React from 'react'

export default function Playground() {
  return (
    <TooltipProvider>
        <Dashboard/>
    </TooltipProvider>
  )
}
