import React, { Component } from "react";
import ReactTableHelper from "../../class/ReactTable";
import MLDesign from '../../class/MLDesign';
import Styles from '../../class/MLDesign/styles';

const ReactTable = ReactTableHelper.getComponent();
const { Paper, Grid } = MLDesign.getComponent();
const withStyles = MLDesign.getWithStyles();
const styles = Styles.getStyles();

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

class SimpleTable extends Component {
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <ReactTable data={data} columns={columns} />
            </Paper>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </div>
    );
  }
}

const TableWithStyle = withStyles(styles)(SimpleTable);
export default TableWithStyle;
