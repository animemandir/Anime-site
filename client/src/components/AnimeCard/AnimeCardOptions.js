import React, { useState, useContext } from "react";
import { AiFillHeart } from "react-icons/ai";
import { IoMdImages, IoIosInformationCircle } from "react-icons/io";
import { RiHeartAddLine } from "react-icons/ri";
import { css } from "@emotion/core";
import { AnimeCardContext } from "./AnimeCard";
import { BiDirections } from "react-icons/bi";
import getAdditionalAnimeInfo from "../../utils/getAdditionalAnimeInfo";

const expandTitleStyles = css`
  width: 100%;
  min-height: 100%;
  min-width: 100%;
  max-width: 100%;
  max-height: 100%;
  background-color: #f9f9f9;
  margin: 0;
  top: 0;
  right: 0;
`;

const additionalInfoStyles = css`
  transform: rotateY(180deg);
`;

export default function AnimeCardOptions() {
  const {
    id,
    additionalInfoVisibleState,
    setAdditionalInfoVisibleState,
    setOpenDiscussionStyles,
    setGalleryPageVisibleState,
    setRecommendationsPageVisibleState,
    galleryPageVisibleState,
    recommendationsPageVisibleState,
  } = useContext(AnimeCardContext);

  const [addedTocollection, setAddedTocollection] = useState(false);
  setOpenDiscussionStyles;
  return (
    <div
      css={css`
        position: absolute;
        right: 0;
        margin: 20px;
        display: grid;
        grid-gap: 20px;
        place-items: center;
        grid-auto-flow: column;
        cursor: pointer;
        z-index: 3;
        & > * {
          width: 20px;
          height: 20px;
        }
      `}
    >
      {/* Show us information about the anime */}
      <IoIosInformationCircle
        onClick={() => {
          if (!recommendationsPageVisibleState && !galleryPageVisibleState) {
            //open this thing
            setOpenDiscussionStyles((state) => {
              return Object.keys(state).length === 0 ? expandTitleStyles : {};
            });
          }

          //Enable or disable the additional info view
          //Triggers request to server to get gallery info
          setAdditionalInfoVisibleState((state) => {
            //Make sure the others are closed
            setGalleryPageVisibleState(false);
            setRecommendationsPageVisibleState(false);
            return !state;
          });
        }}
      />
      <IoMdImages
        onClick={() => {
          //If the review pages are closed, open the expansion
          if (!recommendationsPageVisibleState && !additionalInfoVisibleState) {
            //open this thing
            setOpenDiscussionStyles((state) => {
              return Object.keys(state).length === 0 ? expandTitleStyles : {};
            });
          }
          //Enable or disable the gallery view
          //Triggers request to server to get gallery info
          setGalleryPageVisibleState((state) => {
            //Make sure the other options are closed
            setRecommendationsPageVisibleState(false);
            setAdditionalInfoVisibleState(false);
            return !state;
          });
        }}
      />
      <BiDirections
        onClick={() => {
          if (!galleryPageVisibleState && !additionalInfoVisibleState) {
            //open this thing
            setOpenDiscussionStyles((state) => {
              return Object.keys(state).length === 0 ? expandTitleStyles : {};
            });
          }
          //Enable or disable the reviews
          //Triggers request to server to get recommendations info

          setRecommendationsPageVisibleState((state) => {
            //Make sure the other options are closed
            setGalleryPageVisibleState(false);
            setAdditionalInfoVisibleState(false);

            return !state;
          });
        }}
      />
      {addedTocollection ? (
        <AiFillHeart
          onClick={() => {
            setAddedTocollection((state) => !state);
          }}
        />
      ) : (
        <RiHeartAddLine
          onClick={() => {
            setAddedTocollection((state) => !state);
          }}
        />
      )}
    </div>
  );
}