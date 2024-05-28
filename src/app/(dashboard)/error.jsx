'use client' // Error components must be Client Components

import { Button, Card, Subtitle, Title } from '@tremor/react'
import { useEffect } from 'react'
import { RiRefreshLine } from 'react-icons/ri'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('error', error.message)
    }, [error])

    return (
        <Card className="max-w-md mx-auto text-center overflow-auto space-y-4">
            <Title>Something went wrong!</Title>
            <Subtitle color='red'>{error?.message}</Subtitle>
            <Button
                icon={RiRefreshLine}
                variant='secondary'
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </Card>
    )
}