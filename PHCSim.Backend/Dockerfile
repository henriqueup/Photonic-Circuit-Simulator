FROM microsoft/dotnet:2.1-sdk-alpine AS build-env
WORKDIR /app
EXPOSE 80
ENTRYPOINT dotnet watch run --urls=http://+:80