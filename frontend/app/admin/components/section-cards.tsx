import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4  *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className=" bg-[var(--teal-dark-dark)]">
        <CardHeader>
          <CardDescription className="text-white text-lg font-bold">Total Earnings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-white">
            {0}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-white">
            Earnings this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-white">
            Compare to past 3 months
          </div>
        </CardFooter>
      </Card>
      <Card className=" bg-[var(--teal-dark-dark)]">
        <CardHeader>
          <CardDescription className="text-white font-bold text-lg">New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-white">
            {0}
          </CardTitle>
          <CardAction>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-white">
            Down 20% this period <IconTrendingUp className="size-4" />
          </div>
          <div className="text-white">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className=" bg-[var(--teal-dark-dark)]">
        <CardHeader>
          <CardDescription className="text-white text-lg font-bold">Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-white">
            {0}
          </CardTitle>
          <CardAction>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-white">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-white">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className=" bg-[var(--teal-dark-dark)]">
        <CardHeader>
          <CardDescription className="text-white font-bold text-lg">Total Products</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-white">
            {0}
          </CardTitle>
          <CardAction>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-white">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foregroundn text-white">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}
