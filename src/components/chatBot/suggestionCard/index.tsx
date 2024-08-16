import React from "react";
import { Card, Col, Row } from "antd";
import { getCachedUser } from "../../../utils/getCachedUser";
import { StarFilled } from "@ant-design/icons";

const { Meta } = Card;

const suggestionsForProjectHolder = [
  {
    title: "Irrigation Efficace",
    description: "Économisez l'eau avec l'irrigation goutte-à-goutte.",
  },
  {
    title: "Fertilisation Précise",
    description: "Appliquez les engrais selon les besoins.",
  },
  {
    title: "Réduction des Émissions",
    description: "Minimisez les gaz à effet de serre.",
  },
  {
    title: "Conservation des Sols",
    description: "Protégez les sols et soutenez la biodiversité.",
  },
];

const suggestionsForInvestor = [
    {
      title: "Projet d'Agriculture Connectée",
      description: "Optimisez l'irrigation et la gestion des cultures.",
    },
    {
      title: "Technologie de Surveillance Environnementale",
      description: "Réduisez l'impact environnemental.",
    },
    {
      title: "Développement de Bioénergie",
      description: "Transformez les déchets organiques en énergie.",
    },
    {
      title: "Agriculture Durable",
      description: "Soutenez la conservation des sols et la biodiversité.",
    },
  ];
  

interface SuggestionCardProps {
  onSelectSuggestion: (title: string) => void;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  onSelectSuggestion,
}) => {
  const { role } = getCachedUser();
  console.log(role);

  let suggestions: any[];
  switch (role) {
    case "MANAGER":
      suggestions = suggestionsForProjectHolder;
      break;
    case "INVESTISOR":
      suggestions = suggestionsForInvestor;
      break;
    default:
      suggestions = [];
      break;
  }

  return (
    <Row gutter={[16, 16]}>
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <Col span={12} key={index}>
            <Card
              style={{
                width: "100%",
                height: "150px",
                borderRadius: "8px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                position: "relative",
              }}
              bodyStyle={{ padding: "16px" }}
              hoverable
              onClick={() => onSelectSuggestion(suggestion.title)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "scale(1.05)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 4px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  padding: "4px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  zIndex: 1,
                }}
              >
                <StarFilled
                  style={{
                    fontSize: "16px",
                    color: "#fadb14",
                    background: "none", // Ensure the background is transparent
                    borderRadius: "50%", // Optional: makes the icon appear more circular
                    padding: "4px",
                  }}
                />
              </div>
              <Meta
                title={suggestion.title}
                description={suggestion.description}
              />
            </Card>
          </Col>
        ))
      ) : (
        <Col span={24}>
          <Card
            style={{
              height: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No suggestions available for your role.
          </Card>
        </Col>
      )}
    </Row>
  );
};
