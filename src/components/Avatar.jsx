import classNames from "classnames";
import React from "react";
import Spinner from "./Spinner";

const Avatar = (props) => {
  const size = props.size;
  const sm = size === "sm";
  const md = size === "md" || !size;
  const lg = size === "lg";
  const xl = size === "xl";

  const classes = classNames(
    props.className,
    { "w-10 h-10": sm },
    { "w-24 h-24": md },
    { "w-28 h-28 md:w-36 md:h-36": lg },
    { "w-48 h-48": xl },
    "m-0 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white"
  );

  return (
    <div className={classes}>
      {props.loading ? (
        <Spinner />
      ) : (
        <img alt="avatar" src={props.src} className="rounded-full w-full" />
      )}
    </div>
  );
};

export default Avatar;
