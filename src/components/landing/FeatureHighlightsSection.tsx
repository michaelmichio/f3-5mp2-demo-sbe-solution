import svgPaths from "@/configs/svg-k9wnz0zy0s";
const imgFiltersFormatWebpQuality85 =
  "/assets/image/ceba4b349ad24e8c87c36a9e72b0d10970e516fe.png";
const imgFiltersFormatWebpQuality86 =
  "/assets/image/e9e35c54f186a89e922e332dcf1c381b5f84a166.png";
const imgFiltersFormatWebpQuality87 =
  "/assets/image/3c7bffc09eb67e231845ec899f915587cbcf8f22.png";
const imgFiltersFormatWebpQuality88 =
  "/assets/image/0a8ae968cfe96be483301d72642318a6917d3b07.png";
const imgFiltersFormatWebpQuality89 =
  "/assets/image/7aff3c872d73d10dcf73c0a28e2c8562040c4a31.png";
import { imgSvg1 } from "@/configs/svg-ulm27";
import SectionWrapper from "../shared/SectionWrapper";

function FeatureGridSvg() {
  return (
    <div
      className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%] mask-size-[100%_100%]"
      data-name="SVG"
      style={{ maskImage: `url('${imgSvg1}')` }}
    >
      <div className="absolute inset-[-0.03%_-0.02%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440.54 1489.52"
        >
          <g id="SVG">
            <g filter="url(#filter0_f_1_12322)" id="Vector" opacity="0.999986">
              <path
                d={svgPaths.p32cb8f80}
                fill="var(--fill-0, #ABFF02)"
                fillOpacity="0.6"
              />
            </g>
            <path
              d="M0.499839 496.51H1440.04"
              id="Vector_2"
              stroke="var(--stroke-0, #052424)"
              strokeOpacity="0.15"
              strokeWidth="0.999678"
            />
            <path
              d="M0.499839 496.51H1440.04"
              id="Vector_3"
              opacity="0.999986"
              stroke="var(--stroke-0, #052424)"
              strokeDasharray="14.25 999.68"
              strokeLinecap="round"
              strokeWidth="0.999678"
            />
            <g
              filter="url(#filter1_f_1_12322)"
              id="Vector_4"
              opacity="0.999986"
            >
              <path
                d={svgPaths.p20c42600}
                fill="var(--fill-0, #ABFF02)"
                fillOpacity="0.6"
              />
            </g>
            <path
              d="M0.499839 992.52H1440.04"
              id="Vector_5"
              stroke="var(--stroke-0, #052424)"
              strokeOpacity="0.15"
              strokeWidth="0.999678"
            />
            <path
              d="M0.499839 992.52H1440.04"
              id="Vector_6"
              opacity="0.999986"
              stroke="var(--stroke-0, #052424)"
              strokeDasharray="14.25 999.68"
              strokeLinecap="round"
              strokeWidth="0.999678"
            />
            <g
              filter="url(#filter2_f_1_12322)"
              id="Vector_7"
              opacity="0.999986"
            >
              <path
                d={svgPaths.p2cba480}
                fill="var(--fill-0, #ABFF02)"
                fillOpacity="0.6"
              />
            </g>
            <path
              d="M720.268 0.499839V1489.02"
              id="Vector_8"
              stroke="var(--stroke-0, #052424)"
              strokeOpacity="0.15"
              strokeWidth="0.999678"
            />
            <path
              d="M720.268 0.499839V1489.02"
              id="Vector_9"
              opacity="0.999986"
              stroke="var(--stroke-0, #052424)"
              strokeDasharray="14.89 999.68"
              strokeLinecap="round"
              strokeWidth="0.999678"
            />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="88.9713"
              id="filter0_f_1_12322"
              width="154.95"
              x="1219.22"
              y="452.024"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_1_12322"
                stdDeviation="16.9945"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="88.9713"
              id="filter1_f_1_12322"
              width="154.95"
              x="1175.73"
              y="948.034"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_1_12322"
                stdDeviation="16.9945"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="154.95"
              id="filter2_f_1_12322"
              width="88.9713"
              x="668.295"
              y="1179.95"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_1_12322"
                stdDeviation="16.9945"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function FeatureImage({
  src,
  aspectClassName,
}: {
  src: string;
  aspectClassName: string;
}) {
  return (
    <div
      className={`${aspectClassName} relative shrink-0 w-full`}
      data-name="filters:format(webp):quality(85)"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            className="absolute left-0 max-w-none size-full top-0"
            src={src}
          />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="SVG">
          <path
            d="M13 4H11V20H13V4Z"
            fill="var(--fill-0, #052424)"
            id="Vector"
          />
          <path
            d="M20 11H4V13H20V11Z"
            fill="var(--fill-0, #052424)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function FeatureCardOverlay() {
  return (
    <div
      className="absolute backdrop-blur-[25px] backdrop-filter bg-[#f4f5f5] content-stretch flex items-center justify-center right-[56px] rounded-[8px] size-[48px] top-[48px]"
      data-name="Background+OverlayBlur"
    >
      <PlusIcon />
    </div>
  );
}

function FeatureCardLiveLocation() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-[70px] pl-[56px] pr-[132px] py-[48px] right-[720px] top-0"
      data-name="Button - Expand card"
    >
      <div
        className="content-stretch flex flex-col items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full"
        data-name="Margin"
      >
        <div
          className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
          data-name="Container"
        >
          <div
            className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[264px]"
            data-name="Container"
          >
            <div
              className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
              data-name="Picture"
            >
              <FeatureImage
                aspectClassName="aspect-[264/264]"
                src={imgFiltersFormatWebpQuality85}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[9.09px] items-start overflow-clip relative shrink-0 w-full"
        data-name="Container"
      >
        <div
          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
          data-name="Heading 3"
        >
          <div className="flex flex-col font-['Schibsted_Grotesk:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#052424] text-[28.9px] w-full">
            <p className="leading-[44px]">Live Location Tracking</p>
          </div>
        </div>
        <div
          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
          data-name="Container"
        >
          <div className="flex flex-col font-['Schibsted_Grotesk:Regular',sans-serif] font-normal justify-center leading-[28px] relative shrink-0 text-[#1b1c1d] text-[19.1px] tracking-[-0.2px] w-full">
            <p className="mb-0">
              Terminal uses GPS and other technologies to give
            </p>
            <p>you a live map view of every asset in your yardƒ?"ƒ?İ</p>
          </div>
        </div>
      </div>
      <FeatureCardOverlay />
    </div>
  );
}

function FeatureCardDynamicTasks() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-[720px] pl-[56px] pr-[132px] py-[48px] right-[70px] top-0"
      data-name="Button - Expand card"
    >
      <div
        className="content-stretch flex flex-col items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full"
        data-name="Margin"
      >
        <div
          className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
          data-name="Container"
        >
          <div
            className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[264px]"
            data-name="Container"
          >
            <div
              className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
              data-name="Picture"
            >
              <FeatureImage
                aspectClassName="aspect-[264/264]"
                src={imgFiltersFormatWebpQuality86}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[9.09px] items-start overflow-clip relative shrink-0 w-full"
        data-name="Container"
      >
        <div
          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
          data-name="Heading 3"
        >
          <div className="flex flex-col font-['Schibsted_Grotesk:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#052424] text-[29.2px] w-full">
            <p className="leading-[44px]">Dynamic Task Management</p>
          </div>
        </div>
        <div
          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
          data-name="Container"
        >
          <div className="flex flex-col font-['Schibsted_Grotesk:Regular',sans-serif] font-normal justify-center leading-[28px] relative shrink-0 text-[#1b1c1d] text-[19.2px] tracking-[-0.2px] w-full">
            <p className="mb-0">
              The system automatically assigns tasks to yard
            </p>
            <p>jockeys based on their location and the highestƒ?İ</p>
          </div>
        </div>
      </div>
      <FeatureCardOverlay />
    </div>
  );
}

function FeatureCardStatusUpdates() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-[70px] pl-[56px] pr-[132px] py-[48px] right-[720px] top-[496.17px]"
      data-name="Button - Expand card"
    >
      <div
        className="content-stretch flex flex-col items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full"
        data-name="Margin"
      >
        <div
          className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
          data-name="Container"
        >
          <div
            className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[264px]"
            data-name="Container"
          >
            <div
              className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
              data-name="Picture"
            >
              <FeatureImage
                aspectClassName="aspect-[264/264]"
                src={imgFiltersFormatWebpQuality87}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[9.09px] items-start overflow-clip relative shrink-0 w-full"
        data-name="Container"
      >
        <div
          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
          data-name="Heading 3"
        >
          <div className="flex flex-col font-['Schibsted_Grotesk:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#052424] text-[29.2px] w-full">
            <p className="leading-[44px]">Real-Time Status Updates</p>
          </div>
        </div>
        <div
          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
          data-name="Container"
        >
          <div className="flex flex-col font-['Schibsted_Grotesk:Regular',sans-serif] font-normal justify-center leading-[28px] relative shrink-0 text-[#1b1c1d] text-[18.9px] tracking-[-0.2px] w-full">
            <p className="mb-0">
              Terminal provides instant updates on the status of
            </p>
            <p>{`every trailer and gate transaction. You'll know if aƒ?İ`}</p>
          </div>
        </div>
      </div>
      <FeatureCardOverlay />
    </div>
  );
}

function FeatureCardSeamlessComms() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-[720px] pb-[79.12px] pl-[56px] pr-[132px] pt-[48px] right-[70px] top-[496.17px]"
      data-name="Button - Expand card"
    >
      <div
        className="content-stretch flex flex-col items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full"
        data-name="Margin"
      >
        <div
          className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
          data-name="Container"
        >
          <div
            className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[264px]"
            data-name="Container"
          >
            <div
              className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
              data-name="Picture"
            >
              <FeatureImage
                aspectClassName="aspect-[264/232.88]"
                src={imgFiltersFormatWebpQuality88}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[9.085px] items-start overflow-clip relative shrink-0 w-full"
        data-name="Container"
      >
        <div
          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
          data-name="Heading 3"
        >
          <div className="flex flex-col font-['Schibsted_Grotesk:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#052424] text-[29.9px] w-full">
            <p className="leading-[44px]">Seamless Communications</p>
          </div>
        </div>
        <div
          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
          data-name="Container"
        >
          <div className="flex flex-col font-['Schibsted_Grotesk:Regular',sans-serif] font-normal justify-center leading-[28px] relative shrink-0 text-[#1b1c1d] text-[19.4px] tracking-[-0.2px] w-full">
            <p className="mb-0">The platform facilitates direct, real-time</p>
            <p>communication between yard managers, gateƒ?İ</p>
          </div>
        </div>
      </div>
      <FeatureCardOverlay />
    </div>
  );
}

function FeatureCardDataInsights() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-[70px] pl-[56px] pr-[132px] py-[48px] right-[720px] top-[992.34px]"
      data-name="Button - Expand card"
    >
      <div
        className="content-stretch flex flex-col items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full"
        data-name="Margin"
      >
        <div
          className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
          data-name="Container"
        >
          <div
            className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[264px]"
            data-name="Container"
          >
            <div
              className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
              data-name="Picture"
            >
              <FeatureImage
                aspectClassName="aspect-[264/264]"
                src={imgFiltersFormatWebpQuality89}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[9.095px] items-start overflow-clip relative shrink-0 w-full"
        data-name="Container"
      >
        <div
          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
          data-name="Heading 3"
        >
          <div className="flex flex-col font-['Schibsted_Grotesk:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#052424] text-[29.1px] w-full">
            <p className="leading-[44px]">Data-Driven Insights</p>
          </div>
        </div>
        <div
          className="content-stretch flex flex-col items-start relative shrink-0 w-full"
          data-name="Container"
        >
          <div className="flex flex-col font-['Schibsted_Grotesk:Regular',sans-serif] font-normal justify-center leading-[28px] relative shrink-0 text-[#1b1c1d] text-[19.2px] tracking-[-0.2px] w-full">
            <p className="mb-0">
              By collecting and analyzing real-time data, Terminal
            </p>
            <p>{`YOS provides powerful insights into your yard'sƒ?İ`}</p>
          </div>
        </div>
      </div>
      <FeatureCardOverlay />
    </div>
  );
}

function FeatureCardsGrid() {
  return (
    <div
      className="h-[1488.52px] relative shrink-0 w-full"
      data-name="Container"
    >
      <FeatureCardLiveLocation />
      <FeatureCardDynamicTasks />
      <FeatureCardStatusUpdates />
      <FeatureCardSeamlessComms />
      <FeatureCardDataInsights />
    </div>
  );
}

export default function FeatureHighlightsSection() {
  return (
    <SectionWrapper id="feature-highlight">
      <FeatureGridSvg />
      <div className="grid grid-cols-1 md:grid-cols-2">
        {data.map((item, index) => (
          <FeatureHighlightCard key={index} item={item} />
        ))}
      </div>
    </SectionWrapper>
  );

  return (
    <div
      className="mx-auto w-full max-w-[1440px] content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <FeatureGridSvg />
      <FeatureCardsGrid />
    </div>
  );
}

function FeatureHighlightCard({ item }: any) {
  return (
    <div className="flex px-14 py-12 items-start">
      <div className="">
        <div className="relative">
          <img alt="" className="mb-6 aspect-square h-66" src={item.src} />
          <div className="absolute bg-white inset-0 mix-blend-saturation" />
        </div>
        <h1 className="mb-[0.57rem] text-[1.80625rem] font-semibold leading-11">
          {item.title}
        </h1>
        <p className="text=[1.19375rem] leading-7 tracking-[-0.0125rem] text-[#1B1C1D]">
          {item.description}
        </p>
      </div>

      <button className="cursor-pointer bg-[#F4F5F5] rounded-lg p-3">
        <PlusIcon />
      </button>
    </div>
  );
}

const data = [
  {
    src: imgFiltersFormatWebpQuality85,
    title: "Live Location Tracking",
    description: `Terminal uses GPS and other technologies to give you a live map view of every asset in your yard—…`,
  },
  {
    src: imgFiltersFormatWebpQuality86,
    title: "Dynamic Task Management",
    description: `The system automatically assigns tasks to yard jockeys based on their location and the highest…`,
  },
  {
    src: imgFiltersFormatWebpQuality87,
    title: "Real-Time Status Updates",
    description: `Terminal provides instant updates on the status of every trailer and gate transaction. You'll know if a…`,
  },
  {
    src: imgFiltersFormatWebpQuality88,
    title: "Seamless Communications",
    description: `The platform facilitates direct, real-time communication between yard managers, gate…`,
  },
  {
    src: imgFiltersFormatWebpQuality89,
    title: "Data-Driven Insights",
    description: `By collecting and analyzing real-time data, Terminal YOS provides powerful insights into your yard's…`,
  },
];
