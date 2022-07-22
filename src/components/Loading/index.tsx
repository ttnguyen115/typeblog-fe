import styled from "styled-components";

function Loading() {
  return (
    <LoadingContainer className="loading">
      <SVG width="205" height="250" viewBox="0 0 40 50" fill="none">
        <Polygon stroke="#fff" strokeWidth="1" fill="none" points="20,1 40,40 1,40" />
        <text fill="#fff" x="5" y="47">Loading</text>
      </SVG>
    </LoadingContainer>
  )
}

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  display: grid;
  place-items: center;
  background: #000;
  opacity: 0.7;
  color: #fff;
  top: 0;
  left: 0;
  z-index: 99;
`;

const SVG = styled.svg`
  font-size: 5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  animation: text 1s ease-in-out infinite;

  @keyframes text {
    50% { opacity: 0.1; }
  }
`;

const Polygon = styled.polygon`
  stroke-dasharray: 22;
  stroke-dashoffset: 1;
  animation: dash 4s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite alternate-reverse;

  @keyframes dash {
    to { stroke-dashoffset: 234; }
  }
`;

export default Loading