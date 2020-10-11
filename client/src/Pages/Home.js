import React, { useEffect, useContext, useState } from "react";
import AnimeCardsList from "../components/AnimeCardsList";
import { useLocation } from "react-router-dom";
import getSeasonData from "../utils/API/getSeasonData";
import { getSeasonBGWallpaper } from "../utils/getSeasonBGWallpaper";
import { seasonsHomePageContext } from "../App";

export default function Home() {
  const location = useLocation();

  //No season data yet. Signal to card to show placeholder
  const [animeDataReadyState, setAnimeDataReadyState] = useState(false);

  const {
    setRawSeasonData,
    setBgState,
    setSeasonData,
    rawSeasonData,
    seasonData,
    selectedYear,
  } = useContext(seasonsHomePageContext);

  useEffect(() => {
    //Page has changed so the data isn't ready yet
    setAnimeDataReadyState(false);
    //Set up a listener to get the right season and use that to call the API. Once complete change animeDataReadyState to true
    getSeasonData(selectedYear, setRawSeasonData, setAnimeDataReadyState);
    setBgState(getSeasonBGWallpaper(location));
  }, [location]);

  return (
    <>
      <AnimeCardsList
        animeDataReadyState={animeDataReadyState}
        seasonData={seasonData}
      ></AnimeCardsList>
    </>
  );
}
