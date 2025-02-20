import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled components remain unchanged
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// Other styled components remain the same...
const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: rgba(26, 143, 227, 1);
  margin-bottom: 20px;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
`;

const SideContent = styled.div`
  @media (max-width: 900px) {
    order: -1;
  }
`;

const DiseaseHeader = styled.div`
  margin-bottom: 30px;
`;

const DiseaseTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const ScientificName = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  color: #666;
  margin-bottom: 20px;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background-color: ${props => props.type === 'severity' ? '#ffecb3' : '#e3f2fd'};
  color: ${props => props.type === 'severity' ? '#ff9800' : '#2196f3'};
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
`;

const Description = styled.div`
  line-height: 1.7;
  color: #444;
  margin-bottom: 30px;
  
  p {
    margin-bottom: 15px;
  }
`;

const KeyFactsCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 25px;
  margin-bottom: 30px;
`;

const FactList = styled.ul`
  padding-left: 20px;
  
  li {
    margin-bottom: 15px;
    color: #555;
  }
`;

const StatsCard = styled.div`
  background: rgba(26, 143, 227, 0.04);
  border: 1px solid rgba(26, 143, 227, 0.2);
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: rgba(26, 143, 227, 1);
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #777;
`;

const AffectedAreasSection = styled.div`
  margin-top: 40px;
`;

const AreasList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const AreaCard = styled(Link)`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  }
`;

const AreaName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #333;
`;

const AreaStats = styled.div`
  font-size: 0.9rem;
  color: #666;
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

const ActionLink = styled(Link)`
  display: block;
  background: ${props => props.primary ? 'rgba(26, 143, 227, 1)' : '#4caf50'};
  color: white;
  text-align: center;
  padding: 12px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: ${props => props.marginBottom ? '20px' : '0'};
`;

function DiseaseDetailPage() {
  const { id } = useParams();
  const [disease, setDisease] = useState(null);
  const [affectedAreas, setAffectedAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiseaseDetails = async () => {
      try {
        setLoading(true);
        const [diseaseResponse, areasResponse] = await Promise.all([
          axios.get(`http://localhost:3001/diseases/${id}`),
          axios.get(`http://localhost:3001/diseases/${id}/affected_areas`)
        ]);
        
        setDisease(diseaseResponse.data);
        setAffectedAreas(areasResponse.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching disease details:", err);
        setError('Failed to load disease details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDiseaseDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <div>Loading disease details...</div>
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <BackLink to="/disease-list">&larr; Back to Diseases</BackLink>
        <ErrorContainer>{error}</ErrorContainer>
      </PageContainer>
    );
  }

  if (!disease) {
    return (
      <PageContainer>
        <BackLink to="/disease-list">&larr; Back to Diseases</BackLink>
        <ErrorContainer>Disease not found</ErrorContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackLink to="/disease-list">&larr; Back to Diseases</BackLink>
      
      <ContentContainer>
        <MainContent>
          <DiseaseHeader>
            <DiseaseTitle>{disease.name}</DiseaseTitle>
            {disease.scientific_name && (
              <ScientificName>{disease.scientific_name}</ScientificName>
            )}
            
            <TagsContainer>
              <Tag type="severity">{disease.severity || 'Moderate'} Severity</Tag>
              <Tag>{disease.transmission_mode || 'Unknown transmission'}</Tag>
              {disease.vaccine_available && <Tag>Vaccine Available</Tag>}
            </TagsContainer>
          </DiseaseHeader>
          
          <Description dangerouslySetInnerHTML={{ __html: disease.description }} />
          
          <SectionTitle>Symptoms</SectionTitle>
          <Description dangerouslySetInnerHTML={{ __html: disease.symptoms }} />
          
          <SectionTitle>Prevention</SectionTitle>
          <Description dangerouslySetInnerHTML={{ __html: disease.prevention }} />
          
          <AffectedAreasSection>
            <SectionTitle>Most Affected Areas</SectionTitle>
            
            {affectedAreas.length === 0 ? (
              <p>No affected areas data available.</p>
            ) : (
              <AreasList>
                {affectedAreas.map(area => (
                  <AreaCard key={area.id} to={`/area/${area.id}`}>
                    <AreaName>{area.name}</AreaName>
                    <AreaStats>
                      <div>{area.cases_count?.toLocaleString() || 0} cases reported</div>
                      <div>{area.mortality_rate || 0}% mortality rate</div>
                    </AreaStats>
                  </AreaCard>
                ))}
              </AreasList>
            )}
          </AffectedAreasSection>
        </MainContent>
        
        <SideContent>
          <KeyFactsCard>
            <SectionTitle>Key Facts</SectionTitle>
            <FactList>
              <li><strong>Type:</strong> {disease.type || 'Not specified'}</li>
              <li><strong>Incubation Period:</strong> {disease.incubation_period || 'Unknown'}</li>
              <li><strong>Transmission:</strong> {disease.transmission_mode || 'Unknown'}</li>
              <li><strong>Treatment:</strong> {disease.treatment_available ? 'Available' : 'Limited or unavailable'}</li>
              <li><strong>Vaccine:</strong> {disease.vaccine_available ? 'Available' : 'In development or unavailable'}</li>
            </FactList>
          </KeyFactsCard>
          
          <StatsCard>
            <SectionTitle>Global Impact</SectionTitle>
            <StatGrid>
              <StatItem>
                <StatValue>{disease.total_cases?.toLocaleString() || 'N/A'}</StatValue>
                <StatLabel>Total Cases</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{disease.annual_deaths?.toLocaleString() || 'N/A'}</StatValue>
                <StatLabel>Annual Deaths</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{disease.affected_countries || 'N/A'}</StatValue>
                <StatLabel>Countries Affected</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{disease.mortality_rate || 'N/A'}%</StatValue>
                <StatLabel>Mortality Rate</StatLabel>
              </StatItem>
            </StatGrid>
          </StatsCard>
          
          <ActionLink 
            to={`/map-view?disease=${id}`} 
            primary 
            marginBottom
          >
            View on Global Map
          </ActionLink>
          
          <ActionLink to="/donate">
            Donate to Help Fight {disease.name}
          </ActionLink>
        </SideContent>
      </ContentContainer>
    </PageContainer>
  );
}

export default DiseaseDetailPage;