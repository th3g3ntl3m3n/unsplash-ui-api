import { CreateListApi, DeleteListApi, EditListApi, GetListApi } from "../api";
import { FetchApi } from "../utils";
import { GET_LIST, DELETE_LIST, CREATE_LIST, EDIT_LIST, SELECT_LIST, GET_IMAGES, ADD_LIST_ACTION } from "./constants";



export const getListAction = () => (dispatch: any, getState: any) => {
    const { list } = getState().lists;
    if (list.length === 0) {
        GetListApi().then(data => {
            dispatch({ type: GET_LIST, payload: data || [] })
        })
    }
}

export const deleteListAction = (listId: number) => (dispatch: any, getState: any) => {
    DeleteListApi(listId).then(data => {
        dispatch({ type: DELETE_LIST, payload: data.id })
    })
}

export const createListAction = (text: string) => (dispatch: any, getState: any) => {
    CreateListApi(text).then(data => {
        dispatch({ type: CREATE_LIST, payload: data })
        dispatch({ type: ADD_LIST_ACTION, payload: false })
    })
}

export const editListAction = (list: {}) => (dispatch: any, getState: any) => {
    EditListApi(list).then(data => {
        dispatch({ type: EDIT_LIST, payload: data })
    })
}

export const updateListCount = (counter: number, listId: number) => (dispatch: any, getState: any) => {
    const list = getState().lists.list;
    let newList = list.map((l: any) => l.id === listId ? ({ ...l, count: l.count ? l.count + counter : counter }) : l);
    dispatch({ type: GET_LIST, payload: newList })

}

export const selectListAction = (listId: number) => (dispatch: any, getState: any) => {
    FetchApi(`/api/lists/photos?id=${listId}`).then((data) => {
        dispatch({ type: GET_IMAGES, payload: data || [] })
        dispatch({ type: SELECT_LIST, payload: listId })
    });
}

export const addListAction = (ob: boolean | any) => (dispatch: any, getState: any) => {
    dispatch({ type: ADD_LIST_ACTION, payload: ob })
}

const InitState = {
    list: [],
    activeListId: -1,
    addListItem: false
}

export default function reducer(state = InitState, action: { type: string, payload: any }) {
    switch (action.type) {
        case GET_LIST:
            return { ...state, list: action.payload }

        case DELETE_LIST:
            return { ...state, list: state.list.filter((l: any) => l.id !== action.payload) }

        case CREATE_LIST:
            return { ...state, list: [...state.list, action.payload] }

        case SELECT_LIST:
            return { ...state, activeListId: action.payload }

        case ADD_LIST_ACTION:
            return { ...state, addListItem: action.payload }

        case EDIT_LIST:
            let newList = state.list.map((l: any) => {
                if (l.id === action.payload.id) {
                    return action.payload;
                }
                return l;
            });
            return { ...state, list: newList }

        default:
            return state;
    }
}