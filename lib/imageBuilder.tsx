import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export default function SanityImage({ 
  image, 
  alt = '',
  className = '',
  priority = false,
  fill = false // NEW: Add fill prop like Next Image,

}:any) {
  if (!image) return null

  const urlFor = (source:any) => builder.image(source)

  // Generate optimized URLs for different screen sizes
  const getSrcSet = () => {
    return [
      `${urlFor(image).width(320).format('webp').quality(85).url()} 320w`,
      `${urlFor(image).width(480).format('webp').quality(85).url()} 480w`,
      `${urlFor(image).width(640).format('webp').quality(85).url()} 640w`,
      `${urlFor(image).width(768).format('webp').quality(80).url()} 768w`,
      `${urlFor(image).width(1024).format('webp').quality(80).url()} 1024w`,
      `${urlFor(image).width(1280).format('webp').quality(75).url()} 1280w`,
      `${urlFor(image).width(1920).format('webp').quality(75).url()} 1920w`,
    ].join(', ')
  }

  // If fill prop is true, use absolute positioning like Next Image
  const fillStyles = fill ? {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  } : {
    width: '100%',
    height: 'auto',
    display: 'block',
    maxWidth: '100%'
  }

  return (
    <img
      src={urlFor(image).width(1200).format('webp').quality(80).url()}
      srcSet={getSrcSet()}
      sizes="100vw"
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={fillStyles as any}
    />
  )
}
