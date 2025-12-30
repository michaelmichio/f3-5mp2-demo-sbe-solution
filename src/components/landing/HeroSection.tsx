import svgPaths from "@/configs/svg-k9wnz0zy0s";
import SectionWrapper from "../shared/SectionWrapper";

export default function HeroSection() {
  return (
    <SectionWrapper
      id="hero"
      dataHeaderTheme="dark"
      sectionHeight="full"
      backgroundType="image"
      imageSrc="/assets/image/c1d95c437a0194b995fcd33f3d48e1b8644788b9.png"
      imageAlt="hero"
    >
      <div className="flex flex-col max-w-full w-256.5 mx-auto items-center text-center gap-8">
        <h1 className="font-bold text-[3.75rem] leading-18 text-white">
          The operating system for smart building
        </h1>
        <p className="max-w-full w-2xl text-[1.125rem] leading-[140%] text-white">
          From BMS projects to digital twins, data-driven buildings and asset
          intelligence. A unified ecosystem.
        </p>
        <button className="cursor-pointer px-8 py-5 font-medium text-[1.125rem] leading-5 bg-white/90 hover:bg-white/95">
          Explore the Ecosystem
        </button>
      </div>
    </SectionWrapper>
  );
}

{
  /* <div
  className="content-stretch flex items-center justify-between px-0 py-[16px] relative shrink-0 w-full"
  data-name="Header"
>
  <Logo />
  <NavMenu />
</div>; */
}

function Logo() {
  return (
    <div className="h-[42px] relative shrink-0 w-[158.4px]" data-name="Logo">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 158.4 42"
      >
        <g id="Logo">
          <path
            d={svgPaths.p175ab700}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p791c280}
            fill="var(--fill-0, white)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p17c72200}
            fill="var(--fill-0, white)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p2ae05200}
            fill="var(--fill-0, white)"
            id="Vector_4"
          />
          <path
            d={svgPaths.p1d151cc0}
            fill="var(--fill-0, white)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p384c2c00}
            fill="var(--fill-0, white)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p39e42f80}
            fill="var(--fill-0, white)"
            id="Vector_7"
          />
          <path
            d={svgPaths.p1dee0300}
            fill="var(--fill-0, white)"
            id="Vector_8"
          />
          <path
            d={svgPaths.p33fb6300}
            fill="var(--fill-0, white)"
            id="Vector_9"
          />
          <path
            d={svgPaths.p392740f0}
            fill="var(--fill-0, white)"
            id="Vector_10"
          />
        </g>
      </svg>
    </div>
  );
}

function NavMenu() {
  return (
    <div
      className="content-stretch flex gap-[24px] items-center relative rounded-[10px] shrink-0"
      data-name="group-menu"
    >
      <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white">
        Platform
      </p>
      <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white">
        Knowledge
      </p>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
        <div
          className="backdrop-blur-[2px] backdrop-filter bg-white content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[12px] relative shrink-0"
          data-name="button"
        >
          <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#050505] text-[14px] text-nowrap">
            Login
          </p>
        </div>
        <div
          className="backdrop-blur-[2px] backdrop-filter bg-[rgba(0,0,0,0.9)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[12px] relative shrink-0"
          data-name="button"
        >
          <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white">
            Start Free
          </p>
        </div>
      </div>
    </div>
  );
}
