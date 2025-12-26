import svgPaths from "@/configs/svg-k9wnz0zy0s";

const imgContainer = "/assets/image/c1d95c437a0194b995fcd33f3d48e1b8644788b9.png";

function Logo() {
  return (
    <div className="h-[42px] relative shrink-0 w-[158.4px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 158.4 42">
        <g id="Logo">
          <path d={svgPaths.p175ab700} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p791c280} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p17c72200} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p2ae05200} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p1d151cc0} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p384c2c00} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p39e42f80} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p1dee0300} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p33fb6300} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p392740f0} fill="var(--fill-0, white)" id="Vector_10" />
        </g>
      </svg>
    </div>
  );
}

function AuthButtons() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="backdrop-blur-[2px] backdrop-filter bg-white content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[12px] relative shrink-0" data-name="button">
        <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#050505] text-[14px] text-nowrap">Login</p>
      </div>
      <div className="backdrop-blur-[2px] backdrop-filter bg-[rgba(0,0,0,0.9)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[12px] relative shrink-0" data-name="button">
        <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white">Start Free</p>
      </div>
    </div>
  );
}

function NavMenu() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative rounded-[10px] shrink-0" data-name="group-menu">
      <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white">Platform</p>
      <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white">Knowledge</p>
      <AuthButtons />
    </div>
  );
}

function HeroTitle() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[1026px]">
      <div className="font-['Schibsted_Grotesk:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[60px] text-center text-white w-full">
        <p className="mb-0">{`The operating system `}</p>
        <p>for smart building</p>
      </div>
    </div>
  );
}

function HeroCta() {
  return (
    <div className="backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.9)] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[32px] py-[20px] relative shrink-0" data-name="button">
      <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#050505] text-[18px] text-nowrap">Explore the Ecosystem</p>
    </div>
  );
}

function HeroContent() {
  return (
    <div className="mx-auto w-full max-w-[1440px] content-stretch flex flex-col gap-[32px] h-[818px] items-center justify-center px-[100px] py-[40px] relative shrink-0 w-[1240px]">
      <HeroTitle />
      <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[18px] text-center text-white w-[672px]">From BMS projects to digital twins, data-driven buildings and asset intelligence. A unified ecosystem.</p>
      <HeroCta />
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="h-[900px] relative shrink-0 w-full" data-name="container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgContainer} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(116.55deg, rgba(0, 0, 0, 0.16) 3.8327%, rgba(0, 0, 0, 0.4) 59.657%)" }} />
      </div>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[100px] py-0 relative size-full">
          <div className="content-stretch flex items-center justify-between px-0 py-[16px] relative shrink-0 w-full" data-name="Header">
            <Logo />
            <NavMenu />
          </div>
          <HeroContent />
        </div>
      </div>
    </div>
  );
}
