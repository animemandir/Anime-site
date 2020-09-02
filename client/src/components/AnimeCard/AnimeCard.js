import React, { useState, useRef, useContext, useEffect } from "react";
import { jsx, css, keyframes } from "@emotion/core";
import GenrePillList from "../GenrePillList";
import PropTypes from "prop-types";
import AnimeImageCard from "./AnimeImageCard";
import SynopsisCard from "./SynopsisCard";

import AnimeCardOptions from "./AnimeCardOptions";
import AnimeCardTitle from "./AnimeCardTitle";
import Axios from "axios";
import RatingsBlock from "./RatingsBlock";

export const AnimeCardContext = React.createContext();

const AnimeCardStyle = css`
  max-width: 740px;
  width: 95%;
  height: 410px;
  position: relative;
  border: 1px solid #0000ff1a;
  border-radius: 10px;
  background: #f0f8ff59;
  margin-bottom: 80px;
  justify-self: center;
  overflow: hidden;
  perspective: 900px;
`;

export default function AnimeCard({ animeData }) {
  const {
    relations,
    averageScore,
    coverImage,
    description,
    genres,
    id,
    popularity,
    title,
    trailer,
  } = animeData;

  //Styles
  const [imageHoverTitleStyles, setImageHoverTitleStyles] = useState({});
  const [imageHoverSynopsisStyles, setImageHoverSynopsisStyles] = useState({});
  const [imageCardHoverStyles, setImageCardHoverStyles] = useState({});
  const [pillButtonsHoverStyles, setPillButtonsHoverStyles] = useState({});
  const [imageOverlayHoverStyles, setImageOverlayHoverStyles] = useState({});
  const [openDiscussionStyles, setOpenDiscussionStyles] = useState({});
  const [additionalInfoStyles, setAdditionalInfoStyles] = useState({});

  const [galleryPageVisibleState, setGalleryPageVisibleState] = useState(false);
  const [
    recommendationsPageVisibleState,
    setRecommendationsPageVisibleState,
  ] = useState(false);
  const [additionalInfoVisibleState, setAdditionalInfoVisibleState] = useState(
    false
  );
  const [galleryImages, setgalleryImages] = useState({});
  const [recommendationsData, setRecommendationsData] = useState([]);
  const [additionalInfoData, setAdditionalInfoData] = useState({});

  function imageCardHoverSylesChange() {
    //set new styles
    return {
      on: () => {
        setImageHoverSynopsisStyles(css`
          transform: translateX(35%);
        `);
        setImageCardHoverStyles(css`
          width: 60%;
          height: 70%;
        `);
        setImageOverlayHoverStyles(css`
          opacity: 1;
        `);
        setPillButtonsHoverStyles(css`
          transform: translateY(25%);
        `);
      },
      off: () => {
        setImageHoverSynopsisStyles({});
        setImageCardHoverStyles({});
        setImageOverlayHoverStyles({});
        setPillButtonsHoverStyles({});
      },
    };
  }
  function imageCardClickedSylesChange() {
    return {
      on: () => {
        //set new styles
        setImageHoverTitleStyles(css`
          transform: translateX(200%);
        `);
        setImageHoverSynopsisStyles(css`
          transform: translateX(150%);
        `);
        setImageCardHoverStyles(css`
          width: 100%;
          height: 100%;
          margin: 0;
        `);
        setImageOverlayHoverStyles(css`
          opacity: 1;
        `);
        setPillButtonsHoverStyles(css`
          transform: translateY(200%);
        `);
      },
      off: () => {
        //set new styles
        setImageHoverTitleStyles();
        setImageHoverSynopsisStyles();
        setImageCardHoverStyles();
        setImageOverlayHoverStyles();
        setPillButtonsHoverStyles();
      },
    };
  }

  useEffect(() => {
    //Get Anime additional info
    if (additionalInfoVisibleState)
      Axios.get(`/api/seasons/additional_info/${id}`).then((res) => {
        console.log(res.data[0]);
        setAdditionalInfoData(res.data[0]);
      });
  }, [additionalInfoVisibleState]);

  useEffect(() => {
    //Get Anime Review data
    if (recommendationsPageVisibleState)
      Axios.get(`/api/seasons/recommendations/${id}`).then((res) => {
        console.log("CARD", res.data[0].recommendations.nodes);
        setRecommendationsData(res.data[0].recommendations.nodes);
      });
  }, [recommendationsPageVisibleState]);

  useEffect(() => {
    // console.log(title.english, title.romaji);
    //Get Anime Gallery data
    //We need to use relations where we can to increase the search results
    const dataInGallery = Object.keys(galleryImages);
    if (galleryPageVisibleState && dataInGallery < 1) {
      const cleanName = (title.english || title.romaji).replace(
        /[^0-9a-zA-Z:,]+/,
        " "
      );

      Axios.get(`/api/gyfcat/anime/${cleanName}`).then((res) => {
        console.log(res.data);
        setgalleryImages(res.data);

        // setExtraTitleContent(<GalleryList>galleryImages</GalleryList>)
      });
    }
  }, [galleryPageVisibleState]);

  return (
    <AnimeCardContext.Provider
      value={{
        imageCardHoverSylesChange,
        imageCardClickedSylesChange,
        setOpenDiscussionStyles,
        setGalleryPageVisibleState,
        setRecommendationsPageVisibleState,
        setAdditionalInfoVisibleState,
        setAdditionalInfoStyles,
        additionalInfoData,
        additionalInfoVisibleState,
        recommendationsData,
        recommendationsPageVisibleState,
        galleryPageVisibleState,
        galleryImages,
        openDiscussionStyles,
        imageHoverTitleStyles,
        imageCardHoverStyles,
        imageOverlayHoverStyles,
        imageHoverSynopsisStyles,
        trailer,
        coverImage,
        description,
        title,
        id,
      }}
    >
      <div css={AnimeCardStyle}>
        <RatingsBlock averageScore={averageScore} />
        <AnimeCardOptions />
        <AnimeCardTitle />
        <AnimeImageCard />
        <SynopsisCard />
        <GenrePillList
          addCss={pillButtonsHoverStyles}
          colour={coverImage.color}
          genres={genres}
        />
      </div>
    </AnimeCardContext.Provider>
  );
}
AnimeCard.propTypes = {
  animeData: PropTypes.shape({
    averageScore: PropTypes.number,
    coverImage: PropTypes.object,
    description: PropTypes.string,
    genres: PropTypes.array,
    id: PropTypes.number,
    popularity: PropTypes.number,
    title: PropTypes.object,
  }),
};