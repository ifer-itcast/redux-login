import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import FlashItem from "./FlashItem";
import { flashDel } from './store/actionCreators'

class Flash extends Component {
  render() {
    return <Fragment>
      {
        this.props.flash.map(item => {
          return <FlashItem {...item} key={item.id} flashDel={this.props.flashDel}/>;
        })
      }
    </Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    flash: state.flash
  };
};
const mapDispatchToProps = dispatch => {
  return {
    flashDel: (id) => {
      dispatch(flashDel(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Flash);