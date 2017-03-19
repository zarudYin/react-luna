import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

import './Home.less';
import request, { BASE_URL } from '../../utils/request';

const LIST_URL = `${BASE_URL}/topics`;

@inject((store) => {
  return {
    user: store.user
  }
})
@observer
class Home extends Component {
  @observable list = [];

  render() {
    console.log('Home render');
    return (
      <div className="list-wrap">
        {
          this.list.map(item => <ListItem key={item.id} data={item} />)
        }
        <div onClick={this.add} style={{ cursor: 'pointer' }}>加一行</div>
      </div>
    );
  }

  add = () => {
    this.list.push({
      author: {
        avatar_url: this.props.user.head
      },
      title: 'cheng gong de tian jia le yi ge',
      id: Date.now()
    });
  }

  componentDidMount() {
    this.getHomeList();
  }

  async getHomeList() {
    await request({
      url: LIST_URL,
      noToken: true,
      data: {
        page: 1,
        tab: '',
        limit: 2,
      }
    }).then((data) => {
      this.list = this.list.concat(data.data.data);
    })
  }
}

@observer
class ListItem extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="list-item">
        <img src={data.author.avatar_url} />
        {this.props.data.title}
      </div>
    )
  }
}

export default Home;
