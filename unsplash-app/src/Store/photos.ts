import { GetImagesApi } from "../api";
import { GET_IMAGES, SELECT_LIST } from "./constants";



export const getPhotosAction = (search: string) => (dispatch: any) => {
    GetImagesApi(search).then(data => {
        const newImages = data ? data.map((image: any) => ({
            id: image.id,
            url: image.urls["regular"],
            likes: image.likes,
        })) : []
        dispatch({ type: GET_IMAGES, payload: newImages })
        dispatch({ type: SELECT_LIST, payload: -1 })
    })
}

const InitState = {
    photos: []
}

export default function reducer(state = InitState, action: any) {
    switch (action.type) {

        case GET_IMAGES:
            return { ...state, photos: action.payload }

        default:
            return { ...state };
    }
}

