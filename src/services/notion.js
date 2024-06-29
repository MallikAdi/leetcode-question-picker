import axios from "axios";

const corsProxy = "https://cors-anywhere.herokuapp.com/";
const notionApiToken = process.env.REACT_APP_NOTION_API_TOKEN;

const headers = {
  Authorization: `Bearer ${notionApiToken}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};

const fetchTableData = async (databaseId) => {
  try {
    const response = await axios.post(
      `${corsProxy}https://api.notion.com/v1/databases/${databaseId}/query`,
      {},
      { headers }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching table data:", error);
    throw error;
  }
};

export const fetchQuestions = async () => {
  try {
    /* const blind75 = await fetchTableData(
      process.env.REACT_APP_NOTION_BLIND75_DATABASE_ID
    ); */
    const neetcode = await fetchTableData(
      process.env.REACT_APP_NOTION_NEETCODE_DATABASE_ID
    );
    const striver = await fetchTableData(
      process.env.REACT_APP_NOTION_STRIVER_DATABASE_ID
    );
    const lcdaily = await fetchTableData(
      process.env.REACT_APP_NOTION_LCDAILY_DATABASE_ID
    );

    return [...neetcode, ...striver, ...lcdaily];
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
