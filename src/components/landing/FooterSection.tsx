import svgPaths from "@/configs/svg-k9wnz0zy0s";

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
            fill="var(--fill-0, #050505)"
            id="Vector"
          />
          <path
            d={svgPaths.p791c280}
            fill="var(--fill-0, #050505)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p17c72200}
            fill="var(--fill-0, #050505)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p2ae05200}
            fill="var(--fill-0, #050505)"
            id="Vector_4"
          />
          <path
            d={svgPaths.p1d151cc0}
            fill="var(--fill-0, #050505)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p384c2c00}
            fill="var(--fill-0, #050505)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p39e42f80}
            fill="var(--fill-0, #050505)"
            id="Vector_7"
          />
          <path
            d={svgPaths.p1dee0300}
            fill="var(--fill-0, #050505)"
            id="Vector_8"
          />
          <path
            d={svgPaths.p33fb6300}
            fill="var(--fill-0, #050505)"
            id="Vector_9"
          />
          <path
            d={svgPaths.p392740f0}
            fill="var(--fill-0, #050505)"
            id="Vector_10"
          />
        </g>
      </svg>
    </div>
  );
}

function SocialIcon({ path, id }: { path: string; id: string }) {
  return (
    <button
      className="content-stretch flex items-center p-0 relative shrink-0"
      data-name="IconWrapper"
    >
      <div className="relative shrink-0 size-[24px]" data-name="icon">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 24"
        >
          <g id="icon">
            <path d={path} fill="var(--fill-0, #5B5D63)" id={id} />
          </g>
        </svg>
      </div>
    </button>
  );
}

function SocialLinks() {
  const icons = [
    { id: "Vector", path: svgPaths.p33c21d80 },
    { id: "Vector", path: svgPaths.p10783000 },
    { id: "Vector", path: svgPaths.p3c816680 },
    { id: "Vector", path: svgPaths.pbf934c0 },
    { id: "Vector", path: svgPaths.p36dd4280 },
    { id: "Vector", path: svgPaths.p3c7b5b00 },
  ];

  return (
    <div className="content-stretch cursor-pointer flex gap-[8px] items-start relative shrink-0">
      {icons.map((icon, index) => (
        <SocialIcon
          key={`${icon.path}-${index}`}
          id={icon.id}
          path={icon.path}
        />
      ))}
    </div>
  );
}

function FooterBrand() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px relative shrink-0">
      <Logo />
      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#5b5d63] text-[14px] w-[270px]">
          Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdu
        </p>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}

function FooterColumns() {
  return (
    <div className="basis-0 content-stretch flex gap-[32px] grow items-start min-h-px min-w-px relative shrink-0">
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
        <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#050505] text-[18px] text-center text-nowrap">
          Our Offering
        </p>
        <div className="content-stretch flex flex-col font-['Schibsted_Grotesk:Regular',sans-serif] font-normal gap-[8px] items-start leading-[1.5] relative shrink-0 text-[#050505] text-[16px] text-center text-nowrap">
          <p className="relative shrink-0">Strategic Advisory</p>
          <p className="relative shrink-0">Influencers</p>
          <p className="relative shrink-0">Earned and Paid Media</p>
          <p className="relative shrink-0">Newsletter</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
        <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#050505] text-[18px] text-center text-nowrap">
          Our Offering
        </p>
        <div className="content-stretch flex flex-col font-['Schibsted_Grotesk:Regular',sans-serif] font-normal gap-[8px] items-start leading-[1.5] relative shrink-0 text-[#050505] text-[16px] text-center text-nowrap">
          <p className="relative shrink-0">Home</p>
          <p className="relative shrink-0">Why weƒ?Tre different</p>
          <p className="relative shrink-0">Our Network</p>
          <p className="relative shrink-0">Newsletter</p>
          <p className="relative shrink-0">Contact</p>
          <p className="relative shrink-0">Disclaimer</p>
        </div>
      </div>
    </div>
  );
}

function FooterSubscribe() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[397px]">
      <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.5] relative shrink-0 text-nowrap">
        <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium relative shrink-0 text-[#050505] text-[16px]">
          Subscribe
        </p>
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal relative shrink-0 text-[#989b9f] text-[14px]">
          Join our community to receive updates
        </p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full">
        <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
          <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0">
            <div
              aria-hidden="true"
              className="absolute border border-[#e6e9f0] border-solid inset-0 pointer-events-none"
            />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center px-[32px] py-[20px] relative size-full">
                <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#5b5d63] text-[14px] text-nowrap">
                  Enter your email
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-[#050505] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[32px] py-[20px] relative shrink-0"
          data-name="button"
        >
          <p className="font-['Schibsted_Grotesk:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[18px] text-nowrap text-white">
            Subscribe
          </p>
        </div>
      </div>
    </div>
  );
}

function FooterLegal() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <FooterSubscribe />
      <div className="content-stretch flex font-['Schibsted_Grotesk:Regular',sans-serif] font-normal gap-[24px] items-start leading-[1.5] relative shrink-0 text-[#989b9f] text-[14px] text-nowrap underline">
        <p className="[text-underline-position:from-font] decoration-solid relative shrink-0">
          Privacy Policy
        </p>
        <p className="[text-underline-position:from-font] decoration-solid relative shrink-0">
          Terms and Conditions
        </p>
      </div>
    </div>
  );
}

export default function FooterSection() {
  return (
    <div
      className="mx-auto w-full max-w-[1440px] bg-white content-stretch flex flex-col items-start justify-center overflow-clip px-[100px] py-[60px] relative shrink-0 w-[1440px]"
      data-name="container"
    >
      <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full">
        <FooterBrand />
        <FooterColumns />
        <FooterLegal />
      </div>
    </div>
  );
}
