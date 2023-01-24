import classNames from "classnames";
import React, { useState, useRef, useEffect } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Spinner from "./Spinner";
import { isObject } from "lodash";

const Select = (props) => {
  const [value, setValue] = useState(props.value || "");
  const [dropOpen, setDropOpen] = useState(false);
  const [stop, setStop] = useState(false);
  const [showError, setShowError] = useState(false);
  const [options, setOptions] = useState(props.options || []);

  const ref = useRef();

  useEffect(() => {
    props.value && setValue(props.value);
    !props.value && setValue("");
  }, [props.value]);
  useEffect(() => {
    props.options && setOptions(props.options);
  }, [props.options]);

  useOutsideClick(ref, () => {
    if (dropOpen && !stop) setDropOpen(false);
    setStop(false);
  });

  const sizeLg = props.size === "lg";
  const sizeMd = props.size === "md" || !props.size;
  const sizeSm = props.size === "sm";

  const labelClasses = classNames("block mb-2", "text-sm font-medium", {
    "text-gray-900": !showError && !props.loading,
    "text-red-700": props.error && showError,
  });

  const classes = classNames(
    props.className,
    "shadow-sm",
    "block w-full",
    "border rounded",
    {
      "cursor-text": props.search,
      "p-4 sm:text-md": sizeLg,
      "p-2.5 text-sm": sizeMd,
      "p-2 sm:text-xs": sizeSm,
      "bg-gray-100 cursor-not-allowed focus:ring-gray-300": props.loading,
      "border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 cursor-default":
        !showError && !props.loading,
      "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:outline-2 focus:ring-red-500 focus:border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500":
        props.error && showError,
    }
  );
  const wrapperClasses = classNames("block", props.wrapperClasses);

  const optionClasses = classNames(
    "hover:bg-gray-100",
    { "p-4 sm:text-md": sizeLg },
    { "p-2.5 text-sm": sizeMd },
    { "px-2 py-1 sm:text-xs": sizeSm }
  );

  const iconClasses = classNames("h-4 w-4");

  const Icon = dropOpen ? ChevronUpIcon : ChevronDownIcon;

  function handleError() {
    if (props.error) {
      setTimeout(() => setShowError(true), 200);
    } else {
      setShowError(false);
    }
  }

  function handleChange(e) {
    const data = { ...e };

    // if (!props.error) setShowError(false);
    if (props.id) data.id = props.id;

    props.onChange && props.onChange(data);
    !props.onChange && setValue(e.label);
    toggleDrop();
  }

  function toggleDrop(drop) {
    // drop.preventDefault && props.preventDefault();
    if (isObject(drop) && drop.target.localName === "svg") {
      setDropOpen(true);
      setStop(true);
    }
    const isBool = typeof drop === "boolean";
    setDropOpen(isBool ? drop : !dropOpen);
  }

  function renderOptions(arr) {
    const options = arr;
    return options.map((item, i) => {
      return (
        <div
          key={i}
          className={optionClasses}
          onClick={() => handleChange(item)}
        >
          {item.body || item.label}
        </div>
      );
    });
  }

  function handleSearch(e) {
    if (!props.search) return;
    const searchValue = e.target.value;
    setValue(searchValue);

    const newOptions = props.options.filter((option) => {
      if (!searchValue) return true;
      if (option.value.includes(searchValue)) return true;
      if (option.label.includes(searchValue)) return true;
      return false;
    });
    setOptions(newOptions);
  }

  return (
    <div className={wrapperClasses}>
      {props.label && (
        <label htmlFor={props.id} className={labelClasses}>
          {props.label}
        </label>
      )}
      <div ref={ref} className="relative w-full">
        <input
          type="text"
          id={props.id}
          className={classes}
          placeholder={props.placeholder || "Select an option"}
          readOnly={!props.search}
          onClick={toggleDrop}
          value={value}
          onChange={handleSearch}
          disabled={props.loading}
          onBlur={handleError}
        />
        {props.loading ? (
          <div className="flex absolute inset-y-0 right-0 items-center px-3">
            <Spinner size="sm" />
          </div>
        ) : (
          <div
            onClick={toggleDrop}
            className="cursor-pointer flex absolute inset-y-0 right-0 items-center px-3"
          >
            <Icon id="dropSVG" onClick={toggleDrop} className={iconClasses} />
          </div>
        )}
        {dropOpen && (
          <div className="shadow rounded-b max-h-56	overflow-y-scroll text-sm mx-0.5 bg-white absolute border border-t-0 w-web-fill z-20">
            {renderOptions(options)}
          </div>
        )}
        {props.error && showError && (
          <p className="mt-2 text-sm text-red-600">{props.error}</p>
        )}
      </div>
    </div>
  );
};

export default Select;
