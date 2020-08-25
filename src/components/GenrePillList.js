import React from "react";
import GenrePill from "./GenrePill";
import { css } from "@emotion/core";
import PropTypes from "prop-types";

const GenrePillListStyle = css`
  font-family: overpass;
  font-size: 0.9rem;
  position: absolute;
  height: 70px;
  bottom: 35px;
  left: 20px;
  width: 38%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  // justify-items: center;
  align-items: center;
  transition: transform 0.8s ease;
`;

export default function GenrePillList({ genres, colour, addCss }) {
  const maximumGenres = genres.length > 4 ? genres.slice(3) : genres;
  return (
    <div css={[GenrePillListStyle, addCss]}>
      {maximumGenres.map((genre) => (
        <GenrePill
          colorOveride={[
            css`
              background-color: ${colour};
            `,
          ]}
          key={genre}
          text={genre}
        />
      ))}
    </div>
  );
}

GenrePillList.propTypes = {
  genres: PropTypes.array,
  colour: PropTypes.string,
};
