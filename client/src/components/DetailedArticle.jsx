import React from 'react'
import { useParams } from 'react-router-dom'

export const DetailedArticle = () => {

    const {id} = useParams()

    return (
        <div>Article {id}</div>
    )
}
