const imgChatGptImageDec262025120338Pm1 =
  "/assets/image/55b0350aea2976fb73ce6d08f0fdd49e1883d765.png";
const imgChatGptImageDec262025120338Pm2 =
  "/assets/image/c38f050a1d1bac9033c321f8386b3fabb2abc387.png";
const imgChatGptImageDec262025120338Pm3 =
  "/assets/image/8fe41b366bceae3f6959ce7f586c659adcba8f6e.png";

type ArchitectureCardData = {
  title: string;
  description: string;
  image: string;
};

const architectureCards: ArchitectureCardData[] = [
  {
    title: "Modular Design",
    description:
      "Every layer communicaties. Start with design, flow seamlessly into-operations No data silos",
    image: imgChatGptImageDec262025120338Pm1,
  },
  {
    title: "Data Standard",
    description:
      "Built on open standards (Project Haystack Brick Schema). Your data belongs to you, formmated for machines.",
    image: imgChatGptImageDec262025120338Pm2,
  },
  {
    title: "Digital Twin Ready",
    description:
      "Physical assets meet digital inteligence, real time syncing between the site and cloud",
    image: imgChatGptImageDec262025120338Pm3,
  },
];

function SectionHeading() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[#052424] text-[18px] w-[495px]">
        THE ARCHITECTURE
      </p>
      <div className="content-stretch flex items-start relative shrink-0 w-full">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#050505] text-[48px] text-center text-nowrap">
          <span>{`Not just products. A `}</span>
          <span className="font-['Schibsted_Grotesk:SemiBold',sans-serif] font-semibold">
            living system
          </span>
        </p>
      </div>
    </div>
  );
}

function ArchitectureCard({ title, description, image }: ArchitectureCardData) {
  return (
    <div
      className="basis-0 bg-[#f7f7f7] grow min-h-px min-w-px relative shrink-0"
      data-name="card"
    >
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] w-full">
        <div
          className="h-[225px] relative shrink-0 w-full"
          data-name="ChatGPT Image Dec 26, 2025, 12_03_38 PM 1"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
          >
            <img
              alt=""
              className="absolute max-w-none object-50%-50% object-cover size-full"
              src={image}
            />
            <div className="absolute bg-[rgba(0,0,0,0.02)] inset-0" />
          </div>
        </div>
        <div
          className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-full"
          data-name="card"
        >
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col items-start px-[32px] py-[24px] relative size-full">
              <div
                className="content-stretch flex flex-col items-start relative shrink-0 w-full"
                data-name="info"
              >
                <div
                  className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
                  data-name="text"
                >
                  <p className="font-['Schibsted_Grotesk:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[#050505] text-[28px] w-full">
                    {title}
                  </p>
                  <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[#5b5d63] text-[18px] w-full">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute border-[#e6e9f0] border-[0px_1px_1px] border-solid inset-0 pointer-events-none"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#e6e9f0] border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

export default function ArchitectureSection() {
  return (
    <div
      className="mx-auto w-full max-w-[1440px] bg-white content-stretch flex flex-col gap-[40px] items-start overflow-clip pb-[40px] pt-[60px] px-[100px] relative shrink-0 w-[1440px]"
      data-name="container"
    >
      <SectionHeading />
      <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full">
        {architectureCards.map((card) => (
          <ArchitectureCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}
