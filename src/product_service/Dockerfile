FROM golang:1.14.3-alpine AS build
WORKDIR ./
ENV CGO_ENABLED=0
COPY . .
ARG TARGETOS
ARG TARGETARCH
RUN GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -o /out/user .

FROM scratch AS bin
COPY --from=build /out/user /