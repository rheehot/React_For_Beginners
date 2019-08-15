import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Ratings from "react-ratings-declarative";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0px 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/w300${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            {result.release_date
              ? result.release_date.substring(0, 4)
              : result.first_air_date.substring(0, 4)}
            <Divider>•</Divider>
            {result.runtime ? result.runtime : result.episode_run_time} min
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genres, index) =>
                  index === result.genres.length - 1
                    ? genres.name
                    : `${genres.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            {result.vote_average && parseFloat(result.vote_average) / 2 > 0 ? (
              <Item>
                <Ratings rating={parseFloat(result.vote_average) / 2}>
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                  <Ratings.Widget
                    widgetRatedColor="rgb(255,215,0)"
                    widgetDimension="15px"
                    widgetSpacing="0px"
                  />
                </Ratings>
              </Item>
            ) : (
              "No Data"
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
