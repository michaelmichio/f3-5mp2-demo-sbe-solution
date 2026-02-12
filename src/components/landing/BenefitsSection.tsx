const imgPictureFiltersFormatWebpQuality85 =
  "/assets/image/b16e5005ea3482f4787d11c5de521c127797446d.png";
import {
  imgContainer1,
  imgOverlayShadowOverlayBlur,
  imgOverlayShadowOverlayBlur1,
  imgOverlayShadowOverlayBlur2,
} from "@/configs/svg-ulm27";
import SectionWrapper from "../shared/SectionWrapper";

function BenefitsHeader() {
  return (
    <div
      className="max-w-[720px] relative shrink-0 w-full z-[2]"
      data-name="Container"
    >
      <div className="max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[inherit] pb-[40px] pl-[70px] pr-[20px] pt-[70px] relative w-full">
          <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[#052424] text-[18px] w-[495px]">
            THE BENEFITS
          </p>
          <div
            className="content-stretch flex flex-col font-['Schibsted_Grotesk:Regular',sans-serif] font-normal items-start leading-[0] relative shrink-0 text-[#052424] text-[1.75rem] lg:text-[48px] text-nowrap tracking-[-0.613px] w-full"
            data-name="Header - The Operational Benefits of Real-Time Visibility ƒ+' Heading 2"
          >
            <div className="flex flex-col justify-center relative shrink-0">
              <p className="leading-[normal] text-nowrap">
                The Operational Benefits
              </p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0">
              <p className="leading-[normal] text-nowrap">
                of Real-Time Visibility
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitsBackground() {
  return (
    <div
      className="absolute h-[795.94px] left-0 overflow-clip top-0 w-[1440px]"
      data-name="Container"
    >
      <div
        className="absolute h-[915px] left-[-72px] top-[-119.27px] w-[1584px]"
        data-name="Picture ƒ+' filters:format(webp):quality(85)"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute h-[120.61%] left-0 max-w-none top-[-10.31%] w-full"
            src={imgPictureFiltersFormatWebpQuality85}
          />
        </div>
      </div>
    </div>
  );
}

function BenefitCardDecision() {
  return (
    <div className="bg-white/20 px-6 py-4 lg:p-12 rounded-4xl flex flex-col gap-2 lg:gap-8">
      <p className="text-[1.125rem] lg:text-[24px] text-white">
        Smarter Decision-Making
      </p>

      <p className="text-[0.875rem] lg:text-[18px] text-[#c2c2c2]">
        Executives and managers gain immediate access to accurate data, enabling
        strategic decisions, workflow optimization, and proactive issue
        resolution.
      </p>
    </div>
  );
}

function BenefitCardEfficiency() {
  return (
    <div className="bg-white/20 px-6 py-4 lg:p-12 rounded-4xl flex flex-col gap-2 lg:gap-8">
      <p className="text-[1.125rem] lg:text-[24px] text-white">
        Operational Efficiency
      </p>

      <p className="text-[0.875rem] lg:text-[18px] text-[#c2c2c2]">
        Frontline teams and operational managers can track assets, reduce
        bottlenecks, and streamline daily activities, improving throughput and
        safety.
      </p>
    </div>
  );
}

function BenefitCardPerformance() {
  return (
    <div className="bg-white/20 px-6 py-4 lg:p-12 rounded-4xl flex flex-col gap-2 lg:gap-8">
      <p className="text-[1.125rem] lg:text-[24px] text-white">
        Improved Performance
      </p>

      <p className="text-[0.875rem] lg:text-[18px] text-[#c2c2c2]">
        Real-time data improves asset utilization, reduces costs, supports
        accurate forecasting, and enables automation and advanced analytics
        initiatives.
      </p>
    </div>
  );
}

function BenefitsCards() {
  return (
    <div
      className="h-[795.94px] relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="absolute flex inset-[252.48px_972.18px_248.97px_69.77px] items-center justify-center">
        <div className="flex-none h-[291.78px] rotate-[0.39deg] skew-x-[0.39deg] w-[398.06px]">
          <BenefitCardDecision />
        </div>
      </div>
      <div className="absolute flex inset-[251.04px_517.35px_254.37px_514.19px] items-center justify-center">
        <div className="flex-none h-[289.28px] rotate-[359.825deg] skew-x-[359.825deg] w-[408.46px]">
          <BenefitCardEfficiency />
        </div>
      </div>
      <BenefitCardPerformance />
    </div>
  );
}

function BenefitsMaskedLayer() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0px] mask-size-[100%_795.94px] right-0 top-0"
      data-name="Container"
      style={{ maskImage: `url('${imgContainer1}')` }}
    >
      <div className="absolute inset-0 overflow-clip" data-name="Figure">
        <BenefitsBackground />
      </div>
      <BenefitsCards />
    </div>
  );
}

export default function BenefitsSection() {
  return (
    <SectionWrapper id="benefits" containerSize="full">
      <div className="flex flex-col">
        <div className="mx-auto w-full max-w-7xl">
          <BenefitsHeader />
        </div>

        <div
          className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[1]"
          data-name="Container"
        >
          <div
            className="h-[795.94px] relative shrink-0 w-full"
            data-name="Mask Group"
          >
            <div
              className="absolute content-stretch flex flex-col items-start left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0px] mask-size-[100%_795.94px] right-0 top-0"
              data-name="Container"
              style={{ maskImage: `url('${imgContainer1}')` }}
            >
              <div
                className="absolute inset-0 overflow-clip"
                data-name="Figure"
              >
                <div
                  className="absolute h-[795.94px] left-0 overflow-clip top-0 w-full"
                  data-name="Container"
                >
                  <div
                    className="absolute h-[915px] left-0 top-[-119.27px] w-full"
                    data-name="Picture ƒ+' filters:format(webp):quality(85)"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt=""
                        className="absolute h-[120.61%] left-0 max-w-none top-[-10.31%] w-full"
                        src={imgPictureFiltersFormatWebpQuality85}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[795.94px]">
                <div className="px-8 absolute grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 w-full max-w-7xl mx-auto inset-[150px_0_250px_0px] lg:inset-[250px_0_250px_0px] items-center justify-center">
                  <BenefitCardDecision />
                  <BenefitCardEfficiency />
                  <BenefitCardDecision />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );

  return (
    <div
      className="mx-auto w-full max-w-[1440px] content-stretch flex flex-col isolate items-start relative shrink-0 w-full"
      data-name="Section - The Benefits"
    >
      <BenefitsHeader />
      <div
        className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[1]"
        data-name="Container"
      >
        <div
          className="h-[795.94px] relative shrink-0 w-full"
          data-name="Mask Group"
        >
          <BenefitsMaskedLayer />
        </div>
      </div>
    </div>
  );
}
