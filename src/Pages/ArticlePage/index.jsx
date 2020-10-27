import React from "react";
import { Divider } from "antd";
import { useState, useEffect, useMemo } from "react";
import { get } from "../../utils/services";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LeftOutlined } from "@ant-design/icons";

import "./ArticlePage.scss";

function Article({ match }) {
  const [data, setData] = useState({});
  useEffect(() => {
    const url = `/data/articles/article-${match.params.id}.json`;
    async function fetchAPI() {
      const { status, data } = await get(url);
      if (status === 200) {
        console.log(data.result);
        setData(data.results);
      }
    }
    fetchAPI();
  }, [match.params.id]);
  const render = useMemo(() => {
    if (Object.keys(data).length > 0 && data.constructor === Object) {
      return (
        <React.Fragment>
          <div className="article-header">
            <div className="back d-flex align-center">
              <LeftOutlined className="icon-back" />
              <span className="uppercase w-500 pointer back-text">
                back to all posts
              </span>
            </div>
            <div className="article-title title">{data.articleTitle}</div>
          </div>
          <Divider></Divider>
          <div className="article-info">
            <span className="uppercase article-categories">
              {data.articleCategories.reduce((result, item) => {
                return (result += `, ${item}`);
              })}
            </span>
            <span className="uppercase">{data.articleCreatedDate}</span>
          </div>
          <Divider></Divider>
          <div className="article-content">
            <LazyLoadImage
              src={data.articleImage}
              alt="articleImage"
            ></LazyLoadImage>
            <div
              className="content-wapper"
              dangerouslySetInnerHTML={{ __html: data.articleContent }}
            ></div>
          </div>
        </React.Fragment>
      );
    } else {
      return "";
    }
  }, [data]);
  return <div className="article-page__wrapper">{render}</div>;
}

export default Article;
