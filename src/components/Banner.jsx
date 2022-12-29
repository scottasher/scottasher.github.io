import React from "react";

const Banner = (props) => {
  const bannerImg = props.imageClass
    ? props.imageClass
    : "bg-[url(" + props.image + ")]";
  const bannerImgClasses = `${bannerImg} dark:bg-nature-dark bg-cover object-cover bg-center h-[20rem] md:h-[27rem] lg:h-[35rem] w-full`;

  return (
    <section className="relative">
      <div className={bannerImgClasses} />
      {props.children && (
        <div className="absolute flex flex-col items-center w-full p-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          {props.children}
        </div>
      )}
    </section>
  );
};

export default Banner;
