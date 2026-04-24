# Healthcare Appointment Management System

Production-ready microservices application for patient registration, doctor availability, appointment booking, and notification handling.

## Services

- `patient-service`: patient registration, login, JWT auth, and profile management
- `doctor-service`: doctor directory, specialization filtering, and availability scheduling
- `appointment-service`: central booking logic, validation, double-booking prevention, and cancellation
- `notification-service`: mock notification persistence and dispatch logging
- `api-gateway`: single entry point for frontend and external API clients
- `frontend`: React UI for registration, login, browsing doctors, booking, and appointment management

## Run

```bash
docker-compose up --build
```

## URLs

- Frontend: `http://localhost:8080`
- API Gateway: `http://localhost:4000/api`

## Sample API routes

- `POST /api/patients/register`
- `POST /api/patients/login`
- `GET /api/doctors`
- `POST /api/appointments/book`
- `GET /api/appointments/mine`
- `DELETE /api/appointments/:id`
