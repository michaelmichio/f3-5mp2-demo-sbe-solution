import Image from "next/image";

type BackgroundType = "image" | "video" | null;
type ContainerSize = "default" | "wide" | "full";
type SectionHeight = "default" | "full";
type VerticalAlign = "default" | "start" | "center" | "end" | "stretch";

interface SectionWrapperProps {
  id: string;
  dataHeaderTheme?: "light" | "dark";
  children?: React.ReactNode;
  backgroundType?: BackgroundType;
  backgoundColorClass?: string;
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  videoPoster?: string;
  title?: string;
  description?: string;
  button?: React.ReactNode;
  containerSize?: ContainerSize;
  sectionHeight?: SectionHeight;
  verticalAlign?: VerticalAlign;
}

const containerSizeClass: Record<ContainerSize, string> = {
  default: "max-w-7xl",
  wide: "max-w-[1440px]",
  full: "max-w-none",
};

const sectionHeightClass: Record<SectionHeight, string> = {
  default: "100%",
  full: "min-h-screen",
};

const verticalAlignClass: Record<VerticalAlign, string> = {
  default: "items-center",
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export default function SectionWrapper({
  id,
  dataHeaderTheme = "light",
  children = <></>,
  backgroundType = null,
  backgoundColorClass = "",
  imageSrc = "",
  imageAlt = "",
  videoSrc = "",
  videoPoster = "",
  sectionHeight = "default",
  containerSize = "default",
  verticalAlign = "default",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      data-header-theme={dataHeaderTheme}
      className={`relative overflow-hidden ${sectionHeightClass[sectionHeight]} ${backgoundColorClass}`}
    >
      {/* Background */}
      {/* {!backgroundType && (
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500" />
      )} */}

      {backgroundType === "image" && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="select-none object-cover"
        />
      )}

      {backgroundType === "video" && (
        <video
          className="select-none absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={videoPoster}
        />
      )}

      {/* Overlay */}
      {backgroundType && <div className="absolute inset-0 bg-black/20" />}

      {/* vertical align wrapper */}
      <div
        className={`flex ${sectionHeightClass[sectionHeight]} ${verticalAlignClass[verticalAlign]}`}
      >
        {/* Container */}
        {/* px-4 sm:px-6 md:px-12 lg:px-25 xl:px-32 */}
        <div
          className={`relative z-10 mx-auto w-full ${
            containerSizeClass[containerSize]
          } ${
            containerSize === "full" ? "" : "px-5 sm:px-8 lg:px-12 xl:px-16"
          }`}
        >
          {/* Content */}
          {children}
        </div>
      </div>
    </section>
  );
}
