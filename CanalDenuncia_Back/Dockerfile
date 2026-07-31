# Stage 1: Build the application
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Copy pom.xml and download dependencies (cache layer)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Production environment
FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java",\
    "-Xms128m",\
    "-Xmx384m",\
    "-XX:+UseSerialGC",\
    "-jar",\
    "app.jar"]
