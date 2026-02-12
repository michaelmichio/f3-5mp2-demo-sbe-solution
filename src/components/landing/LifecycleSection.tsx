import SectionWrapper from "../shared/SectionWrapper";

const imgRectangle3 =
  "/assets/image/87b52999ae68271c61eaec3aa55256b937b977e0.png";

export default function LifecycleSection() {
  return (
    <SectionWrapper id="lifecycle">
      <div className="flex flex-col pt-15 max-w-full w-full">
        <p className="mb-4 text-[1.125rem] leading-[160%]">
          An expert AI. A unique platform. Perfect execution.
        </p>
        <h1 className="mb-4 max-w-full w-203 text-[3rem] leading-[140%]">
          The GTB ecosystem that covers 100% of the{" "}
          <span className="font-bold">building lifecycle.</span>
        </h1>
        <p className="max-w-full w-149.75 text-[1.125rem] leading-[160%]">
          BMS Hub brings together all stages of a GTB project in one place, from
          the initial audit to daily operations, including engineering,
          commissioning, the DOE, and supervision.
        </p>

        <div className="content-stretch mt-12 flex flex-col lg:flex-row gap-[40px] items-center lg:justify-center relative shrink-0 lg:w-[1340px]">
          <p className="basis-0 font-medium grow leading-[1.4] relative shrink-0 text-[40px] lg:text-[60px]">
            Capture. Analyze. Recommend.
          </p>
          <div className="h-[753px] relative shrink-0 w-full lg:w-[698px]">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
              src={imgRectangle3}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
