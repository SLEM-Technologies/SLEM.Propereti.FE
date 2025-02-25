import moneyIcon from "@/assets/icons/resale-icon.svg";
import lowCommission from "@/assets/icons/commission-icon.svg";
import findHomeIcon from "@/assets/icons/installmental-pay-icon.svg";
import Icon from "@/common/components/Icon";

const COMMON_STYLE = {
  listStyles: {
    content:
      "flex flex-col justify-center items-center gap-1 md:justify-start md:items-start md:gap-3",
    title:
      "text-[1.2rem] font-[700] leading-[30px] md:text-[1.5rem] md:leading-[40px]",
    description:
      "text-[0.8rem] max-w-sm text-center md:text-left md:text-base md:max-w-full md:text-left text-black font-[400] leading-[24px]",
  },
};

function OwnerShip() {
  return (
    <div className="w-full h-full bg-linear-to-t from-secondary-100/50 to-white text-primary-50 py-7 md:py-14">
      <div className="w-[70%] mx-auto flex flex-col gap-12 md:gap-16">
        <div>
          <h2 className="text-primary-50 text-[1.3rem] leading-[35.48px] font-[700] md:leading-[60.48px] md:text-[2rem]">
            The best help you can get in your resale
          </h2>
          <p className="text-[0.82rem] max-w-md md:max-w-[900px] text-black leading-[25px] font-[400] md:text-[1.1rem] md:leading-[30px]">
            Founded in 2010, [Company Name] has been a trusted name in the real
            estate industry, helping thousands of clients buy, sell, and rent
            properties across Nigeria. Founded in 2010,
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex flex-col  gap-6">
            <div className={COMMON_STYLE["listStyles"].content}>
              <div>
                <Icon src={findHomeIcon} alt="Home icon" />
              </div>
              <h2 className={COMMON_STYLE["listStyles"].title}>
                All proves of Payment
              </h2>
              <p className={COMMON_STYLE["listStyles"].description}>
                Get a virtual tour, and schedule visits before you rent or buy
                any properties. You get overall control.
              </p>
            </div>

            <div className={COMMON_STYLE["listStyles"].content}>
              <div>
                <Icon src={lowCommission} alt="Home icon" />
              </div>
              <h2 className={COMMON_STYLE["listStyles"].title}>
                Lowest Commission
              </h2>
              <p className={COMMON_STYLE["listStyles"].description}>
                You no longer have to negotiate commissions and haggle with
                other agents it only cost 2%!
              </p>
            </div>
          </div>

          <div className={COMMON_STYLE["listStyles"].content}>
            <div>
              <Icon src={moneyIcon} alt="Home icon" />
            </div>
            <h2 className={COMMON_STYLE["listStyles"].title}>
              Resale Assistance
            </h2>
            <p className={COMMON_STYLE["listStyles"].description}>
              Not sure what you should be charging for your property? No need to
              worry, let us do the numbers for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerShip;
