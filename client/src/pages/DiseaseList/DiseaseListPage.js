import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 15px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const DiseaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const DiseaseCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const DiseaseImage = styled.div`
  height: 200px;
  background-image: url(${props => props.image || '/default-disease.jpg'});
  background-size: cover;
  background-position: center;
`;

const DiseaseInfo = styled.div`
  padding: 20px;
`;

const DiseaseName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const DiseaseDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Stat = styled.div`
  text-align: center;
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #777;
`;

const ViewButton = styled(Link)`
  display: block;
  background-color: rgba(26, 143, 227, 1);
  color: white;
  text-align: center;
  padding: 12px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(22, 121, 193, 1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const ErrorContainer = styled.div`
  background-color: #fdecea;
  border-left: 4px solid #e53935;
  padding: 15px;
  margin-bottom: 30px;
  color: #d32f2f;
  border-radius: 4px;
`;

function DiseaseListPage() {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get('http://localhost:3001/diseases');
        setDiseases(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load diseases. Please try again later.');
        setLoading(false);
      }
    };

    fetchDiseases();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <div>Loading diseases...</div>
        </LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>Communicable Diseases</Title>
        <Subtitle>
          Learn about the most prevalent communicable diseases affecting communities worldwide
          and find out how you can help make a difference.
        </Subtitle>
      </Header>

      {error && (
        <ErrorContainer>
          {error}
        </ErrorContainer>
      )}

      <DiseaseGrid>
        {diseases.map(disease => (
          <DiseaseCard key={disease.id}>
            <DiseaseImage image={disease.image_url} />
            <DiseaseInfo>
              <DiseaseName>{disease.name}</DiseaseName>
              <DiseaseDescription>
                {disease.description.substring(0, 120)}...
              </DiseaseDescription>
              
              <StatsContainer>
                <Stat>
                  <StatValue>{disease.cases_count?.toLocaleString() || "N/A"}</StatValue>
                  <StatLabel>Cases Reported</StatLabel>
                </Stat>
                <Stat>
                  <StatValue>{disease.affected_countries || "N/A"}</StatValue>
                  <StatLabel>Countries Affected</StatLabel>
                </Stat>
              </StatsContainer>
              
              <ViewButton to={`/diseases/${disease.id}`}>
                View Details
              </ViewButton>
            </DiseaseInfo>
          </DiseaseCard>
        ))}
      </DiseaseGrid>
    </PageContainer>
  );
}

export default DiseaseListPage;