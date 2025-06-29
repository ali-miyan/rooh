"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import RightArrow from "@/assets/icons/right_arrow.svg"

const SmoothFadeSlider = ({ ourPartnersTitle, ourPartnersLogo = [] }) => {
  const [activeSet, setActiveSet] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [slidesToShow, setSlidesToShow] = useState(6)

  // Transform the dynamic data to match the expected format
  const partners = ourPartnersLogo
    .map((partner, index) => ({
      title: `partner_${index + 1}`,
      img: partner.asset?.url || partner.asset?.src || partner.url || partner.src,
      altText: partner.asset?.altText || partner.altText || `Partner ${index + 1}`,
    }))
    .filter((partner) => partner.img) // Filter out any partners without valid image URLs

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 1280) {
        setSlidesToShow(6)
      } else if (width >= 1024) {
        setSlidesToShow(4)
      } else if (width >= 768) {
        setSlidesToShow(3)
      } else if (width >= 480) {
        setSlidesToShow(3)
      } else {
        setSlidesToShow(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [slidesToShow])

  // Group the partners into sets of slidesToShow
  const getPartnerSets = () => {
    const sets = []
    const totalPartners = partners.length

    for (let i = 0; i < totalPartners; i += slidesToShow) {
      const set = partners.slice(i, i + slidesToShow)
      sets.push(set)
    }
    return sets
  }

  const partnerSets = getPartnerSets()
  const totalSets = Math.ceil(partners.length / slidesToShow)

  const handleNext = () => {
    if (isTransitioning || totalSets <= 1) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActiveSet((prev) => (prev + 1) % totalSets)
      setIsTransitioning(false)
    }, 500)
  }

  const handlePrev = () => {
    if (isTransitioning || totalSets <= 1) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActiveSet((prev) => (prev === 0 ? totalSets - 1 : prev - 1))
      setIsTransitioning(false)
    }, 500)
  }

  // Set up autoplay only if there are multiple sets
  useEffect(() => {
    if (totalSets <= 1) return

    const interval = setInterval(() => {
      handleNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [activeSet, isTransitioning, slidesToShow, totalSets])

  // Calculate grid template based on slidesToShow
  const getGridTemplate = () => {
    if (slidesToShow === 6) return "grid-cols-6"
    if (slidesToShow === 4) return "grid-cols-4"
    if (slidesToShow === 3) return "grid-cols-3"
    if (slidesToShow === 2) return "grid-cols-2"
    return "grid-cols-1"
  }

  // Don't render if no partners
  if (!partners.length) {
    return null
  }

  return (
    <div className="w-full pt-8 md:pt-28 max-w-[110rem] mx-auto overflow-hidden ">
      <div className="mb-12 relative">
        <p className="uppercase text-sm tracking-wide mb-2">OUR PARTNERS</p>
        <h2 className="text-[25px] md:text-[35px] lg:text-[45px] max-w-xs md:max-w-2xl mb-4">{ourPartnersTitle}</h2>
        {totalSets > 1 && (
          <div className="gap-4 hidden mobL:flex absolute right-2 bottom-2">
            <button onClick={handlePrev} disabled={isTransitioning}>
              <Image
                src={RightArrow || "/placeholder.svg"}
                alt="Previous"
                className="w-[40px] rotate-180 h-[16px] opacity-80 hover:opacity-100"
              />
            </button>
            <button onClick={handleNext} disabled={isTransitioning}>
              <Image
                src={RightArrow || "/placeholder.svg"}
                alt="Next"
                className="w-[40px] h-[16px] opacity-80 hover:opacity-100"
              />
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <div className="mx-auto max-w-full">
          <div
            className={`grid ${getGridTemplate()} transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            } sm:-mx-3 mobM:-mx-3 mobL:-mx-10 gap-4`}
          >
            {partnerSets[activeSet]?.map((partner, index) => (
              <div key={`${partner.title}-${activeSet}-${index}`} className="flex items-center justify-center py-4">
                {/* Logo container with consistent sizing */}
                <div className="w-full max-w-[150px] h-[80px] relative flex items-center justify-center p-2 bg-white/5 rounded-lg border border-gray-100/10">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={partner.img || "/placeholder.svg"}
                      alt={partner.altText}
                      fill
                      className="object-contain filter brightness-0 opacity-60 hover:opacity-80 transition-opacity duration-300"
                      sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 150px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalSets > 1 && (
            <div className="gap-4 mobL:hidden flex mt-14">
              <button onClick={handlePrev} disabled={isTransitioning}>
                <Image
                  src={RightArrow || "/placeholder.svg"}
                  alt="Previous"
                  className="w-[40px] rotate-180 h-[16px] opacity-80 hover:opacity-100"
                />
              </button>
              <button onClick={handleNext} disabled={isTransitioning}>
                <Image
                  src={RightArrow || "/placeholder.svg"}
                  alt="Next"
                  className="w-[40px] h-[16px] opacity-80 hover:opacity-100"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SmoothFadeSlider
