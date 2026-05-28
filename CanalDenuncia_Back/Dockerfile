FROM maven:3.9.9-eclipse-temurin-21

WORKDIR /app

# Copia apenas o pom primeiro (cache de dependências)
COPY pom.xml .

RUN mvn dependency:go-offline

# Copia o código-fonte (Docker Compose Watch sincroniza alterações depois)
COPY src ./src

EXPOSE 8080

CMD ["mvn", "spring-boot:run"]