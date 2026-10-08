import { useState } from "react";

interface CollectionImageProps {
  src: string | null;
  className: string;
}

export const CollectionImage = ({ src, className }: CollectionImageProps) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return <div className={`${className} ${className}--empty`} />;
  }

  return (
    <img
      src={src}
      alt=""
      className={className}
      loading="lazy"
      onError={() => setFailedSrc(src)}
    />
  );
};