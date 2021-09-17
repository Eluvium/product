package auth

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

type Jwt struct {
	hashSalt       string
	signingKey     []byte
	expireDuration time.Duration
}

func NewJwt(hashSalt string, signingKey []byte, expireDuration time.Duration) *Jwt {
	return &Jwt{
		hashSalt:       hashSalt,
		signingKey:     signingKey,
		expireDuration: expireDuration,
	}
}

func (a *Jwt) SignIn(ctx echo.Context) error {
	var login LoginUserRequest
	body := ctx.Request().Body
	body_b, err := ioutil.ReadAll(body)
	if err != nil {
		log.Println(err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError)
	}
	err = json.Unmarshal(body_b, &login)
	pwd := md5.New()

	pwd.Write([]byte(login.Password))
	login.Password = fmt.Sprintf("%x", pwd.Sum(nil))

	log.Println("pass", login.Password)

	user, err := login.GetUser()
	if err != nil {
		return ctx.NoContent(http.StatusUnauthorized)
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, Claims{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(a.expireDuration*time.Second).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
		Username: user.Login,
	})
	tocken_string, err := token.SignedString(a.signingKey)
	if err != nil {
		log.Println(err.Error())
		return echo.NewHTTPError(http.StatusInternalServerError)
	}

	response := LoginResponce{Tocken: tocken_string}
	return ctx.JSON(200, response)
}

func SetupHandlers()  {
	hashSalt := os.Getenv("SALT")
	signingKey := []byte(os.Getenv("KEY"))
	duration_env := os.Getenv("EXPIRE")

	duration_int, err := strconv.Atoi(duration_env)
	if err != nil {
		panic(err.Error())
	}
	expireDuration := time.Duration(duration_int)
	token_service := NewJwt(hashSalt, signingKey, expireDuration)
	e := echo.New()
	e.POST("/auth", token_service.SignIn)
	e.Logger.Fatal(e.Start(":1323"))
}