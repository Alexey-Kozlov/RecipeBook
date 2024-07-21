FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ENV DOTNET_NUGET_SIGNATURE_VERIFICATION=false
WORKDIR /app
EXPOSE 5030

COPY WebApi.csproj WebApi.csproj
RUN dotnet restore WebApi.csproj 
COPY . .

RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WebApi.dll"]