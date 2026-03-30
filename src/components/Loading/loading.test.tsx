import { render, screen } from '@testing-library/react'
import Loading from '@/components/Loading'

describe('Loading', () => {
    it('renders default message when no message is provided', () => {
        render(<Loading />)

        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders custom message when provided', () => {
        render(<Loading message="Fetching data..." />)

        expect(screen.getByText('Fetching data...')).toBeInTheDocument()
    })
})