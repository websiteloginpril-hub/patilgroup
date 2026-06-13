"use client";

import React, { useEffect, useState } from 'react';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { useInView } from 'react-intersection-observer';

const CORE_VALUE_WIDTH = 188;
const coreValueBoxes = [
  { label: 'Quality' },
  { label: 'Customer Centric' },
  { label: 'Human Centric' },
  { label: 'Innovative' },
  { label: 'Sustainable growth' },
  { label: 'Adaptive' },
  { label: 'Competitive' },
];

const coreValueLabels = coreValueBoxes.map((item) => item.label);
const TRANSPARENT_GLASS_BOX_CLASS = 'about-morphism-glass-card values-gradient-card cursor-default';
const CORE_VALUE_ITEM_CLASS = 'flex items-center justify-center bg-[#9A4344] text-center text-white';
const MOBILE_CONTENT_BOX_CLASS = `max-w-[1248px] rounded-[22px] p-5 sm:p-6 md:p-7 ${TRANSPARENT_GLASS_BOX_CLASS}`;

const OurVisionPage = () => {
  useGSAPAnimations();

  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [desktopRef, desktopInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [visionRef, visionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [coreValuesRef, coreValuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const shouldAnimate = desktopInView || coreValuesInView;

    if (!shouldAnimate || hasAnimated) {
      return;
    }

    const startDelay = 1200;
    const stepDelay = 560;
    const holdDuration = 1100;
    const timers: number[] = [];

    coreValueLabels.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setActiveValueIndex(index);
        }, startDelay + (index * stepDelay))
      );
    });

    timers.push(
      window.setTimeout(() => {
        setActiveValueIndex(null);
        setHasAnimated(true);
      }, startDelay + ((coreValueLabels.length - 1) * stepDelay) + holdDuration)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [coreValuesInView, desktopInView, hasAnimated]);

  return (
    <div className="bg-[#fcfbf8] pt-[103px]">
      <div ref={desktopRef} className="hidden lg:block">
        <section className="relative overflow-hidden bg-white py-24">
          <div
            className={`absolute right-0 transition-all duration-1000 will-change-transform ${
              desktopInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
            style={{
              top: '115px',
              width: 'min(1133px, 80vw)',
              height: 'clamp(20px, 2vw, 28px)',
              background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)',
              transformOrigin: 'right',
              transitionDelay: '300ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`mb-16 transition-all duration-700 will-change-transform ${
                desktopInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: '100ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <h2 className="text-left text-6xl font-bold text-[#8A393B]" style={{ lineHeight: '110%' }}>
                Vision
              </h2>
            </div>

            <div
              className={`transition-all duration-700 will-change-transform ${
                desktopInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: '400ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <p
                className="text-2xl text-[#414141]"
                style={{
                  textAlign: 'justify',
                  fontWeight: 400,
                  lineHeight: '150%',
                  maxWidth: '1248px',
                }}
              >
                To be the world largest and low cost railway track component producer. To benchmark as quality producer of track components by merging the efficiencies of excellence in quality, productivity & cost. To make rail travel faster and safer.
              </p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-24">
          <div
            className={`absolute left-0 transition-all duration-1000 will-change-transform ${
              desktopInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
            style={{
              top: '110px',
              width: 'min(1060px, 75vw)',
              height: 'clamp(20px, 2vw, 28px)',
              background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)',
              transformOrigin: 'left',
              transitionDelay: '300ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`mb-16 transition-all duration-700 will-change-transform ${
                desktopInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: '100ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <h2 className="text-right text-6xl font-bold text-[#8A393B]" style={{ lineHeight: '110%' }}>
                Mission
              </h2>
            </div>

            <div
              className={`transition-all duration-700 will-change-transform ${
                desktopInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: '400ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <p
                className="text-2xl text-[#414141]"
                style={{
                  textAlign: 'justify',
                  fontWeight: 400,
                  lineHeight: '150%',
                  maxWidth: '1248px',
                }}
              >
                Increasing the productivity and quality by strictly adhering to the manufacturing excellence process. Treating human resources as partners. Practicing continuous price discovery process. Bringing in customer delight with on time supply. Predominant growth by adding new customers.
              </p>
            </div>
          </div>
        </section>

        <section className="relative bg-black py-24">
          <div
            className={`absolute h-7 transition-all duration-1000 will-change-transform ${
              desktopInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
            style={{
              top: '0px',
              left: '0px',
              width: '70%',
              background: 'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)',
              transformOrigin: 'left',
              transitionDelay: '200ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          <div
            className={`absolute h-7 transition-all duration-1000 will-change-transform ${
              desktopInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
            style={{
              bottom: '0px',
              right: '0px',
              width: '70%',
              background: 'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)',
              transformOrigin: 'right',
              transitionDelay: '400ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div
              className={`mb-20 text-center transition-all duration-700 will-change-transform ${
                desktopInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: '100ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <h2 className="mb-4 text-7xl font-bold text-[#F2913F]">
                Core Values
              </h2>
            </div>

            <div className="text-center">
              <div className="mb-8 flex flex-wrap items-center justify-center gap-8">
                {coreValueLabels.slice(0, 4).map((value, index) => (
                  <div
                    key={value}
                    className={`px-8 py-3 text-2xl font-semibold text-white shadow-lg will-change-transform ${
                      desktopInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                    style={{
                      background: activeValueIndex === index ? '#F2913F' : '#8A393B',
                      borderRadius: '11px',
                      transitionDelay: `${600 + (index * 80)}ms`,
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.8s ease-in-out',
                    }}
                  >
                    {value}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8">
                {coreValueLabels.slice(4).map((value, index) => {
                  const globalIndex = index + 4;

                  return (
                    <div
                      key={value}
                      className={`px-8 py-3 text-2xl font-semibold text-white shadow-lg will-change-transform ${
                        desktopInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                      }`}
                      style={{
                        background: activeValueIndex === globalIndex ? '#F2913F' : '#8A393B',
                        borderRadius: '11px',
                        transitionDelay: `${920 + (index * 80)}ms`,
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.8s ease-in-out',
                      }}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile and tablet layout */}
      <div className="lg:hidden">
        <section
          ref={visionRef}
          className="relative overflow-hidden bg-[#fcfbf8] py-12 sm:py-16 md:py-20"
        >
          <div
            className={`absolute right-0 hidden md:block transition-all duration-1000 will-change-transform ${
              visionInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
            style={{
              top: '115px',
              width: 'min(1133px, 80vw)',
              height: 'clamp(20px, 2vw, 28px)',
              background:
                'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)',
              transformOrigin: 'right',
              transitionDelay: '300ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`mb-6 transition-all duration-700 will-change-transform sm:mb-8 md:mb-10 ${
                visionInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: '100ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <h2
                className="text-3xl font-bold text-[#8A393B] sm:text-4xl md:text-5xl"
                style={{ lineHeight: '110%' }}
              >
                Vision
              </h2>
            </div>

            <div
              className={`transition-all duration-700 will-change-transform ${
                visionInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: '400ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className={MOBILE_CONTENT_BOX_CLASS}>
                <p
                  className="text-base text-white sm:text-lg md:text-xl"
                  style={{
                    textAlign: 'justify',
                    fontWeight: 400,
                    lineHeight: '150%',
                  }}
                >
                  To be the world largest and low cost railway track component producer. To benchmark as quality producer of track components by merging the efficiencies of excellence in quality, productivity &amp; cost. To make rail travel faster and safer.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={missionRef}
          className="relative overflow-hidden bg-[#fcfbf8] py-12 sm:py-16 md:py-20"
        >
          <div
            className={`absolute left-0 hidden md:block transition-all duration-1000 will-change-transform ${
              missionInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
            style={{
              top: '110px',
              width: 'min(1060px, 75vw)',
              height: 'clamp(20px, 2vw, 28px)',
              background:
                'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)',
              transformOrigin: 'left',
              transitionDelay: '300ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`mb-6 transition-all duration-700 will-change-transform sm:mb-8 md:mb-10 ${
                missionInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: '100ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <h2
                className="text-left text-3xl font-bold text-[#8A393B] sm:text-right sm:text-4xl md:text-5xl"
                style={{ lineHeight: '110%' }}
              >
                Mission
              </h2>
            </div>

            <div
              className={`transition-all duration-700 will-change-transform ${
                missionInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: '400ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className={MOBILE_CONTENT_BOX_CLASS}>
                <p
                  className="text-base text-white sm:text-lg md:text-xl"
                  style={{
                    textAlign: 'justify',
                    fontWeight: 400,
                    lineHeight: '150%',
                  }}
                >
                  Increasing the productivity and quality by strictly adhering to the manufacturing excellence process. Treating human resources as partners. Practicing continuous price discovery process. Bringing in customer delight with on time supply. Predominant growth by adding new customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={coreValuesRef}
          className="relative bg-black py-12 sm:py-16 md:py-20"
        >
          <div
            className={`absolute h-3 transition-all duration-1000 will-change-transform sm:h-5 ${
              coreValuesInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
            style={{
              top: '0px',
              left: '0px',
              width: '70%',
              background:
                'linear-gradient(90deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)',
              transformOrigin: 'left',
              transitionDelay: '200ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          <div
            className={`absolute h-3 transition-all duration-1000 will-change-transform sm:h-5 ${
              coreValuesInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
            style={{
              right: '0px',
              bottom: '0px',
              width: '70%',
              background:
                'linear-gradient(270deg, #8A393B 0%, #1E3888 30%, #F2913F 60%, rgba(242, 145, 63, 0) 100%)',
              transformOrigin: 'right',
              transitionDelay: '400ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div
              className={`mb-8 text-center transition-all duration-700 will-change-transform sm:mb-12 md:mb-16 ${
                coreValuesInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: '100ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <h2 className="mb-3 text-3xl font-bold text-[#F2913F] sm:text-4xl md:text-5xl">
                Core Values
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#8A393B] to-[#F2913F]" />
            </div>

            <div className="text-center">
              <div className={`rounded-[28px] p-5 sm:p-7 md:p-8 ${TRANSPARENT_GLASS_BOX_CLASS}`}>
                <div className="space-y-4 sm:hidden">
                  {coreValueBoxes.map((value, index) => (
                    <div
                      key={value.label}
                      className={`inline-flex items-center justify-center rounded-[14px] bg-[#9A4344] px-4 py-2.5 text-center text-sm font-semibold text-white transition-all will-change-transform ${
                        coreValuesInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                      }`}
                      style={{
                        width: `min(100%, ${CORE_VALUE_WIDTH}px)`,
                        boxShadow: 'none',
                        transitionDelay: `${600 + (index * 80)}ms`,
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {value.label}
                    </div>
                  ))}
                </div>

                <div className="hidden sm:block">
                  <div className="mb-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
                    {coreValueBoxes.slice(0, 4).map((value, index) => (
                      <div
                        key={value.label}
                        className={`text-base font-semibold text-white transition-all will-change-transform ${
                          coreValuesInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                        }`}
                        style={{
                          transitionDelay: `${600 + (index * 80)}ms`,
                          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                          width: `${CORE_VALUE_WIDTH}px`,
                        }}
                      >
                      <div
                          className={`${CORE_VALUE_ITEM_CLASS} rounded-[16px] px-5 py-3 text-base font-semibold sm:px-6 sm:py-3 md:text-xl ${
                            activeValueIndex === index ? 'scale-[1.02]' : ''
                          }`}
                          style={{
                            boxShadow: 'none',
                          }}
                        >
                          {value.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
                    {coreValueBoxes.slice(4).map((value, index) => {
                      const globalIndex = index + 4;

                      return (
                        <div
                          key={value.label}
                          className={`text-base font-semibold text-white transition-all will-change-transform ${
                            coreValuesInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                          }`}
                          style={{
                            transitionDelay: `${920 + (index * 80)}ms`,
                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                            width: `${CORE_VALUE_WIDTH}px`,
                          }}
                        >
                        <div
                          className={`${CORE_VALUE_ITEM_CLASS} rounded-[16px] px-5 py-3 text-base font-semibold sm:px-6 sm:py-3 md:text-xl ${
                            activeValueIndex === globalIndex ? 'scale-[1.02]' : ''
                          }`}
                          style={{
                            boxShadow: 'none',
                          }}
                        >
                          {value.label}
                        </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurVisionPage;
