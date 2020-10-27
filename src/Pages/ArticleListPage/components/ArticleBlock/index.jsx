import React from "react";
import PropTypes from "prop-types";
import { ArrowRightOutlined } from "@ant-design/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./ArticleBlock.scss";

HomeArticle.propTypes = {
  articleImage: PropTypes.string,
  articleTitle: PropTypes.string,
  articleCreatedDate: PropTypes.string,
  articleCategories: PropTypes.array,
  articleSummary: PropTypes.string
};

HomeArticle.defaultProps = {};

function HomeArticle({
  articleImage,
  articleTitle,
  articleCreatedDate,
  articleCategories,
  articleSummary
}) {
  return (
    <React.Fragment>
      <div className="home-article">
        <div className="article-image flex-center">
          <LazyLoadImage
            src={articleImage}
            alt="articleImage"
            style={{ borderRadius: "10px", margin: "20px 0" }}
            loading="lazy"
          />
        </div>
        <div className="article-title pointer">{articleTitle}</div>
        <div className="article-info">
          <span className="article-created-date">{articleCreatedDate}</span>
          <span className="article-categories">
            {articleCategories.reduce((result, item) => {
              return (result += `, ${item}`);
            })}
          </span>
        </div>
        <div className="article-summarry">{articleSummary}</div>
        <div className="article-footer pointer">
          <span style={{ paddingRight: "0.5rem" }}>continue reading</span>
          <ArrowRightOutlined />
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(HomeArticle);
