import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Box } from '@mui/material'

export const SpotImageCarousel = ({images, show=true}) => {

  const Item = ({item}) => {
  
    return (
        <Paper>
            <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={item.url}
                alt={item.label}
              />
        </Paper>
    )
}
    const blankImage = [
            {
                label: 'image from git',
                url:
                'https://user-images.githubusercontent.com/39013780/221355621-ff1026cf-408a-4541-8497-8b2bccc44d47.png',
            }
        ]

    const items = images?.length > 0 ? images : blankImage

    return (
        <Carousel indicators={false} navButtonsAlwaysVisible={show ? true : false } autoPlay={false}>
         {
            items.map( (item, i) => <Item key={i} item={item} /> )
         }
        </Carousel>
    )
}
