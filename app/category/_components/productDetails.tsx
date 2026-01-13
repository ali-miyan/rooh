"use client";
import { useState, useEffect, useRef } from "react";
import {
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  MessageCircle,
  AlertCircle,
  Ruler,
  Shield,
  Truck,
  RotateCcw,
  Star,
  Check,
  Package,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import type { Product } from "@/types/sanity";
import Link from "next/link";
import SanityImage from "@/lib/imageBuilder";

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailPage({
  product,
  relatedProducts,
}: ProductDetailPageProps) {
  const [selectedLength, setSelectedLength] = useState();
  const [quantity, setQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});
  const [showNextSections, setShowNextSections] = useState(false);
  const [isRightSectionSticky, setIsRightSectionSticky] = useState(true);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const openSizeGuide = () => {
    setShowSizeGuide(true);
    document.body.style.overflow = "hidden";
  };

  const closeSizeGuide = () => {
    setShowSizeGuide(false);
    document.body.style.overflow = "unset";
  };

  // Modal and zoom states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Mobile slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [mobileZoomLevel, setMobileZoomLevel] = useState(1);
  const [mobileZoomPosition, setMobileZoomPosition] = useState({ x: 0, y: 0 });
  const [isMobileDragging, setIsMobileDragging] = useState(false);
  const [mobileDragStart, setMobileDragStart] = useState({ x: 0, y: 0 });
  const [showMobileZoomControls, setShowMobileZoomControls] = useState(false);

  const handleTouchStart = (e: any) => {
    if (mobileZoomLevel > 1) {
      setIsMobileDragging(true);
      const touch = e.touches[0];
      setMobileDragStart({
        x: touch.clientX - mobileZoomPosition.x,
        y: touch.clientY - mobileZoomPosition.y,
      });
      e.preventDefault();
    }
  };

  const handleTouchMove = (e) => {
    if (isMobileDragging && mobileZoomLevel > 1) {
      const touch = e.touches[0];
      const newX = touch.clientX - mobileDragStart.x;
      const newY = touch.clientY - mobileDragStart.y;

      const maxX = (mobileZoomLevel - 1) * 150;
      const maxY = (mobileZoomLevel - 1) * 200;

      setMobileZoomPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY)),
      });
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsMobileDragging(false);
  };

  const handleMobileZoomIn = () => {
    setMobileZoomLevel((prev) => Math.min(prev + 0.5, 2.5));
    setShowMobileZoomControls(true);
  };

  const handleMobileZoomOut = () => {
    setMobileZoomLevel((prev) => Math.max(prev - 0.5, 1));
    if (mobileZoomLevel <= 1.5) {
      setMobileZoomPosition({ x: 0, y: 0 });
    }
    if (mobileZoomLevel <= 1) {
      setShowMobileZoomControls(false);
    }
  };

  const imagesEndRef = useRef<HTMLDivElement>(null);
  const zoomImageRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Dummy data for colors and lengths
  const colors = [
    { name: "Black", value: "black", hex: "#000000" },
    { name: "Beige", value: "beige", hex: "#F5F5DC" },
  ];
  const lengths = product.sizes?.map((size) =>
    size.size === "custom" ? size.customSize : size.size
  ) || ["52", "54", "56", "58", "60", "62"]; // fallback to default if no sizes

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (imagesEndRef.current) {
        const rect = imagesEndRef.current.getBoundingClientRect();
        const hasScrolledPastImages = rect.top <= window.innerHeight;
        setShowNextSections(hasScrolledPastImages);
        // setIsRightSectionSticky(!hasScrolledPastImages);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMouseDown = (e: any) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - zoomPosition.x,
        y: e.clientY - zoomPosition.y,
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: any) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Optional: Add boundaries to prevent dragging too far
      const maxX = (zoomLevel - 1) * 200; // Adjust these values as needed
      const maxY = (zoomLevel - 1) * 200;

      setZoomPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add these useEffect hooks for mouse events
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart, zoomLevel, isModalOpen]);

  // Modal functions
  const openModal = (imageIndex: number) => {
    if (!isMobile) {
      setCurrentImageIndex(imageIndex);
      setIsModalOpen(true);
      setZoomLevel(1);
      setZoomPosition({ x: 0, y: 0 });
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
    if (zoomLevel <= 1.5) {
      setZoomPosition({ x: 0, y: 0 });
    }
  };

  // Mobile slider functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % product.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  // WhatsApp inquiry
  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'm interested in the ${
      product.name
    } - ₹${product.price.toFixed(
      2
    )}., Length: ${selectedLength} inches. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/${"+96876429013"}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Group images into rows of 2 for desktop
  const imageRows = [];
  for (let i = 0; i < product.images.length; i += 2) {
    imageRows.push(product.images.slice(i, i + 2));
  }

  return (
    <div className="min-h-screen bg-white font-custom">
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeSizeGuide}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeSizeGuide}
                className="absolute top-4 right-4 z-10 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Size Guide Image */}
              <Image
                src={"/size-guide.jpg"}
                alt="Size Guide Chart"
                width={800}
                height={900}
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 py-4"
      >
        <nav className="text-sm text-neutral-600 py-2">
          <span>
            <Link href={"/"}>Home</Link>
          </span>
          <span className="mx-2">/</span>
          <span className="lowercase">
            <Link href={"/category/" + product.category?.slug.current}>
              {product.category?.name}
            </Link>
          </span>
          <span className="mx-2">/</span>
          <span className="text-neutral-800 lowercase">{product.name}</span>
        </nav>
      </motion.div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Mobile Slider */}
            {isMobile ? (
              <div className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden rounded-lg">
                <motion.div
                  className="flex h-full transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {product.images.map((image, index) => {
                    const imageUrl = image.asset.url;

                    return (
                      <div
                        key={index}
                        className="w-full h-full flex-shrink-0 relative overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{
                          touchAction: mobileZoomLevel > 1 ? "none" : "auto",
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: mobileZoomLevel,
                            x: mobileZoomPosition.x,
                            y: mobileZoomPosition.y,
                          }}
                          transition={{
                            type: "tween",
                            duration: isMobileDragging ? 0 : 0.2,
                          }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <SanityImage
                            image={imageUrl}
                            alt={`${product.name} - View ${index + 1}`}
                            className="w-full h-full object-cover pointer-events-none"
                          />
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Slider Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Mobile Zoom Controls */}
                <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                  <button
                    onClick={handleMobileZoomIn}
                    className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                    disabled={mobileZoomLevel >= 2.5}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {showMobileZoomControls && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={handleMobileZoomOut}
                        className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                        disabled={mobileZoomLevel <= 1}
                      >
                        <ZoomOut className="w-4 h-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Zoom Level Indicator */}
                <AnimatePresence>
                  {mobileZoomLevel > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-2 left-2 z-10 bg-black/60 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {Math.round(mobileZoomLevel * 100)}%
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentSlide(index);
                        setMobileZoomLevel(1);
                        setMobileZoomPosition({ x: 0, y: 0 });
                        setShowMobileZoomControls(false);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Desktop Grid */
              <>
                {imageRows.map((row, rowIndex) => (
                  <motion.div
                    key={rowIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {row.map((image, imageIndex) => {
                      const globalIndex = rowIndex * 2 + imageIndex;
                      const imageUrl = image.asset.url;
                      return (
                        <motion.div
                          key={globalIndex}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                          className="w-full aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer rounded-lg shadow-sm hover:shadow-md"
                          onClick={() => openModal(globalIndex)}
                        >
                          <SanityImage
                            image={imageUrl}
                            alt={`${product.name} - View ${globalIndex + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </motion.div>
                      );
                    })}
                    {/* If this is the last row and has only 1 image, add empty space */}
                    {row.length === 1 && (
                      <div className="w-full aspect-[3/4] bg-transparent"></div>
                    )}
                  </motion.div>
                ))}
              </>
            )}
            {/* Invisible marker to detect when images end */}
            <div ref={imagesEndRef} className="h-1" />
          </motion.div>

          {/* Product Details - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${
              isRightSectionSticky ? "lg:sticky lg:top-4 lg:h-fit" : ""
            } transition-all duration-300`}
          >
            <div className="space-y-6 bg-white lg:p-8 lg:border border-neutral-200 backdrop-blur-sm">
              {/* Product Title and Price */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pb-5 border-b border-neutral-100"
              >
                <h1 className="text-3xl font-light mb-4 tracking-tight leading-tight text-neutral-900 font-serif">
                  {product.name}
                </h1>

                {/* Premium Price Display */}
                <div className="space-y-2">
                  <div className="flex items-end gap-4">
                    <div className="text-2xl font-light text-neutral-900 tracking-tight">
                      ₹{product.price.toFixed(2)}
                    </div>
                    {product.originalPrice && (
                      <div className="flex items-center gap-2">
                        <div className="text-lg text-neutral-400 line-through font-light">
                          ₹{product.originalPrice.toFixed(2)}
                        </div>
                        <div className="bg-red-600 text-white text-xs font-medium px-2 py-0.5 uppercase tracking-wide">
                          -
                          {Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100
                          )}
                          %
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {!product.inStock && (
                  <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium border border-red-200">
                    <AlertCircle className="w-4 h-4" />
                    Currently Unavailable
                  </div>
                )}
              </motion.div>

              {/* Length Selection */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    Length Selection
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={openSizeGuide}
                    className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors font-medium flex items-center gap-1"
                  >
                    <Ruler className="w-3 h-3" />
                    Size Guide
                  </motion.button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.sizes?.map((sizeObj, index) => {
                    const size =
                      sizeObj.size === "custom"
                        ? sizeObj.customSize
                        : sizeObj.size;
                    const isAvailable = sizeObj?.available !== false;

                    return (
                      <motion.button
                        key={size}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.6 + index * 0.05,
                        }}
                        whileHover={isAvailable ? { scale: 1.02 } : {}}
                        whileTap={isAvailable ? { scale: 0.98 } : {}}
                        onClick={() => isAvailable && setSelectedLength(size)}
                        disabled={!isAvailable}
                        className={`relative px-2 py-2.5 text-xs font-medium border transition-all duration-300 ${
                          selectedLength === size
                            ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                            : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500"
                        } ${
                          !isAvailable ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {size}"
                        {!isAvailable && (
                          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="w-16 h-0.5 bg-red-500 rotate-45"></span>
                          </span>
                        )}
                      </motion.button>
                    );
                  }) ||
                    ["52", "54", "56", "58", "60", "62"].map((size) => (
                      <motion.button
                        key={size}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedLength(size)}
                        className={`px-2 py-2.5 text-xs font-medium border transition-all duration-300 ${
                          selectedLength === size
                            ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                            : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500"
                        }`}
                      >
                        {size}"
                      </motion.button>
                    ))}
                </div>
              </motion.div>

              {/* WhatsApp Inquiry */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-4"
              >
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3.5 px-6 bg-emerald-600 text-white font-medium tracking-wide transition-all duration-300 hover:bg-emerald-700 flex items-center justify-center gap-2 text-sm uppercase shadow-sm hover:shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Inquire via WhatsApp
                </motion.button>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-neutral-100">
                  <div className="flex flex-col items-center space-y-1">
                    <Shield className="w-4 h-4 text-neutral-600" />
                    <div className="text-xs text-neutral-600 font-medium">
                      Authentic
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Truck className="w-4 h-4 text-neutral-600" />
                    <div className="text-xs text-neutral-600 font-medium">
                      Fast Ship
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <RotateCcw className="w-4 h-4 text-neutral-600" />
                    <div className="text-xs text-neutral-600 font-medium">
                      Returns
                    </div>
                  </div>
                </div>

                {/* Product Information */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-neutral-50 p-4 border border-neutral-100"
                >
                  <div className="border-l-2 border-neutral-900 pl-3">
                    <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                      Product Details
                    </h4>
                    {product.description && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="text-sm text-neutral-700 leading-relaxed">
                          <PortableText value={product.description} />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              {/* Expandable Sections */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="space-y-1 pt-4 border-t border-neutral-100"
              >
                {/* Delivery & Returns */}
                <div className="border border-neutral-200 overflow-hidden bg-white">
                  <motion.button
                    whileHover={{ backgroundColor: "rgb(249 250 251)" }}
                    onClick={() => toggleSection("delivery")}
                    className="flex items-centelr justify-between w-full text-left p-4 transition-colors duration-200"
                  >
                    <h3 className="text-xs font-semibold text-neutral-900 tracking-wider uppercase flex items-center gap-2">
                      <Package className="w-3 h-3" />
                      Shipping & Returns
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedSections.delivery ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-6 h-6 bg-neutral-900 text-white flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {expandedSections.delivery && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-neutral-200"
                      >
                        <div className="p-4 pt-3 bg-neutral-50">
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-700">
                            <div>
                              <h4 className="font-semibold text-neutral-900 mb-2 text-xs uppercase tracking-wide flex items-center gap-1">
                                <Truck className="w-3 h-3" />
                                Shipping
                              </h4>
                              <div className="space-y-1 leading-relaxed">
                                <p>• Free shipping all over India</p>
                                <p>• Estimate time: 2 weeks</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-neutral-900 mb-2 text-xs uppercase tracking-wide flex items-center gap-1">
                                <RotateCcw className="w-3 h-3" />
                                Returns
                              </h4>
                              <div className="space-y-1 leading-relaxed">
                                <p>• No return or refund</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal for Desktop */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Zoom Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                <button
                  onClick={handleZoomOut}
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                  disabled={zoomLevel <= 1}
                >
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                <span className="bg-white/20 px-3 py-2 rounded-full text-white text-sm">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 z-10 bg-white/20 px-3 py-1 rounded-full text-white text-sm">
                {currentImageIndex + 1} / {product.images.length}
              </div>

              {/* Zoomable Image */}
              <div
                ref={zoomImageRef}
                className="relative w-full h-full overflow-hidden select-none"
                style={{
                  cursor:
                    zoomLevel > 1
                      ? isDragging
                        ? "grabbing"
                        : "grab"
                      : "default",
                }}
                onMouseDown={handleMouseDown}
              >
                <motion.div
                  animate={{
                    scale: zoomLevel,
                    x: zoomPosition.x,
                    y: zoomPosition.y,
                  }}
                  transition={{ type: "tween", duration: isDragging ? 0 : 0.2 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <SanityImage
                    image={product.images[currentImageIndex]}
                    alt={`${product.name} - View ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain pointer-events-none"
                    priority
                    draggable={false}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Sections - Only show after all images are scrolled */}
      <AnimatePresence>
        {showNextSections && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 py-16"
          >
            <div className="border-t border-neutral-200 pt-16">
              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="text-2xl mb-8">You May Also Like</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((relatedProduct, index) => {
                      const imageUrl = relatedProduct.images?.[0]
                        ? relatedProduct.images[0].asset.url
                        : "/placeholder.svg";

                      return (
                        <>
                          <Link
                            href={`/category/${relatedProduct.category}/products/${relatedProduct.slug.current}`}
                          >
                            <motion.div
                              key={relatedProduct._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.5 + index * 0.1,
                              }}
                              whileHover={{ y: -5 }}
                              className="group cursor-pointer"
                            >
                              <div className="aspect-[3/4] bg-neutral-100 mb-4 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <SanityImage
                                  image={imageUrl}
                                  alt={relatedProduct.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="space-y-2"
                              >
                                <div className="text-sm font-semibold text-neutral-800">
                                  ₹{relatedProduct.price.toFixed(2)}
                                </div>
                                <h3 className="text-sm text-neutral-700 leading-relaxed">
                                  {relatedProduct.name}
                                </h3>
                              </motion.div>
                            </motion.div>
                          </Link>
                        </>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
