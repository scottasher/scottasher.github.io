import classNames from "classnames";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useOutsideClick from "../hooks/useOutsideClick";

const Dropdown = (props) => {
  const navigate = useNavigate();
  const ref = useRef();
  const [visible, setVisible] = useState(props.visible || false);
  const [active, setActive] = useState(props.active || 0);

  useOutsideClick(ref, () => {
    if (visible) setVisible(false);
  });

  function handleClick(item, i) {
    props.active && setActive(i);
    item.onClick ? item.onClick(item) : navigate(item.path);
  }

  function renderData(data) {
    if (props.visible ? !props.visible : !visible) return;

    const dataWrapperClasses = classNames(
      "z-50 mt-1 mb-4",
      "rounded shadow-lg bg-white",
      "ring-1 ring-black ring-opacity-5 focus:outline-none",
      {
        "origin-top-right right-0": props.align === "right" || !props.align,
      },
      { "origin-top-left left-0": props.align === "left" },
      {
        absolute: !props.isMobile,
        fixed: props.isMobile,
      },
      props.wrapperClassName
    );
    return (
      <div
        className={dataWrapperClasses}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        {Array.isArray(data) ? (
          <div className="py-1 w-56" role="none">
            {data.map((item, i) => {
              const title = item.title || item.label;
              const isActive = active === i;
              const itemClasses = classNames(
                "flex flex-row items-center block px-3.5 py-2 text-sm",
                { "border-t": item.section },
                {
                  "text-gray-400 cursor-not-allowed": item.disabled,
                },
                {
                  "text-gray-700 hover:bg-gray-100 cursor-pointer":
                    !item.disabled,
                }
              );
              return (
                <div
                  key={i}
                  className={itemClasses}
                  tabIndex="-1"
                  id={`menu-item-${i}`}
                  onClick={item.disabled ? null : () => handleClick(item)}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  {typeof title === "function"
                    ? title({ item, active: isActive })
                    : title}
                </div>
              );
            })}
          </div>
        ) : (
          data
        )}
      </div>
    );
  }

  const wrapperClasses = classNames(
    "relative h-full w-full inline-block text-left",
    props.className
  );

  function toggleOpen() {
    !props.disabled && setVisible(props.closeOnClick ? !visible : true);
  }

  return (
    <div ref={ref} onClick={toggleOpen} className={wrapperClasses}>
      {props.trigger}
      {!props.disabled && renderData(props.data)}
    </div>
  );
};

export default Dropdown;
