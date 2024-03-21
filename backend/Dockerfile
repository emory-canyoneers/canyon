# Build
FROM maven:3.6.3-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install
# sudo docker buildx build --platform linux/amd64 -t andrewtlu/canyon:dev .

# Run
FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build /app/target/canyon-0.0.1-SNAPSHOT.jar ./backend.jar
EXPOSE 8080
CMD ["java", "-jar", "backend.jar"]
# sudo docker run -d -p 80:8080 andrewtlu/canyon:dev
