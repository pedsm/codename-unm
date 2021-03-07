import { Badge } from '@chakra-ui/react'

const colors = {
  UNMET: 'red',
  RESEARCHING: 'blue',
  PARTIALLY_MET: 'yellow',
  MET: 'green',
}

export enum NeedStatus {
  UNMET,
  RESEARCHING,
  PARTIALLY_MET,
  MET,
}

interface NeedStatusBadgeProps {
  status:NeedStatus
}

export default function NeedStatusBadge({ status }:NeedStatusBadgeProps) {
  return (
    /** @ts-expect-error this is to solve enum confusion*/
    <Badge colorScheme={colors[status]}>{status.replace('_', ' ')}</Badge>
  )
}