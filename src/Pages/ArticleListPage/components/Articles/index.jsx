import React, { useEffect, useMemo, useState } from "react";
import ArticleBlock from "../ArticleBlock";
import { Divider, Skeleton, Space } from "antd";
import "./Articles.scss";

function Articles(props) {
  const [loading, setLoading] = useState(false);
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const articleListData = [
        {
          articleUId: "1",
          articleImage:
            "https://learnvue.co/wp-content/uploads/2020/09/Screen-Shot-2020-09-22-at-2.22.57-PM-730x375.png",
          articleTitle: "Setting Up Your First Vue3 Project – Vue 3.0 Release",
          articleCreatedDate: "september 22, 2020",
          articleCategories: ["ESSENTIALS", "TUTORIALS"],
          articleSummary:
            "One of the new features of Vue3 is the concept of Portals In Vue3, there is native support for Portals using the Teleport feature."
        },
        {
          articleUId: "2",
          articleImage:
            "https://learnvue.co/wp-content/uploads/2020/09/20200901-GithubPages-730x375.jpg",
          articleTitle: "How To Deploy Your Vue App to Github Pages",
          articleCreatedDate: "SEPTEMBER 1, 2020",
          articleCategories: ["advanced tuips", "TUTORIALS"],
          articleSummary:
            "GitHub Pages is a great free option to deploy your Vue application. It's a static site hosting service that takes files straight from a repository on GitHub."
        },
        {
          articleUId: "3",
          articleImage:
            "https://learnvue.co/wp-content/uploads/2020/09/202000903_Portals-730x375.jpg",
          articleTitle:
            "An Introduction to Vue Teleport – A New Feature in Vue3",
          articleCreatedDate: "SEPTEMBER 3, 2020",
          articleCategories: ["advanced tuips", "TUTORIALS"],
          articleSummary:
            "One of the new features of Vue3 is the concept of Portals In Vue3, there is native support for Portals using the Teleport feature."
        },
        {
          articleUId: "4",
          articleImage:
            "https://learnvue.co/wp-content/uploads/2020/08/20200831-10PostScreenshot-730x375.png",
          articleTitle:
            "A Quick Vue3 Infinite Scrolling Component – Daily Vue Tips #4",
          articleCreatedDate: "SEPTEMBER 1, 2020",
          articleCategories: ["advanced tuips", "TUTORIALS"],
          articleSummary:
            "An infinite scrolling component is when content is loaded continuously as someone scrolls down your web app. Learn how to build one in Vue3!"
        }
      ];
      setArticleList(articleListData);
    }, 2000);
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
      const articles = articleList.map((item) => {
        return (
          <React.Fragment key={item.articleUId}>
            <ArticleBlock {...item}></ArticleBlock>
            <Divider style={{ borderTop: "1px solid #cacaca" }}></Divider>
          </React.Fragment>
        );
      });
      return articles;
    }
  }, [loading, articleList]);
  return <React.Fragment>{child}</React.Fragment>;
}

export default Articles;
