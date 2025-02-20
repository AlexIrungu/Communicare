puts "Seeding Communicable Diseases..."
malaria = CommunicableDisease.find_or_create_by!(
  name: "Malaria", 
  description: "Mosquito-borne infectious disease.",
  symptoms: "Fever, chills, headache, nausea, vomiting",
  prevention_measures: "Use of mosquito nets, insect repellents, antimalarial drugs"
)
tuberculosis = CommunicableDisease.find_or_create_by!(
  name: "Tuberculosis", 
  description: "Bacterial infection affecting the lungs.",
  symptoms: "Coughing, chest pain, weight loss, fatigue",
  prevention_measures: "Vaccination, wearing masks, proper ventilation"
)
cholera = CommunicableDisease.find_or_create_by!(
  name: "Cholera", 
  description: "Severe diarrheal disease caused by infection.",
  symptoms: "Severe diarrhea, dehydration, vomiting",
  prevention_measures: "Safe drinking water, proper sanitation, oral cholera vaccine"
)

puts "Seeding Areas..."
Area.find_or_create_by!(
  name: "Nairobi", 
  communicable_disease: malaria,
  location: "Kenya",
  latitude: -1.286389,
  longitude: 36.817223,
  reported_cases: 1000
)
Area.find_or_create_by!(
  name: "Mombasa", 
  communicable_disease: tuberculosis,
  location: "Kenya",
  latitude: -4.043477,
  longitude: 39.668206,
  reported_cases: 500
)
Area.find_or_create_by!(
  name: "Kisumu", 
  communicable_disease: cholera,
  location: "Kenya",
  latitude: -0.091702,
  longitude: 34.767956,
  reported_cases: 300
)

puts "Seeding Users..."
User.find_or_create_by!(email: "admin@example.com") do |user|
  user.password = "password123"
  user.first_name = "Admin"
  user.last_name = "User"
  user.admin = true
end

puts "Seeding Completed Successfully!"