import React, { Component } from 'react';

class Log extends Component {
  // componentDidMount() {
  //   this.props.fetchData();
  // }

  render() {
    // if (this.props.hasError) {
    //   return <p>Sorry! There was an error loading the items</p>;
    // }
    // if (this.props.isLoading) {
    //   return <p>Loading…</p>;
    // }

    return (
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>User ID</th>
            <th>Category</th>
            <th>Activity</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {/*{this.props.logs.map((item, index) => (*/}
          {/*<tr key={item.id}>*/}
          {/*<td>{index + 1}</td>*/}
          {/*<td>{item.username}</td>*/}
          {/*<td>{item.category}</td>*/}
          {/*<td>{item.activity}</td>*/}
          {/*<td>{item.value}</td>*/}
          {/*</tr>*/}
          {/*))}*/}
        </tbody>
      </table>
    );
  }
}

export default Log;
