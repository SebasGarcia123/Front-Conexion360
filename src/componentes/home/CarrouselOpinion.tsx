import Slider from 'react-slick'
import { Box } from '@mui/material'
import { CardOpinion } from './CardOpinion'
import axios from 'axios'
import type { IOpinion } from '../../types'
import { useEffect, useState } from 'react'

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    adaptiveHeight: true,
    responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 3 } },
        { breakpoint: 900, settings: { slidesToShow: 2 } },
        { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
}

export const CarrouselOpinion = () => {
    const [opinions, setOpinions] = useState<IOpinion[]>([])
    const [loading, setLoading] = useState(true)

    const getOpinions = async () => {
        try {
            const res = await axios.get('http://localhost:4000/opinions')
            setOpinions(res.data)
        } catch (error) {
            console.error('Error loading opinions', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOpinions()
    }, [])

    if (loading) return null

    return (
        <Box
            sx={{
                width: '100%',
                px: { xs: 2, md: 8 },
                overflow: 'visible',
                position: 'relative',
            }}
        >
            <Slider {...settings}>
                {opinions.map((opinion) => (
                    <Box key={opinion._id} sx={{ px: 1 }}>
                        <CardOpinion key={opinion._id} opinion={opinion} />
                    </Box>
                ))}
            </Slider>
        </Box>
    )
}
