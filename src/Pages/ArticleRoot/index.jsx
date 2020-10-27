import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Row, Col } from "antd";
import Article from "../ArticlePage";
import ArticleList from "../ArticleListPage";
import ArticleSideBar from "../ArticleListPage/components/SideBar";

function Articles() {
  return (
    <div className="article-page__wrapper">
      <Row gutter={16}>
        <Col className="gutter-row" span={18}>
          <Switch>
            <Route exact path="/articles" component={ArticleList} />
            <Route path="/articles/:id" component={Article} />
          </Switch>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <ArticleSideBar></ArticleSideBar>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Articles;
