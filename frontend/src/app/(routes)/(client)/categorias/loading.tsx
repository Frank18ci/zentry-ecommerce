import { Card, CardContent, CardHeader } from '@/core/components/ui/card'
import { Skeleton } from '@/core/components/ui/skeleton'

export default function LoadingPageCategorias () {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className='h-6 w-3/4 mb-2' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-3'>
              <Skeleton className='h-4 w-1/2' />
              <div className='flex gap-2'>
                <Skeleton className='h-6 w-16' />
                <Skeleton className='h-6 w-20' />
                <Skeleton className='h-6 w-14' />
              </div>
              <div className='flex gap-2'>
                <Skeleton className='h-8 flex-1' />
                <Skeleton className='h-8 w-20' />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
