import { FetchApi } from "./utils"


export const GetListApi = () => {
    return FetchApi("/api/lists")
}

export const DeleteListApi = (listId: number) => {
    return FetchApi("/api/lists", "DELETE", { id: listId })
}

export const CreateListApi = (text: string) => {
    return FetchApi("/api/lists", "POST", { name: text })
}

export const EditListApi = (list: {}) => {
    return FetchApi("/api/lists", "PUT", { ...list })
}

export const GetSelectedList = (photoId: string) => {
    return FetchApi("/api/lists?id=" + photoId, "GET")
}

export const GetImagesApi = (search: string) => {
    let url = "/api";
    if (search.length > 0) {
        url = `/api/search?query=${encodeURI(search)}`;
    }
    return FetchApi(url).then(data => {
        if (search.length > 0) {
            return data.results
        }
        return data;
    })
}

export const AddRemovePhotoLinkApi = (listId: number, v: boolean, url: any) => {
    // let v = !selected[listId];
    const method = v ? "POST" : "DELETE";
    return FetchApi("/api/lists/photos", method, {
        list_id: listId,
        photo_id: url.id,
        photo_url: url.url,
        likes: url.likes,
    }).then((data) => {
        //   setSelected({ ...selected, [listId]: v });
        return data
    });
};