import svgPaths from "@/configs/svg-k9wnz0zy0s";
const imgCard = "/assets/image/8184cd9e0cf038f72922027f358b99ee257216f6.png";
const imgCard1 = "/assets/image/4e9796e10685fcc0a7d5e551afb51303af2fd075.png";
const imgCard2 = "/assets/image/8521a28802d650fa54f4146c42b5d8b92817f81f.png";
const imgCard3 = "/assets/image/b817172c2d96cbc6422c4ea674ca0c8f31d3d8b3.png";
const imgCard4 = "/assets/image/6f580e689d5399873b0b408779aaa418210b5052.png";

type RoleCardData = {
  title: string;
  subtitle: string;
  image: string;
  containerClassName: string;
  gradientClassName: string;
};

const roleCards: RoleCardData[] = [
  {
    title: "Integrator",
    subtitle: "System Integrators & BMS Companies",
    image: imgCard,
    containerClassName:
      "content-stretch flex flex-col h-[513px] items-end justify-between overflow-clip p-[32px] relative shrink-0 w-[425.333px]",
    gradientClassName:
      "absolute bg-gradient-to-b from-[rgba(24,22,22,0)] inset-0 to-[52.819%] to-[rgba(24,22,22,0.35)]",
  },
  {
    title: "Engineering",
    subtitle: "Design Office & Consultants",
    image: imgCard1,
    containerClassName:
      "content-stretch flex flex-col items-end justify-between overflow-clip p-[32px] relative self-stretch shrink-0 w-[425.333px]",
    gradientClassName:
      "absolute bg-gradient-to-b from-[rgba(24,22,22,0)] inset-0 to-[55.05%] to-[rgba(24,22,22,0.35)]",
  },
  {
    title: "Asset Manager",
    subtitle: "Real Estate Portfolio Managers",
    image: imgCard2,
    containerClassName:
      "content-stretch flex flex-col items-end justify-between overflow-clip p-[32px] relative self-stretch shrink-0 w-[425.333px]",
    gradientClassName:
      "absolute bg-gradient-to-b from-[rgba(24,22,22,0)] inset-0 to-[55.05%] to-[rgba(24,22,22,0.35)]",
  },
  {
    title: "Operator",
    subtitle: "Maintainers & Facility Managers",
    image: imgCard3,
    containerClassName:
      "content-stretch flex flex-col items-end justify-between overflow-clip p-[32px] relative self-stretch shrink-0 w-[425.333px]",
    gradientClassName:
      "absolute bg-gradient-to-b from-[rgba(24,22,22,0)] inset-0 to-[55.05%] to-[rgba(24,22,22,0.3)]",
  },
  {
    title: "Owner",
    subtitle: "Institutional Owners & Investors",
    image: imgCard4,
    containerClassName:
      "content-stretch flex flex-col items-end justify-between overflow-clip p-[32px] relative self-stretch shrink-0 w-[425.333px]",
    gradientClassName:
      "absolute bg-gradient-to-b from-[rgba(24,22,22,0)] inset-0 to-[55.05%] to-[rgba(24,22,22,0.3)]",
  },
];

function SectionTitle() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#050505] text-[0px] text-[48px] text-center text-nowrap">
        <span>{`Start where `}</span>
        <span className="font-['Schibsted_Grotesk:Bold',sans-serif] font-bold">
          you are
        </span>
      </p>
    </div>
  );
}

function SectionIntro() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <SectionTitle />
      <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[#5b5d63] text-[18px] w-[495px]">
        The BMS Hub ecosystem adapts to your role. Select your profile to see
        your tailored path
      </p>
    </div>
  );
}

function PlusIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="icon">
          <path
            d={svgPaths.p2e6eafc0}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function RoleCard({
  title,
  subtitle,
  image,
  containerClassName,
  gradientClassName,
}: RoleCardData) {
  return (
    <div className={containerClassName} data-name="card">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img
          alt=""
          className="absolute max-w-none object-50%-50% object-cover size-full"
          src={image}
        />
        <div className={gradientClassName} />
      </div>
      <div className="backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.2)] content-stretch flex items-center p-[8px] relative rounded-[100px] shrink-0">
        <div
          className="content-stretch flex items-center relative shrink-0"
          data-name="IconWrapper"
        >
          <PlusIcon />
        </div>
      </div>
      <div
        className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-white w-full"
        data-name="text"
      >
        <p className="font-['Schibsted_Grotesk:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[38px] w-full">
          {title}
        </p>
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[18px] w-full">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default function RolesSection() {
  return (
    <div
      className="mx-auto w-full max-w-[1440px] bg-white content-stretch flex flex-col gap-[40px] items-start overflow-clip pl-[100px] pr-0 py-[60px] relative shrink-0 w-[1440px]"
      data-name="container"
    >
      <SectionIntro />
      <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full">
        {roleCards.map((card) => (
          <RoleCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}
