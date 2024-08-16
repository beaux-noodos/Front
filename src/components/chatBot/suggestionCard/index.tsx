import React from "react";
import { Card, Col, Row } from "antd";
import { getCachedUser } from "../../../utils/getCachedUser";
import { MessageOutlined } from "@ant-design/icons";

const { Meta } = Card;

const suggestionsForProjectHolder = [
  {
    title: "Suggestion for Project Holder 1",
    description: "Description for suggestion 1",
  },
  {
    title: "Suggestion for Project Holder 2",
    description: "Description for suggestion 2",
  },
  {
    title: "Suggestion for Project Holder 3",
    description: "Description for suggestion 3",
  },
  {
    title: "Suggestion for Project Holder 4",
    description: "Description for suggestion 4",
  },
];

const suggestionsForInvestor = [
  {
    title: "Suggestion for Investor 1",
    description: "Description for suggestion 1",
  },
  {
    title: "Suggestion for Investor 2",
    description: "Description for suggestion 2",
  },
  {
    title: "Suggestion for Investor 3",
    description: "Description for suggestion 3",
  },
  {
    title: "Suggestion for Investor 4",
    description: "Description for suggestion 4",
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
                <MessageOutlined
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
