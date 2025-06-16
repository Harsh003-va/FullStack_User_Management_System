# Build stage
FROM eclipse-temurin:21-jdk-jammy as builder
WORKDIR /app

# Cache dependencies separately for faster builds
COPY pom.xml mvnw* ./
COPY .mvn/ .mvn/
RUN ./mvnw dependency:go-offline

# Build application
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy the built JAR
COPY --from=builder /app/target/User-*.jar app.jar

# Security
RUN addgroup --system spring && \
    adduser --system --ingroup spring spring && \
    chown spring:spring /app
USER spring:spring

# Networking
EXPOSE 8080

# Health check (matches compose file)
HEALTHCHECK --interval=30s --timeout=10s \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Startup with JVM optimizations
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=docker", "app.jar"]