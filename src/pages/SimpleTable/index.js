import React, { Component } from "react";
import ReactTableHelper from "../../class/ReactTable";

const ReactTable = ReactTableHelper.getComponent();

const data = [
  {
    name: "Tanner Linsley",
    age: 26,
    friend: {
      name: "Jason Maurer",
      age: 23
    }
  }
];

const columns = [
  {
    Header: "Name",
    accessor: "name" // String-based value accessors!
  },
  {
    Header: "Age",
    accessor: "age",
    Cell: props => <span className="number">{props.value}</span> // Custom cell components!
  },
  {
    id: "friendName", // Required because our accessor is not a string
    Header: "Friend Name",
    accessor: d => d.friend.name // Custom value accessors!
  },
  {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: "friend.age"
  }
];

export default class SimpleTable extends Component {
  render() {
    return (
      <div>
        <ReactTable data={data} columns={columns} />
      </div>
    );
  }
}
