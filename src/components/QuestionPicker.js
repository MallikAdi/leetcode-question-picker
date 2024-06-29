import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchQuestions } from "../services/notion";

const Card = styled.div`
  width: 400px;
  padding: 20px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff1;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Info = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const Link = styled.a`
  color: #0073e6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #0073e6;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #005bb5;
  }
`;

const QuestionPicker = () => {
  const [questions, setQuestions] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState(null);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const questionsData = await fetchQuestions();
        setQuestions(questionsData);

        if (questionsData.length > 0) {
          const randomIndex = Math.floor(Math.random() * questionsData.length);
          setRandomQuestion(questionsData[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    getQuestions();
  }, []);

  const handleNextQuestion = () => {
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setRandomQuestion(questions[randomIndex]);
    }
  };

  if (!randomQuestion) {
    return <div>Loading...</div>;
  }

  const { properties } = randomQuestion;

  const getName = () => {
    if (properties?.Name?.title?.length > 0) {
      return properties.Name.title[0].plain_text;
    }
    return "No name available";
  };

  const getStatus = () => {
    if (properties?.Status?.status) {
      return properties.Status.status.name;
    }
    return "No status available";
  };

  const getCategory = () => {
    if (properties?.Category?.multi_select?.length > 0) {
      return properties.Category.multi_select
        .map((select) => select.name)
        .join(", ");
    }
    return "No category available";
  };

  const getDifficulty = () => {
    if (properties?.Difficulty?.select) {
      return properties.Difficulty.select.name;
    }
    return "No difficulty available";
  };

  const getMainIdea = () => {
    if (properties?.["Main idea"]?.rich_text?.length > 0) {
      return properties["Main idea"].rich_text
        .map((text) => text.plain_text)
        .join(" ");
    }
    return "No main idea available";
  };

  const getQuestionUrl = () => {
    if (properties?.Question?.url) {
      return properties.Question.url;
    }
    return "No URL available";
  };

  return (
    <Card>
      <Title>{getName()}</Title>
      <Info>
        <strong>Status:</strong> {getStatus()}
      </Info>
      <Info>
        <strong>Category:</strong> {getCategory()}
      </Info>
      <Info>
        <strong>Difficulty:</strong> {getDifficulty()}
      </Info>
      <Info>
        <strong>Main Idea:</strong> {getMainIdea()}
      </Info>
      <Info>
        <strong>Question URL:</strong>{" "}
        <Link href={getQuestionUrl()} target="_blank" rel="noopener noreferrer">
          {getQuestionUrl()}
        </Link>
      </Info>
      <Button onClick={handleNextQuestion}>Next Question</Button>
    </Card>
  );
};

export default QuestionPicker;
