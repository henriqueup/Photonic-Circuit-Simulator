FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app
EXPOSE 80
ENTRYPOINT dotnet watch run --urls=http://+:80