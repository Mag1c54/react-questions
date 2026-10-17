import { useState } from "react";

interface SafeImageProps {
  src: string | null | undefined;
  className: string;
  alt?: string;
}

export const SafeImage = ({ src, className, alt = "" }: SafeImageProps) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return <div className={`${className} ${className}--empty`} aria-hidden="true" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailedSrc(src)}
    />
  );
};
