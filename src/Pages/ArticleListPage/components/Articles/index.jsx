import React, { useEffect, useMemo, useState } from "react";
import HomeArticle from "../ArticleBlock";
import { Divider, Skeleton, Space } from "antd";
import { get } from "../../../../utils/services";

import "./Articles.scss";

function Articles(props) {
  const [loading, setLoading] = useState(false);
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function fetchAPI(url) {
      try {
        const { status, data } = await get(url);
        if (status === 200) {
          setArticleList(data.results);
        }
      } catch (err) {
        console.log('fetchAPI >>>>>>>>>', err);
        setArticleList([]);
      }
      setLoading(false);
    }
    const url = "/data/article-list.json";
    fetchAPI(url);
  }, []);

  const child = useMemo(() => {
    if (loading) {
      const skeleton = Array(4)
        .fill()
        .map((item, index) => (
          <Space className="article-skeleton" key={index}>
            <Skeleton.Input
              active
              style={{ width: "80%" }}
              size="small"
              className="article-skeleton__child"
            />
            <Skeleton.Input
              active
              style={{ width: "40%" }}
              size="small"
              className="article-skeleton__child"
            />
            <Skeleton.Input
              active
              style={{ width: "100%" }}
              size="small"
              className="article-skeleton__child"
            />
            <Skeleton.Input
              active
              style={{ width: "100%" }}
              size="small"
              className="article-skeleton__child"
            />
          </Space>
        ));
      return skeleton;
    } else {
      if (articleList.length > 0) {
        const articles = articleList.map((item) => {
          return (
            <React.Fragment key={item.articleUId}>
              <HomeArticle {...item}></HomeArticle>
              <Divider style={{ borderTop: "1px solid #cacaca" }}></Divider>
            </React.Fragment>
          );
        });
        return articles;
      } else {
        return 'No data';
      }
    }
  }, [loading, articleList]);
  return <React.Fragment>{child}</React.Fragment>;
}

export default Articles;
