import { Logo, socialIcons } from "@/app/page";
import SectionWrapper from "./SectionWrapper";

export default function Footer() {
  return (
    <SectionWrapper id="footer">
      <footer className="font-sans">
        <div className="grid grid-cols-3 gap-6 py-15">
          <div className="col-span-3 md:col-span-1">
            <div className="flex flex-col gap-6 max-w-full w-67.5">
              <Logo />

              <p className="text-[0.875rem] leading-[150%] text-[#5B5D63]">
                Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdu
              </p>

              <div className="flex gap-2">
                {socialIcons.map((path, index) => (
                  <button key={index} className="cursor-pointer h-6 w-6">
                    <svg
                      className="h-full w-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 24 24"
                    >
                      <path d={path} fill="#5B5D63" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-3 md:col-span-1">
            <div className="flex gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-[1.125rem] font-medium leading-[150%]">
                  Our Offering
                </p>
                <ul className="flex flex-col gap-2 text-[1rem] leading-[150%]">
                  <li>Strategic Advisory</li>
                  <li>Influencers</li>
                  <li>Earned and Paid Media</li>
                  <li>Newsletter</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[1.125rem] font-medium leading-[150%]">
                  Our Offering
                </p>
                <ul className="flex flex-col gap-2 text-[1rem] leading-[150%]">
                  <li>Home</li>
                  <li>Why we're different</li>
                  <li>Our Network</li>
                  <li>Newsletter</li>
                  <li>Contact</li>
                  <li>Disclaimer</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-span-3 md:col-span-1">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-[1rem] font-semibold leading-[150%]">
                  Subscribe
                </p>
                <p className="text-[0.875rem] leading-[150%] text-[#989b9f]">
                  Join our community to receive updates
                </p>
              </div>

              <div className="flex">
                <input
                  className="w-full bg-white px-8 py-5 text-[0.875rem] leading-[150%] text-[#5b5d63] placeholder:text-[#5b5d63] border border-[#E6E9F0]"
                  placeholder="Enter your email"
                />
                <button className="cursor-pointer bg-[#050505] text-white px-8 py-5 text-[1.125rem] leading-5 font-bold">
                  Subscribe
                </button>
              </div>

              <div className="flex gap-6 text-[0.875rem] leading-[150%] text-[#989b9f] underline">
                <button className="cursor-pointer">Privacy Policy</button>
                <button className="cursor-pointer">Terms and Conditions</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </SectionWrapper>
  );
}
