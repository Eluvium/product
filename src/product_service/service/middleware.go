package service

import (
	"fmt"
	"github.com/labstack/echo"
	"github.com/dgrijalva/jwt-go"
	"log"
	"net/http"
	"os"
	"strings"
	"errors"
)

type Claims struct {
	jwt.StandardClaims
	Username string `json:"username"`
}

var ErrInvalidAccessToken = errors.New("invalid auth token")


func auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(ctx echo.Context) error {
		authHeader := ctx.Request().Header.Get("Authorization")
		signKey := os.Getenv("KEY")
		if authHeader == "" {
			log.Println("no header")
			return ctx.NoContent(http.StatusNonAuthoritativeInfo)
		}
		header_path := strings.Split(authHeader, " ")
		if len(header_path) != 2 {
			return ctx.NoContent(http.StatusNonAuthoritativeInfo)
		}
		if header_path[0] != "Bearer" {
			return ctx.NoContent(http.StatusNonAuthoritativeInfo)
		}
		username, err := ParseToken(header_path[1], []byte(signKey))
		if err != nil {
			if err == ErrInvalidAccessToken {
				return ctx.NoContent(http.StatusNonAuthoritativeInfo)
			}
			return ctx.NoContent(http.StatusBadRequest)
		}
		ctx.Set("username", username)
		if err := next(ctx); err != nil {
			ctx.Error(err)
		}

		return nil
	}
}

func ParseToken(accessToken string, signingKey []byte) (string, error) {
	token, err := jwt.ParseWithClaims(accessToken, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			log.Println("Unexpected signing method: %v", token.Header["alg"])
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return signingKey, nil
	})

	if err != nil {
		log.Println("Error", err)

		return "", err
	}

	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims.Username, nil
	}

	return "", ErrInvalidAccessToken
}
