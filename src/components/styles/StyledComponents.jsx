import { Skeleton, keyframes, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor, matBlack, white } from "../../constants/color";

const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "react(0 0 0 0)",
  height: 0,
  margin: -1,
  overflow: "hidden",
  Padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  widht: 1,
});

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const InputBox = styled("input")({
  width: "100%",
  border: "none",
  outline: "none",
  padding: "0 3rem",
  borderRadius: "1.5rem",
  backgroundColor: `${grayColor}`,
});

const SearchField = styled("input")`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: ${grayColor};
  font-size: 1.1rem;
`;

const CurveButtom = styled("button")`
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  border: none;
  ouline: none;
  cursor: pointer;
  background-color: ${matBlack};
  color: ${white};
  font-size: 1.1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const bounceAnimation = keyframes`
  0% {transform: scale(1);}
  50% {transform: scale(1.5);}
  100%{transform: scale(1);}
`

const BouncingSkeleton = styled(Skeleton)(() => ({
    animation: `${bounceAnimation} 1s infinite`
}))

export {
    VisuallyHiddenInput,
    Link,
    InputBox,
    SearchField,
    CurveButtom,
    BouncingSkeleton,
}