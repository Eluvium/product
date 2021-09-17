package service

type GetUserRequest struct {
	Login string `json:"login"`
	Password string `json:"password"`
}

