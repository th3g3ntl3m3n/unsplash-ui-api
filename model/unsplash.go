package model

type UnsplashPhoto struct {
	Id    string     `json:"id,omitempty"`
	Likes uint       `json:"likes,omitempty"`
	Urls  UrlContent `json:"urls,omitempty"`
}

type UrlContent struct {
	Regular string `json:"regular,omitempty"`
}

type SearchResponseOb struct {
	Results    []UnsplashPhoto `json:"results,omitempty"`
	TotalPages uint            `json:"total_pages,omitempty"`
	Total      uint            `json:"total,omitempty"`
}
