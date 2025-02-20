puts "Seeding Communicable Diseases..."

# List of communicable diseases with their features
communicable_diseases = [
  {
    name: "Malaria",
    description: "Mosquito-borne infectious disease.",
    symptoms: "Fever, chills, headache, nausea, vomiting",
    prevention_measures: "Use of mosquito nets, insect repellents, antimalarial drugs",
    image_url: "https://example.com/images/malaria.jpg"
  },
  {
    name: "Tuberculosis",
    description: "Bacterial infection affecting the lungs.",
    symptoms: "Coughing, chest pain, weight loss, fatigue",
    prevention_measures: "Vaccination, wearing masks, proper ventilation",
    image_url: "https://example.com/images/tuberculosis.jpg"
  },
  {
    name: "Cholera",
    description: "Severe diarrheal disease caused by infection.",
    symptoms: "Severe diarrhea, dehydration, vomiting",
    prevention_measures: "Safe drinking water, proper sanitation, oral cholera vaccine",
    image_url: "https://example.com/images/cholera.jpg"
  },
  {
    name: "HIV/AIDS",
    description: "Viral infection that attacks the immune system.",
    symptoms: "Fever, weight loss, fatigue, swollen lymph nodes",
    prevention_measures: "Safe sex practices, antiretroviral therapy, needle exchange programs",
    image_url: "https://example.com/images/hiv_aids.jpg"
  },
  {
    name: "Influenza",
    description: "Viral infection that attacks the respiratory system.",
    symptoms: "Fever, cough, sore throat, muscle aches",
    prevention_measures: "Annual vaccination, hand hygiene, avoiding close contact with sick individuals",
    image_url: "https://example.com/images/influenza.jpg"
  },
  {
    name: "Dengue Fever",
    description: "Mosquito-borne viral infection.",
    symptoms: "High fever, severe headache, pain behind the eyes, joint and muscle pain",
    prevention_measures: "Mosquito control, use of repellents, eliminating standing water",
    image_url: "https://example.com/images/dengue.jpg"
  },
  {
    name: "Hepatitis B",
    description: "Viral infection that affects the liver.",
    symptoms: "Jaundice, fatigue, abdominal pain, dark urine",
    prevention_measures: "Vaccination, safe sex practices, avoiding sharing needles",
    image_url: "https://example.com/images/hepatitis_b.jpg"
  },
  {
    name: "Zika Virus",
    description: "Mosquito-borne viral infection.",
    symptoms: "Mild fever, rash, conjunctivitis, muscle and joint pain",
    prevention_measures: "Mosquito control, use of repellents, safe sex practices",
    image_url: "https://example.com/images/zika.jpg"
  },
  {
    name: "Ebola",
    description: "Severe, often fatal illness in humans.",
    symptoms: "Fever, severe headache, muscle pain, weakness",
    prevention_measures: "Avoiding contact with infected individuals, safe burial practices, wearing protective clothing",
    image_url: "https://example.com/images/ebola.jpg"
  },
  {
    name: "COVID-19",
    description: "Respiratory illness caused by the SARS-CoV-2 virus.",
    symptoms: "Fever, cough, shortness of breath, loss of taste or smell",
    prevention_measures: "Vaccination, wearing masks, social distancing",
    image_url: "https://example.com/images/covid19.jpg"
  },
  {
    name: "Measles",
    description: "Highly contagious viral disease.",
    symptoms: "Fever, cough, runny nose, red eyes, rash",
    prevention_measures: "Vaccination, avoiding close contact with infected individuals",
    image_url: "https://example.com/images/measles.jpg"
  },
  {
    name: "Polio",
    description: "Viral disease that affects the nervous system.",
    symptoms: "Fever, fatigue, headache, vomiting, stiffness in the neck",
    prevention_measures: "Vaccination, maintaining good hygiene",
    image_url: "https://example.com/images/polio.jpg"
  }
]

# Seed communicable diseases
communicable_diseases.each do |disease|
  CommunicableDisease.find_or_create_by!(name: disease[:name]) do |cd|
    cd.description = disease[:description]
    cd.symptoms = disease[:symptoms]
    cd.prevention_measures = disease[:prevention_measures]
    cd.image_url = disease[:image_url]
  end
end

puts "Seeding Areas..."

# Seed areas with associated diseases
Area.find_or_create_by!(name: "Nairobi") do |area|
  area.communicable_disease = CommunicableDisease.find_by(name: "Malaria")
  area.location = "Kenya"
  area.latitude = -1.286389
  area.longitude = 36.817223
  area.reported_cases = 1000
end

Area.find_or_create_by!(name: "Mombasa") do |area|
  area.communicable_disease = CommunicableDisease.find_by(name: "Tuberculosis")
  area.location = "Kenya"
  area.latitude = -4.043477
  area.longitude = 39.668206
  area.reported_cases = 500
end

Area.find_or_create_by!(name: "Kisumu") do |area|
  area.communicable_disease = CommunicableDisease.find_by(name: "Cholera")
  area.location = "Kenya"
  area.latitude = -0.091702
  area.longitude = 34.767956
  area.reported_cases = 300
end

puts "Seeding Users..."

User.find_or_create_by!(email: "admin@example.com") do |user|
  user.password = "password123"
  user.first_name = "Admin"
  user.last_name = "User"
  user.admin = true
end

puts "Seeding Completed Successfully!"