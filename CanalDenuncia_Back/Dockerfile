# Estágio 1: Compilação (Build)
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copia apenas o pom.xml para aproveitar o cache das dependências do Maven
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia o código fonte e realiza o build da aplicação
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio 2: Execução (Runtime)
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copia o JAR gerado no estágio de build
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta padrão do Spring Boot (8080)
EXPOSE 8080

# Executa o JAR da aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
