# Non-Communicable Diseases Charity (Communicare)

## Introduction
Communicable diseases pose a major public health challenge worldwide, making prevention essential for safeguarding individuals and communities. While traditional public health measures are in place, persistent challenges hinder effective prevention. Leveraging technology presents an opportunity to revolutionize communicable disease prevention and overcome existing limitations.

### Key Challenges Addressed:
- **Limited Access to Technology:** Many individuals lack access to smartphones, computers, or internet connectivity, limiting their ability to benefit from technology-based interventions.
- **Health and Digital Literacy:** Marginalized communities may struggle with understanding and using digital tools effectively.
- **Data Privacy & Security:** The collection and analysis of sensitive health data must adhere to strict security protocols to prevent misuse or unauthorized access.
- **Interoperability & Standardization:** The integration of various health information systems is challenging due to a lack of standardization.
- **Cost & Resource Constraints:** Implementing and maintaining technological solutions can be costly, particularly in low-income settings.

## Solution
The **Communicare** platform is designed to develop and implement effective, scalable, and sustainable technology-based interventions to enhance the prevention of communicable diseases. The platform considers accessibility, literacy, security, interoperability, and cost-effectiveness to ensure impact and effectiveness.

## Features

### MVP Features (For Users)
- **User Authentication:** Users can create an account and log in.
- **Disease Listings:** Users can view a list of prevalent communicable diseases.
- **Affected Areas:** Users can see regions most impacted by communicable diseases.
- **Detailed Disease Information:** Users can explore detailed information about specific diseases.
- **Detailed Area Information:** Users can get more insights into specific affected areas.
- **Community Reviews:** Users can submit reviews on how they can help mitigate diseases in an area.
- **Interactive Map:** Users can view a visual representation of disease prevalence in different areas.
- **Donations:** Users can contribute donations to affected areas to support relief efforts.

### Admin Features
- **User Management:** Admins can create new users and assign roles.
- **Disease Management:** Admins can perform CRUD (Create, Read, Update, Delete) operations on communicable diseases.
- **Area Management:** Admins can perform CRUD operations on affected areas.

## Technologies Used
- **Frontend:** React with Tailwind CSS
- **Backend:** Ruby on Rails
- **Database:** MongoDB
- **Authentication:** Devise
- **API Integration:** Storm Glass API for astronomy-related data
- **Mapping & Location Services:** React Leaflet for interactive maps
- **Payments:** PayPal for handling donations
- **Deployment:** Render for backend hosting

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Ruby on Rails
- Node.js
- PostgreSQL or MongoDB

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/AlexIrungu/Communicare.git
   cd Communicare/Backend
   ```
2. Install dependencies:
   ```sh
   bundle install
   ```
3. Set up the database:
   ```sh
   rails db:create db:migrate db:seed
   ```
4. Start the server:
   ```sh
   rails s
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd communicare/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- `POST /api/v1/login` - User login
- `DELETE /api/v1/logout` - User logout

### Diseases
- `GET /api/v1/diseases` - Fetch all diseases
- `GET /api/v1/diseases/:id` - Fetch a specific disease
- `POST /api/v1/diseases` - Create a new disease (Admin only)
- `PATCH/PUT /api/v1/diseases/:id` - Update a disease (Admin only)
- `DELETE /api/v1/diseases/:id` - Delete a disease (Admin only)

### Areas
- `GET /api/v1/areas` - Fetch all affected areas
- `GET /api/v1/areas/high_risk` - Fetch high-risk areas
- `GET /api/v1/areas/:id` - Fetch a specific area
- `POST /api/v1/areas` - Create a new area (Admin only)
- `PATCH/PUT /api/v1/areas/:id` - Update an area (Admin only)
- `DELETE /api/v1/areas/:id` - Delete an area (Admin only)

### Reviews
- `POST /api/v1/areas/:area_id/reviews` - Submit a review for an area
- `GET /api/v1/areas/:area_id/reviews` - Get all reviews for an area

### Donations
- `POST /api/v1/areas/:area_id/donations` - Make a donation
- `GET /api/v1/areas/:area_id/donations` - Get donations for an area

## Contribution Guidelines
1. Fork the repository and create a new branch:
   ```sh
   git checkout -b feature-branch-name
   ```
2. Commit your changes:
   ```sh
   git commit -m "Add new feature"
   ```
3. Push to your fork:
   ```sh
   git push origin feature-branch-name
   ```
4. Open a pull request on the main repository.

## License
This project is open-source and available under the [MIT License](LICENSE).

## Contact
For any inquiries, reach out to:
- **Alex Irungu** (Project Owner)
- Email: aleaxmuiruri@gmail.com
- GitHub: [AlexIrungu](https://github.com/AlexIrungu)

---
🚀 **Let's make an impact together by using technology to fight communicable diseases!**

