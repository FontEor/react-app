import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      author
    }
  }
`;

export const mocks = [
  {
    request: {
      query: GET_POSTS,
    },
    result: {
      data: {
        posts: [
          {
            id: "1",
            title: "GraphQL Intro",
            author: "Alice",
          },
          {
            id: "2",
            title: "Advanced GraphQL",
            author: "Bob",
          },
        ],
      },
    },
  },
];
