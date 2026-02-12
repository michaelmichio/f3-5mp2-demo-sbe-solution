import svgPaths from "@/configs/svg-k9wnz0zy0s";
import { imgSection, imgSvg } from "@/configs/svg-ulm27";
import SectionWrapper from "../shared/SectionWrapper";

function SolutionGlowSvg() {
  return (
    <div
      className="absolute inset-[0_0_0.25px_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%] mask-size-[100%_100%]"
      data-name="SVG"
      style={{ maskImage: `url('${imgSvg}')` }}
    >
      <div className="absolute inset-[-8.05%_0_0_0]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 713.961"
        >
          <g id="SVG">
            <g filter="url(#filter0_f_1_12284)" id="Vector" opacity="0.999986">
              <path
                d={svgPaths.p40c7471}
                fill="var(--fill-0, #ABFF02)"
                fillOpacity="0.6"
              />
            </g>
            <path
              d="M720 53.2112V136.324"
              id="Vector_2"
              stroke="var(--stroke-0, #052424)"
              strokeDasharray="79.97 13.71"
              strokeOpacity="0.15"
              strokeWidth="0.999607"
            />
            <path
              d="M720 53.2112V136.324"
              id="Vector_3"
              opacity="0.999986"
              stroke="var(--stroke-0, #052424)"
              strokeDasharray="0.8 79.27"
              strokeLinecap="round"
              strokeWidth="0.999607"
            />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="158.359"
              id="filter0_f_1_12284"
              width="88.965"
              x="668.03"
              y="1.90735e-06"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_1_12284"
                stdDeviation="16.9933"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function SolutionHeading() {
  return (
    <div
      className="content-stretch flex flex-col items-center pl-[122.07px] pr-[122.1px] py-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Schibsted_Grotesk:Regular',sans-serif] font-normal justify-center leading-[1.2] relative shrink-0 text-[#052424] text-[68px] text-center text-nowrap tracking-[-3.6px]">
        <p className="mb-0">Now You See It:</p>
        <p>Terminal Solves Visibility</p>
      </div>
    </div>
  );
}

function SolutionHeader() {
  return (
    <div
      className="content-stretch flex flex-col items-start max-w-[933.7540283203125px] relative shrink-0"
      data-name="Header - Now You See It: Terminal Solves Visibility"
    >
      <SolutionHeading />
    </div>
  );
}

function SolutionHeaderMargin() {
  return (
    <div
      className="content-stretch flex flex-col items-center pb-[54px] pt-0 px-[183.125px] relative shrink-0"
      data-name="Header - Now You See It: Terminal Solves Visibility:margin"
    >
      <SolutionHeader />
    </div>
  );
}

function SolutionDescription() {
  return (
    <div
      className="content-stretch flex flex-col items-center relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['Schibsted_Grotesk:Regular',sans-serif] font-normal justify-center leading-[1.4] relative shrink-0 text-[#454742] text-[18px] text-center tracking-[0.36px] w-full">
        <p className="mb-0">
          Terminal Yard Operating System (YOS) is a modern solution designed to
          give you
        </p>
        <p className="mb-0">
          a clear, unobstructed view of your entire yard, in real time. It pulls
          back the curtain
        </p>
        <p className="mb-0">
          on your operations, replacing guesswork with a single, accurate source
          of truth.
        </p>
        <p>With Terminal, these common problems are no longer a concern.</p>
      </div>
    </div>
  );
}

function SolutionBody() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[210px] py-0 relative w-full">
          <SolutionDescription />
        </div>
      </div>
    </div>
  );
}

function SolutionContent() {
  return (
    <div
      className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 w-full"
      data-name="Container"
    >
      <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[#052424] text-[18px] text-nowrap">
        THE SOLUTION
      </p>
      <SolutionHeaderMargin />
      <SolutionBody />
    </div>
  );
}

function SolutionSectionMask() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[70px] py-[145px] relative w-full">
          <SolutionContent />
        </div>
      </div>
    </div>
  );
}

function SolutionMaskLayer() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0px] mask-size-[100%_635.75px] right-0 top-0"
      data-name="Section"
      style={{ maskImage: `url('${imgSection}')` }}
    >
      <SolutionGlowSvg />
      <SolutionSectionMask />
    </div>
  );
}

export default function SolutionSection() {
  return (
    <SectionWrapper id="solution">
      <div className="py-36 flex flex-col gap-3 items-center text-center">
        <p className="text-[1.125rem] leading-[160%]">THE SOLUTION</p>
        <p className="max-w-full w-165 mb-13.5 text-[3rem] lg:text-[4.25rem] leading-[120%] tracking-[-0.225rem]">
          Now You See It: Terminal Solves Visibility
        </p>
        <p className="max-w-full w-172 text-[1.125rem] leading-[140%] tracking-[0.0225rem] text-[#454742]">
          Terminal Yard Operating System (YOS) is a modern solution designed to
          give you a clear, unobstructed view of your entire yard, in real time.
          It pulls back the curtain on your operations, replacing guesswork with
          a single, accurate source of truth. With Terminal, these common
          problems are no longer a concern.
        </p>
      </div>
    </SectionWrapper>
  );

  return (
    <div
      className="mx-auto w-full max-w-[1440px] content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div
        className="h-[635.75px] relative shrink-0 w-full"
        data-name="Mask Group"
      >
        <SolutionMaskLayer />
      </div>
    </div>
  );
}
