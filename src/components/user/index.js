import React from "react";
import { Card, WhiteSpace, WingBlank } from "antd-mobile";
import { withRouter } from "react-router-dom";

const UserCard = props => {
  const Header = Card.Header;
  const Body = Card.Body;
  const handleClick = () => {};
  return (
    <WingBlank>
      <WhiteSpace></WhiteSpace>
      {props.userList.map(v =>
        v.avatar ? (
          <Card key={v._id} onClick={() => handleClick(v)}>
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            ></Header>
            <Body>
              {v.type === "boss" ? <div>公司:{v.company}</div> : null}

              {v.desc.split("\n").map(d => (
                <div key={d}>{d}</div>
              ))}
              {v.type === "boss" ? <div>薪资:{v.money}</div> : null}
            </Body>
          </Card>
        ) : null
      )}
    </WingBlank>
  );
};
export default withRouter(UserCard);
