import styled from "styled-components";
import {useState, useEffect} from "react";
import Link from "next/link";
import {StyledContainer} from "../components/StyledContainer";
import {StyledButton} from "../components/StyledButton";
import {useSession, signIn, signOut} from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  const [fishData, setFishData] = useState([]);

  useEffect(() => {
    const loadFishData = async () => {
      try {
        const response = await fetch("/api/fish");
        if (!response.ok) {
          throw new Error(
            `Response failed with status code ${response.status}`
          );
        }
        const data = await response.json();
        setFishData(data);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };
    loadFishData();
  }, []);

  return (
    <StyledContainer>
      <StyledSection>
        {session ? (
          <>
            <StyledButton onClick={signOut}>Logout</StyledButton>
            <p>Signed in as {session.user.email}</p>
          </>
        ) : (
          <StyledButton
            onClick={() => {
              signIn("github");
            }}
          >
            Login
          </StyledButton>
        )}
      </StyledSection>
      <StyledList>
        {fishData.map(fish => {
          return (
            <li key={fish.id}>
              <StyledLink href={`/fish/${fish.id}`}>{fish.name}</StyledLink>
            </li>
          );
        })}
      </StyledList>
    </StyledContainer>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;

  &:link,
  &:visited {
    color: #edf2f4;
  }
  &:hover {
    color: darkgoldenrod;
  }
  &:active {
    color: #edf2f4;
  }
`;

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 20px 0;
  padding: 0;
  li:before {
    content: "🐟";
    margin-right: 10px;
  }
`;
