# Online School Management and Live Teaching System

## 📌 Project Overview
The **Online School Management and Live Teaching System** is a comprehensive platform designed for managing students, teachers, and administrators. It provides real-time live teaching capabilities through seamless video conferencing integration.

## 🚀 Features
- **User Roles & Authentication**
  - Secure login/signup with **Spring Security JWT**
  - Role-based access control (Admin, Teacher, Student)
- **Student & Teacher Management**
  - Manage student and teacher profiles
  - Assign students to teachers and courses
- **Live Teaching & Meetings**
  - Integrated **ZegoCloud UI Kit & APIs** for real-time video conferencing
  - Interactive live sessions for seamless learning
- **Robust Backend & Security**
  - Built with **Spring Boot & MongoDB**
  - Secure APIs with **Spring Security**
  - Exception handling and validation
- **Real-time Chat with Support**
  - WebSocket-based real-time messaging system
- **Deployment & Cloud Integration**
  - **AWS Elastic Beanstalk** for backend deployment
  - **AWS S3** for media storage
  
## 🛠️ Tech Stack
### **Backend**
- **Spring Boot** (REST API Development, Security, WebSocket)
- **MongoDB** (Database)
- **Spring Security JWT** (Authentication & Authorization)
- **WebSocket** (Live Chat Support)

### **Frontend**
- **React.js** (User Interface)
- **Bootstrap** (Styling & Components)
- **ZegoCloud UI Kit & APIs** (Live Meetings)

### **Cloud & Deployment**
- **AWS Elastic Beanstalk** (Backend Deployment)
- **AWS S3** (File Storage)

## 🎯 How to Run the Project
### **Backend (Spring Boot - Java 17)**
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/online-school-management.git
   cd online-school-management/backend
   ```
2. Configure MongoDB in `application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
   ```
3. Run the backend application:
   ```bash
   mvn spring-boot:run
   ```

### **Frontend (React.js)**
1. Navigate to the frontend directory:
   ```bash
   cd online-school-management/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the frontend application:
   ```bash
   npm start
   ```

## 📷 Screenshots
*(Add relevant screenshots here)*

## 🤝 Contributors
- **Saksham Sharma** - [GitHub](https://github.com/yourgithubprofile)

## 📜 License
This project is licensed under the MIT License.

---
**📌 Note:** Feel free to contribute or report issues via GitHub!

