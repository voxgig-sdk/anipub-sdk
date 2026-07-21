package core

type AnipubError struct {
	IsAnipubError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAnipubError(code string, msg string, ctx *Context) *AnipubError {
	return &AnipubError{
		IsAnipubError: true,
		Sdk:              "Anipub",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AnipubError) Error() string {
	return e.Msg
}
