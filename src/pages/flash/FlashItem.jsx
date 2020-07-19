import React, { Component } from "react";
import classnames from "classnames";

export default class FlashItem extends Component {
  onClick = () => {
    this.props.flashDel(this.props.id);
  };
  render() {
    const { type, text } = this.props;
    return (
      <div
        className={classnames("alert mt-3", {
          "alert-success": type === "success",
          "alert-danger": type === "danger",
        })}
      >
        {text}
        <button onClick={this.onClick} className="close">
          &times;
        </button>
      </div>
    );
  }
}
