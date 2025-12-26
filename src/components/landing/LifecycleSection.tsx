const imgRectangle3 = "/assets/image/87b52999ae68271c61eaec3aa55256b937b977e0.png";

function LifecycleIntro() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col font-['Schibsted_Grotesk:Regular',sans-serif] font-normal gap-[16px] items-start pl-0 pr-[100px] py-0 relative w-full">
          <p className="leading-[1.6] relative shrink-0 text-[#052424] text-[18px] text-nowrap">An expert AI. A unique platform. Perfect execution.</p>
          <p className="leading-[1.4] relative shrink-0 text-[#050505] text-[48px] w-[812px]">
            <span>{`The GTB ecosystem that covers 100% of the `}</span>
            <span className="font-['Schibsted_Grotesk:Bold',sans-serif] font-bold text-[#052424]">building lifecycle.</span>
          </p>
          <p className="leading-[1.6] relative shrink-0 text-[#5b5d63] text-[18px] w-[599px]">BMS Hub brings together all stages of a GTB project in one place, from the initial audit to daily operations, including engineering, commissioning, the DOE, and supervision.</p>
        </div>
      </div>
    </div>
  );
}

function LifecycleSlider() {
  return (
    <div className="content-stretch flex gap-[40px] items-center justify-center relative shrink-0 w-[1340px]" data-name="image-slider">
      <p className="basis-0 font-['Schibsted_Grotesk:Medium',sans-serif] font-medium grow leading-[1.4] min-h-px min-w-px relative shrink-0 text-[#052424] text-[60px]">Capture. Analyze. Recommend.</p>
      <div className="h-[753px] relative shrink-0 w-[698px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle3} />
      </div>
    </div>
  );
}

export default function LifecycleSection() {
  return (
    <div className="mx-auto w-full max-w-[1440px] bg-white content-stretch flex flex-col gap-[8px] items-end justify-center overflow-clip pb-0 pl-[100px] pr-0 pt-[60px] relative shrink-0 w-[1440px]" data-name="container">
      <LifecycleIntro />
      <LifecycleSlider />
    </div>
  );
}
